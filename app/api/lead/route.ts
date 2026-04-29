import { NextRequest, NextResponse } from "next/server";

const WEBHOOK_URL =
  "https://hook.us1.make.com/6ryi9x0r8gboof6j7y1ovfxfwi8p9tlt";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    return NextResponse.json({ ok: true }, { status: response.ok ? 200 : 502 });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
