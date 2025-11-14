import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";
import { generateContactFormHTML, generatePlainTextEmail } from "@/lib/email-templates";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, subject, message } = body;

    // Validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Name validation (min 2 characters)
    if (name.trim().length < 2) {
      return NextResponse.json(
        { error: "Name must be at least 2 characters" },
        { status: 400 }
      );
    }

    // Subject validation (min 3 characters)
    if (subject.trim().length < 3) {
      return NextResponse.json(
        { error: "Subject must be at least 3 characters" },
        { status: 400 }
      );
    }

    // Message validation (min 10 characters)
    if (message.trim().length < 10) {
      return NextResponse.json(
        { error: "Message must be at least 10 characters" },
        { status: 400 }
      );
    }

    // Log the contact form submission
    console.log("=".repeat(60));
    console.log("📧 NEW CONTACT FORM SUBMISSION");
    console.log("=".repeat(60));
    console.log(`📅 Date: ${new Date().toLocaleString()}`);
    console.log(`👤 Name: ${name}`);
    console.log(`📧 Email: ${email}`);
    console.log(`🏢 Company: ${company || "N/A"}`);
    console.log(`📝 Subject: ${subject}`);
    console.log(`💬 Message:\n${message}`);
    console.log("=".repeat(60));

    // Send email to admin using SMTP
    const adminEmail = "admin@techsonance.co.in";
    const fromEmail = email.trim().toLowerCase();

    const emailResult = await sendEmail({
      to: adminEmail,
      from: fromEmail,
      subject: `New Contact Form: ${subject}`,
      html: generateContactFormHTML({
        name,
        email,
        company,
        subject,
        message,
      }),
      text: generatePlainTextEmail({
        name,
        email,
        company,
        subject,
        message,
      }),
      replyTo: fromEmail,
    });

    if (!emailResult.success) {
      console.error("❌ Failed to send email:", emailResult.error);
      return NextResponse.json(
        { error: "Failed to send email. Please try again." },
        { status: 500 }
      );
    }
    
    console.log(`✅ Email sent successfully! Message ID: ${emailResult.messageId}`);

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Message received successfully! We'll get back to you soon.",
        data: {
          name,
          email,
          company,
          subject,
          timestamp: new Date().toISOString(),
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}