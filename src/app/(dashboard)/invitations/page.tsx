import { requireAuth } from '@/lib/authorization'
import { prisma } from '@/lib/db'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { InvitationsListClient } from './InvitationsListClient'

export default async function InvitationsPage() {
  const user = await requireAuth()
  const isAdmin = user.role === 'SUPER_ADMIN'

  const invitations = await prisma.invitation.findMany({
    where: isAdmin ? {} : { userId: user.id },
    include: {
      user: isAdmin ? { select: { name: true, email: true } } : false,
      theme: true,
      events: {
        orderBy: { order: 'asc' },
      },
      guests: true,
    },
    orderBy: { createdAt: 'desc' },
  })

  const mappedInvitations = invitations.map((inv) => {
    const owner = isAdmin && 'user' in inv && inv.user ? (inv.user as { name: string; email: string }) : null
    const primaryEvent = inv.events[0] || null

    return {
      id: inv.id,
      slug: inv.slug,
      groomName: inv.groomName,
      brideName: inv.brideName,
      isPublished: inv.isPublished,
      createdAt: inv.createdAt.toISOString(),
      themeName: inv.theme?.name || 'Theme',
      eventsCount: inv.events.length,
      guestsCount: inv.guests.length,
      primaryEventDate: primaryEvent ? primaryEvent.date.toISOString() : null,
      owner,
    }
  })

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {isAdmin ? 'Semua Undangan Platform' : 'Daftar Undangan Saya'}
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            {isAdmin
              ? `Kelola & pantau seluruh ${invitations.length} undangan dari semua agen/customer.`
              : 'Pantau status live/draft, countdown hari bahagia, dan kelola tamu undangan Anda.'}
          </p>
        </div>
        <Link href="/invitations/new">
          <Button className="shadow-xs">
            <Plus className="w-4 h-4 mr-1.5" /> Buat Undangan Baru
          </Button>
        </Link>
      </div>

      {isAdmin && (
        <div className="flex items-center gap-2 px-4 py-2.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 shadow-xs">
          <span className="font-semibold">👑 Mode Super Admin:</span>
          Anda sedang melihat seluruh data undangan digital yang terdaftar pada sistem.
        </div>
      )}

      <InvitationsListClient
        invitations={mappedInvitations}
        isAdmin={isAdmin}
      />
    </div>
  )
}