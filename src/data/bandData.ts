import type { Band } from "../types/band";

export const bandData: Band[] = [
    {
        name: "NewJeans",
        image: "/image/newjeans.jpg",
        description:
            "South Korean girl group under ADOR (a HYBE sub-label). Debuted July 22, 2022 with the EP 'New Jeans'. Known for their Y2K-inspired, 'girl next door' aesthetic and R&B/pop sound. As of mid-2026 the group operates as a four-member lineup (Danielle's contract with ADOR was terminated in December 2025) following a lengthy contract dispute with ADOR/HYBE that was ultimately resolved in the label's favor by the Seoul court in October 2025.",
        members: [
            { name: "Minji", image: "/image/newjeans-minji.webp" },
            { name: "Hanni", image: "/image/newjeans-hanni.webp" },
            { name: "Danielle", image: "/image/newjeans-danielle.jpeg" },
            { name: "Haerin", image: "/image/newjeans-haerin.webp" },
            { name: "Hyein", image: "/image/newjeans-hyein.webp" },
        ],
        socialLinks: {
            facebook: "https://www.facebook.com/newjeans.official",
            twitter: "https://twitter.com/NewJeans_ADOR",
            instagram: "https://www.instagram.com/newjeans_official",
            youtube: "https://www.youtube.com/@NewJeans_official",
        },
        topMusic: ["Attention", "Hype Boy", "Ditto", "OMG", "Super Shy", "Cookie"],
        latestAlbum: {
            title: "Supernatural",
            releaseDate: "2024-06-21",
            trackList: ["Supernatural", "Right Now"],
        },
        followers: 12000000,
    },
    {
        name: "LE SSERAFIM",
        image: "/image/lesserafim.jpg",
        description:
            "South Korean girl group formed by Source Music, a sub-label of HYBE. Debuted May 2, 2022 with the EP 'Fearless'. Known for their confident, 'fearless' concept and genre-blending pop/rock sound. In 2026 they returned with their second studio album 'PUREFLOW' pt. 1, which debuted at No. 1 on the South Korean Circle Albums Chart, and kicked off their second world tour, also called 'PUREFLOW'.",
        members: [
            { name: "Sakura", image: "/image/lesserafim-sakura.webp" },
            { name: "Kim Chaewon", image: "/image/lesserafim-chaewon.webp" },
            { name: "Huh Yunjin", image: "/image/lesserafim-yunjin.webp" },
            { name: "Kazuha", image: "/image/lesserafim-kazuha.webp" },
            { name: "Hong Eunchae", image: "/image/lesserafim-eunchae.webp" },
        ],
        socialLinks: {
            facebook: "https://www.facebook.com/le.sserafim.official",
            twitter: "https://twitter.com/le_sserafim",
            instagram: "https://www.instagram.com/le_sserafim",
            youtube: "https://www.youtube.com/@LE_SSERAFIM",
        },
        topMusic: ["Fearless", "Antifragile", "Unforgiven", "Perfect Night", "Easy", "Crazy"],
        latestAlbum: {
            title: "PUREFLOW Pt. 1",
            releaseDate: "2026-05-22",
            trackList: [
                "Pureflow",
                "Boompala",
                "Celebration",
                "Creatures",
                "Iffy Iffy",
                "Need Your Company",
                "Sonder",
                "Saki",
                "Irony",
                "Trust Exercise",
                "Liminal Space",
            ],
        },
        followers: 11000000,
    },
    {
        name: "KISS OF LIFE",
        image: "/image/kissoflife.jpg",    
        description:
            "South Korean girl group (also known as KIOF) formed by S2 Entertainment. Debuted July 5, 2023 with the self-titled EP 'Kiss of Life'. Their name reflects the group's ambition to 'breathe new life' into the music industry, with concepts that explore different stages of adolescence and young adulthood. In August 2026 they released their third single album 'SWEAT'.",
        members: [
            { name: "Julie", image: "/image/kissoflife-julie.webp" },
            { name: "Natty", image: "/image/kissoflife-natty.webp" },
            { name: "Belle", image: "/image/kissoflife-belle.webp" },
            { name: "Haneul", image: "/image/kissoflife-haneul.webp" },
        ],
        socialLinks: {
            facebook: "https://www.facebook.com/KISSOFLIFEofficial",
            twitter: "https://twitter.com/KISSOFLIFE_S2",
            instagram: "https://www.instagram.com/kissoflife_s2",
            youtube: "https://www.youtube.com/@KISSOFLIFE_official",
        },
        topMusic: ["Bloom", "Midas Touch", "Sticky", "Get Loud", "Domino"],
        latestAlbum: {
            title: "SWEAT",
            releaseDate: "2026-08-04",
            trackList: ["SWEAT", "WHAT!"],
        },
        followers: 3000000,
    },
    
];
