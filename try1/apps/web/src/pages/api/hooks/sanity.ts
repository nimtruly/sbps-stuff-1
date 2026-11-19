import type { APIRoute } from 'astro';
import { verifySanitySignature, dispatchNotifications } from '../../../lib/notifications';
import { getDb } from '../../../lib/db';
import { getEnv, methodNotAllowed } from '../../../lib/forms';

export const prerender = false;

export const GET: APIRoute = () => methodNotAllowed();

export const POST: APIRoute = async ({ request, locals }) => {
  const env = getEnv(locals);
  const db = getDb(env.DB);

  const rawBody = await request.text();
  const signature = request.headers.get('sanity-webhook-signature');

  // Fail closed: notifications reach every subscriber, so never act on unsigned calls.
  if (!env.SANITY_WEBHOOK_SECRET) {
    return new Response(JSON.stringify({ error: 'Webhook not configured' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  if (!signature || !verifySanitySignature(rawBody, signature, env.SANITY_WEBHOOK_SECRET)) {
    return new Response(JSON.stringify({ error: 'Invalid webhook signature' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let doc: any = {};
  try {
    doc = JSON.parse(rawBody);
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Malformed JSON payload' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const docType = doc._type || doc.type || 'notice';
  const title = doc.title || 'New Announcement from SBPS Dehradun';
  const message = doc.body?.slice?.(0, 150) || doc.excerpt || 'Read the full circular on the school website.';
  const url = doc.slug?.current
    ? `https://www.sbpsdoon.com/${docType === 'article' ? 'blog' : 'notices'}/${doc.slug.current}/`
    : 'https://www.sbpsdoon.com/notices/';

  const results = await dispatchNotifications({ title, message, url }, env, db);

  return new Response(JSON.stringify({ success: true, docType, results }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
