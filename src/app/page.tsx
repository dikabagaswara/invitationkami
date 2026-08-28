import Link from 'next/link'
import { prisma } from '@/lib/db'
import { appConfig } from '@/lib/config'
import { HomeCatalogSection, type CatalogItem } from '@/components/public/HomeCatalogSection'
import { ArrowRight, MessageCircle, ExternalLink } from 'lucide-react'

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
      tagline: 'Kemewahan klasik dengan sentuhan tipografi serif.',
    },
    minimalist: {
      displayName: 'Aurelia & Dimas',
      category: 'Minimalis',
      cover: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800&auto=format&fit=crop&q=80',
      tagline: 'Desain bersih yang menonjolkan esensi cinta Anda.',
    },
    floral: {
      displayName: 'Laras & Bintang',
      category: 'Floral',
      cover: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&auto=format&fit=crop&q=80',
      tagline: 'Nuansa taman romantis dengan palet warna lembut.',
    },
    luxury: {
      displayName: 'Victoria & Alex',
      category: 'Luxury',
      cover: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=800&auto=format&fit=crop&q=80',
      tagline: 'Sentuhan elegan latar gelap berpadu aksen champagne.',
    },
    modern: {
      displayName: 'Hawa & Adam',
      category: 'Modern',
      cover: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&auto=format&fit=crop&q=80',
      tagline: 'Gaya visual kontemporer bernuansa majalah editorial.',
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
  const whatsappNumber = '6281234567890'
  const whatsappText = encodeURIComponent('Halo Admin InvitationKami, saya ingin bertanya seputar pembuatan undangan pernikahan.')
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappText}`

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-stone-900 font-sans selection:bg-stone-200">
      {/* ─────────────────────────────────────────────
          1. HEADER / NAVBAR
         ───────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 bg-[#FAFAF8]/90 backdrop-blur-md border-b border-stone-200/70">
        <div className="max-w-5xl mx-auto px-6 h-18 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <img src="/images/logo.png" alt={appConfig.name} className="h-8 w-auto object-contain" />
            <span className="font-serif tracking-wider text-base text-stone-900 uppercase">
              {appConfig.name}
            </span>
          </Link>

          <nav className="flex items-center gap-6 sm:gap-8 text-xs sm:text-sm font-light text-stone-600">
            <a href="#koleksi" className="hover:text-stone-900 transition-colors">
              Koleksi
            </a>
            <a href="#tentang" className="hover:text-stone-900 transition-colors">
              Tentang
            </a>
            <Link
              href="/login"
              className="px-4 py-1.5 rounded-full border border-stone-300 text-stone-900 hover:bg-stone-900 hover:text-white transition-all"
            >
              Login
            </Link>
          </nav>
        </div>
      </header>

      {/* ─────────────────────────────────────────────
          2. HERO SECTION
         ───────────────────────────────────────────── */}
      <section className="pt-20 pb-16 px-6 text-center max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-5xl font-serif font-normal text-stone-900 tracking-tight leading-[1.25] mb-6">
          Undangan Digital untuk <br />
          <span className="italic font-light text-stone-700">Momen yang Tak Terlupakan</span>
        </h1>

        <p className="text-sm sm:text-base text-stone-500 max-w-lg mx-auto mb-10 leading-relaxed font-light">
          Temukan desain undangan yang sesuai dengan kisah dan gaya pernikahan Anda.
        </p>

        <div className="flex items-center justify-center gap-4 mb-16">
          <a
            href="#koleksi"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-stone-900 text-white text-xs sm:text-sm font-medium hover:bg-stone-800 transition-all shadow-xs"
          >
            Lihat Koleksi <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* ─── PREVIEW BESAR (CLEAN FRAME) ─── */}
        <div className="relative mx-auto max-w-3xl rounded-xl border border-stone-200 bg-white p-3 sm:p-4 shadow-sm overflow-hidden group">
          <div className="relative aspect-[16/9] sm:aspect-[2/1] rounded-lg overflow-hidden bg-stone-100">
            <img
              src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&auto=format&fit=crop&q=80"
              alt="Preview Undangan"
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent flex flex-col items-center justify-end p-6 sm:p-8 text-white text-center">
              <span className="text-[10px] uppercase tracking-[0.25em] text-stone-300 font-light mb-1">
                Featured Design • Elegant
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-light mb-3">
                Romeo & Juliet
              </h2>
              <Link
                href="/i/demo-elegant"
                target="_blank"
                className="inline-flex items-center gap-1.5 text-xs text-stone-200 hover:text-white border-b border-stone-400 pb-0.5 transition-colors"
              >
                Buka Full Preview <ExternalLink className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          3. KATALOG DESAIN
         ───────────────────────────────────────────── */}
      <section id="koleksi" className="py-20 px-6 border-t border-stone-200/80 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-serif font-normal text-stone-900 mb-2">
              Temukan Desain Favorit Anda
            </h2>
            <p className="text-stone-500 text-xs sm:text-sm font-light">
              Pilihan tipografi dan tata letak elegan untuk hari istimewa Anda.
            </p>
          </div>

          <HomeCatalogSection items={catalogItems} />
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          4. TENTANG & WHATSAPP
         ───────────────────────────────────────────── */}
      <section id="tentang" className="py-20 px-6 max-w-3xl mx-auto text-center border-t border-stone-200/80">
        <h2 className="text-2xl sm:text-3xl font-serif font-normal text-stone-900 mb-4">
          Tentang {appConfig.name}
        </h2>
        <p className="text-stone-500 text-xs sm:text-sm font-light leading-relaxed mb-10 max-w-lg mx-auto">
          Platform undangan pernikahan digital modern yang menyatukan estetika desain klasik dengan kemudahan berbagi momen bahagia secara instan.
        </p>

        {/* Simple WhatsApp Card */}
        <div className="p-8 rounded-2xl border border-stone-200 bg-[#FAFAF8] text-center space-y-4">
          <h3 className="text-lg font-serif text-stone-900">
            Butuh Bantuan atau Desain Khusus?
          </h3>
          <p className="text-xs text-stone-500 max-w-md mx-auto font-light">
            Konsultasikan detail pernikahan Anda langsung dengan tim kami melalui WhatsApp.
          </p>
          <div className="pt-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-stone-900 text-white text-xs font-medium hover:bg-stone-800 transition-all shadow-xs"
            >
              <MessageCircle className="h-4 w-4" /> Hubungi via WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          5. FOOTER
         ───────────────────────────────────────────── */}
      <footer className="border-t border-stone-200/80 py-8 text-center text-xs text-stone-400 font-light">
        <p>Copyright © 2026 InvitationKami</p>
      </footer>
    </div>
  )
}


