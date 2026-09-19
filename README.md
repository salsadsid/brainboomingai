# Brain Booming AI

[![CI](https://github.com/salsadsid/brainboomingai/actions/workflows/ci.yml/badge.svg)](https://github.com/salsadsid/brainboomingai/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

Free AI writing tools — grammar checker, paraphraser, summarizer and more — built with Next.js 15 and Google Gemini. No signup, and anonymous visitors' text is never stored.

**Live demo: [brainboomingai.vercel.app](https://brainboomingai.vercel.app)**

## Tools

**AI Tools** (powered by Google Gemini)
- **AI to Human Converter** — Rewrite AI-generated text to sound natural
- **Grammar Checker** — Fix grammar errors in your writing
- **Spell Checker** — Detect and correct spelling mistakes
- **Paraphrasing Tool** — Rephrase text while keeping its meaning
- **Text Summarizer** — Condense long content into summaries
- **Originality Analyzer** — Check text for originality
- **Prompt Generator** — Generate detailed AI prompts from descriptions
- **Image to Text** — Extract text from images (OCR via Tesseract.js)

**Utility Tools**
- **MD5 Generator** — Generate MD5 hashes
- **Image Resizer** — Resize images by dimension
- **Image Compressor** — Reduce image file size

All tools work without login. Signed-in users get a personal dashboard with a history of what they have run.

## Data handling

What the site tells visitors is backed by the code, and tests pin the parts that matter:

- **Anonymous text is not stored.** `/api/generate` saves a run to MongoDB only when there is a signed-in user to show it to. Text goes to Google's Gemini API to produce the result — on Gemini's free tier, which the privacy policy discloses.
- **Usage is measured without content.** Every run writes a `ToolRun` row: tool, input and output sizes, total and model-only latency, result format and status. No text, no user id, no IP — a test pins the exact field allowlist, and another pins the schema's paths.
- **Sentry is not sent request bodies, cookies or IP addresses**, and session replays are masked. A test runs Sentry's own integration over a realistic request to check what would actually leave.
- **Page analytics are cookie-less** (Vercel Web Analytics).

The full policy is at [`/privacy`](https://brainboomingai.vercel.app/privacy); each section of `app/(marketing)/privacy/page.tsx` names the code that makes it true.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router, React 19) |
| AI | Google Gemini via `@google/genai` |
| Database | MongoDB (Mongoose ODM) |
| Auth | Auth.js v5 (Google OAuth, credentials, magic link via Brevo) |
| Styling | Tailwind CSS, Radix UI |
| Error Monitoring | Sentry (`@sentry/nextjs`) |
| Analytics | Vercel Web Analytics (page views), first-party `ToolRun` metrics (tool usage) |
| Testing | Vitest |
| OCR | Tesseract.js |

## Project Structure

```
app/
  (tools)/              # AI and utility tool pages
  (auth)/               # Sign in, sign up, verify, error pages
  (protected)/          # Dashboard and admin pages (auth required)
  api/
    auth/               # Auth.js routes + registration endpoint
    generate/           # AI generation endpoint
    md5/                # MD5 hash endpoint
    admin/              # Admin user management API
auth.ts                 # Auth.js v5 config (providers, callbacks, adapter)
auth.config.ts          # Edge-safe auth config (used by middleware)
middleware.ts           # Route protection (/dashboard, /admin)
lib/
  googleAIService.ts    # Google Gemini API wrapper
  mongoose.ts           # Mongoose connection singleton
  mongodb-client.ts     # Raw MongoClient for Auth.js adapter
  logger.ts             # Structured logger (Sentry + console)
  rateLimit.ts          # IP-based rate limiting
  auth-helpers.ts       # Server-side auth utilities
  prompts.ts            # Server-side prompt templates, one per tool
  toolSchemas.ts        # Gemini response schemas (paired with toolResults.ts)
  parseToolResult.ts    # Validates model output; falls back to plain text
  toolRuns.ts           # Content-free usage metrics writer
  sentryRequestData.ts  # Keeps request bodies, cookies and IPs out of Sentry
config/
  site.ts               # Site identity, real socials, contact channel
  constants.ts          # Tool registry (drives nav, sitemap, metadata)
  dataHandling.ts       # The one statement of how submitted text is treated
models/                 # Mongoose models (User, GeneratedResponse, UserActivity, ToolRun)
components/
  tools/                # Shared tool form component
  auth/                 # Auth UI (sign in/up forms, user menu, CTA)
  navbar/               # Navigation
  layout/               # Footer
  ui/                   # Reusable UI primitives (Button, Card, etc.)
```

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB instance (local or Atlas)

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Copy `.env.example` or create `.env` with:

```env
# Required
GOOGLE_API_KEY=              # Google Gemini API key
MONGODB_URI=                 # MongoDB connection string
NEXT_PUBLIC_API_URL=http://localhost:3000

# Auth.js
AUTH_SECRET=                 # Generate with: openssl rand -base64 33
AUTH_URL=http://localhost:3000

# Google OAuth (from Google Cloud Console)
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=

# Magic link email (Brevo HTTP API — the API key, not the SMTP key)
BREVO_API_KEY=
EMAIL_FROM=                  # Must be a Brevo-verified sender address
EMAIL_FROM_NAME=

# SEO (optional) — canonical origin; defaults to the vercel.app URL
NEXT_PUBLIC_SITE_URL=

# Sentry (optional)
NEXT_PUBLIC_SENTRY_DSN=
SENTRY_AUTH_TOKEN=
SENTRY_ORG=
SENTRY_PROJECT=
```

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 4. Create an admin account

Sign up through the UI, then promote your user in MongoDB:

```js
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "admin" } }
)
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server (Turbopack) |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npm run lint` | ESLint |
| `npm test` | Run tests (Vitest) |
| `npm run test:watch` | Run tests in watch mode |

## Auth System

Three sign-in methods:
- **Credentials** — Email + password
- **Google OAuth 2.0** — "Continue with Google"
- **Magic Link** — Passwordless email via Brevo

JWT session strategy with `user` and `admin` roles. Middleware protects `/dashboard` (login required) and `/admin` (admin role required).

## Architecture Notes

- **Edge-safe auth split**: `auth.config.ts` holds the minimal config for middleware (Edge Runtime). `auth.ts` extends it with providers, adapter, and callbacks that depend on Mongoose.
- **Shared users collection**: Auth.js adapter and Mongoose `User` model both operate on the `users` collection. Auth.js manages core fields; Mongoose adds `password`, `role`, `isActive`.
- **Rate limiting**: IP-based, stored in MongoDB with TTL index. 10 requests per 60-second window per IP.
- **Input validation**: API routes validate type, size, and tool allowlist. AI output is sanitized with DOMPurify before rendering.
- **Error tracking**: All errors flow through `lib/logger.ts` which reports to Sentry and logs to console in development. Request bodies, cookies and IP headers are stripped first (`lib/sentryRequestData.ts`).
- **Server-side prompts**: the client sends only `{ text, tool }`; the prompt is chosen on the server, so `/api/generate` cannot be used as an open LLM proxy on the project's API key.
- **Structured output with a fallback**: each tool declares a Gemini response schema and a matching zod schema (a test asserts the two agree). Output that fails validation degrades to plain text instead of failing the request.
- **Best-effort writes**: history, activity log and usage metrics are written together after a successful generation and never fail the request; the metrics write is time-boxed.

## License

[MIT](LICENSE)
