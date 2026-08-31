import type { Band } from "../types/band";

export default function BandCard({
    name,
    image,
    description,
    members,
    socialLinks,
    topMusic,
    latestAlbum,
    followers,
}: Band) {
    const followerLabel = new Intl.NumberFormat("en", { notation: "compact" }).format(followers);
    const heading = "font-[family-name:var(--font-caprasimo)] font-normal text-[#f5ead8]";

    return (
        <main className="flex flex-col gap-[72px] max-w-[1180px] mx-auto px-6 py-14 md:px-12 md:py-24">
            <section className="grid gap-12 items-center md:grid-cols-[1.05fr_1fr]">
                <div className="relative aspect-[4/3] rounded-[28px] overflow-hidden bg-[#2a2724]">
                    {image && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={image} alt={name} className="w-full h-full object-cover" />
                    )}
                </div>
                <div className="flex flex-col gap-5 items-start">
                    <h1 className={`${heading} text-5xl md:text-6xl leading-[1.04] tracking-tight m-0`}>{name}</h1>
                    <p className="m-0 max-w-[52ch] text-lg text-[#dcd3c4]">{description}</p>
                    <div className="flex items-baseline gap-3 rounded-full bg-[#2a2724] px-5 py-3.5">
                        <span className={`${heading} text-3xl text-[#f6a06b]`}>{followerLabel}</span>
                        <span className="text-[13px] tracking-[0.12em] uppercase text-[#a19786]">followers</span>
                    </div>
                    <div className="flex flex-wrap gap-2.5">
                        {Object.entries(socialLinks).map(([platform, url]) => (
                            <a
                                key={platform}
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4.5 py-2.5 rounded-full border border-[rgba(245,234,216,0.22)] text-[#f5ead8] text-sm font-semibold hover:border-[#f6a06b] hover:text-[#f6a06b]"
                            >
                                {platform.charAt(0).toUpperCase() + platform.slice(1)}
                            </a>
                        ))}
                    </div>
                </div>
            </section>

            <section className="flex flex-col gap-7">
                <h2 className={`${heading} text-[34px] m-0`}>Members</h2>
                <div className="grid gap-7 [grid-template-columns:repeat(auto-fit,minmax(160px,1fr))]">
                    {members.map((member) => (
                        <div key={member.name} className="flex flex-col gap-3.5 items-start">
                            <div className="relative w-full aspect-square rounded-full overflow-hidden bg-[#2a2724] flex items-center justify-center text-2xl text-[#a19786]">
                                {member.image ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                                ) : (
                                    member.name.charAt(0)
                                )}
                            </div>
                            <div className="text-[17px] font-bold text-[#f5ead8]">{member.name}</div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="grid gap-12 items-start md:grid-cols-2">
                <div className="flex flex-col gap-6">
                    <h2 className={`${heading} text-[34px] m-0`}>Top music</h2>
                    <div className="flex flex-col">
                        {topMusic.map((song, index) => (
                            <div
                                key={song}
                                className="grid grid-cols-[32px_1fr] gap-4 items-center py-4 border-b border-[rgba(245,234,216,0.12)]"
                            >
                                <span className={`${heading} text-lg text-[#aebf92]`}>{index + 1}</span>
                                <span className="text-[17px] font-semibold text-[#f5ead8]">{song}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-6">
                    <h2 className={`${heading} text-[34px] m-0`}>Latest album</h2>
                    <div className="flex flex-col gap-6 rounded-[28px] bg-[#2a2724] p-7">
                        <div>
                            <span className="text-xs tracking-[0.14em] uppercase text-[#aebf92]">Album</span>
                            <div className={`${heading} text-[28px] leading-[1.1] text-[#f5ead8]`}>{latestAlbum.title}</div>
                            <span className="text-sm text-[#a19786]">Released {latestAlbum.releaseDate}</span>
                        </div>
                        <div className="flex flex-col">
                            {latestAlbum.trackList.map((track, index) => (
                                <div
                                    key={track}
                                    className="grid grid-cols-[26px_1fr] gap-3.5 items-center py-2.5 border-t border-[rgba(245,234,216,0.1)]"
                                >
                                    <span className="text-sm text-[#a19786]">{index + 1}</span>
                                    <span className="text-base text-[#f5ead8]">{track}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
