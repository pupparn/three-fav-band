"use client";

import { useRef } from "react";
import type { gameType } from "@/types/games";

const RARITY: Record<gameType["status"], { label: string; border: string; foil: boolean }> = {
    "Not Started": { label: "COMMON", border: "#8b8d93", foil: false },
    "In Progress": { label: "RARE", border: "#d4af37", foil: false },
    Completed: { label: "LEGENDARY", border: "transparent", foil: true },
};

export default function GameDetailCard({ game }: { game: gameType }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const rarity = RARITY[game.status];

    function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
        const card = cardRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        card.style.setProperty("--px", `${(px * 100).toFixed(1)}%`);
        card.style.setProperty("--py", `${(py * 100).toFixed(1)}%`);
        card.style.setProperty("--rx", `${((py - 0.5) * -8).toFixed(2)}deg`);
        card.style.setProperty("--ry", `${((px - 0.5) * 10).toFixed(2)}deg`);
    }

    function handlePointerLeave() {
        const card = cardRef.current;
        if (!card) return;
        card.style.setProperty("--rx", "0deg");
        card.style.setProperty("--ry", "0deg");
    }

    return (
        <div
            ref={cardRef}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            className={`card-tilt group relative mx-auto w-full max-w-[420px] rounded-[22px] p-[3px] transition-shadow duration-300 ${rarity.foil ? "holo-foil" : ""}`}
            style={{
                background: rarity.foil ? undefined : rarity.border,
                boxShadow: "0 24px 48px -16px rgba(0,0,0,0.7), 0 2px 0 rgba(255,255,255,0.04) inset",
            }}
        >
            <div
                className="card-notch relative overflow-hidden rounded-[20px] bg-[#131011]"
                style={{ transform: "rotateX(var(--rx, 0deg)) rotateY(var(--ry, 0deg))" }}
            >
                {/* rarity badge */}
                <span
                    className={`absolute right-3 top-3 z-20 rounded-full px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-[#1a1817] ${rarity.foil ? "holo-foil" : ""}`}
                    style={{ background: rarity.foil ? undefined : rarity.border }}
                >
                    {rarity.label}
                </span>

                {/* art window */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0b0b0d]">
                    {game.image && game.image.length > 0 ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={game.image[0]}
                            alt={game.name}
                            className="h-full w-full object-cover"
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center text-sm opacity-40">
                            No cover art
                        </div>
                    )}
                    {/* holo foil sheen sweep */}
                    <div
                        className="pointer-events-none absolute inset-0 mix-blend-screen opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        style={{
                            background:
                                "radial-gradient(circle at var(--px, 50%) var(--py, 50%), rgba(255,255,255,0.35), rgba(110,231,255,0.25) 35%, rgba(255,110,199,0.2) 55%, transparent 70%)",
                        }}
                    />
                </div>

                {/* name plate */}
                <div className="px-5 pt-4">
                    <h1 className="font-[family-name:var(--font-caprasimo)] text-2xl leading-tight text-paper">
                        {game.name}
                    </h1>
                </div>

                {/* flavor text */}
                {game.description && (
                    <p className="px-5 pb-4 pt-2 text-sm leading-relaxed text-[color:rgb(245_234_216_/_0.72)]">
                        {game.description}
                    </p>
                )}

                {/* stamped stat ledger */}
                <dl className="grid grid-cols-3 divide-x divide-white/10 border-t border-white/10 text-center">
                    <div className="px-2 py-3">
                        <dt className="text-[0.6rem] uppercase tracking-[0.12em] text-[color:rgb(245_234_216_/_0.5)]">
                            Platforms
                        </dt>
                        <dd className="mt-1 font-mono text-[0.72rem] tabular-nums text-paper">
                            {game.platforms.join(" · ")}
                        </dd>
                    </div>
                    <div className="px-2 py-3">
                        <dt className="text-[0.6rem] uppercase tracking-[0.12em] text-[color:rgb(245_234_216_/_0.5)]">
                            Hours
                        </dt>
                        <dd className="mt-1 font-mono text-[0.72rem] tabular-nums text-paper">
                            {game.hoursToComplete}
                        </dd>
                    </div>
                    <div className="px-2 py-3">
                        <dt className="text-[0.6rem] uppercase tracking-[0.12em] text-[color:rgb(245_234_216_/_0.5)]">
                            Price
                        </dt>
                        <dd className="mt-1 font-mono text-[0.72rem] tabular-nums text-paper">
                            ${game.price.toFixed(2)}
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    );
}
