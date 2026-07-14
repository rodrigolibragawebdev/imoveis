import type { Request, Response } from 'express'
import { createPropertiesDto, updatePropertyReviewDto } from '../dtos/propertyDtos.js'
import { propertyService } from '../services/propertyService.js'

class PropertyController {
  list(_request: Request, response: Response) {
    response.json(propertyService.list())
  }

  async createMany(request: Request, response: Response) {
    const { links } = createPropertiesDto.parse(request.body)
    const properties = await propertyService.createMany(links)
    response.status(201).json(properties)
  }

  updateReview(request: Request, response: Response) {
    const { rating, note } = updatePropertyReviewDto.parse(request.body)
    const property = propertyService.updateReview(Number(request.params.id), rating, note)
    response.json(property)
  }

  delete(request: Request, response: Response) {
    propertyService.delete(Number(request.params.id))
    response.status(204).send()
  }
}

export const propertyController = new PropertyController()

