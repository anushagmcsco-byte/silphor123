import { EmailDispatchPayload } from './emailService';

const apiUrl = import.meta.env.VITE_API_URL as string | undefined;

export async function sendRegistrationEmail(email: EmailDispatchPayload): Promise<void> {
  if (!apiUrl) {
    throw new Error('Email service is not configured. Set VITE_API_URL.');
  }

  const response = await fetch(`${apiUrl.replace(/\/$/, '')}/email/student-registration`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      recipientEmail: email.recipientEmail,
      recipientName: email.recipientName,
      subject: email.subject,
      bodyHtml: email.bodyHtml,
    }),
  });

  const result = await response.json().catch(() => ({ message: '' })) as { message?: string };
  if (!response.ok) {
    throw new Error(result.message || 'The registration email could not be sent.');
  }
}
