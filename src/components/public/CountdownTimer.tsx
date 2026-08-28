'use client'

import { useState, useEffect } from 'react'

interface CountdownTimerProps {
  targetDate: string | Date
}

const TimeUnit = ({ label, value }: { label: string, value: number }) => (
  <div className="flex flex-col items-center justify-center p-3 bg-white/50 backdrop-blur rounded-lg shadow-sm w-20">
    <span className="text-2xl font-semibold text-gray-800">{value}</span>
    <span className="text-xs text-gray-500 uppercase mt-1">{label}</span>
  </div>
)

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
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
    <div className="flex justify-center gap-2 sm:gap-4">
      <TimeUnit label="Hari" value={timeLeft.days} />
      <TimeUnit label="Jam" value={timeLeft.hours} />
      <TimeUnit label="Menit" value={timeLeft.minutes} />
      <TimeUnit label="Detik" value={timeLeft.seconds} />
    </div>
  )
}
