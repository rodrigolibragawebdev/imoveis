import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:5177/api',
  timeout: 60_000,
  headers: { 'Content-Type': 'application/json' },
})

export function getApiError(error: unknown) {
  if (axios.isAxiosError<{ message?: string; errorId?: string }>(error)) {
    const message = error.response?.data?.message ?? 'Não foi possível conversar com a API.'
    const errorId = error.response?.data?.errorId
    return errorId ? `${message} Código do erro: ${errorId}.` : message
  }
  return 'Ocorreu um erro inesperado.'
}
