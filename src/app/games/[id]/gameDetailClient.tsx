"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { gamesData } from "@/data/gameData";

export default function GameDetailClient() {
    const params = useParams<{ id: string }>();
    const game = gamesData.find((g) => g.id === params.id);

    const images = game?.image ?? [];
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);

    useEffect(() => {
        if (paused || images.length <= 1) return;
        const timer = setInterval(() => setIndex((i) => (i + 1) % images.length), 4000);
        return () => clearInterval(timer);
    }, [paused, images.length]);

    if (!game) return notFound();

    const facts = [
        ["Platforms", game.platforms.join(", ")],
        ["Hours to Complete", String(game.hoursToComplete)],
        ["Status", game.status],
        ["Price", `$${game.price.toFixed(2)}`],
    ];

    const heading = "font-[family-name:var(--font-caprasimo)] font-normal text-paper";
    const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);
    const next = () => setIndex((i) => (i + 1) % images.length);

    return (
        <div className="page-in min-h-screen bg-ink text-paper">
            <header className="flex items-center gap-5 px-6 py-6 md:px-12 border-b border-border">
                <Link
                    href="/games"
                    className="text-sm text-paper-muted transition-[color,transform] duration-150 ease-out hover:text-paper hover:-translate-x-0.5 inline-block"
                >
                    ← Games
                </Link>
                <span className={`${heading} text-2xl tracking-tight`}>{game.name}</span>
            </header>

            <div className="max-w-[1280px] mx-auto px-6 md:px-12 py-11 grid gap-12 md:grid-cols-[1.4fr_1fr] items-start">
                <div className="flex flex-col gap-3.5 min-w-0">
                    <div
                        onMouseEnter={() => setPaused(true)}
                        onMouseLeave={() => setPaused(false)}
                        className="relative aspect-video rounded-md overflow-hidden bg-ink-raised"
                    >
                        {images.length > 0 ? (
                            images.map((src, i) => (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    key={src + i}
                                    src={src}
                                    alt={`${game.name} screenshot ${i + 1}`}
                                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 [transition-timing-function:var(--ease-in-out)]"
                                    style={{ opacity: i === index ? 1 : 0 }}
                                />
                            ))
                        ) : (
                            <div className="flex h-full w-full items-center justify-center text-sm text-paper-faint">
                                No cover art
                            </div>
                        )}
                        {images.length > 1 && (
                            <>
                                <button
                                    onClick={prev}
                                    aria-label="Previous image"
                                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-ink/70 text-paper flex items-center justify-center transition-[background-color,scale] duration-150 ease-out hover:bg-ink active:scale-90"
                                >
                                    ‹
                                </button>
                                <button
                                    onClick={next}
                                    aria-label="Next image"
                                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-ink/70 text-paper flex items-center justify-center transition-[background-color,scale] duration-150 ease-out hover:bg-ink active:scale-90"
                                >
                                    ›
                                </button>
                            </>
                        )}
                    </div>
                    {images.length > 1 && (
                        <div className="flex justify-center gap-2">
                            {images.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setIndex(i)}
                                    aria-label={`Image ${i + 1}`}
                                    className="h-1.5 rounded-full transition-[width,background-color] duration-200 ease-out active:scale-90"
                                    style={{
                                        width: i === index ? 20 : 6,
                                        background: i === index ? "var(--color-paper)" : "var(--color-ink-raised)",
                                    }}
                                />
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex flex-col gap-7 min-w-0">
                    {game.description && (
                        <p className="m-0 text-[17px] leading-[1.55] text-paper-dim">{game.description}</p>
                    )}
                    <dl className="m-0 grid grid-cols-[auto_1fr] gap-x-7">
                        {facts.map(([k, v]) => (
                            <div key={k} className="contents">
                                <dt className="py-3 border-t border-border text-paper-muted">{k}</dt>
                                <dd className="m-0 py-3 border-t border-border text-paper">{v}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    );
}
