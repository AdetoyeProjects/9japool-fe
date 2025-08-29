import type { ReferralBenefit } from "@/lib/types/referral"

export const referralBenefits: ReferralBenefit[] = [
  {
    id: "commission",
    title: "10% Commission on Friend's Stakes",
    description: "Earn 10% from every stake your friends make",
    icon: "check",
  },
  {
    id: "unlimited",
    title: "Unlimited Referrals",
    description: "No limit on how many friends you can refer",
    icon: "check",
  },
  {
    id: "instant",
    title: "Instant Wallet Credit",
    description: "Get credited immediately when friends play",
    icon: "check",
  },
  {
    id: "bonus",
    title: "Weekly Bonus Rewards",
    description: "Extra rewards every week for active referrers",
    icon: "check",
  },
]
