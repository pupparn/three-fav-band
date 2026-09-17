import type { Metadata } from "next";
import { gamesData } from "@/data/gameData";
import GameDetailClient from "./gameDetailClient";

export async function generateMetadata({
    params,
}: PageProps<"/games/[id]">): Promise<Metadata> {
    const { id } = await params;
    const game = gamesData.find((g) => g.id === id);

    return {
        title: game ? game.name : "Game not found",
    };
}

export default function GameDetailPage() {
    return <GameDetailClient />;
}
