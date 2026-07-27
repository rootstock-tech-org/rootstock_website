import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // In a real application, you would integrate with SendGrid, Resend, or a database here.
    console.log("Received contact form submission:", data);

    return NextResponse.json({ success: true, message: "Message received successfully." }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Failed to process request." }, { status: 400 });
  }
}
