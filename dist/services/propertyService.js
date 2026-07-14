import { AppError } from '../errors/AppError.js';
import { propertyRepository } from '../repositories/propertyRepository.js';
import { extractPropertyUrlMetadata } from '../utils/propertyUrlMetadata.js';
import { linkPreviewService } from './linkPreviewService.js';
function enrichFromUrl(property) {
    const metadata = extractPropertyUrlMetadata(property.url);
    return {
        ...property,
        title: property.title.startsWith('Link de ') ? metadata.title : property.title,
        price: property.price ?? metadata.price,
        location: property.location ?? metadata.location,
    };
}
class PropertyService {
    list() {
        return propertyRepository.findAll().map(enrichFromUrl);
    }
    async createMany(links) {
        const uniqueLinks = [...new Set(links)];
        const results = new Array(uniqueLinks.length);
        let nextIndex = 0;
        const createNext = async () => {
            const index = nextIndex;
            nextIndex += 1;
            if (index >= uniqueLinks.length)
                return;
            const link = uniqueLinks[index];
            const normalized = new URL(link).toString();
            const existing = propertyRepository.findByUrl(normalized);
            if (existing) {
                results[index] = enrichFromUrl(existing);
            }
            else {
                const preview = await linkPreviewService.get(normalized);
                results[index] = enrichFromUrl(propertyRepository.create(preview));
            }
            await createNext();
        };
        const workerCount = Math.min(4, uniqueLinks.length);
        await Promise.all(Array.from({ length: workerCount }, () => createNext()));
        return results;
    }
    updateReview(id, rating, note) {
        const property = propertyRepository.updateReview(id, rating, note);
        if (!property)
            throw new AppError('Imóvel não encontrado', 404);
        return enrichFromUrl(property);
    }
    delete(id) {
        if (!propertyRepository.delete(id))
            throw new AppError('Imóvel não encontrado', 404);
    }
}
export const propertyService = new PropertyService();
