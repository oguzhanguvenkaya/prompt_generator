import { NextRequest, NextResponse } from "next/server";
import { createSession, getSessions } from "@/lib/db/queries";

export async function GET(req: NextRequest) {
  const agentId = req.nextUrl.searchParams.get("agentId") ?? undefined;
  const sessions = await getSessions(agentId);
  return NextResponse.json(sessions);
}

export async function POST(req: NextRequest) {
  const { agentId, targetModel, title } = await req.json();
  if (!agentId) {
    return NextResponse.json({ error: "agentId required" }, { status: 400 });
  }
  const session = await createSession(agentId, targetModel, title);
  return NextResponse.json(session);
}
