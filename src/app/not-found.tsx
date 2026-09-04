import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF8F5] p-6">
      <div className="text-center space-y-4 max-w-md">
        <div className="text-6xl">🔍</div>
        <h2 className="text-3xl font-serif text-stone-900">Halaman Tidak Ditemukan</h2>
        <p className="text-sm text-stone-500">Sepertinya link undangan yang Anda cari tidak ada atau sudah tidak aktif.</p>
        <Link href="/" className="inline-block px-6 py-2.5 rounded-full bg-stone-900 text-white text-sm hover:bg-stone-800 transition-colors">Kembali ke Beranda</Link>
      </div>
    </div>
  )
}
