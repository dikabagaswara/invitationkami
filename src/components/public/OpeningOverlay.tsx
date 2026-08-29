'use client'

import { useState, useEffect } from 'react'
import { Mail, Heart, Sparkles, Calendar, User } from 'lucide-react'

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

  const handleOpen = () => {
    setIsClosing(true)
    setTimeout(() => {
      setIsOpen(true)
      document.body.style.overflow = 'auto'
      onOpen()
    }, 700)
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  if (isOpen) return null

  // Theme-specific luxurious backgrounds and aesthetic styling
  const isLuxury = themeSlug === 'luxury'
  const isFloral = themeSlug === 'floral'
  const isModern = themeSlug === 'modern'
  const isMinimalist = themeSlug === 'minimalist'

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 transition-all duration-700 ease-out overflow-hidden ${
        isClosing
          ? 'opacity-0 scale-105 pointer-events-none'
          : 'opacity-100 scale-100'
      }`}
    >
      {/* Dynamic Theme Backgrounds */}
      {isLuxury && (
        <div className="absolute inset-0 bg-[#0a0a0c] bg-radial from-[#1e1b18] via-[#0d0d0f] to-[#050507]">
          {/* Subtle Golden Glow / Ornament lines */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#c5a880_1px,transparent_1px)] [background-size:24px_24px]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#c5a880]/10 rounded-full blur-3xl pointer-events-none"></div>
        </div>
      )}

      {isFloral && (
        <div className="absolute inset-0 bg-gradient-to-br from-rose-100/80 via-pink-50 to-amber-50/60">
          <div className="absolute top-0 right-0 w-80 h-80 bg-rose-200/40 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-200/40 rounded-full blur-3xl"></div>
          <div className="absolute inset-0 bg-[radial-gradient(#f43f5e_0.5px,transparent_0.5px)] opacity-10 [background-size:20px_20px]"></div>
        </div>
      )}

      {isModern && (
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 via-stone-900 to-neutral-800">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px]"></div>
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
        </div>
      )}

      {isMinimalist && (
        <div className="absolute inset-0 bg-[#faf9f6] bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-stone-200/40 rounded-full blur-3xl"></div>
        </div>
      )}

      {!isLuxury && !isFloral && !isModern && !isMinimalist && (
        /* Elegant Default */
        <div className="absolute inset-0 bg-gradient-to-b from-[#faf6ee] via-[#f7f0e3] to-[#efe5d2]">
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:24px_24px]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-200/30 rounded-full blur-3xl"></div>
        </div>
      )}

      {/* Main Luxury Glass Invitation Card */}
      <div
        className={`relative z-10 w-full max-w-lg mx-auto rounded-2xl md:rounded-3xl p-6 sm:p-10 text-center shadow-2xl backdrop-blur-xl transition-all duration-500 ${
          isLuxury
            ? 'bg-[#121215]/85 border border-[#c5a880]/35 text-stone-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)]'
            : isFloral
            ? 'bg-white/80 border border-rose-200/70 text-gray-800 shadow-rose-950/10'
            : isModern
            ? 'bg-stone-900/85 border border-stone-700/60 text-white shadow-2xl'
            : isMinimalist
            ? 'bg-white/90 border border-stone-200 text-stone-900 shadow-xl'
            : 'bg-white/85 border border-amber-200/70 text-stone-800 shadow-amber-950/10'
        }`}
      >
        {/* Decorative Corner Borders for Luxury / Elegant */}
        {(isLuxury || (!isFloral && !isModern && !isMinimalist)) && (
          <>
            <div className={`absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 ${isLuxury ? 'border-[#c5a880]/60' : 'border-amber-600/40'}`} />
            <div className={`absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 ${isLuxury ? 'border-[#c5a880]/60' : 'border-amber-600/40'}`} />
            <div className={`absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 ${isLuxury ? 'border-[#c5a880]/60' : 'border-amber-600/40'}`} />
            <div className={`absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 ${isLuxury ? 'border-[#c5a880]/60' : 'border-amber-600/40'}`} />
          </>
        )}

        {/* Cover Photo / Avatar if available */}
        {coverPhoto ? (
          <div className="relative mx-auto mb-5 w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 border-2 border-dashed border-primary/40 shadow-inner">
            <img
              src={coverPhoto}
              alt="Couple"
              className="w-full h-full object-cover rounded-full shadow-md"
            />
            <div className="absolute bottom-0 right-0 bg-primary text-primary-foreground p-1 rounded-full shadow-sm">
              <Heart className="w-3.5 h-3.5 fill-current" />
            </div>
          </div>
        ) : (
          <div className="mb-4 inline-flex items-center justify-center">
            {isLuxury ? (
              <span className="text-2xl text-[#c5a880] tracking-widest font-serif">✦ ✦ ✦</span>
            ) : isFloral ? (
              <span className="text-3xl">🌸</span>
            ) : (
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Heart className="w-5 h-5 fill-current" />
              </div>
            )}
          </div>
        )}

        {/* Opening Label */}
        <p
          className={`text-xs font-medium tracking-[0.25em] uppercase mb-2 ${
            isLuxury
              ? 'text-[#c5a880]'
              : isFloral
              ? 'text-rose-600'
              : isModern
              ? 'text-stone-400'
              : 'text-amber-800'
          }`}
        >
          {openingTitle || 'THE WEDDING OF'}
        </p>

        {/* Couple Names */}
        <h1
          className={`text-3xl sm:text-4xl md:text-5xl font-serif tracking-wide my-3 font-normal ${
            isLuxury ? 'text-white' : isFloral ? 'text-rose-800' : 'text-gray-900'
          }`}
        >
          {groomName} <span className={isLuxury ? 'text-[#c5a880] italic' : isFloral ? 'text-rose-400 italic' : 'text-amber-600 italic'}>&</span> {brideName}
        </h1>

        {/* Event Date */}
        {eventDate && (
          <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground my-2">
            <Calendar className="w-3.5 h-3.5 opacity-70" />
            <span>{eventDate}</span>
          </div>
        )}

        {/* Guest Recipient Personalized Box */}
        <div
          className={`my-6 p-4 rounded-xl border text-center transition-all ${
            isLuxury
              ? 'bg-[#18181c] border-[#c5a880]/30 shadow-inner'
              : isFloral
              ? 'bg-rose-50/80 border-rose-200/80'
              : isModern
              ? 'bg-stone-800/90 border-stone-700'
              : isMinimalist
              ? 'bg-stone-50 border-stone-200'
              : 'bg-amber-50/70 border-amber-200/70'
          }`}
        >
          <p className="text-[11px] uppercase tracking-wider text-muted-foreground flex items-center justify-center gap-1 mb-1">
            <User className="w-3 h-3 opacity-60" /> Kepada Yth. Bapak/Ibu/Saudara/i:
          </p>
          <h2
            className={`text-lg sm:text-xl font-semibold tracking-wide ${
              isLuxury
                ? 'text-[#c5a880]'
                : isFloral
                ? 'text-rose-900'
                : isModern
                ? 'text-white'
                : 'text-gray-900'
            }`}
          >
            {guestName ? decodeURIComponent(guestName) : 'Tamu Undangan'}
          </h2>
          <p className="text-[10px] text-muted-foreground mt-0.5">
            *Mohon maaf apabila ada kesalahan penulisan nama/gelar
          </p>
        </div>

        {/* Open Button with Icon and Pulse Effect */}
        <button
          onClick={handleOpen}
          className={`w-full py-3.5 px-6 rounded-xl font-medium text-sm tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] ${
            isLuxury
              ? 'bg-[#c5a880] hover:bg-[#d6ba94] text-black font-semibold shadow-[#c5a880]/20'
              : isFloral
              ? 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-600/30'
              : isModern
              ? 'bg-white hover:bg-stone-200 text-stone-900 shadow-white/10'
              : isMinimalist
              ? 'bg-stone-900 hover:bg-stone-800 text-white'
              : 'bg-amber-800 hover:bg-amber-900 text-white shadow-amber-900/20'
          }`}
        >
          <Mail className="w-4 h-4" />
          <span>Buka Undangan</span>
        </button>
      </div>
    </div>
  )
}
