import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const runtime = "nodejs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key:    process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
  secure: true,
});

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const form = await req.formData();
    const file = form.get("file") as File | null;
    if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const url: string = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "infinite-stairs/avatars" },
        (err, result) => {
          if (err || !result) return reject(err || new Error("No result"));
          resolve(result.secure_url);
        }
      );
      stream.end(buffer);
    });

    await prisma.user.update({
      where: { email: session.user.email },
      data: { image: url },
    });

    return NextResponse.json({ url });
  } catch (e: any) {
    console.error("[upload-avatar] Cloudinary/DB error:", e);
    return NextResponse.json({ error: String(e?.message || e) }, { status: 500 });
  }
}
