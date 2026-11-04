import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import nodemailer from 'nodemailer';

export type MailSettings = {
  provider: 'gmail' | 'smtp';
  sender: string;
  host: string;
  port: number;
  user: string;
  pass: string;
  clientId: string;
  clientSecret: string;
  refreshToken: string;
  adminRecipient: string;
  inquiryRecipients: string[];
};

const emailPattern = /^[^\s@<>,;]+@[^\s@<>,;]+\.[^\s@<>,;]+$/;

export function getMailSettings(): MailSettings {
  const contents = readFileSync(join(process.cwd(), 'config', 'email-settings.txt'), 'utf8');
  const file = Object.fromEntries(contents.split(/\r?\n/).map(line => line.trim())
    .filter(line => line && !line.startsWith('#') && line.includes('='))
    .map(line => { const at = line.indexOf('='); return [line.slice(0, at).trim(), line.slice(at + 1).trim()]; }));
  const value = (key: string) => process.env[key]?.trim() || file[key] || '';
  const provider = value('MAIL_PROVIDER');
  if (provider !== 'gmail' && provider !== 'smtp') throw new Error('MAIL_PROVIDER must be gmail or smtp');
  const sender = value('MAIL_FROM');
  const inquiryRecipients = [value('ADMIN_EMAIL'), value('RASHMI_EMAIL')];
  if (![sender, ...inquiryRecipients].every(email => emailPattern.test(email))) {
    throw new Error('MAIL_FROM, ADMIN_EMAIL and RASHMI_EMAIL must be valid email addresses');
  }
  const settings: MailSettings = {
    provider, sender, inquiryRecipients, adminRecipient: inquiryRecipients[0],
    host: value('SMTP_HOST'), port: Number(value('SMTP_PORT')), user: value('SMTP_USER'),
    pass: process.env.SMTP_PASS || '',
    clientId: process.env.GMAIL_CLIENT_ID?.trim() || '',
    clientSecret: process.env.GMAIL_CLIENT_SECRET?.trim() || '',
    refreshToken: process.env.GMAIL_REFRESH_TOKEN?.trim() || '',
  };
  if (provider === 'gmail' && (!settings.clientId || !settings.clientSecret || !settings.refreshToken)) {
    throw new Error('Configure GMAIL_CLIENT_ID, GMAIL_CLIENT_SECRET and GMAIL_REFRESH_TOKEN to enable Gmail sending');
  }
  if (provider === 'smtp' && (!settings.host || !emailPattern.test(settings.user) || !settings.pass || !Number.isInteger(settings.port) || settings.port < 1 || settings.port > 65535)) {
    throw new Error('SMTP settings are incomplete or invalid');
  }
  return settings;
}

export function createMailTransport(settings: MailSettings) {
  if (settings.provider === 'smtp') {
    return nodemailer.createTransport({ host: settings.host, port: settings.port,
      secure: settings.port === 465, auth: { user: settings.user, pass: settings.pass } });
  }
  // Nodemailer only composes MIME here. Delivery uses the Gmail HTTPS API, not SMTP.
  const composer = nodemailer.createTransport({ streamTransport: true, buffer: true, newline: 'windows' });
  let cachedToken: { value: string; expires: number } | undefined;
  const accessToken = async () => {
    if (cachedToken && cachedToken.expires > Date.now() + 60_000) return cachedToken.value;
    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ client_id: settings.clientId, client_secret: settings.clientSecret,
        refresh_token: settings.refreshToken, grant_type: 'refresh_token' }),
      signal: AbortSignal.timeout(15_000), cache: 'no-store',
    });
    // Never include Google's response body in errors: it can contain credentials.
    if (!response.ok) throw new Error(`Gmail authorization failed (HTTP ${response.status})`);
    const data = await response.json() as { access_token?: string; expires_in?: number };
    if (!data.access_token) throw new Error('Gmail authorization returned no access token');
    cachedToken = { value: data.access_token, expires: Date.now() + (data.expires_in || 3600) * 1000 };
    return cachedToken.value;
  };
  return {
    async sendMail(message: nodemailer.SendMailOptions) {
      const composed = await composer.sendMail({ ...message,
        from: { name: 'RootStock Technology', address: settings.sender },
        disableFileAccess: true, disableUrlAccess: true,
      });
      if (!Buffer.isBuffer(composed.message)) throw new Error('Email composition did not return a buffer');
      const token = await accessToken();
      const response = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
        method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ raw: composed.message.toString('base64url') }),
        signal: AbortSignal.timeout(20_000), cache: 'no-store',
      });
      if (!response.ok) throw new Error(`Gmail delivery failed (HTTP ${response.status})`);
      const result = await response.json() as { id?: string };
      if (!result.id) throw new Error('Gmail did not return a message ID');
      return { messageId: result.id };
    },
  };
}

export function escapeEmailHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[character] ?? character);
}
