import { UserRole } from '../types';

export interface EmailDispatchPayload {
  id: string;
  recipientEmail: string;
  recipientName: string;
  role: UserRole;
  subject: string;
  preview: string;
  bodyHtml: string;
  username: string;
  password?: string;
  metadata?: Record<string, any>;
  sentAt: string;
}

export interface AuthAccount {
  email: string;
  username: string;
  password: string;
  fullName: string;
  role: UserRole;
  registeredDate: string;
  additionalInfo?: Record<string, any>;
}

const DEFAULT_ACCOUNTS: AuthAccount[] = [
  {
    email: 'admin@silphor.com',
    username: 'admin@silphor.com',
    password: 'silphor#2026',
    fullName: 'Dr. R. K. Nambiar',
    role: 'admin',
    registeredDate: '2026-01-10',
    additionalInfo: { title: 'Academic Dean & Super Administrator' }
  },
  {
    email: 'student@silphor.com',
    username: 'SIL-STU-2026-8921',
    password: 'student#2026',
    fullName: 'Ananya Sharma',
    role: 'student',
    registeredDate: '2026-02-14',
    additionalInfo: { course: 'Advanced VLSI Design & Physical Implementation', batch: 'Weekend Master Batch' }
  },
  {
    email: 'trainer@silphor.com',
    username: 'SIL-TRN-2026-4402',
    password: 'trainer#2026',
    fullName: 'Prof. Rajesh Varma',
    role: 'trainer',
    registeredDate: '2026-01-20',
    additionalInfo: { domain: 'VLSI Physical Design & Cadence Innovus Flow', experience: '14 Years' }
  },
  {
    email: 'partner@intel.com',
    username: 'partner@intel.com',
    password: 'partner#2026',
    fullName: 'Vikram Malhotra',
    role: 'enterprise',
    registeredDate: '2026-02-01',
    additionalInfo: { company: 'Intel Foundry Services', title: 'VP Talent Acquisition & EDA Liaison' }
  }
];

const STORAGE_KEY_EMAILS = 'silphor_dispatched_emails';
const STORAGE_KEY_ACCOUNTS = 'silphor_auth_accounts';

// Event listeners for global email dispatch modal/toasts
type EmailListener = (email: EmailDispatchPayload) => void;
const emailListeners: EmailListener[] = [];

export function subscribeToDispatchedEmails(listener: EmailListener): () => void {
  emailListeners.push(listener);
  return () => {
    const idx = emailListeners.indexOf(listener);
    if (idx > -1) emailListeners.splice(idx, 1);
  };
}

function notifyListeners(payload: EmailDispatchPayload) {
  emailListeners.forEach((listener) => {
    try {
      listener(payload);
    } catch (e) {
      console.error('Error invoking email listener:', e);
    }
  });

  // Also dispatch browser custom event for maximum decoupled reactivity
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('silphor-email-dispatched', { detail: payload }));
  }
}

/**
 * Gets all dispatched emails from localStorage
 */
export function getDispatchedEmails(): EmailDispatchPayload[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY_EMAILS);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Failed reading dispatched emails from storage:', err);
    return [];
  }
}

/**
 * Persists dispatched email
 */
function recordDispatchedEmail(payload: EmailDispatchPayload) {
  if (typeof window === 'undefined') return;
  try {
    const existing = getDispatchedEmails();
    const updated = [payload, ...existing].slice(0, 50); // keep latest 50
    localStorage.setItem(STORAGE_KEY_EMAILS, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed saving dispatched email:', err);
  }
  notifyListeners(payload);
}

/**
 * Gets auth accounts
 */
export function getAuthAccounts(): AuthAccount[] {
  if (typeof window === 'undefined') return DEFAULT_ACCOUNTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ACCOUNTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_ACCOUNTS, JSON.stringify(DEFAULT_ACCOUNTS));
      return DEFAULT_ACCOUNTS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed reading accounts:', err);
    return DEFAULT_ACCOUNTS;
  }
}

/**
 * Saves or updates an auth account
 */
export function saveAuthAccount(account: AuthAccount): void {
  if (typeof window === 'undefined') return;
  try {
    const accounts = getAuthAccounts();
    const existingIdx = accounts.findIndex(
      (a) => a.email.toLowerCase() === account.email.toLowerCase() || a.username.toLowerCase() === account.username.toLowerCase()
    );

    if (existingIdx >= 0) {
      accounts[existingIdx] = { ...accounts[existingIdx], ...account };
    } else {
      accounts.push(account);
    }

    localStorage.setItem(STORAGE_KEY_ACCOUNTS, JSON.stringify(accounts));
  } catch (err) {
    console.error('Failed saving auth account:', err);
  }
}

