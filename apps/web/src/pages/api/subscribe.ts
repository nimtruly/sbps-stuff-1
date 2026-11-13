import type { APIRoute } from 'astro';
import { getDb } from '../../lib/db';
import { subscribers } from '../../db/schema';
import { checkRateLimit } from '../../lib/rateLimit';
import {
  clientIp,
  formError,
  formSuccess,
  getEnv,
  isProd,
  methodNotAllowed,
  newId,
  readBody,
  subscribeSchema,
} from '../../lib/forms';

export const prerender = false;

export const GET: APIRoute = () => methodNotAllowed();

export const POST: APIRoute = async ({ request, locals, clientAddress }) => {
  const env = getEnv(locals);
  const db = getDb(env.DB);

  const rate = await checkRateLimit(db, clientIp(request, clientAddress), 'subscribe', 5, 600);
  if (!rate.allowed) return formError(request, 'subscribe', 429, 'Too many attempts. Please try again later.');

  const parsed = subscribeSchema.safeParse(await readBody(request));
  if (!parsed.success) return formError(request, 'subscribe', 400, 'Please enter a valid email address.');
  const { email } = parsed.data;

  let stored = false;
  if (db) {
    try {
      await db
        .insert(subscribers)
        .values({ id: newId('sub'), email, channel: 'web', createdAt: new Date().toISOString() })
        .onConflictDoNothing();
      stored = true;
    } catch (err) {
      console.error('[subscribe] D1 insert failed', err);
    }
  }

  let synced = false;
  if (env.BREVO_API_KEY && env.BREVO_LIST_ID) {
    try {
      const res = await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: { 'api-key': env.BREVO_API_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, listIds: [Number(env.BREVO_LIST_ID)], updateEnabled: true }),
      });
      synced = res.ok;
    } catch (err) {
      console.error('[subscribe] Brevo sync failed', err);
    }
  }

  if (isProd && !stored && !synced) {
    return formError(request, 'subscribe', 503, 'Subscriptions are not available right now. Please try again later.');
  }
  return formSuccess(request, 'subscribe');
};
