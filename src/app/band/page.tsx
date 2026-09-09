"use client";

import { useState } from "react";
import BandCard from "../../components/bandCard";
import NavBar from "../../components/navBar";
import Footer from "../../components/footer";
import { bandData } from "@/data/bandData";

export default function BandPage() {
  const [active, setActive] = useState(0);
  const band = bandData[active];

  return (
    <div className="min-h-screen bg-[#1a1817] text-[#f5ead8]">
      <NavBar active={active} onSelect={setActive} />

      <BandCard {...band} />

      <Footer />
    </div>
  );
}
