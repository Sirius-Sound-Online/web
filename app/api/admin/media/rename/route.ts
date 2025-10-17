import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin/auth";
import { renameMediaFile } from "@/lib/admin/file-operations";
import type { MediaCategory } from "@/lib/admin/media-utils";

export async function POST(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    console.error("[Media Rename] Unauthorized access attempt");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { category, oldName, newName } = body as {
      category: MediaCategory;
      oldName: string;
      newName: string;
    };

    console.log("[Media Rename] Request received:", {
      category,
      oldName,
      newName,
    });

    if (!category || !oldName || !newName) {
      console.error("[Media Rename] Missing parameters:", { category, oldName, newName });
      return NextResponse.json(
        { error: "Missing category, oldName, or newName" },
        { status: 400 }
      );
    }

    if (!["images", "video", "audio", "blog"].includes(category)) {
      return NextResponse.json(
        { error: "Invalid category" },
        { status: 400 }
      );
    }

    // Validate filename
    if (!/^[a-zA-Z0-9._-]+$/.test(newName)) {
      return NextResponse.json(
        { error: "Invalid filename. Only letters, numbers, dots, hyphens, and underscores are allowed." },
        { status: 400 }
      );
    }

    await renameMediaFile(category, oldName, newName);
    console.log("[Media Rename] File renamed successfully");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[Media Rename] Error renaming media:", error);
    console.error("[Media Rename] Error stack:", error instanceof Error ? error.stack : "No stack trace");
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to rename media" },
      { status: 500 }
    );
  }
}
