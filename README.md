# Brain Booming AI

A collection of free AI-powered writing and utility tools built with Next.js 15 and Google Gemini.

## Tools

**AI Tools** (powered by Google Gemini)
- **AI to Human Converter** — Rewrite AI-generated text to sound natural
- **Grammar Checker** — Fix grammar errors in your writing
- **Spell Checker** — Detect and correct spelling mistakes
- **Paraphrasing Tool** — Rephrase text in different styles
- **Text Summarizer** — Condense long content into summaries
- **Originality Analyzer** — Check text for originality
- **Prompt Generator** — Generate detailed AI prompts from descriptions
- **Image to Text** — Extract text from images (OCR via Tesseract.js)

**Utility Tools**
- **MD5 Generator** — Generate MD5 hashes
- **Image Resizer** — Resize images by dimension
- **Image Compressor** — Reduce image file size

All tools work without login. Authenticated users get activity tracking and a personal dashboard.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router, React 19) |
| AI | Google Gemini via `@google/genai` |
| Database | MongoDB (Mongoose ODM) |
| Auth | Auth.js v5 (Google OAuth, credentials, magic link via Resend) |
| Styling | Tailwind CSS, Radix UI, Framer Motion |
| Error Monitoring | Sentry (`@sentry/nextjs`) |
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
models/                 # Mongoose models (User, GeneratedResponse, UserActivity)
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

# Magic link email (from resend.com)
AUTH_RESEND_KEY=
AUTH_EMAIL_FROM=noreply@yourdomain.com

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
- **Magic Link** — Passwordless email via Resend

JWT session strategy with `user` and `admin` roles. Middleware protects `/dashboard` (login required) and `/admin` (admin role required).

## Architecture Notes

- **Edge-safe auth split**: `auth.config.ts` holds the minimal config for middleware (Edge Runtime). `auth.ts` extends it with providers, adapter, and callbacks that depend on Mongoose.
- **Shared users collection**: Auth.js adapter and Mongoose `User` model both operate on the `users` collection. Auth.js manages core fields; Mongoose adds `password`, `role`, `isActive`.
- **Rate limiting**: IP-based, stored in MongoDB with TTL index. 10 requests per 60-second window per IP.
- **Input validation**: API routes validate type, size, and tool allowlist. AI output is sanitized with DOMPurify before rendering.
- **Error tracking**: All errors flow through `lib/logger.ts` which reports to Sentry and logs to console in development.
