'use client'

import { useState } from 'react'
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'

export interface LightboxPhoto {
  imageUrl: string
  caption?: string | null
}

export function GalleryLightbox({
  photos,
  className = '',
}: {
  photos: LightboxPhoto[]
  className?: string
}) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const openLightbox = (index: number) => {
    setSelectedIndex(index)
  }

  const closeLightbox = () => {
    setSelectedIndex(null)
  }

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % photos.length)
    }
  }

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + photos.length) % photos.length)
    }
  }

  if (!photos || photos.length === 0) return null

  return (
    <>
      {/* Gallery Grid Images */}
      <div className={`grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5 ${className}`}>
        {photos.map((photo, idx) => (
          <div
            key={idx}
            onClick={() => openLightbox(idx)}
            className="group relative aspect-[3/4] sm:aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer bg-stone-100 border border-black/5 shadow-2xs hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1"
          >
            <img
              src={photo.imageUrl}
              alt={photo.caption || `Galeri Foto ${idx + 1}`}
              className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
              loading="lazy"
            />
            {/* Hover overlay hint */}
            <div className="absolute inset-0 bg-stone-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-3 text-white">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-1.5 transform scale-75 group-hover:scale-100 transition-transform">
                <ZoomIn className="w-5 h-5 text-white" />
              </div>
              {photo.caption && (
                <p className="text-xs text-center font-medium line-clamp-2 px-2">
                  {photo.caption}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {selectedIndex !== null && (
        <div
          onClick={closeLightbox}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 select-none animate-in fade-in duration-300"
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute top-5 right-5 z-50 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Prev Button */}
          {photos.length > 1 && (
            <button
              type="button"
              onClick={prevPhoto}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20 shadow-lg"
            >
              <ChevronLeft className="w-7 h-7" />
            </button>
          )}

          {/* Active Image Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl max-h-[85vh] flex flex-col items-center justify-center relative"
          >
            <img
              src={photos[selectedIndex].imageUrl}
              alt={photos[selectedIndex].caption || 'Foto Fullscreen'}
              className="max-h-[75vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl animate-in zoom-in-95 duration-200"
            />
            {photos[selectedIndex].caption && (
              <p className="text-white/90 text-sm font-medium mt-3 text-center px-4 max-w-lg">
                {photos[selectedIndex].caption}
              </p>
            )}
            <span className="text-white/50 text-xs mt-1">
              {selectedIndex + 1} dari {photos.length} Foto
            </span>
          </div>

          {/* Next Button */}
          {photos.length > 1 && (
            <button
              type="button"
              onClick={nextPhoto}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20 shadow-lg"
            >
              <ChevronRight className="w-7 h-7" />
            </button>
          )}
        </div>
      )}
    </>
  )
}
