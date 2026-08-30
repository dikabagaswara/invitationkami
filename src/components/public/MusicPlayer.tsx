'use client'

import { useState, useEffect, useRef } from 'react'
import { Music, Volume2, VolumeX, Disc3 } from 'lucide-react'

interface MusicPlayerProps {
  musicUrl?: string | null
  isPlaying: boolean
}

export function MusicPlayer({ musicUrl, isPlaying: initialPlayState }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (initialPlayState && audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true)
      }).catch(err => {
        console.warn('Autoplay prevented by browser policy:', err)
      })
    }
  }, [initialPlayState])

  if (!musicUrl) return null

  const togglePlay = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true)
      }).catch((err) => {
        console.warn('Playback failed:', err)
      })
    }
  }

  const toggleMute = () => {
    if (!audioRef.current) return
    audioRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }

  return (
    <div className="fixed bottom-20 left-4 sm:bottom-6 sm:left-6 z-40 flex items-center gap-1.5 sm:gap-2 pointer-events-auto">
      <audio ref={audioRef} src={musicUrl} loop preload="auto" />
      
      {/* Vinyl Disc Rotating Music Player Button */}
      <button
        type="button"
        onClick={togglePlay}
        title={isPlaying ? 'Jeda Musik' : 'Putar Musik'}
        className={`relative w-11 h-11 sm:w-12 sm:h-12 rounded-full shadow-2xl flex items-center justify-center transition-transform duration-300 hover:scale-110 cursor-pointer border ${
          isPlaying 
            ? 'bg-stone-900 text-amber-300 border-amber-300/40 shadow-[0_0_15px_rgba(217,119,6,0.35)]' 
            : 'bg-white/90 text-stone-700 border-stone-200'
        }`}
      >
        <Disc3 
          className={`w-5 h-5 sm:w-6 sm:h-6 ${isPlaying ? 'animate-spin' : 'opacity-70'}`} 
          style={{ animationDuration: '4s' }} 
        />
        
        {/* Subtle center music dot */}
        <span className={`absolute w-2 h-2 rounded-full ${isPlaying ? 'bg-amber-400 animate-ping' : 'bg-stone-400'}`} />
      </button>

      {/* Quick Mute Toggle */}
      <button
        type="button"
        onClick={toggleMute}
        title={isMuted ? 'Nyalakan Suara' : 'Bisukan Suara'}
        className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-md shadow-md border border-stone-200/80 flex items-center justify-center text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
      >
        {isMuted ? (
          <VolumeX className="w-3.5 h-3.5 text-rose-500" />
        ) : (
          <Volume2 className="w-3.5 h-3.5 text-stone-700" />
        )}
      </button>
    </div>
  )
}
