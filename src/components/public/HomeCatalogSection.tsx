'use client'

import Link from 'next/link'
import { ExternalLink, Sparkles, Waves, Sun, Star, Heart, Leaf, ScrollText, Feather, Compass, Eye } from 'lucide-react'

export interface CatalogItem {
  id: string
  name: string
  themeSlug: string
  category: string
  demoSlug: string
  tagline: string
  isPremium?: boolean
}

// Visual animated backdrop & icon treatments with high-contrast text and badge colors for every theme
const THEME_ANIMATION_STYLES: Record<string, {
  bgGradient: string
  isDarkTheme: boolean
  titleColor: string
  subColor: string
  bottomColor: string
  badgeBg: string
  badgeText: string
  icon: any
  animationElement: React.ReactNode
}> = {
  oceanic: {
    bgGradient: 'from-[#0077B6] via-[#023E8A] to-[#03045E]',
    isDarkTheme: true,
    titleColor: 'text-white',
    subColor: 'text-sky-200/90',
    bottomColor: 'text-sky-100/90 border-white/20',
    badgeBg: 'bg-[#E0F2FE]',
    badgeText: 'text-[#0284C7]',
    icon: Waves,
    animationElement: (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#90E0EF]/40 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-[#0077B6]/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 border border-white/30 rounded-full animate-ping duration-[3000ms] opacity-40"></div>
      </div>
    ),
  },
  terracotta: {
    bgGradient: 'from-[#C85A32] via-[#B85028] to-[#733518]',
    isDarkTheme: true,
    titleColor: 'text-white',
    subColor: 'text-[#FED7AA]',
    bottomColor: 'text-[#FFEDD5] border-white/20',
    badgeBg: 'bg-[#FFEDD5]',
    badgeText: 'text-[#C85A32]',
    icon: Sun,
    animationElement: (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-12 -right-12 w-44 h-44 bg-[#E7C1AC]/50 rounded-full blur-2xl animate-pulse duration-[3000ms]"></div>
        <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-[#C85A32]/30 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-20 h-28 border border-[#F5E6DF]/40 rounded-t-full"></div>
      </div>
    ),
  },
  botanical: {
    bgGradient: 'from-[#132c1b] via-[#0b170e] to-[#070f09]',
    isDarkTheme: true,
    titleColor: 'text-white',
    subColor: 'text-emerald-300',
    bottomColor: 'text-emerald-200/90 border-emerald-800/60',
    badgeBg: 'bg-emerald-950 border border-emerald-700/60',
    badgeText: 'text-emerald-300',
    icon: Leaf,
    animationElement: (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -left-10 w-44 h-44 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-emerald-900/40 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-emerald-500/20 rotate-45 rounded-2xl animate-spin duration-[20000ms]"></div>
      </div>
    ),
  },
  celestial: {
    bgGradient: 'from-[#1D143D] via-[#110C29] to-[#060411]',
    isDarkTheme: true,
    titleColor: 'text-white',
    subColor: 'text-purple-300',
    bottomColor: 'text-purple-200/90 border-purple-800/60',
    badgeBg: 'bg-purple-950 border border-purple-700/60',
    badgeText: 'text-purple-300',
    icon: Star,
    animationElement: (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-4 right-6 w-2 h-2 bg-purple-300 rounded-full animate-ping duration-[2000ms]"></div>
        <div className="absolute bottom-6 left-8 w-1.5 h-1.5 bg-amber-300 rounded-full animate-ping duration-[3000ms]"></div>
        <div className="absolute -top-12 -left-12 w-48 h-48 bg-purple-600/25 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#c084fc_0.75px,transparent_0.75px)] opacity-[0.2] [background-size:20px_20px]"></div>
      </div>
    ),
  },
  rustic: {
    bgGradient: 'from-[#785338] via-[#63422A] to-[#3D2619]',
    isDarkTheme: true,
    titleColor: 'text-white',
    subColor: 'text-[#E8DDD0]',
    bottomColor: 'text-[#FAF6F0]/90 border-white/20',
    badgeBg: 'bg-[#FAF6F0]',
    badgeText: 'text-[#63422A]',
    icon: Feather,
    animationElement: (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-8 -right-8 w-40 h-40 bg-[#D9CBB9]/40 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-8 -left-8 w-44 h-44 bg-[#8C6D53]/25 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute inset-4 border border-dashed border-[#FAF6F0]/30 rounded-2xl"></div>
      </div>
    ),
  },
  vintage: {
    bgGradient: 'from-[#4A2E1B] via-[#382112] to-[#24150A]',
    isDarkTheme: true,
    titleColor: 'text-white',
    subColor: 'text-[#EAE2D2]',
    bottomColor: 'text-[#F7F3EB]/90 border-white/20',
    badgeBg: 'bg-[#F7F3EB]',
    badgeText: 'text-[#4A2E1B]',
    icon: ScrollText,
    animationElement: (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-3 border-2 border-[#C2AB91]/40 rounded-xl"></div>
        <div className="absolute inset-4 border border-[#C2AB91]/20 rounded-lg"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#C2AB91]/25 font-serif text-6xl select-none">
          ❧
        </div>
      </div>
    ),
  },
  luxury: {
    bgGradient: 'from-[#1a1a1a] via-[#111111] to-[#0A0A0A]',
    isDarkTheme: true,
    titleColor: 'text-amber-100',
    subColor: 'text-amber-400',
    bottomColor: 'text-amber-200/80 border-amber-500/20',
    badgeBg: 'bg-stone-900 border border-amber-500/40',
    badgeText: 'text-amber-400',
    icon: Sparkles,
    animationElement: (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -left-10 w-44 h-44 bg-amber-500/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-yellow-600/15 rounded-full blur-3xl"></div>
        <div className="absolute inset-5 border border-amber-500/30 rounded-xl"></div>
      </div>
    ),
  },
  // HIGH-CONTRAST LIGHT PALETTES WITH CRISP DARK STONE/SLATE TEXT:
  elegant: {
    bgGradient: 'from-[#FDFBF7] via-[#F7F2EA] to-[#EFE7D8]',
    isDarkTheme: false,
    titleColor: 'text-stone-900 font-semibold',
    subColor: 'text-stone-700 font-medium',
    bottomColor: 'text-stone-800 border-stone-300',
    badgeBg: 'bg-white border border-amber-300 shadow-xs',
    badgeText: 'text-amber-900 font-semibold',
    icon: Heart,
    animationElement: (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-amber-300/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-rose-200/40 rounded-full blur-3xl"></div>
        <div className="absolute inset-4 border border-amber-300/70 rounded-2xl"></div>
      </div>
    ),
  },
  modern: {
    bgGradient: 'from-[#1F2937] via-[#111827] to-[#030712]',
    isDarkTheme: true,
    titleColor: 'text-white',
    subColor: 'text-stone-300',
    bottomColor: 'text-stone-200 border-stone-700',
    badgeBg: 'bg-stone-800 border border-stone-700',
    badgeText: 'text-white',
    icon: Compass,
    animationElement: (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-32 h-32 bg-stone-700/40 rounded-bl-full"></div>
        <div className="absolute bottom-4 left-4 w-12 h-1 bg-stone-600 rounded-full"></div>
      </div>
    ),
  },
  floral: {
    bgGradient: 'from-[#FFF1F2] via-[#FFE4E6] to-[#FECDD3]',
    isDarkTheme: false,
    titleColor: 'text-rose-950 font-semibold',
    subColor: 'text-rose-800 font-medium',
    bottomColor: 'text-rose-900 border-rose-300',
    badgeBg: 'bg-white border border-rose-300 shadow-xs',
    badgeText: 'text-rose-800 font-semibold',
    icon: Heart,
    animationElement: (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -right-10 w-44 h-44 bg-rose-300/40 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-pink-300/30 rounded-full blur-3xl"></div>
      </div>
    ),
  },
  minimalist: {
    bgGradient: 'from-[#F8FAFC] via-[#F1F5F9] to-[#E2E8F0]',
    isDarkTheme: false,
    titleColor: 'text-slate-900 font-semibold',
    subColor: 'text-slate-700 font-medium',
    bottomColor: 'text-slate-800 border-slate-300',
    badgeBg: 'bg-white border border-slate-300 shadow-xs',
    badgeText: 'text-slate-900 font-semibold',
    icon: Sparkles,
    animationElement: (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-slate-300/80 rounded-full"></div>
      </div>
    ),
  },
}

export function HomeCatalogSection({ items }: { items: CatalogItem[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
      {items.map((item) => {
        const style = THEME_ANIMATION_STYLES[item.themeSlug] || THEME_ANIMATION_STYLES.elegant
        const IconComponent = style.icon

        return (
          <Link
            key={item.id}
            href={`/i/${item.demoSlug}`}
            target="_blank"
            className="group relative aspect-[4/5] rounded-3xl border border-stone-300/80 shadow-sm hover:shadow-2xl hover:border-stone-500 transition-all duration-500 overflow-hidden flex flex-col justify-between p-6 cursor-pointer"
          >
            {/* Background Animated Atmosphere */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${style.bgGradient} transition-transform duration-700 group-hover:scale-105`}
            >
              {style.animationElement}
            </div>

            {/* Top Bar: Icon Badge & Premium Tag */}
            <div className="relative z-10 flex items-center justify-between">
              <div
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider backdrop-blur-md ${style.badgeBg} ${style.badgeText} shadow-xs`}
              >
                <IconComponent className="w-3 h-3" />
                <span>{item.name}</span>
              </div>

              {item.isPremium && (
                <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-amber-400 text-stone-950 shadow-xs">
                  Exclusive
                </span>
              )}
            </div>

            {/* Center: Clean High-Contrast Thematic Title */}
            <div className="relative z-10 text-center my-auto py-4">
              <span className={`text-[10px] tracking-[0.25em] uppercase block mb-1 font-sans ${style.subColor}`}>
                Tema Pernikahan
              </span>
              <h3 className={`text-2xl sm:text-3xl font-serif tracking-wide drop-shadow-xs group-hover:scale-108 transition-transform duration-500 ${style.titleColor}`}>
                {item.name}
              </h3>
            </div>

            {/* Bottom Bar: Quick Indicator (Static State) with distinct contrast */}
            <div className={`relative z-10 flex items-center justify-between text-xs border-t pt-3 group-hover:opacity-0 transition-opacity duration-300 ${style.bottomColor}`}>
              <span className="text-[10px] tracking-widest uppercase font-medium">100% Responsif</span>
              <span className="text-[11px] font-medium">Lihat Desain</span>
            </div>

            {/* Full-Cover Hover Overlay: Instantly Shows "Buka Full Preview" on Hover */}
            <div className="absolute inset-0 z-20 bg-stone-950/80 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-3 p-6 text-center text-white">
              <div className="w-12 h-12 rounded-full bg-white/15 border border-white/30 flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-300 shadow-lg">
                <Eye className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-serif text-xl font-light tracking-wide">{item.name}</h4>
                <p className="text-[11px] text-stone-300 font-light mt-0.5">Klik untuk membuka preview</p>
              </div>
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white text-stone-950 text-xs font-semibold shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                Buka Preview <ExternalLink className="w-3 h-3" />
              </span>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
