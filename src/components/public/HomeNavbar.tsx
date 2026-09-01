'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

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

        {/* Desktop Nav Items (All identical font & color) */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs sm:text-sm font-light text-stone-600">
          <a href="#koleksi" className="hover:text-stone-900 transition-colors">
            Koleksi Tema
          </a>
          <a href="#harga" className="hover:text-stone-900 transition-colors">
            Paket Harga
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

        {/* Mobile Header Right: Clean Hamburger Toggle Only */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl border border-stone-200 bg-white text-stone-700 hover:text-stone-900 focus:outline-none shadow-2xs"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu (Clean uniform list matching desktop) */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF8F5] border-b border-stone-200/80 px-4 py-5 shadow-lg animate-in slide-in-from-top-2 duration-200 space-y-3">
          <div className="flex flex-col space-y-1">
            <a
              href="#koleksi"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-xl text-sm font-light text-stone-700 hover:bg-stone-100 hover:text-stone-900 transition-colors"
            >
              Koleksi Tema
            </a>
            <a
              href="#harga"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-xl text-sm font-light text-stone-700 hover:bg-stone-100 hover:text-stone-900 transition-colors"
            >
              Paket Harga
            </a>
            <Link
              href="/share-generator"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-xl text-sm font-light text-stone-700 hover:bg-stone-100 hover:text-stone-900 transition-colors"
            >
              Bagi Undangan
            </Link>
            <a
              href="#keunggulan"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-xl text-sm font-light text-stone-700 hover:bg-stone-100 hover:text-stone-900 transition-colors"
            >
              Fitur
            </a>
            <a
              href="#tentang"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-xl text-sm font-light text-stone-700 hover:bg-stone-100 hover:text-stone-900 transition-colors"
            >
              Bantuan
            </a>
          </div>

          <div className="pt-3 border-t border-stone-200/70">
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center py-2.5 rounded-full border border-stone-300 text-stone-900 text-xs font-medium hover:bg-stone-900 hover:text-white transition-all shadow-xs"
            >
              Masuk
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
