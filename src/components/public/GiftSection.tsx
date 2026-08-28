'use client'

import { useState } from 'react'

interface WeddingGift {
  id: string
  type: 'BANK_TRANSFER' | 'EWALLET' | 'SHIPPING_ADDRESS'
  bankName?: string | null
  accountNumber?: string | null
  accountHolder?: string | null
  address?: string | null
  notes?: string | null
}

interface GiftSectionProps {
  gifts: WeddingGift[]
  className?: string
  isDark?: boolean
}

export function GiftSection({ gifts, className = '', isDark = false }: GiftSectionProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  if (!gifts || gifts.length === 0) return null

  return (
    <div className={`space-y-4 ${className}`}>
      {gifts.map((gift) => (
        <div 
          key={gift.id} 
          className={
            isDark
              ? "bg-[#141414] p-6 rounded-2xl border border-[#d4af37]/30 shadow-xl text-center text-stone-200"
              : "bg-white/80 backdrop-blur p-6 rounded-xl border border-gray-100 shadow-sm text-center"
          }
        >
          {gift.type === 'BANK_TRANSFER' || gift.type === 'EWALLET' ? (
            <>
              <p className={`font-semibold mb-1 ${isDark ? 'text-[#d4af37] tracking-wider uppercase text-xs' : 'text-gray-900'}`}>
                {gift.bankName}
              </p>
              <p className={`text-xl tracking-wider mb-2 font-mono ${isDark ? 'text-white font-bold' : 'text-gray-700'}`}>
                {gift.accountNumber}
              </p>
              <p className={`text-sm mb-4 ${isDark ? 'text-stone-400' : 'text-gray-500'}`}>
                a.n {gift.accountHolder}
              </p>
              <button
                onClick={() => handleCopy(gift.accountNumber || '', gift.id)}
                className={
                  isDark
                    ? "px-5 py-2 bg-[#222] border border-[#d4af37]/50 hover:bg-[#d4af37] hover:text-black text-[#d4af37] text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                    : "px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-md transition-colors cursor-pointer"
                }
              >
                {copiedId === gift.id ? 'Tersalin!' : 'Salin No. Rekening'}
              </button>
            </>
          ) : (
            <>
              <div className="mb-4">
                <svg className={`w-6 h-6 mx-auto mb-2 ${isDark ? 'text-[#d4af37]' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <p className={`font-medium mb-2 ${isDark ? 'text-[#d4af37]' : 'text-gray-900'}`}>Alamat Pengiriman</p>
                <p className={`text-sm leading-relaxed ${isDark ? 'text-stone-300' : 'text-gray-600'}`}>{gift.address}</p>
              </div>
              <button
                onClick={() => handleCopy(gift.address || '', gift.id)}
                className={
                  isDark
                    ? "px-5 py-2 bg-[#222] border border-[#d4af37]/50 hover:bg-[#d4af37] hover:text-black text-[#d4af37] text-xs font-semibold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                    : "px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm rounded-md transition-colors cursor-pointer"
                }
              >
                {copiedId === gift.id ? 'Tersalin!' : 'Salin Alamat'}
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  )
}
