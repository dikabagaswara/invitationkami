import { z } from 'zod'

export const publicRsvpSchema = z.object({
  name: z.string().trim().min(2).max(100),
  phone: z.string().max(20).optional(),
  rsvpStatus: z.enum(['ATTENDING', 'NOT_ATTENDING', 'PENDING']),
  attendance: z.number().int().min(1).max(10),
  message: z.string().max(500).optional(),
})

export const publicGuestMessageSchema = z.object({
  name: z.string().trim().min(2).max(100),
  message: z.string().trim().min(2).max(500),
})
