export async function verifyTurnstile(
  token: string | undefined | null,
  secretKey?: string
): Promise<boolean> {
  // Graceful degradation when secret key is unset
  if (!secretKey) {
    return true;
  }
  if (!token) {
    return false;
  }

  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret: secretKey,
        response: token,
      }),
    });
    const data = (await res.json()) as { success: boolean };
    return !!data.success;
  } catch (err) {
    console.warn('Turnstile verification network error:', err);
    return false;
  }
}
