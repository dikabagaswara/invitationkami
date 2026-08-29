import Link from 'next/link'
import { prisma } from '@/lib/db'
import { appConfig } from '@/lib/config'
import { HomeCatalogSection, type CatalogItem } from '@/components/public/HomeCatalogSection'
import { ArrowRight, MessageCircle, Sparkles, Music, Smartphone } from 'lucide-react'

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
    <div className="relative min-h-screen bg-[#FAF8F5] text-stone-900 font-sans selection:bg-amber-100 overflow-x-hidden">
      {/* ─────────────────────────────────────────────
          AESTHETIC LUXURY BACKGROUND LAYER (RESPONSIVE)
         ───────────────────────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Ambient Aurora Gradient Orbs */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[350px] sm:w-[600px] lg:w-[850px] h-[350px] sm:h-[450px] lg:h-[600px] bg-gradient-to-tr from-amber-200/35 via-rose-100/30 to-purple-100/25 rounded-full blur-[90px] sm:blur-[120px]"></div>
        <div className="absolute top-[35%] -left-32 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-gradient-to-br from-emerald-100/35 via-teal-50/25 to-transparent rounded-full blur-[80px] sm:blur-[110px]"></div>
        <div className="absolute top-[60%] -right-32 w-[350px] sm:w-[550px] h-[350px] sm:h-[550px] bg-gradient-to-bl from-amber-100/45 via-orange-50/30 to-transparent rounded-full blur-[90px] sm:blur-[120px]"></div>

        {/* Delicate Modern Mesh Grid Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#d6c7b2_1px,transparent_1px)] opacity-[0.22] [background-size:24px_24px] sm:[background-size:28px_28px]"></div>
      </div>

      {/* ─────────────────────────────────────────────
          1. HEADER / NAVBAR (RESPONSIVE & CLEAN)
         ───────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-[#FAF8F5]/85 backdrop-blur-md border-b border-stone-200/60 transition-all shadow-2xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-18 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group">
            <div className="p-1 rounded-xl bg-white shadow-xs border border-stone-200/80 group-hover:scale-105 transition-transform">
              <img src="/images/logo.png" alt={appConfig.name} className="h-6 sm:h-7 w-auto object-contain" />
            </div>
            <span className="font-serif tracking-wider text-base sm:text-lg text-stone-900 uppercase font-semibold leading-tight">
              {appConfig.name}
            </span>
          </Link>

          <nav className="flex items-center gap-4 sm:gap-7 text-xs sm:text-sm font-light text-stone-600">
            <a href="#koleksi" className="hover:text-stone-900 transition-colors">
              Koleksi Tema
            </a>
            <Link href="/share-generator" className="hover:text-stone-900 transition-colors">
              Bagi Undangan
            </Link>
            <a href="#keunggulan" className="hidden sm:inline-block hover:text-stone-900 transition-colors">
              Fitur
            </a>
            <a href="#tentang" className="hidden sm:inline-block hover:text-stone-900 transition-colors">
              Bantuan
            </a>
            <Link
              href="/login"
              className="px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full border border-stone-300 text-stone-900 hover:bg-stone-900 hover:text-white transition-all shadow-xs"
            >
              Masuk
            </Link>
          </nav>
        </div>
      </header>

      {/* ─────────────────────────────────────────────
          2. HERO SECTION (RESPONSIVE)
         ───────────────────────────────────────────── */}
      <section className="relative z-10 pt-16 sm:pt-24 pb-14 sm:pb-20 px-4 sm:px-6 text-center max-w-4xl mx-auto">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-normal text-stone-900 tracking-tight leading-[1.2] mb-5 sm:mb-6">
          Undangan Digital Eksklusif untuk <br className="hidden sm:inline" />
          <span className="italic font-light text-stone-700">Momen Terindah Anda</span>
        </h1>

        <p className="text-xs sm:text-base text-stone-600 max-w-xl mx-auto mb-8 sm:mb-10 leading-relaxed font-light px-2">
          Setiap tema dirancang dengan karakter visual yang unik, animasi yang elegan, dan fitur lengkap siap dibagikan ke semua tamu.
        </p>

        <div className="flex items-center justify-center">
          <a
            href="#koleksi"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-stone-900 text-white text-xs sm:text-sm font-medium hover:bg-stone-800 hover:scale-[1.02] transition-all shadow-lg shadow-stone-900/15"
          >
            Jelajahi Koleksi Tema <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          3. KATALOG DESAIN (RESPONSIVE)
         ───────────────────────────────────────────── */}
      <section id="koleksi" className="relative z-10 py-16 sm:py-24 px-4 sm:px-6 border-t border-stone-200/70 bg-white/70 backdrop-blur-xs">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] uppercase tracking-[0.25em] font-semibold text-amber-700 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Pilihan Desain Eksklusif</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-serif font-normal text-stone-900 mb-2">
              Koleksi Tema Pernikahan
            </h2>
            <p className="text-stone-500 text-xs sm:text-sm font-light px-4">
              Arahkan kursor atau klik pada tema untuk melihat live preview di smartphone &amp; desktop.
            </p>
          </div>

          <HomeCatalogSection items={catalogItems} />
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          4. FITUR & KEUNGGULAN (RESPONSIVE)
         ───────────────────────────────────────────── */}
      <section id="keunggulan" className="relative z-10 py-16 sm:py-24 px-4 sm:px-6 max-w-5xl mx-auto border-t border-stone-200/70">
        <div className="text-center max-w-xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-serif font-normal text-stone-900 mb-2">
            Kelebihan Undangan {appConfig.name}
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 font-light px-4">
            Dirancang secara khusus untuk memberikan pengalaman terbaik bagi Anda dan para tamu undangan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="p-6 sm:p-8 rounded-3xl bg-white/85 border border-stone-200/80 shadow-xs backdrop-blur-xs space-y-3 sm:space-y-3.5 hover:shadow-md transition-all">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-amber-50 border border-amber-200/70 flex items-center justify-center text-amber-700">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h3 className="font-serif text-base sm:text-lg text-stone-900">Karakter Visual Berbeda</h3>
            <p className="text-xs text-stone-500 leading-relaxed font-light">
              Bukan sekadar ganti warna. Setiap tema memiliki tata letak, bingkai foto artistik, dan tipografi eksklusif yang unik.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-white/85 border border-stone-200/80 shadow-xs backdrop-blur-xs space-y-3 sm:space-y-3.5 hover:shadow-md transition-all">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-blue-50 border border-blue-200/70 flex items-center justify-center text-blue-700">
              <Music className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h3 className="font-serif text-base sm:text-lg text-stone-900">Musik &amp; Buka Undangan</h3>
            <p className="text-xs text-stone-500 leading-relaxed font-light">
              Latar musik otomatis terputar saat amplop digital dibuka, menciptakan momen pertama yang berkesan bagi para tamu.
            </p>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-white/85 border border-stone-200/80 shadow-xs backdrop-blur-xs space-y-3 sm:space-y-3.5 hover:shadow-md transition-all">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-emerald-50 border border-emerald-200/70 flex items-center justify-center text-emerald-700">
              <Smartphone className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h3 className="font-serif text-base sm:text-lg text-stone-900">RSVP &amp; Amplop Digital</h3>
            <p className="text-xs text-stone-500 leading-relaxed font-light">
              Lengkap dengan konfirmasi kehadiran via WhatsApp, buku tamu interaktif, dan rekening transfer amplop kado langsung.
            </p>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          5. BANTUAN & WHATSAPP (RESPONSIVE)
         ───────────────────────────────────────────── */}
      <section id="tentang" className="relative z-10 py-16 sm:py-20 px-4 sm:px-6 max-w-4xl mx-auto text-center border-t border-stone-200/70">
        <div className="p-8 sm:p-14 rounded-3xl border border-stone-200/80 bg-white/90 backdrop-blur-md shadow-sm space-y-4 sm:space-y-5">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-stone-100 p-2 sm:p-2.5 mx-auto border border-stone-200 shadow-2xs">
            <img src="/images/logo.png" alt="Logo" className="w-full h-full object-contain" />
          </div>
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] font-semibold text-stone-400 block">
            Konsultasi &amp; Dukungan
          </span>
          <h2 className="text-xl sm:text-3xl font-serif font-normal text-stone-900">
            Punya Pertanyaan Seputar Pembuatan Undangan?
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto font-light leading-relaxed">
            Tim <strong>{appConfig.name}</strong> siap membantu Anda memilih tema terbaik dan menyesuaikan kebutuhan pernikahan Anda.
          </p>
          <div className="pt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 sm:px-8 py-3 sm:py-3.5 rounded-full bg-stone-900 text-white text-xs sm:text-sm font-medium hover:bg-stone-800 hover:scale-[1.02] transition-all shadow-md"
            >
              <MessageCircle className="h-4 w-4" /> Hubungi Kami via WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          6. FOOTER (RESPONSIVE & CLEAN)
         ───────────────────────────────────────────── */}
      <footer className="relative z-10 border-t border-stone-200/70 py-8 sm:py-10 text-center space-y-2 px-4">
        <div className="flex items-center justify-center gap-2">
          <img src="/images/logo.png" alt="Logo" className="h-5 w-auto object-contain opacity-80" />
          <span className="font-serif tracking-wider text-xs text-stone-700 uppercase font-semibold">
            {appConfig.name}
          </span>
        </div>
        <p className="text-xs text-stone-400 font-light">© 2026 {appConfig.name}</p>
      </footer>
    </div>
  )
}
