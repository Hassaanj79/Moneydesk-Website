import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

// GET all job positions
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const published = searchParams.get("published");

    let sql = "SELECT * FROM job_positions WHERE 1=1";
    const params: any[] = [];

    if (published !== null) {
      sql += " AND published = ?";
      params.push(published === "true");
    }

    sql += " ORDER BY created_at DESC";

    const positions = await query(sql, params);

    const formattedPositions = positions.map((pos: any) => ({
      id: pos.id,
      title: pos.title,
      department: pos.department,
      location: pos.location,
      type: pos.type,
      description: pos.description,
      requirements: pos.requirements || "",
      published: Boolean(pos.published),
    }));

    return NextResponse.json({ success: true, positions: formattedPositions });
  } catch (error) {
    console.error("Error fetching job positions:", error);
    return NextResponse.json(
      { error: "Failed to fetch job positions" },
      { status: 500 }
    );
  }
}

// POST create/update job position
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, title, department, location, type, description, requirements, published } = body;

    const sql = `
      INSERT INTO job_positions (id, title, department, location, type, description, requirements, published)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        title = VALUES(title),
        department = VALUES(department),
        location = VALUES(location),
        type = VALUES(type),
        description = VALUES(description),
        requirements = VALUES(requirements),
        published = VALUES(published)
    `;

    await query(sql, [
      id,
      title,
      department,
      location,
      type,
      description,
      requirements || "",
      published ? 1 : 0,
    ]);

    return NextResponse.json({ success: true, message: "Job position saved successfully" });
  } catch (error) {
    console.error("Error saving job position:", error);
    return NextResponse.json(
      { error: "Failed to save job position" },
      { status: 500 }
    );
  }
}

// DELETE job position
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Job position ID is required" }, { status: 400 });
    }

    await query("DELETE FROM job_positions WHERE id = ?", [id]);

    return NextResponse.json({ success: true, message: "Job position deleted successfully" });
  } catch (error) {
    console.error("Error deleting job position:", error);
    return NextResponse.json(
      { error: "Failed to delete job position" },
      { status: 500 }
    );
  }
}

