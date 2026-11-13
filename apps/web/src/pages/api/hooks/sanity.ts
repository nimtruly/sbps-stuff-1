import type { APIRoute } from 'astro';
import { verifySanitySignature, dispatchNotifications } from '../../../lib/notifications';
import { getDb } from '../../../lib/db';

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify({ endpoint: 'hooks/sanity', status: 'listening' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

export const POST: APIRoute = async ({ request, locals }) => {
  const runtime = (locals as any)?.runtime;
  const env = runtime?.env || process.env;
  const db = getDb(env.DB);

  const rawBody = await request.text();
  const signature = request.headers.get('sanity-webhook-signature');

  if (env.SANITY_WEBHOOK_SECRET) {
    if (!signature) {
      return new Response(JSON.stringify({ error: 'Missing sanity-webhook-signature' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    const isValid = verifySanitySignature(rawBody, signature, env.SANITY_WEBHOOK_SECRET);
    if (!isValid) {
      return new Response(JSON.stringify({ error: 'Invalid webhook signature' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }
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
