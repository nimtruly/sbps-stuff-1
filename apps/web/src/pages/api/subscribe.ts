import type { APIRoute } from 'astro';
import { getDb } from '../../lib/db';
import { subscribers } from '../../db/schema';

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify({ endpoint: 'subscribe', method: 'POST required' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

export const POST: APIRoute = async ({ request, locals }) => {
  const runtime = (locals as any)?.runtime;
  const env = runtime?.env || process.env;
  const db = getDb(env.DB);

  let email = '';
  const contentType = request.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    const data = await request.json();
    email = data.email;
  } else {
    const formData = await request.formData();
    email = String(formData.get('email') || '');
  }

  if (!email || !email.includes('@')) {
    return new Response(JSON.stringify({ error: 'Valid email is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const id = `sub_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  const createdAt = new Date().toISOString();

  if (db) {
    try {
      await db.insert(subscribers).values({
        id,
        email: email.trim().toLowerCase(),
        channel: 'web',
        createdAt,
      });
    } catch (err) {
      // Ignore duplicate email errors
      console.info('Subscriber insert note:', err);
    }
  }

  // Optional Brevo integration if configured
  if (env.BREVO_API_KEY && env.BREVO_LIST_ID) {
    try {
      await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: {
          'api-key': env.BREVO_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          listIds: [Number(env.BREVO_LIST_ID)],
          updateEnabled: true,
        }),
      });
    } catch (err) {
      console.warn('Brevo sync error:', err);
    }
  }

  return new Response(
    JSON.stringify({ success: true, message: 'Subscribed to notifications successfully' }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
};
