export interface User {
  id: string
  email: string
  userName?: string
  firstName?: string
  lastName?: string
  phone?: string
  isEmailVerified: boolean
  createdAt: string
  updatedAt: string
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
  expiresIn: number
}

export interface SignInRequest {
  email: string
  userName?: string
  password: string
}

export interface SignUpRequest {
  email: string
  password: string
  userName?: string
  firstName?: string
  lastName?: string
  phone?: string
  referralCode?: string
  agreeToTerms: boolean
  agreeToMarketing: boolean
}

export interface AuthResponse {
  user: User
  tokens: AuthTokens
  message: string
}

export interface ApiError {
  message: string
  code?: string
  details?: Record<string, any>
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: ApiError
  message?: string
}

export interface RequestVerificationRequest {
  email: string
}

export interface VerifyEmailRequest {
  email: string
  token: string
}
