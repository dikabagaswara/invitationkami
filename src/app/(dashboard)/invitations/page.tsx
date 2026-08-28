import { requireAuth } from '@/lib/authorization'
import { prisma } from '@/lib/db'
import { Card } from '@/components/ui/card'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function InvitationsPage() {
  const user = await requireAuth()
  const isAdmin = user.role === 'SUPER_ADMIN'

  const invitations = await prisma.invitation.findMany({
    where: isAdmin ? {} : { userId: user.id },
    include: {
      user: isAdmin ? { select: { name: true, email: true } } : false,
      theme: true,
      events: true,
      guests: true,
    },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {isAdmin ? 'Semua Undangan Platform' : 'My Invitations'}
          </h1>
          <p className="text-muted-foreground mt-1">
            {isAdmin
              ? `${invitations.length} undangan dari seluruh agen & customer.`
              : 'Kelola seluruh undangan pernikahan Anda.'}
          </p>
        </div>
        <Link href="/invitations/new">
          <Button>+ Buat Undangan Baru</Button>
        </Link>
      </div>

      {isAdmin && (
        <div className="flex items-center gap-2 px-3 py-2 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-800">
          <span className="font-semibold">👑 Mode Super Admin:</span>
          Anda dapat langsung mengedit data undangan milik semua agen & customer.
        </div>
      )}

      {invitations.length === 0 ? (
        <Card className="p-12 text-center">
          <h3 className="text-lg font-semibold mb-2">Belum ada undangan</h3>
          <p className="text-muted-foreground mb-6">Mulai buat undangan pernikahan digital modern pertama Anda sekarang.</p>
          <Link href="/invitations/new">
            <Button>+ Buat Undangan Baru</Button>
          </Link>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {invitations.map((inv) => {
            const owner = isAdmin && 'user' in inv && inv.user ? inv.user as { name: string; email: string } : null
            return (
              <Card key={inv.id} className="p-5 flex flex-col justify-between hover:shadow-md transition">
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs font-semibold px-2 py-1 bg-gray-100 rounded text-gray-700 uppercase">
                      {inv.theme?.name || 'Theme'}
                    </span>
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${inv.isPublished ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                      {inv.isPublished ? 'Live' : 'Draft'}
                    </span>
                  </div>
                  <h3 className="font-bold text-xl">{inv.groomName} & {inv.brideName}</h3>
                  <p className="text-xs text-muted-foreground mt-1 font-mono">/i/{inv.slug}</p>
                  {owner && (
                    <p className="text-xs text-amber-700 mt-1 font-medium">👤 {owner.name} ({owner.email})</p>
                  )}
                  <div className="mt-4 pt-3 border-t grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                    <div>Acara: <span className="font-medium text-foreground">{inv.events.length}</span></div>
                    <div>Tamu: <span className="font-medium text-foreground">{inv.guests.length}</span></div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t flex flex-col gap-2">
                  <div className="flex gap-2">
                    <Link href={`/invitations/${inv.id}/couple`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        Edit Data
                      </Button>
                    </Link>
                    <Link href={`/i/${inv.slug}`} target="_blank" className="flex-1">
                      <Button variant="default" size="sm" className="w-full">
                        Preview
                      </Button>
                    </Link>
                  </div>
                  <Link href={`/invitations/${inv.id}/settings`}>
                    <Button variant="ghost" size="sm" className="w-full text-xs text-muted-foreground hover:text-foreground">
                      Pengaturan / Publish
                    </Button>
                  </Link>
                </div>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}