'use client'

import { useState } from 'react'
import { submitGuestMessageAction } from '@/modules/guest/actions'

interface Message {
  id: string
  name: string
  message: string
  createdAt: Date
}

interface GuestbookSectionProps {
  slug: string
  initialMessages: Message[]
  className?: string
  isDark?: boolean
}

export function GuestbookSection({ slug, initialMessages, className = '', isDark = false }: GuestbookSectionProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    const name = formData.get('name') as string
    const messageText = formData.get('message') as string

    try {
      await submitGuestMessageAction(slug, name, messageText)
      // Optimistic update
      setMessages([{
        id: Math.random().toString(),
        name,
        message: messageText,
        createdAt: new Date()
      }, ...messages])
      ;(e.target as HTMLFormElement).reset()
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Terjadi kesalahan.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const inputClasses = isDark
    ? "w-full px-4 py-2.5 bg-[#171719] border border-[#c5a880]/30 rounded-lg text-stone-100 placeholder:text-stone-500 focus:ring-1 focus:ring-[#c5a880] focus:border-[#c5a880] text-sm"
    : "w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 text-sm"

  return (
    <div className={className}>
      <div className={
        isDark
          ? "bg-[#141414] rounded-2xl p-6 md:p-8 shadow-xl mb-8 border border-[#c5a880]/20 text-stone-200"
          : "bg-white/80 backdrop-blur rounded-xl p-6 shadow-sm mb-8 border border-gray-100"
      }>
        <h3 className={`text-base font-medium mb-4 ${isDark ? 'text-[#c5a880] tracking-wider text-xs font-semibold' : 'text-gray-900'}`}>
          Kirim Ucapan & Doa
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className={`p-3 rounded-md text-sm ${isDark ? 'bg-red-950/60 border border-red-800 text-red-300' : 'text-red-500 text-sm'}`}>
              {error}
            </div>
          )}
          <input
            type="text"
            name="name"
            placeholder="Nama Anda"
            required
            className={inputClasses}
          />
          <textarea
            name="message"
            placeholder="Tulis ucapan atau doa restu..."
            required
            rows={3}
            className={inputClasses}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className={
              isDark
                ? "px-6 py-2.5 bg-[#c5a880] text-black font-medium tracking-wider text-xs rounded-lg hover:bg-[#d6ba94] transition-colors disabled:opacity-50 shadow-sm cursor-pointer"
                : "px-6 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 disabled:opacity-50 text-sm cursor-pointer"
            }
          >
            {isSubmitting ? 'Mengirim...' : 'Kirim Ucapan'}
          </button>
        </form>
      </div>

      <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={
              isDark
                ? "bg-[#141414] p-5 rounded-xl border border-[#d4af37]/20 shadow-md"
                : "bg-white/60 backdrop-blur p-4 rounded-lg shadow-sm"
            }
          >
            <div className="flex items-center gap-3 mb-2">
              <div className={
                isDark
                  ? "w-8 h-8 bg-[#252525] border border-[#d4af37]/40 rounded-full flex items-center justify-center text-[#d4af37] font-semibold text-xs"
                  : "w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-medium text-sm"
              }>
                {msg.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className={`font-medium text-sm ${isDark ? 'text-stone-100' : 'text-gray-900'}`}>
                  {msg.name}
                </p>
                <p className={`text-[11px] ${isDark ? 'text-stone-400' : 'text-gray-500'}`}>
                  {new Date(msg.createdAt).toLocaleDateString('id-ID', {
                    day: 'numeric', month: 'long', year: 'numeric'
                  })}
                </p>
              </div>
            </div>
            <p className={`text-sm leading-relaxed ${isDark ? 'text-stone-300' : 'text-gray-700'}`}>
              {msg.message}
            </p>
          </div>
        ))}
        {messages.length === 0 && (
          <p className={`text-center text-sm py-8 ${isDark ? 'text-stone-500' : 'text-gray-500'}`}>
            Belum ada ucapan. Jadilah yang pertama!
          </p>
        )}
      </div>
    </div>
  )
}
