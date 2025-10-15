import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin/auth";
import { updateWaitlistEntry } from "@/lib/admin/data";

export async function PATCH(request: NextRequest) {
  // Check admin auth
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!["pending", "confirmed", "rejected"].includes(status)) {
      return NextResponse.json(
        { error: "Invalid status" },
        { status: 400 }
      );
    }

    const updated = await updateWaitlistEntry(id, { status });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating waitlist entry:", error);
    return NextResponse.json(
      { error: "Failed to update waitlist entry" },
      { status: 500 }
    );
  }
}
