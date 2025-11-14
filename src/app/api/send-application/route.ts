import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      positionId,
      positionTitle,
      name,
      email,
      phone,
      resumeBase64,
      resumeFileName,
      coverLetter,
      linkedinUrl,
      experienceYears,
    } = body;

    // Validation
    if (!name || !email || !phone || !resumeBase64 || !positionTitle) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Log application submission
    console.log("=".repeat(60));
    console.log("💼 NEW JOB APPLICATION");
    console.log("=".repeat(60));
    console.log(`📅 Date: ${new Date().toLocaleString()}`);
    console.log(`👤 Name: ${name}`);
    console.log(`📧 Email: ${email}`);
    console.log(`📱 Phone: ${phone}`);
    console.log(`🎯 Position: ${positionTitle}`);
    console.log(`💼 Experience: ${experienceYears || "N/A"} years`);
    console.log(`🔗 LinkedIn: ${linkedinUrl || "N/A"}`);
    console.log("=".repeat(60));

    // Generate email content
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #00C2FF 0%, #0A1A2F 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .position-badge { display: inline-block; background: rgba(255,255,255,0.2); padding: 8px 16px; border-radius: 20px; font-size: 14px; margin-top: 10px; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .section { margin-bottom: 25px; }
            .label { font-weight: bold; color: #0A1A2F; margin-bottom: 5px; }
            .value { color: #555; }
            .footer { text-align: center; margin-top: 30px; color: #888; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">New Job Application</h1>
              <div class="position-badge">${positionTitle}</div>
            </div>
            <div class="content">
              <div class="section">
                <div class="label">Candidate Name:</div>
                <div class="value">${name}</div>
              </div>
              <div class="section">
                <div class="label">Email:</div>
                <div class="value">${email}</div>
              </div>
              <div class="section">
                <div class="label">Phone:</div>
                <div class="value">${phone}</div>
              </div>
              ${experienceYears ? `
              <div class="section">
                <div class="label">Years of Experience:</div>
                <div class="value">${experienceYears} years</div>
              </div>
              ` : ''}
              ${linkedinUrl ? `
              <div class="section">
                <div class="label">LinkedIn Profile:</div>
                <div class="value"><a href="${linkedinUrl}" style="color: #00C2FF;">${linkedinUrl}</a></div>
              </div>
              ` : ''}
              ${coverLetter ? `
              <div class="section">
                <div class="label">Cover Letter:</div>
                <div class="value" style="white-space: pre-wrap;">${coverLetter}</div>
              </div>
              ` : ''}
              <div class="section">
                <div class="label">Resume:</div>
                <div class="value">📎 Resume attached (${resumeFileName})</div>
              </div>
            </div>
            <div class="footer">
              <p>This application was submitted through TechSonance InfoTech careers page.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const plainText = `
NEW JOB APPLICATION
Position: ${positionTitle}

Candidate Information:
- Name: ${name}
- Email: ${email}
- Phone: ${phone}
${experienceYears ? `- Experience: ${experienceYears} years` : ''}
${linkedinUrl ? `- LinkedIn: ${linkedinUrl}` : ''}

${coverLetter ? `Cover Letter:\n${coverLetter}\n` : ''}

Resume: See attached file (${resumeFileName})
    `;

    // Extract file extension and mime type
    const fileExtension = resumeFileName.split('.').pop()?.toLowerCase() || 'pdf';
    const mimeTypes: Record<string, string> = {
      'pdf': 'application/pdf',
      'doc': 'application/msword',
      'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    };
    const mimeType = mimeTypes[fileExtension] || 'application/pdf';

    // Send email with resume attachment
    const emailResult = await sendEmail({
      to: "admin@techsonance.co.in",
      from: email,
      subject: `New Job Application: ${positionTitle} - ${name}`,
      html: htmlContent,
      text: plainText,
      replyTo: email,
      attachments: [
        {
          filename: `${name.replace(/\s+/g, '_')}_resume.${fileExtension}`,
          content: resumeBase64.split(',')[1], // Remove data:mime;base64, prefix
          encoding: 'base64',
          contentType: mimeType,
        },
      ],
    });

    if (!emailResult.success) {
      console.error("❌ Failed to send application email:", emailResult.error);
      return NextResponse.json(
        { error: "Failed to send application. Please try again." },
        { status: 500 }
      );
    }

    console.log(`✅ Application email sent successfully! Message ID: ${emailResult.messageId}`);

    return NextResponse.json(
      {
        success: true,
        message: "Application submitted successfully!",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Application submission error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
}
