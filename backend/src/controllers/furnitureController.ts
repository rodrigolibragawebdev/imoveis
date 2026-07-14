import type { Request, Response } from 'express'
import { createCategoryDto, createFurnitureDto, furnitureQueryDto } from '../dtos/furnitureDtos.js'
import { furnitureService } from '../services/furnitureService.js'

class FurnitureController {
  listCategories(_request: Request, response: Response) {
    response.json(furnitureService.listCategories())
  }

  createCategory(request: Request, response: Response) {
    const { name, color } = createCategoryDto.parse(request.body)
    response.status(201).json(furnitureService.createCategory(name, color))
  }

  listItems(request: Request, response: Response) {
    const { categoryId, sort } = furnitureQueryDto.parse(request.query)
    response.json(furnitureService.listItems(categoryId, sort))
  }

  async createItem(request: Request, response: Response) {
    const input = createFurnitureDto.parse(request.body)
    response.status(201).json(await furnitureService.createItem(input))
  }

  deleteItem(request: Request, response: Response) {
    furnitureService.deleteItem(Number(request.params.id))
    response.status(204).send()
  }
}

export const furnitureController = new FurnitureController()

