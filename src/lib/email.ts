import nodemailer from 'nodemailer';

export interface EmailAttachment {
  filename: string;
  content: string;
  encoding: 'base64';
  contentType?: string;
}

export interface EmailOptions {
  to: string;
  from: string;
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
  attachments?: EmailAttachment[];
}

export interface SendEmailResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

// Initialize transporter with connection pooling
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true', // true for 465, false for 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
  pool: true,
  maxConnections: 5,
  maxMessages: 100,
});

// Verify connection at startup
export async function verifyTransporter(): Promise<boolean> {
  try {
    await transporter.verify();
    console.log('✅ SMTP connection verified');
    return true;
  } catch (error) {
    console.error('❌ SMTP verification failed:', error);
    return false;
  }
}

// Send email with retry logic
export async function sendEmail(
  options: EmailOptions,
  maxRetries: number = 3
): Promise<SendEmailResponse> {
  let lastError: Error | null = null;
  const baseDelay = 1000;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      // Input validation
      if (!options.to || !options.from || !options.subject || !options.html) {
        throw new Error('Missing required email fields: to, from, subject, html');
      }

      if (!isValidEmail(options.to)) {
        throw new Error(`Invalid recipient email: ${options.to}`);
      }

      if (!isValidEmail(options.from)) {
        throw new Error(`Invalid sender email: ${options.from}`);
      }

      const mailOptions: any = {
        from: options.from,
        to: options.to,
        replyTo: options.replyTo || options.from,
        subject: options.subject,
        html: options.html,
        text: options.text,
      };

      // Add attachments if provided
      if (options.attachments && options.attachments.length > 0) {
        mailOptions.attachments = options.attachments;
      }

      const info = await transporter.sendMail(mailOptions);

      return {
        success: true,
        messageId: info.messageId,
      };
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));

      // Don't retry on validation errors
      if (lastError.message.includes('Invalid') || lastError.message.includes('Missing')) {
        return {
          success: false,
          error: lastError.message,
        };
      }

      // Exponential backoff for retryable errors
      if (attempt < maxRetries) {
        const delay = baseDelay * Math.pow(2, attempt - 1);
        console.log(`⏳ Retrying email send (attempt ${attempt + 1}/${maxRetries}) in ${delay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  return {
    success: false,
    error: lastError?.message || 'Failed to send email after retries',
  };
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}