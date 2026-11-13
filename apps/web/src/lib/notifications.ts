import crypto from 'node:crypto';
import { notifications } from '../db/schema';
import type { Database } from './db';

export function verifySanitySignature(
  rawBody: string,
  signature: string,
  secret: string
): boolean {
  if (!rawBody || !signature || !secret) {
    return false;
  }
  try {
    const expected = crypto
      .createHmac('sha256', secret)
      .update(rawBody)
      .digest('base64');
    return crypto.timingSafeEqual(
      Buffer.from(expected, 'utf8'),
      Buffer.from(signature, 'utf8')
    );
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
          htmlContent: `<h2>${payload.title}</h2><p>${payload.message}</p><p><a href="${payload.url || 'https://www.sbpsdoon.com'}">Read details</a></p>`,
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
