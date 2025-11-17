import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

// GET all feedback submissions
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const status = searchParams.get("status");

    let sql = `
      SELECT fs.*, 
        COUNT(DISTINCT fv.id) as votes,
        COUNT(DISTINCT fc.id) as comment_count
      FROM feedback_submissions fs
      LEFT JOIN feedback_votes fv ON fs.id = fv.submission_id
      LEFT JOIN feedback_comments fc ON fs.id = fc.submission_id
      WHERE 1=1
    `;
    const params: any[] = [];

    if (type) {
      sql += " AND fs.type = ?";
      params.push(type);
    }

    if (status) {
      sql += " AND fs.status = ?";
      params.push(status);
    }

    sql += " GROUP BY fs.id ORDER BY fs.submitted_at DESC";

    const submissions = await query(sql, params);

    // Get votes and comments for each submission
    const formattedSubmissions = await Promise.all(
      submissions.map(async (sub: any) => {
        const votes = await query(
          "SELECT user_identifier FROM feedback_votes WHERE submission_id = ?",
          [sub.id]
        );
        const comments = await query(
          "SELECT * FROM feedback_comments WHERE submission_id = ? ORDER BY submitted_at ASC",
          [sub.id]
        );

        return {
          id: sub.id,
          title: sub.title,
          description: sub.description,
          type: sub.type,
          status: sub.status,
          votes: votes.length,
          voters: votes.map((v: any) => v.user_identifier),
          comments: comments.map((c: any) => ({
            id: c.id,
            author: c.author,
            content: c.content,
            submittedAt: c.submitted_at,
            date: c.date,
          })),
          submittedBy: sub.submitted_by,
          submittedByName: sub.submitted_by_name,
          submittedByEmail: sub.submitted_by_email,
          submittedAt: sub.submitted_at,
          date: sub.date,
        };
      })
    );

    return NextResponse.json({ success: true, submissions: formattedSubmissions });
  } catch (error) {
    console.error("Error fetching feedback submissions:", error);
    return NextResponse.json(
      { error: "Failed to fetch feedback submissions" },
      { status: 500 }
    );
  }
}

// POST create feedback submission
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      id,
      title,
      description,
      type,
      status,
      submittedBy,
      submittedByName,
      submittedByEmail,
      date,
      submittedAt,
    } = body;

    // Use INSERT ... ON DUPLICATE KEY UPDATE to handle duplicate IDs
    // This can happen if two submissions happen at the exact same millisecond
    await query(
      `INSERT INTO feedback_submissions (id, title, description, type, status, submitted_by, submitted_by_name, submitted_by_email, date, submitted_at) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         title = VALUES(title),
         description = VALUES(description),
         type = VALUES(type),
         status = VALUES(status),
         submitted_by = VALUES(submitted_by),
         submitted_by_name = VALUES(submitted_by_name),
         submitted_by_email = VALUES(submitted_by_email),
         date = VALUES(date),
         submitted_at = VALUES(submitted_at)`,
      [
        id,
        title,
        description,
        type,
        status || "under-review",
        submittedBy || "",
        submittedByName || null,
        submittedByEmail || null,
        date,
        submittedAt || new Date().toISOString(),
      ]
    );

    return NextResponse.json({ success: true, message: "Feedback submitted successfully" });
  } catch (error: any) {
    console.error("Error saving feedback submission:", error);
    console.error("Error details:", {
      message: error?.message,
      code: error?.code,
      sqlState: error?.sqlState,
      errno: error?.errno,
    });
    return NextResponse.json(
      { 
        error: "Failed to save feedback submission",
        details: error?.message || "Unknown error",
        code: error?.code,
      },
      { status: 500 }
    );
  }
}

// PUT update feedback submission (for status updates)
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: "ID and status are required" },
        { status: 400 }
      );
    }

    await query("UPDATE feedback_submissions SET status = ? WHERE id = ?", [status, id]);

    return NextResponse.json({ success: true, message: "Feedback updated successfully" });
  } catch (error) {
    console.error("Error updating feedback submission:", error);
    return NextResponse.json(
      { error: "Failed to update feedback submission" },
      { status: 500 }
    );
  }
}

// DELETE feedback submission
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Feedback ID is required" }, { status: 400 });
    }

    await query("DELETE FROM feedback_submissions WHERE id = ?", [id]);

    return NextResponse.json({ success: true, message: "Feedback deleted successfully" });
  } catch (error) {
    console.error("Error deleting feedback submission:", error);
    return NextResponse.json(
      { error: "Failed to delete feedback submission" },
      { status: 500 }
    );
  }
}

