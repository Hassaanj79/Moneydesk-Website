import { NextRequest, NextResponse } from "next/server";
import { validateNewsletterForm, escapeHtml } from "@/lib/security";

const NOTIFICATION_EMAIL = "support@moneydesk.co";

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    let body;
    try {
      body = await request.json();
    } catch (error) {
      return NextResponse.json(
        { error: "Invalid JSON in request body" },
        { status: 400 }
      );
    }

    // Validate and sanitize input
    const validation = validateNewsletterForm(body);
    if (!validation.isValid) {
      return NextResponse.json(
        { error: validation.errors.join(", ") },
        { status: 400 }
      );
    }

    const { email, date, subscribedAt } = validation.sanitized!;

    // Escape HTML to prevent XSS in email templates
    const safeEmail = escapeHtml(email);
    const safeDate = escapeHtml(date);
    const safeSubscribedAt = escapeHtml(subscribedAt);

    // Email content
    const emailSubject = `New Newsletter Subscription: ${email}`;
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">New Newsletter Subscription</h2>
        <p>A new user has subscribed to the MoneyDesk newsletter.</p>
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Subscription Date:</strong> ${safeDate}</p>
          <p><strong>Subscribed At:</strong> ${new Date(subscribedAt).toLocaleString()}</p>
        </div>
        <p style="color: #6b7280; font-size: 14px;">
          You can view all subscribers in the admin portal at /admin/blog
        </p>
      </div>
    `;
    const emailText = `
New Newsletter Subscription

A new user has subscribed to the MoneyDesk newsletter.

Email: ${email}
Subscription Date: ${date}
Subscribed At: ${new Date(subscribedAt).toLocaleString()}

You can view all subscribers in the admin portal at /admin/blog
    `;

    // Try Resend first (recommended - free tier: 3,000 emails/month)
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      try {
        const emailResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: "MoneyDesk Newsletter <newsletter@moneydesk.co>",
            to: [NOTIFICATION_EMAIL],
            subject: emailSubject,
            html: emailHtml,
            text: emailText,
          }),
        });

        if (emailResponse.ok) {
          console.log("✅ Email notification sent to support@moneydesk.co via Resend");
          return NextResponse.json(
            { success: true, message: "Notification sent" },
            { status: 200 }
          );
        } else {
          const errorData = await emailResponse.json();
          console.error("Resend API error:", errorData);
        }
      } catch (error) {
        console.error("Error with Resend API:", error);
      }
    }

    // Try SendGrid as fallback
    const sendGridApiKey = process.env.SENDGRID_API_KEY;
    if (sendGridApiKey) {
      try {
        const emailResponse = await fetch("https://api.sendgrid.com/v3/mail/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sendGridApiKey}`,
          },
          body: JSON.stringify({
            personalizations: [
              {
                to: [{ email: NOTIFICATION_EMAIL }],
                subject: emailSubject,
              },
            ],
            from: { email: "newsletter@moneydesk.co", name: "MoneyDesk Newsletter" },
            content: [
              { type: "text/plain", value: emailText },
              { type: "text/html", value: emailHtml },
            ],
          }),
        });

        if (emailResponse.ok) {
          console.log("✅ Email notification sent to support@moneydesk.co via SendGrid");
          return NextResponse.json(
            { success: true, message: "Notification sent" },
            { status: 200 }
          );
        } else {
          const errorText = await emailResponse.text();
          console.error("SendGrid API error:", errorText);
        }
      } catch (error) {
        console.error("Error with SendGrid API:", error);
      }
    }

    // Fallback: Log to console (for development)
    console.log("📧 Newsletter Subscription Notification");
    console.log("To:", NOTIFICATION_EMAIL);
    console.log("New subscriber:", email);
    console.log("Date:", date);
    console.log("---");
    console.log("⚠️ To enable email notifications, set RESEND_API_KEY or SENDGRID_API_KEY in your environment variables");

    return NextResponse.json(
      { success: true, message: "Notification sent" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending newsletter notification:", error);
    // Don't fail the subscription if email fails
    return NextResponse.json(
      { success: false, error: "Failed to send notification" },
      { status: 500 }
    );
  }
}

