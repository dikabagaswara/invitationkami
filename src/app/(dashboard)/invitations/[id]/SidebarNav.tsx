'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  Users,
  Calendar,
  Heart,
  Image as ImageIcon,
  Gift,
  Palette,
  Music,
  MessageSquare,
  Settings,
  LucideIcon,
} from 'lucide-react'

const ICON_MAP: Record<string, LucideIcon> = {
  couple: Users,
  events: Calendar,
  story: Heart,
  gallery: ImageIcon,
  gifts: Gift,
  theme: Palette,
  music: Music,
  rsvp: Users,
  guestbook: MessageSquare,
  settings: Settings,
}

export default function SidebarNav({
  invitationId,
}: {
  invitationId: string
}) {
  const pathname = usePathname()

  const items = [
    { name: 'Mempelai', href: `/invitations/${invitationId}/couple`, iconKey: 'couple' },
    { name: 'Acara & Lokasi', href: `/invitations/${invitationId}/events`, iconKey: 'events' },
    { name: 'Cerita Cinta', href: `/invitations/${invitationId}/story`, iconKey: 'story' },
    { name: 'Galeri Foto', href: `/invitations/${invitationId}/gallery`, iconKey: 'gallery' },
    { name: 'Hadiah & Rekening', href: `/invitations/${invitationId}/gifts`, iconKey: 'gifts' },
    { name: 'Musik Latar', href: `/invitations/${invitationId}/music`, iconKey: 'music' },
    { name: 'Tema & Tampilan', href: `/invitations/${invitationId}/theme`, iconKey: 'theme' },
    { name: 'RSVP & Tamu', href: `/invitations/${invitationId}/rsvp`, iconKey: 'rsvp' },
    { name: 'Ucapan & Doa', href: `/invitations/${invitationId}/guestbook`, iconKey: 'guestbook' },
    { name: 'Pengaturan', href: `/invitations/${invitationId}/settings`, iconKey: 'settings' },
  ]

  return (
    <nav className="flex-1 overflow-y-auto p-4 space-y-1">
      {items.map((item) => {
        const isActive = pathname === item.href
        const Icon = ICON_MAP[item.iconKey] || Settings

        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              'flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors',
              isActive
                ? 'bg-primary text-primary-foreground font-medium'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground'
            )}
          >
            <Icon className="h-4 w-4" />
            {item.name}
          </Link>
        )
      })}
    </nav>
  )
}

