'use client'

import { useState, useEffect } from 'react'

interface OpeningOverlayProps {
  groomName: string
  brideName: string
  guestName?: string
  openingTitle?: string | null
  onOpen: () => void
}

export function OpeningOverlay({ groomName, brideName, guestName, openingTitle, onOpen }: OpeningOverlayProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => {
    setIsOpen(true)
    document.body.style.overflow = 'auto'
    onOpen()
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  if (isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/90 backdrop-blur-md text-center p-4 transition-opacity duration-1000">
      <div className="max-w-md w-full space-y-6">
        <h1 className="text-sm font-semibold tracking-widest uppercase text-gray-500">
          {openingTitle || 'The Wedding Of'}
        </h1>
        <h2 className="text-4xl font-serif text-gray-800">
          {groomName} & {brideName}
        </h2>
        {guestName && (
          <div className="mt-8">
            <p className="text-sm text-gray-500 mb-2">Kepada Yth. Bapak/Ibu/Saudara/i</p>
            <p className="text-xl font-medium text-gray-800">{decodeURIComponent(guestName)}</p>
          </div>
        )}
        <button
          onClick={handleOpen}
          className="mt-8 px-8 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors"
        >
          Buka Undangan
        </button>
      </div>
    </div>
  )
}
