import type { AxiosInstance } from 'axios'
import { toast } from 'react-toastify'
import { getAccessToken } from './token'

interface SpotifyErrorResponse {
  error?: {
    message?: string
  }
}

function extractErrorMessage(error: unknown): string {
  if (typeof error === 'object' && error !== null && 'response' in error) {
    const axiosError = error as {
      response?: {
        data?: SpotifyErrorResponse
        statusText?: string
        status?: number
      }
    }

    const message = axiosError.response?.data?.error?.message
    if (message) return message

    const statusText = axiosError.response?.statusText
    if (statusText) return statusText
  }

  return 'An unexpected error occurred'
}

function isHttpError(error: unknown): boolean {
  if (typeof error !== 'object' || error === null || !('response' in error)) {
    return false
  }
  const axiosError = error as { response?: { status?: number } }
  const status = axiosError.response?.status
  return typeof status === 'number' && status >= 300
}

export function setupInterceptors(instance: AxiosInstance): void {
  instance.interceptors.request.use(async (config) => {
    const token = await getAccessToken()
    config.headers.Authorization = `Bearer ${token}`
    return config
  })

  instance.interceptors.response.use(
    (response) => response,
    (error: unknown) => {
      if (isHttpError(error)) {
        const message = extractErrorMessage(error)
        toast.error(message)
      }
      return Promise.reject(error)
    },
  )
}
