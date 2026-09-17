# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary user is the instructor/grader reviewing a course assignment; secondary user is the student developer themselves. The audience is a class demo, not the public.

## Product Purpose

"Three Stages" is a Next.js class project demonstrating CRUD and dynamic routing over two hardcoded datasets: a K-pop band roster (`/band`) and a personal games log (`/games`, with `/games/[id]` detail pages). Success is a working, well-crafted demonstration of App Router fundamentals (static + dynamic routes, client-side add/edit/delete state).

## Positioning

N/A — course assignment, not a competitive product.

## Operating Context

Data lives in hardcoded arrays (`src/data/bandData.ts`, `src/data/gameData.ts`); there is no backend, database, or auth. Games list state (add/edit/delete) is client-side `useState` only and does not persist across reloads or propagate to the `/games/[id]` detail route, which always reads the static seed data.

## Capabilities and Constraints

- No API routes, no database, no persistence beyond in-memory React state.
- `gameType` fields: id, name, description?, platforms[], hoursToComplete, status ("Not Started" | "In Progress" | "Completed"), image?[], price.
- Redesigns must use only real data already present in `gameData.ts` — no fabricated reviews, ratings, or pricing beyond what the field provides.

## Evidence on Hand

Game entries in `src/data/gameData.ts` (Dota 2, The Witcher 3, Elden Ring, Stardew Valley, Valorant) with real cover-art image URLs, platforms, hours, status, and price. No testimonials, press, or benchmarks exist or should be invented.

## Product Principles

- Ship real data as-is; never invent facts the dataset doesn't have.
- Favor a small, coherent visual system over scope creep — this is a course project, not a production app.
- Keep the existing CRUD behavior on `/games` intact; visual redesign should not break add/edit/delete.