/**
 * Dispatches automated credentials email to student upon course registration
 */
export function dispatchStudentRegistrationEmail(data: {
  fullName: string;
  email: string;
  courseTitle: string;
  batchName: string;
  applicationNumber: string;
  amountPaid: number;
  totalFee: number;
}): { username: string; password: string; emailPayload: EmailDispatchPayload } {
  const username = data.email.toLowerCase();
  const password = `Silphor@STU${Math.floor(1000 + Math.random() * 9000)}`;

  // Store in accounts so they can log in immediately
  saveAuthAccount({
    email: data.email,
    username: username,
    password: password,
    fullName: data.fullName,
    role: 'student',
    registeredDate: new Date().toISOString().split('T')[0],
    additionalInfo: {
      applicationNumber: data.applicationNumber,
      courseTitle: data.courseTitle,
      batchName: data.batchName,
      amountPaid: data.amountPaid
    }
  });

  const emailPayload: EmailDispatchPayload = {
    id: `email-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    recipientEmail: data.email,
    recipientName: data.fullName,
    role: 'student',
    subject: `Enrolment Confirmed: ${data.courseTitle} - Your Silphor Student LMS Credentials`,
    preview: `Welcome ${data.fullName}! Your Silphor LMS Portal credentials for ${data.courseTitle} are inside.`,
    username: username,
    password: password,
    metadata: {
      applicationNumber: data.applicationNumber,
      courseTitle: data.courseTitle,
      batchName: data.batchName,
      amountPaid: data.amountPaid,
      totalFee: data.totalFee
    },
    bodyHtml: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1e293b;">
        <h2 style="color: #0B2545;">Welcome to Silphor Technologies!</h2>
        <p>Dear <strong>${data.fullName}</strong>,</p>
        <p>Your registration for <strong>${data.courseTitle}</strong> (${data.batchName}) has been officially accepted.</p>
        <p>Application Reference: <strong>${data.applicationNumber}</strong></p>
        
        <div style="background-color: #f0fdfa; border: 1px solid #99f6e4; border-radius: 8px; padding: 16px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #00828A;">Your Student Portal Login Credentials:</h3>
          <p style="margin: 6px 0;"><strong>Username / Email:</strong> <code style="background: #e2e8f0; padding: 2px 6px; border-radius: 4px;">${username}</code></p>
          <p style="margin: 6px 0;"><strong>Temporary Password:</strong> <code style="background: #e2e8f0; padding: 2px 6px; border-radius: 4px;">${password}</code></p>
          <p style="margin: 6px 0;"><strong>LMS Portal URL:</strong> <a href="/student-login">https://silphor123-p8c5.vercel.app/student-login</a></p>
          <p style="font-size: 12px; color: #64748b; margin-top: 10px;">Please change your password upon your first sign in via the Student Portal.</p>
        </div>

        <p><strong>Batch Schedule:</strong> Classes start as scheduled. EDA licenses and VPN credentials will be allocated on Day 1.</p>
        <p>Best regards,<br/><strong>Admissions & Academic Affairs Directorate</strong><br/>Silphor Technologies Bangalore</p>
      </div>
    `,
    sentAt: new Date().toISOString()
  };

  recordDispatchedEmail(emailPayload);
  return { username, password, emailPayload };
}

/**
 * Dispatches automated credentials email to trainer upon faculty registration
 */
