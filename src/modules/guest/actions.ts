'use server'

import { prisma } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'
import { publicRsvpSchema, publicGuestMessageSchema } from './schemas/guest.schema'
import { rateLimit } from '@/lib/rate-limit'

async function checkRateLimit() {
  try {
    const headersList = await headers()
    const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || '127.0.0.1'
    const isAllowed = rateLimit(ip, 30, 60 * 1000)
    if (!isAllowed) {
      throw new Error('Terlalu banyak permintaan. Mohon tunggu beberapa saat.')
    }
  } catch (err: unknown) {
    if (err instanceof Error && err.message.includes('Terlalu banyak')) {
      throw err
    }
  }
}

export async function submitRsvpAction(input: { slug: string; name: string; phone?: string; rsvpStatus: 'ATTENDING' | 'NOT_ATTENDING' | 'PENDING'; attendance: number; message?: string }) {
  await checkRateLimit()
  const validated = publicRsvpSchema.safeParse(input)
  if (!validated.success) {
    throw new Error('Data tidak valid: ' + (validated.error.issues[0]?.message || 'Periksa input Anda.'))
  }

  const { slug, name, phone, rsvpStatus, attendance, message } = { ...input, ...validated.data }

  const invitation = await prisma.invitation.findUnique({ where: { slug } })
  if (!invitation) throw new Error('Undangan tidak ditemukan.')

  // Create or record guest RSVP
  await prisma.guest.create({
    data: {
      invitationId: invitation.id,
      name,
      phone: phone || null,
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
        status: 'APPROVED',
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
      status: 'APPROVED',
    }
  })

  revalidatePath(`/i/${slug}`)
  return { success: true }
}
