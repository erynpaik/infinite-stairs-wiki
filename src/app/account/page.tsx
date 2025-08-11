"use client";

import { useSession } from "next-auth/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function AccountPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") router.push("/");
  }, [status, router]);

  if (status === "loading") {
    return <div className="p-6 text-white">Loading…</div>;
  }
  if (!session?.user) return null;

  return (
    <main className="max-w-3xl mx-auto px-4 py-10 text-white">
      {/* Back to Home button */}
      <a
        href="/"
        className="inline-block font-pixel text-lg mb-8 hover:underline"
        >
        ← Back to Home
      </a>

      <h1 className="font-pixel text-3xl mb-6">Account</h1>

      {/* Removed the yellow Avatar tab button */}

      <AvatarSection />
    </main>
  );
}

function AvatarSection() {
  const { data: session } = useSession();
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(
    session?.user?.image ?? null
  );
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  const initial = useMemo(() => {
    const n = (session?.user?.name || session?.user?.email || "?").trim();
    return n ? n[0]?.toUpperCase() : "U";
  }, [session?.user?.name, session?.user?.email]);

  function onPickFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!f.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }
    setFile(f);
    setPreview(URL.createObjectURL(f));
  }

  async function onSave() {
    if (!file) {
      alert("Choose an image first.");
      return;
    }
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      if (session?.user?.email) fd.append("email", session.user.email);

      const res = await fetch("/api/account/upload-avatar", {
        method: "POST",
        body: fd,
      });
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      setPreview(data.url);
      console.log("Avatar saved successfully:", data.url);
    } catch (e: any) {
      alert(e?.message ?? "Something went wrong");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="rounded-sm border-[3px] border-[#aea693] p-4 bg-[#0e0e12] shadow-[4px_4px_0px_rgba(0,0,0,0.6)]">
      <h2 className="font-pixel text-xl mb-4">Edit Avatar</h2>

      <div className="flex items-center gap-4">
        <div className="h-24 w-24 rounded-full overflow-hidden border-[3px] border-[#aea693] bg-[#435b87] flex items-center justify-center">
          {preview ? (
            <img src={preview} alt="Preview" className="h-full w-full object-cover" />
          ) : (
            <span className="font-pixel text-2xl text-white">{initial}</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={onPickFile}
            className="hidden"
          />
          <button
            onClick={() => fileRef.current?.click()}
            className="font-pixel bg-[#435b87] text-white border-[3px] border-[#aea693] px-4 py-2 rounded-sm shadow-[2px_2px_0px_rgba(0,0,0,0.5)] hover:brightness-110 transition"
          >
            Choose Image
          </button>
          <p className="text-xs text-gray-400">PNG/JPG, up to ~2MB recommended.</p>
        </div>
      </div>

      <div className="mt-6 flex gap-2">
        <button
          onClick={onSave}
          disabled={saving}
          className="font-pixel bg-[#fed035] text-black border-[3px] border-[#aea693] px-5 py-2 rounded-sm shadow-[2px_2px_0px_rgba(0,0,0,0.5)] hover:brightness-110 transition disabled:opacity-70"
        >
          {saving ? "Saving…" : "Save Avatar"}
        </button>
        {preview && (
          <button
            onClick={() => {
              setPreview(session?.user?.image ?? null);
              setFile(null);
            }}
            className="font-pixel bg-[#2b2b2f] text-white border-[3px] border-[#aea693] px-5 py-2 rounded-sm shadow-[2px_2px_0px_rgba(0,0,0,0.5)] hover:brightness-110 transition"
          >
            Reset
          </button>
        )}
      </div>
    </section>
  );
}
