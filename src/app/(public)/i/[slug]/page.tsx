import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import type { ThemeData, SectionConfig } from '@/modules/theme/types/theme-data'
import { defaultSectionConfig } from '@/modules/theme/types/theme-data'
import { PublicInvitationWrapper } from '@/components/public/PublicInvitationWrapper'
import { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ to?: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const invitation = await prisma.invitation.findFirst({
    where: { slug, isPublished: true },
    select: { 
      groomName: true, 
      brideName: true,
      groomPhoto: true,
      bridePhoto: true,
      gallery: { take: 1, select: { imageUrl: true } },
      events: { orderBy: { order: 'asc' }, take: 1, select: { date: true, title: true } }
    },
  })

  if (!invitation) return { title: 'Invitation Not Found' }

  const ogImage = invitation.gallery[0]?.imageUrl || invitation.groomPhoto || invitation.bridePhoto || '/placeholder.jpg'
  const eventDate = invitation.events[0] ? new Date(invitation.events[0].date).toLocaleDateString('id-ID', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  }) : ''
  const title = `The Wedding of ${invitation.groomName} & ${invitation.brideName}`
  const description = `We invite you to celebrate our wedding${eventDate ? ` on ${eventDate}` : ''}.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [ogImage],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    }
  }
}

export default async function PublicInvitationPage({ params, searchParams }: Props) {
  const { slug } = await params
  const { to: guestName } = await searchParams

  // Single query  all relations loaded at once
  const invitation = await prisma.invitation.findFirst({
    where: { slug, isPublished: true },
    include: {
      events: { orderBy: { order: 'asc' } },
      gallery: { orderBy: { order: 'asc' } },
      loveStory: { orderBy: { order: 'asc' } },
      guestMessages: { where: { status: 'APPROVED' }, orderBy: { createdAt: 'desc' }, take: 50 },
      weddingGifts: { orderBy: { order: 'asc' } },
      theme: true,
      music: true,
    },
  })

  if (!invitation) notFound()

  // Parse section config from DB JSON
  const sectionConfig: SectionConfig = {
    ...defaultSectionConfig,
    ...(invitation.sectionConfig as Partial<SectionConfig>),
  }

  const themeData: ThemeData = {
    invitation: {
      slug: invitation.slug,
      groomName: invitation.groomName,
      groomFullName: invitation.groomFullName,
      groomFather: invitation.groomFather,
      groomMother: invitation.groomMother,
      groomPhoto: invitation.groomPhoto,
      brideName: invitation.brideName,
      brideFullName: invitation.brideFullName,
      brideFather: invitation.brideFather,
      brideMother: invitation.brideMother,
      bridePhoto: invitation.bridePhoto,
      openingTitle: invitation.openingTitle,
      openingText: invitation.openingText,
      quote: invitation.quote,
      quoteSource: invitation.quoteSource,
      colorPreset: invitation.colorPreset,
      fontPreset: invitation.fontPreset,
      animationIntensity: invitation.animationIntensity,
      sectionConfig,
    },
    events: invitation.events.map((e) => ({
      id: e.id,
      title: e.title,
      date: e.date,
      startTime: e.startTime,
      endTime: e.endTime,
      venue: e.venue,
      address: e.address,
      mapUrl: e.mapUrl,
      order: e.order,
    })),
    gallery: invitation.gallery.map((g) => ({
      id: g.id,
      imageUrl: g.imageUrl,
      caption: g.caption,
      order: g.order,
    })),
    loveStory: invitation.loveStory.map((s) => ({
      id: s.id,
      title: s.title,
      description: s.description,
      date: s.date,
      imageUrl: s.imageUrl,
      order: s.order,
    })),
    guestMessages: invitation.guestMessages.map((m) => ({
      id: m.id,
      name: m.name,
      message: m.message,
      createdAt: m.createdAt,
    })),
    weddingGifts: invitation.weddingGifts.map((g) => ({
      id: g.id,
      type: g.type,
      bankName: g.bankName,
      accountNumber: g.accountNumber,
      accountHolder: g.accountHolder,
      address: g.address,
      notes: g.notes,
      order: g.order,
    })),
    music: invitation.music
      ? {
          id: invitation.music.id,
          title: invitation.music.title,
          artist: invitation.music.artist,
          fileUrl: invitation.music.fileUrl,
        }
      : null,
    guestName: guestName,
  }

  // Dynamic theme import based on slug
  const themeSlug = invitation.theme.slug
  const ThemeComponent = (await import(`@/themes/${themeSlug}/index`)).default

  return (
    <PublicInvitationWrapper
      groomName={invitation.groomName}
      brideName={invitation.brideName}
      guestName={guestName}
      openingTitle={invitation.openingTitle}
      musicUrl={invitation.music?.fileUrl}
    >
      <ThemeComponent data={themeData} />
    </PublicInvitationWrapper>
  )
}
