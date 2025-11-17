import { NextRequest, NextResponse } from "next/server";
import { query } from "@/lib/db";

// GET all newsletter subscribers
export async function GET() {
  try {
    const subscribers = await query(
      "SELECT * FROM newsletter_subscribers ORDER BY subscribed_at DESC"
    );

    const formattedSubscribers = subscribers.map((sub: any) => ({
      email: sub.email,
      subscribedAt: sub.subscribed_at,
      date: sub.date,
    }));

    return NextResponse.json({ success: true, subscribers: formattedSubscribers });
  } catch (error) {
    console.error("Error fetching subscribers:", error);
    return NextResponse.json(
      { error: "Failed to fetch subscribers" },
      { status: 500 }
    );
  }
}

// POST add newsletter subscriber
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, date, subscribedAt } = body;

    // Check if email already exists
    const existing = await query(
      "SELECT id FROM newsletter_subscribers WHERE email = ?",
      [email]
    );

    if (existing.length > 0) {
      return NextResponse.json(
        { error: "Email already subscribed" },
        { status: 400 }
      );
    }

    await query(
      "INSERT INTO newsletter_subscribers (email, date, subscribed_at) VALUES (?, ?, ?)",
      [email, date, subscribedAt || new Date().toISOString()]
    );

    return NextResponse.json({ success: true, message: "Subscribed successfully" });
  } catch (error: any) {
    console.error("Error adding subscriber:", error);
    
    // Handle duplicate entry error
    if (error.code === "ER_DUP_ENTRY") {
      return NextResponse.json(
        { error: "Email already subscribed" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Failed to add subscriber" },
      { status: 500 }
    );
  }
}

