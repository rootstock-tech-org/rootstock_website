import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import nodemailer from 'nodemailer';

type MailSettings = {
  host: string;
  port: number;
  user: string;
  pass: string;
  adminRecipient: string;
  inquiryRecipients: string[];
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function readSettingsFile(): Record<string, string> {
  const contents = readFileSync(join(process.cwd(), 'config', 'email-settings.txt'), 'utf8');
  return Object.fromEntries(
    contents
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter((line) => line && !line.startsWith('#') && line.includes('='))
      .map((line) => {
        const splitAt = line.indexOf('=');
        return [line.slice(0, splitAt).trim(), line.slice(splitAt + 1).trim()];
      }),
  );
}

export function getMailSettings(): MailSettings {
  const file = readSettingsFile();
  const host = process.env.SMTP_HOST?.trim() || file.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || file.SMTP_PORT);
  const user = process.env.SMTP_USER?.trim() || file.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const inquiryRecipients = [file.ADMIN_EMAIL, file.RASHMI_EMAIL].filter(Boolean);

  if (!host || !Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('SMTP host or port is invalid in config/email-settings.txt');
  }
  if (!user || !emailPattern.test(user) || !pass) {
    throw new Error('SMTP_USER and SMTP_PASS must be configured before email can be sent');
  }
  if (inquiryRecipients.length !== 2 || inquiryRecipients.some((email) => !emailPattern.test(email))) {
    throw new Error('ADMIN_EMAIL and RASHMI_EMAIL must be valid in config/email-settings.txt');
  }

  return { host, port, user, pass, adminRecipient: inquiryRecipients[0], inquiryRecipients };
}

export function createMailTransport(settings: MailSettings) {
  return nodemailer.createTransport({
    host: settings.host,
    port: settings.port,
    secure: settings.port === 465,
    auth: { user: settings.user, pass: settings.pass },
  });
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
