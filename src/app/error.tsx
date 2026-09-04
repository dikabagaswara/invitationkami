'use client'

import { useEffect } from 'react'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error) }, [error])
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF8F5] p-6">
      <div className="text-center space-y-4 max-w-md">
        <div className="text-5xl">💐</div>
        <h2 className="text-2xl font-serif text-stone-900">Terjadi Kesalahan</h2>
        <p className="text-sm text-stone-500">Maaf, terjadi gangguan saat memuat halaman ini.</p>
        <button onClick={reset} className="px-6 py-2.5 rounded-full bg-stone-900 text-white text-sm hover:bg-stone-800 transition-colors">Coba Lagi</button>
      </div>
    </div>
  )
}
