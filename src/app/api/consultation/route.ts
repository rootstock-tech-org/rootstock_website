import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, message, preferredTime } = body;

    // Validate input
    if (!name || !email || !message) {
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

    // Create a transporter using SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtpout.secureserver.net',
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Send notification email to company
    await transporter.sendMail({
      from: `"${name}" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      replyTo: email,
      subject: `New Consultation Request from ${name}${company ? ` (${company})` : ''}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #415b3e;">New Consultation Request</h2>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${company ? `<p><strong>Company/Organization:</strong> ${company}</p>` : ''}
            ${preferredTime ? `<p><strong>Preferred Contact Time:</strong> ${preferredTime}</p>` : ''}
            <p><strong>Requirements/Message:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          <p style="color: #666; font-size: 12px;">
            Received at: ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })} IST
          </p>
        </div>
      `,
    });

    // Send confirmation email to requester
    await transporter.sendMail({
      from: `"RootStock Technology" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Your Consultation Request - RootStock Technology',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #415b3e;">Consultation Request Received</h2>
          <p>Dear ${name},</p>
          <p>Thank you for your interest in consulting with RootStock Technology!</p>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Your request details:</strong></p>
            ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
            ${preferredTime ? `<p><strong>Preferred Time:</strong> ${preferredTime}</p>` : ''}
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          <p>Our team will review your consultation request and reach out to you within 24-48 hours to schedule a meeting.</p>
          <p>We're excited to discuss how our AI solutions can help transform your business!</p>
          <br>
          <p>Best regards,<br><strong>RootStock Technology Team</strong></p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">
            RootStock Technology<br>
            Incubation Centre, IIIT Delhi<br>
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
