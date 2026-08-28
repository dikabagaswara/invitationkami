'use client'

interface LocationSectionProps {
  mapUrl?: string | null
  address?: string | null
  venue?: string
  className?: string
}

export function LocationSection({ mapUrl, address, venue, className = '' }: LocationSectionProps) {
  return (
    <div className={`space-y-4 text-center ${className}`}>
      <div className="p-4 bg-white/50 backdrop-blur rounded-xl">
        <p className="font-medium text-gray-900">{venue}</p>
        {address && <p className="text-sm text-gray-600 mt-1">{address}</p>}
      </div>
      
      {mapUrl && (
        <a
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-6 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors gap-2 text-sm"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Buka di Google Maps
        </a>
      )}
    </div>
  )
}
