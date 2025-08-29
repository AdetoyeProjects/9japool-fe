import type { TrustFeature } from "@/lib/types/trust-feature"

export const trustFeatures: TrustFeature[] = [
  {
    id: "licensed",
    title: "Licensed & Regulated",
    description: "Fully licensed by relevant authorities",
    icon: "shield-check",
    color: "bg-red-500",
  },
  {
    id: "withdrawals",
    title: "Instant Withdrawals",
    description: "Get your winnings instantly",
    icon: "clock",
    color: "bg-yellow-500",
  },
  {
    id: "support",
    title: "24/7 Support",
    description: "We're here to help anytime",
    icon: "headphones",
    color: "bg-blue-500",
  },
  {
    id: "payments",
    title: "Secure Payments",
    description: "Safe and encrypted transactions",
    icon: "credit-card",
    color: "bg-purple-500",
  },
]
