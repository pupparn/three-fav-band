"use client";

import GamesCard from "@/components/gamesCard";

export default function GamesPage() {
    return (
        <div className="min-h-screen bg-ink text-paper">
            <header className="flex flex-wrap items-center justify-between gap-6 px-6 py-6 md:px-12 border-b border-border">
                <div className="flex items-baseline gap-3">
                    <span className="font-[family-name:var(--font-caprasimo)] font-normal text-paper text-2xl tracking-tight">Games</span>
                </div>
            </header>
            <main className="px-6 py-6 md:px-12">
                <GamesCard />
            </main>
        </div>
    )
}