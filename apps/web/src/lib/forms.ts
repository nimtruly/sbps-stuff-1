import { z } from 'astro/zod';

/** Runtime env: Cloudflare bindings in production, process.env in local dev/tests. */
export function getEnv(locals: unknown): Record<string, any> {
  const runtime = (locals as any)?.runtime;
  return runtime?.env || (typeof process !== 'undefined' ? process.env : {});
}

export const isProd = import.meta.env.PROD;

export function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function clientIp(request: Request, clientAddress?: string): string {
  return request.headers.get('cf-connecting-ip') || clientAddress || 'unknown';
}

export function wantsJson(request: Request): boolean {
  const ct = request.headers.get('content-type') || '';
  const accept = request.headers.get('accept') || '';
  return ct.includes('application/json') || (accept.includes('application/json') && !accept.includes('text/html'));
}

export async function readBody(request: Request): Promise<Record<string, unknown>> {
  const ct = request.headers.get('content-type') || '';
  try {
    if (ct.includes('application/json')) return (await request.json()) as Record<string, unknown>;
    const fd = await request.formData();
    const out: Record<string, unknown> = {};
    for (const [k, v] of fd.entries()) if (typeof v === 'string') out[k] = v;
    return out;
  } catch {
    return {};
  }
}

const trimmed = (max: number) => z.string().trim().min(1).max(max);
const optional = (max: number) =>
  z.string().trim().max(max).optional().transform((v) => (v ? v : undefined));
const phone = z
  .string()
  .trim()
  .regex(/^[+\d][\d\s-]{7,16}$/, 'Enter a valid phone number');
const email = z.string().trim().toLowerCase().email().max(160);

export const enquirySchema = z.object({
  parentName: trimmed(100),
  studentName: optional(100),
  grade: trimmed(60),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .max(160)
    .optional()
    .transform((v) => (v ? v : undefined))
    .pipe(z.string().email().optional()),
  phone,
  preferredContact: z.enum(['phone', 'whatsapp', 'email']).catch('phone'),
  message: optional(2000),
});

export const applicationSchema = z.object({
  studentName: trimmed(100),
  gender: z.enum(['Male', 'Female', 'Other']),
  dob: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Enter a valid date of birth'),
  grade: trimmed(40),
  previousSchool: optional(160),
  previousBoard: optional(60),
  lastClassPercentage: optional(10),
  fatherName: trimmed(100),
  fatherOccupation: optional(100),
  motherName: trimmed(100),
  motherOccupation: optional(100),
  mobile: phone,
  email,
  address: trimmed(400),
  declaration: z.literal('on', { message: 'Please accept the declaration' }),
});

export const careerSchema = z.object({
  fullName: trimmed(100),
  email,
  phone,
  position: trimmed(120),
  experience: optional(40),
  qualifications: optional(400),
  coverNote: optional(3000),
});

export const subscribeSchema = z.object({ email });

export type FormName = 'enquiry' | 'apply' | 'careers' | 'subscribe';

/** Result for a plain HTML form post (works without JS) or a JSON client. */
export function formSuccess(request: Request, form: FormName, ref?: string): Response {
  if (wantsJson(request)) return json({ success: true, ref }, 200);
  const qs = new URLSearchParams({ form });
  if (ref) qs.set('ref', ref);
  return new Response(null, { status: 303, headers: { Location: `/thank-you/?${qs}` } });
}

export function formError(
  request: Request,
  form: FormName,
  status: number,
  message: string,
): Response {
  if (wantsJson(request)) return json({ success: false, error: message }, status);
  const qs = new URLSearchParams({ form, reason: message });
  return new Response(null, { status: 303, headers: { Location: `/form-error/?${qs}` } });
}

const FIELD_LABELS: Record<string, string> = {
  parentName: 'your name',
  studentName: "the student's name",
  grade: 'the class',
  email: 'your email address',
  phone: 'your phone number',
  mobile: 'your mobile number',
  gender: 'gender',
  dob: 'date of birth',
  fatherName: "father's name",
  motherName: "mother's name",
  address: 'address',
  declaration: 'the declaration',
  fullName: 'your name',
  position: 'the position',
};

/** Plain-language summary of what is wrong, naming every invalid field. */
export function firstIssue(error: z.ZodError): string {
  const fields = [...new Set(error.issues.map((i) => String(i.path[0] ?? '')))].filter(Boolean);
  if (!fields.length) return 'some answers are missing or invalid';
  return `check ${fields.map((f) => FIELD_LABELS[f] ?? f).join(', ')}`;
}

export function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });
}

export function methodNotAllowed(): Response {
  return new Response('Method Not Allowed', { status: 405, headers: { Allow: 'POST' } });
}

export function newId(prefix: string): string {
  return `${prefix}_${crypto.randomUUID()}`;
}

/** Human-friendly application reference, e.g. SBPS-27-4F9K2Q. */
export function applicationRef(date = new Date()): string {
  const yy = String((date.getUTCFullYear() + 1) % 100).padStart(2, '0');
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const bytes = crypto.getRandomValues(new Uint8Array(6));
  const code = Array.from(bytes, (b) => alphabet[b % alphabet.length]).join('');
  return `SBPS-${yy}-${code}`;
}

/** Render a simple key/value table for alert emails, escaping every value. */
export function emailTable(title: string, rows: [string, unknown][]): string {
  const body = rows
    .filter(([, v]) => v !== undefined && v !== null && v !== '')
    .map(
      ([k, v]) =>
        `<tr><th align="left" style="padding:6px 12px 6px 0">${escapeHtml(k)}</th><td style="padding:6px 0">${escapeHtml(v)}</td></tr>`,
    )
    .join('');
  return `<h2>${escapeHtml(title)}</h2><table>${body}</table>`;
}