export function dispatchTrainerRegistrationEmail(data: {
  fullName: string;
  email: string;
  phone: string;
  domain: string;
  experienceYears: string;
  organization: string;
}): { username: string; password: string; emailPayload: EmailDispatchPayload } {
  const username = data.email.toLowerCase();
  const password = `Silphor@TRN${Math.floor(1000 + Math.random() * 9000)}`;
  const facultyId = `SIL-FAC-2026-${Math.floor(1000 + Math.random() * 9000)}`;

  // Store in accounts so trainer can log in immediately
  saveAuthAccount({
    email: data.email,
    username: username,
    password: password,
    fullName: data.fullName,
    role: 'trainer',
    registeredDate: new Date().toISOString().split('T')[0],
    additionalInfo: {
      facultyId,
      domain: data.domain,
      experienceYears: data.experienceYears,
      organization: data.organization
    }
  });

  const emailPayload: EmailDispatchPayload = {
    id: `email-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    recipientEmail: data.email,
    recipientName: data.fullName,
    role: 'trainer',
    subject: `Faculty Onboarding: Welcome to Silphor Technologies - Trainer Console Credentials`,
    preview: `Welcome Prof./Er. ${data.fullName}! Your Silphor Faculty & Instructor Console credentials have been generated.`,
    username: username,
    password: password,
    metadata: {
      facultyId,
      domain: data.domain,
      experienceYears: data.experienceYears,
      organization: data.organization
    },
    bodyHtml: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1e293b;">
        <h2 style="color: #0B2545;">Faculty & Industry Trainer Onboarding</h2>
        <p>Dear <strong>${data.fullName}</strong>,</p>
        <p>Thank you for registering as an industry trainer for <strong>${data.domain}</strong> with Silphor Technologies.</p>
        <p>Assigned Faculty ID: <strong>${facultyId}</strong></p>
        
        <div style="background-color: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 16px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #0B2545;">Your Trainer Console Access Credentials:</h3>
          <p style="margin: 6px 0;"><strong>Username:</strong> <code style="background: #e2e8f0; padding: 2px 6px; border-radius: 4px;">${username}</code></p>
          <p style="margin: 6px 0;"><strong>Initial Password:</strong> <code style="background: #e2e8f0; padding: 2px 6px; border-radius: 4px;">${password}</code></p>
          <p style="margin: 6px 0;"><strong>Trainer Portal URL:</strong> <a href="/trainer-login">https://silphor123-p8c5.vercel.app/trainer-login</a></p>
          <p style="font-size: 12px; color: #64748b; margin-top: 10px;">Security Notice: Please use "Change Password" upon initial sign-in.</p>
        </div>

        <p><strong>Next Steps:</strong> The Dean of Academic Standards will review your syllabus schedule and assign active student batches.</p>
        <p>Warm regards,<br/><strong>Faculty Governance & Academic Directorate</strong><br/>Silphor Technologies</p>
      </div>
    `,
    sentAt: new Date().toISOString()
  };

  recordDispatchedEmail(emailPayload);
  return { username, password, emailPayload };
}

/**
 * Dispatches password reset email with temporary OTP/token
 */
export function dispatchForgotPasswordEmail(
  email: string,
  role: UserRole
): { resetOtp: string; emailPayload: EmailDispatchPayload } {
  const resetOtp = Math.floor(100000 + Math.random() * 900000).toString();
  const accounts = getAuthAccounts();
  const found = accounts.find((a) => a.email.toLowerCase() === email.toLowerCase());
  const recipientName = found ? found.fullName : 'Authorized User';

  const emailPayload: EmailDispatchPayload = {
    id: `email-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    recipientEmail: email,
    recipientName: recipientName,
    role: role,
    subject: `Password Reset Request - Silphor Technologies [${role.toUpperCase()}]`,
    preview: `Security Code: ${resetOtp}. Use this one-time code to reset your Silphor account password.`,
    username: email,
    bodyHtml: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1e293b;">
        <h2 style="color: #0B2545;">Password Recovery Request</h2>
        <p>Hello <strong>${recipientName}</strong>,</p>
        <p>We received a request to reset your password for your <strong>${role.toUpperCase()}</strong> portal account.</p>
        <div style="background-color: #f1f5f9; border: 1px dashed #00828A; border-radius: 8px; padding: 18px; text-align: center; margin: 20px 0;">
          <span style="font-size: 12px; text-transform: uppercase; color: #475569; letter-spacing: 0.1em; display: block; margin-bottom: 6px;">Your 6-Digit Password Reset OTP</span>
          <span style="font-size: 28px; font-weight: bold; letter-spacing: 6px; color: #00828A; font-family: monospace;">${resetOtp}</span>
        </div>
        <p style="font-size: 12px; color: #64748b;">This OTP expires in 15 minutes. If you did not request this reset, please ignore this email or report to security@silphor.com.</p>
      </div>
    `,
    sentAt: new Date().toISOString()
  };

  recordDispatchedEmail(emailPayload);
  return { resetOtp, emailPayload };
}

/**
 * Dispatches confirmation email when password was successfully changed
 */
