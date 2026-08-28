'use client'

import { useState } from 'react'
import { OpeningOverlay } from './OpeningOverlay'
import { MusicPlayer } from './MusicPlayer'

interface PublicInvitationWrapperProps {
  children: React.ReactNode
  groomName: string
  brideName: string
  guestName?: string
  openingTitle?: string | null
  eventDate?: string
  musicUrl?: string | null
}

export function PublicInvitationWrapper({
  children,
  groomName,
  brideName,
  guestName,
  openingTitle,
  eventDate,
  musicUrl
}: PublicInvitationWrapperProps) {
  const [isOpened, setIsOpened] = useState(false)

  return (
    <>
      <OpeningOverlay
        groomName={groomName}
        brideName={brideName}
        guestName={guestName}
        openingTitle={openingTitle}
        eventDate={eventDate}
        onOpen={() => setIsOpened(true)}
      />
      <MusicPlayer musicUrl={musicUrl} isPlaying={isOpened} />
      
      {/* The main content is hidden from screen readers/interaction until opened, though visually handled by the overlay */}
      <div className={!isOpened ? 'pointer-events-none' : ''}>
        {children}
      </div>
    </>
  )
}
