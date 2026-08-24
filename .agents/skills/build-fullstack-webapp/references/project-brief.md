# KoupreyPlus project brief

Read this file only when the repository or request concerns KoupreyPlus
(Kuprey Plus / กูปรีย์พลัส).

## Purpose

Manage municipal services and operational data. Known examples include citizen
complaints, complaint tracking, staff administration, and electronic-office
document processing.

## Current stack

- Frontend: React with Vite and Tailwind CSS
- Backend: Node.js with Express
- ORM/database: Prisma with SQLite for local development
- Backend default port: `3000`
- Frontend default port: `5173`
- Frontend API base: `VITE_API_URL`
- Backend database URL: `DATABASE_URL`
- Session configuration: `SESSION_SECRET`
- Frontend CORS origin: `FRONTEND_URL`
- Optional Google OAuth: `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`

Preserve discovered versions, folder layout, libraries, and project
conventions. Treat this brief as orientation, not a substitute for inspecting
the repository.

## Local AI modes

### Mock

Use `AI_MODE=mock` for deterministic local development without provider
credentials. Keep response shapes identical to the real provider path. Support
complaint drafting, testimony generation, and staff chat flows without
`OPENAI_API_KEY` or Chroma configuration.

### OpenAI

Use `AI_MODE=openai` only when configured. Known production-oriented variables
include:

- `OPENAI_API_KEY`
- `OPENAI_EMBEDDING_MODEL`
- `OPENAI_RAG_MODEL`
- `CHROMA_DB_URL`
- `CHROMA_COLLECTION`

Keep Phoenix and other external integrations disabled locally unless the user
explicitly configures them.

## Guardrails

- Never commit `.env` values or real credentials.
- Keep session cookies, CORS, and role checks aligned between frontend and
  backend.
- Preserve a non-AI/manual or deterministic fallback for essential municipal
  services.
- Use synthetic fixtures; do not copy citizen data into tests or logs.
- Use Prisma migrations for deployable schema changes even if local setup
  currently mentions `prisma db push`.