export function dispatchPasswordChangedEmail(
  email: string,
  role: UserRole
): EmailDispatchPayload {
  const accounts = getAuthAccounts();
  const found = accounts.find((a) => a.email.toLowerCase() === email.toLowerCase());
  const recipientName = found ? found.fullName : 'Authorized User';

  const emailPayload: EmailDispatchPayload = {
    id: `email-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    recipientEmail: email,
    recipientName: recipientName,
    role: role,
    subject: `Security Alert: Your Silphor Account Password Was Changed`,
    preview: `Notice: The password for your ${role.toUpperCase()} portal account was updated successfully.`,
    username: email,
    bodyHtml: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #1e293b;">
        <h2 style="color: #0B2545;">Security Alert: Password Updated</h2>
        <p>Hello <strong>${recipientName}</strong>,</p>
        <p>This is a confirmation that the password for your <strong>${role.toUpperCase()}</strong> portal was successfully changed on <strong>${new Date().toLocaleString()}</strong>.</p>
        <p>If you made this change, no further action is required. You can now log in using your new password.</p>
        <p>If you did not initiate this change, please contact Silphor Cyber Security immediately at <a href="mailto:security@silphor.com">security@silphor.com</a> or helpline <a href="tel:+919876543210">+91 9876543210</a>.</p>
      </div>
    `,
    sentAt: new Date().toISOString()
  };

  recordDispatchedEmail(emailPayload);
  return emailPayload;
}

/**
 * Changes password for an existing account
 */
export function changeAccountPassword(
  role: UserRole,
  identifier: string,
  currentPassword: string,
  newPassword: string
): { success: boolean; message: string } {
  const accounts = getAuthAccounts();
  const lowerId = identifier.trim().toLowerCase();

  const accIndex = accounts.findIndex(
    (a) =>
      (a.email.toLowerCase() === lowerId || a.username.toLowerCase() === lowerId) &&
      (role === 'public' || a.role === role)
  );

  if (accIndex === -1) {
    return { success: false, message: `No ${role} account found matching "${identifier}".` };
  }

  const acc = accounts[accIndex];
  if (currentPassword && acc.password !== currentPassword) {
    return { success: false, message: 'Current password does not match records.' };
  }

  if (!newPassword || newPassword.length < 6) {
    return { success: false, message: 'New password must be at least 6 characters long.' };
  }

  accounts[accIndex].password = newPassword;
  localStorage.setItem(STORAGE_KEY_ACCOUNTS, JSON.stringify(accounts));

  // Send confirmation email
  dispatchPasswordChangedEmail(acc.email, acc.role);

  return { success: true, message: 'Password changed successfully! You may now sign in with your new credentials.' };
}

/**
 * Resets password using OTP verification
 */
export function resetAccountPasswordWithOtp(
  role: UserRole,
  identifier: string,
  newPassword: string
): { success: boolean; message: string } {
  const accounts = getAuthAccounts();
  const lowerId = identifier.trim().toLowerCase();

  const accIndex = accounts.findIndex(
    (a) =>
      (a.email.toLowerCase() === lowerId || a.username.toLowerCase() === lowerId) &&
      (role === 'public' || a.role === role)
  );

  if (accIndex === -1) {
    // If account doesn't exist yet, create it with new password for testing ease
    const newAcc: AuthAccount = {
      email: identifier.includes('@') ? identifier : `${identifier}@silphor.com`,
      username: identifier,
      password: newPassword,
      fullName: 'Authorized Member',
      role: role,
      registeredDate: new Date().toISOString().split('T')[0]
    };
    saveAuthAccount(newAcc);
    dispatchPasswordChangedEmail(newAcc.email, role);
    return { success: true, message: 'Password reset and new credentials activated successfully!' };
  }

  accounts[accIndex].password = newPassword;
  localStorage.setItem(STORAGE_KEY_ACCOUNTS, JSON.stringify(accounts));
  dispatchPasswordChangedEmail(accounts[accIndex].email, accounts[accIndex].role);

  return { success: true, message: 'Your password has been successfully reset! Sign in with your new password.' };
}

/**
 * Verifies credentials for role login
 */
export function verifyRoleLogin(
  role: UserRole,
  identifier: string,
  password: string
): { success: boolean; account?: AuthAccount; message?: string } {
  const accounts = getAuthAccounts();
  const cleanId = identifier.trim().toLowerCase();

  // Find matching account
  const account = accounts.find(
    (a) =>
      (a.email.toLowerCase() === cleanId || a.username.toLowerCase() === cleanId) &&
      (a.role === role || role === 'public')
  );

  if (!account) {
    // Check if preset default credentials match directly
    const preset = DEFAULT_ACCOUNTS.find(
      (p) =>
        (p.email.toLowerCase() === cleanId || p.username.toLowerCase() === cleanId) &&
        p.role === role
    );
    if (preset && preset.password === password) {
      saveAuthAccount(preset);
      return { success: true, account: preset };
    }
    return { success: false, message: `Invalid username or email for ${role.toUpperCase()} role.` };
  }

  if (account.password !== password) {
    return { success: false, message: 'Incorrect password. Click "Forgot Password" or "Change Password" to reset.' };
  }

  return { success: true, account };
}
