import { NextRequest, NextResponse } from 'next/server';
import { createMailTransport, escapeEmailHtml, getMailSettings } from '@/lib/mail-config';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, message, productInterested } = body;

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
    const safeCompany = typeof company === 'string' ? escapeEmailHtml(company) : '';
    const safeInterest = typeof productInterested === 'string' ? escapeEmailHtml(productInterested) : '';
    const safeMessage = escapeEmailHtml(message);

    // Send notification email to company
    await transporter.sendMail({
      from: `"RootStock Technology" <${settings.user}>`,
      to: settings.inquiryRecipients,
      replyTo: email,
      subject: `New Consultation Request from ${name}${company ? ` (${company})` : ''}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #415b3e;">New Consultation Request</h2>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${safeName}</p>
            <p><strong>Email:</strong> ${safeEmail}</p>
            ${safeCompany ? `<p><strong>Company/Organization:</strong> ${safeCompany}</p>` : ''}
            ${safeInterest ? `<p><strong>Product Interested:</strong> ${safeInterest}</p>` : ''}
            <p><strong>Requirements/Message:</strong></p>
            <p style="white-space: pre-wrap;">${safeMessage}</p>
          </div>
          <p style="color: #666; font-size: 12px;">
            Received at: ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })} IST
          </p>
        </div>
      `,
    });

    // Send confirmation email to requester
    await transporter.sendMail({
      from: `"RootStock Technology" <${settings.user}>`,
      to: email,
      subject: 'Your Consultation Request - RootStock Technology',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #415b3e;">Consultation Request Received</h2>
          <p>Dear ${safeName},</p>
          <p>Thank you for your interest in consulting with RootStock Technology!</p>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Your request details:</strong></p>
            ${safeCompany ? `<p><strong>Company:</strong> ${safeCompany}</p>` : ''}
            ${safeInterest ? `<p><strong>Product Interested:</strong> ${safeInterest}</p>` : ''}
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${safeMessage}</p>
          </div>
          <p>Our team will review your consultation request and reach out to you within 24-48 hours to schedule a meeting.</p>
          <p>We're excited to discuss how our AI solutions can help transform your business!</p>
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
      message: 'Consultation request sent successfully',
    });
  } catch (error) {
    console.error('Error sending consultation request emails:', error);
    return NextResponse.json(
      { error: 'Failed to send consultation request. Please try again later.' },
      { status: 500 }
    );
  }
}
