'use server'

import { prisma } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'
import { publicRsvpSchema, publicGuestMessageSchema } from './schemas/guest.schema'
import { rateLimit } from '@/lib/rate-limit'

async function checkRateLimit() {
  const headersList = await headers()
  const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown'
  const isAllowed = rateLimit(ip, 5, 2 * 60 * 1000)
  if (!isAllowed) {
    throw new Error('Rate limit exceeded. Please try again later.')
  }
}

export async function submitRsvpAction(input: { slug: string; name: string; phone?: string; rsvpStatus: 'ATTENDING' | 'NOT_ATTENDING' | 'PENDING'; attendance: number; message?: string }) {
  await checkRateLimit()
  const validated = publicRsvpSchema.safeParse(input)
  if (!validated.success) throw new Error('Invalid input data')

  const { slug, name, phone, rsvpStatus, attendance, message } = { ...input, ...validated.data }

  const invitation = await prisma.invitation.findUnique({ where: { slug } })
  if (!invitation) throw new Error('Invitation not found')

  // Create guest
  await prisma.guest.create({
    data: {
      invitationId: invitation.id,
      name,
      phone,
      rsvpStatus,
      attendance,
      rsvpAt: new Date(),
    }
  })

  if (message) {
    await prisma.guestMessage.create({
      data: {
        invitationId: invitation.id,
        name,
        message,
      }
    })
  }

  revalidatePath(`/i/${slug}`)
  return { success: true }
}

export async function submitGuestMessageAction(slug: string, name: string, message: string) {
  await checkRateLimit()
  const validated = publicGuestMessageSchema.safeParse({ name, message })
  if (!validated.success) throw new Error('Invalid input data')

  const invitation = await prisma.invitation.findUnique({ where: { slug } })
  if (!invitation) throw new Error('Invitation not found')

  await prisma.guestMessage.create({
    data: {
      invitationId: invitation.id,
      name: validated.data.name,
      message: validated.data.message,
    }
  })

  revalidatePath(`/i/${slug}`)
  return { success: true }
}
