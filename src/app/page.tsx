"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import BandCard from "../components/bandCard";
import Footer from "../components/footer";
import { bandData } from "@/data/bandData";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [subscribed, setSubscribed] = useState<Record<string, boolean>>({});
  const [likes, setLikes] = useState<Record<string, number>>({});

  const subscribedCount = useMemo(
    () => Object.values(subscribed).filter(Boolean).length,
    [subscribed]
  );

  const filteredBands = useMemo(
    () =>
      bandData.filter((band) =>
        band.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
      ),
    [searchTerm]
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

  const heading = "font-[family-name:var(--font-caprasimo)] font-normal text-[#f5ead8]";

  return (
    <div className="min-h-screen bg-[#1a1817] text-[#f5ead8]">
      <header className="flex flex-wrap items-center justify-between gap-6 px-6 py-6 md:px-12 border-b border-[rgba(245,234,216,0.12)]">
        <div className="flex items-baseline gap-3">
          <span className={`${heading} text-2xl tracking-tight`}>Three Fav Bands</span>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <span className="px-4.5 py-2.5 rounded-full bg-[#2a2724] text-sm font-semibold text-[#f6a06b]">
            {subscribedCount} subscribed
          </span>
          <Link
            href="/band/"
            className="px-6 py-2.5 rounded-full text-[15px] font-semibold transition-colors bg-transparent text-[#dcd3c4] border border-[rgba(245,234,216,0.22)] hover:brightness-110"
          >
            Browse band pages
          </Link>
          <button
            type="button"
            onClick={resetAll}
            className="px-6 py-2.5 rounded-full text-[15px] font-semibold transition-colors bg-transparent text-[#dcd3c4] border border-[rgba(245,234,216,0.22)] hover:brightness-110"
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
          className="w-full max-w-md rounded-full bg-[#2a2724] px-5 py-3 text-[#f5ead8] placeholder:text-[#82796a] outline-none border border-[rgba(245,234,216,0.12)] focus:border-[#f6a06b]"
        />
      </div>

      {filteredBands.length === 0 ? (
        <div className="max-w-[1180px] mx-auto px-6 md:px-12 py-24 text-center text-[#a19786]">
          No bands found for &ldquo;{searchTerm}&rdquo;.
        </div>
      ) : (
        filteredBands.map((band, index) => (
          <div
            key={band.name}
            className={index > 0 ? "border-t border-[rgba(245,234,216,0.12)]" : ""}
          >
            <div className="max-w-[1180px] mx-auto px-6 md:px-12 pt-10 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => toggleSubscribe(band.name)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-colors ${
                  subscribed[band.name]
                    ? "bg-[#f6a06b] text-[#241a12] border border-[#f6a06b]"
                    : "bg-transparent text-[#dcd3c4] border border-[rgba(245,234,216,0.22)] hover:brightness-110"
                }`}
              >
                {subscribed[band.name] ? "Unsubscribe" : "Subscribe"}
              </button>
              <button
                type="button"
                onClick={() => addLike(band.name)}
                className="px-5 py-2.5 rounded-full text-sm font-semibold bg-transparent text-[#dcd3c4] border border-[rgba(245,234,216,0.22)] hover:brightness-110"
              >
                ♥ {likes[band.name] ?? 0} likes
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
