'use client'

import { useEffect, useState } from 'react'

interface FloatingParticlesProps {
  themeSlug?: string
}

export function FloatingParticles({ themeSlug = 'elegant' }: FloatingParticlesProps) {
  const [particles, setParticles] = useState<Array<{ id: number; left: number; delay: number; duration: number; symbol: string; size: number }>>([])

  useEffect(() => {
    // Generate particle symbols based on theme
    let symbols = ['✨', '🌟', '💫']
    if (themeSlug === 'floral' || themeSlug === 'blossom') {
      symbols = ['🌸', '🌺', '🍃', '🌸', '✨']
    } else if (themeSlug === 'celestial') {
      symbols = ['✨', '⭐', '💫', '🌌', '🌟']
    } else if (themeSlug === 'luxury') {
      symbols = ['✨', '🪙', '✨', '⚜️', '⭐']
    } else if (themeSlug === 'oceanic') {
      symbols = ['🫧', '💧', '✨', '🌊', '🫧']
    } else if (themeSlug === 'arcade') {
      symbols = ['❤️', '⭐', '🪙', '👾', '✨']
    } else if (themeSlug === 'heritage') {
      symbols = ['✨', '⚜️', '🌾', '🍂', '✨']
    }

    const items = Array.from({ length: 14 }).map((_, idx) => ({
      id: idx,
      left: Math.floor(Math.random() * 95) + 2,
      delay: Math.random() * 8,
      duration: Math.floor(Math.random() * 6) + 8, // 8-14 seconds
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
      size: Math.floor(Math.random() * 10) + 12, // 12-22px
    }))

    setParticles(items)
  }, [themeSlug])

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden select-none">
      <style>{`
        @keyframes floatParticle {
          0% {
            transform: translateY(105vh) rotate(0deg) scale(0.8);
            opacity: 0;
          }
          15% {
            opacity: 0.75;
          }
          85% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(-10vh) rotate(360deg) scale(1.1);
            opacity: 0;
          }
        }
      `}</style>
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute opacity-0 pointer-events-none drop-shadow-xs"
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}px`,
            animation: `floatParticle ${p.duration}s linear infinite`,
            animationDelay: `${p.delay}s`,
          }}
        >
          {p.symbol}
        </div>
      ))}
    </div>
  )
}
