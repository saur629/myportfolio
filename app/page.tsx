"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

/* ─── DATA ─────────────────────────────────────────────── */
const PROJECTS = [
  {
    num: "001",
    icon: "🏢",
    title: "MIS System",
    sub: "Management Information System",
    desc: "Full MIS for a real client — data entry, reporting dashboards, role-based access for multiple user types. End-to-end delivery from requirements to deployment.",
    tags: ["React", "Node.js", "MongoDB", "Express"],
    client: true,
  },
  {
    num: "002",
    icon: "✅",
    title: "Task Manager",
    sub: "Full-Stack Kanban Board",
    desc: "Kanban board with drag-and-drop tasks, JWT authentication, and MongoDB Atlas cloud database with real-time state management.",
    tags: ["React", "Node.js", "JWT", "Atlas"],
    client: false,
  },
  {
    num: "003",
    icon: "🧠",
    title: "ML Dashboard",
    sub: "Prediction Pipeline",
    desc: "End-to-end data pipeline with classification model at 85%+ accuracy. Results visualised with Matplotlib and Seaborn dashboards.",
    tags: ["Python", "Scikit-learn", "Pandas", "Seaborn"],
    client: false,
  },
  {
    num: "004",
    icon: "🎨",
    title: "Demo Website",
    sub: "Frontend Showcase",
    desc: "Responsive multi-page website as client demo, showcasing advanced UI/UX with smooth animations and pixel-perfect layouts.",
    tags: ["React", "HTML5", "CSS3", "Responsive"],
    client: false,
  },
];
const SKILLS = [
  { name: "Languages", tags: ["Python", "JavaScript ES6+", "C", "C++", "SQL"] },
  {
    name: "Frontend",
    tags: ["React.js", "Next.js", "HTML5", "CSS3", "Tailwind CSS"],
  },
  {
    name: "Backend",
    tags: ["Node.js", "Express.js", "REST APIs", "JWT Auth", "bcrypt"],
  },
  {
    name: "Database",
    tags: ["MongoDB", "Mongoose ODM", "MongoDB Atlas", "SQL", "Aggregation"],
  },
  {
    name: "Dev Tools",
    tags: ["Git", "GitHub", "Postman", "VS Code", "GitHub Copilot"],
  },
  {
    name: "ML & Cloud",
    tags: [
      "Scikit-learn",
      "Pandas",
      "Seaborn",
      "Matplotlib",
      "Cloud Computing",
    ],
  },
];
const RAYS = [
  { angle: 25, color: "rgba(217,176,140,.8)", delay: "0s" },
  { angle: -40, color: "rgba(34,181,184,.7)", delay: ".5s" },
  { angle: 80, color: "rgba(217,176,140,.6)", delay: "1s" },
  { angle: -110, color: "rgba(34,181,184,.5)", delay: "1.5s" },
  { angle: 150, color: "rgba(217,176,140,.7)", delay: "2s" },
  { angle: -170, color: "rgba(34,181,184,.6)", delay: "2.5s" },
];

/* ─── CONSTANTS ─────────────────────────────────────────── */
const raj = "'Rajdhani',sans-serif";
const mono = "'JetBrains Mono',monospace";
const muted = "rgba(209,232,226,.4)";

