# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Non-standard Next.js — read first

Next.js **16.3.3** here has breaking changes vs. training data. Before writing any Next.js code (routing, data fetching, config, params/props types), read the relevant guide under `node_modules/next/dist/docs/` (`01-app/`, `02-pages/`, `03-architecture/`, `04-community/`, `index.md`). Note `layout.tsx` already uses a generated prop type (`LayoutProps<"/">`) instead of a hand-written `{ children }` type — that's this version's convention, not a mistake.

## Commands

- `npm run dev` — dev server (localhost:3000)
- `npm run build` — production build
- `npm run start` — serve production build
- `npm run lint` — ESLint (flat config in `eslint.config.mjs`, extends `eslint-config-next` core-web-vitals + typescript)

No test suite is configured in this repo.

## Architecture

Single-page App Router site listing K-pop bands as cards.

- `src/app/page.tsx` — home page, maps `bandData` to `BandCard` components.
- `src/app/layout.tsx` — root layout, loads Geist fonts, sets metadata.
- `src/data/bandData.ts` — hardcoded array of band data (the only "database").
- `src/types/band.ts` — `Band` type shared by the data file and `BandCard`.
- `src/components/bandCard.tsx` — presentational card rendering one `Band`.
- `public/image/` — band photos (directory is singular `image`, not `images`).

Data flow is one-directional and static: `bandData.ts` → `page.tsx` → `BandCard` props. There is no API route, database, or client-side fetching — adding a new band means adding an entry to `bandData.ts` conforming to the `Band` type.

Styling is Tailwind CSS v4 via `@tailwindcss/postcss` (see `postcss.config.mjs`), applied with utility classes directly in JSX; there is no separate component-level CSS.

### Known inconsistency

`Band.members` in `src/types/band.ts` is typed as a single `{ name; image? }` object, but `bandData.ts` populates `members` as `string[]` and `bandCard.tsx` renders it as `string[]` (`.map((member) => ...)`). Match the array-of-strings shape actually used by the data and component when touching this type, unless you're deliberately migrating to per-member objects (image path fields would also need fixing — `bandData.ts` points at `public/images/...` but the real directory is `public/image/`).
