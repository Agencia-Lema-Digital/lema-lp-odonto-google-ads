import { NextRequest, NextResponse } from "next/server";

const WEBHOOK_URL = "https://hook.us1.make.com/47cmc7f2llqa4jxay1e8g2jhuj4u5lny";

// Reenvia o payload do formulário ao webhook do Make a partir do servidor.
// Evita CORS/no-cors (que truncava o JSON no client) e mantém a URL fora do bundle.
// O corpo já chega no formato final esperado pelo Make (array com form/respondent).
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    return NextResponse.json({ ok: response.ok }, { status: response.ok ? 200 : 502 });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
