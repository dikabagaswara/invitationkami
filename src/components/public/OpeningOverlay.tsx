'use client'

import { useState, useEffect } from 'react'
import { Sparkles, Heart } from 'lucide-react'

interface OpeningOverlayProps {
  groomName: string
  brideName: string
  guestName?: string
  openingTitle?: string | null
  eventDate?: string
  themeSlug?: string
  coverPhoto?: string
  onOpen: () => void
}

export function OpeningOverlay({
  groomName,
  brideName,
  guestName,
  openingTitle,
  eventDate,
  themeSlug = 'elegant',
  coverPhoto,
  onOpen,
}: OpeningOverlayProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  // Default fallback romantic couple portrait if none is uploaded
  const defaultCouplePhoto = 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1000&auto=format&fit=crop&q=80'
  const displayPhoto = coverPhoto || defaultCouplePhoto

  const handleOpen = () => {
    setIsClosing(true)
    setTimeout(() => {
      setIsOpen(true)
      document.body.style.overflow = 'auto'
      onOpen()
    }, 800)
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  if (isOpen) return null

  // Determine dynamic themed styling & decorative frames
  let bgClass = 'bg-stone-50'
  let textPrimary = 'text-stone-800'
  let textSecondary = 'text-stone-500'
  let accentBtn = 'bg-stone-900 hover:bg-stone-800 text-white shadow-stone-300'
  let cardClass = 'bg-white/85 border-stone-200 shadow-2xl backdrop-blur-md'
  let frameClass = 'rounded-full p-2 bg-gradient-to-tr from-amber-200 via-stone-100 to-amber-300 shadow-xl'
  let badgeClass = 'bg-stone-100 text-stone-700 border-stone-200'

  if (themeSlug === 'luxury' || themeSlug === 'botanical' || themeSlug === 'celestial') {
    if (themeSlug === 'luxury') {
      bgClass = 'bg-[#0B0B0C] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1C1A17] to-[#080809]'
      textPrimary = 'text-[#E5D2BA]'
      textSecondary = 'text-[#A8947C]'
      accentBtn = 'bg-gradient-to-r from-[#C5A880] to-[#DFCAAB] hover:from-[#DFCAAB] hover:to-[#C5A880] text-[#111] font-bold shadow-amber-950/60'
      cardClass = 'bg-[#151412]/80 border-[#C5A880]/30 shadow-2xl backdrop-blur-md'
      frameClass = 'rounded-full p-2 bg-gradient-to-tr from-[#C5A880] via-[#F4EBD9] to-[#8C6D45] shadow-2xl ring-2 ring-[#C5A880]/40'
      badgeClass = 'bg-[#221F1B] text-[#DFCAAB] border-[#C5A880]/30'
    } else if (themeSlug === 'botanical') {
      bgClass = 'bg-[#09150C] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#112918] to-[#050D07]'
      textPrimary = 'text-[#F0FDF4]'
      textSecondary = 'text-[#86EFAC]'
      accentBtn = 'bg-gradient-to-r from-[#16A34A] to-[#15803D] hover:from-[#15803D] hover:to-[#166534] text-white font-semibold shadow-emerald-950/60'
      cardClass = 'bg-[#0D1F12]/85 border-emerald-500/30 shadow-2xl backdrop-blur-md'
      frameClass = 'rounded-full p-2 bg-gradient-to-tr from-emerald-400 via-emerald-100 to-green-600 shadow-2xl ring-2 ring-emerald-500/40'
      badgeClass = 'bg-emerald-950/80 text-emerald-300 border-emerald-500/30'
    } else {
      bgClass = 'bg-[#080516] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1C123D] to-[#050310]'
      textPrimary = 'text-white'
      textSecondary = 'text-[#C4B5FD]'
      accentBtn = 'bg-gradient-to-r from-[#8B5CF6] to-[#6D28D9] hover:from-[#7C3AED] hover:to-[#5B21B6] text-white font-semibold shadow-purple-950/70'
      cardClass = 'bg-[#120B2E]/85 border-purple-500/30 shadow-2xl backdrop-blur-md'
      frameClass = 'rounded-full p-2 bg-gradient-to-tr from-purple-400 via-pink-200 to-indigo-500 shadow-2xl ring-2 ring-purple-400/40'
      badgeClass = 'bg-purple-950/80 text-purple-200 border-purple-500/30'
    }
  } else if (themeSlug === 'floral' || themeSlug === 'blossom') {
    bgClass = 'bg-rose-50/90 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-rose-50 to-pink-100/50'
    textPrimary = 'text-rose-950'
    textSecondary = 'text-rose-600'
    accentBtn = 'bg-gradient-to-r from-rose-600 to-pink-500 hover:from-rose-700 hover:to-pink-600 text-white font-semibold shadow-rose-200'
    cardClass = 'bg-white/90 border-rose-200/80 shadow-2xl backdrop-blur-md'
    frameClass = 'rounded-full p-2 bg-gradient-to-tr from-rose-300 via-pink-100 to-rose-400 shadow-xl ring-4 ring-rose-100'
    badgeClass = 'bg-rose-50 text-rose-700 border-rose-200'
  } else if (themeSlug === 'oceanic') {
    bgClass = 'bg-[#F0F7FA] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-[#E0F2FE] to-[#BAE6FD]/40'
    textPrimary = 'text-[#023E8A]'
    textSecondary = 'text-[#0077B6]'
    accentBtn = 'bg-gradient-to-r from-[#0077B6] to-[#023E8A] hover:from-[#023E8A] hover:to-[#03045E] text-white font-semibold shadow-[#0077B6]/30'
    cardClass = 'bg-white/90 border-[#BAE6FD] shadow-2xl backdrop-blur-md'
    frameClass = 'rounded-full p-2 bg-gradient-to-tr from-[#38BDF8] via-[#E0F2FE] to-[#0284C7] shadow-xl ring-4 ring-[#E0F2FE]'
    badgeClass = 'bg-sky-50 text-sky-800 border-sky-200'
  } else if (themeSlug === 'terracotta') {
    bgClass = 'bg-[#FBF6F0] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-[#F5E6DF] to-[#EBD7CE]/60'
    textPrimary = 'text-[#3D2619]'
    textSecondary = 'text-[#C85A32]'
    accentBtn = 'bg-gradient-to-r from-[#C85A32] to-[#9C3814] hover:from-[#B54A24] hover:to-[#822B0C] text-white font-semibold shadow-[#C85A32]/30'
    cardClass = 'bg-white/90 border-[#EBD7CE] shadow-2xl backdrop-blur-md'
    frameClass = 'rounded-full p-2 bg-gradient-to-tr from-[#FDBA74] via-[#FFF7ED] to-[#EA580C] shadow-xl ring-4 ring-[#FED7AA]/40'
    badgeClass = 'bg-orange-50 text-orange-900 border-orange-200'
  } else if (themeSlug === 'rustic' || themeSlug === 'vintage') {
    bgClass = 'bg-[#FAF6F0] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#FAF7F2] via-[#F1E8DC] to-[#E5D7C3]'
    textPrimary = 'text-[#3B281B]'
    textSecondary = 'text-[#7D5E46]'
    accentBtn = 'bg-gradient-to-r from-[#5C3E28] to-[#3D2615] hover:from-[#4A301E] hover:to-[#2B190C] text-[#FAF6F0] font-serif shadow-[#5C3E28]/30'
    cardClass = 'bg-[#FFFDF9]/95 border-[#D9CBB9] shadow-2xl backdrop-blur-md'
    frameClass = 'rounded-full p-2 bg-gradient-to-tr from-[#C2AB91] via-[#FFFDF9] to-[#8C6D53] shadow-xl ring-4 ring-[#E8DDD0]'
    badgeClass = 'bg-amber-50/80 text-amber-950 border-amber-200'
  } else if (themeSlug === 'arcade') {
    bgClass = 'bg-[#0f172a] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1e1b4b] to-[#020617]'
    textPrimary = 'text-[#38bdf8]'
    textSecondary = 'text-[#f43f5e]'
    accentBtn = 'bg-gradient-to-r from-[#06b6d4] via-[#ec4899] to-[#8b5cf6] hover:brightness-110 text-white font-mono font-bold shadow-cyan-500/40 border border-cyan-300'
    cardClass = 'bg-[#0f172a]/90 border-2 border-[#38bdf8] shadow-[0_0_25px_rgba(56,189,248,0.3)] backdrop-blur-md'
    frameClass = 'rounded-full p-2 bg-gradient-to-tr from-[#06b6d4] via-[#ec4899] to-[#8b5cf6] shadow-[0_0_20px_rgba(6,182,212,0.6)] ring-4 ring-[#06b6d4]'
    badgeClass = 'bg-[#1e1b4b] text-[#38bdf8] border-[#38bdf8]/50 font-mono'
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center p-4 sm:p-6 transition-all duration-1000 ease-out overflow-y-auto ${bgClass} ${
        isClosing ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* ─── ANIMATED FESTIVE BACKGROUND ORNAMENTS ─── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-12 -left-12 w-64 h-64 bg-pink-200/30 rounded-full blur-3xl animate-pulse duration-1000"></div>
        <div className="absolute -bottom-12 -right-12 w-72 h-72 bg-amber-200/30 rounded-full blur-3xl animate-bounce duration-1000"></div>
        <div className="absolute top-1/4 right-8 text-2xl opacity-60 animate-bounce duration-1000">✨</div>
        <div className="absolute bottom-1/4 left-8 text-2xl opacity-60 animate-bounce duration-1000">🌸</div>
      </div>

      {/* ─── FESTIVE COVER CARD CONTAINER ─── */}
      <div className={`relative z-10 max-w-sm sm:max-w-md w-full text-center p-6 sm:p-8 rounded-[2.5rem] border ${cardClass} space-y-6 my-auto`}>
        
        {/* Top Tag & Sparkle */}
        <div className="flex items-center justify-center gap-2">
          <span className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[10px] sm:text-xs font-semibold tracking-[0.2em] uppercase border ${badgeClass}`}>
            <Sparkles className="w-3 h-3" />
            {openingTitle || 'THE WEDDING CELEBRATION'}
          </span>
        </div>

        {/* ─── COUPLE FEATURE PHOTO WITH ELEGANT CUSTOMIZABLE BORDER FRAME ─── */}
        <div className="relative mx-auto w-36 h-36 sm:w-44 sm:h-44 group">
          <div className={`w-full h-full ${frameClass} transition-transform duration-700 group-hover:scale-105`}>
            <div className="w-full h-full rounded-full overflow-hidden bg-stone-100">
              <img
                src={displayPhoto}
                alt={`${groomName} & ${brideName}`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="absolute -bottom-1 right-2 bg-white text-rose-500 p-2 rounded-full shadow-lg border border-rose-100">
            <Heart className="w-4 h-4 fill-current animate-pulse" />
          </div>
        </div>

        {/* Couple Names */}
        <div className="space-y-1">
          <h1 className={`text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight font-medium ${textPrimary}`}>
            {groomName} &amp; {brideName}
          </h1>
          {eventDate && (
            <p className={`text-xs sm:text-sm font-medium tracking-widest uppercase pt-1 ${textSecondary}`}>
              {eventDate}
            </p>
          )}
        </div>

        {/* ─── PERSONALIZED GUEST RECIPIENT CARD ─── */}
        <div className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 space-y-1">
          <p className={`text-[11px] uppercase tracking-wider ${textSecondary}`}>
            Kepada Yth. Bapak/Ibu/Saudara/i:
          </p>
          <p className={`text-base sm:text-lg font-bold truncate px-2 ${textPrimary}`}>
            {guestName ? decodeURIComponent(guestName) : 'Tamu Undangan'}
          </p>
        </div>

        {/* ─── OPEN INVITATION BUTTON ─── */}
        <button
          onClick={handleOpen}
          className={`w-full py-3.5 px-6 rounded-full transition-all duration-300 cursor-pointer text-xs sm:text-sm font-medium tracking-[0.15em] uppercase shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 ${accentBtn}`}
        >
          <span>💌 Buka Undangan</span>
        </button>
      </div>
    </div>
  )
}
