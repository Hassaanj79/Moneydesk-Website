import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

// POST add comment to feedback submission
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, submissionId, author, content, date, submittedAt } = body;

    if (!submissionId || !author || !content) {
      return NextResponse.json(
        { error: "Submission ID, author, and content are required" },
        { status: 400 }
      );
    }

    await query(
      `INSERT INTO feedback_comments (id, submission_id, author, content, date, submitted_at) 
       VALUES (?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         author = VALUES(author),
         content = VALUES(content),
         date = VALUES(date),
         submitted_at = VALUES(submitted_at)`,
      [id, submissionId, author, content, date, submittedAt || new Date().toISOString()]
    );

    return NextResponse.json({ success: true, message: "Comment added successfully" });
  } catch (error) {
    console.error("Error adding comment:", error);
    return NextResponse.json({ error: "Failed to add comment" }, { status: 500 });
  }
}

