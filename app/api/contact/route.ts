import { NextResponse } from "next/server";
import { z } from "zod";
import db from "@/lib/db";
import { sendUserConfirmation, sendOwnerNotification } from "@/lib/email";

const contactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name too long"),
    email: z.string().email("Invalid email address"),
    message: z.string().min(10, "Message must be at least 10 characters").max(500, "Message must be 500 characters or less"),
});

export async function POST(req: Request) {
    try {
        // Get IP address
        const forwardedFor = req.headers.get("x-forwarded-for");
        const ip = forwardedFor ? forwardedFor.split(',')[0] : "127.0.0.1";

        // Parse body
        const body = await req.json();

        // Validate input
        const validation = contactSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json(
                { error: "Invalid input", details: validation.error.format() },
                { status: 400 }
            );
        }

        const { name, email, message } = validation.data;

        // Rate limiting: 5 requests per 10 minutes per IP
        const rateLimitStmt = db.prepare(`
      SELECT count(*) as count FROM contacts
      WHERE ip = ? AND created_at > datetime('now', '-10 minutes')
    `);

        const result = rateLimitStmt.get(ip) as { count: number };

        if (result && result.count >= 5) {
            return NextResponse.json(
                { error: "Too many requests. Please try again later." },
                { status: 429 }
            );
        }

        // Insert into DB (backup storage)
        const insertStmt = db.prepare(`
      INSERT INTO contacts (name, email, message, ip)
      VALUES (?, ?, ?, ?)
    `);
        insertStmt.run(name, email, message, ip);

        // Send emails (non-blocking - we don't want to fail the request if emails fail)
        const emailPromises = [
            sendUserConfirmation({ name, email, message }),
            sendOwnerNotification({ name, email, message })
        ];

        // Execute emails in parallel without blocking the response
        Promise.allSettled(emailPromises).then(results => {
            results.forEach((result, index) => {
                const emailType = index === 0 ? "user confirmation" : "owner notification";
                if (result.status === "rejected") {
                    console.error(`Failed to send ${emailType}:`, result.reason);
                } else if (!result.value.success) {
                    console.warn(`${emailType} failed:`, result.value.error);
                } else {
                    console.log(`${emailType} sent successfully`);
                }
            });
        });

        return NextResponse.json({
            success: true,
            message: "Message sent successfully! Check your email for confirmation."
        });
    } catch (error) {
        console.error("Contact form error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
