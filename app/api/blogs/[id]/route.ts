import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

// GET single blog by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const results = await query("SELECT * FROM blogs WHERE id = ?", [id]);

    if (results.length === 0) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    const blog = results[0];
    const formattedBlog = {
      id: blog.id,
      title: blog.title,
      excerpt: blog.excerpt,
      content: blog.content,
      author: blog.author,
      date: blog.date,
      readTime: blog.read_time,
      category: blog.category,
      published: Boolean(blog.published),
      coverPhoto: blog.cover_photo || undefined,
    };

    return NextResponse.json({ success: true, blog: formattedBlog });
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog" },
      { status: 500 }
    );
  }
}

