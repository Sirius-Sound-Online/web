import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin/auth";
import { saveMediaFile, deleteMediaFile } from "@/lib/admin/file-operations";
import type { MediaCategory } from "@/lib/admin/media-utils";

export async function POST(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    console.error("[Media Upload] Unauthorized access attempt");
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const category = formData.get("category") as MediaCategory;

    console.log("[Media Upload] Request received:", {
      hasFile: !!file,
      category,
      fileName: file?.name,
      fileSize: file?.size
    });

    if (!file || !category) {
      console.error("[Media Upload] Missing file or category:", { file: !!file, category });
      return NextResponse.json(
        { error: "Missing file or category" },
        { status: 400 }
      );
    }

    if (!["images", "video", "audio", "blog"].includes(category)) {
      return NextResponse.json(
        { error: "Invalid category" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    console.log("[Media Upload] Buffer created, saving file...");

    const mediaFile = await saveMediaFile(category, file.name, buffer);
    console.log("[Media Upload] File saved successfully:", mediaFile.url);

    return NextResponse.json({
      success: true,
      file: mediaFile,
    });
  } catch (error) {
    console.error("[Media Upload] Error uploading media:", error);
    console.error("[Media Upload] Error stack:", error instanceof Error ? error.stack : "No stack trace");
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to upload media" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") as MediaCategory;
    const fileName = searchParams.get("fileName");

    if (!category || !fileName) {
      return NextResponse.json(
        { error: "Missing category or fileName" },
        { status: 400 }
      );
    }

    if (!["images", "video", "audio", "blog"].includes(category)) {
      return NextResponse.json(
        { error: "Invalid category" },
        { status: 400 }
      );
    }

    await deleteMediaFile(category, fileName);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting media:", error);
    return NextResponse.json(
      { error: "Failed to delete media" },
      { status: 500 }
    );
  }
}
