import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export const runtime = "nodejs";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const form = await req.formData();
  const file = form.get("file") as File | null;
  if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const res = await cloudinary.uploader.upload_stream({ folder: "infinite-stairs/avatars" },
    async (err, result) => {}
  );

  // Promisify upload_stream
  const url: string = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "infinite-stairs/avatars" },
      (err, result) => (err || !result) ? reject(err) : resolve(result.secure_url)
    );
    stream.end(buffer);
  });

  // Persist URL on the user
  await prisma.user.update({
    where: { email: session.user.email },
    data: { image: url },
  });

  return NextResponse.json({ url });
}
