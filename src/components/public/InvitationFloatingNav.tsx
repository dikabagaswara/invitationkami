'use client'

import { useState, useEffect } from 'react'
import { Home, Heart, Calendar, Image as ImageIcon, Gift, MessageSquare, CheckCircle } from 'lucide-react'

interface InvitationFloatingNavProps {
  themeSlug?: string
}

export function InvitationFloatingNav({ themeSlug = 'elegant' }: InvitationFloatingNavProps) {
  const [activeSection, setActiveSection] = useState('hero')
  const [isVisible, setIsVisible] = useState(true)

  const navButtons = [
    { id: 'hero', label: 'Cover', icon: Home },
    { id: 'couple', label: 'Mempelai', icon: Heart },
    { id: 'events', label: 'Acara', icon: Calendar },
    { id: 'gallery', label: 'Galeri', icon: ImageIcon },
    { id: 'gift', label: 'Kado', icon: Gift },
    { id: 'rsvp', label: 'RSVP', icon: CheckCircle },
    { id: 'wishes', label: 'Ucapan', icon: MessageSquare },
  ]

  const scrollToSection = (id: string) => {
    setActiveSection(id)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      // Fallback scroll to top for hero
      if (id === 'hero') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }
  }

  // Determine bottom bar theme color
  let barClass = 'bg-white/90 border-stone-200/90 text-stone-600 shadow-lg shadow-black/5'
  let activeItemClass = 'bg-stone-900 text-white'
  let inactiveItemClass = 'hover:bg-stone-100 hover:text-stone-900'

  if (themeSlug === 'luxury' || themeSlug === 'botanical' || themeSlug === 'celestial') {
    barClass = 'bg-[#151412]/90 border-[#C5A880]/30 text-stone-300 shadow-2xl shadow-black/50'
    activeItemClass = 'bg-[#C5A880] text-stone-900 font-bold'
    inactiveItemClass = 'hover:bg-white/10 hover:text-white'
  } else if (themeSlug === 'floral' || themeSlug === 'blossom') {
    barClass = 'bg-white/95 border-rose-200 text-rose-700 shadow-lg shadow-rose-950/10'
    activeItemClass = 'bg-rose-600 text-white shadow-xs'
    inactiveItemClass = 'hover:bg-rose-50 hover:text-rose-900'
  } else if (themeSlug === 'oceanic') {
    barClass = 'bg-white/95 border-[#BAE6FD] text-[#0284C7] shadow-lg shadow-sky-950/10'
    activeItemClass = 'bg-[#0077B6] text-white shadow-xs'
    inactiveItemClass = 'hover:bg-sky-50 hover:text-[#03045E]'
  } else if (themeSlug === 'terracotta') {
    barClass = 'bg-white/95 border-[#EBD7CE] text-[#C85A32] shadow-lg shadow-amber-950/10'
    activeItemClass = 'bg-[#C85A32] text-white shadow-xs'
    inactiveItemClass = 'hover:bg-orange-50 hover:text-[#822B0C]'
  }

  return (
    <div className="fixed bottom-3 left-0 right-0 z-40 px-3 flex justify-center pointer-events-none">
      <nav 
        className={`pointer-events-auto flex items-center gap-1 sm:gap-1.5 p-1.5 sm:p-2 rounded-full border backdrop-blur-md max-w-md w-full justify-around transition-transform duration-300 ${barClass}`}
        aria-label="Navigasi Bagian Undangan"
      >
        {navButtons.map((btn) => {
          const Icon = btn.icon
          const isActive = activeSection === btn.id
          return (
            <button
              key={btn.id}
              onClick={() => scrollToSection(btn.id)}
              className={`flex flex-col items-center justify-center p-1.5 sm:px-2.5 sm:py-1.5 rounded-full transition-all duration-200 text-[10px] font-medium ${
                isActive ? activeItemClass : inactiveItemClass
              }`}
              title={btn.label}
            >
              <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              <span className="text-[9px] sm:text-[10px] mt-0.5 leading-none hidden xs:inline">{btn.label}</span>
            </button>
          )
        })}
      </nav>
    </div>
  )
}
