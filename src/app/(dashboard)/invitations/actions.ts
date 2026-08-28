'use server'

import { requireAuth } from '@/lib/authorization'
import { prisma } from '@/lib/db'
import * as invitationService from '@/modules/invitation/services/invitation.service'
import { revalidatePath } from 'next/cache'
import {
  UpdateBasicInfoInput,
  UpdateCoupleInput,
  UpdateThemeInput,
  EventInput,
  LoveStoryInput,
  GiftInput
} from '@/modules/invitation/schemas/invitation.schema'

export async function updateBasicInfoAction(invitationId: string, data: UpdateBasicInfoInput) {
  const user = await requireAuth()
  const result = await invitationService.updateBasicInfo(invitationId, user.id, data)
  revalidatePath('/invitations/' + invitationId)
  return result
}

export async function updateCoupleAction(invitationId: string, data: UpdateCoupleInput) {
  const user = await requireAuth()
  const result = await invitationService.updateCouple(invitationId, user.id, data)
  revalidatePath('/invitations/' + invitationId)
  return result
}

export async function updateThemeAction(invitationId: string, data: UpdateThemeInput) {
  const user = await requireAuth()
  const result = await invitationService.updateTheme(invitationId, user.id, data)
  revalidatePath('/invitations/' + invitationId)
  return result
}

export async function addEventAction(invitationId: string, data: EventInput) {
  const user = await requireAuth()
  const result = await invitationService.addEvent(invitationId, user.id, data)
  revalidatePath('/invitations/' + invitationId)
  return result
}

export async function updateEventAction(invitationId: string, eventId: string, data: EventInput) {
  const user = await requireAuth()
  const result = await invitationService.updateEvent(invitationId, eventId, user.id, data)
  revalidatePath('/invitations/' + invitationId)
  return result
}

export async function deleteEventAction(invitationId: string, eventId: string) {
  const user = await requireAuth()
  const result = await invitationService.deleteEvent(invitationId, eventId, user.id)
  revalidatePath('/invitations/' + invitationId)
  return result
}

export async function addStoryAction(invitationId: string, data: LoveStoryInput) {
  const user = await requireAuth()
  const result = await invitationService.addStory(invitationId, user.id, data)
  revalidatePath('/invitations/' + invitationId)
  return result
}

export async function deleteStoryAction(invitationId: string, storyId: string) {
  const user = await requireAuth()
  const result = await invitationService.deleteStory(invitationId, storyId, user.id)
  revalidatePath('/invitations/' + invitationId)
  return result
}

export async function addGiftAction(invitationId: string, data: GiftInput) {
  const user = await requireAuth()
  const result = await invitationService.addGift(invitationId, user.id, data)
  revalidatePath('/invitations/' + invitationId)
  return result
}

export async function createInvitationAction(formData: FormData) {
  const user = await requireAuth()
  const groomName = formData.get('groomName') as string
  const brideName = formData.get('brideName') as string
  const slug = (formData.get('slug') as string).toLowerCase().trim().replace(/[^a-z0-9-]/g, '-')
  const themeSlug = (formData.get('themeSlug') as string) || 'elegant'
  const targetUserId = (formData.get('userId') as string) || user.id

  const finalUserId = user.role === 'SUPER_ADMIN' ? targetUserId : user.id

  const theme = await prisma.theme.findUnique({ where: { slug: themeSlug } })
  if (!theme) throw new Error('Theme not found')

  const invitation = await invitationService.createInvitation(finalUserId, {
    slug,
    groomName,
    brideName,
    themeId: theme.id,
    isPublished: false,
    sectionConfig: {
      hero: true,
      quote: true,
      couple: true,
      countdown: true,
      events: true,
      story: true,
      gallery: true,
      rsvp: true,
      guestbook: true,
      gift: true,
      location: true,
    },
  })

  revalidatePath('/invitations')
  revalidatePath('/admin/invitations')
  revalidatePath('/dashboard')
  return { id: invitation.id, slug: invitation.slug }
}

export async function addGalleryAction(invitationId: string, data: { imageUrl: string, caption?: string, order?: number }) {
  const user = await requireAuth()
  const result = await invitationService.addGalleryItem(invitationId, user.id, data)
  revalidatePath('/invitations/' + invitationId)
  return result
}

export async function deleteGalleryAction(invitationId: string, galleryId: string) {
  const user = await requireAuth()
  const result = await invitationService.deleteGalleryItem(invitationId, galleryId, user.id)
  revalidatePath('/invitations/' + invitationId)
  return result
}

export async function deleteInvitationAction(invitationId: string) {
  const user = await requireAuth()
  const result = await invitationService.deleteInvitation(invitationId, user.id)
  revalidatePath('/dashboard')
  return result
}

export async function deleteGiftAction(invitationId: string, giftId: string) {
  const user = await requireAuth()
  const result = await invitationService.deleteGift(invitationId, giftId, user.id)
  revalidatePath('/invitations/' + invitationId)
  return result
}

