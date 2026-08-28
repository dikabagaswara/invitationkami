import Link from 'next/link'
import { prisma } from '@/lib/db'
import { Button } from '@/components/ui/button'
import { appConfig } from '@/lib/config'
import { HomeCatalogSection, type CatalogItem } from '@/components/public/HomeCatalogSection'
import { 
  ArrowRight, 
  Sparkles, 
  Heart, 
  Music, 
  QrCode, 
  ShieldCheck, 
  MessageCircle, 
  ExternalLink 
} from 'lucide-react'

export default async function HomePage() {
  const themes = await prisma.theme.findMany({
    where: { isActive: true },
    orderBy: { createdAt: 'asc' },
  })

  const THEME_DATA_MAP: Record<string, { displayName: string; cover: string; tagline: string; category: string }> = {
    elegant: {
      displayName: 'Amora & Romeo',
      category: 'Elegant',
      cover: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop&q=80',
      tagline: 'Kemewahan abadi dengan sentuhan tipografi klasik serif dan aksen keemasan.',
    },
    minimalist: {
      displayName: 'Aurelia & Dimas',
      category: 'Minimalis',
      cover: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800&auto=format&fit=crop&q=80',
      tagline: 'Desain bersih dengan ruang putih lapang yang menonjolkan esensi cinta Anda.',
    },
    floral: {
      displayName: 'Laras & Bintang',
      category: 'Floral',
      cover: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&auto=format&fit=crop&q=80',
      tagline: 'Nuansa taman romantis dengan palet warna pastel botanical yang lembut.',
    },
    luxury: {
      displayName: 'Victoria & Alex',
      category: 'Luxury',
      cover: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=800&auto=format&fit=crop&q=80',
      tagline: 'Sentuhan elegan latar gelap berpadu warna champagne gold ala royal wedding.',
    },
    modern: {
      displayName: 'Hawa & Adam',
      category: 'Modern',
      cover: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&auto=format&fit=crop&q=80',
      tagline: 'Gaya visual kontemporer bernuansa majalah editorial dengan kontras tegas.',
    },
  }

  const catalogItems: CatalogItem[] = themes.map((t) => {
    const custom = THEME_DATA_MAP[t.slug] || {
      displayName: t.name,
      category: t.category || t.name,
      cover: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop&q=80',
      tagline: t.description || 'Desain undangan digital eksklusif.',
    }

    return {
      id: t.id,
      name: custom.displayName,
      themeSlug: t.slug,
      category: custom.category,
      coverImage: custom.cover,
      demoSlug: `demo-${t.slug}`,
      tagline: custom.tagline,
      isPremium: t.isPremium,
    }
  })

  // WhatsApp Contact Direct Link
  const whatsappNumber = '6281234567890' // Default support WA
  const whatsappText = encodeURIComponent('Halo Admin InvitationKami, saya ingin bertanya seputar pembuatan undangan digital pernikahan.')
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappText}`

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 font-sans selection:bg-rose-100 selection:text-rose-900">
      {/* ─────────────────────────────────────────────
          1. HEADER / NAVBAR
          ┌─────────────────────────────────────────┐
          │ LOGO          Koleksi   Tentang  Login  │
          └─────────────────────────────────────────┘
         ───────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <img src="/images/logo.png" alt={appConfig.name} className="h-10 w-auto object-contain" />
            <div>
              <span className="font-bold text-lg tracking-tight block text-slate-900 leading-tight">
                {appConfig.name}
              </span>
              <span className="text-[10px] text-muted-foreground font-sans tracking-wide">
                Digital Wedding
              </span>
            </div>
          </Link>

          <nav className="flex items-center gap-6 sm:gap-10 text-sm font-medium text-slate-600">
            <a href="#koleksi" className="hover:text-slate-900 transition-colors">
              Koleksi
            </a>
            <a href="#tentang" className="hover:text-slate-900 transition-colors">
              Tentang
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 text-emerald-600 hover:text-emerald-700 font-semibold"
            >
              <MessageCircle className="h-4 w-4" /> Bantuan
            </a>
            <Link href="/login">
              <Button size="sm" className="px-5 shadow-xs">
                Login
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* ─────────────────────────────────────────────
          2. HERO SECTION
          Undangan Digital untuk Momen yang Tak Terlupakan
          [ Lihat Koleksi ]
          [ PREVIEW BESAR ]
         ───────────────────────────────────────────── */}
      <section className="pt-16 pb-20 px-4 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200/70 text-rose-700 text-xs font-semibold uppercase tracking-wider mb-8">
          <Sparkles className="h-3.5 w-3.5" />
          Platform Undangan Digital Eksklusif
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.2] mb-6 font-serif">
          Undangan Digital untuk <br className="hidden sm:block" />
          <span className="text-rose-600 italic">Momen yang Tak Terlupakan</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto mb-10 leading-relaxed">
          Temukan desain undangan yang sesuai dengan kisah dan gaya pernikahan Anda.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a href="#koleksi">
            <Button size="lg" className="w-full sm:w-auto px-8 h-12 text-base shadow-md">
              Lihat Koleksi Desain <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 h-12 text-base text-emerald-700 border-emerald-300 hover:bg-emerald-50">
              <MessageCircle className="mr-2 h-5 w-5 text-emerald-600" /> Tanya via WhatsApp
            </Button>
          </a>
        </div>

        {/* ─── PREVIEW BESAR ─── */}
        <div className="relative mx-auto max-w-4xl rounded-2xl md:rounded-3xl border-4 md:border-8 border-white bg-slate-900 p-2 md:p-4 shadow-2xl overflow-hidden group">
          <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-xl md:rounded-2xl overflow-hidden bg-slate-800 flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&auto=format&fit=crop&q=80"
              alt="Preview Besar Undangan Pernikahan"
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700 opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col items-center justify-end p-6 sm:p-10 text-white text-center">
              <span className="text-xs uppercase tracking-[0.3em] text-amber-300 font-semibold mb-2">
                Featured Design • Tema Elegant
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif font-light mb-3 tracking-wider">
                Romeo & Juliet
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mb-6 font-light">
                Desain signature terfavorit dengan audio latar otomatis, animasi buka amplop, dan buku tamu interaktif.
              </p>
              <Link href="/i/demo-elegant" target="_blank">
                <Button size="sm" className="bg-white text-slate-950 hover:bg-slate-100 font-semibold px-6 py-2 rounded-full">
                  <ExternalLink className="mr-2 h-4 w-4" /> Buka Full Demo Live
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          3. KATALOG DESAIN
          Temukan Desain Favorit Anda
          Semua | Minimalis | Elegant | Floral | Luxury | Modern
          [ Grid Cards ]
         ───────────────────────────────────────────── */}
      <section id="koleksi" className="py-20 bg-slate-100/80 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 font-serif mb-3">
              Temukan Desain Favorit Anda
            </h2>
            <p className="text-slate-600 text-sm">
              Pilih dari beragam gaya visual yang telah dioptimalkan untuk tampilan smartphone & laptop.
            </p>
          </div>

          {/* Interactive Filterable Catalog */}
          <HomeCatalogSection items={catalogItems} />
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          4. TENTANG & FITUR UNGGULAN
         ───────────────────────────────────────────── */}
      <section id="tentang" className="py-20 max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold font-serif text-slate-900 mb-4">
            Mengapa Memilih {appConfig.name}?
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Kami menghadirkan pengalaman undangan pernikahan digital yang tidak hanya indah secara visual, namun juga praktis untuk dibagikan kepada seluruh kerabat dan tamu undangan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center sm:text-left">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto sm:mx-0">
              <Heart className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-lg text-slate-900">Desain Berkarakter</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Tiap tema memiliki konsep tipografi dan komposisi tata letak tersendiri yang unik dan berkelas.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto sm:mx-0">
              <Music className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-lg text-slate-900">Lagu Latar & Doa Live</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Dilengkapi pemutar musik latar terapung yang estetik serta form kirim ucapan & doa restu real-time.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto sm:mx-0">
              <QrCode className="h-6 w-6" />
            </div>
            <h3 className="font-bold text-lg text-slate-900">Direct Share & QR Code</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Kirim undangan atas nama masing-masing tamu secara personal langsung ke WhatsApp tanpa ribet.
            </p>
          </div>
        </div>

        {/* WhatsApp Contact Box */}
        <div className="mt-16 bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center shadow-xl flex flex-col items-center">
          <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mb-6">
            <MessageCircle className="h-8 w-8" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold font-serif mb-3">
            Konsultasikan Undangan Pernikahan Anda
          </h3>
          <p className="text-slate-300 text-sm max-w-lg mb-8 leading-relaxed">
            Punya pertanyaan atau butuh bantuan pembuatan undangan kustom untuk agen dan pasangan? Hubungi tim support kami via WhatsApp langsung.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="lg" className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-8 h-12 rounded-full shadow-lg">
              <MessageCircle className="mr-2 h-5 w-5 fill-current" /> Chat via WhatsApp Sekarang
            </Button>
          </a>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          5. FOOTER
         ───────────────────────────────────────────── */}
      <footer className="bg-white border-t border-slate-200 py-10 text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <img src="/images/logo.png" alt="Logo" className="h-8 w-auto object-contain" />
            <span className="font-bold text-slate-900 text-sm">{appConfig.name}</span>
          </div>
          <p>
            Copyright © 2026 InvitationKami
          </p>
        </div>
      </footer>

      {/* Floating WhatsApp Quick Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-3 rounded-full shadow-xl hover:scale-105 transition-all"
        title="Hubungi Kami via WhatsApp"
      >
        <MessageCircle className="h-6 w-6 fill-current" />
        <span className="text-sm font-semibold hidden md:inline">Hubungi Kami</span>
      </a>
    </div>
  )
}

