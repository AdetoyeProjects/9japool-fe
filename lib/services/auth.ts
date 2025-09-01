import { apiClient } from "@/lib/config/axios-instance"
import { handleAxiosError } from "@/lib/config/axios-error"
import { API_ENDPOINTS } from "@/lib/constants/api"
import type {
  SignInRequest,
  SignUpRequest,
  AuthResponse,
  VerifyEmailRequest,
  RequestVerificationRequest,
} from "@/lib/types/auth"

export class AuthService {
  async signIn(credentials: SignInRequest): Promise<AuthResponse> {
    try {
      const response = await apiClient.post<AuthResponse>(API_ENDPOINTS.AUTH.SIGNIN, {
        email: credentials.email,
        userName: credentials.userName || "",
        password: credentials.password,
      })

      if (response.data) {
        this.storeTokens(response.data.tokens)
        return response.data
      }

      throw new Error("Sign in failed")
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
        name: "", // Required by API but not collected in form
        userName: "", // Required by API but not collected in form
        password: signUpData.password,
        referralCode: signUpData.referralCode || "",
      }

      console.log("[v0] Signup API URL:", API_ENDPOINTS.AUTH.SIGNUP)
      console.log("[v0] Signup payload:", apiPayload)

      const response = await apiClient.post<AuthResponse>(API_ENDPOINTS.AUTH.SIGNUP, apiPayload)

      console.log("[v0] Signup response:", response.data)

      if (response.data) {
        this.storeTokens(response.data.tokens)
        return response.data
      }

      throw new Error("Sign up failed")
    } catch (error: any) {
      console.log("[v0] Signup error details:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        config: {
          url: error.config?.url,
          method: error.config?.method,
          data: error.config?.data,
        },
      })

      const apiError = handleAxiosError(error)
      throw new Error(apiError.message)
    }
  }

  async signOut(): Promise<void> {
    try {
      await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT)
    } catch (error) {
      console.error("Logout error:", error)
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

  async requestEmailVerification(data: RequestVerificationRequest): Promise<void> {
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
      const response = await apiClient.post<AuthResponse>(API_ENDPOINTS.AUTH.VERIFY_EMAIL, {
        email: data.email,
        token: data.token,
      })

      if (response.data) {
        this.storeTokens(response.data.tokens)
        return response.data
      }

      throw new Error("Email verification failed")
    } catch (error: any) {
      const apiError = handleAxiosError(error)
      throw new Error(apiError.message)
    }
  }

  private storeTokens(tokens: { accessToken: string; refreshToken: string }): void {
    if (typeof window === "undefined") return

    localStorage.setItem("auth_token", tokens.accessToken)
    localStorage.setItem("refresh_token", tokens.refreshToken)
  }

  private clearTokens(): void {
    if (typeof window === "undefined") return

    localStorage.removeItem("auth_token")
    localStorage.removeItem("refresh_token")
  }

  getStoredToken(): string | null {
    if (typeof window === "undefined") return null
    return localStorage.getItem("auth_token")
  }

  isAuthenticated(): boolean {
    return !!this.getStoredToken()
  }
}

export const authService = new AuthService()
