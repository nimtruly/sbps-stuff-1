import { describe, it, expect } from 'vitest';
import { verifyRazorpaySignature } from '../src/lib/razorpay';
import crypto from 'node:crypto';

describe('Razorpay HMAC Signature Verification', () => {
  const secret = 'sbps_test_webhook_secret_key_12345';
  const payload = JSON.stringify({
    event: 'payment.captured',
    payload: {
      payment: {
        entity: {
          id: 'pay_ABC123XYZ',
          order_id: 'order_DEF456UVW',
          amount: 780000,
          currency: 'INR',
          status: 'captured',
          email: 'parent@example.com',
          contact: '9690000890',
        },
      },
    },
  });

  const validSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');

  it('validates a correct HMAC signature matching the payload and secret', () => {
    const result = verifyRazorpaySignature(payload, validSignature, secret);
    expect(result).toBe(true);
  });

  it('rejects when payload is tampered', () => {
    const tamperedPayload = payload.replace('780000', '100000');
    const result = verifyRazorpaySignature(tamperedPayload, validSignature, secret);
    expect(result).toBe(false);
  });

  it('rejects when signature does not match', () => {
    const invalidSignature = 'f'.repeat(64);
    const result = verifyRazorpaySignature(payload, invalidSignature, secret);
    expect(result).toBe(false);
  });

  it('rejects when secret does not match', () => {
    const result = verifyRazorpaySignature(payload, validSignature, 'wrong_secret');
    expect(result).toBe(false);
  });

  it('handles empty or missing parameters gracefully', () => {
    expect(verifyRazorpaySignature('', validSignature, secret)).toBe(false);
    expect(verifyRazorpaySignature(payload, '', secret)).toBe(false);
    expect(verifyRazorpaySignature(payload, validSignature, '')).toBe(false);
  });
});
