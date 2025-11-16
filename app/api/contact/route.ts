import { NextRequest, NextResponse } from "next/server";

const NOTIFICATION_EMAIL = "support@moneydesk.co";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Email content
    const emailSubject = `New Contact Form Submission: ${subject}`;
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">New Contact Form Submission</h2>
        <p>A new message has been submitted through the MoneyDesk contact form.</p>
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <div style="background-color: white; padding: 15px; border-radius: 4px; margin-top: 10px; white-space: pre-wrap;">${message}</div>
          <p style="margin-top: 15px; color: #6b7280; font-size: 12px;">
            <strong>Submitted At:</strong> ${new Date().toLocaleString()}
          </p>
        </div>
        <p style="color: #6b7280; font-size: 14px;">
          You can view all contact submissions in the admin portal at /admin/blog
        </p>
      </div>
    `;
    const emailText = `
New Contact Form Submission

A new message has been submitted through the MoneyDesk contact form.

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

Submitted At: ${new Date().toLocaleString()}

You can view all contact submissions in the admin portal at /admin/blog
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
            from: "MoneyDesk Contact Form <contact@moneydesk.co>",
            to: [NOTIFICATION_EMAIL],
            subject: emailSubject,
            html: emailHtml,
            text: emailText,
            replyTo: email, // Allow replying directly to the sender
          }),
        });

        if (emailResponse.ok) {
          console.log("✅ Contact form email notification sent to support@moneydesk.co via Resend");
          return NextResponse.json(
            { success: true, message: "Message sent successfully" },
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
                replyTo: { email: email, name: name },
              },
            ],
            from: { email: "contact@moneydesk.co", name: "MoneyDesk Contact Form" },
            content: [
              { type: "text/plain", value: emailText },
              { type: "text/html", value: emailHtml },
            ],
          }),
        });

        if (emailResponse.ok) {
          console.log("✅ Contact form email notification sent to support@moneydesk.co via SendGrid");
          return NextResponse.json(
            { success: true, message: "Message sent successfully" },
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
    console.log("📧 Contact Form Submission");
    console.log("To:", NOTIFICATION_EMAIL);
    console.log("From:", name, `(${email})`);
    console.log("Subject:", subject);
    console.log("Message:", message);
    console.log("---");
    console.log("⚠️ To enable email notifications, set RESEND_API_KEY or SENDGRID_API_KEY in your environment variables");

    return NextResponse.json(
      { success: true, message: "Message sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending contact form notification:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send message" },
      { status: 500 }
    );
  }
}

