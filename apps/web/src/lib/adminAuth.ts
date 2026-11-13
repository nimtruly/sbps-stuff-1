export function checkAdminAuth(request: Request, env: any): Response | null {
  const adminUser = env?.ADMIN_USER || process.env.ADMIN_USER;
  const adminPass = env?.ADMIN_PASS || process.env.ADMIN_PASS;

  // If not configured, allow local dev access without credentials
  if (!adminUser || !adminPass) {
    return null;
  }

  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return new Response('Access Denied: Authentication Required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="SBPS Admin Portal"',
        'Content-Type': 'text/plain',
      },
    });
  }

  try {
    const base64 = authHeader.slice(6);
    const decoded = atob(base64);
    const [user, pass] = decoded.split(':');

    if (user === adminUser && pass === adminPass) {
      return null; // Authenticated
    }
  } catch (err) {
    console.warn('Admin auth decode error:', err);
  }

  return new Response('Invalid Admin Credentials', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="SBPS Admin Portal"',
      'Content-Type': 'text/plain',
    },
  });
}
