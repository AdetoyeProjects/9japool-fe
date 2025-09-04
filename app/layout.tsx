import type React from "react"
import { Manrope } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { metadata } from "@/lib/config/app"

import PageLoader from '@/components/common/page-loader'
import { NavigationLoaderProvider } from '@/lib/providers/navigation-loader-provider'
import { AuthProvider } from "@/lib/providers/auth-provider"
import { QueryProvider } from "@/lib/providers/query-provider"
import { Suspense } from "react"
import "./globals.css"

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
})

export { metadata }

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${manrope.className}`}>
        <QueryProvider>
          <AuthProvider>
            <NavigationLoaderProvider>
              <Suspense fallback={<PageLoader isLoading={true} />}>
                {children}
              </Suspense>
              <PageLoader />
            </NavigationLoaderProvider>
          </AuthProvider>
        </QueryProvider>
        <Analytics />
      </body>
    </html>
  )
}

