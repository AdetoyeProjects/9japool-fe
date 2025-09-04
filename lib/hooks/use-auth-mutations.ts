'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { authService } from '@/lib/services/auth'
import { useAuthStore } from '@/lib/store/auth'
import type {
  SignInRequest,
  SignUpRequest,
  VerifyEmailRequest,
  RequestVerificationRequest,
} from '@/lib/types/auth'
import { useAuth } from '@/lib/providers/auth-provider'
import { useRouter } from 'next/navigation'

export function useSignInMutation() {
  const queryClient = useQueryClient()
  const { setUser, setLoading, setShowLoader } = useAuthStore()
  const { closeLoginModal } = useAuth()
  const router = useRouter()

  return useMutation({
    mutationFn: (credentials: SignInRequest) => authService.signIn(credentials),
    onMutate: () => {
      setLoading(true)
    },
    onSuccess: (data) => {
      setUser(data.user)
      closeLoginModal()
      setShowLoader(true)
      queryClient.invalidateQueries({ queryKey: ['user'] })

      setTimeout(() => {
        setShowLoader(false)
        setLoading(false)
        router.push('/sports')
      }, 2000)
    },
    onError: (error) => {
      console.error('Sign in error:', error)
    },
    onSettled: () => {
      setLoading(false)
    },
  })
}

export function useSignUpMutation() {
  const queryClient = useQueryClient()
  const { setLoading } = useAuthStore()
  const { closeSignUpModal, openVerifyEmailModal, setVerificationEmail } =
    useAuth()

  return useMutation({
    mutationFn: (userData: SignUpRequest) => authService.signUp(userData),
    onMutate: () => {
      setLoading(true)
    },
    onSuccess: (data, variables) => {
      closeSignUpModal()
      setVerificationEmail(variables.email)
      openVerifyEmailModal()
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
    onError: (error) => {
      console.error('Sign up error:', error)
    },
    onSettled: () => {
      setLoading(false)
    },
  })
}

export function useSignOutMutation() {
  const queryClient = useQueryClient()
  const { signOut: signOutStore, setLoading } = useAuthStore()

  return useMutation({
    mutationFn: () => authService.signOut(),
    onMutate: () => {
      setLoading(true)
    },
    onSuccess: () => {
      signOutStore()
      queryClient.clear()
    },
    onError: (error) => {
      console.error('Sign out error:', error)
    },
    onSettled: () => {
      setLoading(false)
    },
  })
}

export function useForgotPasswordMutation() {
  return useMutation({
    mutationFn: (email: string) => authService.forgotPassword(email),
    onError: (error) => {
      console.error('Forgot password error:', error)
    },
  })
}

export function useRequestVerificationMutation() {
  return useMutation({
    mutationFn: (data: RequestVerificationRequest) =>
      authService.requestEmailVerification(data),
    onError: (error) => {
      console.error('Request verification error:', error)
    },
  })
}

export function useVerifyEmailMutation() {
  const queryClient = useQueryClient()
  const { setUser, setLoading, setShowLoader } = useAuthStore()
  const { closeVerifyEmailModal } = useAuth()
  const router = useRouter()

  return useMutation({
    mutationFn: (data: VerifyEmailRequest) => authService.verifyEmail(data),
    onMutate: () => {
      setLoading(true)
    },
    onSuccess: (data) => {
      setUser(data.user)
      closeVerifyEmailModal()
      setShowLoader(true)
      queryClient.invalidateQueries({ queryKey: ['user'] })

      setTimeout(() => {
        setShowLoader(false)
        setLoading(false)
        router.push('/sports')
      }, 4000)
    },
    onError: (error) => {
      console.error('Verify email error:', error)
    },
    onSettled: () => {
      setLoading(false)
    },
  })
}
