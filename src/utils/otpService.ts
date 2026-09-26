interface OtpSendResponse {
  success: boolean;
  message?: string;
}

const otpApiUrl = import.meta.env.VITE_OTP_API_URL as string | undefined;

function normalizePhone(phone: string): string {
  const compactPhone = phone.trim().replace(/[\s()-]/g, '');
  if (/^\d{10}$/.test(compactPhone)) return `+91${compactPhone}`;
  if (/^91\d{10}$/.test(compactPhone)) return `+${compactPhone}`;
  return compactPhone;
}

async function callOtpApi(path: string, body: Record<string, string>): Promise<void> {
  if (!otpApiUrl) {
    throw new Error('SMS OTP service is not configured. Set VITE_OTP_API_URL.');
  }

  const response = await fetch(`${otpApiUrl.replace(/\/$/, '')}/${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  let result: OtpSendResponse = { success: response.ok };
  try {
    result = await response.json() as OtpSendResponse;
  } catch {
    // Use the HTTP status when the provider does not return JSON.
  }

  if (!response.ok || !result.success) {
    throw new Error(result.message || 'The SMS provider could not send the OTP.');
  }
}

export function requestMobileOtp(phone: string): Promise<void> {
  return callOtpApi('send', { phone: normalizePhone(phone) });
}

export function verifyMobileOtp(phone: string, code: string): Promise<void> {
  return callOtpApi('verify', { phone: normalizePhone(phone), code });
}
