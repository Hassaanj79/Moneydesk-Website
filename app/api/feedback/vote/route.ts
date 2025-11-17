import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

// POST vote on feedback submission
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { submissionId, userIdentifier } = body;

    if (!submissionId || !userIdentifier) {
      return NextResponse.json(
        { error: "Submission ID and user identifier are required" },
        { status: 400 }
      );
    }

    // Check if user already voted
    const existingVote = await query(
      "SELECT id FROM feedback_votes WHERE submission_id = ? AND user_identifier = ?",
      [submissionId, userIdentifier]
    );

    if (existingVote.length > 0) {
      // Remove vote
      await query(
        "DELETE FROM feedback_votes WHERE submission_id = ? AND user_identifier = ?",
        [submissionId, userIdentifier]
      );
      return NextResponse.json({ success: true, voted: false, message: "Vote removed" });
    } else {
      // Add vote
      await query(
        "INSERT INTO feedback_votes (submission_id, user_identifier) VALUES (?, ?)",
        [submissionId, userIdentifier]
      );
      return NextResponse.json({ success: true, voted: true, message: "Vote added" });
    }
  } catch (error) {
    console.error("Error voting on feedback:", error);
    return NextResponse.json({ error: "Failed to vote" }, { status: 500 });
  }
}

