import { requireInvitationOwnership, requireAuth } from '@/lib/authorization'
import { prisma } from '@/lib/db'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { revalidatePath } from 'next/cache'
import { Trash2, UserPlus, Phone, Users, CheckCircle, XCircle, HelpCircle } from 'lucide-react'
import { GuestLinkGenerator } from './GuestLinkGenerator'
import { DeleteGuestButton } from './DeleteGuestButton'
import { appConfig } from '@/lib/config'
import { ExportGuestsButton } from '../guests/ExportGuestsButton'

export default async function RsvpPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const user = await requireAuth()
  if (!user.id) throw new Error('No user')
  await requireInvitationOwnership(id, user.id)

  const invitation = await prisma.invitation.findUnique({
    where: { id },
    include: {
      guests: {
        orderBy: { createdAt: 'desc' },
      },
    },
  })

  if (!invitation) throw new Error('Not found')

  const guests = invitation.guests
  const totalGuests = guests.length
  const attending = guests.filter((g) => g.rsvpStatus === 'ATTENDING')
  const notAttending = guests.filter((g) => g.rsvpStatus === 'NOT_ATTENDING')
  const pending = guests.filter((g) => g.rsvpStatus === 'PENDING')
  const totalPax = attending.reduce((acc, curr) => acc + (curr.attendance || 1), 0)

  async function addGuest(formData: FormData) {
    'use server'
    const currentUser = await requireAuth()
    if (!currentUser.id) throw new Error('No user')
    await requireInvitationOwnership(id, currentUser.id)

    const name = formData.get('name') as string
    const phone = formData.get('phone') as string
    const attendance = parseInt(formData.get('attendance') as string || '1', 10)

    if (!name) return

    await prisma.guest.create({
      data: {
        invitationId: id,
        name: name.trim(),
        phone: phone ? phone.trim() : null,
        attendance: Math.max(1, attendance),
        rsvpStatus: 'PENDING',
      },
    })

    revalidatePath(`/invitations/${id}/rsvp`)
  }

  async function deleteGuest(guestId: string) {
    'use server'
    const currentUser = await requireAuth()
    if (!currentUser.id) throw new Error('No user')
    await requireInvitationOwnership(id, currentUser.id)

    await prisma.guest.delete({
      where: { id: guestId },
    })

    revalidatePath(`/invitations/${id}/rsvp`)
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">RSVP & Daftar Tamu</h1>
        <p className="text-muted-foreground mt-1">
          Pantau konfirmasi kehadiran dan kelola daftar nama tamu undangan.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Tamu</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalGuests}</div>
            <p className="text-xs text-muted-foreground mt-1">Terdaftar</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-green-600">Hadir</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{attending.length}</div>
            <p className="text-xs text-muted-foreground mt-1">{totalPax} Estimasi Pax</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-red-600">Tidak Hadir</CardTitle>
            <XCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{notAttending.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Berhalangan</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-amber-600">Belum Respon</CardTitle>
            <HelpCircle className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{pending.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Menunggu</p>
          </CardContent>
        </Card>
      </div>

      {/* Instant Custom Link & WhatsApp Generator */}
      <GuestLinkGenerator
        slug={invitation.slug}
        appUrl={appConfig.url || 'http://localhost:3000'}
        groomName={invitation.groomName}
        brideName={invitation.brideName}
      />

      {/* Add Guest Form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            Tambah Tamu Undangan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form action={addGuest} className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-end">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="name">Nama Tamu</Label>
              <Input id="name" name="name" required placeholder="Contoh: Budi Santoso & Partner" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">No. WhatsApp (Opsional)</Label>
              <Input id="phone" name="phone" placeholder="08123456789" />
            </div>
            <Button type="submit" className="w-full">
              Tambah Tamu
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Guest Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Daftar Tamu &amp; Link Khusus ({guests.length})</CardTitle>
          <ExportGuestsButton
            guests={guests.map(g => ({
              id: g.id,
              name: g.name,
              phone: g.phone,
              rsvpStatus: g.rsvpStatus,
              attendance: g.attendance,
              rsvpAt: g.rsvpAt ? g.rsvpAt.toISOString() : null,
              createdAt: g.createdAt.toISOString(),
            }))}
            weddingTitle={`${invitation.groomName} & ${invitation.brideName}`}
          />
        </CardHeader>
        <CardContent>
          {guests.length === 0 ? (
            <p className="text-center py-8 text-muted-foreground text-sm">
              Belum ada tamu yang didaftarkan. Tambah tamu di atas untuk membuat link personal.
            </p>
          ) : (
            <div className="divide-y border rounded-md overflow-hidden">
              {guests.map((g) => {
                const guestUrl = `/i/${invitation.slug}?to=${encodeURIComponent(g.name)}`
                const waMessage = `Halo ${g.name}, kami mengundang Anda ke pernikahan kami. Buka undangan digital di: ${process.env.APP_URL || 'http://localhost:3000'}${guestUrl}`
                const waLink = g.phone ? `https://wa.me/${g.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(waMessage)}` : null

                return (
                  <div key={g.id} className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-gray-50/50">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{g.name}</span>
                        {g.rsvpStatus === 'ATTENDING' && (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                            Hadir ({g.attendance} Pax)
                          </Badge>
                        )}
                        {g.rsvpStatus === 'NOT_ATTENDING' && (
                          <Badge variant="secondary" className="bg-red-100 text-red-800 hover:bg-red-100">
                            Tidak Hadir
                          </Badge>
                        )}
                        {g.rsvpStatus === 'PENDING' && (
                          <Badge variant="outline" className="text-amber-700 border-amber-300">
                            Belum Konfirmasi
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground font-mono">
                        {g.phone && (
                          <span className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            {g.phone}
                          </span>
                        )}
                        <span>Link: {guestUrl}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      {waLink && (
                        <a href={waLink} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="sm" className="text-xs text-green-600 border-green-200 hover:bg-green-50">
                            Kirim WA
                          </Button>
                        </a>
                      )}
                      <DeleteGuestButton
                        guestId={g.id}
                        guestName={g.name}
                        deleteAction={deleteGuest}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}