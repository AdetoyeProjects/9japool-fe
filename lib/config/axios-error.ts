import type { AxiosError } from 'axios'

export interface ApiError {
  message: string
  status?: number
  code?: string
  details?: any
}

export const handleAxiosError = (error: AxiosError): ApiError => {
  if (error.response) {
    // Server responded with error status
    const { status, data } = error.response

    const errorMessage =
      (data as any)?.error || (data as any)?.message || 'An error occurred'

    const statusCode = (data as any)?.statusCode || status

    return {
      message: errorMessage,
      status: statusCode,
      code: (data as any)?.code,
      details: data,
    }
  } else if (error.request) {
    // Request was made but no response received
    return {
      message: 'Network error. Please check your connection.',
      status: 0,
    }
  } else {
    // Something else happened
    return {
      message: error.message || 'An unexpected error occurred',
    }
  }
}

export const isNetworkError = (error: AxiosError): boolean => {
  return !error.response && !!error.request
}

export const isServerError = (error: AxiosError): boolean => {
  return error.response?.status ? error.response.status >= 500 : false
}

export const isClientError = (error: AxiosError): boolean => {
  return error.response?.status
    ? error.response.status >= 400 && error.response.status < 500
    : false
}
