'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { 
  Share2, 
  Copy, 
  Send, 
  Check, 
  Link2, 
  FileText, 
  RefreshCw, 
  ExternalLink,
  MessageCircle,
  Users,
  ArrowLeft,
  Heart
} from 'lucide-react'

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
  baseUrl,
  isLoggedIn = false,
}: {
  baseUrl: string
  isLoggedIn?: boolean
}) {
  // Pure Manual Input Mode
  const [invitationUrlInput, setInvitationUrlInput] = useState<string>('demo-oceanic')
  const [coupleNameInput, setCoupleNameInput] = useState<string>('Romeo & Juliet')

  // Guest list manual copas
  const [guestNamesInput, setGuestNamesInput] = useState<string>(
    'Dika dan Istri\nKeluarga Besar Ahmad'
  )
  const [messageTemplate, setMessageTemplate] = useState<string>(DEFAULT_MESSAGE_TEMPLATE)
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [copiedAll, setCopiedAll] = useState(false)

  // Clean slug / URL from input (supports full URL or just slug)
  let cleanSlug = invitationUrlInput.trim() || 'demo-oceanic'
  if (cleanSlug.startsWith('http://') || cleanSlug.startsWith('https://')) {
    try {
      const urlObj = new URL(cleanSlug)
      cleanSlug = urlObj.pathname.replace(/^\/i\//, '').replace(/^\//, '')
    } catch {
      // keep as is
    }
  } else if (cleanSlug.startsWith('/i/')) {
    cleanSlug = cleanSlug.replace(/^\/i\//, '')
  } else if (cleanSlug.startsWith('/')) {
    cleanSlug = cleanSlug.replace(/^\//, '')
  }

  const coupleTitle = coupleNameInput.trim() || 'Mempelai'

  // Parse names line by line (filter empty lines)
  const guestList = guestNamesInput
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0)

  // Generate links and personalized messages
  const generatedShares = guestList.map((name, index) => {
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
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 font-sans selection:bg-amber-100">
      {/* ─── Top Public Header (Responsive) ─── */}
      <header className="sticky top-0 z-50 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-stone-200/70">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-white shadow-xs border border-stone-200 flex items-center justify-center p-1.5 overflow-hidden">
              <img src="/images/logo.png" alt="Logo" className="w-full h-full object-contain" />
            </div>
            <span className="font-serif tracking-wider text-base text-stone-900 uppercase font-semibold">
              InvitationKami
            </span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3 text-xs">
            {isLoggedIn ? (
              <Link
                href="/dashboard"
                className="px-3.5 py-1.5 rounded-full bg-stone-900 text-white font-medium hover:bg-stone-800 transition-all shadow-xs"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                href="/"
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-stone-200 bg-white text-stone-700 hover:text-stone-900 hover:bg-stone-50 transition-colors shadow-2xs font-medium"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Beranda
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* ─── Main Content Container (Mobile Optimized) ─── */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6 sm:space-y-8">
        {/* Header Hero Card */}
        <div className="bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 text-white rounded-2xl sm:rounded-3xl p-5 sm:p-9 shadow-md relative overflow-hidden">
          <div className="absolute top-0 right-0 w-60 sm:w-80 h-60 sm:h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative z-10 space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/10 text-amber-300 text-[10px] sm:text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
              <Share2 className="w-3 h-3" />
              <span>Generator Link Tamu</span>
            </div>
            <h1 className="text-xl sm:text-3xl font-serif font-normal tracking-tight">
              Bagi Undangan &amp; Pesan WhatsApp
            </h1>
            <p className="text-stone-300 text-xs sm:text-sm font-light max-w-2xl leading-relaxed">
              Cukup masukkan link undangan dan copas daftar nama tamu. Sistem otomatis membuat tautan personal dan format pesan siap kirim.
            </p>
          </div>
        </div>

        {/* Configuration Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
          {/* Left Column: Input Settings (5 Cols) */}
          <div className="lg:col-span-5 space-y-5">
            {/* 1. Manual Link & Couple Name */}
            <Card className="rounded-2xl border-stone-200/90 shadow-xs bg-white">
              <CardHeader className="p-4 sm:p-6 pb-2 sm:pb-3">
                <CardTitle className="text-sm sm:text-base flex items-center gap-2">
                  <Link2 className="w-4 h-4 text-amber-600" />
                  1. Link &amp; Nama Undangan
                </CardTitle>
                <CardDescription className="text-xs">
                  Masukkan link/slug undangan dan nama kedua mempelai.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0 space-y-3.5">
                <div className="space-y-1.5">
                  <Label htmlFor="invitation-url" className="text-xs font-medium">
                    Link atau Slug Undangan
                  </Label>
                  <div className="relative">
                    <Input
                      id="invitation-url"
                      value={invitationUrlInput}
                      onChange={(e) => setInvitationUrlInput(e.target.value)}
                      placeholder="contoh: bagas-anggra atau demo-blossom"
                      className="font-mono text-xs pl-8 h-9"
                    />
                    <Link2 className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-400" />
                  </div>
                  <p className="text-[11px] text-stone-500 break-all">
                    Target URL: <code className="text-stone-900 font-mono font-medium">{baseUrl}/i/{cleanSlug}</code>
                  </p>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="couple-name" className="text-xs font-medium">
                    Nama Mempelai (Untuk Format Pesan WA)
                  </Label>
                  <div className="relative">
                    <Input
                      id="couple-name"
                      value={coupleNameInput}
                      onChange={(e) => setCoupleNameInput(e.target.value)}
                      placeholder="contoh: Romeo & Juliet"
                      className="text-xs pl-8 h-9"
                    />
                    <Heart className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-rose-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 2. Manual Guest List Copas */}
            <Card className="rounded-2xl border-stone-200/90 shadow-xs bg-white">
              <CardHeader className="p-4 sm:p-6 pb-2 sm:pb-3">
                <CardTitle className="text-sm sm:text-base flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-600" />
                  2. Daftar Nama Tamu (Copas)
                </CardTitle>
                <CardDescription className="text-xs">
                  Copas daftar nama tamu di bawah (1 nama per baris).
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0 sm:pt-0 space-y-3">
                <Textarea
                  rows={5}
                  value={guestNamesInput}
                  onChange={(e) => setGuestNamesInput(e.target.value)}
                  placeholder={"Dika dan Istri\nKeluarga Besar Ahmad"}
                  className="font-mono text-xs leading-relaxed"
                />
                <div className="flex items-center justify-between text-xs text-stone-500">
                  <span>Total: <strong className="text-stone-900">{guestList.length} tamu</strong></span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setGuestNamesInput('')}
                    className="h-6 text-[11px] text-red-600 hover:text-red-700 px-2"
                  >
                    Kosongkan
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* 3. WhatsApp Message Template */}
            <Card className="rounded-2xl border-stone-200/90 shadow-xs bg-white">
              <CardHeader className="p-4 sm:p-6 pb-2 sm:pb-2 flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle className="text-sm sm:text-base flex items-center gap-2">
                    <FileText className="w-4 h-4 text-stone-600" />
                    3. Format Pesan WhatsApp
                  </CardTitle>
                  <CardDescription className="text-xs mt-0.5">
                    Tag: <code className="text-[10px] bg-stone-100 px-1 py-0.5 rounded text-stone-800">{'{nama}'}</code> <code className="text-[10px] bg-stone-100 px-1 py-0.5 rounded text-stone-800">{'{link}'}</code>
                  </CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleResetTemplate}
                  title="Kembalikan ke template default"
                  className="h-7 w-7 shrink-0"
                >
                  <RefreshCw className="h-3.5 w-3.5" />
                </Button>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-1 sm:pt-1">
                <Textarea
                  rows={6}
                  value={messageTemplate}
                  onChange={(e) => setMessageTemplate(e.target.value)}
                  className="text-xs leading-relaxed font-sans"
                />
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Output Results (7 Cols) */}
          <div className="lg:col-span-7 space-y-5">
            <Card className="rounded-2xl border-stone-200/90 shadow-xs bg-white">
              <CardHeader className="p-4 sm:p-6 pb-3 sm:pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-100">
                <div>
                  <CardTitle className="text-sm sm:text-base flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-emerald-600" />
                    Hasil Siap Kirim ({generatedShares.length})
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Klik kirim via WhatsApp atau salin pesan/link untuk masing-masing tamu.
                  </CardDescription>
                </div>
                {generatedShares.length > 0 && (
                  <Button
                    onClick={handleCopyAll}
                    size="sm"
                    variant="outline"
                    className="w-full sm:w-auto shrink-0 text-xs gap-1.5 border-stone-300 h-8"
                  >
                    {copiedAll ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                    Salin Semua ({generatedShares.length})
                  </Button>
                )}
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-4 sm:pt-6 space-y-3.5 max-h-[850px] overflow-y-auto">
                {generatedShares.length === 0 ? (
                  <div className="text-center py-12 text-stone-400 space-y-2">
                    <Users className="w-8 h-8 mx-auto stroke-1 text-stone-300" />
                    <p className="text-xs sm:text-sm">Belum ada nama tamu yang dimasukkan.</p>
                    <p className="text-[11px] text-stone-400">Tulis atau copas daftar nama pada kotak input untuk membuat link otomatis.</p>
                  </div>
                ) : (
                  generatedShares.map((item) => {
                    const isCopied = copiedIndex === item.index

                    return (
                      <div
                        key={item.index}
                        className="p-3.5 sm:p-4 rounded-xl border border-stone-200 bg-white hover:border-stone-400 transition-all duration-200 space-y-2.5 shadow-2xs"
                      >
                        {/* Top Header of Card */}
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 min-w-0">
                            <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-stone-900 text-white text-[10px] sm:text-[11px] font-bold flex items-center justify-center shrink-0">
                              {item.index + 1}
                            </span>
                            <span className="font-semibold text-xs sm:text-sm text-stone-900 truncate">{item.name}</span>
                          </div>

                          {/* Quick Link Opener */}
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] text-stone-500 hover:text-stone-900 font-medium transition-colors shrink-0"
                          >
                            Tes Buka <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>

                        {/* Direct Unique URL Display */}
                        <div className="flex items-center gap-2 bg-stone-50 p-2 rounded-lg border border-stone-200/80 font-mono text-[11px] text-stone-600">
                          <span className="truncate flex-1 text-[10px] sm:text-[11px]">{item.link}</span>
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
                        <div className="p-2.5 sm:p-3 bg-emerald-50/50 border border-emerald-100 rounded-lg text-[11px] sm:text-xs text-stone-800 whitespace-pre-line leading-relaxed font-sans max-h-32 overflow-y-auto">
                          {item.message}
                        </div>

                        {/* Action Buttons (Flex col on small mobile, row on tablet/desktop) */}
                        <div className="flex items-center justify-end gap-2 pt-1">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleCopyMessage(item.message, item.index)}
                            className="h-8 text-xs gap-1.5 flex-1 sm:flex-initial"
                          >
                            {isCopied ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-green-600" /> Tersalin
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
                            className="h-8 text-xs gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs flex-1 sm:flex-initial"
                          >
                            <a href={item.whatsappUrl} target="_blank" rel="noopener noreferrer">
                              <Send className="w-3.5 h-3.5" /> Kirim WA
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
      <footer className="border-t border-stone-200/80 py-6 sm:py-8 text-center text-xs text-stone-400 font-light px-4">
        <p>© 2026 InvitationKami</p>
      </footer>
    </div>
  )
}
