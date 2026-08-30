import { ThemeData } from '@/modules/theme/types/theme-data'
import { CountdownTimer } from './CountdownTimer'
import { RsvpForm } from './RsvpForm'
import { GuestbookSection } from './GuestbookSection'
import { GiftSection } from './GiftSection'
import { LocationSection } from './LocationSection'
import { ShareModal } from './ShareModal'

export function PublicSharedSections({ data, isDark = false }: { data: ThemeData; isDark?: boolean }) {
  const { invitation, events, guestMessages, weddingGifts, guestName } = data
  const { sectionConfig } = invitation

  return (
    <div className="w-full">
      {/* RSVP Section */}
      {sectionConfig.rsvp && (
        <section id="rsvp" className="py-16 px-4 max-w-2xl mx-auto">
          <h2 className={`text-3xl text-center mb-8 font-light ${isDark ? 'text-[#d4af37]' : ''}`}>RSVP</h2>
          <RsvpForm 
            slug={invitation.slug} 
            isDark={isDark}
            className={
              isDark 
                ? "bg-[#141414] p-8 rounded-2xl shadow-xl border border-[#d4af37]/30 text-stone-200" 
                : "bg-white/80 p-6 rounded-xl shadow-sm border border-gray-100"
            } 
          />
        </section>
      )}

      {/* Guest Messages Section */}
      {sectionConfig.guestbook && (
        <section id="wishes" className="py-16 px-4 max-w-2xl mx-auto">
          <h2 className={`text-3xl text-center mb-8 font-light ${isDark ? 'text-[#d4af37]' : ''}`}>Ucapan & Doa</h2>
          <GuestbookSection 
            slug={invitation.slug} 
            initialMessages={guestMessages} 
            isDark={isDark}
          />
        </section>
      )}

      {/* Gift Section */}
      {sectionConfig.gift && weddingGifts && weddingGifts.length > 0 && (
        <section id="gift" className="py-16 px-4 max-w-2xl mx-auto">
          <h2 className={`text-3xl text-center mb-8 font-light ${isDark ? 'text-[#d4af37]' : ''}`}>Wedding Gift</h2>
          <p className={`text-center mb-8 max-w-md mx-auto text-sm ${isDark ? 'text-stone-400' : 'text-gray-600'}`}>
            Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Dan jika Anda memberi perhatian lebih, dapat mengirimkan kado melalui:
          </p>
          <GiftSection gifts={weddingGifts} isDark={isDark} />
        </section>
      )}

      {/* Share Section */}
      <section className={`py-16 px-4 flex flex-col items-center justify-center border-t ${isDark ? 'border-[#d4af37]/20 bg-black/40' : 'border-black/5 bg-black/5'}`}>
        <h2 className={`text-xl mb-6 font-light ${isDark ? 'text-[#d4af37]' : ''}`}>Bagikan Kebahagiaan</h2>
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
            className={`flex items-center gap-2 px-3 py-1 rounded-full backdrop-blur-sm border shadow-xs transition ${
              isDark 
                ? 'bg-[#141414] border-[#c5a880]/30 text-stone-200 hover:bg-[#1f1f1f]' 
                : 'bg-white/80 border-gray-200/70 hover:bg-white text-gray-800'
            }`}
          >
            <img src="/images/logo.png" alt="InvitationKami" className="h-6 w-auto object-contain" />
            <span className={`text-xs font-serif font-semibold tracking-wider ${isDark ? 'text-[#c5a880]' : 'text-gray-800'}`}>
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
