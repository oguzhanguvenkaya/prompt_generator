import { models } from "@/lib/ai/models";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(models);
}
