'use client'

import { useState, useEffect } from 'react'

interface CountdownTimerProps {
  targetDate: string | Date
  isDark?: boolean
  className?: string
}

const TimeUnit = ({ label, value, isDark }: { label: string, value: number, isDark?: boolean }) => (
  <div className={`flex flex-col items-center justify-center p-3 rounded-xl shadow-sm w-16 sm:w-20 ${
    isDark ? 'bg-black/30 backdrop-blur-md border border-white/20 text-white' : 'bg-white/70 backdrop-blur-md border border-black/5 text-gray-800'
  }`}>
    <span className={`text-xl sm:text-2xl font-semibold ${isDark ? 'text-white' : 'text-gray-800'}`}>{value}</span>
    <span className={`text-[10px] sm:text-xs uppercase mt-1 ${isDark ? 'text-white/70' : 'text-gray-500'}`}>{label}</span>
  </div>
)

export function CountdownTimer({ targetDate, isDark = false, className = '' }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0
  })

  useEffect(() => {
    const target = new Date(targetDate).getTime()

    const interval = setInterval(() => {
      const now = new Date().getTime()
      const distance = target - now

      if (distance < 0) {
        clearInterval(interval)
        return
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [targetDate])

  return (
    <div className={`flex justify-center gap-2 sm:gap-4 ${className}`}>
      <TimeUnit label="Hari" value={timeLeft.days} isDark={isDark} />
      <TimeUnit label="Jam" value={timeLeft.hours} isDark={isDark} />
      <TimeUnit label="Menit" value={timeLeft.minutes} isDark={isDark} />
      <TimeUnit label="Detik" value={timeLeft.seconds} isDark={isDark} />
    </div>
  )
}
