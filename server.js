import crypto from 'node:crypto';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import nodemailer from 'nodemailer';
import Razorpay from 'razorpay';
import twilio from 'twilio';

dotenv.config();

const app = express();
const port = Number(process.env.OTP_PORT || 4000);

const requiredConfig = [
  'TWILIO_ACCOUNT_SID',
  'TWILIO_AUTH_TOKEN',
  'TWILIO_VERIFY_SERVICE_SID',
];

const configuredAppUrl = process.env.APP_URL || 'http://localhost:3000';
app.use(cors({
  origin: (origin, callback) => {
    const isLocalDevelopmentOrigin = !origin
      || /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)
      || /^https?:\/\/(10\.\d+\.\d+\.\d+|192\.168\.\d+\.\d+|172\.(1[6-9]|2\d|3[0-1])\.\d+\.\d+)(:\d+)?$/.test(origin);
    callback(null, isLocalDevelopmentOrigin || origin === configuredAppUrl);
  },
}));
app.use(express.json());

function normalizePhone(phone) {
  const compactPhone = String(phone || '').trim().replace(/[\s()-]/g, '');
  if (/^\d{10}$/.test(compactPhone)) return `+91${compactPhone}`;
  if (/^91\d{10}$/.test(compactPhone)) return `+${compactPhone}`;
  return compactPhone;
}

function getMailTransport() {
  const missing = ['SMTP_HOST', 'SMTP_USER', 'SMTP_PASS', 'MAIL_FROM']
    .filter((key) => !process.env[key] || process.env[key].includes('your_') || process.env[key].includes('example.com'));
  if (missing.length > 0) {
    throw new Error(`SMTP is not configured. Set real values for: ${missing.join(', ')}`);
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

async function sendRegistrationMail({ recipientEmail, subject, bodyHtml }) {
  if (process.env.RESEND_API_KEY && process.env.RESEND_FROM) {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ from: process.env.RESEND_FROM, to: [recipientEmail], subject, html: bodyHtml }),
    });
    if (!response.ok) {
      const details = await response.text();
      throw new Error(`Resend rejected the email: ${details}`);
    }
    return;
  }

  const transporter = getMailTransport();
  await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to: recipientEmail,
    subject,
    html: bodyHtml,
  });
}

function getTwilioClient() {
  const missing = requiredConfig.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(`Missing SMS configuration: ${missing.join(', ')}`);
  }
  return twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
}

function getRazorpayClient() {
  const missing = ['RAZORPAY_KEY_ID', 'RAZORPAY_KEY_SECRET']
    .filter((key) => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(`Missing payment configuration: ${missing.join(', ')}`);
  }
  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
}

app.post('/otp/send', async (req, res) => {
  const phone = normalizePhone(req.body?.phone);
  if (!/^\+[1-9]\d{7,14}$/.test(phone)) {
    return res.status(400).json({ success: false, message: 'Use an international phone number, for example +919035066863.' });
  }

  try {
    const client = getTwilioClient();
    await client.verify.v2
      .services(process.env.TWILIO_VERIFY_SERVICE_SID)
      .verifications.create({ to: phone, channel: 'sms' });
    return res.json({ success: true });
  } catch (error) {
    console.error('OTP send failed:', error.message);
    const message = process.env.NODE_ENV === 'production'
      ? 'Twilio could not send the OTP. Check the phone number and SMS configuration.'
      : `Twilio could not send the OTP: ${error.message}`;
    return res.status(502).json({ success: false, message });
  }
});

app.post('/otp/verify', async (req, res) => {
  const phone = normalizePhone(req.body?.phone);
  const code = String(req.body?.code || '').trim();
  if (!/^\+[1-9]\d{7,14}$/.test(phone) || !/^\d{4,10}$/.test(code)) {
    return res.status(400).json({ success: false, message: 'Enter the phone number and OTP received by SMS.' });
  }

  try {
    const client = getTwilioClient();
    const check = await client.verify.v2
      .services(process.env.TWILIO_VERIFY_SERVICE_SID)
      .verificationChecks.create({ to: phone, code });
    return res.json({ success: check.status === 'approved', message: check.status === 'approved' ? undefined : 'The OTP is invalid or expired.' });
  } catch (error) {
    console.error('OTP verification failed:', error.message);
    return res.status(502).json({ success: false, message: 'Twilio could not verify this OTP.' });
  }
});

app.post('/email/student-registration', async (req, res) => {
  const recipientEmail = String(req.body?.recipientEmail || '').trim();
  const recipientName = String(req.body?.recipientName || '').trim();
  const subject = String(req.body?.subject || '').trim();
  const bodyHtml = String(req.body?.bodyHtml || '');

  if (!/^\S+@\S+\.\S+$/.test(recipientEmail) || !subject || !bodyHtml) {
    return res.status(400).json({ success: false, message: 'A valid recipient email and message are required.' });
  }

  try {
    await sendRegistrationMail({ recipientEmail, recipientName, subject, bodyHtml });
    return res.json({ success: true });
  } catch (error) {
    console.error('Registration email failed:', error.message);
    const message = process.env.NODE_ENV === 'production'
      ? 'The registration email could not be delivered. Check SMTP configuration.'
      : error.message;
    return res.status(502).json({ success: false, message });
  }
});

app.post('/payment/order', async (req, res) => {
  const amount = Number(req.body?.amount);
  const receipt = String(req.body?.receipt || '').trim();
  if (!Number.isInteger(amount) || amount < 100 || !receipt) {
    return res.status(400).json({ success: false, message: 'A valid payment amount and receipt are required.' });
  }

  try {
    const order = await getRazorpayClient().orders.create({
      amount: amount * 100,
      currency: 'INR',
      receipt,
    });
    return res.json({ success: true, id: order.id, amount: order.amount, currency: order.currency, receipt: order.receipt, keyId: process.env.RAZORPAY_KEY_ID });
  } catch (error) {
    console.error('Payment order failed:', error.message);
    return res.status(502).json({ success: false, message: 'Razorpay could not create the payment order. Check gateway configuration.' });
  }
});

app.post('/payment/verify', (req, res) => {
  const { razorpay_order_id: orderId, razorpay_payment_id: paymentId, razorpay_signature: signature } = req.body || {};
  if (!orderId || !paymentId || !signature || !process.env.RAZORPAY_KEY_SECRET) {
    return res.status(400).json({ success: false, message: 'Incomplete Razorpay payment verification data.' });
  }

  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(`${orderId}|${paymentId}`)
    .digest('hex');

  if (expectedSignature !== signature) {
    return res.status(400).json({ success: false, message: 'Razorpay payment signature is invalid.' });
  }

  return res.json({ success: true });
});

app.listen(port, () => {
  console.log(`OTP API listening on http://localhost:${port}`);
});
