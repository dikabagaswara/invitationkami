import Link from 'next/link'
import { prisma } from '@/lib/db'
import { appConfig } from '@/lib/config'
import { HomeCatalogSection, type CatalogItem } from '@/components/public/HomeCatalogSection'
import { HomeNavbar } from '@/components/public/HomeNavbar'
import { ArrowRight, MessageCircle, Sparkles, Music, Smartphone } from 'lucide-react'

// Force dynamic rendering so build does not fail when DB is unseeded/offline during docker build
export const dynamic = 'force-dynamic'

export default async function HomePage() {
  let themes: Array<{ id: string; name: string; slug: string; category: string | null; description: string | null; isPremium: boolean }> = []

  try {
    themes = await prisma.theme.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'asc' },
    })
  } catch {
    // Graceful fallback during build phase if DB is unreachable
    themes = []
  }

  // Fallback themes catalog if database is not yet seeded
  const ALL_THEME_SLUGS = [
    'oceanic',
    'terracotta',
    'botanical',
    'celestial',
    'rustic',
    'vintage',
    'elegant',
    'luxury',
    'modern',
    'floral',
    'minimalist',
    'blossom',
  ]

  // Simple, concise & customer-focused descriptions
  const THEME_DATA_MAP: Record<string, { displayName: string; tagline: string; category: string }> = {
    blossom: {
      displayName: 'Blossom Animated',
      category: 'Romantic',
      tagline: 'Animasi sudut bunga bergoyang lembut dan kelopak bunga melayang dengan nuansa cinta romantis.',
    },
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

  const catalogItems: CatalogItem[] = (themes.length > 0 ? themes.map((t) => t.slug) : ALL_THEME_SLUGS).map((slug, idx) => {
    const custom = THEME_DATA_MAP[slug] || {
      displayName: slug,
      category: 'Wedding',
      tagline: 'Desain undangan digital eksklusif.',
    }

    return {
      id: `theme-${slug}-${idx}`,
      name: custom.displayName,
      themeSlug: slug,
      category: custom.category,
      demoSlug: `demo-${slug}`,
      tagline: custom.tagline,
      isPremium: slug === 'luxury' || slug === 'botanical' || slug === 'celestial',
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
          1. HEADER / NAVBAR (RESPONSIVE & MOBILE-OPTIMIZED)
         ───────────────────────────────────────────── */}
      <HomeNavbar appName={appConfig.name} />

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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {/* 1. Tema Eksklusif */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white/85 border border-stone-200/80 shadow-xs backdrop-blur-xs space-y-3 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200/70 flex items-center justify-center text-2xl shadow-2xs">
              🎨
            </div>
            <div>
              <h3 className="font-serif text-lg text-stone-900 font-medium">Tema Eksklusif</h3>
              <p className="text-xs text-stone-500 font-light mt-0.5">Karakter unik</p>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed font-light pt-1 border-t border-stone-100">
              Desain visual berkelas dengan tipografi artistik yang dirancang khusus untuk momen istimewa Anda.
            </p>
          </div>

          {/* 2. Musik & Opening */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white/85 border border-stone-200/80 shadow-xs backdrop-blur-xs space-y-3 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200/70 flex items-center justify-center text-2xl shadow-2xs">
              🎵
            </div>
            <div>
              <h3 className="font-serif text-lg text-stone-900 font-medium">Musik &amp; Opening</h3>
              <p className="text-xs text-stone-500 font-light mt-0.5">Momen berkesan</p>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed font-light pt-1 border-t border-stone-100">
              Sensasi membuka undangan digital dengan alunan lagu romantis pilihan untuk menyambut tamu.
            </p>
          </div>

          {/* 3. RSVP */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white/85 border border-stone-200/80 shadow-xs backdrop-blur-xs space-y-3 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200/70 flex items-center justify-center text-2xl shadow-2xs">
              💌
            </div>
            <div>
              <h3 className="font-serif text-lg text-stone-900 font-medium">RSVP</h3>
              <p className="text-xs text-stone-500 font-light mt-0.5">Kelola tamu</p>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed font-light pt-1 border-t border-stone-100">
              Konfirmasi kehadiran instan langsung secara online dan rekap daftar tamu yang rapi.
            </p>
          </div>

          {/* 4. Love Story */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white/85 border border-stone-200/80 shadow-xs backdrop-blur-xs space-y-3 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-pink-50 border border-pink-200/70 flex items-center justify-center text-2xl shadow-2xs">
              📸
            </div>
            <div>
              <h3 className="font-serif text-lg text-stone-900 font-medium">Love Story</h3>
              <p className="text-xs text-stone-500 font-light mt-0.5">Ceritakan kisah</p>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed font-light pt-1 border-t border-stone-100">
              Bagikan perjalanan cinta manis dan galeri foto kenangan Anda dalam timeline yang indah.
            </p>
          </div>

          {/* 5. Amplop Digital */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white/85 border border-stone-200/80 shadow-xs backdrop-blur-xs space-y-3 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200/70 flex items-center justify-center text-2xl shadow-2xs">
              🎁
            </div>
            <div>
              <h3 className="font-serif text-lg text-stone-900 font-medium">Amplop Digital</h3>
              <p className="text-xs text-stone-500 font-light mt-0.5">Hadiah lebih mudah</p>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed font-light pt-1 border-t border-stone-100">
              Fitur kado cashless memudahkan tamu mengirimkan tanda kasih langsung ke rekening/e-wallet.
            </p>
          </div>

          {/* 6. Lokasi */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white/85 border border-stone-200/80 shadow-xs backdrop-blur-xs space-y-3 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-200/70 flex items-center justify-center text-2xl shadow-2xs">
              📍
            </div>
            <div>
              <h3 className="font-serif text-lg text-stone-900 font-medium">Lokasi</h3>
              <p className="text-xs text-stone-500 font-light mt-0.5">Navigasi mudah</p>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed font-light pt-1 border-t border-stone-100">
              Petunjuk arah langsung terintegrasi dengan Google Maps untuk memandu tamu sampai di lokasi.
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
