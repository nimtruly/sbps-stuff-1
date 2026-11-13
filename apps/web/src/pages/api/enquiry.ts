import type { APIRoute } from 'astro';
import { getDb } from '../../lib/db';
import { enquiries } from '../../db/schema';
import { verifyTurnstile } from '../../lib/turnstile';
import { sendEmailAlert } from '../../lib/resend';
import { checkRateLimit } from '../../lib/rateLimit';

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify({ endpoint: 'enquiry', method: 'POST required' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

export const POST: APIRoute = async ({ request, clientAddress, locals }) => {
  const ip = clientAddress || request.headers.get('cf-connecting-ip') || '127.0.0.1';
  const runtime = (locals as any)?.runtime;
  const env = runtime?.env || process.env;
  const db = getDb(env.DB);

  // 1. Rate Limiting Check
  const rate = await checkRateLimit(db, ip, 'enquiry', 5, 600);
  if (!rate.allowed) {
    return new Response(
      JSON.stringify({ error: 'Too many requests. Please wait 10 minutes.' }),
      { status: 429, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // Parse Form Data or JSON
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
    parentName,
    studentName,
    grade,
    email,
    phone,
    preferredContact,
    message,
    'cf-turnstile-response': turnstileToken,
  } = body;

  if (!parentName || !studentName || !grade || !email || !phone) {
    return new Response(
      JSON.stringify({ error: 'Missing mandatory fields' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // 2. Turnstile Verification
  const isHuman = await verifyTurnstile(turnstileToken, env.TURNSTILE_SECRET_KEY);
  if (!isHuman) {
    return new Response(
      JSON.stringify({ error: 'Security verification failed. Please try again.' }),
      { status: 403, headers: { 'Content-Type': 'application/json' } }
    );
  }

  // 3. Save to D1 Database
  const id = `enq_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  const createdAt = new Date().toISOString();

  if (db) {
    try {
      await db.insert(enquiries).values({
        id,
        parentName: String(parentName),
        studentName: String(studentName),
        grade: String(grade),
        email: String(email),
        phone: String(phone),
        preferredContact: String(preferredContact || 'phone'),
        message: message ? String(message) : null,
        ip,
        createdAt,
      });
    } catch (err) {
      console.warn('D1 insert enquiry error:', err);
    }
  }

  // 4. Send Email Alert via Resend
  await sendEmailAlert(
    {
      subject: `New Admission Enquiry: ${studentName} (${grade})`,
      html: `
        <h2>New Admission Enquiry Received</h2>
        <p><strong>Parent Name:</strong> ${parentName}</p>
        <p><strong>Student Name:</strong> ${studentName}</p>
        <p><strong>Grade:</strong> ${grade}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Preferred Contact:</strong> ${preferredContact || 'phone'}</p>
        <p><strong>Message:</strong> ${message || 'None'}</p>
        <hr />
        <p><small>Enquiry ID: ${id} | Received: ${createdAt}</small></p>
      `,
    },
    env.RESEND_API_KEY,
    env.ALERT_EMAIL_TO,
    env.ALERT_EMAIL_FROM
  );

  // If HTML form post, redirect with query param or render success
  if (!contentType.includes('application/json')) {
    return new Response(null, {
      status: 302,
      headers: { Location: '/admissions/enquire/?success=true' },
    });
  }

  return new Response(
    JSON.stringify({ success: true, id, message: 'Enquiry submitted successfully' }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
};
