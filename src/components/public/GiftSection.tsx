'use client'

import { useState } from 'react'
import { Copy, Check, CreditCard, MapPin } from 'lucide-react'

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
  cardBgClass?: string
  btnClass?: string
}

export function GiftSection({ 
  gifts, 
  className = '', 
  isDark = false,
  cardBgClass = '',
  btnClass = ''
}: GiftSectionProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2500)
  }

  if (!gifts || gifts.length === 0) return null

  return (
    <div className={`space-y-4 ${className}`}>
      {gifts.map((gift) => (
        <div 
          key={gift.id} 
          className={
            cardBgClass
              ? `p-6 rounded-2xl border backdrop-blur-md text-center transition-all ${cardBgClass}`
              : isDark
              ? "bg-[#141414] p-6 rounded-2xl border border-[#c5a880]/30 shadow-xl text-center text-stone-200"
              : "bg-white/85 backdrop-blur-md p-6 rounded-2xl border border-stone-200 shadow-sm text-center"
          }
        >
          {gift.type === 'BANK_TRANSFER' || gift.type === 'EWALLET' ? (
            <div className="space-y-3">
              <div className="inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full bg-black/5 dark:bg-white/10 text-xs font-semibold uppercase tracking-wider">
                <CreditCard className="w-3.5 h-3.5" />
                <span>{gift.bankName || 'Transfer Bank'}</span>
              </div>
              
              <div>
                <p className="text-xl sm:text-2xl tracking-widest font-mono font-bold my-1">
                  {gift.accountNumber}
                </p>
                <p className="text-xs sm:text-sm opacity-75">
                  a.n <span className="font-semibold">{gift.accountHolder}</span>
                </p>
              </div>

              {gift.notes && (
                <p className="text-xs opacity-60 italic">{gift.notes}</p>
              )}

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => handleCopy(gift.accountNumber || '', gift.id)}
                  className={
                    btnClass
                      ? `inline-flex items-center justify-center gap-2 px-5 py-2 rounded-xl text-xs font-semibold transition-all duration-300 cursor-pointer shadow-xs ${btnClass}`
                      : isDark
                      ? "inline-flex items-center justify-center gap-2 px-5 py-2 bg-[#c5a880] text-black text-xs font-semibold tracking-wider rounded-xl hover:bg-[#d6ba94] transition-colors shadow-sm cursor-pointer"
                      : "inline-flex items-center justify-center gap-2 px-5 py-2 bg-stone-900 text-white text-xs font-semibold rounded-xl hover:bg-stone-800 transition-colors shadow-xs cursor-pointer"
                  }
                >
                  {copiedId === gift.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Nomor Rekening Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Salin Nomor Rekening</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full bg-black/5 dark:bg-white/10 text-xs font-semibold uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5" />
                <span>Alamat Pengiriman Kado</span>
              </div>
              
              <p className="text-xs sm:text-sm leading-relaxed max-w-md mx-auto opacity-90 px-4">
                {gift.address}
              </p>

              {gift.notes && (
                <p className="text-xs opacity-60 italic">{gift.notes}</p>
              )}

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => handleCopy(gift.address || '', gift.id)}
                  className={
                    btnClass
                      ? `inline-flex items-center justify-center gap-2 px-5 py-2 rounded-xl text-xs font-semibold transition-all duration-300 cursor-pointer shadow-xs ${btnClass}`
                      : isDark
                      ? "inline-flex items-center justify-center gap-2 px-5 py-2 bg-[#c5a880] text-black text-xs font-semibold tracking-wider rounded-xl hover:bg-[#d6ba94] transition-colors shadow-sm cursor-pointer"
                      : "inline-flex items-center justify-center gap-2 px-5 py-2 bg-stone-900 text-white text-xs font-semibold rounded-xl hover:bg-stone-800 transition-colors shadow-xs cursor-pointer"
                  }
                >
                  {copiedId === gift.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Alamat Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Salin Alamat Lengkap</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
