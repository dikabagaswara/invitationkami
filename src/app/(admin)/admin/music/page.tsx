import { requireAdmin } from '@/lib/authorization'
import { prisma } from '@/lib/db'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { revalidatePath } from 'next/cache'
import { Music, Plus, Trash2, Check, X, Disc3 } from 'lucide-react'

export default async function AdminMusicPage() {
  await requireAdmin()

  const musicList = await prisma.music.findMany({
    include: {
      _count: {
        select: { invitations: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  })

  async function addMusic(formData: FormData) {
    'use server'
    await requireAdmin()

    const title = formData.get('title') as string
    const artist = formData.get('artist') as string
    const fileUrl = formData.get('fileUrl') as string
    const category = (formData.get('category') as string) || 'pop'

    if (!title) return

    await prisma.music.create({
      data: {
        title: title.trim(),
        artist: artist ? artist.trim() : null,
        fileUrl: fileUrl ? fileUrl.trim() : '',
        category,
        isActive: true,
      },
    })

    revalidatePath('/admin/music')
    revalidatePath('/invitations/[id]/music', 'page')
  }

  async function toggleMusicActive(musicId: string, currentStatus: boolean) {
    'use server'
    await requireAdmin()

    await prisma.music.update({
      where: { id: musicId },
      data: { isActive: !currentStatus },
    })

    revalidatePath('/admin/music')
  }

  async function deleteMusic(musicId: string) {
    'use server'
    await requireAdmin()

    await prisma.music.delete({
      where: { id: musicId },
    })

    revalidatePath('/admin/music')
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Master Musik Latar Belakang</h1>
        <p className="text-muted-foreground mt-1">
          Kelola katalog lagu latar belakang pernikahan yang tersedia untuk dipilih oleh agen & customer.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Lagu</CardTitle>
            <Music className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{musicList.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Koleksi Lagu</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-green-600">Lagu Aktif</CardTitle>
            <Disc3 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {musicList.filter((m) => m.isActive).length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Dapat Dipilih User</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-blue-600">Total Penggunaan</CardTitle>
            <Music className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {musicList.reduce((acc, m) => acc + m._count.invitations, 0)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Dipasang di Undangan</p>
          </CardContent>
        </Card>
      </div>

      {/* Add Music Form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Plus className="h-4 w-4" /> Tambah Lagu Baru ke Katalog
          </CardTitle>
          <CardDescription>
            Masukkan judul lagu, nama penyanyi/musisi, dan link file audio (MP3).
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={addMusic} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div className="space-y-2">
              <Label htmlFor="title">Judul Lagu</Label>
              <Input id="title" name="title" required placeholder="Contoh: A Thousand Years" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="artist">Penyanyi / Artis</Label>
              <Input id="artist" name="artist" placeholder="Contoh: Christina Perri" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fileUrl">URL File Audio (MP3)</Label>
              <Input id="fileUrl" name="fileUrl" placeholder="https://.../music.mp3" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Kategori Musik</Label>
              <select
                id="category"
                name="category"
                className="w-full h-9 px-3 rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                defaultValue="pop"
              >
                <option value="pop">Pop Romantic</option>
                <option value="classic">Classic / Orchestra</option>
                <option value="acoustic">Acoustic / Instrumental</option>
                <option value="traditional">Traditional / Cultural</option>
                <option value="religious">Religious / Spiritual</option>
              </select>
            </div>

            <div className="md:col-span-4 flex justify-end">
              <Button type="submit">
                <Plus className="mr-2 h-4 w-4" /> Tambah ke Katalog
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Music Catalogue List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Katalog Musik Platform</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="divide-y border rounded-md overflow-hidden">
            {musicList.map((m) => (
              <div
                key={m.id}
                className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-gray-50/50"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold">{m.title}</span>
                    <span className="text-xs text-muted-foreground">by {m.artist || 'Instrumental'}</span>
                    {m.isActive ? (
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100 text-[10px]">
                        Aktif
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="text-[10px]">
                        Nonaktif
                      </Badge>
                    )}
                    <Badge variant="outline" className="text-[10px] capitalize">
                      {m.category || 'General'}
                    </Badge>
                    <Badge variant="outline" className="text-[10px]">
                      {m._count.invitations} Undangan Memakai
                    </Badge>
                  </div>
                  {m.fileUrl && (
                    <p className="text-[11px] text-muted-foreground font-mono truncate max-w-md">
                      {m.fileUrl}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2 self-end md:self-center">
                  <form action={toggleMusicActive.bind(null, m.id, m.isActive)}>
                    <Button
                      type="submit"
                      variant={m.isActive ? 'outline' : 'default'}
                      size="sm"
                      className="h-8 text-xs"
                    >
                      {m.isActive ? (
                        <>
                          <X className="mr-1 h-3 w-3" /> Nonaktifkan
                        </>
                      ) : (
                        <>
                          <Check className="mr-1 h-3 w-3" /> Aktifkan
                        </>
                      )}
                    </Button>
                  </form>

                  <form action={deleteMusic.bind(null, m.id)}>
                    <Button
                      variant="ghost"
                      size="icon"
                      type="submit"
                      className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                      title="Hapus Lagu"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}