import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin/auth";
import { saveBlogPost, deleteBlogPost } from "@/lib/admin/file-operations";

export async function POST(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { slug, frontmatter, content } = body;

    if (!slug || !frontmatter || !content) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const filePath = await saveBlogPost(slug, frontmatter, content);

    return NextResponse.json({
      success: true,
      slug,
      filePath,
    });
  } catch (error) {
    console.error("Error creating blog post:", error);
    return NextResponse.json(
      { error: "Failed to create blog post" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { slug, frontmatter, content } = body;

    if (!slug || !frontmatter || !content) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const filePath = await saveBlogPost(slug, frontmatter, content);

    return NextResponse.json({
      success: true,
      slug,
      filePath,
    });
  } catch (error) {
    console.error("Error updating blog post:", error);
    return NextResponse.json(
      { error: "Failed to update blog post" },
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
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json(
        { error: "Missing slug parameter" },
        { status: 400 }
      );
    }

    await deleteBlogPost(slug);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting blog post:", error);
    return NextResponse.json(
      { error: "Failed to delete blog post" },
      { status: 500 }
    );
  }
}
