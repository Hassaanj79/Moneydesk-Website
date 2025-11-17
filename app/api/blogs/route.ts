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

    const response = NextResponse.json({ success: true, blogs: formattedBlogs });
    
    // Add caching headers for better performance
    response.headers.set('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=300');
    
    return response;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}

// Enable caching for this route
export const revalidate = 60; // Revalidate every 60 seconds

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

    // Ensure category exists in blog_categories table
    if (category && category.trim()) {
      const categoryName = category.trim();
      const categoryId = categoryName.toLowerCase().replace(/\s+/g, "-");

      // Check if category exists
      const existingCategory = await query(
        "SELECT * FROM blog_categories WHERE name = ? OR id = ?",
        [categoryName, categoryId]
      );

      // If category doesn't exist, create it
      if (existingCategory.length === 0) {
        try {
          await query(
            "INSERT INTO blog_categories (id, name) VALUES (?, ?)",
            [categoryId, categoryName]
          );
        } catch (categoryError: any) {
          // Ignore duplicate entry errors (race condition)
          if (categoryError.code !== "ER_DUP_ENTRY" && categoryError.errno !== 1062) {
            console.error("Error creating category:", categoryError);
          }
        }
      }
    }

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

    // Validate cover photo size if provided
    if (coverPhoto) {
      const base64Size = coverPhoto.length;
      // Base64 encoding increases size by ~33%, so check if it's reasonable
      // LONGTEXT can hold up to 4GB, but we'll warn if it's very large
      if (base64Size > 10 * 1024 * 1024) { // 10MB base64 string
        console.warn(`Large cover photo detected: ${Math.round(base64Size / 1024)}KB`);
      }
    }

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
  } catch (error: any) {
    console.error("Error saving blog:", error);
    console.error("Error details:", {
      code: error.code,
      errno: error.errno,
      sqlState: error.sqlState,
      sqlMessage: error.sqlMessage,
      message: error.message,
    });
    
    // Check if it's a data truncation error
    if (error.code === 'ER_DATA_TOO_LONG' || error.message?.includes('Data too long') || error.sqlMessage?.includes('Data too long')) {
      return NextResponse.json(
        { error: "Cover photo is too large. Please use a smaller image (max 2MB recommended). If you haven't run the database migration, please run: ALTER TABLE blogs MODIFY COLUMN cover_photo LONGTEXT;" },
        { status: 400 }
      );
    }
    
    // Check for database connection errors
    if (error.code === 'ECONNREFUSED' || error.code === 'ER_ACCESS_DENIED_ERROR') {
      return NextResponse.json(
        { error: "Database connection failed. Please check your database configuration." },
        { status: 500 }
      );
    }
    
    // Return detailed error message
    const errorMessage = error.sqlMessage || error.message || "Failed to save blog";
    return NextResponse.json(
      { error: errorMessage },
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

