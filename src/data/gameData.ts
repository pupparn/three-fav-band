import type {gameType} from "@/types/games";

export const gamesData: gameType[] = [
    {
        id: "1",
        name: "Dota 2",
        description: "Dota 2 is a multiplayer online battle arena (MOBA) video game developed and published by Valve.",
        platforms: ["PC"],
        hoursToComplete: 0,
        status: "In Progress",
        image: ["https://cdn.akamai.steamstatic.com/steam/apps/570/header.jpg"],
        price: 0
    },
    {
        id: "2",
        name: "The Witcher 3: Wild Hunt",
        description: "An open-world action RPG following Geralt of Rivia, a monster hunter searching for his adopted daughter.",
        platforms: ["PC", "PlayStation", "Xbox", "Switch"],
        hoursToComplete: 100,
        status: "Completed",
        image: ["https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/292030/ad9240e088f953a84aee814034c50a6a92bf4516/header.jpg?t=1768303991"],
        price: 39.99
    },
    {
        id: "3",
        name: "Elden Ring",
        description: "An action RPG set in the Lands Between, developed by FromSoftware in collaboration with George R. R. Martin.",
        platforms: ["PC", "PlayStation", "Xbox"],
        hoursToComplete: 60,
        status: "In Progress",
        image: ["https://image.api.playstation.com/vulcan/ap/rnd/202108/0410/D8mYIXWja8knuqYlwqcqVpi1.jpg"],
        price: 59.99
    },
    {
        id: "4",
        name: "Stardew Valley",
        description: "A farming simulation RPG where players inherit a run-down farm and build a life in the countryside.",
        platforms: ["PC", "PlayStation", "Xbox", "Switch", "Mobile"],
        hoursToComplete: 50,
        status: "Not Started",
        image: ["https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/413150/capsule_616x353.jpg?t=1786554168","https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPvweSnbsd-8BlP7NpQ7tAUBMmCLsxKXVK_k7x3heYUkmM32ejG0zc-Rpo&s=10"],
        price: 14.99
    },
    {
        id: "5",
        name: "Valorant",
        description: "A free-to-play tactical first-person shooter developed and published by Riot Games.",
        platforms: ["PC"],
        hoursToComplete: 0,
        status: "In Progress",
        image: ["https://www.riotgames.com/darkroom/1440/8d5c497da1c2eeec8cffa99b01abc64b:5329ca773963a5b739e98e715957ab39/ps-f2p-val-console-launch-16x9.jpg"],
        price: 0
    }
]