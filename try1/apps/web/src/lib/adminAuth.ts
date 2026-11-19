function safeEqual(a: string, b: string): boolean {
  const enc = new TextEncoder();
  const x = enc.encode(a);
  const y = enc.encode(b);
  let diff = x.length ^ y.length;
  for (let i = 0; i < Math.max(x.length, y.length); i++) diff |= (x[i] ?? 0) ^ (y[i] ?? 0);
  return diff === 0;
}

const challenge = (message: string) =>
  new Response(message, {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="SBPS Admin", charset="UTF-8"',
      'Content-Type': 'text/plain',
      'Cache-Control': 'no-store',
    },
  });

/**
 * HTTP Basic auth for /admin and /api/admin. Returns a Response to send back
 * when access is denied, or null when the request may continue.
 *
 * Fails closed: in production, if ADMIN_USER / ADMIN_PASS are not configured,
 * the admin area is disabled entirely. Only local dev runs without credentials.
 */
export function checkAdminAuth(request: Request, env: any): Response | null {
  const adminUser = env?.ADMIN_USER;
  const adminPass = env?.ADMIN_PASS;

  if (!adminUser || !adminPass) {
    if (import.meta.env.DEV) return null;
    return new Response('Admin area is disabled: ADMIN_USER and ADMIN_PASS are not configured.', {
      status: 503,
      headers: { 'Content-Type': 'text/plain', 'Cache-Control': 'no-store' },
    });
  }

  const header = request.headers.get('authorization');
  if (!header?.startsWith('Basic ')) return challenge('Authentication required');

  try {
    const decoded = atob(header.slice(6));
    const sep = decoded.indexOf(':');
    const user = decoded.slice(0, sep);
    const pass = decoded.slice(sep + 1);
    if (sep > 0 && safeEqual(user, adminUser) && safeEqual(pass, adminPass)) return null;
  } catch {
    // fall through
  }
  return challenge('Invalid credentials');
}
