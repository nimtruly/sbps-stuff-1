interface EmailOptions {
  to?: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmailAlert(
  options: EmailOptions,
  apiKey?: string,
  alertTo = 'info@sbpsdoon.com',
  alertFrom = 'alerts@sbpsdoon.com'
): Promise<boolean> {
  const recipient = options.to || alertTo;

  // Env-gated: if no Resend key is configured, log locally and return true
  if (!apiKey) {
    console.info(`[Resend (Mock)] Email alert to: ${recipient} | Subject: ${options.subject}`);
    return true;
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: alertFrom,
        to: recipient,
        subject: options.subject,
        html: options.html,
        text: options.text,
      }),
    });
    return res.ok;
  } catch (err) {
    console.warn('Resend email dispatch error:', err);
    return false;
  }
}
