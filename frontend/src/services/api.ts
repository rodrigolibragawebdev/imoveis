import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:5177/api',
  timeout: 60_000,
  headers: { 'Content-Type': 'application/json' },
})

export function getApiError(error: unknown) {
  if (axios.isAxiosError<{ message?: string }>(error)) {
    return error.response?.data?.message ?? 'Não foi possível conversar com a API.'
  }
  return 'Ocorreu um erro inesperado.'
}
