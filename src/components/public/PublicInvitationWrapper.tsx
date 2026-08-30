'use client'

import { useState } from 'react'
import { OpeningOverlay } from './OpeningOverlay'
import { MusicPlayer } from './MusicPlayer'
import { InvitationFloatingNav } from './InvitationFloatingNav'

interface PublicInvitationWrapperProps {
  children: React.ReactNode
  groomName: string
  brideName: string
  guestName?: string
  openingTitle?: string | null
  eventDate?: string
  musicUrl?: string | null
  themeSlug?: string
  coverPhoto?: string
}

export function PublicInvitationWrapper({
  children,
  groomName,
  brideName,
  guestName,
  openingTitle,
  eventDate,
  musicUrl,
  themeSlug = 'elegant',
  coverPhoto,
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
        themeSlug={themeSlug}
        coverPhoto={coverPhoto}
        onOpen={() => setIsOpened(true)}
      />
      <MusicPlayer musicUrl={musicUrl} isPlaying={isOpened} />
      
      {/* Floating navigation bar rendered once the invitation is opened */}
      {isOpened && <InvitationFloatingNav themeSlug={themeSlug} />}
      
      {/* The main content is hidden from screen readers/interaction until opened, though visually handled by the overlay */}
      <div className={!isOpened ? 'pointer-events-none' : 'pb-16 sm:pb-20'}>
        {children}
      </div>
    </>
  )
}
