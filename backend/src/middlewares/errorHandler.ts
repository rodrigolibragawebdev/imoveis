import type { ErrorRequestHandler } from 'express'
import { ZodError } from 'zod'
import { AppError } from '../errors/AppError.js'

export const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  if (error instanceof ZodError) {
    response.status(422).json({
      message: 'Confira os dados informados',
      issues: error.issues.map((issue) => ({ path: issue.path.join('.'), message: issue.message })),
    })
    return
  }

  if (error instanceof AppError) {
    response.status(error.statusCode).json({ message: error.message, details: error.details })
    return
  }

  if (error instanceof Error && error.message.includes('UNIQUE constraint failed')) {
    response.status(409).json({ message: 'Este registro já existe' })
    return
  }

  console.error(error)
  response.status(500).json({ message: 'Não foi possível concluir a operação' })
}

