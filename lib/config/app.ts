import type { Metadata } from "next"

export const appConfig = {
  name: "9jaPool",
  description: "Nigeria's most trusted online lottery platform",
  url: "https://9japool.com",
  ogImage: "/assets/icons/9japool.png",
} as const

export const metadata: Metadata = {
  title: {
    default: appConfig.name,
    template: `%s | ${appConfig.name}`,
  },
  description: appConfig.description,
  keywords: ["lottery", "Nigeria", "gaming", "win", "stake", "pool"],
  authors: [{ name: "9jaPool Team" }],
  creator: "9jaPool",
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: appConfig.url,
    title: appConfig.name,
    description: appConfig.description,
    siteName: appConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: appConfig.name,
    description: appConfig.description,
    creator: "@9japool",
  },
}
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL

export const API_CONFIG = {
  baseURL: API_URL,
  timeout: 10000,
} as const

