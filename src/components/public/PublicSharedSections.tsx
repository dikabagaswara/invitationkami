import { ThemeData } from '@/modules/theme/types/theme-data'
import { CountdownTimer } from './CountdownTimer'
import { RsvpForm } from './RsvpForm'
import { GuestbookSection } from './GuestbookSection'
import { GiftSection } from './GiftSection'
import { LocationSection } from './LocationSection'
import { ShareModal } from './ShareModal'

export function PublicSharedSections({ data }: { data: ThemeData }) {
  const { invitation, events, guestMessages, weddingGifts, guestName } = data
  const { sectionConfig } = invitation

  return (
    <div className="w-full">
      {/* RSVP Section */}
      {sectionConfig.rsvp && (
        <section className="py-16 px-4 max-w-2xl mx-auto">
          <h2 className="text-3xl text-center mb-8 font-light">RSVP</h2>
          <RsvpForm slug={invitation.slug} className="bg-white/80 p-6 rounded-xl shadow-sm border border-gray-100" />
        </section>
      )}

      {/* Guest Messages Section */}
      {sectionConfig.guestbook && (
        <section className="py-16 px-4 max-w-2xl mx-auto">
          <h2 className="text-3xl text-center mb-8 font-light">Ucapan & Doa</h2>
          <GuestbookSection slug={invitation.slug} initialMessages={guestMessages} />
        </section>
      )}

      {/* Gift Section */}
      {sectionConfig.gift && weddingGifts && weddingGifts.length > 0 && (
        <section className="py-16 px-4 max-w-2xl mx-auto">
          <h2 className="text-3xl text-center mb-8 font-light">Wedding Gift</h2>
          <p className="text-center text-gray-600 mb-8 max-w-md mx-auto text-sm">
            Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Dan jika Anda memberi perhatian lebih, dapat mengirimkan kado melalui:
          </p>
          <GiftSection gifts={weddingGifts} />
        </section>
      )}

      {/* Share Section */}
      <section className="py-16 px-4 flex flex-col items-center justify-center border-t border-black/5 bg-black/5">
        <h2 className="text-xl mb-6 font-light">Bagikan Kebahagiaan</h2>
        <ShareModal 
          slug={invitation.slug} 
          guestName={guestName} 
          groomName={invitation.groomName} 
          brideName={invitation.brideName} 
        />

        {/* InvitationKami Branding Footer */}
        <div className="mt-16 flex flex-col items-center justify-center space-y-1.5 opacity-85 hover:opacity-100 transition-opacity">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm border border-gray-200/70 shadow-xs hover:bg-white transition"
          >
            <img src="/images/logo.png" alt="InvitationKami" className="h-6 w-auto object-contain" />
            <span className="text-xs font-serif font-semibold tracking-wider text-gray-800">
              INVITATIONKAMI
            </span>
          </a>
          <p className="text-[11px] text-gray-500 font-sans">
            Copyright © 2026 InvitationKami
          </p>
        </div>
      </section>
    </div>
  )
}
