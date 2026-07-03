import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  console.log("=== CONTACT API HIT ===");

  try {
    const { name, email, subject, message } = await req.json();

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: "Name, email and message are required." }, { status: 400 });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    console.log("API key present:", !!apiKey, "| starts with:", apiKey?.substring(0, 8));

    if (!apiKey) {
      return NextResponse.json({ error: "API key not configured on server." }, { status: 500 });
    }

    // Call Resend REST API directly — no SDK, no constructor issues
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Portfolio <onboarding@resend.dev>",
        to: ["saurabhyd2004@gmail.com"],
        reply_to: email.trim(),
        subject: subject?.trim()
          ? `[Portfolio] ${subject.trim()}`
          : `[Portfolio] New message from ${name.trim()}`,
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;background:#0d1514;color:#e8f4f2;padding:40px;border-radius:8px;border:1px solid #116466;">
            <div style="border-bottom:2px solid #116466;padding-bottom:20px;margin-bottom:28px;">
              <h1 style="color:#22b5b8;font-size:1.3rem;margin:0;letter-spacing:2px;text-transform:uppercase;">📬 New Portfolio Message</h1>
            </div>
            <table style="width:100%;border-collapse:collapse;">
              <tr>
                <td style="padding:10px 0;color:#D9B08C;font-size:0.75rem;letter-spacing:1px;text-transform:uppercase;width:90px;vertical-align:top;">From</td>
                <td style="padding:10px 0;color:#e8f4f2;">${name.trim()}</td>
              </tr>
              <tr>
                <td style="padding:10px 0;color:#D9B08C;font-size:0.75rem;letter-spacing:1px;text-transform:uppercase;vertical-align:top;">Email</td>
                <td style="padding:10px 0;"><a href="mailto:${email}" style="color:#22b5b8;">${email}</a></td>
              </tr>
              ${subject?.trim() ? `<tr><td style="padding:10px 0;color:#D9B08C;font-size:0.75rem;letter-spacing:1px;text-transform:uppercase;vertical-align:top;">Subject</td><td style="padding:10px 0;color:#e8f4f2;">${subject.trim()}</td></tr>` : ""}
            </table>
            <div style="margin-top:24px;padding:24px;background:rgba(17,100,102,0.15);border-left:3px solid #116466;border-radius:4px;">
              <p style="color:#D9B08C;font-size:0.7rem;letter-spacing:1px;text-transform:uppercase;margin:0 0 12px;">Message</p>
              <p style="color:#e8f4f2;line-height:1.8;margin:0;white-space:pre-wrap;">${message.trim()}</p>
            </div>
            <div style="margin-top:32px;padding-top:20px;border-top:1px solid rgba(17,100,102,0.3);text-align:center;">
              <p style="color:rgba(209,232,226,0.3);font-size:0.65rem;margin:0;">Hit Reply to respond directly to ${name.trim()}</p>
            </div>
          </div>
        `,
      }),
    });

    const data = await res.json();
    console.log("Resend response status:", res.status);
    console.log("Resend response body:", JSON.stringify(data));

    if (!res.ok) {
      console.error("❌ Resend error:", data);
      return NextResponse.json(
        { error: data?.message || "Failed to send email." },
        { status: 500 }
      );
    }

    console.log("✅ Email sent! ID:", data?.id);
    return NextResponse.json({ success: true, id: data?.id });

  } catch (err) {
    console.error("❌ Unexpected error:", err);
    return NextResponse.json(
      { error: `Server error: ${err instanceof Error ? err.message : String(err)}` },
      { status: 500 }
    );
  }
}