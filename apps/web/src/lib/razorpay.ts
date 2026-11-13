import crypto from 'node:crypto';

export interface RazorpayOrderResult {
  id: string;
  amount: number;
  currency: string;
  receipt?: string;
}

export function verifyRazorpaySignature(
  rawBody: string,
  signature: string,
  secret: string
): boolean {
  if (!rawBody || !signature || !secret) {
    return false;
  }
  try {
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(rawBody)
      .digest('hex');

    // Timing-safe comparison to prevent timing attacks
    return crypto.timingSafeEqual(
      Buffer.from(expectedSignature, 'utf8'),
      Buffer.from(signature, 'utf8')
    );
  } catch (err) {
    return false;
  }
}

export async function createRazorpayOrder(
  amount: number, // in INR
  receipt: string,
  keyId?: string,
  keySecret?: string,
  currency = 'INR'
): Promise<RazorpayOrderResult | null> {
  // If credentials not configured, graceful degradation
  if (!keyId || !keySecret) {
    console.info(`[Razorpay (Mock)] Order created for amount: ₹${amount}`);
    return {
      id: `order_mock_${Date.now()}`,
      amount: amount * 100, // in paise
      currency,
      receipt,
    };
  }

  try {
    const basicAuth = Buffer.from(`${keyId}:${keySecret}`).toString('base64');
    const res = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basicAuth}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: Math.round(amount * 100), // in paise
        currency,
        receipt,
      }),
    });

    if (!res.ok) {
      console.warn('Razorpay order creation HTTP error:', res.status, await res.text());
      return null;
    }

    const data = (await res.json()) as any;
    return {
      id: data.id,
      amount: data.amount,
      currency: data.currency,
      receipt: data.receipt,
    };
  } catch (err) {
    console.warn('Razorpay order creation exception:', err);
    return null;
  }
}
