'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react'

interface AuthContextType {
  isLoginModalOpen: boolean
  isSignUpModalOpen: boolean
  isVerifyEmailModalOpen: boolean
  verificationEmail: string
  openLoginModal: () => void
  closeLoginModal: () => void
  openSignUpModal: () => void
  closeSignUpModal: () => void
  openVerifyEmailModal: () => void
  closeVerifyEmailModal: () => void
  setVerificationEmail: (email: string) => void
  closeModal: () => void
  switchToSignUp: () => void
  switchToLogin: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false)
  const [isVerifyEmailModalOpen, setIsVerifyEmailModalOpen] = useState(false)
  const [verificationEmail, setVerificationEmailState] = useState('')

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

  const openVerifyEmailModal = () => {
    setIsLoginModalOpen(false)
    setIsSignUpModalOpen(false)
    setIsVerifyEmailModalOpen(true)
  }

  const closeVerifyEmailModal = () => {
    setIsVerifyEmailModalOpen(false)
    setVerificationEmailState('')
  }

  const setVerificationEmail = (email: string) => {
    setVerificationEmailState(email)
  }

  const closeModal = () => {
    setIsLoginModalOpen(false)
    setIsSignUpModalOpen(false)
    setIsVerifyEmailModalOpen(false)
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
        isVerifyEmailModalOpen,
        verificationEmail,
        openLoginModal,
        closeLoginModal,
        openSignUpModal,
        closeSignUpModal,
        openVerifyEmailModal,
        closeVerifyEmailModal,
        setVerificationEmail,
        closeModal,
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
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
