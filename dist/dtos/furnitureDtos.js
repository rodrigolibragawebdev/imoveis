import { z } from 'zod';
export const createCategoryDto = z.object({
    name: z.string().trim().min(2).max(40),
    color: z.string().regex(/^#[0-9A-Fa-f]{6}$/).default('#B65C3A'),
});
export const createFurnitureDto = z.object({
    categoryId: z.coerce.number().int().positive(),
    url: z.url().refine((value) => ['http:', 'https:'].includes(new URL(value).protocol)),
    title: z.string().trim().max(140).optional(),
    imageUrl: z.url().optional().or(z.literal('')),
    price: z.coerce.number().nonnegative().max(100_000_000).optional(),
});
export const furnitureQueryDto = z.object({
    categoryId: z.coerce.number().int().positive().optional(),
    sort: z.enum(['price-asc', 'price-desc', 'newest']).default('price-asc'),
});
