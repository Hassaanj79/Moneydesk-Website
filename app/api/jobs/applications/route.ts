import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

// GET all job applications
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const positionId = searchParams.get("positionId");

    let sql = `
      SELECT ja.*, jp.title as job_title
      FROM job_applications ja
      LEFT JOIN job_positions jp ON ja.position_id = jp.id
      WHERE 1=1
    `;
    const params: any[] = [];

    if (positionId) {
      sql += " AND ja.position_id = ?";
      params.push(positionId);
    }

    sql += " ORDER BY ja.applied_at DESC";

    const applications = await query(sql, params);

    const formattedApplications = applications.map((app: any) => ({
      id: app.id,
      positionId: app.position_id,
      jobTitle: app.job_title || "Unknown Position",
      name: app.name,
      email: app.email,
      phone: app.phone || "",
      resumeUrl: app.resume_url || "",
      coverLetter: app.cover_letter || "",
      appliedAt: app.applied_at,
      date: app.date,
      // Keep old field names for compatibility
      applicantName: app.name,
      applicantEmail: app.email,
      applicantPhone: app.phone || "",
    }));

    return NextResponse.json({ success: true, applications: formattedApplications });
  } catch (error) {
    console.error("Error fetching job applications:", error);
    return NextResponse.json(
      { error: "Failed to fetch job applications" },
      { status: 500 }
    );
  }
}

// POST create job application
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, positionId, name, email, phone, resumeUrl, coverLetter, date, appliedAt } = body;

    await query(
      `INSERT INTO job_applications (id, position_id, name, email, phone, resume_url, cover_letter, date, applied_at) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         position_id = VALUES(position_id),
         name = VALUES(name),
         email = VALUES(email),
         phone = VALUES(phone),
         resume_url = VALUES(resume_url),
         cover_letter = VALUES(cover_letter),
         date = VALUES(date),
         applied_at = VALUES(applied_at)`,
      [
        id,
        positionId,
        name,
        email,
        phone || null,
        resumeUrl || null,
        coverLetter || "",
        date,
        appliedAt || new Date().toISOString(),
      ]
    );

    return NextResponse.json({ success: true, message: "Application submitted successfully" });
  } catch (error) {
    console.error("Error saving job application:", error);
    return NextResponse.json(
      { error: "Failed to save job application" },
      { status: 500 }
    );
  }
}

