import crypto from 'node:crypto';
import { notifications } from '../db/schema';
import type { Database } from './db';
import { escapeHtml } from './forms';

export function verifySanitySignature(
  rawBody: string,
  signature: string,
  secret: string
): boolean {
  // Sanity GROQ webhooks send `sanity-webhook-signature: t=<ms>,v1=<base64url HMAC-SHA256 of "<t>.<body>">`
  if (!rawBody || !signature || !secret) {
    return false;
  }
  try {
    const parts = Object.fromEntries(
      signature.split(',').map((kv) => {
        const i = kv.indexOf('=');
        return [kv.slice(0, i).trim(), kv.slice(i + 1).trim()];
      })
    );
    const t = parts.t;
    const v1 = parts.v1;
    if (!t || !v1) return false;
    // Reject signatures older than 10 minutes (replay protection)
    if (Math.abs(Date.now() - Number(t)) > 10 * 60 * 1000) return false;
    const expected = crypto
      .createHmac('sha256', secret)
      .update(`${t}.${rawBody}`)
      .digest('base64url');
    const a = Buffer.from(expected, 'utf8');
    const b = Buffer.from(v1.replace(/=+$/, ''), 'utf8');
    return a.length === b.length && crypto.timingSafeEqual(a, b);
  } catch (err) {
    return false;
  }
}

export interface NotificationPayload {
  title: string;
  message: string;
  url?: string;
}

export async function dispatchNotifications(
  payload: NotificationPayload,
  env: Record<string, any>,
  db?: Database
): Promise<{ onesignal: boolean; brevo: boolean; deployHook: boolean }> {
  let onesignalSuccess = false;
  let brevoSuccess = false;
  let deployHookSuccess = false;

  // 1. OneSignal Push Notification
  if (env.ONESIGNAL_APP_ID && env.ONESIGNAL_REST_KEY) {
    try {
      const res = await fetch('https://onesignal.com/api/v1/notifications', {
        method: 'POST',
        headers: {
          Authorization: `Basic ${env.ONESIGNAL_REST_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          app_id: env.ONESIGNAL_APP_ID,
          headings: { en: payload.title },
          contents: { en: payload.message },
          url: payload.url || 'https://www.sbpsdoon.com/notices/',
          included_segments: ['Subscribed Users'],
        }),
      });
      onesignalSuccess = res.ok;
    } catch (err) {
      console.warn('OneSignal dispatch error:', err);
    }
  } else {
    // Graceful degradation
    onesignalSuccess = true;
  }

  // 2. Brevo Email Campaign / Broadcast
  if (env.BREVO_API_KEY && env.BREVO_LIST_ID) {
    try {
      const res = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'api-key': env.BREVO_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          subject: payload.title,
          sender: { name: 'Social Baluni Public School', email: 'info@sbpsdoon.com' },
          to: [{ email: 'broadcast@sbpsdoon.com' }],
          htmlContent: `<h2>${escapeHtml(payload.title)}</h2><p>${escapeHtml(payload.message)}</p><p><a href="${escapeHtml(payload.url || 'https://www.sbpsdoon.com')}">Read details</a></p>`,
        }),
      });
      brevoSuccess = res.ok;
    } catch (err) {
      console.warn('Brevo dispatch error:', err);
    }
  } else {
    brevoSuccess = true;
  }

  // 3. Cloudflare Pages Deploy Hook
  if (env.DEPLOY_HOOK_URL) {
    try {
      const res = await fetch(env.DEPLOY_HOOK_URL, { method: 'POST' });
      deployHookSuccess = res.ok;
    } catch (err) {
      console.warn('Deploy hook trigger error:', err);
    }
  } else {
    deployHookSuccess = true;
  }

  // 4. Log to D1 Database
  if (db) {
    try {
      await db.insert(notifications).values({
        id: `notif_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
        title: payload.title,
        message: payload.message,
        url: payload.url || null,
        channel: 'all',
        status: onesignalSuccess && brevoSuccess ? 'sent' : 'partial',
        sentAt: new Date().toISOString(),
      });
    } catch (err) {
      console.warn('D1 notification log error:', err);
    }
  }

  return {
    onesignal: onesignalSuccess,
    brevo: brevoSuccess,
    deployHook: deployHookSuccess,
  };
}
