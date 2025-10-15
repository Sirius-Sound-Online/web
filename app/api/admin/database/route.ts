import { NextRequest, NextResponse } from "next/server";
import { getAdminSession } from "@/lib/admin/auth";
import { prisma } from "@/lib/prisma";
import { TableName } from "@/lib/admin/data";

export async function PATCH(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { table, id, data } = body;

    if (!table || !id || !data) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const tableName = table as TableName;
    const model = prisma[tableName] as any;

    if (!model || typeof model.update !== "function") {
      return NextResponse.json(
        { error: "Invalid table name" },
        { status: 400 }
      );
    }

    // Remove id from data to prevent overwriting
    const { id: _, ...updateData } = data;

    // Convert date strings back to Date objects
    const processedData: any = {};
    for (const [key, value] of Object.entries(updateData)) {
      if (key.toLowerCase().includes("date") || key.toLowerCase().includes("time")) {
        processedData[key] = value ? new Date(value as string) : null;
      } else if (value === "true") {
        processedData[key] = true;
      } else if (value === "false") {
        processedData[key] = false;
      } else if (value === "" || value === "null" || value === "NULL") {
        processedData[key] = null;
      } else {
        processedData[key] = value;
      }
    }

    const updated = await model.update({
      where: { id },
      data: processedData,
    });

    return NextResponse.json({
      success: true,
      record: updated,
    });
  } catch (error) {
    console.error("Error updating database record:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to update record" },
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
    const table = searchParams.get("table") as TableName;
    const id = searchParams.get("id");

    if (!table || !id) {
      return NextResponse.json(
        { error: "Missing table or id" },
        { status: 400 }
      );
    }

    const model = prisma[table] as any;

    if (!model || typeof model.delete !== "function") {
      return NextResponse.json(
        { error: "Invalid table name" },
        { status: 400 }
      );
    }

    await model.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting database record:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to delete record" },
      { status: 500 }
    );
  }
}
