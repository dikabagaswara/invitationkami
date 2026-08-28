import { requireInvitationOwnership, requireAuth } from '@/lib/authorization'
import { prisma } from '@/lib/db'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { revalidatePath } from 'next/cache'
import { Music as MusicIcon, Check, Play } from 'lucide-react'

export default async function MusicPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const user = await requireAuth()
  if (!user.id) throw new Error('No user')
  await requireInvitationOwnership(id, user.id)

  const [invitation, musicList] = await Promise.all([
    prisma.invitation.findUnique({
      where: { id },
      include: { music: true },
    }),
    prisma.music.findMany({
      where: { isActive: true },
      orderBy: { title: 'asc' },
    }),
  ])

  if (!invitation) throw new Error('Not found')

  async function setMusic(musicId: string | null) {
    'use server'
    const currentUser = await requireAuth()
    if (!currentUser.id) throw new Error('No user')
    await requireInvitationOwnership(id, currentUser.id)

    await prisma.invitation.update({
      where: { id },
      data: { musicId },
    })

    revalidatePath(`/invitations/${id}/music`)
    revalidatePath(`/i/${invitation?.slug}`)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Musik Latar Belakang</h1>
        <p className="text-muted-foreground mt-1">
          Pilih lagu romantis yang akan diputar otomatis saat tamu membuka undangan Anda.
        </p>
      </div>

      <div className="grid gap-4">
        {/* Option: Tanpa Musik */}
        <Card className={`transition cursor-pointer border ${!invitation.musicId ? 'border-primary ring-2 ring-primary/20' : 'hover:border-gray-300'}`}>
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                <MusicIcon className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">Tanpa Musik</p>
                <p className="text-xs text-muted-foreground">Undangan akan dibuka dalam keadaan hening</p>
              </div>
            </div>

            <form action={setMusic.bind(null, null)}>
              <Button type="submit" variant={!invitation.musicId ? 'default' : 'outline'} size="sm">
                {!invitation.musicId ? (
                  <>
                    <Check className="mr-1 h-4 w-4" /> Aktif
                  </>
                ) : (
                  'Pilih'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Music Options */}
        {musicList.map((m) => {
          const isSelected = invitation.musicId === m.id

          return (
            <Card
              key={m.id}
              className={`transition border ${isSelected ? 'border-primary ring-2 ring-primary/20 bg-primary/5' : 'hover:border-gray-300'}`}
            >
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 rounded-full flex items-center justify-center ${isSelected ? 'bg-primary text-primary-foreground' : 'bg-gray-100 text-gray-700'}`}>
                    <Play className="h-4 w-4 fill-current ml-0.5" />
                  </div>
                  <div>
                    <p className="font-semibold">{m.title}</p>
                    <p className="text-xs text-muted-foreground">{m.artist || 'Instrumental Wedding'}</p>
                  </div>
                </div>

                <form action={setMusic.bind(null, m.id)}>
                  <Button type="submit" variant={isSelected ? 'default' : 'outline'} size="sm">
                    {isSelected ? (
                      <>
                        <Check className="mr-1 h-4 w-4" /> Digunakan
                      </>
                    ) : (
                      'Pilih Lagu'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}