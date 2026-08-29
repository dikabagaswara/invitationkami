'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'
import { 
  Share2, 
  Copy, 
  Send, 
  Check, 
  Sparkles, 
  FileText, 
  RefreshCw, 
  ExternalLink,
  MessageCircle,
  Users,
  ArrowLeft,
  Link2,
  Lock
} from 'lucide-react'

export interface InvitationOption {
  id: string
  slug: string
  groomName: string
  brideName: string
  themeName: string
  eventDate?: string
  venue?: string
}

const DEFAULT_MESSAGE_TEMPLATE = `Kepada Yth.
Bapak/Ibu/Saudara/i: *{nama}*

Tanpa mengurangi rasa hormat, perkenankan kami mengundang Anda untuk menghadiri acara pernikahan kami:

*{pengantin}*

Berikut tautan undangan digital Anda:
🔗 {link}

Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.

Terima kasih.
Hormat kami,
*{pengantin}*`

export function ShareGeneratorClient({
  invitations,
  baseUrl,
  isLoggedIn = false,
}: {
  invitations: InvitationOption[]
  baseUrl: string
  isLoggedIn?: boolean
}) {
  // Mode selection: 'preset' (if has invitations in DB) or 'manual' (input slug directly)
  const [selectedInvId, setSelectedInvId] = useState<string>(invitations[0]?.id || 'custom')
  const [customSlug, setCustomSlug] = useState<string>('demo-elegant')
  const [customCouple, setCustomCouple] = useState<string>('Romeo & Juliet')

  const [guestNamesInput, setGuestNamesInput] = useState<string>(
    'Dika dan Istri\nNurdi dan Istri\nBapak Ahmad & Keluarga\nSahabat Terbaik (Agus)\nKeluarga Besar Budi'
  )
  const [messageTemplate, setMessageTemplate] = useState<string>(DEFAULT_MESSAGE_TEMPLATE)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [copiedAll, setCopiedAll] = useState(false)

  const isCustomMode = selectedInvId === 'custom' || invitations.length === 0
  const selectedInvitation = invitations.find((inv) => inv.id === selectedInvId)

  const activeSlug = isCustomMode ? (customSlug.trim() || 'demo-elegant') : (selectedInvitation?.slug || 'demo-elegant')
  const coupleTitle = isCustomMode 
    ? (customCouple.trim() || 'Mempelai')
    : (selectedInvitation ? `${selectedInvitation.groomName} & ${selectedInvitation.brideName}` : 'Mempelai')

  // Parse names line by line (filter empty lines)
  const guestList = guestNamesInput
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)

  // Generate links and personalized messages
  const generatedShares = guestList.map((name, index) => {
    // Sanitize slug if user inputs full url or just slug
    let cleanSlug = activeSlug
    if (cleanSlug.startsWith('http://') || cleanSlug.startsWith('https://')) {
      try {
        const urlObj = new URL(cleanSlug)
        cleanSlug = urlObj.pathname.replace(/^\/i\//, '').replace(/^\//, '')
      } catch {
        // keep as is
      }
    } else if (cleanSlug.startsWith('/i/')) {
      cleanSlug = cleanSlug.replace(/^\/i\//, '')
    }

    const link = `${baseUrl}/i/${cleanSlug}?to=${encodeURIComponent(name)}`
    const message = messageTemplate
      .replace(/{nama}/g, name)
      .replace(/{pengantin}/g, coupleTitle)
      .replace(/{link}/g, link)

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`

    return {
      index,
      name,
      link,
      message,
      whatsappUrl,
    }
  })

  // Copy single message
  const handleCopyMessage = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedIndex(index)
      toast.success(`Pesan untuk "${guestList[index]}" berhasil disalin!`)
      setTimeout(() => setCopiedIndex(null), 2000)
    } catch {
      toast.error('Gagal menyalin pesan')
    }
  }

  // Copy single link only
  const handleCopyLink = async (link: string, name: string) => {
    try {
      await navigator.clipboard.writeText(link)
      toast.success(`Link untuk "${name}" disalin!`)
    } catch {
      toast.error('Gagal menyalin link')
    }
  }

  // Copy all messages at once
  const handleCopyAll = async () => {
    if (generatedShares.length === 0) return
    const allText = generatedShares
      .map((item) => `==============================\nUNTUK: ${item.name}\n==============================\n${item.message}\n`)
      .join('\n\n')

    try {
      await navigator.clipboard.writeText(allText)
      setCopiedAll(true)
      toast.success(`Semua (${generatedShares.length}) pesan berhasil disalin!`)
      setTimeout(() => setCopiedAll(false), 2500)
    } catch {
      toast.error('Gagal menyalin pesan')
    }
  }

  // Reset template
  const handleResetTemplate = () => {
    setMessageTemplate(DEFAULT_MESSAGE_TEMPLATE)
    toast.info('Format pesan dikembalikan ke default')
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-stone-900 font-sans selection:bg-stone-200">
      {/* ─── Top Public Header ─── */}
      <header className="sticky top-0 z-50 bg-[#FAF9F6]/90 backdrop-blur-md border-b border-stone-200/70">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <img src="/images/logo.png" alt="Logo" className="h-8 w-auto object-contain" />
            <span className="font-serif tracking-wider text-sm sm:text-base text-stone-900 uppercase font-medium">
              InvitationKami
            </span>
          </Link>

          <div className="flex items-center gap-3 text-xs">
            {isLoggedIn ? (
              <Link
                href="/dashboard"
                className="px-4 py-1.5 rounded-full bg-stone-900 text-white font-medium hover:bg-stone-800 transition-all shadow-xs"
              >
                Dashboard Anda
              </Link>
            ) : (
              <>
                <Link
                  href="/"
                  className="hidden sm:inline-flex items-center gap-1 text-stone-600 hover:text-stone-900 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Beranda
                </Link>
                <Link
                  href="/login"
                  className="px-4 py-1.5 rounded-full border border-stone-300 text-stone-900 hover:bg-stone-900 hover:text-white transition-all shadow-xs"
                >
                  Masuk Akun
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* ─── Main Content Container ─── */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-8">
        {/* Header Hero Card */}
        <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 text-white rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative z-10 space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
              <Share2 className="w-3.5 h-3.5" />
              <span>Free Public Tool • Bagikan Undangan Massal</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-serif font-normal tracking-tight">
              Generator Link &amp; Pesan WhatsApp Tamu
            </h1>
            <p className="text-stone-300 text-xs sm:text-sm font-light max-w-2xl leading-relaxed">
              Buat link undangan personal &amp; draf pesan WhatsApp untuk banyak tamu sekaligus (contoh: <em>&quot;Dika dan Istri&quot;</em>, <em>&quot;Nurdi dan Istri&quot;</em>) dengan 1 kali klik.
            </p>
          </div>
        </div>

        {/* Configuration Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Input Settings (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="rounded-2xl border-stone-200 shadow-xs bg-white">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  1. Data Undangan
                </CardTitle>
                <CardDescription>
                  Pilih undangan dari akun Anda atau masukkan tautan / slug manual.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {invitations.length > 0 && (
                  <div className="space-y-2">
                    <Label htmlFor="invitation-select">Pilih Dari Daftar Undangan</Label>
                    <Select value={selectedInvId} onValueChange={(val) => setSelectedInvId(val ?? '')}>
                      <SelectTrigger id="invitation-select" className="w-full">
                        <SelectValue placeholder="Pilih undangan..." />
                      </SelectTrigger>
                      <SelectContent>
                        {invitations.map((inv) => (
                          <SelectItem key={inv.id} value={inv.id}>
                            {inv.groomName} &amp; {inv.brideName} ({inv.themeName}) - /{inv.slug}
                          </SelectItem>
                        ))}
                        <SelectItem value="custom">✍️ Tulis Slug / Tautan Manual</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {isCustomMode && (
                  <div className="space-y-3 pt-1">
                    <div className="space-y-1.5">
                      <Label htmlFor="custom-slug" className="text-xs">
                        Slug atau URL Undangan
                      </Label>
                      <div className="relative">
                        <Input
                          id="custom-slug"
                          value={customSlug}
                          onChange={(e) => setCustomSlug(e.target.value)}
                          placeholder="contoh: dika-dan-istri atau demo-oceanic"
                          className="font-mono text-xs pl-8"
                        />
                        <Link2 className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-400" />
                      </div>
                      <p className="text-[11px] text-stone-500">
                        Target Link: <code className="text-stone-800 font-mono">{baseUrl}/i/{activeSlug}</code>
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="custom-couple" className="text-xs">
                        Nama Mempelai (Untuk Pesan WA)
                      </Label>
                      <Input
                        id="custom-couple"
                        value={customCouple}
                        onChange={(e) => setCustomCouple(e.target.value)}
                        placeholder="contoh: Romeo & Juliet"
                        className="text-xs"
                      />
                    </div>
                  </div>
                )}

                {!isCustomMode && selectedInvitation && (
                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 text-xs space-y-1 text-stone-600">
                    <p><strong className="text-stone-900">Mempelai:</strong> {selectedInvitation.groomName} &amp; {selectedInvitation.brideName}</p>
                    <p><strong className="text-stone-900">Tema:</strong> {selectedInvitation.themeName}</p>
                    <p><strong className="text-stone-900">Link Utama:</strong> <span className="font-mono text-stone-800">{baseUrl}/i/{selectedInvitation.slug}</span></p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-stone-200 shadow-xs bg-white">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-600" />
                  2. Daftar Nama Tamu
                </CardTitle>
                <CardDescription>
                  Tulis satu nama per baris (bebas pakai &quot;&amp;&quot;, &quot;dan istri&quot;, &quot;keluarga&quot;).
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Textarea
                  rows={8}
                  value={guestNamesInput}
                  onChange={(e) => setGuestNamesInput(e.target.value)}
                  placeholder={"Dika dan Istri\nNurdi dan Istri\nBapak Agus & Keluarga\nTeman Kantor"}
                  className="font-mono text-xs leading-relaxed"
                />
                <div className="flex items-center justify-between text-xs text-stone-500">
                  <span>Total Tamu: <strong className="text-stone-900">{guestList.length} orang/pasangan</strong></span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setGuestNamesInput('')}
                    className="h-7 text-[11px] text-red-600 hover:text-red-700"
                  >
                    Kosongkan
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-stone-200 shadow-xs bg-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div>
                  <CardTitle className="text-base flex items-center gap-2">
                    <FileText className="w-4 h-4 text-stone-600" />
                    3. Format Pesan WhatsApp
                  </CardTitle>
                  <CardDescription className="mt-1">
                    Tag otomatis: <code className="text-[11px] bg-stone-100 px-1 py-0.5 rounded text-stone-800">{'{nama}'}</code>, <code className="text-[11px] bg-stone-100 px-1 py-0.5 rounded text-stone-800">{'{pengantin}'}</code>, <code className="text-[11px] bg-stone-100 px-1 py-0.5 rounded text-stone-800">{'{link}'}</code>
                  </CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleResetTemplate}
                  title="Kembalikan ke template default"
                  className="h-8 w-8"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                </Button>
              </CardHeader>
              <CardContent className="pt-2">
                <Textarea
                  rows={9}
                  value={messageTemplate}
                  onChange={(e) => setMessageTemplate(e.target.value)}
                  className="text-xs leading-relaxed font-sans"
                />
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Output Results (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <Card className="rounded-2xl border-stone-200 shadow-xs bg-white">
              <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
                <div>
                  <CardTitle className="text-base flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-emerald-600" />
                    Hasil Link &amp; Pesan Siap Kirim ({generatedShares.length})
                  </CardTitle>
                  <CardDescription>
                    Klik kirim via WhatsApp atau salin pesan/link untuk masing-masing tamu.
                  </CardDescription>
                </div>
                {generatedShares.length > 0 && (
                  <Button
                    onClick={handleCopyAll}
                    size="sm"
                    variant="outline"
                    className="shrink-0 text-xs gap-1.5 border-stone-300"
                  >
                    {copiedAll ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                    Salin Semua ({generatedShares.length})
                  </Button>
                )}
              </CardHeader>
              <CardContent className="pt-6 space-y-4 max-h-[850px] overflow-y-auto pr-2">
                {generatedShares.length === 0 ? (
                  <div className="text-center py-16 text-stone-400 space-y-2">
                    <Users className="w-8 h-8 mx-auto stroke-1" />
                    <p className="text-sm">Belum ada nama tamu yang dimasukkan.</p>
                    <p className="text-xs text-stone-400">Tulis daftar nama pada kotak di sebelah kiri untuk membuat link otomatis.</p>
                  </div>
                ) : (
                  generatedShares.map((item) => {
                    const isCopied = copiedIndex === item.index

                    return (
                      <div
                        key={item.index}
                        className="p-4 rounded-xl border border-stone-200 bg-white hover:border-stone-400 transition-all duration-200 space-y-3 shadow-2xs"
                      >
                        {/* Top Header of Card */}
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-stone-900 text-white text-[11px] font-bold flex items-center justify-center">
                              {item.index + 1}
                            </span>
                            <span className="font-semibold text-sm text-stone-900">{item.name}</span>
                          </div>

                          {/* Quick Link Opener */}
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] text-stone-500 hover:text-stone-900 font-medium transition-colors"
                          >
                            Tes Buka <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>

                        {/* Direct Unique URL Display */}
                        <div className="flex items-center gap-2 bg-stone-50 p-2 rounded-lg border border-stone-200/80 font-mono text-[11px] text-stone-600 overflow-x-auto">
                          <span className="truncate flex-1">{item.link}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleCopyLink(item.link, item.name)}
                            className="h-6 w-6 shrink-0 text-stone-500 hover:text-stone-900"
                            title="Salin Link Saja"
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                        </div>

                        {/* Message Preview Box */}
                        <div className="p-3 bg-emerald-50/50 border border-emerald-100 rounded-lg text-xs text-stone-800 whitespace-pre-line leading-relaxed font-sans max-h-36 overflow-y-auto">
                          {item.message}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center justify-end gap-2 pt-1">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleCopyMessage(item.message, item.index)}
                            className="h-8 text-xs gap-1.5"
                          >
                            {isCopied ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-green-600" /> Tersalin!
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" /> Salin Pesan
                              </>
                            )}
                          </Button>

                          <Button
                            asChild
                            size="sm"
                            className="h-8 text-xs gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs"
                          >
                            <a href={item.whatsappUrl} target="_blank" rel="noopener noreferrer">
                              <Send className="w-3.5 h-3.5" /> Kirim WhatsApp
                            </a>
                          </Button>
                        </div>
                      </div>
                    )
                  })
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* ─── Footer ─── */}
      <footer className="border-t border-stone-200/80 py-8 text-center text-xs text-stone-400 font-light">
        <p>© 2026 InvitationKami</p>
      </footer>
    </div>
  )
}
