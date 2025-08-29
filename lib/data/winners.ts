import type { Winner } from "@/lib/types/winner"

export const recentWinners: Winner[] = [
  {
    id: "1",
    player: {
      name: "ChampionBoy",
      avatar: "/assets/images/profile-1.png",
    },
    gameId: "#9JP001234",
    stake: 250,
    winnings: 50000,
    time: "2 mins ago",
    winType: "trophy",
  },
  {
    id: "2",
    player: {
      name: "LuckyQueen",
      avatar: "/assets/images/profile-2.png",
    },
    gameId: "#9JP001233",
    stake: 300,
    winnings: 200000,
    time: "15 mins ago",
    winType: "trophy",
  },
  {
    id: "3",
    player: {
      name: "WinnerMan",
      avatar: "/assets/images/profile-3.png",
    },
    gameId: "#9JP001232",
    stake: 500,
    winnings: 500000,
    time: "1 hour ago",
    winType: "crown",
  },
]
