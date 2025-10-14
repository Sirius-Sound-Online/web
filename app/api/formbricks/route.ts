import { NextResponse } from "next/server";

const API_HOST = process.env.NEXT_PUBLIC_FORMBRICKS_URL;

export async function POST(request: Request) {
  if (!API_HOST) {
    return NextResponse.json({ error: "Formbricks not configured" }, { status: 500 });
  }
  const body = await request.text();
  const upstream = await fetch(`${API_HOST}/api/v1/responses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.FORMBRICKS_API_KEY ?? ""}`,
    },
    body,
  });
  const data = await upstream.json();
  return NextResponse.json(data, { status: upstream.status });
}
