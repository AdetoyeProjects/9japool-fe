"use client"

import { useState, useEffect } from "react"
import Header from "@/components/layout/header"
import HowItWorks from "@/components/layout/how-it-works"
import PromotionalSlideshow from "@/components/layout/promotional-slideshow"
import GameCategories from "@/components/layout/game-categories"
import RecentWinners from "@/components/layout/recent-winners"
import ReferralProgram from "@/components/layout/referral-program"
import TrustFeatures from "@/components/layout/trust-features"
import Footer from "@/components/layout/footer"
import PageLoader from "@/components/common/page-loader"
import AuthModal from "@/components/common/auth-modal"
import VerifyEmailModal from '@/components/common/verify-email-modal'
import { useAuth } from "@/lib/providers/auth-provider"




export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)
  const {
    isLoginModalOpen,
    isSignUpModalOpen,
    isVerifyEmailModalOpen,
    verificationEmail,
    closeLoginModal,
    closeSignUpModal,
    closeVerifyEmailModal,
  } = useAuth()

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2500) // Show loader for 2.5 seconds

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <PageLoader isLoading={isLoading} />

      <main className="min-h-screen">
        <Header />
        <HowItWorks />
        <PromotionalSlideshow />
        <GameCategories />
        <RecentWinners />
        <ReferralProgram />
        <TrustFeatures />
        <Footer />

        <AuthModal
          isOpen={isLoginModalOpen}
          onClose={closeLoginModal}
          type="login"
        />
        <AuthModal
          isOpen={isSignUpModalOpen}
          onClose={closeSignUpModal}
          type="signup"
        />
        <VerifyEmailModal
          isOpen={isVerifyEmailModalOpen}
          onClose={closeVerifyEmailModal}
          email={verificationEmail}
        />
      </main>
    </>
  )
}
