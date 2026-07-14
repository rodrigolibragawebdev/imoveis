import { z } from 'zod'

const httpUrl = z.url().refine((value) => ['http:', 'https:'].includes(new URL(value).protocol), {
  message: 'Use um link iniciado por http:// ou https://',
})

export const createPropertiesDto = z.object({
  links: z.array(httpUrl).min(1, 'Informe pelo menos um link').max(20, 'Envie no máximo 20 links por vez'),
})

export const updatePropertyReviewDto = z.object({
  rating: z.enum(['liked', 'disliked', 'terrible']).nullable(),
  note: z.string().trim().max(280, 'A observação deve ter até 280 caracteres').default(''),
})

