import { NextRequest, NextResponse } from 'next/server';
import { createMailTransport, escapeEmailHtml, getMailSettings } from '@/lib/mail-config';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate input
    if (typeof name !== 'string' || !name.trim() || typeof email !== 'string' || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const settings = getMailSettings();
    const transporter = createMailTransport(settings);
    const safeName = escapeEmailHtml(name);
    const safeEmail = escapeEmailHtml(email);
    const safeMessage = escapeEmailHtml(message);

    // Send email to company
    await transporter.sendMail({
      from: `"RootStock Technology" <${settings.user}>`,
      to: settings.inquiryRecipients,
      replyTo: email, // Set reply-to as the user's email
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #415b3e;">New Contact Form Submission</h2>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${safeName}</p>
            <p><strong>Email:</strong> ${safeEmail}</p>
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${safeMessage}</p>
          </div>
          <p style="color: #666; font-size: 12px;">
            Received at: ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })} IST
          </p>
        </div>
      `,
    });

    // Send confirmation email to user
    await transporter.sendMail({
      from: `"RootStock Technology" <${settings.user}>`,
      to: email,
      subject: 'Thank you for contacting RootStock Technology',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #415b3e;">Thank You for Reaching Out!</h2>
          <p>Dear ${safeName},</p>
          <p>We've received your message and appreciate you taking the time to contact us.</p>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Your message:</strong></p>
            <p style="white-space: pre-wrap;">${safeMessage}</p>
          </div>
          <p>Our team will review your inquiry and get back to you within 24-48 hours.</p>
          <p>In the meantime, feel free to explore our products and services at <a href="https://rootstocktech.co.in" style="color: #415b3e;">rootstocktech.co.in</a>.</p>
          <br>
          <p>Best regards,<br><strong>RootStock Technology Team</strong></p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">
            RootStock Technology<br>
            Email: info@rootstocktech.co.in<br>
            Phone: +91 80855 22102
          </p>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: 'Emails sent successfully',
    });
  } catch (error) {
    console.error('Error sending contact form emails:', error);
    return NextResponse.json(
      { error: 'Unable to send your message right now. Please email us directly.' },
      { status: 500 }
    );
  }
}
