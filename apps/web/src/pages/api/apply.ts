import type { APIRoute } from 'astro';
import { getDb } from '../../lib/db';
import { applications } from '../../db/schema';
import { verifyTurnstile } from '../../lib/turnstile';
import { sendEmailAlert } from '../../lib/resend';
import { checkRateLimit } from '../../lib/rateLimit';

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify({ endpoint: 'apply', method: 'POST required' }), {
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
  const rate = await checkRateLimit(db, ip, 'apply', 5, 600);
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
    studentName,
    gender,
    dob,
    grade,
    aadhaarChild,
    previousSchool,
    previousBoard,
    lastClassPercentage,
    fatherName,
    fatherOccupation,
    motherName,
    motherOccupation,
    mobile,
    email,
    address,
    declaration,
    'cf-turnstile-response': turnstileToken,
  } = body;

  if (!studentName || !gender || !dob || !grade || !fatherName || !motherName || !mobile || !email || !address) {
    return new Response(
      JSON.stringify({ error: 'Missing required admission form fields' }),
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

  const id = `app_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  const createdAt = new Date().toISOString();

  if (db) {
    try {
      await db.insert(applications).values({
        id,
        studentName: String(studentName),
        gender: String(gender),
        dob: String(dob),
        grade: String(grade),
        aadhaarChild: aadhaarChild ? String(aadhaarChild) : null,
        previousSchool: previousSchool ? String(previousSchool) : null,
        previousBoard: previousBoard ? String(previousBoard) : null,
        lastClassPercentage: lastClassPercentage ? String(lastClassPercentage) : null,
        fatherName: String(fatherName),
        fatherOccupation: fatherOccupation ? String(fatherOccupation) : null,
        motherName: String(motherName),
        motherOccupation: motherOccupation ? String(motherOccupation) : null,
        mobile: String(mobile),
        email: String(email),
        address: String(address),
        declaration: declaration === 'on' || declaration === true || declaration === 'true',
        ip,
        createdAt,
      });
    } catch (err) {
      console.warn('D1 insert application error:', err);
    }
  }

  // Email Alert
  await sendEmailAlert(
    {
      subject: `New Online Admission Application: ${studentName} (${grade})`,
      html: `
        <h2>New Student Admission Application</h2>
        <p><strong>Application Reference:</strong> ${id}</p>
        <p><strong>Student Name:</strong> ${studentName} (${gender}, DOB: ${dob})</p>
        <p><strong>Grade Applied:</strong> ${grade}</p>
        <p><strong>Father's Name:</strong> ${fatherName} (${fatherOccupation || 'N/A'})</p>
        <p><strong>Mother's Name:</strong> ${motherName} (${motherOccupation || 'N/A'})</p>
        <p><strong>Contact:</strong> ${mobile} | ${email}</p>
        <p><strong>Residential Address:</strong> ${address}</p>
        <p><strong>Previous School:</strong> ${previousSchool || 'N/A'} (${previousBoard || 'N/A'}, ${lastClassPercentage || 'N/A'}%)</p>
        <hr />
        <p><small>Submitted: ${createdAt}</small></p>
      `,
    },
    env.RESEND_API_KEY,
    env.ALERT_EMAIL_TO,
    env.ALERT_EMAIL_FROM
  );

  if (!contentType.includes('application/json')) {
    return new Response(null, {
      status: 302,
      headers: { Location: '/admissions/apply/?success=true' },
    });
  }

  return new Response(
    JSON.stringify({ success: true, id, message: 'Application registered successfully' }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  );
};
