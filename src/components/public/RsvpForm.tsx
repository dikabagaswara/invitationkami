'use client'

import { useState } from 'react'
import { submitRsvpAction } from '@/modules/guest/actions'

interface RsvpFormProps {
  slug: string
  className?: string
  isDark?: boolean
  customInputClass?: string
  customBtnClass?: string
}

export function RsvpForm({ 
  slug, 
  className = '', 
  isDark = false,
  customInputClass = '',
  customBtnClass = ''
}: RsvpFormProps) {
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

  const defaultInputClass = isDark
    ? "w-full px-4 py-2.5 bg-[#171719] border border-[#c5a880]/30 rounded-lg text-stone-100 placeholder:text-stone-500 focus:ring-1 focus:ring-[#c5a880] focus:border-[#c5a880] text-sm"
    : "w-full px-4 py-2.5 border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-800 text-stone-900 text-sm bg-white"

  const inputClasses = customInputClass 
    ? `w-full px-4 py-2.5 rounded-lg text-sm transition-colors ${customInputClass}`
    : defaultInputClass

  const labelClasses = isDark
    ? "block text-xs tracking-wider font-medium text-stone-300 mb-1.5"
    : "block text-xs tracking-wider font-semibold text-stone-700 mb-1.5 uppercase"

  if (success) {
    return (
      <div className={`p-6 text-center rounded-xl ${isDark ? 'bg-emerald-950/70 border border-emerald-500/30 text-emerald-300' : 'bg-emerald-50 border border-emerald-200 text-emerald-800'} ${className}`}>
        <h3 className="text-base font-semibold mb-1">Terima Kasih! 🎉</h3>
        <p className="text-xs opacity-90">Konfirmasi kehadiran Anda telah berhasil tersimpan dalam daftar tamu.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      {error && (
        <div className={`p-3 rounded-lg text-xs ${isDark ? 'bg-red-950/60 border border-red-800 text-red-300' : 'bg-red-50 border border-red-200 text-red-700'}`}>
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
          <option value="1">1 Orang</option>
          <option value="2">2 Orang</option>
          <option value="3">3 Orang</option>
          <option value="4">4 Orang</option>
          <option value="5">5+ Orang (Rombongan)</option>
        </select>
      </div>

      <div>
        <label htmlFor="rsvpStatus" className={labelClasses}>Konfirmasi Kehadiran</label>
        <select id="rsvpStatus" name="rsvpStatus" required className={inputClasses}>
          <option value="ATTENDING">🟢 Hadir</option>
          <option value="NOT_ATTENDING">🔴 Tidak Hadir</option>
          <option value="PENDING">🟡 Masih Ragu</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className={
          customBtnClass
            ? `w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 disabled:opacity-50 cursor-pointer ${customBtnClass}`
            : isDark
            ? "w-full py-3 bg-[#c5a880] text-black font-medium tracking-wider text-xs rounded-xl hover:bg-[#d6ba94] transition-colors disabled:opacity-50 shadow-sm cursor-pointer"
            : "w-full py-3 bg-stone-900 text-white rounded-xl hover:bg-stone-800 transition-colors disabled:opacity-50 text-sm font-medium cursor-pointer shadow-xs"
        }
      >
        {isSubmitting ? 'Mengirim...' : 'Kirim Konfirmasi Kehadiran'}
      </button>
    </form>
  )
}
