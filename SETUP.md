# Saurabh Singh Yadav — Portfolio Setup Guide

## Quick Start

```bash
npm install
npm run dev
# Open http://localhost:3000
```

## ⚡ Enable Contact Form (3 minutes)

The contact form sends real emails using **Resend** (free — 3,000 emails/month).

### Step 1 — Get your free API key
1. Go to https://resend.com and sign up (free)
2. Click **API Keys** in the sidebar → **Create API Key**
3. Copy the key (starts with `re_...`)

### Step 2 — Add it to your project
Open `.env.local` and replace the placeholder:
```
RESEND_API_KEY=re_your_actual_key_here
```

### Step 3 — Done!
Run `npm run dev` and test the contact form.

---

## 🚀 Deploy to Vercel (Free hosting)

1. Push this folder to a GitHub repo
2. Go to https://vercel.com → **New Project** → import your repo
3. In **Environment Variables**, add:
   - Key: `RESEND_API_KEY`
   - Value: your Resend API key
4. Click **Deploy** — your site is live!

---

## 📁 Project Structure

```
portfolio/
├── app/
│   ├── page.tsx          # Main portfolio page (all sections)
│   ├── layout.tsx        # HTML shell + metadata
│   ├── globals.css       # Custom CSS variables & animations
│   └── api/
│       └── contact/
│           └── route.ts  # Contact form API (uses Resend)
├── .env.local            # Add your RESEND_API_KEY here
└── SETUP.md              # This file
```

## 🎨 Color Palette (Sirin Labs inspired)
| Variable | Hex | Usage |
|----------|-----|-------|
| `--dark` | `#0a0f0e` | Main background |
| `--teal` | `#116466` | Borders, buttons |
| `--teal3` | `#22b5b8` | Accent text, icons |
| `--sand` | `#D9B08C` | Headings, highlights |
| `--slate` | `#2C3531` | Stats bar background |

## ✏️ Customization
- **Your details**: Edit `app/page.tsx` — name, email, LinkedIn, projects
- **Your email**: In `app/api/contact/route.ts`, change the `to:` address
- **Colors**: Edit `:root` variables in `app/globals.css`
