import { createCategoryDto, createFurnitureDto, furnitureQueryDto } from '../dtos/furnitureDtos.js';
import { furnitureService } from '../services/furnitureService.js';
class FurnitureController {
    listCategories(_request, response) {
        response.json(furnitureService.listCategories());
    }
    createCategory(request, response) {
        const { name, color } = createCategoryDto.parse(request.body);
        response.status(201).json(furnitureService.createCategory(name, color));
    }
    listItems(request, response) {
        const { categoryId, sort } = furnitureQueryDto.parse(request.query);
        response.json(furnitureService.listItems(categoryId, sort));
    }
    async createItem(request, response) {
        const input = createFurnitureDto.parse(request.body);
        response.status(201).json(await furnitureService.createItem(input));
    }
    deleteItem(request, response) {
        furnitureService.deleteItem(Number(request.params.id));
        response.status(204).send();
    }
}
export const furnitureController = new FurnitureController();
