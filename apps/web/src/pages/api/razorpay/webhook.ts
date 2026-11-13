import type { APIRoute } from 'astro';
import { verifyRazorpaySignature } from '../../../lib/razorpay';
import { getDb } from '../../../lib/db';
import { payments } from '../../../db/schema';
import { sendEmailAlert } from '../../../lib/resend';
import { eq } from 'drizzle-orm';
import { emailTable, getEnv, methodNotAllowed } from '../../../lib/forms';

export const prerender = false;

export const GET: APIRoute = () => methodNotAllowed();

export const POST: APIRoute = async ({ request, locals }) => {
  const env = getEnv(locals);
  const db = getDb(env.DB);

  const signature = request.headers.get('x-razorpay-signature');
  const rawBody = await request.text();

  // Fail closed: without a configured secret no webhook is trusted.
  if (!env.RAZORPAY_WEBHOOK_SECRET) {
    return new Response(JSON.stringify({ error: 'Webhook not configured' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  if (!signature || !verifyRazorpaySignature(rawBody, signature, env.RAZORPAY_WEBHOOK_SECRET)) {
    return new Response(JSON.stringify({ error: 'Invalid webhook signature' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
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
              signature,
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
            signature,
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
          html:
            emailTable('Payment received: Social Baluni Public School', [
              ['For', feeCategory],
              ['Amount', `INR ${amount}`],
              ['Student', studentName || 'As enrolled'],
              ['Transaction ID', paymentId],
              ['Order ID', orderId],
              ['Date', new Date().toLocaleDateString('en-IN')],
            ]) + '<p>This is an automated receipt from Social Baluni Public School, Dehradun.</p>',
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
