import type { APIRoute } from 'astro';
import { createRazorpayOrder } from '../../../lib/razorpay';
import { getDb } from '../../../lib/db';
import { payments } from '../../../db/schema';
import { getEnv, methodNotAllowed } from '../../../lib/forms';

export const prerender = false;

export const GET: APIRoute = () => methodNotAllowed();

export const POST: APIRoute = async ({ request, locals }) => {
  const env = getEnv(locals);
  if (import.meta.env.PROD && (!env.RAZORPAY_KEY_ID || !env.RAZORPAY_KEY_SECRET)) {
    return new Response(JSON.stringify({ error: 'Online payment is not configured' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  const db = getDb(env.DB);

  let body: any = {};
  try {
    body = await request.json();
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { amount, feeCategory, studentName, parentEmail, parentPhone } = body;

  if (!amount || isNaN(Number(amount)) || Number(amount) < 1 || Number(amount) > 500000) {
    return new Response(JSON.stringify({ error: 'Valid payment amount is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const receipt = `rcpt_${Date.now()}`;
  const order = await createRazorpayOrder(
    Number(amount),
    receipt,
    env.RAZORPAY_KEY_ID,
    env.RAZORPAY_KEY_SECRET
  );

  if (!order) {
    return new Response(JSON.stringify({ error: 'Failed to initiate order with Razorpay' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Pre-insert payment record with status 'created'
  if (db) {
    try {
      await db.insert(payments).values({
        id: `pay_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
        orderId: order.id,
        amount: Number(amount),
        currency: order.currency,
        status: 'created',
        feeCategory: String(feeCategory || 'School fee').slice(0, 80),
        studentName: studentName ? String(studentName).slice(0, 100) : null,
        parentEmail: parentEmail ? String(parentEmail).slice(0, 160) : null,
        parentPhone: parentPhone ? String(parentPhone).slice(0, 20) : null,
        createdAt: new Date().toISOString(),
      });
    } catch (err) {
      console.warn('D1 payment creation record note:', err);
    }
  }

  return new Response(
    JSON.stringify({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: env.RAZORPAY_KEY_ID || 'rzp_test_mock_dev_only',
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  );
};
