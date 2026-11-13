import type { APIRoute } from 'astro';
import { verifyRazorpaySignature } from '../../../lib/razorpay';
import { getDb } from '../../../lib/db';
import { payments } from '../../../db/schema';
import { sendEmailAlert } from '../../../lib/resend';
import { eq } from 'drizzle-orm';

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify({ endpoint: 'razorpay/webhook', status: 'listening' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

export const POST: APIRoute = async ({ request, locals }) => {
  const runtime = (locals as any)?.runtime;
  const env = runtime?.env || process.env;
  const db = getDb(env.DB);

  const signature = request.headers.get('x-razorpay-signature');
  const rawBody = await request.text();

  // If webhook secret is configured, verify HMAC signature
  if (env.RAZORPAY_WEBHOOK_SECRET) {
    if (!signature) {
      return new Response(JSON.stringify({ error: 'Missing x-razorpay-signature' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    const isValid = verifyRazorpaySignature(rawBody, signature, env.RAZORPAY_WEBHOOK_SECRET);
    if (!isValid) {
      return new Response(JSON.stringify({ error: 'Invalid webhook signature' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }

  let eventData: any = {};
  try {
    eventData = JSON.parse(rawBody);
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Malformed JSON payload' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const event = eventData.event;
  const paymentEntity = eventData.payload?.payment?.entity;

  if (event === 'payment.captured' || event === 'order.paid') {
    const paymentId = paymentEntity?.id;
    const orderId = paymentEntity?.order_id;
    const amount = paymentEntity?.amount ? paymentEntity.amount / 100 : 0;
    const email = paymentEntity?.email;
    const phone = paymentEntity?.contact;
    const feeCategory = paymentEntity?.notes?.feeCategory || 'School Fee';
    const studentName = paymentEntity?.notes?.studentName || '';

    if (db && orderId) {
      try {
        const existing = await db
          .select()
          .from(payments)
          .where(eq(payments.orderId, orderId))
          .get();

        if (existing) {
          await db
            .update(payments)
            .set({
              paymentId,
              signature: signature || 'webhook_verified',
              status: 'paid',
              parentEmail: email || existing.parentEmail,
              parentPhone: phone || existing.parentPhone,
            })
            .where(eq(payments.orderId, orderId));
        } else {
          await db.insert(payments).values({
            id: `pay_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
            orderId,
            paymentId,
            signature: signature || 'webhook_verified',
            amount,
            currency: 'INR',
            status: 'paid',
            feeCategory,
            studentName,
            parentEmail: email,
            parentPhone: phone,
            createdAt: new Date().toISOString(),
          });
        }
      } catch (err) {
        console.warn('D1 webhook update error:', err);
      }
    }

    // Send fee receipt email
    if (email) {
      await sendEmailAlert(
        {
          to: email,
          subject: `Payment Receipt: Social Baluni Public School (₹${amount})`,
          html: `
            <h2>Payment Successful — Fee Receipt</h2>
            <p>Dear Parent,</p>
            <p>We gratefully acknowledge receipt of your payment for <strong>${feeCategory}</strong>.</p>
            <table border="1" cellpadding="8" style="border-collapse: collapse; font-size: 14px;">
              <tr><td><strong>Transaction ID</strong></td><td>${paymentId}</td></tr>
              <tr><td><strong>Order ID</strong></td><td>${orderId}</td></tr>
              <tr><td><strong>Amount Paid</strong></td><td>₹${amount}</td></tr>
              <tr><td><strong>Student Name</strong></td><td>${studentName || 'As enrolled'}</td></tr>
              <tr><td><strong>Date</strong></td><td>${new Date().toLocaleDateString('en-IN')}</td></tr>
            </table>
            <p>This is an automated computer-generated receipt for Social Baluni Public School, Dehradun.</p>
          `,
        },
        env.RESEND_API_KEY,
        env.ALERT_EMAIL_TO,
        env.ALERT_EMAIL_FROM
      );
    }
  }

  return new Response(JSON.stringify({ status: 'ok', event }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
