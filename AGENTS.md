# Repository Guidelines

## Project Structure & Module Organization
App Router lives in `app/` (per route folders, server components first). Place shared UI in `components/`, feature utilities in `lib/`, and Web Audio code under `tone-lab/`. Blog content (MDX) resides in `content/blog/` and is compiled via Contentlayer. Static media (SVGs, PDFs, audio demos) go in `public/`, while persistent data models stay in `prisma/`. Keep integration examples or seeds inside `data/` when needed and document new folders via an `index.ts` or README stub.

## Build, Test, and Development Commands
- `npm install`: install dependencies (required before running Contentlayer/Prisma).
- `npm run dev`: start Next.js with Contentlayer watch; served at http://localhost:3000.
- `npm run build`: create the production build (generates Contentlayer artifacts).
- `npm run typecheck`: run `tsc --noEmit` to catch typing regressions.
- `npm run lint`: apply Next.js ESLint rules.
- `npm run content`: rebuild MDX sources without starting the dev server.

## Coding Style & Naming Conventions
Tailwind handles most styling; add utility classes before bespoke CSS. Follow 2-space indentation and keep TypeScript strict mode green. Name React components PascalCase (`ToneLabPlayer.tsx`), use camelCase for hooks/utilities, and prefer named exports. Server components live closest to the route, while client components carry a `"use client"` directive at the top.

## Testing Guidelines
Add Playwright or Cypress smoke flows for checkout and Tone Lab before launch; Jest/Testing Library cover component logic. Name test files `*.test.ts(x)` next to the subject (e.g., `components/hero.test.tsx`). Mock Web Audio nodes where possible and include fixtures under `data/tests/`. Aim for ≥85% coverage on critical modules (`tone-lab`, `app/api`).

## Commit & Pull Request Guidelines
Follow Conventional Commits (`feat:`, `fix:`, `chore:`) in present tense (e.g., `feat: add transport controls`). Scope PRs narrowly, link tracking issues, and include a concise summary plus screenshots or clips for UI-visible changes. Confirm `npm run build` and `npm test` both succeed before requesting review. Tag reviewers who own the affected feature folder.
