'use client'

import { useState, useTransition, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Music, Plus, Trash2, Check, X, Disc3, Upload, Play, Pause, Volume2, Link as LinkIcon } from 'lucide-react'
import { toast } from 'sonner'

interface MusicData {
  id: string
  title: string
  artist: string | null
  fileUrl: string
  category: string | null
  isActive: boolean
  usageCount: number
}

export function AdminMusicClient({
  musicList,
  addMusicAction,
  toggleMusicActive,
  deleteMusic,
}: {
  musicList: MusicData[]
  addMusicAction: (formData: FormData) => Promise<void>
  toggleMusicActive: (id: string, current: boolean) => Promise<void>
  deleteMusic: (id: string) => Promise<void>
}) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [uploadMode, setUploadMode] = useState<'file' | 'url'>('file')
  const [selectedFileName, setSelectedFileName] = useState<string>('')
  const [playingId, setPlayingId] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const formRef = useRef<HTMLFormElement | null>(null)

  const handlePreview = (id: string, url: string) => {
    if (!url) {
      toast.error('File audio belum tersedia')
      return
    }

    if (playingId === id) {
      audioRef.current?.pause()
      setPlayingId(null)
    } else {
      if (audioRef.current) {
        audioRef.current.src = url
        audioRef.current.play().then(() => {
          setPlayingId(id)
        }).catch((err) => {
          console.warn(err)
          toast.error('Gagal memutar preview audio')
        })
      }
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    startTransition(async () => {
      try {
        await addMusicAction(formData)
        toast.success('Lagu baru berhasil ditambahkan ke katalog!')
        formRef.current?.reset()
        setSelectedFileName('')
        router.refresh()
      } catch (err: unknown) {
        if (err instanceof Error) {
          toast.error(err.message)
        } else {
          toast.error('Gagal menambahkan lagu')
        }
      }
    })
  }

  const handleToggle = (id: string, current: boolean) => {
    startTransition(async () => {
      try {
        await toggleMusicActive(id, current)
        toast.success(current ? 'Lagu dinonaktifkan' : 'Lagu diaktifkan')
        router.refresh()
      } catch {
        toast.error('Gagal mengubah status lagu')
      }
    })
  }

  const handleDelete = (id: string, title: string) => {
    if (!confirm(`Yakin ingin menghapus lagu "${title}" dari katalog?`)) return

    startTransition(async () => {
      try {
        if (playingId === id) {
          audioRef.current?.pause()
          setPlayingId(null)
        }
        await deleteMusic(id)
        toast.success('Lagu berhasil dihapus dari server & katalog')
        router.refresh()
      } catch {
        toast.error('Gagal menghapus lagu')
      }
    })
  }

  return (
    <div className="space-y-8">
      {/* Hidden Global Audio Element for Preview */}
      <audio
        ref={audioRef}
        onEnded={() => setPlayingId(null)}
        onError={() => setPlayingId(null)}
      />

      <div>
        <h1 className="text-2xl font-bold tracking-tight">Master Musik Latar Belakang</h1>
        <p className="text-muted-foreground mt-1">
          Kelola katalog lagu latar belakang pernikahan. Anda dapat mengunggah file MP3 langsung ke server atau menggunakan URL eksternal.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Lagu</CardTitle>
            <Music className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{musicList.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Koleksi Lagu Platform</p>
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
              {musicList.reduce((acc, m) => acc + m.usageCount, 0)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Dipasang di Undangan</p>
          </CardContent>
        </Card>
      </div>

      {/* Add / Upload Music Form */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <CardTitle className="text-base flex items-center gap-2">
                <Plus className="h-4 w-4" /> Tambah & Upload Lagu Baru
              </CardTitle>
              <CardDescription>
                Upload file audio MP3 langsung ke server atau gunakan tautan URL eksternal.
              </CardDescription>
            </div>
            
            {/* Mode Switcher */}
            <div className="flex rounded-lg bg-gray-100 p-1 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setUploadMode('file')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                  uploadMode === 'file'
                    ? 'bg-white text-gray-900 shadow-xs'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <Upload className="h-3.5 w-3.5" /> Upload MP3 ke Server
              </button>
              <button
                type="button"
                onClick={() => setUploadMode('url')}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-all cursor-pointer flex items-center gap-1.5 ${
                  uploadMode === 'url'
                    ? 'bg-white text-gray-900 shadow-xs'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                <LinkIcon className="h-3.5 w-3.5" /> Link URL Eksternal
              </button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form ref={formRef} onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div className="space-y-2">
              <Label htmlFor="title">Judul Lagu *</Label>
              <Input id="title" name="title" required placeholder="Contoh: A Thousand Years" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="artist">Penyanyi / Artis</Label>
              <Input id="artist" name="artist" placeholder="Contoh: Christina Perri" />
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

            {uploadMode === 'file' ? (
              <div className="space-y-2">
                <Label htmlFor="audioFile">File MP3 (Server Upload) *</Label>
                <div className="relative">
                  <Input
                    id="audioFile"
                    name="audioFile"
                    type="file"
                    accept="audio/mp3,audio/mpeg,audio/wav,audio/ogg"
                    required={uploadMode === 'file'}
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      setSelectedFileName(file ? file.name : '')
                    }}
                    className="cursor-pointer text-xs"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="fileUrl">URL File Audio (MP3) *</Label>
                <Input
                  id="fileUrl"
                  name="fileUrl"
                  required={uploadMode === 'url'}
                  placeholder="https://domain.com/audio.mp3"
                />
              </div>
            )}

            <div className="md:col-span-4 flex justify-end pt-2">
              <Button type="submit" disabled={isPending}>
                {isPending ? 'Mengunggah & Menyimpan...' : (
                  <>
                    <Plus className="mr-2 h-4 w-4" /> Simpan ke Katalog Musik
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Music Catalogue List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Daftar Lagu di Server & Katalog ({musicList.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="divide-y border rounded-md overflow-hidden">
            {musicList.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground text-sm">
                Belum ada lagu di katalog. Tambahkan lagu pertama Anda di atas.
              </div>
            ) : (
              musicList.map((m) => {
                const isPlaying = playingId === m.id

                return (
                  <div
                    key={m.id}
                    className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-gray-50/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {/* Audio Play Button */}
                      <button
                        type="button"
                        onClick={() => handlePreview(m.id, m.fileUrl)}
                        className={`h-10 w-10 rounded-full flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                          isPlaying
                            ? 'bg-primary text-primary-foreground animate-pulse shadow-sm'
                            : 'bg-gray-100 hover:bg-primary/20 text-gray-700'
                        }`}
                        title={isPlaying ? 'Pause Audio' : 'Play Audio'}
                      >
                        {isPlaying ? (
                          <Pause className="h-4 w-4 fill-current" />
                        ) : (
                          <Play className="h-4 w-4 fill-current ml-0.5" />
                        )}
                      </button>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-semibold text-sm">{m.title}</span>
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
                            {m.usageCount} Undangan Memakai
                          </Badge>
                          {m.fileUrl.startsWith('/music/') && (
                            <Badge variant="outline" className="text-[10px] bg-blue-50 text-blue-700 border-blue-200">
                              Hosted on Server
                            </Badge>
                          )}
                        </div>

                        {m.fileUrl && (
                          <p className="text-[11px] text-muted-foreground font-mono truncate max-w-md">
                            {m.fileUrl}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 self-end md:self-center">
                      <Button
                        type="button"
                        variant={m.isActive ? 'outline' : 'default'}
                        size="sm"
                        className="h-8 text-xs"
                        onClick={() => handleToggle(m.id, m.isActive)}
                        disabled={isPending}
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

                      <Button
                        variant="ghost"
                        size="icon"
                        type="button"
                        onClick={() => handleDelete(m.id, m.title)}
                        disabled={isPending}
                        className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                        title="Hapus Lagu"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )
              })
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
