import axios from 'axios'
import { axiosConfig } from './axios-config'

export const apiClient = axios.create(axiosConfig)

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      const refreshToken = localStorage.getItem('refresh_token')
      if (refreshToken) {
        try {
          // Attempt to refresh token
          const response = await axios.post(
            `${axiosConfig.baseURL}/auth/refresh`,
            {
              refreshToken,
            }
          )

          const { token } = response.data
          localStorage.setItem('auth_token', token)

          // Retry original request with new token
          originalRequest.headers.Authorization = `Bearer ${token}`
          return apiClient(originalRequest)
        } catch (refreshError) {
          // Refresh failed, clear tokens and redirect to login
          localStorage.removeItem('auth_token')
          localStorage.removeItem('refresh_token')
          window.location.href = '/login'
        }
      }
    }

    return Promise.reject(error)
  }
)
