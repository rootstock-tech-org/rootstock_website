import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

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
      port: Number(process.env.SMTP_PORT) || 465,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      debug: false, // set to true if you need debugging
    });

    // Send email to company
    await transporter.sendMail({
      from: `"${name}" <${process.env.SMTP_USER}>`, // GoDaddy requires sender to be the authenticated user
      to: process.env.SMTP_USER, // Send to company email
      replyTo: email, // Set reply-to as the user's email
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #415b3e;">New Contact Form Submission</h2>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          <p style="color: #666; font-size: 12px;">
            Received at: ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })} IST
          </p>
        </div>
      `,
    });

    // Send confirmation email to user
    await transporter.sendMail({
      from: `"RootStock Technology" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Thank you for contacting RootStock Technology',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #415b3e;">Thank You for Reaching Out!</h2>
          <p>Dear ${name},</p>
          <p>We've received your message and appreciate you taking the time to contact us.</p>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Your message:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          <p>Our team will review your inquiry and get back to you within 24-48 hours.</p>
          <p>In the meantime, feel free to explore our products and services at <a href="https://rootstocktech.co.in" style="color: #415b3e;">rootstocktech.co.in</a>.</p>
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
      message: 'Emails sent successfully',
    });
  } catch (error) {
    console.error('Error sending contact form emails:', error);
    return NextResponse.json(
      { error: 'Failed to send emails. Please try again later.' },
      { status: 500 }
    );
  }
}
