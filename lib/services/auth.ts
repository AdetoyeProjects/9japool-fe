import { apiClient } from '@/lib/config/axios-instance'
import { handleAxiosError } from '@/lib/config/axios-error'
import { API_ENDPOINTS } from '@/lib/constants/api'
import type {
  SignInRequest,
  SignUpRequest,
  AuthResponse,
  VerifyEmailRequest,
  RequestVerificationRequest,
  GoogleAuthRequest,
} from '@/lib/types/auth'

export class AuthService {
  async signIn(credentials: SignInRequest): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>(
        API_ENDPOINTS.AUTH.SIGNIN,
        {
          email: credentials.email,
          password: credentials.password,
        }
      )

      if (response.data) {
        this.storeTokens(response.data.tokens)
        return response.data
      }

      throw new Error('Sign in failed')
    } catch (error: any) {
      const apiError = handleAxiosError(error)
      throw new Error(apiError.message)
    }
  }

  async signUp(userData: SignUpRequest): Promise<AuthResponse> {
    try {
      const { agreeToTerms, agreeToMarketing, ...signUpData } = userData

      const apiPayload = {
        email: signUpData.email,
        password: signUpData.password,
        referralCode: signUpData.referralCode || '',
      }

      const response = await apiClient.post<AuthResponse>(
        API_ENDPOINTS.AUTH.SIGNUP,
        apiPayload
      )

      if (response.data) {
        return response.data
      }

      throw new Error('Sign up failed')
    } catch (error: any) {
      console.error('Signup error:', error.message)

      const apiError = handleAxiosError(error)
      throw new Error(apiError.message)
    }
  }

  async signOut(): Promise<void> {
    try {
      await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT)
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      this.clearTokens()
    }
  }

  async forgotPassword(email: string): Promise<void> {
    try {
      await apiClient.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, {
        email,
      })
    } catch (error: any) {
      const apiError = handleAxiosError(error)
      throw new Error(apiError.message)
    }
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    try {
      await apiClient.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, {
        token,
        password: newPassword,
      })
    } catch (error: any) {
      const apiError = handleAxiosError(error)
      throw new Error(apiError.message)
    }
  }

  async requestEmailVerification(
    data: RequestVerificationRequest
  ): Promise<void> {
    try {
      await apiClient.post(API_ENDPOINTS.AUTH.REQUEST_VERIFICATION, {
        email: data.email,
      })
    } catch (error: any) {
      const apiError = handleAxiosError(error)
      throw new Error(apiError.message)
    }
  }

  async verifyEmail(data: VerifyEmailRequest): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>(
        API_ENDPOINTS.AUTH.VERIFY_EMAIL,
        {
          email: data.email,
          code: data.token,
        }
      )

      if (response.data) {
        this.storeTokens(response.data.tokens)
        return response.data
      }

      throw new Error('Email verification failed')
    } catch (error: any) {
      const apiError = handleAxiosError(error)
      throw new Error(apiError.message)
    }
  }

  async googleSignIn(data: GoogleAuthRequest): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>(
        API_ENDPOINTS.AUTH.TOKEN_SIGN_IN,
        {
          code: data.code,
          email: data.email,
        }
      )

      if (response.data) {
        this.storeTokens(response.data.tokens)
        return response.data
      }

      throw new Error('Google sign in failed')
    } catch (error: any) {
      const apiError = handleAxiosError(error)
      throw new Error(apiError.message)
    }
  }

  initiateGoogleAuth(): void {
    const baseURL = process.env.NEXT_PUBLIC_API_URL
    if (typeof window === 'undefined') return
    window.location.href = `${baseURL}${API_ENDPOINTS.AUTH.GOOGLE}`
  }

  private storeTokens(tokens: {
    accessToken: string
    refreshToken: string
  }): void {
    if (typeof window === 'undefined') return

    if (!tokens || !tokens.accessToken || !tokens.refreshToken) {
      console.warn('Invalid tokens provided to storeTokens:', tokens)
      return
    }

    localStorage.setItem('auth_token', tokens.accessToken)
    localStorage.setItem('refresh_token', tokens.refreshToken)
  }

  private clearTokens(): void {
    if (typeof window === 'undefined') return

    localStorage.removeItem('auth_token')
    localStorage.removeItem('refresh_token')
  }

  getStoredToken(): string | null {
    if (typeof window === 'undefined') return null
    return localStorage.getItem('auth_token')
  }

  isAuthenticated(): boolean {
    return !!this.getStoredToken()
  }
}

export const authService = new AuthService()
