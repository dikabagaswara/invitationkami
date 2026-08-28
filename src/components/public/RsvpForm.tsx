'use client'

import { useState } from 'react'
import { submitRsvpAction } from '@/modules/guest/actions'

interface RsvpFormProps {
  slug: string
  className?: string
}

export function RsvpForm({ slug, className = '' }: RsvpFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')
    setSuccess(false)

    const formData = new FormData(e.currentTarget)
    const name = formData.get('name') as string
    const phone = formData.get('phone') as string
    const rsvpStatus = formData.get('rsvpStatus') as 'ATTENDING' | 'NOT_ATTENDING' | 'PENDING'
    const attendance = parseInt(formData.get('attendance') as string) || 1
    const message = formData.get('message') as string

    try {
      await submitRsvpAction({ slug, name, phone, rsvpStatus, attendance, message })
      setSuccess(true)
      ;(e.target as HTMLFormElement).reset()
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Terjadi kesalahan. Silakan coba lagi.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  if (success) {
    return (
      <div className={`p-6 text-center bg-green-50 rounded-lg ${className}`}>
        <h3 className="text-xl font-medium text-green-800 mb-2">Terima Kasih!</h3>
        <p className="text-green-700">Konfirmasi kehadiran Anda telah berhasil dikirim.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      {error && <div className="p-3 bg-red-50 text-red-700 rounded-md text-sm">{error}</div>}
      
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
        <input type="text" id="name" name="name" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-transparent" />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">No. WhatsApp (Opsional)</label>
        <input type="tel" id="phone" name="phone" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-transparent" />
      </div>

      <div>
        <label htmlFor="attendance" className="block text-sm font-medium text-gray-700 mb-1">Jumlah Kehadiran</label>
        <select id="attendance" name="attendance" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-transparent">
          <option value="1">1 Orang</option>
          <option value="2">2 Orang</option>
        </select>
      </div>

      <div>
        <label htmlFor="rsvpStatus" className="block text-sm font-medium text-gray-700 mb-1">Konfirmasi Kehadiran</label>
        <select id="rsvpStatus" name="rsvpStatus" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-transparent">
          <option value="ATTENDING">Hadir</option>
          <option value="NOT_ATTENDING">Tidak Hadir</option>
          <option value="PENDING">Masih Ragu</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Pesan / Doa Restu (Opsional)</label>
        <textarea id="message" name="message" rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-transparent"></textarea>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors disabled:opacity-50"
      >
        {isSubmitting ? 'Mengirim...' : 'Kirim Konfirmasi'}
      </button>
    </form>
  )
}
