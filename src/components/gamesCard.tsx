"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import type { gameType } from "@/types/games";
import { gamesData } from "@/data/gameData";

const STATUSES: gameType["status"][] = ["Not Started", "In Progress", "Completed"];

type FormState = {
    name: string;
    description: string;
    platforms: string;
    hoursToComplete: string;
    status: gameType["status"];
    image: string;
    price: string;
};

const emptyForm: FormState = {
    name: "",
    description: "",
    platforms: "",
    hoursToComplete: "0",
    status: "Not Started",
    image: "",
    price: "0",
};

function toForm(game: gameType): FormState {
    return {
        name: game.name,
        description: game.description ?? "",
        platforms: game.platforms.join(", "),
        hoursToComplete: String(game.hoursToComplete),
        status: game.status,
        image: (game.image ?? []).join(", "),
        price: String(game.price),
    };
}

export default function GamesCard() {
    const [games, setGames] = useState<gameType[]>(gamesData);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [form, setForm] = useState<FormState>(emptyForm);
    const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
    const [search, setSearch] = useState("");
    const [toast, setToast] = useState<string | null>(null);
    const [bumpedId, setBumpedId] = useState<string | null>(null);
    const dialogRef = useRef<HTMLDialogElement>(null);
    const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const bumpTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    function showToast(message: string) {
        setToast(message);
        if (toastTimer.current) clearTimeout(toastTimer.current);
        toastTimer.current = setTimeout(() => setToast(null), 2500);
    }

    const query = search.trim().toLowerCase();
    const filteredGames = query
        ? games.filter(
              (g) =>
                  g.name.toLowerCase().includes(query) ||
                  g.platforms.some((p) => p.toLowerCase().includes(query))
          )
        : games;

    function openAdd() {
        setEditingId(null);
        setForm(emptyForm);
        setErrors({});
        dialogRef.current?.showModal();
    }

    function openEdit(game: gameType) {
        setEditingId(game.id);
        setForm(toForm(game));
        setErrors({});
        dialogRef.current?.showModal();
    }

    function closeModal() {
        dialogRef.current?.close();
    }

    function remove(id: string) {
        if (!confirm("Delete this game?")) return;
        setGames((prev) => prev.filter((g) => g.id !== id));
    }

    function cycleStatus(id: string) {
        setGames((prev) =>
            prev.map((g) => {
                if (g.id !== id) return g;
                const next = STATUSES[(STATUSES.indexOf(g.status) + 1) % STATUSES.length];
                showToast(`"${g.name}" set to ${next}`);
                return { ...g, status: next };
            })
        );
        setBumpedId(id);
        if (bumpTimer.current) clearTimeout(bumpTimer.current);
        bumpTimer.current = setTimeout(() => setBumpedId(null), 220);
    }

    function validate(f: FormState): Partial<Record<keyof FormState, string>> {
        const errs: Partial<Record<keyof FormState, string>> = {};
        if (!f.name.trim()) errs.name = "Name is required";
        if (!f.platforms.trim()) errs.platforms = "At least one platform is required";

        const hours = Number(f.hoursToComplete);
        if (f.hoursToComplete.trim() === "" || Number.isNaN(hours)) errs.hoursToComplete = "Must be a number";
        else if (hours < 0) errs.hoursToComplete = "Cannot be negative";

        const price = Number(f.price);
        if (f.price.trim() === "" || Number.isNaN(price)) errs.price = "Must be a number";
        else if (price < 0) errs.price = "Price cannot be negative";

        return errs;
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const errs = validate(form);
        setErrors(errs);
        if (Object.keys(errs).length > 0) return;

        const game: gameType = {
            id: editingId ?? crypto.randomUUID(),
            name: form.name.trim(),
            description: form.description.trim() || undefined,
            platforms: form.platforms.split(",").map((p) => p.trim()).filter(Boolean),
            hoursToComplete: Number(form.hoursToComplete),
            status: form.status,
            image: form.image.split(",").map((i) => i.trim()).filter(Boolean),
            price: Number(form.price),
        };

        setGames((prev) =>
            editingId ? prev.map((g) => (g.id === editingId ? game : g)) : [...prev, game]
        );
        showToast(editingId ? `"${game.name}" updated` : `"${game.name}" added`);
        closeModal();
    }

    const inputClass = "w-full px-3 py-2 rounded-md bg-ink text-paper border border-border";
    const labelClass = "text-sm font-medium mb-1 block";
    const errorClass = "error-in text-red-400 text-xs mt-1";

    return (
        <div className="container">
            <div className="flex flex-wrap gap-4 justify-between mb-4">
                <input
                    type="text"
                    placeholder="Search games..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1 min-w-[200px] px-4 py-2 text-white rounded-md bg-ink border border-border transition-colors duration-150 ease-out focus:border-paper-muted outline-none"
                />
                <button
                    onClick={openAdd}
                    className="px-4 py-2 rounded-md bg-ink-raised border border-border transition-[opacity,transform] duration-150 ease-out hover:opacity-80 active:scale-[0.97]"
                >
                    + Add Game
                </button>
            </div>

            {filteredGames.length === 0 && (
                <p className="text-center text-sm opacity-70 py-8">No games match &quot;{search}&quot;.</p>
            )}

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredGames.map((game, i) => (
                    <div
                        key={game.id}
                        className="card-in relative bg-ink-raised p-4 rounded-lg shadow-md"
                        style={{ animationDelay: `${Math.min(i, 8) * 40}ms` }}
                    >
                        <details className="absolute top-3 right-3">
                            <summary className="list-none cursor-pointer px-2 py-1 rounded transition-colors duration-150 ease-out hover:bg-white/10 select-none">
                                ...
                            </summary>
                            <div className="card-menu absolute right-0 mt-1 w-32 rounded-md border border-border bg-ink shadow-lg z-10 overflow-hidden">
                                <button
                                    onClick={() => openEdit(game)}
                                    className="w-full text-left px-3 py-2 transition-colors duration-150 ease-out hover:bg-white/10"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => remove(game.id)}
                                    className="w-full text-left px-3 py-2 transition-colors duration-150 ease-out hover:bg-white/10 text-red-400"
                                >
                                    Delete
                                </button>
                            </div>
                        </details>

                        <h2 className="text-xl font-semibold mb-2 pr-8">
                            <Link href={`/games/${game.id}`} className="hover:underline">
                                {game.name}
                            </Link>
                        </h2>
                        {game.image && game.image.length > 0 && (
                            <div className="w-full aspect-video mb-2 rounded-md overflow-hidden bg-ink">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={game.image[0]}
                                    alt={game.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.currentTarget.closest("div")!.style.display = "none";
                                    }}
                                />
                            </div>
                        )}
                        <p className="mb-2">{game.description}</p>
                        <p className="mb-2">Platforms: {game.platforms.join(", ")}</p>
                        <p className="mb-2">Hours to Complete: {game.hoursToComplete}</p>
                        <button
                            type="button"
                            onClick={() => cycleStatus(game.id)}
                            title="Click to cycle status"
                            className={`mb-2 px-2 py-1 -ml-2 rounded text-left cursor-pointer transition-[background-color,transform] duration-150 ease-out hover:bg-white/10 active:scale-[0.97] ${
                                bumpedId === game.id ? "bump" : ""
                            }`}
                        >
                            Status: {game.status}
                        </button>
                        <p className="mb-2">Price: ${game.price.toFixed(2)}</p>
                    </div>
                ))}
            </div>

            {toast && (
                <div className="toast-in fixed top-6 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-md bg-paper text-ink font-semibold shadow-lg">
                    {toast}
                </div>
            )}

            <dialog
                ref={dialogRef}
                className="fixed inset-0 m-auto rounded-lg bg-ink-raised text-paper p-6 w-full max-w-md backdrop:bg-black/60"
                onClose={() => setEditingId(null)}
                onClick={(e) => {
                    if (e.target === dialogRef.current) closeModal();
                }}
            >
                <button
                    type="button"
                    onClick={closeModal}
                    aria-label="Close"
                    className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-md transition-[background-color,transform] duration-150 ease-out hover:bg-white/10 active:scale-[0.9]"
                >
                    ✕
                </button>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <h2 className="text-xl font-semibold mb-2 pr-8">{editingId ? "Edit Game" : "Add Game"}</h2>

                    <div>
                        <label className={labelClass}>Name</label>
                        <input
                            className={inputClass}
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                        />
                        {errors.name && <p className={errorClass}>{errors.name}</p>}
                    </div>

                    <div>
                        <label className={labelClass}>Description</label>
                        <textarea
                            className={inputClass}
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className={labelClass}>Platforms (comma separated)</label>
                        <input
                            className={inputClass}
                            value={form.platforms}
                            onChange={(e) => setForm({ ...form, platforms: e.target.value })}
                        />
                        {errors.platforms && <p className={errorClass}>{errors.platforms}</p>}
                    </div>

                    <div>
                        <label className={labelClass}>Hours to Complete</label>
                        <input
                            type="number"
                            min={0}
                            className={inputClass}
                            value={form.hoursToComplete}
                            onChange={(e) => setForm({ ...form, hoursToComplete: e.target.value })}
                        />
                        {errors.hoursToComplete && <p className={errorClass}>{errors.hoursToComplete}</p>}
                    </div>

                    <div>
                        <label className={labelClass}>Status</label>
                        <select
                            className={inputClass}
                            value={form.status}
                            onChange={(e) => setForm({ ...form, status: e.target.value as gameType["status"] })}
                        >
                            {STATUSES.map((s) => (
                                <option key={s} value={s}>
                                    {s}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className={labelClass}>Image URLs (comma separated)</label>
                        <input
                            className={inputClass}
                            value={form.image}
                            onChange={(e) => setForm({ ...form, image: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className={labelClass}>Price</label>
                        <input
                            type="number"
                            min={0}
                            step="0.01"
                            className={inputClass}
                            value={form.price}
                            onChange={(e) => setForm({ ...form, price: e.target.value })}
                        />
                        {errors.price && <p className={errorClass}>{errors.price}</p>}
                    </div>

                    <div className="flex justify-end gap-2 mt-4">
                        <button
                            type="button"
                            onClick={closeModal}
                            className="px-4 py-2 rounded-md border border-border transition-[background-color,transform] duration-150 ease-out hover:bg-white/10 active:scale-[0.97]"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 rounded-md bg-paper text-ink font-semibold transition-[opacity,transform] duration-150 ease-out hover:opacity-80 active:scale-[0.97]"
                        >
                            {editingId ? "Save" : "Add"}
                        </button>
                    </div>
                </form>
            </dialog>
        </div>
    );
}
