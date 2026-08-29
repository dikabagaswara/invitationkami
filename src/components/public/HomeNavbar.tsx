'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ArrowRight, Sparkles } from 'lucide-react'

export function HomeNavbar({ appName }: { appName: string }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#FAF8F5]/95 backdrop-blur-md shadow-xs border-b border-stone-200/70'
          : 'bg-[#FAF8F5]/80 backdrop-blur-sm border-b border-stone-200/40'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-18 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white shadow-xs border border-stone-200/80 flex items-center justify-center p-1.5 group-hover:scale-105 transition-transform overflow-hidden">
            <img
              src="/images/logo.png"
              alt={appName}
              className="w-full h-full object-contain"
              loading="eager"
            />
          </div>
          <span className="font-serif tracking-wider text-base sm:text-lg text-stone-900 uppercase font-semibold leading-tight">
            {appName}
          </span>
        </Link>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs sm:text-sm font-light text-stone-600">
          <a href="#koleksi" className="hover:text-stone-900 transition-colors">
            Koleksi Tema
          </a>
          <Link href="/share-generator" className="hover:text-stone-900 transition-colors">
            Bagi Undangan
          </Link>
          <a href="#keunggulan" className="hover:text-stone-900 transition-colors">
            Fitur
          </a>
          <a href="#tentang" className="hover:text-stone-900 transition-colors">
            Bantuan
          </a>
          <Link
            href="/login"
            className="px-4 py-1.5 rounded-full border border-stone-300 text-stone-900 hover:bg-stone-900 hover:text-white transition-all shadow-xs"
          >
            Masuk
          </Link>
        </nav>

        {/* Mobile Actions: "Bagi Undangan" Quick Link + Mobile Hamburger Menu Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <Link
            href="/share-generator"
            className="px-3 py-1 rounded-full text-xs font-medium bg-stone-900 text-white hover:bg-stone-800 transition-all shadow-2xs"
          >
            Bagi Undangan
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl border border-stone-200 bg-white text-stone-700 hover:text-stone-900 focus:outline-none shadow-2xs"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu (Smooth slide & neat items) */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF8F5] border-b border-stone-200/80 px-4 py-5 shadow-lg animate-in slide-in-from-top-2 duration-200 space-y-3">
          <div className="flex flex-col space-y-1">
            <a
              href="#koleksi"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-xl text-sm font-medium text-stone-800 hover:bg-stone-100 transition-colors"
            >
              Koleksi Tema
            </a>
            <Link
              href="/share-generator"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-xl text-sm font-medium text-stone-800 hover:bg-stone-100 transition-colors"
            >
              Bagi Undangan (Generator Link)
            </Link>
            <a
              href="#keunggulan"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-xl text-sm font-medium text-stone-800 hover:bg-stone-100 transition-colors"
            >
              Fitur &amp; Keunggulan
            </a>
            <a
              href="#tentang"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-xl text-sm font-medium text-stone-800 hover:bg-stone-100 transition-colors"
            >
              Bantuan &amp; Konsultasi
            </a>
          </div>

          <div className="pt-3 border-t border-stone-200 flex items-center gap-3">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 text-center py-2.5 rounded-xl border border-stone-300 text-stone-900 text-xs font-semibold hover:bg-stone-100 transition-all"
            >
              Masuk Akun
            </Link>
            <Link
              href="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 text-center py-2.5 rounded-xl bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-all shadow-xs"
            >
              Daftar Baru
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
