import type { Request, Response } from 'express'
import { tipRepository } from '../repositories/tipRepository.js'

class TipController {
  list(_request: Request, response: Response) {
    response.json(tipRepository.findAll())
  }
}

export const tipController = new TipController()

