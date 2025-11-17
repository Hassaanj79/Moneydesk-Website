import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

// GET all categories
export async function GET(request: NextRequest) {
  try {
    const sql = "SELECT * FROM blog_categories ORDER BY name ASC";
    const categories = await query(sql);

    // Format the response
    const formattedCategories = categories.map((cat: any) => ({
      id: cat.id,
      name: cat.name,
      createdAt: cat.created_at,
      updatedAt: cat.updated_at,
    }));

    return NextResponse.json({ success: true, categories: formattedCategories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

// POST create new category
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name } = body;

    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: "Category name is required" },
        { status: 400 }
      );
    }

    const categoryName = name.trim();
    const categoryId = categoryName.toLowerCase().replace(/\s+/g, "-");

    // Check if category already exists
    const existing = await query(
      "SELECT * FROM blog_categories WHERE name = ?",
      [categoryName]
    );

    if (existing.length > 0) {
      return NextResponse.json(
        { error: "Category already exists", category: existing[0] },
        { status: 409 }
      );
    }

    const sql = `
      INSERT INTO blog_categories (id, name)
      VALUES (?, ?)
    `;

    await query(sql, [categoryId, categoryName]);

    return NextResponse.json({
      success: true,
      message: "Category created successfully",
      category: {
        id: categoryId,
        name: categoryName,
      },
    });
  } catch (error: any) {
    console.error("Error creating category:", error);
    
    // Check for duplicate entry error
    if (error.code === "ER_DUP_ENTRY" || error.errno === 1062) {
      return NextResponse.json(
        { error: "Category already exists" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: error.sqlMessage || error.message || "Failed to create category" },
      { status: 500 }
    );
  }
}

// DELETE category
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const name = searchParams.get("name");

    if (!id && !name) {
      return NextResponse.json(
        { error: "Category ID or name is required" },
        { status: 400 }
      );
    }

    // Check if category is being used by any blogs
    const checkSql = id
      ? "SELECT COUNT(*) as count FROM blogs WHERE category = (SELECT name FROM blog_categories WHERE id = ?)"
      : "SELECT COUNT(*) as count FROM blogs WHERE category = ?";
    
    const checkParams = id ? [id] : [name];
    const usageCheck = await query(checkSql, checkParams);

    if (usageCheck[0]?.count > 0) {
      return NextResponse.json(
        { error: "Cannot delete category that is being used by blog posts" },
        { status: 400 }
      );
    }

    const deleteSql = id
      ? "DELETE FROM blog_categories WHERE id = ?"
      : "DELETE FROM blog_categories WHERE name = ?";
    
    await query(deleteSql, checkParams);

    return NextResponse.json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting category:", error);
    return NextResponse.json(
      { error: "Failed to delete category" },
      { status: 500 }
    );
  }
}

