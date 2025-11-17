import { NextResponse } from "next/server";
import { testConnection, query } from "@/lib/db";

// GET database health check
export async function GET() {
  try {
    // Check environment variables first
    const envCheck = {
      DB_HOST: process.env.DB_HOST ? "✓ Set" : "✗ Missing",
      DB_USER: process.env.DB_USER ? "✓ Set" : "✗ Missing",
      DB_PASSWORD: process.env.DB_PASSWORD ? "✓ Set" : "✗ Missing",
      DB_NAME: process.env.DB_NAME ? "✓ Set" : "✗ Missing",
    };

    // Test connection
    let connectionError: any = null;
    let isConnected = false;
    
    try {
      isConnected = await testConnection();
    } catch (error: any) {
      connectionError = error;
    }
    
    if (!isConnected) {
      return NextResponse.json(
        { 
          status: "error", 
          message: "Database connection failed",
          connected: false,
          envCheck,
          config: {
            host: process.env.DB_HOST || "not set",
            user: process.env.DB_USER || "not set",
            database: process.env.DB_NAME || "not set",
            hasPassword: !!process.env.DB_PASSWORD,
          },
          error: connectionError ? {
            message: connectionError.message,
            code: connectionError.code,
            errno: connectionError.errno,
            sqlState: connectionError.sqlState,
          } : "Unknown error",
        },
        { status: 500 }
      );
    }

    // Test query - count tables
    const tables = await query(`
      SELECT COUNT(*) as count 
      FROM information_schema.tables 
      WHERE table_schema = DATABASE()
    `);

    // Get table names
    const tableNames = await query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = DATABASE()
      ORDER BY table_name
    `);

    return NextResponse.json({
      status: "success",
      message: "Database connection successful",
      connected: true,
      tables: {
        count: tables[0]?.count || 0,
        names: tableNames.map((t: any) => t.table_name),
      },
      envCheck: {
        DB_HOST: process.env.DB_HOST ? "✓ Set" : "✗ Missing",
        DB_USER: process.env.DB_USER ? "✓ Set" : "✗ Missing",
        DB_PASSWORD: process.env.DB_PASSWORD ? "✓ Set" : "✗ Missing",
        DB_NAME: process.env.DB_NAME ? "✓ Set" : "✗ Missing",
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("Database health check error:", error);
    
    // Check if environment variables are set
    const envCheck = {
      DB_HOST: process.env.DB_HOST ? "✓ Set" : "✗ Missing",
      DB_USER: process.env.DB_USER ? "✓ Set" : "✗ Missing",
      DB_PASSWORD: process.env.DB_PASSWORD ? "✓ Set" : "✗ Missing",
      DB_NAME: process.env.DB_NAME ? "✓ Set" : "✗ Missing",
    };

    return NextResponse.json(
      {
        status: "error",
        message: error.message || "Database health check failed",
        connected: false,
        error: error.toString(),
        code: error.code,
        envCheck,
        config: {
          host: process.env.DB_HOST || "not set",
          user: process.env.DB_USER || "not set",
          database: process.env.DB_NAME || "not set",
          hasPassword: !!process.env.DB_PASSWORD,
        },
      },
      { status: 500 }
    );
  }
}

