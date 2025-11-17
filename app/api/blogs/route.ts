import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

// GET all blogs
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const published = searchParams.get("published");
    const category = searchParams.get("category");

    let sql = "SELECT * FROM blogs WHERE 1=1";
    const params: any[] = [];

    if (published !== null) {
      sql += " AND published = ?";
      params.push(published === "true");
    }

    if (category) {
      sql += " AND category = ?";
      params.push(category);
    }

    sql += " ORDER BY created_at DESC";

    const blogs = await query(sql, params);

    // Format the response
    const formattedBlogs = blogs.map((blog: any) => ({
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
    }));

    return NextResponse.json({ success: true, blogs: formattedBlogs });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}

// POST create new blog
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      id,
      title,
      excerpt,
      content,
      author,
      date,
      readTime,
      category,
      published,
      coverPhoto,
    } = body;

    const sql = `
      INSERT INTO blogs (id, title, excerpt, content, author, date, read_time, category, published, cover_photo)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        title = VALUES(title),
        excerpt = VALUES(excerpt),
        content = VALUES(content),
        author = VALUES(author),
        date = VALUES(date),
        read_time = VALUES(read_time),
        category = VALUES(category),
        published = VALUES(published),
        cover_photo = VALUES(cover_photo)
    `;

    await query(sql, [
      id,
      title,
      excerpt || "",
      content,
      author,
      date,
      readTime || "",
      category,
      published ? 1 : 0,
      coverPhoto || null,
    ]);

    return NextResponse.json({ success: true, message: "Blog saved successfully" });
  } catch (error) {
    console.error("Error saving blog:", error);
    return NextResponse.json(
      { error: "Failed to save blog" },
      { status: 500 }
    );
  }
}

// DELETE blog
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Blog ID is required" }, { status: 400 });
    }

    await query("DELETE FROM blogs WHERE id = ?", [id]);

    return NextResponse.json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json(
      { error: "Failed to delete blog" },
      { status: 500 }
    );
  }
}

