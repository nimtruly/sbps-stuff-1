import type { APIContext } from 'astro';
import type { z } from 'astro/zod';
import { getDb, type Database } from './db';
import { verifyTurnstile } from './turnstile';
import { sendEmailAlert } from './resend';
import { checkRateLimit } from './rateLimit';
import {
  clientIp,
  firstIssue,
  formError,
  formSuccess,
  getEnv,
  isProd,
  readBody,
  type FormName,
} from './forms';

interface SubmissionOptions<S extends z.ZodTypeAny> {
  form: FormName;
  schema: S;
  /** Insert the row; throw on failure. Return the public reference, if any. */
  save: (db: NonNullable<Database>, data: z.infer<S>, meta: { ip: string; createdAt: string }) => Promise<string | void>;
  /** Build the staff alert email. */
  alert: (data: z.infer<S>, ref: string | undefined) => { subject: string; html: string };
  /** Reference to show the visitor when no row was stored (local dev). */
  fallbackRef?: () => string;
}

/**
 * Shared POST handler for public forms: rate limit, Turnstile, Zod validation,
 * D1 insert, Resend alert. Works for plain HTML posts (303 to a result page)
 * and JSON clients. In production a submission must be stored or emailed,
 * otherwise the visitor is told it failed instead of being shown a false success.
 */
export async function handleSubmission<S extends z.ZodTypeAny>(
  ctx: APIContext,
  opts: SubmissionOptions<S>,
): Promise<Response> {
  const { request } = ctx;
  const env = getEnv(ctx.locals);
  const db = getDb(env.DB);
  const ip = clientIp(request, ctx.clientAddress);

  const rate = await checkRateLimit(db, ip, opts.form, 5, 600);
  if (!rate.allowed) {
    return formError(request, opts.form, 429, 'Too many submissions. Please wait 10 minutes and try again.');
  }

  const body = await readBody(request);

  const human = await verifyTurnstile(body['cf-turnstile-response'] as string | undefined, env.TURNSTILE_SECRET_KEY);
  if (!human) {
    return formError(request, opts.form, 403, 'The security check failed. Please reload the page and try again.');
  }

  const parsed = opts.schema.safeParse(body);
  if (!parsed.success) {
    return formError(request, opts.form, 400, `Please check the form (${firstIssue(parsed.error)}).`);
  }
  const data = parsed.data;
  const createdAt = new Date().toISOString();

  let stored = false;
  let ref: string | undefined;
  if (db) {
    try {
      ref = (await opts.save(db, data, { ip, createdAt })) || undefined;
      stored = true;
    } catch (err) {
      console.error(`[${opts.form}] D1 insert failed`, err);
    }
  }
  if (!ref && opts.fallbackRef) ref = opts.fallbackRef();

  const mail = opts.alert(data, ref);
  const emailed = env.RESEND_API_KEY
    ? await sendEmailAlert(mail, env.RESEND_API_KEY, env.ALERT_EMAIL_TO, env.ALERT_EMAIL_FROM)
    : false;
  if (!env.RESEND_API_KEY) {
    await sendEmailAlert(mail); // logs a mock line in dev
  }

  if (isProd && !stored && !emailed) {
    return formError(
      request,
      opts.form,
      503,
      'We could not record your submission right now. Please call the school office or try again later.',
    );
  }

  return formSuccess(request, opts.form, ref);
}
