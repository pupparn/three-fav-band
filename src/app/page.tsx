"use client";

import { useState } from "react";
import Link from "next/link";
import BandCard from "../components/bandCard";
import Footer from "../components/footer";
import { bandData } from "@/data/bandData";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [subscribed, setSubscribed] = useState<Record<string, boolean>>({});
  const [likes, setLikes] = useState<Record<string, number>>({});

  const subscribedCount = Object.values(subscribed).filter(Boolean).length;

  const filteredBands = bandData.filter((band) =>
    band.description.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
    band.name.toLowerCase().includes(searchTerm.trim().toLowerCase()) ||
    band.members.some((member) =>
      member.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
    )
  );
  const toggleSubscribe = (name: string) => {
    setSubscribed((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const addLike = (name: string) => {
    setLikes((prev) => ({ ...prev, [name]: (prev[name] ?? 0) + 1 }));
  };

  const resetAll = () => {
    setSearchTerm("");
    setSubscribed({});
    setLikes({});
  };

  const heading = "font-[family-name:var(--font-caprasimo)] font-normal text-paper";
  const pillOutline =
    "bg-transparent text-paper-dim border border-border-strong hover:brightness-110";

  return (
    <div className="min-h-screen bg-ink text-paper">
      <header className="flex flex-wrap items-center justify-between gap-6 px-6 py-6 md:px-12 border-b border-border">
        <div className="flex items-baseline gap-3">
          <span className={`${heading} text-2xl tracking-tight`}>Three Fav Bands</span>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span
            key={subscribedCount}
            className="bump px-4.5 py-2.5 rounded-full bg-ink-raised text-sm font-semibold text-accent"
          >
            {subscribedCount} subscribed
          </span>
          <Link href="/games/" className={`px-6 py-2.5 rounded-full text-[15px] font-semibold transition-colors ${pillOutline}`}>
            Browse games page
          </Link>

          <Link href="/band/" className={`px-6 py-2.5 rounded-full text-[15px] font-semibold transition-colors ${pillOutline}`}>
            Browse band pages
          </Link>
          <button
            type="button"
            onClick={resetAll}
            className={`px-6 py-2.5 rounded-full text-[15px] font-semibold transition-colors ${pillOutline}`}
          >
            Reset
          </button>
        </div>
      </header>

      <div className="max-w-[1180px] mx-auto px-6 md:px-12 pt-10">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search bands by name..."
          className="w-full max-w-md rounded-full bg-ink-raised px-5 py-3 text-paper placeholder:text-paper-faint outline-none border border-border focus:border-accent"
        />
      </div>

      {filteredBands.length === 0 ? (
        <div className="max-w-[1180px] mx-auto px-6 md:px-12 py-24 text-center text-paper-muted">
          No bands found for &ldquo;{searchTerm}&rdquo;.
        </div>
      ) : (
        filteredBands.map((band, index) => (
          <div key={band.name} className={index > 0 ? "border-t border-border" : ""}>
            <div className="max-w-[1180px] mx-auto px-6 md:px-12 pt-10 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => toggleSubscribe(band.name)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-[background-color,border-color,color,transform] duration-150 [transition-timing-function:var(--ease-out)] active:scale-95 ${subscribed[band.name]
                  ? "bg-accent text-accent-ink border border-accent"
                  : pillOutline
                  }`}
              >
                {subscribed[band.name] ? "Unsubscribe" : "Subscribe"}
              </button>
              <button
                type="button"
                onClick={() => addLike(band.name)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-transform duration-150 [transition-timing-function:var(--ease-out)] active:scale-95 ${pillOutline}`}
              >
                ♥ <span key={likes[band.name] ?? 0} className="bump inline-block">{likes[band.name] ?? 0}</span> likes
              </button>
            </div>
            <BandCard {...band} />
          </div>
        ))
      )}

      <Footer />
    </div>
  );
}
