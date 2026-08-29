'use client'

import { useState, useEffect } from 'react'

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
  themeSlug,
  onOpen,
}: OpeningOverlayProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

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

  // Determine elegant minimal theme styles
  let bgClass = 'bg-stone-50'
  let textPrimary = 'text-stone-800'
  let textSecondary = 'text-stone-500'
  let accentColor = 'bg-stone-800 hover:bg-stone-900 text-white'
  let borderClass = 'border-stone-200'

  if (themeSlug === 'luxury') {
    bgClass = 'bg-[#111111] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#2a2a2a] to-[#0a0a0a]'
    textPrimary = 'text-[#dfc5a0]' 
    textSecondary = 'text-[#a38b68]'
    accentColor = 'bg-[#c5a880] hover:bg-[#b09670] text-[#111] font-semibold'
    borderClass = 'border-[#c5a880]/30'
  } else if (themeSlug === 'floral') {
    bgClass = 'bg-rose-50/90 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-rose-50 to-rose-100'
    textPrimary = 'text-rose-900'
    textSecondary = 'text-rose-600/70'
    accentColor = 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-200'
    borderClass = 'border-rose-200'
  } else if (themeSlug === 'modern') {
    bgClass = 'bg-slate-50 bg-[linear-gradient(to_right_bottom,rgba(255,255,255,1),rgba(241,245,249,1))]'
    textPrimary = 'text-slate-900'
    textSecondary = 'text-slate-500'
    accentColor = 'bg-slate-900 hover:bg-slate-800 text-white'
    borderClass = 'border-slate-200'
  } else if (themeSlug === 'elegant') {
    bgClass = 'bg-amber-50/95 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white to-amber-100/40'
    textPrimary = 'text-stone-800'
    textSecondary = 'text-amber-700'
    accentColor = 'bg-stone-800 hover:bg-stone-900 text-amber-50 font-medium border border-amber-900/20 shadow-amber-900/10'
    borderClass = 'border-amber-200'
  } else if (themeSlug === 'oceanic') {
    bgClass = 'bg-[#f0f9ff] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-sky-50 to-sky-100'
    textPrimary = 'text-sky-950'
    textSecondary = 'text-sky-600'
    accentColor = 'bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-medium shadow-lg shadow-sky-500/25'
    borderClass = 'border-sky-200/80'
  } else if (themeSlug === 'rustic') {
    bgClass = 'bg-[#FAF6F0] bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#FAF6F0] via-[#F3ECE2] to-[#E9DFD0]'
    textPrimary = 'text-[#4A3728]'
    textSecondary = 'text-[#8C6D53]'
    accentColor = 'bg-[#785338] hover:bg-[#5C3E28] text-[#FAF6F0] font-medium shadow-md shadow-[#785338]/20'
    borderClass = 'border-[#D9CBB9]'
  } else if (themeSlug === 'vintage') {
    bgClass = 'bg-[#F7F3EB] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#FAF7F0] via-[#F4EFE6] to-[#EAE2D2]'
    textPrimary = 'text-[#302217]'
    textSecondary = 'text-[#7D5E46]'
    accentColor = 'bg-[#4A2E1B] hover:bg-[#301C0E] text-[#F7F3EB] font-serif border border-[#C2AB91] shadow-md shadow-[#4A2E1B]/20'
    borderClass = 'border-[#C2AB91]'
  } else if (themeSlug === 'botanical') {
    bgClass = 'bg-[#0b170e] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#132c1b] via-[#0d1e13] to-[#070f09]'
    textPrimary = 'text-[#f0fdf4]'
    textSecondary = 'text-[#86efac]'
    accentColor = 'bg-[#15803d] hover:bg-[#166534] text-white font-medium border border-emerald-400/30 shadow-lg shadow-emerald-950/40'
    borderClass = 'border-emerald-600/30'
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center p-4 transition-all duration-1000 ease-out ${bgClass} ${
        isClosing ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      <div className={`max-w-md w-full space-y-8 text-center p-10 rounded-2xl border ${borderClass} shadow-xl backdrop-blur-sm bg-white/5`}>
        <div>
          <h1 className={`text-xs font-medium tracking-[0.3em] uppercase mb-4 ${textSecondary}`}>
            {openingTitle || 'The Wedding Of'}
          </h1>
          <h2 className={`text-4xl sm:text-5xl font-serif font-medium ${textPrimary}`}>
            {groomName} & {brideName}
          </h2>
          {eventDate && (
            <p className={`text-sm font-medium tracking-widest uppercase mt-5 ${textSecondary}`}>
              {eventDate}
            </p>
          )}
        </div>

        {/* Personalized Guest Recipient Box */}
        <div className={`mt-10 pt-8 border-t ${borderClass}`}>
          <p className={`text-xs uppercase tracking-wider mb-2 ${textSecondary}`}>Kepada Yth. Bapak/Ibu/Saudara/i:</p>
          <p className={`text-xl font-semibold ${textPrimary}`}>
            {guestName ? decodeURIComponent(guestName) : 'Tamu Undangan'}
          </p>
        </div>

        <button
          onClick={handleOpen}
          className={`mt-10 px-10 py-3.5 rounded-full transition-all duration-300 cursor-pointer text-sm tracking-[0.15em] uppercase shadow-lg hover:-translate-y-1 ${accentColor}`}
        >
          Buka Undangan
        </button>
      </div>
    </div>
  )
}
