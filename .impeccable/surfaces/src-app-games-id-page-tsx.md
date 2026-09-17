---
version: 1
slug: "src-app-games-id-page-tsx"
primary_target: "src/app/games/[id]/page.tsx"
related_targets: []
---

## Scope

`/games/[id]` game detail page (Experience mode) inside the "Three Stages" class project. `/games` list and its CRUD dialog are untouched. This is a replacement of the incumbent plain detail page's visual world, not an extension.

## Audience / job / constraints

Instructor/grader viewing a course demo, and the student themself. Task: view one game's real facts (name, description, platforms, hours to complete, status, price, cover image) with no invented data. Must preserve existing data fields and the `/games` list's add/edit/delete flow; only `[id]/page.tsx` (and its Back link) changes visually.

## Direction contract

THESIS: The detail page IS a physical foil trading card, not a webpage describing a game — the category default (product-page hero + spec sidebar) is refused in favor of one card object the visitor tilts and reads like a real collectible.

OWN-WORLD: Near-black card stock (`#0b0b0d`) as page ground; the card itself is a bordered rectangle with a rarity-tier border color keyed to `status` (Not Started = pewter gray, In Progress = gold, Completed = holographic cyan-magenta gradient); cover art fills the card's art window; stats (platforms, hours, price) render as a stamped stat row along the card's foot, monospace tabular figures; title in the existing Caprasimo display face as the card's "name plate," body copy in Figtree as the card's flavor-text block; a diagonal holo-foil sheen sweeps across the art window on pointer move/hover.

STORY: Visitor lands on one card centered in negative space, immediately reads it as a collectible (rarity border + foil), reads the flavor text and stat row, and can flip back to the collection via a card-tray "Back to Games" affordance.

FIRST VIEWPORT: Full-bleed dark ground; one centered card (max ~420px wide, full card aspect) with: rarity-color border + corner die-cut notches, art window (game cover, object-fit cover) taking the top ~55%, name plate below in display face, flavor text (description), then a stamped stat row (Platforms · Hours · Price) as the card's bottom ledger, status shown as a foil rarity badge top-right of the card. "Back to Games" sits above the card as a small tray tab, not a generic navbar.

FORM: Holo rarity card (lead/rolled candidate, dealt index 4 of the surface concept-seed at key `a7e750fa`), beating the arcade-CRT and collector's-unboxing challengers on product clarity for a small structured-data record; standing exit (clean store-page canon) was offered and declined by the user in favor of this roll.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance.
