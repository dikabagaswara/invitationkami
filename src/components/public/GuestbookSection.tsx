'use client'

import { useState } from 'react'
import { submitGuestMessageAction } from '@/modules/guest/actions'
import { MessageSquare, Send } from 'lucide-react'

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
  customInputClass?: string
  customBtnClass?: string
}

export function GuestbookSection({ 
  slug, 
  initialMessages, 
  className = '', 
  isDark = false,
  customInputClass = '',
  customBtnClass = ''
}: GuestbookSectionProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    const form = e.currentTarget
    const formData = new FormData(form)
    const name = (formData.get('name') as string || '').trim()
    const messageText = (formData.get('message') as string || '').trim()

    if (!name || !messageText) {
      setError('Mohon isi nama dan pesan doa Anda.')
      setIsSubmitting(false)
      return
    }

    try {
      await submitGuestMessageAction(slug, name, messageText)
      // Optimistic update
      setMessages([{
        id: Math.random().toString(),
        name,
        message: messageText,
        createdAt: new Date()
      }, ...messages])
      form.reset()
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

  const defaultInputClass = isDark
    ? "w-full px-4 py-2.5 bg-[#171719] border border-[#c5a880]/30 rounded-lg text-stone-100 placeholder:text-stone-500 focus:ring-1 focus:ring-[#c5a880] focus:border-[#c5a880] text-sm"
    : "w-full px-4 py-2.5 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-800 text-stone-900 text-sm bg-white"

  const inputClasses = customInputClass 
    ? `w-full px-4 py-2.5 rounded-lg text-sm transition-colors ${customInputClass}`
    : defaultInputClass

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Form Input Box */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 opacity-70" />
          <h3 className="text-sm font-semibold tracking-wider uppercase">
            Tulis Ucapan &amp; Doa
          </h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          {error && (
            <div className={`p-3 rounded-lg text-xs ${isDark ? 'bg-red-950/60 border border-red-800 text-red-300' : 'bg-red-50 border border-red-200 text-red-700'}`}>
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
            placeholder="Tuliskan ucapan atau doa restu terbaik Anda..."
            required
            rows={3}
            className={inputClasses}
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className={
              customBtnClass
                ? `inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 disabled:opacity-50 cursor-pointer ${customBtnClass}`
                : isDark
                ? "inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#c5a880] text-black font-medium tracking-wider text-xs rounded-xl hover:bg-[#d6ba94] transition-colors disabled:opacity-50 shadow-sm cursor-pointer"
                : "inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-stone-900 text-white rounded-xl hover:bg-stone-800 disabled:opacity-50 text-xs sm:text-sm font-medium cursor-pointer shadow-xs"
            }
          >
            <Send className="w-3.5 h-3.5" />
            <span>{isSubmitting ? 'Mengirim...' : 'Kirim Ucapan'}</span>
          </button>
        </form>
      </div>

      {/* Messages Feed List */}
      <div className="space-y-3 max-h-[450px] overflow-y-auto pr-1 pt-2 border-t border-black/5 dark:border-white/5 custom-scrollbar">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-4 rounded-xl border transition-all ${
              isDark
                ? "bg-black/25 border-white/10 text-stone-200"
                : "bg-white/70 border-black/5 text-stone-800 shadow-2xs"
            }`}
          >
            <div className="flex items-center gap-2.5 mb-1.5">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                isDark ? "bg-white/15 text-stone-200" : "bg-stone-200 text-stone-700"
              }`}>
                {msg.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-xs leading-tight">
                  {msg.name}
                </p>
                <p className="text-[10px] opacity-60">
                  {new Date(msg.createdAt).toLocaleDateString('id-ID', {
                    day: 'numeric', month: 'long', year: 'numeric'
                  })}
                </p>
              </div>
            </div>
            <p className="text-xs leading-relaxed opacity-90 pl-9">
              {msg.message}
            </p>
          </div>
        ))}
        {messages.length === 0 && (
          <p className="text-center text-xs py-6 opacity-60">
            Belum ada ucapan. Jadilah yang pertama memberikan doa restu!
          </p>
        )}
      </div>
    </div>
  )
}
