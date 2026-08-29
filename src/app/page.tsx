import Link from 'next/link'
import { prisma } from '@/lib/db'
import { appConfig } from '@/lib/config'
import { HomeCatalogSection, type CatalogItem } from '@/components/public/HomeCatalogSection'
import { ArrowRight, MessageCircle, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react'

export default async function HomePage() {
  const themes = await prisma.theme.findMany({
    where: { isActive: true },
    orderBy: { createdAt: 'asc' },
  })

  // Simple, concise & customer-focused descriptions
  const THEME_DATA_MAP: Record<string, { displayName: string; tagline: string; category: string }> = {
    oceanic: {
      displayName: 'Oceanic',
      category: 'Nature',
      tagline: 'Nuansa biru laut mediterania dengan kartu kaca modern yang tenang dan menyejukkan.',
    },
    terracotta: {
      displayName: 'Terracotta',
      category: 'Nature',
      tagline: 'Warna hangat tanah liat dan senja gurun dengan bingkai lengkung Mediterania yang estetik.',
    },
    botanical: {
      displayName: 'Botanical',
      category: 'Luxury',
      tagline: 'Kemewahan hijau zamrud dengan tata letak editorial majalah fashion yang elegan.',
    },
    celestial: {
      displayName: 'Celestial',
      category: 'Luxury',
      tagline: 'Romansa malam berbintang dengan partikel cahaya kosmik dan aksen ungu keemasan.',
    },
    rustic: {
      displayName: 'Rustic',
      category: 'Nature',
      tagline: 'Sentuhan kertas daur ulang hangat berpadu bingkai foto polaroid dan ornamen alami.',
    },
    vintage: {
      displayName: 'Vintage',
      category: 'Classic',
      tagline: 'Gaya koran klasik Eropa dengan bingkai ganda dan sentuhan warna sepia nostalgia.',
    },
    elegant: {
      displayName: 'Elegant',
      category: 'Classic',
      tagline: 'Keindahan abadi berpalet ivory & gold dengan tipografi serif kerajaan yang anggun.',
    },
    luxury: {
      displayName: 'Luxury',
      category: 'Luxury',
      tagline: 'Kemewahan latar hitam pekat berpadu kilau emas champagne yang glamor dan eksklusif.',
    },
    modern: {
      displayName: 'Modern',
      category: 'Modern',
      tagline: 'Desain monokrom bersih dengan elemen geometris tegas yang simpel dan kekinian.',
    },
    floral: {
      displayName: 'Floral',
      category: 'Romantic',
      tagline: 'Taman bunga mawar lembut bernuansa pastel cerah yang feminin dan manis.',
    },
    minimalist: {
      displayName: 'Minimalist',
      category: 'Minimal',
      tagline: 'Ruang putih bersih yang lapang, mengutamakan keterbacaan dan keindahan esensial.',
    },
  }

  const catalogItems: CatalogItem[] = themes.map((t) => {
    const custom = THEME_DATA_MAP[t.slug] || {
      displayName: t.name,
      category: t.category || t.name,
      tagline: t.description || 'Desain undangan digital eksklusif.',
    }

    return {
      id: t.id,
      name: custom.displayName,
      themeSlug: t.slug,
      category: custom.category,
      demoSlug: `demo-${t.slug}`,
      tagline: custom.tagline,
      isPremium: t.isPremium,
    }
  })

  // WhatsApp Contact Direct Link
  const whatsappNumber = '6281234567890'
  const whatsappText = encodeURIComponent('Halo Admin InvitationKami, saya ingin bertanya seputar pembuatan undangan pernikahan.')
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappText}`

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-stone-900 font-sans selection:bg-stone-200">
      {/* ─────────────────────────────────────────────
          1. HEADER / NAVBAR
         ───────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-[#FAF9F6]/90 backdrop-blur-md border-b border-stone-200/70">
        <div className="max-w-6xl mx-auto px-6 h-18 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <img src="/images/logo.png" alt={appConfig.name} className="h-8 w-auto object-contain" />
            <span className="font-serif tracking-wider text-base text-stone-900 uppercase font-medium">
              {appConfig.name}
            </span>
          </Link>

          <nav className="flex items-center gap-6 sm:gap-8 text-xs sm:text-sm font-light text-stone-600">
            <a href="#koleksi" className="hover:text-stone-900 transition-colors">
              Koleksi Tema
            </a>
            <a href="#keunggulan" className="hover:text-stone-900 transition-colors">
              Fitur
            </a>
            <a href="#tentang" className="hover:text-stone-900 transition-colors">
              Bantuan
            </a>
            <Link
              href="/login"
              className="px-4 py-1.5 rounded-full border border-stone-300 text-stone-900 hover:bg-stone-900 hover:text-white transition-all shadow-xs"
            >
              Masuk
            </Link>
          </nav>
        </div>
      </header>

      {/* ─────────────────────────────────────────────
          2. HERO SECTION
         ───────────────────────────────────────────── */}
      <section className="pt-20 pb-16 px-6 text-center max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-6xl font-serif font-normal text-stone-900 tracking-tight leading-[1.2] mb-6">
          Undangan Digital Eksklusif untuk <br />
          <span className="italic font-light text-stone-700">Momen Terindah Anda</span>
        </h1>

        <p className="text-sm sm:text-base text-stone-600 max-w-xl mx-auto mb-10 leading-relaxed font-light">
          Setiap tema dirancang dengan karakter visual yang unik, animasi yang elegan, dan fitur lengkap siap dibagikan ke semua tamu.
        </p>

        <div className="flex items-center justify-center gap-4">
          <a
            href="#koleksi"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-stone-900 text-white text-xs sm:text-sm font-medium hover:bg-stone-800 transition-all shadow-md"
          >
            Jelajahi Koleksi Tema <ArrowRight className="h-4 w-4" />
          </a>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-white border border-stone-300 text-stone-900 text-xs sm:text-sm font-medium hover:bg-stone-50 transition-all shadow-xs"
          >
            Mulai Buat Gratis
          </Link>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          3. KATALOG DESAIN (CLEAN & ANIMATED)
         ───────────────────────────────────────────── */}
      <section id="koleksi" className="py-20 px-6 border-t border-stone-200/80 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-stone-400 block mb-2">
              Katalog Pilihan
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-normal text-stone-900 mb-3">
              Koleksi Tema Pernikahan
            </h2>
            <p className="text-stone-500 text-xs sm:text-sm font-light leading-relaxed">
              Pilih karakter desain yang paling sesuai dengan konsep pernikahan impian Anda. Klik preview untuk melihat tampilan langsung di browser.
            </p>
          </div>

          <HomeCatalogSection items={catalogItems} />
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          4. FITUR & KEUNGGULAN
         ───────────────────────────────────────────── */}
      <section id="keunggulan" className="py-20 px-6 max-w-5xl mx-auto border-t border-stone-200/80">
        <div className="text-center max-w-xl mx-auto mb-16">
          <h2 className="text-2xl sm:text-3xl font-serif font-normal text-stone-900 mb-2">
            Mengapa Memilih {appConfig.name}?
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 font-light">
            Semua yang Anda butuhkan untuk berbagi kebahagiaan dengan para tamu tercinta.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-white border border-stone-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 font-serif font-bold text-lg">
              1
            </div>
            <h3 className="font-serif text-lg text-stone-900">Karakter Visual Berbeda</h3>
            <p className="text-xs text-stone-500 leading-relaxed font-light">
              Bukan sekadar ganti warna. Setiap tema memiliki tata letak, bingkai foto, dan tipografi eksklusif yang unik.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-stone-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700 font-serif font-bold text-lg">
              2
            </div>
            <h3 className="font-serif text-lg text-stone-900">Musik &amp; Buka Undangan</h3>
            <p className="text-xs text-stone-500 leading-relaxed font-light">
              Latar musik otomatis terputar saat amplop digital dibuka, menciptakan momen pertama yang berkesan bagi tamu.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-stone-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-green-50 border border-green-200 flex items-center justify-center text-green-700 font-serif font-bold text-lg">
              3
            </div>
            <h3 className="font-serif text-lg text-stone-900">RSVP &amp; Amplop Digital</h3>
            <p className="text-xs text-stone-500 leading-relaxed font-light">
              Lengkap dengan konfirmasi kehadiran tamu via WhatsApp, buku tamu terintegrasi, dan rekening kado langsung.
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          5. BANTUAN & WHATSAPP
         ───────────────────────────────────────────── */}
      <section id="tentang" className="py-20 px-6 max-w-4xl mx-auto text-center border-t border-stone-200/80">
        <div className="p-10 sm:p-14 rounded-3xl border border-stone-200 bg-white shadow-sm space-y-5">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-stone-400 block">
            Konsultasi &amp; Dukungan
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-normal text-stone-900">
            Punya Pertanyaan Seputar Pembuatan Undangan?
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto font-light leading-relaxed">
            Tim kami siap membantu Anda memilih tema terbaik dan menyesuaikan kebutuhan pernikahan Anda.
          </p>
          <div className="pt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-stone-900 text-white text-xs sm:text-sm font-medium hover:bg-stone-800 transition-all shadow-md"
            >
              <MessageCircle className="h-4 w-4" /> Hubungi Kami via WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          6. FOOTER
         ───────────────────────────────────────────── */}
      <footer className="border-t border-stone-200/80 py-8 text-center text-xs text-stone-400 font-light">
        <p>© 2026 {appConfig.name}</p>
      </footer>
    </div>
  )
}
