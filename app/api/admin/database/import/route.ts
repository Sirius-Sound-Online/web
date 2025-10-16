import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin/auth";
import { importDatabase } from "@/lib/admin/database-operations";

export async function POST(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    console.log("[Database Import] Starting import...");

    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided" },
        { status: 400 }
      );
    }

    console.log("[Database Import] File received:", file.name, "Size:", file.size);

    // Validate file type
    if (!file.name.endsWith(".db") && !file.name.endsWith(".sqlite") && !file.name.endsWith(".sqlite3")) {
      return NextResponse.json(
        { error: "Invalid file type. Please upload a .db, .sqlite, or .sqlite3 file" },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    await importDatabase(buffer);

    console.log("[Database Import] Import completed successfully");

    return NextResponse.json({
      success: true,
      message: "Database imported successfully. Please restart the application.",
    });
  } catch (error) {
    console.error("[Database Import] Error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to import database" },
      { status: 500 }
    );
  }
}
