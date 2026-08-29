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

// Rich animated visual atmospheres & micro-interactions for each theme
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
    badgeBg: 'bg-sky-950/70 border border-sky-400/30 backdrop-blur-md',
    badgeText: 'text-sky-200',
    icon: Waves,
    animationElement: (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -left-10 w-44 h-44 bg-[#90E0EF]/40 rounded-full blur-2xl animate-pulse duration-[3000ms]"></div>
        <div className="absolute -bottom-10 -right-10 w-52 h-52 bg-[#0077B6]/40 rounded-full blur-3xl animate-bounce duration-[6000ms]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-2 border-white/20 rounded-full animate-ping duration-[3500ms]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] opacity-[0.25] [background-size:24px_24px]"></div>
      </div>
    ),
  },
  terracotta: {
    bgGradient: 'from-[#C85A32] via-[#A8431E] to-[#6A2B13]',
    isDarkTheme: true,
    titleColor: 'text-white',
    subColor: 'text-[#FED7AA]',
    bottomColor: 'text-[#FFEDD5] border-white/20',
    badgeBg: 'bg-[#431B0E]/70 border border-[#FDBA74]/30 backdrop-blur-md',
    badgeText: 'text-[#FED7AA]',
    icon: Sun,
    animationElement: (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#FDBA74]/30 rounded-full blur-2xl animate-pulse duration-[4000ms]"></div>
        <div className="absolute -bottom-8 -left-8 w-44 h-44 bg-[#C85A32]/40 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-28 h-36 border-2 border-[#FED7AA]/30 rounded-t-full"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#fdba74_1px,transparent_1px)] opacity-[0.2] [background-size:24px_24px]"></div>
      </div>
    ),
  },
  botanical: {
    bgGradient: 'from-[#143820] via-[#0b1e11] to-[#050e08]',
    isDarkTheme: true,
    titleColor: 'text-white',
    subColor: 'text-emerald-300',
    bottomColor: 'text-emerald-200/90 border-emerald-800/60',
    badgeBg: 'bg-emerald-950/80 border border-emerald-500/40 backdrop-blur-md',
    badgeText: 'text-emerald-300',
    icon: Leaf,
    animationElement: (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -left-10 w-48 h-48 bg-emerald-400/25 rounded-full blur-3xl animate-pulse duration-[3500ms]"></div>
        <div className="absolute bottom-0 right-0 w-52 h-52 bg-emerald-700/30 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 border-2 border-emerald-400/25 rotate-45 rounded-3xl animate-spin duration-[25000ms]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#34d399_1px,transparent_1px)] opacity-[0.22] [background-size:22px_22px]"></div>
      </div>
    ),
  },
  celestial: {
    bgGradient: 'from-[#23154C] via-[#130B2E] to-[#070414]',
    isDarkTheme: true,
    titleColor: 'text-white',
    subColor: 'text-purple-300',
    bottomColor: 'text-purple-200/90 border-purple-800/60',
    badgeBg: 'bg-purple-950/80 border border-purple-500/40 backdrop-blur-md',
    badgeText: 'text-purple-300',
    icon: Star,
    animationElement: (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-6 right-8 w-2 h-2 bg-purple-200 rounded-full animate-ping duration-[1800ms]"></div>
        <div className="absolute bottom-8 left-10 w-2 h-2 bg-amber-300 rounded-full animate-ping duration-[2600ms]"></div>
        <div className="absolute -top-12 -left-12 w-52 h-52 bg-purple-600/35 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#c084fc_1px,transparent_1px)] opacity-[0.35] [background-size:20px_20px]"></div>
      </div>
    ),
  },
  rustic: {
    bgGradient: 'from-[#785338] via-[#5C3E28] to-[#362112]',
    isDarkTheme: true,
    titleColor: 'text-white',
    subColor: 'text-[#E8DDD0]',
    bottomColor: 'text-[#FAF6F0]/90 border-white/20',
    badgeBg: 'bg-[#362112]/70 border border-[#D9CBB9]/40 backdrop-blur-md',
    badgeText: 'text-[#FAF6F0]',
    icon: Feather,
    animationElement: (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-8 -right-8 w-44 h-44 bg-[#D9CBB9]/35 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-[#8C6D53]/35 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute inset-4 border-2 border-dashed border-[#FAF6F0]/30 rounded-2xl"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#e8ddd0_1px,transparent_1px)] opacity-[0.2] [background-size:24px_24px]"></div>
      </div>
    ),
  },
  vintage: {
    bgGradient: 'from-[#4A2E1B] via-[#351E0F] to-[#201006]',
    isDarkTheme: true,
    titleColor: 'text-white',
    subColor: 'text-[#EAE2D2]',
    bottomColor: 'text-[#F7F3EB]/90 border-white/20',
    badgeBg: 'bg-[#201006]/70 border border-[#C2AB91]/40 backdrop-blur-md',
    badgeText: 'text-[#F7F3EB]',
    icon: ScrollText,
    animationElement: (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-3 border-2 border-[#C2AB91]/40 rounded-xl"></div>
        <div className="absolute inset-5 border border-[#C2AB91]/25 rounded-lg"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#C2AB91]/30 font-serif text-6xl select-none">
          ❧
        </div>
      </div>
    ),
  },
  luxury: {
    bgGradient: 'from-[#1f190e] via-[#120f08] to-[#080603]',
    isDarkTheme: true,
    titleColor: 'text-amber-100',
    subColor: 'text-amber-400',
    bottomColor: 'text-amber-200/80 border-amber-500/30',
    badgeBg: 'bg-black/70 border border-amber-500/50 backdrop-blur-md',
    badgeText: 'text-amber-300',
    icon: Sparkles,
    animationElement: (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -left-10 w-48 h-48 bg-amber-400/25 rounded-full blur-3xl animate-pulse duration-[3000ms]"></div>
        <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-yellow-500/20 rounded-full blur-3xl"></div>
        <div className="absolute inset-4 border border-amber-400/30 rounded-2xl"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] opacity-[0.25] [background-size:24px_24px]"></div>
      </div>
    ),
  },
  elegant: {
    bgGradient: 'from-[#FAF4EB] via-[#F3E8D7] to-[#E9D9C3]',
    isDarkTheme: false,
    titleColor: 'text-stone-900 font-semibold',
    subColor: 'text-stone-700 font-medium',
    bottomColor: 'text-stone-800 border-amber-300/80',
    badgeBg: 'bg-white/85 border border-amber-300 shadow-xs backdrop-blur-md',
    badgeText: 'text-amber-950 font-semibold',
    icon: Heart,
    animationElement: (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -left-10 w-48 h-48 bg-amber-300/40 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-rose-200/50 rounded-full blur-3xl"></div>
        <div className="absolute inset-4 border-2 border-amber-300/80 rounded-2xl"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#b45309_1px,transparent_1px)] opacity-[0.18] [background-size:24px_24px]"></div>
      </div>
    ),
  },
  modern: {
    bgGradient: 'from-[#1F2937] via-[#111827] to-[#030712]',
    isDarkTheme: true,
    titleColor: 'text-white',
    subColor: 'text-stone-300',
    bottomColor: 'text-stone-200 border-stone-700',
    badgeBg: 'bg-stone-900/80 border border-stone-600 backdrop-blur-md',
    badgeText: 'text-white',
    icon: Compass,
    animationElement: (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-36 h-36 bg-blue-500/15 rounded-bl-full"></div>
        <div className="absolute bottom-4 left-4 w-14 h-1 bg-stone-500 rounded-full"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#9ca3af_1px,transparent_1px)] opacity-[0.25] [background-size:24px_24px]"></div>
      </div>
    ),
  },
  floral: {
    bgGradient: 'from-[#FFF1F2] via-[#FDE2E4] to-[#FCC2D7]',
    isDarkTheme: false,
    titleColor: 'text-rose-950 font-semibold',
    subColor: 'text-rose-800 font-medium',
    bottomColor: 'text-rose-900 border-rose-300',
    badgeBg: 'bg-white/85 border border-rose-300 shadow-xs backdrop-blur-md',
    badgeText: 'text-rose-900 font-semibold',
    icon: Heart,
    animationElement: (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-rose-400/40 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-pink-300/40 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#e11d48_1px,transparent_1px)] opacity-[0.16] [background-size:24px_24px]"></div>
      </div>
    ),
  },
  minimalist: {
    bgGradient: 'from-[#F8FAFC] via-[#EEF2F6] to-[#E2E8F0]',
    isDarkTheme: false,
    titleColor: 'text-slate-900 font-semibold',
    subColor: 'text-slate-700 font-medium',
    bottomColor: 'text-slate-800 border-slate-300',
    badgeBg: 'bg-white/85 border border-slate-300 shadow-xs backdrop-blur-md',
    badgeText: 'text-slate-900 font-semibold',
    icon: Sparkles,
    animationElement: (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 border-2 border-slate-300/90 rounded-full"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#64748b_1px,transparent_1px)] opacity-[0.2] [background-size:24px_24px]"></div>
      </div>
    ),
  },
}

