interface RazorpayOrder {
  id: string;
  amount: number;
  currency: string;
  receipt: string;
}

interface RazorpayCheckoutResponse {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

const apiUrl = import.meta.env.VITE_API_URL as string | undefined;
const razorpayScriptUrl = 'https://checkout.razorpay.com/v1/checkout.js';

function getApiUrl(): string {
  if (!apiUrl) throw new Error('Payment API is not configured. Set VITE_API_URL.');
  return apiUrl.replace(/\/$/, '');
}

async function parseResponse(response: Response): Promise<Record<string, unknown>> {
  const result = await response.json().catch(() => ({})) as Record<string, unknown>;
  if (!response.ok || result.success === false) {
    throw new Error(typeof result.message === 'string' ? result.message : 'The payment service returned an error.');
  }
  return result;
}

function loadRazorpayCheckout(): Promise<void> {
  if (window.Razorpay) return Promise.resolve();

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = razorpayScriptUrl;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Razorpay Checkout could not be loaded.'));
    document.body.appendChild(script);
  });
}

export async function openRazorpayPayment(input: {
  amount: number;
  receipt: string;
  name: string;
  email: string;
  phone: string;
  description: string;
}): Promise<RazorpayCheckoutResponse> {
  await loadRazorpayCheckout();

  const orderResponse = await fetch(`${getApiUrl()}/payment/order`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount: input.amount, receipt: input.receipt }),
  });
  const order = await parseResponse(orderResponse) as unknown as RazorpayOrder & { keyId: string };

  return new Promise((resolve, reject) => {
    const checkout = new window.Razorpay({
      key: order.keyId,
      amount: order.amount,
      currency: order.currency,
      name: 'Silphor Technologies',
      description: input.description,
      order_id: order.id,
      prefill: { name: input.name, email: input.email, contact: input.phone },
      theme: { color: '#00828A' },
      handler: (response: RazorpayCheckoutResponse) => resolve(response),
      modal: { ondismiss: () => reject(new Error('Payment was cancelled.')) },
    });
    checkout.on('payment.failed', () => reject(new Error('Razorpay payment failed.')));
    checkout.open();
  });
}

export async function verifyRazorpayPayment(payment: RazorpayCheckoutResponse): Promise<void> {
  const response = await fetch(`${getApiUrl()}/payment/verify`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payment),
  });
  await parseResponse(response);
}

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => {
      open: () => void;
      on: (event: string, callback: () => void) => void;
    };
  }
}
