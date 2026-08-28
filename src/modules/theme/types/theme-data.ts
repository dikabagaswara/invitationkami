export interface SectionConfig {
  opening: boolean
  hero: boolean
  couple: boolean
  quote: boolean
  countdown: boolean
  events: boolean
  story: boolean
  gallery: boolean
  rsvp: boolean
  guestbook: boolean
  gift: boolean
  location: boolean
  footer: boolean
}

export const defaultSectionConfig: SectionConfig = {
  opening: true,
  hero: true,
  couple: true,
  quote: true,
  countdown: true,
  events: true,
  story: true,
  gallery: true,
  rsvp: true,
  guestbook: true,
  gift: true,
  location: true,
  footer: true,
}

export interface EventData {
  id: string
  title: string
  date: Date
  startTime?: string | null
  endTime?: string | null
  venue: string
  address?: string | null
  mapUrl?: string | null
  order: number
}

export interface GalleryData {
  id: string
  imageUrl: string
  caption?: string | null
  order: number
}

export interface LoveStoryData {
  id: string
  title: string
  description: string
  date?: string | null
  imageUrl?: string | null
  order: number
}

export interface GuestMessageData {
  id: string
  name: string
  message: string
  createdAt: Date
}

export interface WeddingGiftData {
  id: string
  type: 'BANK_TRANSFER' | 'EWALLET' | 'SHIPPING_ADDRESS'
  bankName?: string | null
  accountNumber?: string | null
  accountHolder?: string | null
  address?: string | null
  notes?: string | null
  order: number
}

export interface MusicData {
  id: string
  title: string
  artist?: string | null
  fileUrl: string
}

export interface ThemeData {
  invitation: {
    slug: string
    groomName: string
    groomFullName?: string | null
    groomFather?: string | null
    groomMother?: string | null
    groomPhoto?: string | null
    brideName: string
    brideFullName?: string | null
    brideFather?: string | null
    brideMother?: string | null
    bridePhoto?: string | null
    openingTitle?: string | null
    openingText?: string | null
    quote?: string | null
    quoteSource?: string | null
    colorPreset: string
    fontPreset: string
    animationIntensity: string
    sectionConfig: SectionConfig
  }
  events: EventData[]
  gallery: GalleryData[]
  loveStory: LoveStoryData[]
  guestMessages: GuestMessageData[]
  weddingGifts: WeddingGiftData[]
  music?: MusicData | null
  guestName?: string
}
