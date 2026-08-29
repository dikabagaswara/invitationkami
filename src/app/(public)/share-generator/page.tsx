import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { ShareGeneratorClient, type InvitationOption } from './ShareGeneratorClient'

export const metadata = {
  title: 'Generator Link & Bagi Undangan WhatsApp',
  description: 'Konversi nama tamu menjadi link undangan khusus dan format pesan WhatsApp siap kirim secara massal.',
}

export default async function PublicShareGeneratorPage() {
  const session = await auth()
  const user = session?.user

  let mappedInvitations: InvitationOption[] = []

  if (user) {
    const isAdmin = (user as { role?: string }).role === 'SUPER_ADMIN'
    const invitations = await prisma.invitation.findMany({
      where: isAdmin ? {} : { userId: user.id },
      include: {
        theme: { select: { name: true } },
        events: { orderBy: { order: 'asc' }, take: 1 },
      },
      orderBy: { createdAt: 'desc' },
    })

    mappedInvitations = invitations.map((inv) => ({
      id: inv.id,
      slug: inv.slug,
      groomName: inv.groomName,
      brideName: inv.brideName,
      themeName: inv.theme.name,
      eventDate: inv.events[0] ? new Date(inv.events[0].date).toLocaleDateString('id-ID') : undefined,
      venue: inv.events[0]?.venue || undefined,
    }))
  }

  const baseUrl = process.env.APP_URL || 'http://localhost:3000'

  return (
    <ShareGeneratorClient
      invitations={mappedInvitations}
      baseUrl={baseUrl}
      isLoggedIn={!!user}
    />
  )
}
