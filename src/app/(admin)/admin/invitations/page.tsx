import { requireAdmin } from '@/lib/authorization'
import { prisma } from '@/lib/db'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { revalidatePath } from 'next/cache'
import { ExternalLink, Edit3, Trash2, Globe, User, Plus } from 'lucide-react'
import { AdminDeleteInvitationButton } from './AdminDeleteInvitationButton'

export default async function AdminInvitationsPage() {
  await requireAdmin()

  const invitations = await prisma.invitation.findMany({
    include: {
      user: {
        select: { name: true, email: true },
      },
      theme: true,
      _count: {
        select: { guests: true, guestMessages: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  })

  async function deleteInvitation(invitationId: string) {
    'use server'
    await requireAdmin()

    await prisma.invitation.delete({
      where: { id: invitationId },
    })

    revalidatePath('/admin/invitations')
    revalidatePath('/invitations')
    revalidatePath('/dashboard')
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Semua Undangan Digital</h1>
          <p className="text-muted-foreground mt-1">
            Super Admin dapat melihat, memoderasi, dan mengedit data undangan milik seluruh agen/customer.
          </p>
        </div>
        <Link href="/invitations/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Buat Undangan Baru
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Daftar Seluruh Undangan ({invitations.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {invitations.length === 0 ? (
            <p className="text-center py-8 text-muted-foreground text-sm">
              Belum ada undangan yang dibuat di platform.
            </p>
          ) : (
            <div className="divide-y border rounded-md overflow-hidden">
              {invitations.map((inv) => (
                <div
                  key={inv.id}
                  className="p-4 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 hover:bg-gray-50/50"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-base">
                        {inv.groomName} & {inv.brideName}
                      </span>
                      {inv.isPublished ? (
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Published</Badge>
                      ) : (
                        <Badge variant="secondary">Draft</Badge>
                      )}
                      <Badge variant="outline" className="text-xs">
                        Tema: {inv.theme.name}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        Pemilik: <strong className="text-gray-700">{inv.user.name}</strong> ({inv.user.email})
                      </span>
                      <span className="flex items-center gap-1 font-mono">
                        <Globe className="h-3 w-3" />
                        /i/{inv.slug}
                      </span>
                      <span>{inv._count.guests} Tamu</span>
                      <span>{inv._count.guestMessages} Ucapan</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end lg:self-center">
                    <Link href={`/i/${inv.slug}`} target="_blank">
                      <Button variant="outline" size="sm" className="text-xs">
                        <ExternalLink className="mr-1 h-3.5 w-3.5" /> Preview
                      </Button>
                    </Link>

                    <Link href={`/invitations/${inv.id}/couple`}>
                      <Button size="sm" className="text-xs">
                        <Edit3 className="mr-1 h-3.5 w-3.5" /> Edit Data
                      </Button>
                    </Link>

                    <AdminDeleteInvitationButton
                      invitationId={inv.id}
                      title={`${inv.groomName} & ${inv.brideName}`}
                      deleteAction={deleteInvitation}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}