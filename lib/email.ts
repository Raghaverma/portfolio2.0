import nodemailer from "nodemailer";

interface SendEmailParams {
    name: string;
    email: string;
    message: string;
}

function createTransporter() {
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
        return null;
    }
    return nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_APP_PASSWORD,
        },
    });
}

/**
 * Sends a confirmation email to the user who submitted the contact form
 */
export async function sendUserConfirmation({ name, email }: SendEmailParams) {
    const transporter = createTransporter();
    if (!transporter) {
        console.warn("GMAIL_USER or GMAIL_APP_PASSWORD not configured, skipping user confirmation email");
        return { success: false, error: "Email service not configured" };
    }

    try {
        await transporter.sendMail({
            from: `"Raghav Verma" <${process.env.GMAIL_USER}>`,
            to: email,
            subject: "Thanks for reaching out!",
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h2 style="color: #333; margin-bottom: 20px;">Hi ${name}!</h2>
                    <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
                        Thank you for reaching out through my portfolio. I've received your message and will get back to you as soon as possible.
                    </p>
                    <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
                        In the meantime, feel free to:
                    </p>
                    <ul style="color: #666; line-height: 1.6; margin-bottom: 20px;">
                        <li>Check out my <a href="https://github.com/Raghaverma" style="color: #0070f3; text-decoration: none;">GitHub profile</a></li>
                        <li>Connect with me on <a href="https://www.linkedin.com/in/raghaverma/" style="color: #0070f3; text-decoration: none;">LinkedIn</a></li>
                    </ul>
                    <p style="color: #666; line-height: 1.6; margin-bottom: 20px;">
                        Best regards,<br />
                        <strong>Raghav Verma</strong><br />
                        Full-Stack Developer
                    </p>
                    <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
                    <p style="color: #999; font-size: 12px; text-align: center;">
                        This is an automated confirmation email. Please do not reply to this message.
                    </p>
                </div>
            `,
        });

        return { success: true };
    } catch (error: any) {
        console.error("Error sending user confirmation email:", error);
        return { success: false, error: error.message };
    }
}

/**
 * Sends a notification email to the portfolio owner about the new contact form submission
 */
export async function sendOwnerNotification({ name, email, message }: SendEmailParams) {
    const transporter = createTransporter();
    if (!transporter || !process.env.GMAIL_USER || !process.env.OWNER_EMAIL) {
        console.warn("GMAIL_USER, GMAIL_APP_PASSWORD, or OWNER_EMAIL not configured, skipping owner notification");
        return { success: false, error: "Email service not configured" };
    }

    try {
        await transporter.sendMail({
            from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
            to: process.env.OWNER_EMAIL,
            replyTo: email,
            subject: `New Contact Form Submission from ${name}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb; border-radius: 8px;">
                    <h2 style="color: #111827; margin-bottom: 20px; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">
                        New Contact Form Submission
                    </h2>

                    <div style="background-color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                        <h3 style="color: #374151; margin-top: 0; margin-bottom: 15px;">Contact Information</h3>
                        <p style="color: #6b7280; margin: 8px 0;">
                            <strong style="color: #111827;">Name:</strong> ${name}
                        </p>
                        <p style="color: #6b7280; margin: 8px 0;">
                            <strong style="color: #111827;">Email:</strong>
                            <a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a>
                        </p>
                    </div>

                    <div style="background-color: white; padding: 20px; border-radius: 8px;">
                        <h3 style="color: #374151; margin-top: 0; margin-bottom: 15px;">Message</h3>
                        <p style="color: #6b7280; line-height: 1.6; white-space: pre-wrap; background-color: #f9fafb; padding: 15px; border-radius: 6px; border-left: 3px solid #3b82f6;">
${message}
                        </p>
                    </div>

                    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                        <p style="color: #9ca3af; font-size: 14px; margin: 0; text-align: center;">
                            Sent from your portfolio contact form at ${new Date().toLocaleString('en-US', {
                                timeZone: 'Asia/Kolkata',
                                dateStyle: 'full',
                                timeStyle: 'short'
                            })}
                        </p>
                    </div>
                </div>
            `,
        });

        return { success: true };
    } catch (error: any) {
        console.error("Error sending owner notification email:", error);
        return { success: false, error: error.message };
    }
}
