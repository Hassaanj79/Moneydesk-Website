import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

// GET all contact form submissions
export async function GET() {
  try {
    const submissions = await query(
      "SELECT * FROM contact_submissions ORDER BY submitted_at DESC"
    );

    const formattedSubmissions = submissions.map((sub: any) => ({
      id: sub.id,
      name: sub.name,
      email: sub.email,
      subject: sub.subject,
      message: sub.message,
      submittedAt: sub.submitted_at,
      date: sub.date,
    }));

    return NextResponse.json({ success: true, submissions: formattedSubmissions });
  } catch (error) {
    console.error("Error fetching contact submissions:", error);
    return NextResponse.json(
      { error: "Failed to fetch contact submissions" },
      { status: 500 }
    );
  }
}

// POST create contact form submission
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, name, email, subject, message, date, submittedAt } = body;

    await query(
      `INSERT INTO contact_submissions (id, name, email, subject, message, date, submitted_at) 
       VALUES (?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         name = VALUES(name),
         email = VALUES(email),
         subject = VALUES(subject),
         message = VALUES(message),
         date = VALUES(date),
         submitted_at = VALUES(submitted_at)`,
      [id, name, email, subject, message, date, submittedAt || new Date().toISOString()]
    );

    return NextResponse.json({ success: true, message: "Submission saved successfully" });
  } catch (error) {
    console.error("Error saving contact submission:", error);
    return NextResponse.json(
      { error: "Failed to save contact submission" },
      { status: 500 }
    );
  }
}