/* ─── HOOK: detect mobile ────────────────────────────────── */
function useIsMobile() {
  const [m, setM] = useState(false);
  useEffect(() => {
    const check = () => setM(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return m;
}

/* ─── PARTICLE CANVAS ────────────────────────────────────── */
function ParticleCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d")!;
    const resize = () => {
      cv.width = cv.parentElement!.offsetWidth;
      cv.height = cv.parentElement!.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    const pts = Array.from({ length: 150 }, () => ({
      x: Math.random(),
      y: Math.random(),
      s: Math.random() * 0.9 + 0.2,
      vx: (Math.random() - 0.5) * 0.00015,
      vy: (Math.random() - 0.5) * 0.00015,
      o: Math.random() * 0.5 + 0.1,
      teal: Math.random() < 0.2,
      sand: Math.random() < 0.08,
    }));
    const dust = Array.from({ length: 30 }, () => ({
      x: Math.random(),
      y: Math.random(),
      s: Math.random() * 0.6 + 0.2,
      vx: (Math.random() - 0.5) * 0.0005,
      vy: (Math.random() - 0.5) * 0.0005,
      o: Math.random() * 0.2 + 0.05,
    }));
    let hmx = 0.5,
      hmy = 0.5;
    const onMove = (e: MouseEvent) => {
      hmx = e.clientX / cv.width;
      hmy = e.clientY / cv.height;
    };
    window.addEventListener("mousemove", onMove);
    let id: number;
    const draw = () => {
      ctx.clearRect(0, 0, cv.width, cv.height);
      const bg = ctx.createRadialGradient(
        cv.width * 0.3,
        cv.height * 0.4,
        0,
        cv.width * 0.3,
        cv.height * 0.4,
        cv.height * 0.8,
      );
      bg.addColorStop(0, "rgba(17,100,102,.12)");
      bg.addColorStop(0.5, "rgba(10,15,14,.4)");
      bg.addColorStop(1, "rgba(10,15,14,.8)");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, cv.width, cv.height);
      const mg = ctx.createRadialGradient(
        hmx * cv.width,
        hmy * cv.height,
        0,
        hmx * cv.width,
        hmy * cv.height,
        300,
      );
      mg.addColorStop(0, "rgba(17,100,102,.06)");
      mg.addColorStop(1, "transparent");
      ctx.fillStyle = mg;
      ctx.fillRect(0, 0, cv.width, cv.height);
      pts.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = 1;
        if (p.x > 1) p.x = 0;
        if (p.y < 0) p.y = 1;
        if (p.y > 1) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x * cv.width, p.y * cv.height, p.s, 0, Math.PI * 2);
        ctx.fillStyle = p.sand
          ? `rgba(217,176,140,${p.o})`
          : p.teal
            ? `rgba(34,181,184,${p.o})`
            : `rgba(209,232,226,${p.o * 0.4})`;
        ctx.fill();
      });
      dust.forEach((d, i) => {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0) d.x = 1;
        if (d.x > 1) d.x = 0;
        if (d.y < 0) d.y = 1;
        if (d.y > 1) d.y = 0;
        dust.slice(i + 1).forEach((d2) => {
          const dx = (d.x - d2.x) * cv.width,
            dy = (d.y - d2.y) * cv.height,
            dist = Math.hypot(dx, dy);
          if (dist < 90) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(17,100,102,${0.08 * (1 - dist / 90)})`;
            ctx.lineWidth = 0.4;
            ctx.moveTo(d.x * cv.width, d.y * cv.height);
            ctx.lineTo(d2.x * cv.width, d2.y * cv.height);
            ctx.stroke();
          }
        });
      });
      id = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);
  return (
    <canvas ref={ref} style={{ position: "absolute", inset: 0, zIndex: 0 }} />
  );
}

/* ─── TILT CARD ──────────────────────────────────────────── */
function TiltCard({
  children,
  style = {},
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  return (
    <div
      ref={ref}
      style={{ ...style, transformStyle: "preserve-3d" }}
      onMouseMove={
        isMobile
          ? undefined
          : (e) => {
              const r = ref.current!.getBoundingClientRect(),
                x = (e.clientX - r.left - r.width / 2) / (r.width / 2),
                y = (e.clientY - r.top - r.height / 2) / (r.height / 2);
              ref.current!.style.transform = `perspective(900px) rotateY(${x * 8}deg) rotateX(${-y * 6}deg) translateZ(10px)`;
              ref.current!.style.transition = "transform .08s ease";
            }
      }
      onMouseLeave={
        isMobile
          ? undefined
          : () => {
              ref.current!.style.transition = "transform .6s ease";
              ref.current!.style.transform = "none";
            }
      }
    >
      {children}
    </div>
  );
}

/* ─── REVEAL ─────────────────────────────────────────────── */
function Reveal({
  children,
  style = {},
  id = "",
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  id?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const ob = new IntersectionObserver(
      (e) => {
        if (e[0].isIntersecting) setVis(true);
      },
      { threshold: 0.05 },
    );
    ob.observe(ref.current!);
    return () => ob.disconnect();
  }, []);
  return (
    <div
      id={id}
      ref={ref}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "none" : "translateY(28px)",
        transition: "opacity .8s ease,transform .8s ease",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ─── CONTACT FORM ───────────────────────────────────────── */
function ContactForm() {
  const isMobile = useIsMobile();
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errMsg, setErrMsg] = useState("");
  const inp: React.CSSProperties = {
    width: "100%",
    background: "rgba(17,100,102,.06)",
    border: "1px solid rgba(17,100,102,.25)",
    color: "#e8f4f2",
    padding: "14px 16px",
    fontSize: ".9rem",
    fontFamily: "'Space Grotesk',sans-serif",
    outline: "none",
    transition: "border-color .3s,background .3s",
    borderRadius: 0,
  };
  const onFocus = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    e.currentTarget.style.borderColor = "#22b5b8";
    e.currentTarget.style.background = "rgba(17,100,102,.12)";
  };
  const onBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    e.currentTarget.style.borderColor = "rgba(17,100,102,.25)";
    e.currentTarget.style.background = "rgba(17,100,102,.06)";
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrMsg(data.error || "Something went wrong.");
        setStatus("error");
        return;
      }
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setErrMsg("Network error. Please try again.");
      setStatus("error");
    }
  };
  if (status === "success")
    return (
      <div
        style={{
          background: "rgba(17,100,102,.1)",
          border: "1px solid rgba(34,181,184,.3)",
          padding: isMobile ? 28 : 48,
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: "2.5rem", marginBottom: 16 }}>✅</div>
        <h3
          style={{
            fontFamily: raj,
            fontSize: "1.5rem",
            fontWeight: 700,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: "#22b5b8",
            marginBottom: 10,
          }}
        >
          Message Sent!
        </h3>
        <p
          style={{
            color: "rgba(209,232,226,.5)",
            fontSize: ".85rem",
            lineHeight: 1.7,
            marginBottom: 24,
          }}
        >
          Thanks! I&apos;ll get back to you within 24 hours.
        </p>
        <button
          onClick={() => setStatus("idle")}
          style={{
            fontFamily: raj,
            fontWeight: 700,
            fontSize: ".75rem",
            letterSpacing: 3,
            textTransform: "uppercase",
            padding: "12px 28px",
            background: "#116466",
            color: "#0a0f0e",
            border: "none",
            cursor: "pointer",
          }}
        >
          Send Another ↗
        </button>
      </div>
    );
  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: 14 }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: 14,
        }}
      >
        <div>
          <label
            style={{
              fontFamily: mono,
              fontSize: ".5rem",
              letterSpacing: 2,
              color: "rgba(209,232,226,.4)",
              textTransform: "uppercase",
              display: "block",
              marginBottom: 7,
            }}
          >
            Your Name *
          </label>
          <input
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            required
            placeholder="John Doe"
            style={inp}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        </div>
        <div>
          <label
            style={{
              fontFamily: mono,
              fontSize: ".5rem",
              letterSpacing: 2,
              color: "rgba(209,232,226,.4)",
              textTransform: "uppercase",
              display: "block",
              marginBottom: 7,
            }}
          >
            Email Address *
          </label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
            required
            placeholder="john@company.com"
            style={inp}
            onFocus={onFocus}
            onBlur={onBlur}
          />
        </div>
      </div>
      <div>
        <label
          style={{
            fontFamily: mono,
            fontSize: ".5rem",
            letterSpacing: 2,
            color: "rgba(209,232,226,.4)",
            textTransform: "uppercase",
            display: "block",
            marginBottom: 7,
          }}
        >
          Subject
        </label>
        <input
          value={form.subject}
          onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
          placeholder="Project Inquiry / Hiring / Freelance"
          style={inp}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </div>
      <div>
        <label
          style={{
            fontFamily: mono,
            fontSize: ".5rem",
            letterSpacing: 2,
            color: "rgba(209,232,226,.4)",
            textTransform: "uppercase",
            display: "block",
            marginBottom: 7,
          }}
        >
          Message *
        </label>
        <textarea
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          required
          rows={5}
          placeholder="Tell me about your project..."
          style={{ ...inp, resize: "vertical", minHeight: 120 }}
          onFocus={onFocus}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "rgba(17,100,102,.25)";
            e.currentTarget.style.background = "rgba(17,100,102,.06)";
          }}
        />
      </div>
      {status === "error" && (
        <div
          style={{
            background: "rgba(244,63,94,.08)",
            border: "1px solid rgba(244,63,94,.25)",
            padding: "12px 16px",
            color: "#f87171",
            fontFamily: mono,
            fontSize: ".62rem",
          }}
        >
          ⚠ {errMsg}
        </div>
      )}
      <button
        type="submit"
        disabled={status === "loading"}
        style={{
          fontFamily: raj,
          fontWeight: 700,
          fontSize: ".85rem",
          letterSpacing: 4,
          textTransform: "uppercase",
          padding: "15px 36px",
          background: status === "loading" ? "rgba(17,100,102,.5)" : "#116466",
          color: "#0a0f0e",
          border: "none",
          cursor: status === "loading" ? "not-allowed" : "pointer",
          transition: "all .3s",
          display: "flex",
          alignItems: "center",
          gap: 10,
          opacity: status === "loading" ? 0.7 : 1,
          width: isMobile ? "100%" : "auto",
          justifyContent: "center",
        }}
        onMouseEnter={(e) => {
          if (status !== "loading") {
            e.currentTarget.style.background = "#22b5b8";
            e.currentTarget.style.boxShadow = "0 0 40px rgba(17,100,102,.5)";
          }
        }}
        onMouseLeave={(e) => {
          if (status !== "loading") {
            e.currentTarget.style.background = "#116466";
            e.currentTarget.style.boxShadow = "none";
          }
        }}
      >
        {status === "loading" ? (
          <>
            <span
              style={{
                display: "inline-block",
                width: 13,
                height: 13,
                border: "2px solid #0a0f0e",
                borderTopColor: "transparent",
                borderRadius: "50%",
                animation: "spin .7s linear infinite",
              }}
            />{" "}
            Sending...
          </>
        ) : (
          "Send Message ↗"
        )}
      </button>
      <p
        style={{
          fontFamily: mono,
          fontSize: ".48rem",
          letterSpacing: 1,
          color: "rgba(209,232,226,.2)",
        }}
      >
        * Delivered via Resend to saurabhyd2004@gmail.com
      </p>
    </form>
  );
}

/* ─── MAIN PAGE ──────────────────────────────────────────── */
export default function Home() {
  const isMobile = useIsMobile();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const ringRef = useRef({ x: 0, y: 0 });
  const [ring, setRing] = useState({ x: 0, y: 0 });
  const [bigCur, setBigCur] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const mv = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", mv);
    let id: number;
    const tr = () => {
      ringRef.current.x += (mouse.x - ringRef.current.x) * 0.09;
      ringRef.current.y += (mouse.y - ringRef.current.y) * 0.09;
      setRing({ ...ringRef.current });
      id = requestAnimationFrame(tr);
    };
    tr();
    return () => {
      window.removeEventListener("mousemove", mv);
      cancelAnimationFrame(id);
    };
  }, [mouse.x, mouse.y]);

  // lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, isMobile ? -40 : -100]);
  const heroOp = useTransform(scrollY, [0, 400], [1, 0]);

  const P = isMobile ? "20px" : "80px"; // section padding
  const secPad = isMobile ? "60px 20px" : "90px 80px";

  const tag = (t: string, i: number) => (
    <span
      key={i}
      style={{
        fontFamily: mono,
        fontSize: ".52rem",
        padding: "4px 12px",
        border: "1px solid rgba(17,100,102,.3)",
        color: "rgba(34,181,184,.7)",
        letterSpacing: 1,
        transition: "all .2s",
        cursor: "default",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "#22b5b8";
        e.currentTarget.style.color = "#22b5b8";
        e.currentTarget.style.background = "rgba(34,181,184,.07)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(17,100,102,.3)";
        e.currentTarget.style.color = "rgba(34,181,184,.7)";
        e.currentTarget.style.background = "transparent";
      }}
    >
      {t}
    </span>
  );

  const eyebrow = (label: string) => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        fontFamily: mono,
        fontSize: ".52rem",
        letterSpacing: 4,
        color: "#22b5b8",
        textTransform: "uppercase" as const,
        marginBottom: 12,
      }}
    >
      <span
        style={{
          width: 20,
          height: 1,
          background: "#116466",
          display: "block",
        }}
      />
      {label}
    </div>
  );

  const secTitle = (a: string, b: string) => (
    <h2
      style={{
        fontFamily: raj,
        fontSize: isMobile
          ? "clamp(1.8rem,8vw,2.4rem)"
          : "clamp(2.2rem,4vw,3.5rem)",
        fontWeight: 700,
        letterSpacing: 2,
        textTransform: "uppercase" as const,
        lineHeight: 1.05,
        marginBottom: isMobile ? 36 : 56,
      }}
    >
      {a} <em style={{ fontStyle: "normal", color: "#D9B08C" }}>{b}</em>
    </h2>
  );

  const navLinks = ["experience", "projects", "skills", "contact"];

  return (
    <main
      style={{ background: "#0a0f0e", minHeight: "100vh", overflowX: "hidden" }}
    >
      {/* ── Custom cursor (desktop only) ── */}
      {!isMobile && (
        <>
          <div
            style={{
              position: "fixed",
              width: 6,
              height: 6,
              background: "#22b5b8",
              borderRadius: "50%",
              pointerEvents: "none",
              zIndex: 9999,
              left: mouse.x,
              top: mouse.y,
              transform: "translate(-50%,-50%)",
            }}
          />
          <div
            style={{
              position: "fixed",
              width: bigCur ? 52 : 30,
              height: bigCur ? 52 : 30,
              border: `1px solid rgba(34,181,184,${bigCur ? 0.8 : 0.4})`,
              borderRadius: "50%",
              pointerEvents: "none",
              zIndex: 9998,
              left: ring.x,
              top: ring.y,
              transform: "translate(-50%,-50%)",
              transition: "left .12s,top .12s,width .25s,height .25s",
            }}
          />
        </>
      )}

      {/* ── Mobile Menu Overlay ── */}
      {menuOpen && (
        <div className="mobile-menu" style={{ zIndex: 300 }}>
          <button
            onClick={() => setMenuOpen(false)}
            style={{
              position: "absolute",
              top: 20,
              right: 20,
              background: "none",
              border: "none",
              color: "#22b5b8",
              fontSize: "1.8rem",
              cursor: "pointer",
              lineHeight: 1,
            }}
          >
            ✕
          </button>
          {navLinks.map((s) => (
            <a
              key={s}
              href={`#${s}`}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily: raj,
                fontSize: "2rem",
                fontWeight: 700,
                letterSpacing: 4,
                textTransform: "uppercase",
                textDecoration: "none",
                color: "#e8f4f2",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#22b5b8")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#e8f4f2")}
            >
              {s}
            </a>
          ))}
          <a
            href="mailto:saurabhyd2004@gmail.com"
            onClick={() => setMenuOpen(false)}
            style={{
              fontFamily: raj,
              fontSize: "1rem",
              fontWeight: 700,
              letterSpacing: 3,
              textTransform: "uppercase",
              padding: "12px 32px",
              border: "1px solid #116466",
              color: "#22b5b8",
              textDecoration: "none",
              marginTop: 8,
            }}
          >
            Hire Me
          </a>
        </div>
      )}

      {/* ── NAV ── */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 200,
          height: 64,
          padding: `0 ${P}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "rgba(10,15,14,.92)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(17,100,102,.15)",
        }}
      >
        <a
          href="#hero"
          style={{
            fontFamily: raj,
            fontSize: "1.05rem",
            fontWeight: 700,
            color: "#22b5b8",
            letterSpacing: 4,
            textDecoration: "none",
            textTransform: "uppercase",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
          onMouseEnter={() => setBigCur(true)}
          onMouseLeave={() => setBigCur(false)}
        >
          <span style={{ color: "#D9B08C", fontSize: ".8rem" }}>▦</span> SAURABH
        </a>
        {isMobile ? (
          <button
            onClick={() => setMenuOpen(true)}
            style={{
              background: "none",
              border: "none",
              color: "#22b5b8",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              gap: 5,
              padding: 8,
            }}
          >
            <span
              style={{
                display: "block",
                width: 22,
                height: 1.5,
                background: "#22b5b8",
              }}
            />
            <span
              style={{
                display: "block",
                width: 16,
                height: 1.5,
                background: "#22b5b8",
              }}
            />
            <span
              style={{
                display: "block",
                width: 22,
                height: 1.5,
                background: "#22b5b8",
              }}
            />
          </button>
        ) : (
          <div style={{ display: "flex", gap: 36, alignItems: "center" }}>
            {navLinks.map((s) => (
              <a
                key={s}
                href={`#${s}`}
                style={{
                  fontFamily: mono,
                  fontSize: ".6rem",
                  letterSpacing: 3,
                  color: muted,
                  textTransform: "uppercase",
                  textDecoration: "none",
                  transition: "color .3s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#22b5b8";
                  setBigCur(true);
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = muted;
                  setBigCur(false);
                }}
              >
                {s}
              </a>
            ))}
            <a
              href="mailto:saurabhyd2004@gmail.com"
              style={{
                fontFamily: raj,
                fontSize: ".78rem",
                letterSpacing: 2,
                fontWeight: 600,
                padding: "8px 22px",
                border: "1px solid #116466",
                color: "#22b5b8",
                textDecoration: "none",
                textTransform: "uppercase",
                transition: "all .3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#116466";
                e.currentTarget.style.color = "#0a0f0e";
                setBigCur(true);
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "#22b5b8";
                setBigCur(false);
              }}
            >
              Hire Me
            </a>
          </div>
        )}
      </nav>

      {/* ══ HERO ══════════════════════════════════════════ */}
      <section
        id="hero"
        style={{
          minHeight: "100vh",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          paddingTop: 64,
        }}
      >
        <ParticleCanvas />

        {/* Sphere — hidden on mobile */}
        {!isMobile && (
          <div
            style={{
              position: "absolute",
              right: "4%",
              top: "50%",
              transform: "translateY(-50%)",
              width: 480,
              height: 480,
              zIndex: 1,
              pointerEvents: "none",
            }}
          >
            <div
              className="anim-glow"
              style={{
                position: "absolute",
                inset: -40,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle at 60% 40%,rgba(217,176,140,.25) 0%,rgba(17,100,102,.3) 40%,transparent 70%)",
              }}
            />
            {[
              { s: 140, c: "rgba(34,181,184,.3)", d: "0s" },
              { s: 250, c: "rgba(217,176,140,.12)", d: ".8s" },
              { s: 360, c: "rgba(34,181,184,.15)", d: "1.6s" },
              { s: 470, c: "rgba(17,100,102,.06)", d: ".4s" },
            ].map((r, i) => (
              <div
                key={i}
                className="anim-ring"
                style={{
                  position: "absolute",
                  width: r.s,
                  height: r.s,
                  borderRadius: "50%",
                  border: `1px solid ${r.c}`,
                  top: "50%",
                  left: "50%",
                  animationDelay: r.d,
                }}
              />
            ))}
            {RAYS.map((r, i) => (
              <div
                key={i}
                className="anim-ray"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  height: 2,
                  transformOrigin: "left center",
                  transform: `rotate(${r.angle}deg) translateY(-50%)`,
                  background: `linear-gradient(90deg,${r.color},transparent)`,
                  animationDelay: r.delay,
                }}
              />
            ))}
            <svg
              className="anim-sphere"
              viewBox="0 0 500 500"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
              }}
            >
              <circle
                cx="250"
                cy="250"
                r="180"
                fill="none"
                stroke="rgba(34,181,184,.25)"
                strokeWidth=".5"
              />
              <circle
                cx="250"
                cy="250"
                r="120"
                fill="none"
                stroke="rgba(217,176,140,.2)"
                strokeWidth=".5"
              />
              <circle
                cx="250"
                cy="250"
                r="60"
                fill="none"
                stroke="rgba(34,181,184,.1)"
                strokeWidth=".5"
              />
              <line
                x1="70"
                y1="250"
                x2="430"
                y2="250"
                stroke="rgba(34,181,184,.12)"
                strokeWidth=".5"
              />
              <line
                x1="250"
                y1="70"
                x2="250"
                y2="430"
                stroke="rgba(34,181,184,.12)"
                strokeWidth=".5"
              />
              <polygon
                points="250,70 377,377 123,377"
                fill="none"
                stroke="rgba(34,181,184,.18)"
                strokeWidth=".8"
              />
              <polygon
                points="250,430 123,123 377,123"
                fill="none"
                stroke="rgba(217,176,140,.12)"
                strokeWidth=".8"
              />
              <circle cx="250" cy="250" r="8" fill="rgba(217,176,140,.9)" />
              <circle cx="250" cy="250" r="16" fill="rgba(217,176,140,.15)" />
              <circle cx="250" cy="70" r="3" fill="rgba(34,181,184,.7)" />
              <circle cx="250" cy="430" r="3" fill="rgba(34,181,184,.7)" />
              <circle cx="70" cy="250" r="3" fill="rgba(34,181,184,.5)" />
              <circle cx="430" cy="250" r="3" fill="rgba(34,181,184,.5)" />
            </svg>
          </div>
        )}

        {/* Mini sphere for mobile (top right corner) */}
        {isMobile && (
          <div
            style={{
              position: "absolute",
              top: 80,
              right: -60,
              width: 200,
              height: 200,
              zIndex: 1,
              pointerEvents: "none",
              opacity: 0.4,
            }}
          >
            <div
              className="anim-glow"
              style={{
                position: "absolute",
                inset: -20,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle,rgba(17,100,102,.3),transparent 70%)",
              }}
            />
            {[
              { s: 80, c: "rgba(34,181,184,.3)", d: "0s" },
              { s: 140, c: "rgba(217,176,140,.1)", d: "1s" },
            ].map((r, i) => (
              <div
                key={i}
                className="anim-ring"
                style={{
                  position: "absolute",
                  width: r.s,
                  height: r.s,
                  borderRadius: "50%",
                  border: `1px solid ${r.c}`,
                  top: "50%",
                  left: "50%",
                  animationDelay: r.d,
                }}
              />
            ))}
            {RAYS.slice(0, 3).map((r, i) => (
              <div
                key={i}
                className="anim-ray"
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  height: 1.5,
                  transformOrigin: "left center",
                  transform: `rotate(${r.angle}deg) translateY(-50%)`,
                  background: `linear-gradient(90deg,${r.color},transparent)`,
                  animationDelay: r.delay,
                }}
              />
            ))}
          </div>
        )}

        {/* Hero text */}
        <motion.div
          style={{
            y: heroY,
            opacity: heroOp,
            position: "relative",
            zIndex: 2,
            padding: `0 ${P}`,
            maxWidth: isMobile ? "100%" : 620,
            width: "100%",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{
              fontFamily: mono,
              fontSize: ".6rem",
              letterSpacing: 4,
              color: "rgba(209,232,226,.4)",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            Welcome
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            style={{
              fontFamily: raj,
              fontSize: isMobile
                ? "clamp(2.8rem,12vw,4rem)"
                : "clamp(3rem,7vw,6rem)",
              fontWeight: 700,
              lineHeight: 0.95,
              letterSpacing: isMobile ? 2 : 4,
              textTransform: "uppercase",
              marginBottom: 20,
            }}
          >
            <span
              style={{
                display: "block",
                color: "#22b5b8",
                fontWeight: 300,
                fontSize: "55%",
                marginBottom: 4,
              }}
            >
              Saurabh Singh
            </span>
            <span style={{ display: "block", color: "#e8f4f2" }}>YADAV</span>
            <span
              style={{
                display: "block",
                color: "#D9B08C",
                fontWeight: 300,
                fontSize: "70%",
                marginTop: 4,
              }}
            >
              
            </span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            style={{
              fontFamily: mono,
              fontSize: isMobile ? ".72rem" : ".85rem",
              color: "#22b5b8",
              marginBottom: 14,
              minHeight: 24,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span style={{ color: "rgba(209,232,226,.25)" }}>›</span>
            <TypeAnimation
              sequence={[
                "Full Stack Developer",
                2000,
                "MERN Stack Engineer",
                2000,
                "REST API Architect",
                2000,
                "React.js Developer",
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
            <span className="anim-blink">_</span>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            style={{
              color: "rgba(209,232,226,.45)",
              fontSize: isMobile ? ".85rem" : ".95rem",
              lineHeight: 1.8,
              marginBottom: 32,
              fontWeight: 300,
              maxWidth: 420,
            }}
          >
            Building{" "}
            <span style={{ color: "#FFCB9A", fontWeight: 500 }}>
              production-grade
            </span>{" "}
            MERN systems with real clients, real impact. B.Tech 2026 · Lucknow,
            India.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            style={{ display: "flex", gap: 12, flexWrap: "wrap" }}
          >
            <a
              href="#projects"
              style={{
                fontFamily: raj,
                fontWeight: 700,
                fontSize: ".82rem",
                letterSpacing: 3,
                textTransform: "uppercase",
                padding: isMobile ? "13px 28px" : "14px 36px",
                background: "#116466",
                color: "#0a0f0e",
                textDecoration: "none",
                transition: "all .35s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#22b5b8";
                e.currentTarget.style.boxShadow =
                  "0 0 40px rgba(17,100,102,.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#116466";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Discover
            </a>
            <a
              href="#contact"
              style={{
                fontFamily: raj,
                fontWeight: 600,
                fontSize: ".82rem",
                letterSpacing: 3,
                textTransform: "uppercase",
                padding: isMobile ? "13px 28px" : "14px 36px",
                border: "1px solid rgba(34,181,184,.3)",
                color: "#22b5b8",
                textDecoration: "none",
                transition: "all .35s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#22b5b8";
                e.currentTarget.style.background = "rgba(34,181,184,.07)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(34,181,184,.3)";
                e.currentTarget.style.background = "transparent";
              }}
            >
              Contact
            </a>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginTop: isMobile ? 32 : 0,
              position: isMobile ? "relative" : "absolute",
              bottom: isMobile ? 0 : 40,
              left: isMobile ? 0 : P,
            }}
          >
            <span
              className="anim-blink"
              style={{
                width: 7,
                height: 7,
                background: "#4ade80",
                borderRadius: "50%",
                display: "block",
                boxShadow: "0 0 10px #4ade80",
              }}
            />
            <span
              style={{
                fontFamily: mono,
                fontSize: ".55rem",
                letterSpacing: 3,
                color: "rgba(209,232,226,.35)",
                textTransform: "uppercase",
              }}
            >
              Available for opportunities
            </span>
          </motion.div>
        </motion.div>
      </section>

      {/* ══ STATS ════════════════════════════════════════════ */}
      <Reveal
        style={{
          background: "#2C3531",
          borderTop: "1px solid rgba(17,100,102,.2)",
          borderBottom: "1px solid rgba(17,100,102,.2)",
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4,1fr)",
        }}
      >
        {[
          ["8+", "Months Exp"],
          ["30+", "API Tests"],
          ["85%", "ML Accuracy"],
          ["8.0+", "CGPA"],
        ].map(([n, l], i) => (
          <div
            key={l}
            style={{
              padding: isMobile ? "20px 12px" : "28px 24px",
              textAlign: "center",
              position: "relative",
              borderBottom:
                isMobile && i < 2 ? "1px solid rgba(17,100,102,.2)" : "none",
            }}
          >
            {!isMobile && i > 0 && (
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: "25%",
                  bottom: "25%",
                  width: 1,
                  background: "rgba(17,100,102,.2)",
                }}
              />
            )}
            {isMobile && (i === 1 || i === 3) && (
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: "20%",
                  bottom: "20%",
                  width: 1,
                  background: "rgba(17,100,102,.2)",
                }}
              />
            )}
            <span
              style={{
                display: "block",
                fontFamily: raj,
                fontSize: isMobile ? "1.8rem" : "2.4rem",
                fontWeight: 700,
                color: "#D9B08C",
                lineHeight: 1,
              }}
            >
              {n}
            </span>
            <span
              style={{
                fontFamily: mono,
                fontSize: ".48rem",
                letterSpacing: 2,
                color: muted,
                textTransform: "uppercase",
                marginTop: 6,
                display: "block",
              }}
            >
              {l}
            </span>
          </div>
        ))}
      </Reveal>

      {/* ══ EXPERIENCE ═══════════════════════════════════════ */}
      <div style={{ background: "#0a0f0e" }}>
        <Reveal
          id="experience"
          style={{ maxWidth: 1100, margin: "0 auto", padding: secPad }}
        >
          {eyebrow("01 — Career")}
          {secTitle("Professional", "Experience")}
          <TiltCard
            style={{
              background: "#111c1b",
              border: "1px solid rgba(17,100,102,.2)",
              padding: isMobile ? 24 : 44,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 1,
                background:
                  "linear-gradient(90deg,transparent,#116466,#D9B08C,transparent)",
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 12,
                marginBottom: 24,
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: raj,
                    fontSize: isMobile ? "1.3rem" : "1.8rem",
                    fontWeight: 700,
                    letterSpacing: 2,
                    textTransform: "uppercase",
                    marginBottom: 6,
                  }}
                >
                  Full Stack Developer Intern
                </div>
                <div
                  style={{
                    color: "#22b5b8",
                    fontSize: ".88rem",
                    letterSpacing: 1,
                  }}
                >
                  Zonvoir Technologies Pvt. Ltd.
                </div>
                <div
                  style={{
                    fontFamily: mono,
                    fontSize: ".58rem",
                    color: muted,
                    marginTop: 5,
                    letterSpacing: 1,
                  }}
                >
                  📍 Lucknow, Uttar Pradesh · India
                </div>
              </div>
              <span
                style={{
                  fontFamily: raj,
                  fontSize: ".7rem",
                  letterSpacing: 2,
                  padding: "7px 16px",
                  border: "1px solid rgba(217,176,140,.25)",
                  color: "#D9B08C",
                  textTransform: "uppercase",
                  alignSelf: "flex-start",
                  whiteSpace: "nowrap",
                }}
              >
                Jan 2024 — Present
              </span>
            </div>
            <ul style={{ listStyle: "none", marginBottom: 24 }}>
              {[
                "Developed MERN stack web apps; built RESTful APIs with Express.js consumed by React.js frontend",
                "Implemented JWT authentication with bcrypt hashing, protected routes, and role-based access control",
                "Modelled MongoDB collections with Mongoose; wrote aggregation pipelines for analytics dashboards",
                "Participated in daily stand-ups, sprint planning, and code reviews in Agile Scrum environment",
                "Wrote 30+ Postman test cases to validate API behaviour across dev and staging environments",
              ].map((item, i) => (
                <li
                  key={i}
                  style={{
                    padding: "10px 0",
                    borderBottom: "1px solid rgba(209,232,226,.04)",
                    color: "rgba(209,232,226,.5)",
                    fontSize: isMobile ? ".82rem" : ".9rem",
                    lineHeight: 1.7,
                    display: "flex",
                    gap: 12,
                    fontWeight: 300,
                  }}
                >
                  <span
                    style={{
                      color: "#22b5b8",
                      flexShrink: 0,
                      fontSize: "1rem",
                      lineHeight: 1.55,
                    }}
                  >
                    ›
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
              {[
                "MERN Stack",
                "REST APIs",
                "JWT Auth",
                "MongoDB",
                "Express.js",
                "React.js",
                "Agile",
                "Postman",
                "bcrypt",
              ].map((t, i) => tag(t, i))}
            </div>
          </TiltCard>
        </Reveal>
      </div>

      {/* ══ PROJECTS ══════════════════════════════════════════ */}
      <div style={{ background: "#0d1514" }}>
        <Reveal
          id="projects"
          style={{ maxWidth: 1100, margin: "0 auto", padding: secPad }}
        >
          {eyebrow("02 — Portfolio")}
          {secTitle("Selected", "Projects")}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: 1,
              background: "rgba(17,100,102,.12)",
            }}
          >
            {PROJECTS.map((p, i) => (
              <TiltCard
                key={p.num}
                style={{
                  background: "#0d1514",
                  padding: isMobile ? 24 : 40,
                  position: "relative",
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "background .35s",
                  minHeight: isMobile ? 0 : 280,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 1,
                    background:
                      "linear-gradient(90deg,transparent,rgba(17,100,102,.5),transparent)",
                  }}
                />
                {p.client && (
                  <span
                    style={{
                      position: "absolute",
                      top: 16,
                      right: 16,
                      fontFamily: mono,
                      fontSize: ".48rem",
                      letterSpacing: 2,
                      padding: "4px 10px",
                      background: "rgba(217,176,140,.08)",
                      border: "1px solid rgba(217,176,140,.2)",
                      color: "#D9B08C",
                    }}
                  >
                    ★ CLIENT
                  </span>
                )}
                <span
                  style={{
                    fontFamily: mono,
                    fontSize: ".48rem",
                    letterSpacing: 3,
                    color: "rgba(17,100,102,.6)",
                    marginBottom: 16,
                    display: "block",
                  }}
                >
                  {p.num}
                </span>
                <span
                  style={{
                    fontSize: "1.8rem",
                    display: "block",
                    marginBottom: 12,
                    filter: "drop-shadow(0 0 8px rgba(217,176,140,.4))",
                  }}
                >
                  {p.icon}
                </span>
                <div
                  style={{
                    fontFamily: raj,
                    fontSize: isMobile ? "1.2rem" : "1.5rem",
                    fontWeight: 700,
                    letterSpacing: 2,
                    textTransform: "uppercase",
                    marginBottom: 4,
                  }}
                >
                  {p.title}
                </div>
                <div
                  style={{
                    fontFamily: mono,
                    fontSize: ".52rem",
                    letterSpacing: 2,
                    color: "#22b5b8",
                    textTransform: "uppercase",
                    marginBottom: 12,
                  }}
                >
                  {p.sub}
                </div>
                <div
                  style={{
                    color: "rgba(209,232,226,.4)",
                    fontSize: ".85rem",
                    lineHeight: 1.75,
                    marginBottom: 20,
                    fontWeight: 300,
                  }}
                >
                  {p.desc}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                  {p.tags.map((t, i) => tag(t, i))}
                </div>
                <div
                  style={{
                    position: "absolute",
                    bottom: 20,
                    right: 20,
                    width: 24,
                    height: 24,
                    border: "1px solid rgba(34,181,184,.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#22b5b8",
                    fontSize: ".7rem",
                    opacity: 0.5,
                  }}
                >
                  ↗
                </div>
              </TiltCard>
            ))}
          </div>
        </Reveal>
      </div>

      {/* ══ SKILLS ════════════════════════════════════════════ */}
      <div style={{ background: "#0a0f0e" }}>
        <Reveal
          id="skills"
          style={{ maxWidth: 1100, margin: "0 auto", padding: secPad }}
        >
          {eyebrow("03 — Toolkit")}
          {secTitle("Skills &", "Technologies")}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)",
              gap: 1,
              background: "rgba(17,100,102,.1)",
            }}
          >
            {SKILLS.map((s) => (
              <div
                key={s.name}
                style={{
                  background: "#0d1514",
                  padding: isMobile ? "22px 20px" : "28px 32px",
                  transition: "background .3s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#111c1b")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "#0d1514")
                }
              >
                <div
                  style={{
                    fontFamily: raj,
                    fontSize: ".95rem",
                    fontWeight: 700,
                    letterSpacing: 2,
                    textTransform: "uppercase",
                    color: "#22b5b8",
                    marginBottom: 14,
                    paddingBottom: 12,
                    borderBottom: "1px solid rgba(17,100,102,.2)",
                  }}
                >
                  {s.name}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {s.tags.map((t, j) => (
                    <span
                      key={j}
                      style={{
                        fontFamily: mono,
                        fontSize: ".48rem",
                        padding: "4px 10px",
                        background: "rgba(209,232,226,.03)",
                        border: "1px solid rgba(209,232,226,.07)",
                        color: "rgba(209,232,226,.45)",
                        letterSpacing: 0.5,
                        transition: "all .2s",
                        cursor: "default",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background =
                          "rgba(17,100,102,.15)";
                        e.currentTarget.style.borderColor =
                          "rgba(17,100,102,.4)";
                        e.currentTarget.style.color = "#22b5b8";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background =
                          "rgba(209,232,226,.03)";
                        e.currentTarget.style.borderColor =
                          "rgba(209,232,226,.07)";
                        e.currentTarget.style.color = "rgba(209,232,226,.45)";
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* ══ EDUCATION ════════════════════════════════════════ */}
      <div style={{ background: "#0d1514" }}>
        <Reveal
          id="education"
          style={{ maxWidth: 1100, margin: "0 auto", padding: secPad }}
        >
          {eyebrow("04 — Background")}
          {secTitle("Education &", "Certifications")}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              gap: isMobile ? 24 : 32,
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: mono,
                  fontSize: ".52rem",
                  letterSpacing: 3,
                  color: "#22b5b8",
                  textTransform: "uppercase",
                  marginBottom: 16,
                }}
              >
                Education
              </div>
              {[
                {
                  d: "B.Tech — Cloud Computing & ML",
                  s: "BBD University, Lucknow",
                  y: "2022 – 2026",
                  n: "CGPA: 8.0+",
                },
                {
                  d: "Intermediate (PCM)",
                  s: "D.A.V. Public School, Ayodhya",
                  y: "2022",
                  n: "Physics · Chemistry · Maths",
                },
                {
                  d: "High School",
                  s: "D.A.V. Public School, Ayodhya",
                  y: "2020",
                  n: "",
                },
              ].map((e, i) => (
                <div
                  key={i}
                  style={{
                    background: "#111c1b",
                    border: "1px solid rgba(17,100,102,.15)",
                    padding: "18px 20px",
                    marginBottom: 8,
                    display: "flex",
                    gap: 14,
                    alignItems: "flex-start",
                    transition: "all .3s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(34,181,184,.3)";
                    e.currentTarget.style.transform = "translateX(4px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(17,100,102,.15)";
                    e.currentTarget.style.transform = "none";
                  }}
                >
                  <div
                    style={{
                      width: 7,
                      height: 7,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg,#116466,#22b5b8)",
                      flexShrink: 0,
                      marginTop: 5,
                      boxShadow: "0 0 8px rgba(34,181,184,.5)",
                    }}
                  />
                  <div>
                    <div
                      style={{
                        fontFamily: raj,
                        fontWeight: 600,
                        fontSize: ".92rem",
                        letterSpacing: 1,
                        textTransform: "uppercase",
                        marginBottom: 3,
                      }}
                    >
                      {e.d}
                    </div>
                    <div
                      style={{
                        color: "#22b5b8",
                        fontSize: ".78rem",
                        marginBottom: 3,
                      }}
                    >
                      {e.s}
                    </div>
                    <div
                      style={{
                        fontFamily: mono,
                        fontSize: ".52rem",
                        color: muted,
                      }}
                    >
                      {e.y}
                      {e.n ? " · " + e.n : ""}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div>
              <div
                style={{
                  fontFamily: mono,
                  fontSize: ".52rem",
                  letterSpacing: 3,
                  color: "#22b5b8",
                  textTransform: "uppercase",
                  marginBottom: 16,
                }}
              >
                Certifications
              </div>
              {[
                { n: "HTML & CSS Bootcamp", o: "Lets Upgrade", i: "🏅" },
                { n: "NoSQL and DBaaS 101", o: "IBM", i: "🏅" },
                { n: "Introduction to Python", o: "IBM", i: "🏅" },
                {
                  n: "GATE Prep — 7 Subjects (DSA in C)",
                  o: "Self Study",
                  i: "🎯",
                },
              ].map((c, i) => (
                <div
                  key={i}
                  style={{
                    background: "#111c1b",
                    border: "1px solid rgba(17,100,102,.15)",
                    padding: "16px 20px",
                    marginBottom: 8,
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    transition: "all .3s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(34,181,184,.3)";
                    e.currentTarget.style.transform = "translateX(4px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(17,100,102,.15)";
                    e.currentTarget.style.transform = "none";
                  }}
                >
                  <span style={{ fontSize: "1.2rem" }}>{c.i}</span>
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        fontFamily: raj,
                        fontWeight: 600,
                        letterSpacing: 1,
                        textTransform: "uppercase",
                        fontSize: ".85rem",
                        marginBottom: 2,
                      }}
                    >
                      {c.n}
                    </div>
                    <div
                      style={{
                        fontFamily: mono,
                        fontSize: ".52rem",
                        color: muted,
                      }}
                    >
                      {c.o}
                    </div>
                  </div>
                  <span style={{ color: "#D9B08C", fontSize: ".7rem" }}>✓</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      {/* ══ CONTACT ══════════════════════════════════════════ */}
      <div style={{ background: "#111c1b" }} id="contact">
        <Reveal style={{ maxWidth: 1100, margin: "0 auto", padding: secPad }}>
          {eyebrow("05 — Connect")}
          <h2
            style={{
              fontFamily: raj,
              fontSize: isMobile
                ? "clamp(2rem,10vw,3rem)"
                : "clamp(2.5rem,5vw,4.5rem)",
              fontWeight: 700,
              letterSpacing: 4,
              textTransform: "uppercase",
              lineHeight: 0.95,
              marginBottom: isMobile ? 36 : 60,
            }}
          >
            <span style={{ color: "#22b5b8" }}>LET&apos;S</span> WORK{" "}
            <span style={{ color: "#D9B08C" }}>TOGETHER</span>
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1.5fr",
              gap: isMobile ? 40 : 64,
              alignItems: "start",
            }}
          >
            <div>
              <p
                style={{
                  color: "rgba(209,232,226,.45)",
                  fontSize: ".92rem",
                  fontWeight: 300,
                  lineHeight: 1.85,
                  marginBottom: 28,
                }}
              >
                Looking for a dedicated Full Stack Developer with real MERN
                production experience? Drop a message — I reply within 24 hours.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {[
                  {
                    icon: "✉️",
                    label: "Email",
                    val: "saurabhyd2004@gmail.com",
                    href: "mailto:saurabhyd2004@gmail.com",
                  },
                  {
                    icon: "📱",
                    label: "Phone",
                    val: "+91 86047 17263",
                    href: "tel:+918604717263",
                  },
                  {
                    icon: "💼",
                    label: "LinkedIn",
                    val: "saurabh-yadav-b06094252",
                    href: "https://linkedin.com/in/saurabh-yadav-b06094252",
                  },
                  {
                    icon: "📍",
                    label: "Location",
                    val: "Lucknow, U.P., India",
                    href: "",
                  },
                ].map((c, i) =>
                  c.href ? (
                    <a
                      key={i}
                      href={c.href}
                      target={c.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 14,
                        padding: "14px 18px",
                        background: "rgba(17,100,102,.08)",
                        border: "1px solid rgba(17,100,102,.2)",
                        textDecoration: "none",
                        transition: "all .3s",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "#22b5b8";
                        e.currentTarget.style.background =
                          "rgba(17,100,102,.18)";
                        e.currentTarget.style.transform = "translateX(4px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor =
                          "rgba(17,100,102,.2)";
                        e.currentTarget.style.background =
                          "rgba(17,100,102,.08)";
                        e.currentTarget.style.transform = "none";
                      }}
                    >
                      <span
                        style={{
                          fontSize: "1rem",
                          width: 28,
                          textAlign: "center",
                          flexShrink: 0,
                        }}
                      >
                        {c.icon}
                      </span>
                      <div>
                        <div
                          style={{
                            fontFamily: mono,
                            fontSize: ".48rem",
                            letterSpacing: 2,
                            color: "rgba(209,232,226,.3)",
                            textTransform: "uppercase",
                            marginBottom: 3,
                          }}
                        >
                          {c.label}
                        </div>
                        <div
                          style={{
                            color: "#e8f4f2",
                            fontSize: ".8rem",
                            fontWeight: 500,
                          }}
                        >
                          {c.val}
                        </div>
                      </div>
                    </a>
                  ) : (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 14,
                        padding: "14px 18px",
                        background: "rgba(17,100,102,.08)",
                        border: "1px solid rgba(17,100,102,.2)",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "1rem",
                          width: 28,
                          textAlign: "center",
                          flexShrink: 0,
                        }}
                      >
                        {c.icon}
                      </span>
                      <div>
                        <div
                          style={{
                            fontFamily: mono,
                            fontSize: ".48rem",
                            letterSpacing: 2,
                            color: "rgba(209,232,226,.3)",
                            textTransform: "uppercase",
                            marginBottom: 3,
                          }}
                        >
                          {c.label}
                        </div>
                        <div
                          style={{
                            color: "#e8f4f2",
                            fontSize: ".8rem",
                            fontWeight: 500,
                          }}
                        >
                          {c.val}
                        </div>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>
            <ContactForm />
          </div>
        </Reveal>
      </div>

      {/* ══ FOOTER ═══════════════════════════════════════════ */}
      <footer
        style={{
          padding: isMobile ? "20px" : "24px 80px",
          borderTop: "1px solid rgba(17,100,102,.1)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: "#0a0f0e",
          flexWrap: "wrap",
          gap: 10,
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontFamily: mono,
            fontSize: ".48rem",
            letterSpacing: 2,
            color: "rgba(209,232,226,.2)",
            textTransform: "uppercase",
            width: isMobile ? "100%" : "auto",
          }}
        >
          © 2025 <span style={{ color: "#22b5b8" }}>Saurabh Singh Yadav</span>
        </span>
  
        <span
          style={{
            fontFamily: mono,
            fontSize: ".48rem",
            letterSpacing: 2,
            color: "rgba(209,232,226,.2)",
            textTransform: "uppercase",
            width: isMobile ? "100%" : "auto",
          }}
        >
          Lucknow, <span style={{ color: "#22b5b8" }}>India</span>
        </span>
      </footer>
    </main>
  );
}
