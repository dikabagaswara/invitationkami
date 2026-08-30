'use client'

import { Heart } from 'lucide-react'

interface HeroCouplePhotoProps {
  photoUrl?: string | null
  groomName: string
  brideName: string
  themeSlug?: string
  frameVariant?: 'circle' | 'arch' | 'double-ring' | 'polaroid'
  className?: string
}

export function HeroCouplePhoto({
  photoUrl,
  groomName,
  brideName,
  themeSlug = 'elegant',
  frameVariant = 'double-ring',
  className = '',
}: HeroCouplePhotoProps) {
  const defaultPhoto = 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1000&auto=format&fit=crop&q=80'
  const displayPhoto = photoUrl || defaultPhoto

  // Themed frame gradients & borders
  let frameGradients = 'from-amber-200 via-rose-100 to-amber-300 ring-amber-200/50'
  let heartBadgeColor = 'bg-rose-600 text-white'

  if (themeSlug === 'luxury') {
    frameGradients = 'from-[#C5A880] via-[#F3ECE2] to-[#8C6D45] ring-[#C5A880]/40 shadow-[#C5A880]/20'
    heartBadgeColor = 'bg-[#C5A880] text-stone-900'
  } else if (themeSlug === 'floral' || themeSlug === 'blossom') {
    frameGradients = 'from-rose-300 via-pink-100 to-rose-400 ring-rose-200/60 shadow-rose-200/30'
    heartBadgeColor = 'bg-rose-500 text-white'
  } else if (themeSlug === 'oceanic') {
    frameGradients = 'from-[#38BDF8] via-[#E0F2FE] to-[#0284C7] ring-sky-200/60 shadow-sky-200/30'
    heartBadgeColor = 'bg-[#0077B6] text-white'
  } else if (themeSlug === 'terracotta') {
    frameGradients = 'from-[#FDBA74] via-[#FFF7ED] to-[#EA580C] ring-orange-200/60 shadow-orange-200/30'
    heartBadgeColor = 'bg-[#C85A32] text-white'
  } else if (themeSlug === 'botanical') {
    frameGradients = 'from-emerald-400 via-emerald-100 to-green-600 ring-emerald-400/40 shadow-emerald-950/40'
    heartBadgeColor = 'bg-emerald-600 text-white'
  } else if (themeSlug === 'celestial') {
    frameGradients = 'from-purple-400 via-pink-200 to-indigo-500 ring-purple-400/40 shadow-purple-950/40'
    heartBadgeColor = 'bg-purple-600 text-white'
  } else if (themeSlug === 'rustic' || themeSlug === 'vintage') {
    frameGradients = 'from-[#C2AB91] via-[#FFFDF9] to-[#8C6D53] ring-[#D9CBB9]/60 shadow-[#5C3E28]/20'
    heartBadgeColor = 'bg-[#785338] text-[#FAF6F0]'
  } else if (themeSlug === 'arcade') {
    frameGradients = 'from-[#06b6d4] via-[#ec4899] to-[#8b5cf6] ring-4 ring-[#06b6d4] shadow-cyan-500/50'
    heartBadgeColor = 'bg-[#f43f5e] text-white font-mono'
  }

  // 1. Arch Variant (Great for Terracotta, Vintage)
  if (frameVariant === 'arch') {
    return (
      <div className={`relative mx-auto w-40 h-56 sm:w-48 sm:h-64 rounded-t-full p-2 bg-gradient-to-tr ${frameGradients} shadow-2xl ring-4 transition-transform duration-700 hover:scale-105 ${className}`}>
        <div className="w-full h-full rounded-t-full overflow-hidden bg-stone-100">
          <img
            src={displayPhoto}
            alt={`${groomName} & ${brideName}`}
            className="w-full h-full object-cover"
          />
        </div>
        <div className={`absolute -bottom-2 right-2 p-2 rounded-full shadow-lg ${heartBadgeColor}`}>
          <Heart className="w-3.5 h-3.5 fill-current animate-pulse" />
        </div>
      </div>
    )
  }

  // 2. Double Ring Glowing Circle Variant (Default across themes)
  return (
    <div className={`relative mx-auto w-36 h-36 sm:w-48 sm:h-48 rounded-full p-2 bg-gradient-to-tr ${frameGradients} shadow-2xl ring-4 transition-transform duration-700 hover:scale-105 ${className}`}>
      <div className="w-full h-full rounded-full overflow-hidden bg-white">
        <img
          src={displayPhoto}
          alt={`${groomName} & ${brideName}`}
          className="w-full h-full object-cover"
        />
      </div>
      <div className={`absolute -bottom-1 right-2 p-2 rounded-full shadow-lg ${heartBadgeColor}`}>
        <Heart className="w-3.5 h-3.5 fill-current animate-pulse" />
      </div>
    </div>
  )
}
