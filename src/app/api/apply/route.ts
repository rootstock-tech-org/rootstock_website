import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const role = formData.get('role') as string;
    const type = formData.get('type') as string;
    const resume = formData.get('resume') as File | null;

    // Validate input
    if (!name || !email || !role || !type) {
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
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Prepare resume attachment if provided
    let resumeAttachment = undefined;
    if (resume) {
      const bytes = await resume.arrayBuffer();
      const buffer = Buffer.from(bytes);

      resumeAttachment = {
        filename: resume.name,
        content: buffer,
      };
    }

    // Send email to company
    await transporter.sendMail({
      from: `"${name}" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      replyTo: email,
      subject: `Job Application: ${role} (${type}) - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #415b3e;">New Job Application</h2>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Applicant Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Position:</strong> ${role}</p>
            <p><strong>Type:</strong> ${type}</p>
            ${resume ? `<p><strong>Resume:</strong> ${resume.name} (attached)</p>` : '<p><strong>Resume:</strong> Not provided</p>'}
          </div>
          <p style="color: #666; font-size: 12px;">
            Received at: ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })} IST
          </p>
        </div>
      `,
      attachments: resumeAttachment ? [resumeAttachment] : undefined,
    });

    // Send confirmation email to applicant
    await transporter.sendMail({
      from: `"RootStock Technology" <${process.env.SMTP_USER}>`,
      to: email,
      subject: 'Application Received - RootStock Technology',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #415b3e;">Application Received!</h2>
          <p>Dear ${name},</p>
          <p>Thank you for applying to RootStock Technology!</p>
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Position Applied:</strong> ${role}</p>
            <p><strong>Type:</strong> ${type}</p>
            ${resume ? `<p><strong>Resume:</strong> ${resume.name}</p>` : ''}
          </div>
          <p>We've received your application and our hiring team will review it carefully. We typically respond within 5-7 business days.</p>
          <p>If your qualifications match our requirements, we'll reach out to schedule an interview.</p>
          <p>Thank you for your interest in joining our team!</p>
          <br>
          <p>Best regards,<br><strong>RootStock Technology Hiring Team</strong></p>
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
      message: 'Application submitted successfully',
    });
  } catch (error) {
    console.error('Error sending job application emails:', error);
    return NextResponse.json(
      { error: 'Failed to submit application. Please try again later.' },
      { status: 500 }
    );
  }
}
