/**
 * Base API service client template
 */

export interface ApiResponse<T> {
  data: T | null
  error: string | null
  status: number
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.example.com'

export async function apiClient<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    })

    if (!response.ok) {
      return {
        data: null,
        error: `HTTP Error ${response.status}: ${response.statusText}`,
        status: response.status
      }
    }

    const data = await response.json()
    return {
      data,
      error: null,
      status: response.status
    }
  } catch (err) {
    return {
      data: null,
      error: err instanceof Error ? err.message : 'Unknown network error',
      status: 500
    }
  }
}
