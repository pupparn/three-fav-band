export type Band ={
    name: string;
    image ?: string;
    description: string;
    members: { name: string; image?: string }[];
    socialLinks: {
        facebook?: string;
        twitter?: string;
        instagram?: string;
        youtube?: string;
    };
    topMusic: string[];
    latestAlbum: {
        title: string;
        releaseDate: string;
        trackList: string[];
    };
    followers: number;
}