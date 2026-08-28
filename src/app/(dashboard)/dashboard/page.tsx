import { requireAuth } from '@/lib/authorization'
import { prisma } from '@/lib/db'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function DashboardPage() {
  const user = await requireAuth()

  const invitations = await prisma.invitation.findMany({
    where: { userId: user.id },
    include: {
      guests: true,
      guestMessages: true,
      theme: true,
    },
    orderBy: { createdAt: 'desc' },
  })

  const totalInvitations = invitations.length
  const publishedInvitations = invitations.filter((i) => i.isPublished).length
  
  let totalGuests = 0
  let totalRsvps = 0
  let attendingCount = 0
  let notAttendingCount = 0
  let pendingCount = 0
  let totalPax = 0

  invitations.forEach((inv) => {
    totalGuests += inv.guests.length
    inv.guests.forEach((g) => {
      if (g.rsvpStatus !== 'PENDING') {
        totalRsvps += 1
      }
      if (g.rsvpStatus === 'ATTENDING') {
        attendingCount += 1
        totalPax += g.attendance || 1
      } else if (g.rsvpStatus === 'NOT_ATTENDING') {
        notAttendingCount += 1
      } else {
        pendingCount += 1
      }
    })
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
          <p className="text-muted-foreground mt-1">Selamat datang kembali, {user.name}!</p>
        </div>
        <Link href="/invitations/new">
          <Button>+ Buat Undangan Baru</Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Undangan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalInvitations}</div>
            <p className="text-xs text-muted-foreground mt-1">{publishedInvitations} Terpublikasi</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tamu Undangan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalGuests}</div>
            <p className="text-xs text-muted-foreground mt-1">Terdaftar di buku tamu</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Konfirmasi RSVP</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{attendingCount} Hadir</div>
            <p className="text-xs text-muted-foreground mt-1">{notAttendingCount} Tidak Hadir / {pendingCount} Belum</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Estimasi Pax Hadir</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPax} Orang</div>
            <p className="text-xs text-muted-foreground mt-1">Total porsi katering</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Undangan Anda</h2>
          <Link href="/invitations" className="text-sm text-blue-600 hover:underline">
            Lihat Semua →
          </Link>
        </div>

        {invitations.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">Anda belum memiliki undangan.</p>
            <Link href="/invitations/new" className="mt-4 inline-block">
              <Button>Buat Undangan Pertama</Button>
            </Link>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {invitations.map((inv) => (
              <Card key={inv.id} className="p-5 flex flex-col justify-between hover:shadow-md transition">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-semibold px-2 py-1 bg-gray-100 rounded text-gray-700 uppercase">
                      {inv.theme?.name || 'Theme'}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded font-medium ${inv.isPublished ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                      {inv.isPublished ? 'Live / Published' : 'Draft'}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg">{inv.groomName} & {inv.brideName}</h3>
                  <p className="text-sm text-muted-foreground mt-1">/i/{inv.slug}</p>
                </div>
                <div className="mt-6 pt-4 border-t flex gap-2">
                  <Link href={`/invitations/${inv.id}/couple`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full">Edit</Button>
                  </Link>
                  <Link href={`/i/${inv.slug}`} target="_blank" className="flex-1">
                    <Button variant="default" size="sm" className="w-full">Preview</Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}