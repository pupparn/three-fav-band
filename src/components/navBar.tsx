import { bandData } from "@/data/bandData";

type NavBarProps = {
  active: number;
  onSelect: (index: number) => void;
};

export default function NavBar({ active, onSelect }: NavBarProps) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-6 px-6 py-6 md:px-12 border-b border-[rgba(245,234,216,0.12)]">
      <div className="flex items-baseline gap-3">
        <span className="font-[family-name:var(--font-caprasimo)] text-2xl tracking-tight">Three Fav Bands</span>
      </div>
      <nav className="flex gap-2.5">
        {bandData.map((b, i) => (
          <button
            key={b.name}
            type="button"
            onClick={() => onSelect(i)}
            className={`px-6 py-2.5 rounded-full text-[15px] font-semibold transition-colors ${
              i === active
                ? "bg-[#f6a06b] text-[#241a12] border border-[#f6a06b]"
                : "bg-transparent text-[#dcd3c4] border border-[rgba(245,234,216,0.22)] hover:brightness-110"
            }`}
          >
            {b.name}
          </button>
        ))}
      </nav>
    </header>
  );
}
