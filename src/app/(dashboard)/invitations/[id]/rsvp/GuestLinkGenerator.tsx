'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Link as LinkIcon, Copy, Check, ExternalLink, Sparkles, Send } from 'lucide-react'
import { toast } from 'sonner'

export function GuestLinkGenerator({
  slug,
  appUrl,
  groomName,
  brideName,
}: {
  slug: string
  appUrl: string
  groomName: string
  brideName: string
}) {
  const [customName, setCustomName] = useState('')
  const [phone, setPhone] = useState('')
  const [copied, setCopied] = useState(false)

  const guestName = customName.trim() || 'Nama Penerima'
  const generatedPath = `/i/${slug}?to=${encodeURIComponent(customName.trim() || 'Tamu Undangan')}`
  const fullLink = `${appUrl}${generatedPath}`

  const waMessage = `Kepada Yth. *${guestName}*,

Tanpa mengurangi rasa hormat, perkenankan kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan kami:

💍 *${groomName} & ${brideName}*

Detail acara dan konfirmasi kehadiran dapat diakses melalui link undangan berikut:
👉 ${fullLink}

Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila berkenan hadir dan memberikan doa restu.

Terima kasih.
— *${groomName} & ${brideName}*`

  const handleCopyLink = () => {
    navigator.clipboard.writeText(fullLink)
    setCopied(true)
    toast.success('Link undangan khusus berhasil disalin!')
    setTimeout(() => setCopied(false), 2000)
  }

  const handleCopyWaText = () => {
    navigator.clipboard.writeText(waMessage)
    toast.success('Teks pesan WhatsApp berhasil disalin!')
  }

  const handleSendWa = () => {
    if (!phone) {
      toast.error('Masukkan nomor WhatsApp terlebih dahulu')
      return
    }
    const cleanPhone = phone.replace(/[^0-9]/g, '').replace(/^0/, '62')
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(waMessage)}`, '_blank')
  }

  return (
    <Card className="border-primary/20 shadow-md">
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" /> Generator Link Undangan Custom
        </CardTitle>
        <CardDescription>
          Ketik nama tamu (misal: "Dika dan Istri", "Keluarga Budi", "Yohanes") untuk menghasilkan link personal dan format pesan WhatsApp resmi.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="customRecipient">Nama Tamu / Penerima Undangan *</Label>
            <Input
              id="customRecipient"
              placeholder="Contoh: Dika dan Istri / Yohanes"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="customPhone">Nomor WhatsApp Tamu (Opsional)</Label>
            <Input
              id="customPhone"
              placeholder="Contoh: 08123456789"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>

        {/* Generated Link Result */}
        <div className="p-3 bg-muted/60 rounded-lg border flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="space-y-0.5 overflow-hidden">
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
              Link Khusus Tamu:
            </p>
            <p className="text-xs font-mono text-primary truncate">
              {fullLink}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleCopyLink}
              className="text-xs h-8"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 mr-1 text-green-600" /> Tersalin
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5 mr-1" /> Salin Link
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              asChild
              className="text-xs h-8"
            >
              <a href={generatedPath} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-3.5 w-3.5 mr-1" /> Buka Preview
              </a>
            </Button>
          </div>
        </div>

        {/* WhatsApp Preview & Actions */}
        <div className="flex flex-col sm:flex-row gap-2 pt-1">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={handleCopyWaText}
            className="flex-1 text-xs"
          >
            <Copy className="h-3.5 w-3.5 mr-1.5" /> Salin Format Pesan WA Lengkap
          </Button>

          {phone && (
            <Button
              type="button"
              size="sm"
              onClick={handleSendWa}
              className="bg-green-600 hover:bg-green-700 text-white text-xs"
            >
              <Send className="h-3.5 w-3.5 mr-1.5" /> Kirim Langsung ke WA
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
