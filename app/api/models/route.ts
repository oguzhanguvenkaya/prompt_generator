import { models } from "@/lib/ai/models";
import { NextResponse } from "next/server";

export async function GET() {
  const activeModels = models.filter((m) => !m.deprecated);
  return NextResponse.json(activeModels);
}
