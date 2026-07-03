import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email and message are required." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["saurabhyd2004@gmail.com"],
      replyTo: email,
      subject: subject ? `[Portfolio] ${subject}` : `[Portfolio] New message from ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#0d1514;color:#e8f4f2;padding:40px;border-radius:8px;border:1px solid #116466">
          <div style="border-bottom:2px solid #116466;padding-bottom:20px;margin-bottom:28px">
            <h1 style="color:#22b5b8;font-size:1.4rem;margin:0;letter-spacing:2px;text-transform:uppercase">New Portfolio Message</h1>
          </div>
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:10px 0;color:#D9B08C;font-size:.8rem;letter-spacing:1px;text-transform:uppercase;width:100px">FROM</td><td style="padding:10px 0;color:#e8f4f2;font-size:.95rem">${name}</td></tr>
            <tr><td style="padding:10px 0;color:#D9B08C;font-size:.8rem;letter-spacing:1px;text-transform:uppercase">EMAIL</td><td style="padding:10px 0"><a href="mailto:${email}" style="color:#22b5b8">${email}</a></td></tr>
            ${subject ? `<tr><td style="padding:10px 0;color:#D9B08C;font-size:.8rem;letter-spacing:1px;text-transform:uppercase">SUBJECT</td><td style="padding:10px 0;color:#e8f4f2">${subject}</td></tr>` : ""}
          </table>
          <div style="margin-top:24px;padding:24px;background:rgba(17,100,102,.15);border-left:3px solid #116466;border-radius:4px">
            <p style="color:#D9B08C;font-size:.75rem;letter-spacing:1px;text-transform:uppercase;margin:0 0 12px">MESSAGE</p>
            <p style="color:#e8f4f2;line-height:1.8;margin:0;white-space:pre-wrap">${message}</p>
          </div>
          <div style="margin-top:32px;padding-top:20px;border-top:1px solid rgba(17,100,102,.3);text-align:center">
            <p style="color:rgba(209,232,226,.3);font-size:.7rem;margin:0">Sent via Saurabh Singh Yadav Portfolio</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to send email. Please try again." }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json({ error: "Server error. Please try again." }, { status: 500 });
  }
}