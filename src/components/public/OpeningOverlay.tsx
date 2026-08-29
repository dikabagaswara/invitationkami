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
