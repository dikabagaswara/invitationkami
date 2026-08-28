import Link from 'next/link'
import { prisma } from '@/lib/db'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { appConfig } from '@/lib/config'
import { 
  Sparkles, 
  ExternalLink, 
  Heart, 
  Music, 
  QrCode, 
  ShieldCheck, 
  Send, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  Flame
} from 'lucide-react'

export default async function HomePage() {
  const themes = await prisma.theme.findMany({
    where: { isActive: true },
    orderBy: { createdAt: 'asc' },
  })

  const themeThumbnails: Record<string, { img: string; tag: string; bgStyle: string }> = {
    elegant: {
      img: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop&q=80',
      tag: 'Classic & Timeless',
      bgStyle: 'from-amber-500/20 to-stone-900/80',
    },
    modern: {
      img: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&auto=format&fit=crop&q=80',
      tag: 'Bold & Editorial',
      bgStyle: 'from-zinc-900/60 to-black/90',
    },
    floral: {
      img: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&auto=format&fit=crop&q=80',
      tag: 'Romantic Garden',
      bgStyle: 'from-pink-500/20 to-rose-950/80',
    },
    luxury: {
      img: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=800&auto=format&fit=crop&q=80',
      tag: 'Dark & Royal Gold',
      bgStyle: 'from-amber-400/20 to-neutral-950/90',
    },
    minimalist: {
      img: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800&auto=format&fit=crop&q=80',
      tag: 'Clean & Pure White',
      bgStyle: 'from-slate-300/20 to-slate-900/80',
    },
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-rose-100 selection:text-rose-900">
      {/* Sticky Navbar */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/images/logo.png" alt={appConfig.name} className="h-9 w-auto object-contain" />
            <div>
              <span className="font-bold text-lg tracking-tight block leading-none">{appConfig.name}</span>
              <span className="text-[10px] text-muted-foreground font-sans">Wedding Platform</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#katalog" className="hover:text-slate-900 transition-colors">Katalog Tema</a>
            <a href="#fitur" className="hover:text-slate-900 transition-colors">Fitur Unggulan</a>
            <a href="#promo" className="hover:text-slate-900 transition-colors">Promo Spesial</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button size="sm" className="shadow-xs">
                Masuk ke Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden bg-radial from-rose-50/70 via-white to-slate-50">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold uppercase tracking-wider mb-6 animate-pulse">
            <Sparkles className="h-3.5 w-3.5" />
            Platform Undangan Pernikahan Digital Eksklusif
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-950 tracking-tight leading-[1.15] mb-6">
            Bagikan Momen Bahagiamu dengan <span className="bg-gradient-to-r from-rose-600 to-amber-600 bg-clip-text text-transparent">Elegan & Modern</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Platform undangan digital lengkap dengan musik latar, galeri foto, buku tamu live, RSVP interaktif, dan amplop digital dalam satu genggaman.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="#katalog">
              <Button size="lg" className="w-full sm:w-auto text-base px-8 h-12 bg-slate-900 hover:bg-slate-800 text-white shadow-lg">
                Lihat Demo Desain Tema <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
            <Link href="/login">
              <Button variant="outline" size="lg" className="w-full sm:w-auto text-base px-8 h-12">
                Kelola Undangan Anda
              </Button>
            </Link>
          </div>

          {/* Social Proof stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-16 max-w-3xl mx-auto border-t border-slate-200/80 mt-16 text-left">
            <div>
              <p className="text-3xl font-bold text-slate-900">5+</p>
              <p className="text-xs text-muted-foreground mt-1">Preset Desain Unik</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-slate-900">100%</p>
              <p className="text-xs text-muted-foreground mt-1">Mobile Responsive</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-slate-900">Real-Time</p>
              <p className="text-xs text-muted-foreground mt-1">RSVP & Ucapan Tamu</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-slate-900">QR Code</p>
              <p className="text-xs text-muted-foreground mt-1">Check-in & Share Otomatis</p>
            </div>
          </div>
        </div>
      </section>

      {/* PROMOTION BANNER */}
      <section id="promo" className="py-10 bg-gradient-to-r from-rose-600 via-pink-600 to-amber-600 text-white shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-white/20 text-xs font-semibold uppercase tracking-wider backdrop-blur-xs">
                <Flame className="h-3.5 w-3.5 fill-current text-yellow-300" /> PROMO SPESIAL PERNIKAHAN 2026
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Diskon Hingga 50% untuk Seluruh Paket Agen & Pasangan Baru!
              </h2>
              <p className="text-white/90 text-sm max-w-2xl">
                Nikmati fitur tanpa batas: Musik eksklusif bebas pilih, kuota tamu tanpa limit, amplop digital tanpa potongan, dan domain kustom instan.
              </p>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-4 rounded-xl text-center">
                <p className="text-xs uppercase tracking-widest text-white/80 font-medium">Masa Berlaku Terbatas</p>
                <p className="text-2xl font-black text-yellow-300 font-mono">PROMO2026</p>
              </div>
              <Link href="/login">
                <Button size="lg" className="bg-white text-rose-700 hover:bg-rose-50 font-bold shadow-md">
                  Klaim Promo Sekarang
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CATALOGUE SECTION (DEMOS) */}
      <section id="katalog" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="mb-3 font-semibold text-xs tracking-wider uppercase text-rose-700 border-rose-200">
            Katalog Desain
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
            Pilihan Tema Digital Interaktif
          </h2>
          <p className="text-slate-600 text-base">
            Setiap tema dirancang dengan karakter tipografi, komposisi visual, dan atmosfer yang berbeda untuk menyempurnakan hari istimewa Anda. Klik <strong>"Live Demo"</strong> untuk mencoba interaksinya langsung.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {themes.map((theme) => {
            const demoSlug = `demo-${theme.slug}`
            const meta = themeThumbnails[theme.slug] || {
              img: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop&q=80',
              tag: 'Exclusive Design',
              bgStyle: 'from-slate-900/60 to-black/90',
            }

            return (
              <Card key={theme.id} className="group overflow-hidden rounded-2xl border border-slate-200/80 hover:shadow-xl transition-all duration-300 flex flex-col justify-between bg-white">
                <div>
                  {/* Thumbnail Image Container */}
                  <div className="relative h-64 w-full overflow-hidden bg-slate-100">
                    <img
                      src={meta.img}
                      alt={theme.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${meta.bgStyle} opacity-70 group-hover:opacity-80 transition-opacity`} />
                    
                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 flex gap-2 items-center">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-xs font-bold text-slate-900 shadow-sm">
                        {theme.name}
                      </span>
                      {theme.isPremium && (
                        <span className="px-2.5 py-0.5 bg-amber-400 text-amber-950 rounded-full text-[10px] font-extrabold uppercase tracking-wide flex items-center gap-1 shadow-sm">
                          <Sparkles className="h-3 w-3" /> Premium
                        </span>
                      )}
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <p className="text-xs font-medium text-white/80 uppercase tracking-widest">{meta.tag}</p>
                      <p className="text-lg font-bold truncate">Tema {theme.name}</p>
                    </div>
                  </div>

                  {/* Card Body */}
                  <CardContent className="p-6 space-y-4">
                    <p className="text-slate-600 text-sm line-clamp-2 leading-relaxed">
                      {theme.description || 'Desain undangan eksklusif dengan layout responsif modern.'}
                    </p>

                    <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-500">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                        <span>Responsif HP, Tablet, & Laptop</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                        <span>Audio Latar & Animasi Buka Amplop</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                        <span>Form RSVP & Google Maps Lokasi</span>
                      </div>
                    </div>
                  </CardContent>
                </div>

                {/* Card Action Footer */}
                <div className="p-6 pt-0 flex gap-3">
                  <Link href={`/i/${demoSlug}`} target="_blank" className="flex-1">
                    <Button variant="default" className="w-full h-10 group/btn bg-slate-900 hover:bg-slate-800 text-white">
                      <ExternalLink className="mr-2 h-4 w-4 group-hover/btn:translate-x-0.5 transition-transform" /> Live Demo
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button variant="outline" className="h-10">
                      Pilih
                    </Button>
                  </Link>
                </div>
              </Card>
            )
          })}
        </div>
      </section>

      {/* FEATURE HIGHLIGHTS */}
      <section id="fitur" className="py-20 bg-slate-100/70 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="outline" className="mb-3 font-semibold text-xs tracking-wider uppercase text-rose-700 border-rose-200">
              Fitur Lengkap
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-4">
              Segala yang Anda Butuhkan untuk Undangan Sempurna
            </h2>
            <p className="text-slate-600 text-base">
              Kelola seluruh detail acara dengan mudah tanpa repot cetak manual.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600">
                <Music className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Background Music Eksklusif</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Pilih lagu romantis favorit dari katalog musik kami atau pasang lagu kenangan pilihan Anda sendiri.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                <Send className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Tamu Khusus & Direct WhatsApp</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Kirimkan tautan personal untuk setiap nama tamu (Kepada Yth. Nama Tamu) langsung via WhatsApp dalam sekali klik.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                <QrCode className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">QR Code & Check-in Tamu</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Setiap undangan dilengkapi QR Code otomatis untuk memudahkan pembagian tautan dan absensi kehadiran tamu.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Buku Tamu & Amplop Digital</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Terima doa restu secara live dengan sistem moderasi, serta nomor rekening & e-wallet dengan tombol salin otomatis.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Countdown Hitung Mundur</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Timer hitung mundur otomatis menuju hari akad dan resepsi agar para undangan selalu siap hadir tepat waktu.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
              <div className="w-12 h-12 rounded-xl bg-pink-50 flex items-center justify-center text-pink-600">
                <Heart className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Cerita Cinta & Galeri Foto</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Tampilkan perjalanan asmara Anda dalam timeline cerita interaktif dan galeri foto pre-wedding beresolusi tinggi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-16 bg-slate-900 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Siap Membuat Undangan Pernikahan Impian Anda?</h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            Hubungi agen atau masuk ke dashboard untuk mulai mengatur detail pernikahan Anda dalam hitungan menit.
          </p>
          <Link href="/login">
            <Button size="lg" className="bg-rose-600 hover:bg-rose-500 text-white px-8 h-12 font-semibold shadow-lg">
              Masuk ke Dashboard Sekarang
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 py-10 text-xs">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src="/images/logo.png" alt="Logo" className="h-8 w-auto object-contain brightness-0 invert" />
            <span className="font-bold text-white text-sm tracking-wide">{appConfig.name}</span>
          </div>
          <p className="text-center md:text-left">
            Platform SaaS Undangan Pernikahan Digital Multi-Tenant Modern.
          </p>
          <p className="font-sans text-slate-500">
            Copyright © 2026 InvitationKami
          </p>
        </div>
      </footer>
    </div>
  )
}