export function HomeCatalogSection({ items }: { items: CatalogItem[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7">
      {items.map((item) => {
        const style = THEME_ANIMATION_STYLES[item.themeSlug] || THEME_ANIMATION_STYLES.elegant
        const IconComponent = style.icon

        return (
          <Link
            key={item.id}
            href={`/i/${item.demoSlug}`}
            target="_blank"
            className="group relative aspect-[4/5] rounded-[2rem] border border-stone-200/90 shadow-sm hover:shadow-2xl hover:border-amber-400/80 transition-all duration-500 overflow-hidden flex flex-col justify-between p-6 cursor-pointer transform hover:-translate-y-1.5"
          >
            {/* Background Animated Atmosphere */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${style.bgGradient} transition-transform duration-700 group-hover:scale-105`}
            >
              {style.animationElement}
            </div>

            {/* Top Bar: Icon Badge with subtle branding */}
            <div className="relative z-10 flex items-center justify-between">
              <div
                className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider ${style.badgeBg} ${style.badgeText} shadow-xs`}
              >
                <IconComponent className="w-3.5 h-3.5 animate-pulse" />
                <span>{item.name}</span>
              </div>

              {/* Discreet Logo Mark */}
              <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center p-1 border border-white/25 opacity-70 group-hover:opacity-100 transition-opacity">
                <img src="/images/logo.png" alt="IK" className="w-full h-full object-contain" />
              </div>
            </div>

            {/* Center: Clean High-Contrast Thematic Title */}
            <div className="relative z-10 text-center my-auto py-4">
              <span className={`text-[10px] tracking-[0.3em] uppercase block mb-1 font-sans font-medium ${style.subColor}`}>
                Tema Eksklusif
              </span>
              <h3 className={`text-2xl sm:text-3xl font-serif tracking-wide drop-shadow-xs group-hover:scale-108 transition-transform duration-500 ${style.titleColor}`}>
                {item.name}
              </h3>
            </div>

            {/* Bottom Bar: Quick Indicator (Static State) */}
            <div className={`relative z-10 flex items-center justify-between text-xs border-t pt-3 group-hover:opacity-0 transition-opacity duration-300 ${style.bottomColor}`}>
              <span className="text-[10px] tracking-widest uppercase font-medium">100% Responsif</span>
              <span className="text-[11px] font-medium inline-flex items-center gap-1">
                Buka Tema →
              </span>
            </div>

            {/* Full-Cover Interactive Hover Overlay */}
            <div className="absolute inset-0 z-20 bg-stone-950/85 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-all duration-400 flex flex-col items-center justify-center gap-3.5 p-6 text-center text-white">
              <div className="w-14 h-14 rounded-full bg-white/15 border border-white/30 flex items-center justify-center scale-75 group-hover:scale-100 transition-transform duration-300 shadow-xl">
                <Eye className="w-6 h-6 text-white animate-pulse" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-amber-300 font-sans block mb-1">
                  InvitationKami Premium
                </span>
                <h4 className="font-serif text-2xl font-light tracking-wide">{item.name}</h4>
                <p className="text-[11px] text-stone-300 font-light mt-0.5">Klik untuk melihat tampilan undangan</p>
              </div>
              <span className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-white text-stone-950 text-xs font-semibold shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                Buka Preview <ExternalLink className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
