import { API_URL } from './app'

export const axiosConfig = {
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
} as const

export const authConfig = {
  tokenKey: 'auth_token',
  refreshTokenKey: 'refresh_token',
} as const
