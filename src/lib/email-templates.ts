export interface ContactFormEmailData {
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
}

export interface CareerApplicationEmailData {
  name: string;
  email: string;
  phone: string;
  positionTitle: string;
  positionId: number;
  experienceYears?: number | null;
  linkedinUrl?: string | null;
  coverLetter?: string | null;
  resumeFileName?: string;
}

export function generateContactFormHTML(data: ContactFormEmailData): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
            line-height: 1.6; 
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
          }
          .container { 
            max-width: 600px; 
            margin: 20px auto; 
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          .header { 
            background: linear-gradient(135deg, #00C2FF 0%, #0066FF 100%);
            color: white; 
            padding: 30px 20px;
            text-align: center;
          }
          .header h2 {
            margin: 0;
            font-size: 24px;
            font-weight: 600;
          }
          .content { 
            padding: 30px 20px;
          }
          .field { 
            margin-bottom: 20px;
            border-bottom: 1px solid #f0f0f0;
            padding-bottom: 15px;
          }
          .field:last-child {
            border-bottom: none;
          }
          .field-label { 
            font-weight: 600;
            color: #00C2FF;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 8px;
          }
          .field-value { 
            color: #333;
            font-size: 15px;
            word-wrap: break-word;
            white-space: pre-wrap;
          }
          .footer { 
            background-color: #f8f9fa;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #666;
            border-top: 1px solid #e9ecef;
          }
          .footer p {
            margin: 5px 0;
          }
          .badge {
            display: inline-block;
            padding: 4px 12px;
            background-color: #e7f7ff;
            color: #00C2FF;
            border-radius: 12px;
            font-size: 12px;
            font-weight: 600;
            margin-top: 5px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>📧 New Contact Form Submission</h2>
          </div>
          <div class="content">
            <div class="field">
              <div class="field-label">👤 From</div>
              <div class="field-value">
                <strong>${escapeHtml(data.name)}</strong>
                <br>
                <a href="mailto:${escapeHtml(data.email)}" style="color: #00C2FF; text-decoration: none;">
                  ${escapeHtml(data.email)}
                </a>
              </div>
            </div>
            ${data.company ? `
            <div class="field">
              <div class="field-label">🏢 Company</div>
              <div class="field-value">${escapeHtml(data.company)}</div>
            </div>
            ` : ''}
            <div class="field">
              <div class="field-label">📝 Subject</div>
              <div class="field-value">${escapeHtml(data.subject)}</div>
            </div>
            <div class="field">
              <div class="field-label">💬 Message</div>
              <div class="field-value">${escapeHtml(data.message).replace(/\n/g, '<br>')}</div>
            </div>
          </div>
          <div class="footer">
            <p><strong>TechSonance InfoTech</strong></p>
            <p>This email was sent from your website's contact form.</p>
            <p style="color: #999; margin-top: 10px;">
              📅 ${new Date().toLocaleString('en-US', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export function generateCareerApplicationHTML(data: CareerApplicationEmailData): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
            line-height: 1.6; 
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
          }
          .container { 
            max-width: 600px; 
            margin: 20px auto; 
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          .header { 
            background: linear-gradient(135deg, #00C2FF 0%, #0066FF 100%);
            color: white; 
            padding: 30px 20px;
            text-align: center;
          }
          .header h2 {
            margin: 0;
            font-size: 24px;
            font-weight: 600;
          }
          .position-badge {
            display: inline-block;
            margin-top: 10px;
            padding: 6px 16px;
            background-color: rgba(255,255,255,0.2);
            border-radius: 20px;
            font-size: 14px;
            font-weight: 600;
          }
          .content { 
            padding: 30px 20px;
          }
          .field { 
            margin-bottom: 20px;
            border-bottom: 1px solid #f0f0f0;
            padding-bottom: 15px;
          }
          .field:last-child {
            border-bottom: none;
          }
          .field-label { 
            font-weight: 600;
            color: #00C2FF;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 8px;
          }
          .field-value { 
            color: #333;
            font-size: 15px;
            word-wrap: break-word;
            white-space: pre-wrap;
          }
          .footer { 
            background-color: #f8f9fa;
            padding: 20px;
            text-align: center;
            font-size: 12px;
            color: #666;
            border-top: 1px solid #e9ecef;
          }
          .footer p {
            margin: 5px 0;
          }
          .highlight {
            background-color: #e7f7ff;
            padding: 15px;
            border-radius: 6px;
            border-left: 4px solid #00C2FF;
            margin-bottom: 20px;
          }
          .attachment-notice {
            display: inline-block;
            padding: 8px 16px;
            background-color: #fff3cd;
            color: #856404;
            border-radius: 6px;
            font-size: 13px;
            font-weight: 600;
            margin-top: 10px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>💼 New Job Application</h2>
            <div class="position-badge">${escapeHtml(data.positionTitle)}</div>
          </div>
          <div class="content">
            <div class="highlight">
              <strong>Position ID:</strong> #${data.positionId}<br>
              <strong>Applied:</strong> ${new Date().toLocaleString('en-US', {
                weekday: 'short',
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </div>

            <div class="field">
              <div class="field-label">👤 Candidate Information</div>
              <div class="field-value">
                <strong>${escapeHtml(data.name)}</strong><br>
                <a href="mailto:${escapeHtml(data.email)}" style="color: #00C2FF; text-decoration: none;">
                  ${escapeHtml(data.email)}
                </a><br>
                📱 ${escapeHtml(data.phone)}
              </div>
            </div>

            ${data.experienceYears ? `
            <div class="field">
              <div class="field-label">💼 Experience</div>
              <div class="field-value">${data.experienceYears} year${data.experienceYears !== 1 ? 's' : ''}</div>
            </div>
            ` : ''}

            ${data.linkedinUrl ? `
            <div class="field">
              <div class="field-label">🔗 LinkedIn Profile</div>
              <div class="field-value">
                <a href="${escapeHtml(data.linkedinUrl)}" style="color: #00C2FF; text-decoration: none;">
                  ${escapeHtml(data.linkedinUrl)}
                </a>
              </div>
            </div>
            ` : ''}

            ${data.coverLetter ? `
            <div class="field">
              <div class="field-label">📝 Cover Letter</div>
              <div class="field-value">${escapeHtml(data.coverLetter).replace(/\n/g, '<br>')}</div>
            </div>
            ` : ''}

            ${data.resumeFileName ? `
            <div class="field">
              <div class="field-label">📎 Resume Attached</div>
              <div class="field-value">
                <div class="attachment-notice">
                  📄 ${escapeHtml(data.resumeFileName)}
                </div>
              </div>
            </div>
            ` : ''}
          </div>
          <div class="footer">
            <p><strong>TechSonance InfoTech - Career Portal</strong></p>
            <p>This application was submitted through your careers page.</p>
            <p style="color: #999; margin-top: 10px;">
              You can reply directly to this email to contact the candidate.
            </p>
          </div>
        </div>
      </body>
    </html>
  `;
}

export function generateCareerApplicationPlainText(data: CareerApplicationEmailData): string {
  return `
NEW JOB APPLICATION - ${data.positionTitle}
${'='.repeat(60)}

Position ID: #${data.positionId}
Applied: ${new Date().toLocaleString('en-US')}

CANDIDATE INFORMATION
---------------------
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
${data.experienceYears ? `Experience: ${data.experienceYears} year${data.experienceYears !== 1 ? 's' : ''}\n` : ''}${data.linkedinUrl ? `LinkedIn: ${data.linkedinUrl}\n` : ''}
${data.coverLetter ? `\nCOVER LETTER\n------------\n${data.coverLetter}\n` : ''}
${data.resumeFileName ? `\nRESUME ATTACHED: ${data.resumeFileName}` : ''}

${'='.repeat(60)}
TechSonance InfoTech - Career Portal
  `.trim();
}

export function generatePlainTextEmail(data: ContactFormEmailData): string {
  return `
NEW CONTACT FORM SUBMISSION
${'='.repeat(50)}

From: ${data.name}
Email: ${data.email}
${data.company ? `Company: ${data.company}\n` : ''}
Subject: ${data.subject}

Message:
${data.message}

${'='.repeat(50)}
Sent: ${new Date().toLocaleString('en-US')}
  `.trim();
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}