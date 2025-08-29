import type { GameCategory } from "@/lib/types/game"
import { Flame, Gem, Trophy, Zap, Crown, Star } from "lucide-react"

export const gameCategories = [
  {
    id: "starter",
    title: "Starter Pack",  
    icon: Flame, // 🔥
    stake: "NGN 250",
    toWin: "NGN 50,000",
    minStake: "NGN 250",
    winRatio: "700x",
    bgColor: "bg-gradient-to-r from-[#DC2626] to-[#991B1B]",
    winColor: "text-yellow-400",
    buttonIcon: Zap, // ⚡
  },
  {
    id: "premium",
    title: "Premium Pack",
    icon: Gem, // 💎
    stake: "NGN 300",
    toWin: "NGN 200,000",
    minStake: "NGN 300",
    winRatio: "667x",
    bgColor: "bg-gradient-to-r from-[#16A34A] to-[#166534]",
    winColor: "text-orange-400",
    buttonIcon: Crown, // 👑
  },
  {
    id: "vip",
    title: "VIP Pack",
    icon: Trophy, // 🏆
    stake: "NGN 500",
    toWin: "NGN 500,000",
    minStake: "NGN 500",
    winRatio: "1000x",
    bgColor: "bg-gradient-to-r from-[#9333EA] to-[#6B21A8]",
    winColor: "text-yellow-400",
    buttonIcon: Star, // ⭐
  },
] as const satisfies ReadonlyArray<GameCategory>
