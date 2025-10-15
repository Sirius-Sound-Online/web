import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin/auth";
import { saveMediaFile, deleteMediaFile } from "@/lib/admin/file-operations";
import type { MediaCategory } from "@/lib/admin/media-utils";

export async function POST(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const category = formData.get("category") as MediaCategory;

    if (!file || !category) {
      return NextResponse.json(
        { error: "Missing file or category" },
        { status: 400 }
      );
    }

    if (!["images", "video", "audio"].includes(category)) {
      return NextResponse.json(
        { error: "Invalid category" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const mediaFile = await saveMediaFile(category, file.name, buffer);

    return NextResponse.json({
      success: true,
      file: mediaFile,
    });
  } catch (error) {
    console.error("Error uploading media:", error);
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

    if (!["images", "video", "audio"].includes(category)) {
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
