import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Pesan wajib diisi" }, { status: 400 });
    }

    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "alauddinazhary05@gmail.com",
      subject: `Pesan baru dari Portfolio: ${name || "Pengunjung"}`,
      replyTo: email || undefined,
      html: `
        <div style="font-family: sans-serif; padding: 20px;">
          <h2>Pesan Baru dari Portfolio</h2>
          <p><strong>Nama:</strong> ${name || "Anonim"}</p>
          <p><strong>Email:</strong> ${email || "Tidak dicantumkan"}</p>
          <p><strong>Pesan:</strong></p>
          <blockquote style="background: #f4f4f4; padding: 15px; border-left: 4px solid #10b981;">
            ${message}
          </blockquote>
        </div>
      `,
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
