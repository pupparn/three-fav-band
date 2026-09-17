export type gameType = {
    id: string;
    name: string;
    description ?: string;
    platforms: string[];
    hoursToComplete: number;
    status: "Not Started" | "In Progress" | "Completed";
    image ?: string[];
    price: number;
}