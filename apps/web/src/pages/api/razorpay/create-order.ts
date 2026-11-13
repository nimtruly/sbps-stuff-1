import type { APIRoute } from 'astro';
import { createRazorpayOrder } from '../../../lib/razorpay';
import { getDb } from '../../../lib/db';
import { payments } from '../../../db/schema';

export const GET: APIRoute = async () => {
  return new Response(JSON.stringify({ endpoint: 'razorpay/create-order', method: 'POST required' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

export const POST: APIRoute = async ({ request, locals }) => {
  const runtime = (locals as any)?.runtime;
  const env = runtime?.env || process.env;
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

  if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
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
        feeCategory: feeCategory || 'General Tuition',
        studentName: studentName || null,
        parentEmail: parentEmail || null,
        parentPhone: parentPhone || null,
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
      keyId: env.RAZORPAY_KEY_ID || 'rzp_test_mock',
    }),
    {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    }
  );
};
