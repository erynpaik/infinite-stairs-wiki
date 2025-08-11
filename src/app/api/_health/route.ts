import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({ db: "ok" });
  } catch (e: any) {
    return NextResponse.json({ db: "fail", error: String(e?.message) }, { status: 500 });
  }
}
