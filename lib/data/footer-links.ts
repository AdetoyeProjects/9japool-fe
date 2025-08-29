import type { FooterSection, SocialLink, ContactInfo } from "@/lib/types/footer"

export const footerSections: FooterSection[] = [
  {
    title: "Games",
    links: [
      { label: "Daily Draw", href: "/games/daily-draw" },
      { label: "Instant Win", href: "/games/instant-win" },
      { label: "Weekly Jackpot", href: "/games/weekly-jackpot" },
      { label: "Special Games", href: "/games/special" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "/support/help" },
      { label: "Contact Us", href: "/support/contact" },
      { label: "FAQs", href: "/support/faqs" },
      { label: "Terms of Service", href: "/support/terms" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/legal/privacy" },
      { label: "Responsible Gaming", href: "/legal/responsible-gaming" },
      { label: "Security", href: "/legal/security" },
      { label: "Compliance", href: "/legal/compliance" },
    ],
  },
]

export const socialLinks: SocialLink[] = [
  { name: "Facebook", href: "https://facebook.com/9japool", icon: "facebook" },
  { name: "X (Twitter)", href: "https://x.com/9japool", icon: "x" },
  { name: "Instagram", href: "https://instagram.com/9japool", icon: "instagram" },
  { name: "Telegram", href: "https://t.me/9japool", icon: "telegram" },
  { name: "YouTube", href: "https://youtube.com/@9japool", icon: "youtube" },
]

export const contactInfo: ContactInfo = {
  telephone: ["07004749930", "09047423340"],
  email: "support@9japool.ng",
}
