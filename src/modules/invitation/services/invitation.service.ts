import { prisma } from '@/lib/db'
import { requireInvitationOwnership } from '@/lib/authorization'
import { 
  UpdateBasicInfoInput, 
  UpdateCoupleInput, 
  EventInput, 
  LoveStoryInput, 
  GiftInput, 
  UpdateThemeInput 
} from '../schemas/invitation.schema'
import { NotFoundError } from '@/lib/errors'

export async function createInvitation(
  userId: string, 
  data: Omit<import('@prisma/client').Prisma.InvitationUncheckedCreateInput, 'userId'>
) {
  return prisma.invitation.create({
    data: {
      ...data,
      userId,
    },
  })
}

export async function getInvitations(userId: string) {
  return prisma.invitation.findMany({
    where: { userId },
    include: { theme: true },
    orderBy: { createdAt: 'desc' }
  })
}

export async function getInvitationById(invitationId: string, userId: string) {
  await requireInvitationOwnership(invitationId, userId)
  const invitation = await prisma.invitation.findUnique({
    where: { id: invitationId },
    include: {
      events: { orderBy: { order: 'asc' } },
      gallery: { orderBy: { order: 'asc' } },
      loveStory: { orderBy: { order: 'asc' } },
      weddingGifts: { orderBy: { order: 'asc' } },
      theme: true,
    }
  })
  if (!invitation) throw new NotFoundError('Invitation')
  return invitation
}

export async function updateBasicInfo(invitationId: string, userId: string, data: UpdateBasicInfoInput) {
  await requireInvitationOwnership(invitationId, userId)
  return prisma.invitation.update({
    where: { id: invitationId },
    data,
  })
}

export async function updateCouple(invitationId: string, userId: string, data: UpdateCoupleInput) {
  await requireInvitationOwnership(invitationId, userId)
  return prisma.invitation.update({
    where: { id: invitationId },
    data,
  })
}

export async function updateTheme(invitationId: string, userId: string, data: UpdateThemeInput) {
  await requireInvitationOwnership(invitationId, userId)
  return prisma.invitation.update({
    where: { id: invitationId },
    data: {
      ...data,
      sectionConfig: data.sectionConfig,
    },
  })
}

export async function addEvent(invitationId: string, userId: string, data: EventInput) {
  await requireInvitationOwnership(invitationId, userId)
  return prisma.event.create({
    data: {
      invitationId,
      ...data,
      date: new Date(data.date),
    }
  })
}

export async function updateEvent(invitationId: string, eventId: string, userId: string, data: EventInput) {
  await requireInvitationOwnership(invitationId, userId)
  return prisma.event.update({
    where: { id: eventId, invitationId },
    data: {
      ...data,
      date: new Date(data.date),
    }
  })
}

export async function deleteEvent(invitationId: string, eventId: string, userId: string) {
  await requireInvitationOwnership(invitationId, userId)
  return prisma.event.delete({
    where: { id: eventId, invitationId },
  })
}

export async function addStory(invitationId: string, userId: string, data: LoveStoryInput) {
  await requireInvitationOwnership(invitationId, userId)
  return prisma.loveStory.create({
    data: {
      invitationId,
      ...data,
    }
  })
}

export async function updateStory(invitationId: string, storyId: string, userId: string, data: LoveStoryInput) {
  await requireInvitationOwnership(invitationId, userId)
  return prisma.loveStory.update({
    where: { id: storyId, invitationId },
    data,
  })
}

export async function deleteStory(invitationId: string, storyId: string, userId: string) {
  await requireInvitationOwnership(invitationId, userId)
  return prisma.loveStory.delete({
    where: { id: storyId, invitationId },
  })
}

export async function addGift(invitationId: string, userId: string, data: GiftInput) {
  await requireInvitationOwnership(invitationId, userId)
  return prisma.weddingGift.create({
    data: {
      invitationId,
      ...data,
    }
  })
}

