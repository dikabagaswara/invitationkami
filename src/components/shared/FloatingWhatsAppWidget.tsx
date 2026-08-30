'use client'

import { useState } from 'react'
import { MessageCircle, X } from 'lucide-react'

export function FloatingWhatsAppWidget({
  phoneNumber = '6281234567890',
  defaultMessage = 'Halo Admin InvitationKami, saya butuh bantuan untuk pembuatan undangan pernikahan.',
}: {
  phoneNumber?: string
  defaultMessage?: string
}) {
  const [isOpen, setIsOpen] = useState(false)
  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(defaultMessage)}`

  return (
    <div className="fixed bottom-6 right-5 sm:right-6 z-50 flex flex-col items-end pointer-events-auto">
      {/* Pop-up Chat Hint Balloon */}
      {isOpen && (
        <div className="mb-3 w-72 sm:w-80 rounded-2xl bg-white p-4 shadow-2xl border border-stone-200/90 animate-in fade-in slide-in-from-bottom-3 duration-300">
          <div className="flex items-start justify-between pb-2 border-b border-stone-100">
            <div className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-xs">
                <MessageCircle className="w-4 h-4" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-white rounded-full"></span>
              </div>
              <div>
                <h4 className="text-xs font-bold text-stone-900 leading-tight">Customer Support</h4>
                <p className="text-[10px] text-emerald-600 font-medium">Online • Siap Membantu</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-stone-400 hover:text-stone-600 p-1 rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="py-3 text-xs text-stone-600 leading-relaxed font-light">
            Halo! 👋 Ada yang bisa kami bantu seputar pemilihan tema, paket, atau cara mengisi undangan?
          </div>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-md shadow-emerald-600/20 transition-all hover:scale-[1.02]"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat via WhatsApp Sekarang</span>
          </a>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        title="Bantuan WhatsApp"
        className="group relative flex items-center gap-2.5 px-4 py-3 sm:px-4 sm:py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl shadow-emerald-950/20 hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer"
      >
        <MessageCircle className="w-5 h-5 animate-pulse" />
        <span className="text-xs font-semibold tracking-wide hidden sm:inline">
          Butuh Bantuan?
        </span>
        
        {/* Unread badge dot */}
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white"></span>
        </span>
      </button>
    </div>
  )
}
