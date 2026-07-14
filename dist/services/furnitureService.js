import { AppError } from '../errors/AppError.js';
import { furnitureRepository } from '../repositories/furnitureRepository.js';
import { linkPreviewService } from './linkPreviewService.js';
class FurnitureService {
    listCategories() {
        return furnitureRepository.findCategories();
    }
    createCategory(name, color) {
        try {
            return furnitureRepository.createCategory(name, color);
        }
        catch {
            throw new AppError('Já existe uma categoria com esse nome', 409);
        }
    }
    listItems(categoryId, sort) {
        return furnitureRepository.findItems({ categoryId, sort });
    }
    async createItem(input) {
        if (!furnitureRepository.findCategoryById(input.categoryId)) {
            throw new AppError('Categoria não encontrada', 404);
        }
        const normalizedUrl = new URL(input.url).toString();
        if (furnitureRepository.findItemByUrl(normalizedUrl)) {
            throw new AppError('Este link já está no catálogo', 409);
        }
        const preview = await linkPreviewService.get(normalizedUrl);
        return furnitureRepository.createItem({
            categoryId: input.categoryId,
            url: normalizedUrl,
            title: input.title || preview.title,
            imageUrl: input.imageUrl || preview.imageUrl,
            price: input.price ?? preview.price,
            source: preview.source,
        });
    }
    deleteItem(id) {
        if (!furnitureRepository.deleteItem(id))
            throw new AppError('Item não encontrado', 404);
    }
}
export const furnitureService = new FurnitureService();
