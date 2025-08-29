"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface AuthContextType {
  isLoginModalOpen: boolean
  isSignUpModalOpen: boolean
  openLoginModal: () => void
  closeLoginModal: () => void
  openSignUpModal: () => void
  closeSignUpModal: () => void
  switchToSignUp: () => void
  switchToLogin: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoginModalOpen(true)
    }, 60000) // 60 seconds

    return () => clearTimeout(timer)
  }, [])

  const openLoginModal = () => {
    setIsSignUpModalOpen(false)
    setIsLoginModalOpen(true)
  }

  const closeLoginModal = () => {
    setIsLoginModalOpen(false)
  }

  const openSignUpModal = () => {
    setIsLoginModalOpen(false)
    setIsSignUpModalOpen(true)
  }

  const closeSignUpModal = () => {
    setIsSignUpModalOpen(false)
  }

  const switchToSignUp = () => {
    setIsLoginModalOpen(false)
    setIsSignUpModalOpen(true)
  }

  const switchToLogin = () => {
    setIsSignUpModalOpen(false)
    setIsLoginModalOpen(true)
  }

  return (
    <AuthContext.Provider
      value={{
        isLoginModalOpen,
        isSignUpModalOpen,
        openLoginModal,
        closeLoginModal,
        openSignUpModal,
        closeSignUpModal,
        switchToSignUp,
        switchToLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
