import { ThemeData } from '@/modules/theme/types/theme-data'
import { RsvpForm } from './RsvpForm'
import { GuestbookSection } from './GuestbookSection'
import { GiftSection } from './GiftSection'
import { ShareModal } from './ShareModal'

export function PublicSharedSections({ data, isDark = false }: { data: ThemeData; isDark?: boolean }) {
  const { invitation, events, guestMessages, weddingGifts, guestName } = data
  const { sectionConfig, slug } = invitation

  // Determine theme identity to blend colors harmoniously without harsh contrast
  let themeSlug = 'elegant'
  if (slug.startsWith('demo-')) {
    themeSlug = slug.replace('demo-', '')
  } else if (invitation.colorPreset) {
    themeSlug = invitation.colorPreset
  }

  // Soft harmonious color presets per theme
  let headingColor = 'text-stone-800'
  let subtextColor = 'text-stone-500'
  let cardBgClass = 'bg-white/80 border-stone-200 shadow-sm text-stone-800'
  let inputClass = 'bg-white/90 border-stone-300 text-stone-900 focus:border-stone-800 focus:ring-stone-800'
  let btnClass = 'bg-stone-900 hover:bg-stone-800 text-white shadow-xs'
  let dividerClass = 'border-black/5 bg-black/5'
  let brandBadgeClass = 'bg-white/80 border-stone-200 text-stone-800'

  if (themeSlug === 'blossom' || themeSlug === 'floral') {
    headingColor = 'text-rose-900'
    subtextColor = 'text-rose-600/80'
    cardBgClass = 'bg-white/85 border-rose-200/80 shadow-md text-stone-800'
    inputClass = 'bg-white/90 border-rose-200 text-rose-950 focus:border-rose-500 focus:ring-rose-200'
    btnClass = 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-200 shadow-sm'
    dividerClass = 'border-rose-200/40 bg-rose-50/40'
    brandBadgeClass = 'bg-white/90 border-rose-200 text-rose-800'
  } else if (themeSlug === 'oceanic') {
    headingColor = 'text-[#023e8a]'
    subtextColor = 'text-[#0077b6]/80'
    cardBgClass = 'bg-white/85 border-[#bae6fd] shadow-md text-stone-800'
    inputClass = 'bg-white/90 border-[#bae6fd] text-[#023e8a] focus:border-[#0077b6] focus:ring-sky-100'
    btnClass = 'bg-[#0077b6] hover:bg-[#023e8a] text-white shadow-sky-200 shadow-sm'
    dividerClass = 'border-sky-200/40 bg-sky-50/40'
    brandBadgeClass = 'bg-white/90 border-sky-200 text-[#023e8a]'
  } else if (themeSlug === 'terracotta') {
    headingColor = 'text-[#7c2d12]'
    subtextColor = 'text-[#c85a32]/85'
    cardBgClass = 'bg-white/85 border-[#ebd7ce] shadow-md text-stone-800'
    inputClass = 'bg-white/90 border-[#ebd7ce] text-[#7c2d12] focus:border-[#c85a32] focus:ring-orange-100'
    btnClass = 'bg-[#c85a32] hover:bg-[#9a3412] text-white shadow-orange-200 shadow-sm'
    dividerClass = 'border-orange-200/40 bg-orange-50/40'
    brandBadgeClass = 'bg-white/90 border-orange-200 text-[#7c2d12]'
  } else if (themeSlug === 'rustic' || themeSlug === 'vintage') {
    headingColor = 'text-[#452b1b]'
    subtextColor = 'text-[#785338]/85'
    cardBgClass = 'bg-[#fffdf9]/90 border-[#d9cbb9] shadow-md text-stone-800'
    inputClass = 'bg-white/90 border-[#d9cbb9] text-[#452b1b] focus:border-[#785338] focus:ring-amber-100'
    btnClass = 'bg-[#785338] hover:bg-[#5c3e28] text-[#fffdf9] shadow-amber-900/10 shadow-sm'
    dividerClass = 'border-amber-200/40 bg-amber-50/40'
    brandBadgeClass = 'bg-[#fffdf9] border-[#d9cbb9] text-[#452b1b]'
  } else if (themeSlug === 'luxury') {
    headingColor = 'text-[#e5d2ba]'
    subtextColor = 'text-[#a8947c]'
    cardBgClass = 'bg-[#151412]/85 border-[#c5a880]/30 shadow-xl text-stone-200'
    inputClass = 'bg-[#1e1c19] border-[#c5a880]/40 text-[#f5ebd9] placeholder:text-[#a8947c]/60 focus:border-[#c5a880] focus:ring-[#c5a880]/30'
    btnClass = 'bg-gradient-to-r from-[#c5a880] to-[#dfcaab] hover:brightness-105 text-stone-900 font-bold shadow-amber-950/40'
    dividerClass = 'border-[#c5a880]/20 bg-black/40'
    brandBadgeClass = 'bg-[#151412] border-[#c5a880]/30 text-[#e5d2ba]'
  } else if (themeSlug === 'botanical') {
    headingColor = 'text-[#86efac]'
    subtextColor = 'text-emerald-300/80'
    cardBgClass = 'bg-[#0d1f12]/85 border-emerald-500/30 shadow-xl text-emerald-100'
    inputClass = 'bg-[#132c1b] border-emerald-500/40 text-emerald-100 placeholder:text-emerald-400/60 focus:border-emerald-400 focus:ring-emerald-400/30'
    btnClass = 'bg-emerald-600 hover:bg-emerald-500 text-white font-semibold shadow-emerald-950/40'
    dividerClass = 'border-emerald-500/20 bg-black/40'
    brandBadgeClass = 'bg-[#0d1f12] border-emerald-500/30 text-emerald-200'
  } else if (themeSlug === 'celestial') {
    headingColor = 'text-[#c4b5fd]'
    subtextColor = 'text-purple-300/80'
    cardBgClass = 'bg-[#120b2e]/85 border-purple-500/30 shadow-xl text-purple-100'
    inputClass = 'bg-[#1d143d] border-purple-500/40 text-purple-100 placeholder:text-purple-300/60 focus:border-purple-400 focus:ring-purple-400/30'
    btnClass = 'bg-purple-600 hover:bg-purple-500 text-white font-semibold shadow-purple-950/40'
    dividerClass = 'border-purple-500/20 bg-black/40'
    brandBadgeClass = 'bg-[#120b2e] border-purple-500/30 text-purple-200'
  } else if (themeSlug === 'arcade') {
    headingColor = 'text-[#38bdf8]'
    subtextColor = 'text-[#f43f5e]'
    cardBgClass = 'bg-[#0c1222]/90 border-2 border-[#38bdf8] shadow-[0_0_20px_rgba(56,189,248,0.25)] text-stone-100 font-mono'
    inputClass = 'bg-[#070913] border border-[#38bdf8] text-[#38bdf8] placeholder:text-cyan-600 focus:border-[#ec4899] focus:ring-[#ec4899]/30 font-mono'
    btnClass = 'bg-gradient-to-r from-[#06b6d4] to-[#ec4899] hover:brightness-110 text-white font-mono font-bold shadow-cyan-500/30'
    dividerClass = 'border-[#38bdf8]/30 bg-[#070913]'
    brandBadgeClass = 'bg-[#0c1222] border-2 border-[#38bdf8] text-[#38bdf8] font-mono'
  }

  const isDarkMode = isDark || themeSlug === 'luxury' || themeSlug === 'botanical' || themeSlug === 'celestial' || themeSlug === 'arcade'

  return (
    <div className="w-full">
      {/* RSVP Section */}
      {sectionConfig.rsvp && (
        <section id="rsvp" className="py-16 sm:py-20 px-4 max-w-2xl mx-auto">
          <div className="text-center mb-8 space-y-1">
            <h2 className={`text-2xl sm:text-3xl font-serif font-medium tracking-wide ${headingColor}`}>
              Konfirmasi Kehadiran (RSVP)
            </h2>
            <p className={`text-xs sm:text-sm ${subtextColor}`}>
              Mohon konfirmasikan kehadiran Anda untuk membantu persiapan kami.
            </p>
          </div>
          <RsvpForm 
            slug={invitation.slug} 
            isDark={isDarkMode}
            className={`p-6 sm:p-8 rounded-2xl border backdrop-blur-md ${cardBgClass}`}
            customInputClass={inputClass}
            customBtnClass={btnClass}
          />
        </section>
      )}

      {/* Guest Messages Section */}
      {sectionConfig.guestbook && (
        <section id="wishes" className="py-16 sm:py-20 px-4 max-w-2xl mx-auto">
          <div className="text-center mb-8 space-y-1">
            <h2 className={`text-2xl sm:text-3xl font-serif font-medium tracking-wide ${headingColor}`}>
              Ucapan &amp; Doa Restu
            </h2>
            <p className={`text-xs sm:text-sm ${subtextColor}`}>
              Tuliskan pesan, harapan manis, dan doa terbaik bagi kedua mempelai.
            </p>
          </div>
          <GuestbookSection 
            slug={invitation.slug} 
            initialMessages={guestMessages} 
            isDark={isDarkMode}
            className={`p-6 sm:p-8 rounded-2xl border backdrop-blur-md ${cardBgClass}`}
            customInputClass={inputClass}
            customBtnClass={btnClass}
          />
        </section>
      )}

      {/* Gift Section */}
      {sectionConfig.gift && weddingGifts && weddingGifts.length > 0 && (
        <section id="gift" className="py-16 sm:py-20 px-4 max-w-2xl mx-auto">
          <div className="text-center mb-8 space-y-1">
            <h2 className={`text-2xl sm:text-3xl font-serif font-medium tracking-wide ${headingColor}`}>
              Wedding Gift
            </h2>
            <p className={`text-xs sm:text-sm max-w-md mx-auto leading-relaxed ${subtextColor}`}>
              Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Dan jika Anda ingin mengirimkan hadiah, dapat melalui:
            </p>
          </div>
          <GiftSection 
            gifts={weddingGifts} 
            isDark={isDarkMode}
            cardBgClass={cardBgClass}
            btnClass={btnClass}
          />
        </section>
      )}

      {/* Share Section */}
      <section className={`py-16 px-4 flex flex-col items-center justify-center border-t ${dividerClass}`}>
        <h2 className={`text-lg sm:text-xl mb-6 font-serif tracking-wide ${headingColor}`}>
          Bagikan Kebahagiaan
        </h2>
        <ShareModal 
          slug={invitation.slug} 
          guestName={guestName} 
          groomName={invitation.groomName} 
          brideName={invitation.brideName} 
        />

        {/* InvitationKami Branding Footer */}
        <div className="mt-14 flex flex-col items-center justify-center space-y-1.5 opacity-80 hover:opacity-100 transition-opacity">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 px-3.5 py-1 rounded-full backdrop-blur-sm border shadow-xs transition ${brandBadgeClass}`}
          >
            <img src="/images/logo.png" alt="InvitationKami" className="h-5 w-auto object-contain" />
            <span className="text-xs font-serif font-semibold tracking-wider">
              INVITATIONKAMI
            </span>
          </a>
          <p className="text-[10px] text-stone-500 font-sans">
            Copyright © 2026 InvitationKami
          </p>
        </div>
      </section>
    </div>
  )
}
