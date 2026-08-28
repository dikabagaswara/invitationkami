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
}

export function GuestbookSection({ slug, initialMessages, className = '' }: GuestbookSectionProps) {
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

  return (
    <div className={className}>
      <div className="bg-white/80 backdrop-blur rounded-xl p-6 shadow-sm mb-8 border border-gray-100">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Kirim Ucapan & Doa</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <input
            type="text"
            name="name"
            placeholder="Nama Anda"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900"
          />
          <textarea
            name="message"
            placeholder="Tulis ucapan atau doa restu..."
            required
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 disabled:opacity-50 text-sm"
          >
            {isSubmitting ? 'Mengirim...' : 'Kirim Ucapan'}
          </button>
        </form>
      </div>

      <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
        {messages.map((msg) => (
          <div key={msg.id} className="bg-white/60 backdrop-blur p-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-medium text-sm">
                {msg.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-medium text-gray-900 text-sm">{msg.name}</p>
                <p className="text-xs text-gray-500">
                  {new Date(msg.createdAt).toLocaleDateString('id-ID', {
                    day: 'numeric', month: 'long', year: 'numeric'
                  })}
                </p>
              </div>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed">{msg.message}</p>
          </div>
        ))}
        {messages.length === 0 && (
          <p className="text-center text-gray-500 text-sm py-8">Belum ada ucapan. Jadilah yang pertama!</p>
        )}
      </div>
    </div>
  )
}
