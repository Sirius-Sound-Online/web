import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin/auth";
import { exportDatabase } from "@/lib/admin/database-operations";

export async function GET(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    console.log("[Database Export] Starting export...");

    const { buffer, filename } = await exportDatabase();

    console.log("[Database Export] Export completed, size:", buffer.length);

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        "Content-Type": "application/x-sqlite3",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Length": buffer.length.toString(),
      },
    });
  } catch (error) {
    console.error("[Database Export] Error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to export database" },
      { status: 500 }
    );
  }
}