export async function deleteGift(invitationId: string, giftId: string, userId: string) {
  await requireInvitationOwnership(invitationId, userId)
  return prisma.weddingGift.delete({
    where: { id: giftId, invitationId },
  })
}
export async function addGalleryItem(invitationId: string, userId: string, data: { imageUrl: string, caption?: string, order?: number }) {
  await requireInvitationOwnership(invitationId, userId)
  return prisma.galleryItem.create({
    data: {
      invitationId,
      ...data,
    }
  })
}

export async function deleteGalleryItem(invitationId: string, galleryId: string, userId: string) {
  await requireInvitationOwnership(invitationId, userId)
  return prisma.galleryItem.delete({
    where: { id: galleryId, invitationId },
  })
}
export async function deleteInvitation(invitationId: string, userId: string) {
  await requireInvitationOwnership(invitationId, userId)
  return prisma.invitation.delete({
    where: { id: invitationId },
  })
}

/**
 * Duplicate / Clone full data from any template demo into a newly created invitation
 */
export async function cloneInvitationFromTemplate(
  userId: string,
  templateSlug: string,
  overrides: {
    slug: string
    groomName: string
    brideName: string
  }
) {
  const template = await prisma.invitation.findUnique({
    where: { slug: templateSlug },
    include: {
      events: true,
      gallery: true,
      loveStory: true,
      weddingGifts: true,
    },
  })

  if (!template) {
    throw new NotFoundError('Template Demo')
  }

  // Create new invitation copying structure & presets from template
  const newInvitation = await prisma.invitation.create({
    data: {
      userId,
      slug: overrides.slug,
      groomName: overrides.groomName,
      groomFullName: overrides.groomName,
      groomFather: template.groomFather,
      groomMother: template.groomMother,
      groomPhoto: template.groomPhoto,
      brideName: overrides.brideName,
      brideFullName: overrides.brideName,
      brideFather: template.brideFather,
      brideMother: template.brideMother,
      bridePhoto: template.bridePhoto,
      coverPhoto: template.coverPhoto,
      heroPhoto: template.heroPhoto,
      themeId: template.themeId,
      colorPreset: template.colorPreset,
      fontPreset: template.fontPreset,
      animationIntensity: template.animationIntensity,
      musicId: template.musicId,
      sectionConfig: template.sectionConfig as object,
      openingTitle: template.openingTitle,
      openingText: template.openingText,
      quote: template.quote,
      quoteSource: template.quoteSource,
      isPublished: false,
    },
  })

  // Clone Events
  if (template.events.length > 0) {
    await prisma.event.createMany({
      data: template.events.map((evt) => ({
        invitationId: newInvitation.id,
        title: evt.title,
        date: evt.date,
        startTime: evt.startTime,
        endTime: evt.endTime,
        venue: evt.venue,
        address: evt.address,
        mapUrl: evt.mapUrl,
        order: evt.order,
      })),
    })
  }

  // Clone Gallery
  if (template.gallery.length > 0) {
    await prisma.galleryItem.createMany({
      data: template.gallery.map((g) => ({
        invitationId: newInvitation.id,
        imageUrl: g.imageUrl,
        caption: g.caption,
        order: g.order,
      })),
    })
  }

  // Clone Love Story
  if (template.loveStory.length > 0) {
    await prisma.loveStory.createMany({
      data: template.loveStory.map((s) => ({
        invitationId: newInvitation.id,
        title: s.title,
        description: s.description,
        date: s.date,
        imageUrl: s.imageUrl,
        order: s.order,
      })),
    })
  }

  // Clone Wedding Gifts
  if (template.weddingGifts.length > 0) {
    await prisma.weddingGift.createMany({
      data: template.weddingGifts.map((w) => ({
        invitationId: newInvitation.id,
        type: w.type,
        bankName: w.bankName,
        accountNumber: w.accountNumber,
        accountHolder: w.accountHolder,
        address: w.address,
        notes: w.notes,
        order: w.order,
      })),
    })
  }

  return newInvitation
}
