import { describe, it, expect, vi, beforeEach } from 'vitest';
import { verifySanitySignature, dispatchNotifications } from '../src/lib/notifications';
import crypto from 'node:crypto';

describe('Sanity Webhook Signature Verification', () => {
  const secret = 'my_sanity_secret_token_123';
  const body = JSON.stringify({ _type: 'notice', title: 'Test circular' });
  const sign = (t: number, b = body, s = secret) =>
    `t=${t},v1=${crypto.createHmac('sha256', s).update(`${t}.${b}`).digest('base64url')}`;

  it('validates a Sanity-format signature (t=…,v1=…)', () => {
    expect(verifySanitySignature(body, sign(Date.now()), secret)).toBe(true);
  });

  it('rejects an invalid signature, wrong secret or tampered body', () => {
    const t = Date.now();
    expect(verifySanitySignature(body, 'invalid_sig', secret)).toBe(false);
    expect(verifySanitySignature(body, sign(t), 'wrong_secret')).toBe(false);
    expect(verifySanitySignature(body.replace('Test', 'Fake'), sign(t), secret)).toBe(false);
  });

  it('rejects a replayed signature older than 10 minutes', () => {
    expect(verifySanitySignature(body, sign(Date.now() - 11 * 60 * 1000), secret)).toBe(false);
  });
});

describe('Notification Dispatcher', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('gracefully degrades when no integration keys are set', async () => {
    const result = await dispatchNotifications(
      { title: 'Test Notice', message: 'Test Message' },
      {} // empty env
    );
    expect(result.onesignal).toBe(true);
    expect(result.brevo).toBe(true);
    expect(result.deployHook).toBe(true);
  });

  it('calls OneSignal, Brevo and Deploy Hook when environment keys are provided', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ id: 'mock_res' }),
    });
    vi.stubGlobal('fetch', fetchMock);

    const env = {
      ONESIGNAL_APP_ID: 'onesignal-app-123',
      ONESIGNAL_REST_KEY: 'onesignal-rest-456',
      BREVO_API_KEY: 'brevo-key-789',
      BREVO_LIST_ID: '42',
      DEPLOY_HOOK_URL: 'https://api.cloudflare.com/client/v4/pages/webhooks/deploy_hooks/mock',
    };

    const result = await dispatchNotifications(
      { title: 'New Circular', message: 'School reopens on Monday', url: 'https://www.sbpsdoon.com/notices/reopen/' },
      env
    );

    expect(result.onesignal).toBe(true);
    expect(result.brevo).toBe(true);
    expect(result.deployHook).toBe(true);

    expect(fetchMock).toHaveBeenCalledTimes(3);

    // Verify OneSignal call
    expect(fetchMock).toHaveBeenCalledWith(
      'https://onesignal.com/api/v1/notifications',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          Authorization: 'Basic onesignal-rest-456',
        }),
      })
    );

    // Verify Brevo call
    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.brevo.com/v3/smtp/email',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'api-key': 'brevo-key-789',
        }),
      })
    );

    // Verify Deploy hook call
    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.cloudflare.com/client/v4/pages/webhooks/deploy_hooks/mock',
      expect.objectContaining({ method: 'POST' })
    );
  });
});
