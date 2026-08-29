'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ExternalLink, Sparkles, Waves, Sun, Star, Heart, Leaf, ScrollText, Feather, Compass } from 'lucide-react'

export interface CatalogItem {
  id: string
  name: string
  themeSlug: string
  category: string
  demoSlug: string
  tagline: string
  isPremium?: boolean
}

// Visual animated backdrop & icon treatments for each theme
const THEME_ANIMATION_STYLES: Record<string, {
  bgGradient: string
  cardBg: string
  accentColor: string
  textColor: string
  badgeBg: string
  badgeText: string
  icon: any
  animationElement: React.ReactNode
}> = {
  oceanic: {
    bgGradient: 'from-[#0077B6] via-[#023E8A] to-[#03045E]',
    cardBg: 'bg-[#F0F7FA]',
    accentColor: '#0077B6',
    textColor: 'text-[#023E8A]',
    badgeBg: 'bg-[#E0F2FE]',
    badgeText: 'text-[#0284C7]',
    icon: Waves,
    animationElement: (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#90E0EF]/40 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-[#0077B6]/30 rounded-full blur-3xl animate-bounce duration-[4000ms]"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 border border-white/30 rounded-full animate-ping duration-[3000ms] opacity-40"></div>
      </div>
    ),
  },
  terracotta: {
    bgGradient: 'from-[#C85A32] via-[#D48B6C] to-[#735140]',
    cardBg: 'bg-[#FBF6F0]',
    accentColor: '#C85A32',
    textColor: 'text-[#3D2619]',
    badgeBg: 'bg-[#F5E6DF]',
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
    cardBg: 'bg-[#0b170e]',
    accentColor: '#15803d',
    textColor: 'text-[#f0fdf4]',
    badgeBg: 'bg-emerald-950 border border-emerald-800/40',
    badgeText: 'text-emerald-400',
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
    cardBg: 'bg-[#0A071B]',
    accentColor: '#8B5CF6',
    textColor: 'text-white',
    badgeBg: 'bg-purple-950 border border-purple-800/40',
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
    bgGradient: 'from-[#785338] via-[#8C6D53] to-[#4A3728]',
    cardBg: 'bg-[#FAF6F0]',
    accentColor: '#785338',
    textColor: 'text-[#4A3728]',
    badgeBg: 'bg-[#F3ECE2]',
    badgeText: 'text-[#785338]',
    icon: Feather,
    animationElement: (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-8 -right-8 w-40 h-40 bg-[#D9CBB9]/40 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-8 -left-8 w-44 h-44 bg-[#8C6D53]/25 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute inset-4 border border-dashed border-[#8C6D53]/30 rounded-2xl"></div>
      </div>
    ),
  },
  vintage: {
    bgGradient: 'from-[#4A2E1B] via-[#7D5E46] to-[#302217]',
    cardBg: 'bg-[#F7F3EB]',
    accentColor: '#4A2E1B',
    textColor: 'text-[#302217]',
    badgeBg: 'bg-[#EAE2D2]',
    badgeText: 'text-[#4A2E1B]',
    icon: ScrollText,
    animationElement: (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-3 border-2 border-[#C2AB91]/50 rounded-xl"></div>
        <div className="absolute inset-4 border border-[#C2AB91]/30 rounded-lg"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#C2AB91]/20 font-serif text-6xl select-none">
          ❧
        </div>
      </div>
    ),
  },
  luxury: {
    bgGradient: 'from-[#1a1a1a] via-[#111111] to-[#0A0A0A]',
    cardBg: 'bg-[#0A0A0A]',
    accentColor: '#C9A84C',
    textColor: 'text-white',
    badgeBg: 'bg-stone-900 border border-amber-500/30',
    badgeText: 'text-amber-400',
    icon: Sparkles,
    animationElement: (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -left-10 w-44 h-44 bg-amber-500/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-yellow-600/15 rounded-full blur-3xl"></div>
        <div className="absolute inset-5 border border-amber-500/20 rounded-xl"></div>
      </div>
    ),
  },
  elegant: {
    bgGradient: 'from-[#FAF7F2] via-[#F5EFEB] to-[#EBDED3]',
    cardBg: 'bg-[#FAF7F2]',
    accentColor: '#C9A84C',
    textColor: 'text-stone-800',
    badgeBg: 'bg-amber-50 border border-amber-200',
    badgeText: 'text-amber-800',
    icon: Heart,
    animationElement: (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-amber-200/40 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-rose-200/30 rounded-full blur-3xl"></div>
        <div className="absolute inset-4 border border-amber-200/60 rounded-2xl"></div>
      </div>
    ),
  },
  modern: {
    bgGradient: 'from-[#2C2C2C] via-[#1A1A1A] to-[#0F0F0F]',
    cardBg: 'bg-white',
    accentColor: '#2C2C2C',
    textColor: 'text-stone-900',
    badgeBg: 'bg-stone-100',
    badgeText: 'text-stone-800',
    icon: Compass,
    animationElement: (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-32 h-32 bg-stone-200/50 rounded-bl-full"></div>
        <div className="absolute bottom-4 left-4 w-12 h-1 bg-stone-300 rounded-full"></div>
      </div>
    ),
  },
  floral: {
    bgGradient: 'from-[#FFF5F5] via-[#FFEBEB] to-[#FCDCDC]',
    cardBg: 'bg-[#FFF8F8]',
    accentColor: '#E8A5A0',
    textColor: 'text-stone-800',
    badgeBg: 'bg-rose-50 border border-rose-200',
    badgeText: 'text-rose-700',
    icon: Heart,
    animationElement: (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -right-10 w-44 h-44 bg-rose-300/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-pink-200/40 rounded-full blur-3xl"></div>
      </div>
    ),
  },
  minimalist: {
    bgGradient: 'from-[#FFFFFF] via-[#F9F9F9] to-[#F0F0F0]',
    cardBg: 'bg-white',
    accentColor: '#1A1A1A',
    textColor: 'text-stone-900',
    badgeBg: 'bg-stone-100',
    badgeText: 'text-stone-800',
    icon: Sparkles,
    animationElement: (
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border border-stone-200 rounded-full"></div>
      </div>
    ),
  },
}

export function HomeCatalogSection({ items }: { items: CatalogItem[] }) {
  const [activeFilter, setActiveFilter] = useState('all')

  const categories = [
    { id: 'all', label: 'Semua Desain' },
    { id: 'popular', label: 'Favorit' },
    { id: 'luxury', label: 'Luxury & Dark' },
    { id: 'nature', label: 'Nature & Earth' },
  ]

  const filteredItems = items.filter((item) => {
    if (activeFilter === 'all') return true
    if (activeFilter === 'popular') return ['oceanic', 'terracotta', 'elegant', 'botanical'].includes(item.themeSlug)
    if (activeFilter === 'luxury') return ['luxury', 'celestial', 'botanical'].includes(item.themeSlug)
    if (activeFilter === 'nature') return ['terracotta', 'oceanic', 'rustic', 'floral'].includes(item.themeSlug)
    return true
  })

  return (
    <div className="space-y-12">
      {/* Clean Category Filter Pill */}
      <div className="flex items-center justify-center gap-2 max-w-lg mx-auto flex-wrap">
        {categories.map((cat) => {
          const isActive = activeFilter === cat.id
          return (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`px-5 py-2 text-xs sm:text-sm font-medium transition-all duration-200 rounded-full cursor-pointer ${
                isActive
                  ? 'bg-stone-900 text-white shadow-sm'
                  : 'bg-stone-100/80 text-stone-600 hover:bg-stone-200/80 hover:text-stone-900'
              }`}
            >
              {cat.label}
            </button>
          )
        })}
      </div>

      {/* Modern Clean Animated Design Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredItems.map((item) => {
          const style = THEME_ANIMATION_STYLES[item.themeSlug] || THEME_ANIMATION_STYLES.elegant
          const IconComponent = style.icon

          return (
            <div
              key={item.id}
              className="group bg-white rounded-3xl border border-stone-200/80 shadow-xs hover:shadow-xl hover:border-stone-300 transition-all duration-500 flex flex-col overflow-hidden"
            >
              {/* Animated Interactive Visual Frame */}
              <div
                className={`relative aspect-[4/3] p-6 flex flex-col justify-between overflow-hidden bg-gradient-to-br ${style.bgGradient} transition-transform duration-700`}
              >
                {/* Embedded Ambient Particle & Geometry Animations */}
                {style.animationElement}

                {/* Top Badge */}
                <div className="relative z-10 flex items-center justify-between">
                  <div
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wider backdrop-blur-md ${style.badgeBg} ${style.badgeText} shadow-xs`}
                  >
                    <IconComponent className="w-3 h-3 animate-pulse" />
                    <span>{item.name}</span>
                  </div>

                  {item.isPremium && (
                    <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 rounded-full bg-amber-400 text-stone-950 shadow-xs">
                      Exclusive
                    </span>
                  )}
                </div>

                {/* Center Animated Title Graphic */}
                <div className="relative z-10 text-center my-auto py-2">
                  <span className="text-[10px] tracking-[0.3em] uppercase opacity-70 block mb-1 font-sans text-white">
                    Wedding Invitation
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif font-light text-white tracking-wide drop-shadow-xs group-hover:scale-105 transition-transform duration-500">
                    {item.name}
                  </h3>
                </div>

                {/* Bottom Visual Indicator */}
                <div className="relative z-10 flex items-center justify-between text-[11px] text-white/80">
                  <span className="tracking-widest uppercase text-[10px]">Digital Platform</span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium group-hover:translate-x-0.5 transition-transform">
                    Buka Preview →
                  </span>
                </div>
              </div>

              {/* Clean Information & Direct Action */}
              <div className="p-6 flex-1 flex flex-col justify-between bg-white space-y-4">
                <div>
                  <h4 className="font-serif text-lg font-medium text-stone-900 mb-1.5">
                    Tema {item.name}
                  </h4>
                  <p className="text-xs text-stone-500 leading-relaxed font-light">
                    {item.tagline}
                  </p>
                </div>

                <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                  <span className="text-[11px] text-stone-400 font-medium">
                    100% Responsif &amp; Musik Aktif
                  </span>
                  <Link
                    href={`/i/${item.demoSlug}`}
                    target="_blank"
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-stone-900 text-white text-xs font-medium hover:bg-stone-800 transition-colors shadow-xs"
                  >
                    Lihat Demo <ExternalLink className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Reset Filter Footer */}
      {activeFilter !== 'all' && (
        <div className="text-center pt-2">
          <button
            onClick={() => setActiveFilter('all')}
            className="text-xs tracking-wider uppercase text-stone-500 hover:text-stone-900 border-b border-stone-300 pb-0.5 transition-colors cursor-pointer"
          >
            Lihat Semua Koleksi ({items.length} Desain)
          </button>
        </div>
      )}
    </div>
  )
}
