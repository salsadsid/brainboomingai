## Plan: Project Improvement Roadmap

Elevate this app from “works” to “interview standout” by hardening security, reliability, and quality, then polishing UX and performance. Focus first on server-only secrets, robust API validation, and observability; follow with testing/CI and cleanup; finish with product polish and measurable performance wins.

**Steps**
1. Discovery & baseline: Inventory tool routes, shared prompt patterns, and current error paths; confirm hosting target and data retention expectations. *Blocks all other steps.*
2. Security & environment hardening: Move secrets to server-only env vars; add .env.example; ensure no client exposure. Add basic rate limiting and request validation on API routes. *Blocks steps 3–5.*
3. API reliability: Centralize error handling and logging; implement LLM timeout/retry; normalize API responses across tools. *Parallel with step 4 after step 2.*
4. Data/DB resilience: Validate schema writes, add safe defaults, and ensure dbConnect behavior under concurrent requests. *Parallel with step 3 after step 2.*
5. Testing foundation: Add unit tests for utilities and API routes, then minimal integration tests for /api/generate. Add CI pipeline. *Depends on steps 2–4.*
6. Codebase cleanup: Remove deprecated pages (page-old/page-new), consolidate tool templates, and standardize metadata. *Parallel with step 5.*
7. UX & product polish: Improve empty/error states, add clearer tool affordances, unify typography and page structure. *After step 6.*
8. Performance & caching: Add caching headers or revalidate for static pages, optimize prompt calls, and reduce bundle where possible. *After step 3.*
9. Documentation: Add architecture notes, local setup, and a short “engineering highlights” section for interviews. *After step 5.*

**Relevant files**
- [app/api/generate/route.tsx](app/api/generate/route.tsx) — request validation, error normalization, rate limiting hook
- [lib/googleAIService.ts](lib/googleAIService.ts) — retries, timeouts, server-only env access
- [lib/mongoose.ts](lib/mongoose.ts) — connection resilience and error propagation
- [redux/api/promptApi.tsx](redux/api/promptApi.tsx) — client API consistency and error mapping
- [config/constants.ts](config/constants.ts) — tool metadata normalization
- [app/(tools)/free-grammar-checker/GrammarCheckerTool.tsx](app/(tools)/free-grammar-checker/GrammarCheckerTool.tsx) — template for validation + UX patterns
- [components/ui/](components/ui/) — shared form patterns
- [next.config.ts](next.config.ts) — env exposure audit

**Verification**
1. Run dev server and confirm /api/generate succeeds with valid prompt and returns normalized error for invalid input.
2. Check that no client bundle includes secret env vars.
3. Run unit tests for utils and API route; CI passes.
4. Manual QA for 2–3 tools: correct error states, loading states, and success rendering.
5. Lighthouse/Performance snapshot to confirm no regressions after changes.

**Decisions**
- Prioritize security and reliability before UI polish.
- Keep tool feature set constant; focus on quality and interview-readiness.
- Use server-only env vars and avoid NEXT_PUBLIC for secrets.

**Further Considerations**
1. Choose rate limiting approach: simple in-memory (local dev) vs. edge/middleware-based (production).
2. Decide on test stack: Vitest + React Testing Library vs. Jest + RTL.
3. Monitoring stack: lightweight (console + Sentry) vs. full logging pipeline.
