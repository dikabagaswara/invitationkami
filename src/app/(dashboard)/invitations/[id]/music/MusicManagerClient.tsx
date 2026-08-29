'use client'

import { useState, useTransition, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Music as MusicIcon, Check, Play, Pause, Disc, Link as LinkIcon, Volume2 } from 'lucide-react'
import { toast } from 'sonner'

interface MusicItem {
  id: string
  title: string
  artist: string | null
  fileUrl: string
  category: string | null
}

export function MusicManagerClient({
  invitationId,
  currentMusicId,
  currentMusicUrl,
  musicList,
  updateMusicAction,
}: {
  invitationId: string
  currentMusicId: string | null
  currentMusicUrl: string | null
  musicList: MusicItem[]
  updateMusicAction: (musicId: string | null, customUrl?: string) => Promise<void>
}) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [selectedMusicId, setSelectedMusicId] = useState<string | null>(currentMusicId)
  const [customUrl, setCustomUrl] = useState(
    !currentMusicId && currentMusicUrl ? currentMusicUrl : ''
  )
  const [playingId, setPlayingId] = useState<string | null>(null)
  const previewAudioRef = useRef<HTMLAudioElement | null>(null)

  const handlePreview = (id: string, url: string) => {
    if (!url) {
      toast.error('File audio belum tersedia untuk preview')
      return
    }

    if (playingId === id) {
      previewAudioRef.current?.pause()
      setPlayingId(null)
    } else {
      if (previewAudioRef.current) {
        previewAudioRef.current.src = url
        previewAudioRef.current.play().then(() => {
          setPlayingId(id)
        }).catch((err) => {
          console.warn(err)
          toast.error('Gagal memutar preview lagu')
        })
      }
    }
  }

  const handleSelectMusic = (musicId: string | null) => {
    setSelectedMusicId(musicId)
    startTransition(async () => {
      try {
        await updateMusicAction(musicId)
        toast.success(musicId ? 'Lagu berhasil dipilih' : 'Mode tanpa musik diaktifkan')
        router.refresh()
      } catch {
        toast.error('Gagal memperbarui musik')
      }
    })
  }

  const handleSaveCustomUrl = () => {
    if (!customUrl.trim()) {
      handleSelectMusic(null)
      return
    }

    startTransition(async () => {
      try {
        await updateMusicAction(null, customUrl.trim())
        setSelectedMusicId(null)
        toast.success('Custom URL musik berhasil disimpan')
        router.refresh()
      } catch {
        toast.error('Gagal menyimpan custom URL musik')
      }
    })
  }

  return (
    <div className="space-y-8">
      {/* Hidden Audio Player for Preview */}
      <audio
        ref={previewAudioRef}
        onEnded={() => setPlayingId(null)}
        onError={() => setPlayingId(null)}
      />

      <div>
        <h1 className="text-2xl font-bold tracking-tight">Musik Latar Belakang</h1>
        <p className="text-muted-foreground mt-1">
          Pilih lagu romantis dari katalog atau masukkan URL MP3 kustom yang akan diputar otomatis saat tamu membuka undangan Anda.
        </p>
      </div>

      {/* Custom Music URL Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <LinkIcon className="h-4 w-4 text-primary" /> Custom URL Lagu (MP3 Sendiri)
          </CardTitle>
          <CardDescription>
            Punya lagu kenangan sendiri? Masukkan link langsung file audio MP3 (contoh: https://domain.com/lagu-kita.mp3).
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <Input
                placeholder="https://.../wedding-song.mp3"
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex gap-2">
              {customUrl && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handlePreview('custom', customUrl)}
                  disabled={isPending}
                >
                  {playingId === 'custom' ? (
                    <>
                      <Pause className="mr-1 h-3.5 w-3.5 fill-current" /> Pause
                    </>
                  ) : (
                    <>
                      <Play className="mr-1 h-3.5 w-3.5 fill-current" /> Dengar
                    </>
                  )}
                </Button>
              )}
              <Button
                type="button"
                onClick={handleSaveCustomUrl}
                disabled={isPending}
                size="sm"
              >
                Simpan Lagu Kustom
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Catalog Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Disc className="h-5 w-5 text-primary" /> Pilihan Lagu dari Katalog
        </h2>

        <div className="grid gap-3">
          {/* Option: Tanpa Musik */}
          <Card
            className={`transition border ${
              !selectedMusicId && !customUrl
                ? 'border-primary ring-2 ring-primary/20 bg-primary/5'
                : 'hover:border-gray-300'
            }`}
          >
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                  <MusicIcon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-medium text-sm">Tanpa Musik Latar</p>
                  <p className="text-xs text-muted-foreground">Undangan dibuka dalam keadaan hening</p>
                </div>
              </div>

              <Button
                type="button"
                variant={!selectedMusicId && !customUrl ? 'default' : 'outline'}
                size="sm"
                onClick={() => {
                  setCustomUrl('')
                  handleSelectMusic(null)
                }}
                disabled={isPending}
              >
                {!selectedMusicId && !customUrl ? (
                  <>
                    <Check className="mr-1 h-4 w-4" /> Aktif
                  </>
                ) : (
                  'Pilih'
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Music Items from Catalogue */}
          {musicList.map((m) => {
            const isSelected = selectedMusicId === m.id
            const isAudioPlaying = playingId === m.id

            return (
              <Card
                key={m.id}
                className={`transition border ${
                  isSelected
                    ? 'border-primary ring-2 ring-primary/20 bg-primary/5'
                    : 'hover:border-gray-300'
                }`}
              >
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handlePreview(m.id, m.fileUrl)}
                      className={`h-10 w-10 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                        isAudioPlaying
                          ? 'bg-primary text-primary-foreground animate-pulse'
                          : 'bg-gray-100 hover:bg-primary/20 text-gray-700'
                      }`}
                      title={isAudioPlaying ? 'Stop Preview' : 'Play Preview'}
                    >
                      {isAudioPlaying ? (
                        <Pause className="h-4 w-4 fill-current" />
                      ) : (
                        <Play className="h-4 w-4 fill-current ml-0.5" />
                      )}
                    </button>
                    <div>
                      <p className="font-semibold text-sm">{m.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {m.artist || 'Instrumental Wedding'} {m.category && `• ${m.category}`}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {m.fileUrl && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="text-xs text-muted-foreground hidden sm:flex"
                        onClick={() => handlePreview(m.id, m.fileUrl)}
                      >
                        <Volume2 className="h-3.5 w-3.5 mr-1" />
                        {isAudioPlaying ? 'Jeda' : 'Preview'}
                      </Button>
                    )}

                    <Button
                      type="button"
                      variant={isSelected ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => {
                        setCustomUrl('')
                        handleSelectMusic(m.id)
                      }}
                      disabled={isPending}
                    >
                      {isSelected ? (
                        <>
                          <Check className="mr-1 h-4 w-4" /> Digunakan
                        </>
                      ) : (
                        'Gunakan'
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
