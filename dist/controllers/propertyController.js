import { createPropertiesDto, updatePropertyReviewDto } from '../dtos/propertyDtos.js';
import { propertyService } from '../services/propertyService.js';
class PropertyController {
    list(_request, response) {
        response.json(propertyService.list());
    }
    async createMany(request, response) {
        const { links } = createPropertiesDto.parse(request.body);
        const properties = await propertyService.createMany(links);
        response.status(201).json(properties);
    }
    updateReview(request, response) {
        const { rating, note } = updatePropertyReviewDto.parse(request.body);
        const property = propertyService.updateReview(Number(request.params.id), rating, note);
        response.json(property);
    }
    delete(request, response) {
        propertyService.delete(Number(request.params.id));
        response.status(204).send();
    }
}
export const propertyController = new PropertyController();
