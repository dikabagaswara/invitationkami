import { z } from 'zod'

export const updateBasicInfoSchema = z.object({
  slug: z.string().min(3).max(50),
  isPublished: z.boolean(),
})

export const updateCoupleSchema = z.object({
  groomName: z.string().min(1),
  groomFullName: z.string().optional(),
  groomFather: z.string().optional(),
  groomMother: z.string().optional(),
  groomPhoto: z.string().optional(),
  brideName: z.string().min(1),
  brideFullName: z.string().optional(),
  brideFather: z.string().optional(),
  brideMother: z.string().optional(),
  bridePhoto: z.string().optional(),
  coverPhoto: z.string().optional(),
  heroPhoto: z.string().optional(),
  openingTitle: z.string().optional(),
  openingText: z.string().optional(),
  quote: z.string().optional(),
  quoteSource: z.string().optional(),
})

export const eventSchema = z.object({
  title: z.string().min(1),
  date: z.string().or(z.date()),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  venue: z.string().min(1),
  address: z.string().optional(),
  mapUrl: z.string().optional(),
  order: z.number().default(0),
})

export const loveStorySchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  date: z.string().optional(),
  imageUrl: z.string().optional(),
  order: z.number().default(0),
})

export const giftSchema = z.object({
  type: z.enum(['BANK_TRANSFER', 'EWALLET', 'SHIPPING_ADDRESS']),
  bankName: z.string().optional(),
  accountNumber: z.string().optional(),
  accountHolder: z.string().optional(),
  address: z.string().optional(),
  notes: z.string().optional(),
  order: z.number().default(0),
})

export const updateThemeSchema = z.object({
  themeId: z.string().min(1),
  colorPreset: z.string().min(1),
  fontPreset: z.string().min(1),
  animationIntensity: z.enum(['NONE', 'SUBTLE', 'NORMAL', 'DRAMATIC']),
  sectionConfig: z.record(z.string(), z.boolean()),
})

export const gallerySchema = z.object({
  imageUrl: z.string().min(1),
  caption: z.string().optional(),
  order: z.number().default(0)
})

export type UpdateBasicInfoInput = z.infer<typeof updateBasicInfoSchema>
export type UpdateCoupleInput = z.infer<typeof updateCoupleSchema>
export type EventInput = z.infer<typeof eventSchema>
export type LoveStoryInput = z.infer<typeof loveStorySchema>
export type GiftInput = z.infer<typeof giftSchema>
export type UpdateThemeInput = z.infer<typeof updateThemeSchema>
export type GalleryInput = z.infer<typeof gallerySchema>
