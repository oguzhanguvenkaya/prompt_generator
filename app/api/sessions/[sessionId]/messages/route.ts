import { NextRequest, NextResponse } from "next/server";
import { getMessages } from "@/lib/db/queries";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ sessionId: string }> }
) {
  const { sessionId } = await params;
  const messages = await getMessages(sessionId);
  return NextResponse.json(messages);
}
