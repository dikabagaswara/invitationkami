'use client'

import { CalendarPlus, Check } from 'lucide-react'
import { useState } from 'react'

interface AddToCalendarButtonProps {
  title: string
  description?: string
  location?: string
  startDate: Date | string
  startTime?: string | null
  endTime?: string | null
  themeSlug?: string
  className?: string
}

export function AddToCalendarButton({
  title,
  description = 'The Wedding Celebration',
  location = '',
  startDate,
  startTime,
  endTime,
  themeSlug = 'elegant',
  className = '',
}: AddToCalendarButtonProps) {
  const [clicked, setClicked] = useState(false)

  const handleAddToCalendar = () => {
    setClicked(true)
    setTimeout(() => setClicked(false), 3000)

    const dateObj = new Date(startDate)
    
    // Parse hours & minutes or default to 08:00
    let startHour = 8
    let startMinute = 0
    if (startTime) {
      const match = startTime.match(/(\d{1,2})[:.](\d{2})/)
      if (match) {
        startHour = parseInt(match[1], 10)
        startMinute = parseInt(match[2], 10)
      }
    }

    let endHour = startHour + 3
    let endMinute = startMinute
    if (endTime) {
      const match = endTime.match(/(\d{1,2})[:.](\d{2})/)
      if (match) {
        endHour = parseInt(match[1], 10)
        endMinute = parseInt(match[2], 10)
      }
    }

    // Format dates to YYYYMMDDTHHmmssZ
    const year = dateObj.getFullYear()
    const month = String(dateObj.getMonth() + 1).padStart(2, '0')
    const day = String(dateObj.getDate()).padStart(2, '0')

    const startHStr = String(startHour).padStart(2, '0')
    const startMStr = String(startMinute).padStart(2, '0')
    const endHStr = String(endHour).padStart(2, '0')
    const endMStr = String(endMinute).padStart(2, '0')

    // Local time string format for Google Calendar
    const startIso = `${year}${month}${day}T${startHStr}${startMStr}00`
    const endIso = `${year}${month}${day}T${endHStr}${endMStr}00`

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      title
    )}&dates=${startIso}/${endIso}&details=${encodeURIComponent(
      description
    )}&location=${encodeURIComponent(location)}&sf=true&output=xml`

    window.open(googleCalendarUrl, '_blank')
  }

  // Dynamic Theme Colors
  let btnClasses = 'bg-stone-900 hover:bg-stone-800 text-white shadow-xs'
  if (themeSlug === 'floral' || themeSlug === 'blossom') {
    btnClasses = 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-200'
  } else if (themeSlug === 'oceanic') {
    btnClasses = 'bg-[#0077b6] hover:bg-[#023e8a] text-white shadow-sky-200'
  } else if (themeSlug === 'terracotta') {
    btnClasses = 'bg-[#c85a32] hover:bg-[#9a3412] text-white shadow-orange-200'
  } else if (themeSlug === 'luxury') {
    btnClasses = 'bg-gradient-to-r from-[#c5a880] to-[#dfcaab] text-stone-950 font-semibold shadow-amber-950/40'
  } else if (themeSlug === 'botanical') {
    btnClasses = 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-950/40'
  } else if (themeSlug === 'celestial') {
    btnClasses = 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-950/40'
  } else if (themeSlug === 'arcade') {
    btnClasses = 'bg-[#06b6d4] hover:bg-[#0891b2] text-white font-mono shadow-cyan-500/30'
  } else if (themeSlug === 'gatsby') {
    btnClasses = 'bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-black font-semibold shadow-amber-500/30'
  }

  return (
    <button
      type="button"
      onClick={handleAddToCalendar}
      className={`inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium transition-all duration-300 hover:scale-[1.02] cursor-pointer shadow-sm ${btnClasses} ${className}`}
    >
      {clicked ? (
        <>
          <Check className="w-3.5 h-3.5" />
          <span>Membuka Kalender...</span>
        </>
      ) : (
        <>
          <CalendarPlus className="w-3.5 h-3.5" />
          <span>Ingatkan di Google Calendar</span>
        </>
      )}
    </button>
  )
}
