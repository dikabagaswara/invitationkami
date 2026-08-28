'use client'

import { useState } from 'react'
import { submitRsvpAction } from '@/modules/guest/actions'

interface RsvpFormProps {
  slug: string
  className?: string
  isDark?: boolean
}

export function RsvpForm({ slug, className = '', isDark = false }: RsvpFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')
    setSuccess(false)

    const formData = new FormData(e.currentTarget)
    const name = (formData.get('name') as string || '').trim()
    const rsvpStatus = formData.get('rsvpStatus') as 'ATTENDING' | 'NOT_ATTENDING' | 'PENDING'
    const attendance = parseInt(formData.get('attendance') as string, 10) || 1

    if (!name || name.length < 2) {
      setError('Mohon masukkan nama lengkap Anda minimal 2 karakter.')
      setIsSubmitting(false)
      return
    }

    try {
      const res = await submitRsvpAction({ slug, name, rsvpStatus, attendance })
      if (res?.success) {
        setSuccess(true)
        ;(e.target as HTMLFormElement).reset()
      } else {
        setError('Gagal mengirim konfirmasi. Silakan coba kembali.')
      }
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

  const inputClasses = isDark
    ? "w-full px-4 py-2.5 bg-[#171719] border border-[#c5a880]/30 rounded-lg text-stone-100 placeholder:text-stone-500 focus:ring-1 focus:ring-[#c5a880] focus:border-[#c5a880] text-sm"
    : "w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-transparent text-sm"

  const labelClasses = isDark
    ? "block text-xs tracking-wider font-medium text-[#c5a880] mb-1.5"
    : "block text-sm font-medium text-gray-700 mb-1"

  if (success) {
    return (
      <div className={`p-6 text-center rounded-lg ${isDark ? 'bg-[#142316] border border-emerald-500/30 text-emerald-300' : 'bg-green-50 text-green-800'} ${className}`}>
        <h3 className="text-lg font-medium mb-1">Terima Kasih!</h3>
        <p className="text-xs opacity-90">Konfirmasi kehadiran Anda telah berhasil dikirim.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      {error && (
        <div className={`p-3 rounded-md text-sm ${isDark ? 'bg-red-950/60 border border-red-800 text-red-300' : 'bg-red-50 text-red-700'}`}>
          {error}
        </div>
      )}
      
      <div>
        <label htmlFor="name" className={labelClasses}>Nama Lengkap</label>
        <input type="text" id="name" name="name" required className={inputClasses} placeholder="Nama Anda" />
      </div>

      <div>
        <label htmlFor="attendance" className={labelClasses}>Jumlah Kehadiran</label>
        <select id="attendance" name="attendance" className={inputClasses}>
          <option value="1" className={isDark ? "bg-[#171719] text-white" : ""}>1 Orang</option>
          <option value="2" className={isDark ? "bg-[#171719] text-white" : ""}>2 Orang</option>
        </select>
      </div>

      <div>
        <label htmlFor="rsvpStatus" className={labelClasses}>Konfirmasi Kehadiran</label>
        <select id="rsvpStatus" name="rsvpStatus" required className={inputClasses}>
          <option value="ATTENDING" className={isDark ? "bg-[#171719] text-white" : ""}>Hadir</option>
          <option value="NOT_ATTENDING" className={isDark ? "bg-[#171719] text-white" : ""}>Tidak Hadir</option>
          <option value="PENDING" className={isDark ? "bg-[#171719] text-white" : ""}>Masih Ragu</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={
          isDark
            ? "w-full py-3 bg-[#c5a880] text-black font-medium tracking-wider text-xs rounded-lg hover:bg-[#d6ba94] transition-colors disabled:opacity-50 shadow-sm cursor-pointer"
            : "w-full py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors disabled:opacity-50 text-sm cursor-pointer"
        }
      >
        {isSubmitting ? 'Mengirim...' : 'Kirim Konfirmasi'}
      </button>
    </form>
  )
}
