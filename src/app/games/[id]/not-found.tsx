import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-ink text-paper flex flex-col items-center justify-center gap-4">
            <h2 className="font-[family-name:var(--font-caprasimo)] font-normal text-3xl">
                Game not found
            </h2>
            <p className="text-paper-muted">Could not find the game you&apos;re looking for.</p>
            <Link
                href="/games"
                className="text-sm text-paper-muted transition-colors duration-150 ease-out hover:text-paper"
            >
                ← Back to Games
            </Link>
        </div>
    );
}
