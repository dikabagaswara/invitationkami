import { requireAuth } from '@/lib/authorization'
import { prisma } from '@/lib/db'
import { ShareGeneratorClient } from './ShareGeneratorClient'

export const metadata = {
  title: 'Bagi Undangan & Convert Link Tamu',
  description: 'Generator link undangan dan format pesan WhatsApp untuk banyak tamu sekaligus.',
}

export default async function ShareGeneratorPage() {
  const user = await requireAuth()

  // If Super Admin, allow picking from all invitations. If customer, allow own invitations.
  const isAdmin = user.role === 'SUPER_ADMIN'

  const invitations = await prisma.invitation.findMany({
    where: isAdmin ? {} : { userId: user.id },
    include: {
      theme: { select: { name: true } },
      events: { orderBy: { order: 'asc' }, take: 1 },
    },
    orderBy: { createdAt: 'desc' },
  })

  const mappedInvitations = invitations.map((inv) => ({
    id: inv.id,
    slug: inv.slug,
    groomName: inv.groomName,
    brideName: inv.brideName,
    themeName: inv.theme.name,
    eventDate: inv.events[0] ? new Date(inv.events[0].date).toLocaleDateString('id-ID') : undefined,
    venue: inv.events[0]?.venue || undefined,
  }))

  const baseUrl = process.env.APP_URL || 'http://localhost:3000'

  return <ShareGeneratorClient invitations={mappedInvitations} baseUrl={baseUrl} />
}
