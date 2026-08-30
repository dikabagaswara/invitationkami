'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { updateBasicInfoAction, deleteInvitationAction, duplicateInvitationAction } from '../../actions'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { toast } from 'sonner'
import { Loader2, AlertTriangle, Link as LinkIcon, Globe, Lock, Copy } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'

export default function SettingsManager({
  invitationId,
  initialSlug,
  initialIsPublished
}: {
  invitationId: string
  initialSlug: string
  initialIsPublished: boolean
}) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  
  const [slug, setSlug] = useState(initialSlug)
  const [isPublished, setIsPublished] = useState(initialIsPublished)

  async function handleSaveSettings() {
    if (slug.length < 3) {
      toast.error("Tautan minimal 3 karakter")
      return
    }

    startTransition(async () => {
      try {
        await updateBasicInfoAction(invitationId, {
          slug: slug.toLowerCase().replace(/[^a-z0-9-]/g, '-'),
          isPublished
        })
        toast.success("Pengaturan berhasil disimpan")
        router.refresh()
      } catch {
        toast.error("Gagal menyimpan pengaturan, mungkin tautan sudah digunakan")
      }
    })
  }

  async function handleDelete() {
    const confirmText = prompt(`Untuk menghapus undangan ini, ketik "HAPUS ${slug}"`)
    if (confirmText !== `HAPUS ${slug}`) {
      if (confirmText !== null) toast.error("Konfirmasi tidak cocok. Batal menghapus.")
      return
    }
    
    startTransition(async () => {
      try {
        await deleteInvitationAction(invitationId)
        toast.success("Undangan berhasil dihapus")
        router.push('/dashboard')
      } catch {
        toast.error("Gagal menghapus undangan")
      }
    })
  }

  return (
    <div className="space-y-6 pb-12">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><LinkIcon className="h-5 w-5" /> Tautan Publik</CardTitle>
          <CardDescription>Atur alamat unik untuk undangan Anda.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Custom URL</Label>
            <div className="flex gap-2">
              <div className="flex items-center px-3 bg-muted border rounded-md rounded-r-none text-muted-foreground text-sm border-r-0">
                invitationkami.com/i/
              </div>
              <Input 
                value={slug}
                onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))}
                className="rounded-l-none font-mono"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">Gunakan huruf kecil, angka, dan strip (-). Contoh: rama-ayu</p>
          </div>

            <div className="pt-4 flex items-center justify-between border-t mt-6">
              <div className="space-y-0.5">
                <Label className="text-base flex items-center gap-2">
                  {isPublished ? <Globe className="h-4 w-4 text-green-500" /> : <Lock className="h-4 w-4 text-amber-500" />}
                  Status Publikasi
                </Label>
                <p className="text-sm text-muted-foreground">
                  {isPublished ? "Undangan dapat diakses oleh siapa saja dengan tautan." : "Undangan hanya dapat diakses oleh Anda."}
                </p>
              </div>
              <Switch
                checked={isPublished}
                onCheckedChange={setIsPublished}
              />
            </div>
            
            {isPublished && (
              <div className="pt-4 mt-4 border-t space-y-4">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  <div className="bg-white p-2 rounded-lg border shadow-sm w-fit">
                    <QRCodeSVG value={`https://invitationkami.com/i/${slug}`} size={120} />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Bagikan Undangan</h4>
                    <p className="text-sm text-muted-foreground">Scan QR Code atau salin tautan untuk membagikan undangan Anda.</p>
                    <div className="flex gap-2 items-center">
                      <Input readOnly value={`https://invitationkami.com/i/${slug}`} className="text-sm bg-muted/50" />
                      <Button variant="outline" size="icon" onClick={() => {
                        navigator.clipboard.writeText(`https://invitationkami.com/i/${slug}`)
                        toast.success("Tautan disalin")
                      }}>
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

          <div className="pt-4">
            <Button onClick={handleSaveSettings} disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Simpan Pengaturan
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Duplicate Invitation Section */}
      <Card className="border-amber-200/80 bg-amber-50/30">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2 text-amber-900">
            <Copy className="h-4 w-4 text-amber-700" /> Duplikasi Undangan Ini
          </CardTitle>
          <CardDescription className="text-amber-800/80">
            Salin seluruh susunan acara, galeri, cerita cinta, amplop kado, dan desain tema ini ke undangan baru. Sangat berguna untuk membedakan sesi Akad dan Resepsi.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              startTransition(async () => {
                try {
                  const res = await duplicateInvitationAction(invitationId)
                  toast.success("Undangan berhasil diduplikasi!")
                  router.push(`/invitations/${res.id}/couple`)
                } catch {
                  toast.error("Gagal menduplikasi undangan.")
                }
              })
            }}
            disabled={isPending}
            className="text-xs sm:text-sm text-amber-900 border-amber-300 hover:bg-amber-100/70"
          >
            {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Copy className="mr-2 h-4 w-4" />}
            Duplikat ke Undangan Baru
          </Button>
        </CardContent>
      </Card>

      <Card className="border-destructive/50">
        <CardHeader>
          <CardTitle className="text-destructive flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" /> Danger Zone
          </CardTitle>
          <CardDescription>
            Tindakan ini tidak dapat dibatalkan. Menghapus undangan akan menghapus seluruh data termasuk daftar tamu dan pesan dari buku tamu.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="destructive" onClick={handleDelete} disabled={isPending}>
            Hapus Undangan
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
