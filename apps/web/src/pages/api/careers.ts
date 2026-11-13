import type { APIRoute } from 'astro';
import { getDb } from '../../lib/db';
import { careerApplications } from '../../db/schema';
import { verifyTurnstile } from '../../lib/turnstile';
import { sendEmailAlert } from '../../lib/resend';
import { checkRateLimit } from '../../lib/rateLimit';

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify({ endpoint: 'careers', method: 'POST required' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

export const POST: APIRoute = async ({ request, clientAddress, locals }) => {
  const ip = clientAddress || request.headers.get('cf-connecting-ip') || '127.0.0.1';
  const runtime = (locals as any)?.runtime;
  const env = runtime?.env || process.env;
  const db = getDb(env.DB);

  // Rate Limiting
  const rate = await checkRateLimit(db, ip, 'careers', 5, 600);
  if (!rate.allowed) {
    return new Response(
      JSON.stringify({ error: 'Too many requests. Please wait 10 minutes.' }),
      { status: 429, headers: { 'Content-Type': 'application/json' } }
    );
  }

  let body: Record<string, any> = {};
  const contentType = request.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    body = await request.json();
  } else {
    const formData = await request.formData();
    for (const [k, v] of formData.entries()) {
      body[k] = v;
    }
  }

  const {
    fullName,
    email,
    phone,
    position,
    experience,
    qualifications,
    coverNote,
    'cf-turnstile-response': turnstileToken,
  } = body;

  if (!fullName || !email || !phone || !position) {
    return new Response(
      JSON.stringify({ error: 'Missing mandatory fields' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Turnstile
  const isHuman = await verifyTurnstile(turnstileToken, env.TURNSTILE_SECRET_KEY);
  if (!isHuman) {
    return new Response(
      JSON.stringify({ error: 'Security verification failed. Please try again.' }),
      { status: 403, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const id = `job_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  const createdAt = new Date().toISOString();

  if (db) {
    try {
      await db.insert(careerApplications).values({
        id,
        fullName: String(fullName),
        email: String(email),
        phone: String(phone),
        position: String(position),
        experience: experience ? String(experience) : null,
        qualifications: qualifications ? String(qualifications) : null,
        coverNote: coverNote ? String(coverNote) : null,
        ip,
        createdAt,
      });
    } catch (err) {
      console.warn('D1 insert careers error:', err);
    }
  }

  // Email Alert
  await sendEmailAlert(
    {
      subject: `New Faculty Application: ${fullName} (${position})`,
      html: `
        <h2>New Faculty Application Received</h2>
        <p><strong>Candidate Name:</strong> ${fullName}</p>
        <p><strong>Position:</strong> ${position}</p>
        <p><strong>Experience:</strong> ${experience || 'N/A'}</p>
        <p><strong>Qualifications:</strong> ${qualifications || 'N/A'}</p>
        <p><strong>Contact:</strong> ${phone} | ${email}</p>
        <p><strong>Cover Note:</strong> ${coverNote || 'None'}</p>
        <hr />
        <p><small>Application ID: ${id} | Submitted: ${createdAt}</small></p>
      `,
    },
    env.RESEND_API_KEY,
    env.ALERT_EMAIL_TO,
    env.ALERT_EMAIL_FROM
  );

  if (!contentType.includes('application/json')) {
    return new Response(null, {
      status: 302,
      headers: { Location: '/careers/?success=true#apply-form' },
    });
  }

  return new Response(
    JSON.stringify({ success: true, id, message: 'Application submitted successfully' }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
};
