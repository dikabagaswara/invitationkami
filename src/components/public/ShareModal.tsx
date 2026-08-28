'use client'

import { useState, useEffect } from 'react'
import { QRCodeSVG } from 'qrcode.react'

interface ShareModalProps {
  slug: string
  guestName?: string
  groomName: string
  brideName: string
}

export function ShareModal({ slug, guestName, groomName, brideName }: ShareModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const getUrl = () => {
    if (typeof window === 'undefined') return ''
    const baseUrl = window.location.origin
    const query = guestName ? `?to=${encodeURIComponent(guestName)}` : ''
    return `${baseUrl}/i/${slug}${query}`
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Wedding Invitation - ${groomName} & ${brideName}`,
          text: `Kami mengundang Anda ke pernikahan kami.`,
          url: getUrl(),
        })
      } catch (err) {
        console.log('Error sharing', err)
      }
    } else {
      setIsOpen(true)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(getUrl())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const waTemplate = `Halo${guestName ? ` ${decodeURIComponent(guestName)}` : ''}, kami mengundang Anda ke pernikahan kami (${groomName} & ${brideName}).\n\nCek link berikut:\n${getUrl()}`

  const handleWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(waTemplate)}`, '_blank')
  }

  return (
    <>
      <button
        onClick={handleShare}
        className="px-6 py-2 bg-gray-100 text-gray-800 rounded-full hover:bg-gray-200 transition-colors text-sm font-medium flex items-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
        Bagikan Undangan
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-xl max-w-sm w-full p-6 space-y-4">
            <h3 className="text-lg font-medium text-gray-900 text-center">Bagikan Undangan</h3>
            
            <div className="flex justify-center py-4">
              {typeof window !== 'undefined' && <QRCodeSVG value={getUrl()} size={150} level="M" />}
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={handleWhatsApp}
                className="w-full py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors text-sm flex justify-center items-center gap-2"
              >
                Kirim via WhatsApp
              </button>
              
              <button
                onClick={handleCopy}
                className="w-full py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors text-sm"
              >
                {copied ? 'Tersalin!' : 'Salin Link'}
              </button>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="w-full py-2 text-gray-500 text-sm hover:text-gray-700"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </>
  )
}
