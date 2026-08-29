'use client'

import { useState, useEffect } from 'react'

interface OpeningOverlayProps {
  groomName: string
  brideName: string
  guestName?: string
  openingTitle?: string | null
  eventDate?: string
  themeSlug?: string
  coverPhoto?: string
  onOpen: () => void
}

export function OpeningOverlay({
  groomName,
  brideName,
  guestName,
  openingTitle,
  eventDate,
  onOpen,
}: OpeningOverlayProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  const handleOpen = () => {
    setIsClosing(true)
    setTimeout(() => {
      setIsOpen(true)
      document.body.style.overflow = 'auto'
      onOpen()
    }, 800)
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  if (isOpen) return null

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/95 backdrop-blur-md text-center p-4 transition-all duration-800 ease-in-out ${
        isClosing ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      <div className="max-w-md w-full space-y-6">
        <h1 className="text-sm font-semibold tracking-widest uppercase text-gray-500">
          {openingTitle || 'The Wedding Of'}
        </h1>
        <h2 className="text-4xl font-serif text-gray-800">
          {groomName} & {brideName}
        </h2>
        {eventDate && (
          <p className="text-sm font-medium tracking-wide uppercase text-gray-500 mt-2">
            {eventDate}
          </p>
        )}

        {/* Personalized Guest Recipient Box */}
        <div className="mt-8 pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-500 mb-1">Kepada Yth. Bapak/Ibu/Saudara/i:</p>
          <p className="text-xl font-medium text-gray-900">
            {guestName ? decodeURIComponent(guestName) : 'Tamu Undangan'}
          </p>
        </div>

        <button
          onClick={handleOpen}
          className="mt-8 px-8 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors cursor-pointer text-sm font-medium shadow-md"
        >
          Buka Undangan
        </button>
      </div>
    </div>
  )
}
