import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from 'axios'
import { API_CONFIG } from '@/lib/config/app'
import type { ApiResponse } from '@/lib/types/auth'

class ApiService {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: API_CONFIG.baseURL,
      timeout: API_CONFIG.timeout,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    this.setupInterceptors()
  }

  private setupInterceptors() {
    // Request interceptor to add auth token
    this.client.interceptors.request.use(
      (config) => {
        const token = this.getStoredToken()
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    // Response interceptor to handle errors
    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true

          try {
            await this.refreshToken()
            const token = this.getStoredToken()
            if (token) {
              originalRequest.headers.Authorization = `Bearer ${token}`
              return this.client(originalRequest)
            }
          } catch (refreshError) {
            this.clearStoredTokens()
            window.location.href = '/login'
          }
        }

        return Promise.reject(error)
      }
    )
  }

  private getStoredToken(): string | null {
    if (typeof window === 'undefined') return null
    return localStorage.getItem('accessToken')
  }

  private getStoredRefreshToken(): string | null {
    if (typeof window === 'undefined') return null
    return localStorage.getItem('refreshToken')
  }

  private clearStoredTokens(): void {
    if (typeof window === 'undefined') return
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
  }

  private async refreshToken(): Promise<void> {
    const refreshToken = this.getStoredRefreshToken()
    if (!refreshToken) throw new Error('No refresh token available')

    const response = await axios.post(`${API_CONFIG.baseURL}/auth/refresh`, {
      refreshToken,
    })

    const { accessToken, refreshToken: newRefreshToken } =
      response.data.data.tokens

    if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshToken', newRefreshToken)
    }
  }

  async get<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<ApiResponse<T>> = await this.client.get(
        url,
        config
      )
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<ApiResponse<T>> = await this.client.post(
        url,
        data,
        config
      )
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<ApiResponse<T>> = await this.client.put(
        url,
        data,
        config
      )
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  async delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<ApiResponse<T>> = await this.client.delete(
        url,
        config
      )
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  private handleError(error: any): Error {
    if (error.response) {
      const apiError = error.response.data?.error || {
        message: error.response.data?.message || 'An error occurred',
        code: error.response.status.toString(),
      }
      return new Error(apiError.message)
    } else if (error.request) {
      return new Error('Network error. Please check your connection.')
    } else {
      return new Error(error.message || 'An unexpected error occurred')
    }
  }
}

export const apiService = new ApiService()
