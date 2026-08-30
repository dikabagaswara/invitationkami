'use client'

import { PublicSharedSections } from '@/components/public/PublicSharedSections'
import { CountdownTimer } from '@/components/public/CountdownTimer'
import { HeroCouplePhoto } from '@/components/public/HeroCouplePhoto'
import { AddToCalendarButton } from '@/components/public/AddToCalendarButton'
import { GalleryLightbox } from '@/components/public/GalleryLightbox'
import { FloatingParticles } from '@/components/public/FloatingParticles'
import { ThemeData } from '@/modules/theme/types/theme-data'
import { Calendar, MapPin, Sparkles, Heart } from 'lucide-react'

export default function HeritageTheme({ data }: { data: ThemeData }) {
  const { invitation, events, gallery, loveStory, weddingGifts, guestMessages, guestName } = data
  const { sectionConfig } = invitation

  const primaryEvent = events[0]
  const couplePhoto = invitation.heroPhoto || invitation.coverPhoto || gallery[0]?.imageUrl || invitation.groomPhoto || invitation.bridePhoto

  return (
    <div className="relative min-h-screen bg-[#1C1612] text-[#F3E9DD] font-serif selection:bg-[#D4AF37] selection:text-stone-950 overflow-x-hidden">
      {/* ─────────────────────────────────────────────
          ROYAL JAVANESE HERITAGE CSS STYLES & FONTS
         ───────────────────────────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap');
        
        .font-royal-title { font-family: 'Cinzel Decorative', Georgia, serif; }
        .font-royal-serif { font-family: 'Cormorant Garamond', Georgia, serif; }
        .font-sans-ui { font-family: 'Plus Jakarta Sans', sans-serif; }

        .heritage-border {
          border: 1px solid rgba(212, 175, 55, 0.35);
          box-shadow: 0 0 25px rgba(212, 175, 55, 0.08);
        }

        .gold-text-gradient {
          background: linear-gradient(135deg, #F9F295 0%, #E0AA3E 50%, #FAF1A2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>

      {/* Floating Gold Particles */}
      <FloatingParticles themeSlug="heritage" />

      {/* Batik Ornament Subtle Background Overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-10 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:28px_28px]"></div>

      {/* ─────────────────────────────────────────────
          1. HERO SECTION (ROYAL KERATON GREETINGS)
         ───────────────────────────────────────────── */}
      {sectionConfig.hero && (
        <section id="hero" className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-2xl w-full heritage-border bg-[#251E19]/90 backdrop-blur-md p-8 sm:p-12 rounded-3xl space-y-6">
            
            {/* Royal Crest Gunungan Symbol */}
            <div className="space-y-1">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#322720] border border-[#D4AF37]/40 flex items-center justify-center text-xl text-[#D4AF37] shadow-lg">
                ⚜️
              </div>
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.35em] font-sans-ui text-[#D4AF37] font-semibold block pt-2">
                PAWIWAHAN ADAT NUSANTARA
              </span>
            </div>

            {/* Couple Feature Focus Photo */}
            <div className="py-2">
              <HeroCouplePhoto
                photoUrl={couplePhoto}
                groomName={invitation.groomName}
                brideName={invitation.brideName}
                themeSlug="luxury"
                frameVariant="arch"
              />
            </div>

            {/* Couple Royal Names */}
            <div className="space-y-3">
              <h1 className="font-royal-title text-2xl sm:text-4xl text-[#F9F295] leading-relaxed tracking-wider">
                {invitation.groomName}
              </h1>
              <div className="text-[#D4AF37] text-xl font-royal-serif italic">
                &amp;
              </div>
              <h1 className="font-royal-title text-2xl sm:text-4xl text-[#F9F295] leading-relaxed tracking-wider">
                {invitation.brideName}
              </h1>
            </div>

            {/* Date & Venue */}
            {primaryEvent && (
              <div className="pt-4 border-t border-[#D4AF37]/30 text-xs sm:text-sm font-sans-ui text-[#E4D5C7] space-y-1">
                <p className="font-medium text-[#F3E9DD]">
                  {new Date(primaryEvent.date).toLocaleDateString('id-ID', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                <p className="text-[11px] text-[#C2B29F] font-light">📍 {primaryEvent.venue}</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────
          2. QUOTE / AYAT SUCI
         ───────────────────────────────────────────── */}
      {sectionConfig.quote && invitation.quote && (
        <section className="relative z-10 py-16 px-4 max-w-3xl mx-auto text-center">
          <div className="heritage-border bg-[#251E19]/80 backdrop-blur-md p-8 sm:p-10 rounded-2xl space-y-3">
            <div className="text-xl text-[#D4AF37]">❦</div>
            <p className="font-royal-serif text-xl sm:text-2xl text-[#E8DCCF] italic leading-relaxed">
              &quot;{invitation.quote}&quot;
            </p>
            {invitation.quoteSource && (
              <p className="text-xs uppercase tracking-[0.25em] font-sans-ui text-[#D4AF37] font-semibold pt-2">
                — {invitation.quoteSource} —
              </p>
            )}
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────
          3. COUPLE PROFILES
         ───────────────────────────────────────────── */}
      {sectionConfig.couple && (
        <section id="couple" className="relative z-10 py-20 px-4 max-w-5xl mx-auto">
          <div className="text-center mb-12 space-y-2">
            <span className="text-xs font-sans-ui uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">
              Mempelai Pengantin
            </span>
            <h2 className="font-royal-title text-2xl sm:text-4xl text-[#F9F295]">
              Dhaup Suci
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Groom Profile */}
            <div className="heritage-border bg-[#251E19]/90 p-8 rounded-3xl space-y-4 text-center">
              <div className="w-40 h-40 sm:w-48 sm:h-48 mx-auto rounded-full p-2 bg-gradient-to-tr from-[#D4AF37] via-[#8C6D45] to-[#D4AF37] shadow-xl overflow-hidden">
                <img
                  src={invitation.groomPhoto || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80'}
                  alt="Groom"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <h3 className="font-royal-title text-xl sm:text-2xl text-[#F9F295]">
                  {invitation.groomName}
                </h3>
                <p className="font-sans-ui text-sm font-medium text-[#E4D5C7] mt-1">
                  {invitation.groomFullName || invitation.groomName}
                </p>
              </div>
              {(invitation.groomFather || invitation.groomMother) && (
                <div className="p-3 bg-[#1A1410] rounded-xl text-xs font-sans-ui text-[#C2B29F] border border-[#D4AF37]/20">
                  <p>Putra tercinta dari:</p>
                  <strong className="text-[#F3E9DD] block mt-0.5">
                    Bapak {invitation.groomFather || '-'} &amp; Ibu {invitation.groomMother || '-'}
                  </strong>
                </div>
              )}
            </div>

            {/* Bride Profile */}
            <div className="heritage-border bg-[#251E19]/90 p-8 rounded-3xl space-y-4 text-center">
              <div className="w-40 h-40 sm:w-48 sm:h-48 mx-auto rounded-full p-2 bg-gradient-to-tr from-[#D4AF37] via-[#8C6D45] to-[#D4AF37] shadow-xl overflow-hidden">
                <img
                  src={invitation.bridePhoto || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=80'}
                  alt="Bride"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <h3 className="font-royal-title text-xl sm:text-2xl text-[#F9F295]">
                  {invitation.brideName}
                </h3>
                <p className="font-sans-ui text-sm font-medium text-[#E4D5C7] mt-1">
                  {invitation.brideFullName || invitation.brideName}
                </p>
              </div>
              {(invitation.brideFather || invitation.brideMother) && (
                <div className="p-3 bg-[#1A1410] rounded-xl text-xs font-sans-ui text-[#C2B29F] border border-[#D4AF37]/20">
                  <p>Putri tercinta dari:</p>
                  <strong className="text-[#F3E9DD] block mt-0.5">
                    Bapak {invitation.brideFather || '-'} &amp; Ibu {invitation.brideMother || '-'}
                  </strong>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────
          4. COUNTDOWN TIMER
         ───────────────────────────────────────────── */}
      {sectionConfig.countdown && primaryEvent && (
        <section className="relative z-10 py-14 px-4 text-center">
          <div className="max-w-2xl mx-auto heritage-border bg-[#251E19]/90 p-8 rounded-3xl space-y-4">
            <span className="text-xs font-sans-ui text-[#D4AF37] uppercase tracking-[0.3em] font-semibold">
              Menghitung Hari Bahagia
            </span>
            <CountdownTimer targetDate={primaryEvent.date} />
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────
          5. EVENTS SCHEDULE
         ───────────────────────────────────────────── */}
      {sectionConfig.events && events.length > 0 && (
        <section id="events" className="relative z-10 py-20 px-4 max-w-5xl mx-auto">
          <div className="text-center mb-12 space-y-2">
            <span className="text-xs font-sans-ui uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">
              Waktu &amp; Tempat
            </span>
            <h2 className="font-royal-title text-2xl sm:text-4xl text-[#F9F295]">
              Rangkaian Acara
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {events.map((evt, idx) => (
              <div
                key={evt.id || idx}
                className="heritage-border bg-[#251E19]/95 p-8 rounded-3xl space-y-4 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-[#322720] border border-[#D4AF37]/50 mx-auto flex items-center justify-center text-[#D4AF37] text-xl shadow-lg">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-royal-title text-xl sm:text-2xl text-[#F9F295]">
                    {evt.title}
                  </h3>
                  <p className="text-xs font-sans-ui text-[#D4AF37] uppercase tracking-wider font-semibold mt-1">
                    {new Date(evt.date).toLocaleDateString('id-ID', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>

                <div className="space-y-1 text-xs font-sans-ui text-[#C2B29F] border-t border-b border-[#D4AF37]/20 py-3">
                  <p className="font-medium text-[#F3E9DD]">
                    🕒 Pukul: {evt.startTime || '08:00 WIB'} - {evt.endTime || 'Selesai'}
                  </p>
                  <p className="font-medium text-[#F3E9DD]">📍 Tempat: {evt.venue}</p>
                  {evt.address && <p className="text-[#A89886] text-[11px] pt-1">{evt.address}</p>}
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2.5">
                  <AddToCalendarButton
                    title={`${evt.title} - ${invitation.groomName} & ${invitation.brideName}`}
                    description={`Pernikahan Adat ${invitation.groomName} & ${invitation.brideName}. Waktu: ${evt.startTime || '08:00'} WIB. Lokasi: ${evt.venue}`}
                    location={`${evt.venue}, ${evt.address || ''}`}
                    startDate={evt.date}
                    startTime={evt.startTime}
                    endTime={evt.endTime}
                    themeSlug="luxury"
                  />
                  {evt.mapUrl && (
                    <a
                      href={evt.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-[#1A1410] border border-[#D4AF37]/40 hover:bg-[#322720] text-[#D4AF37] text-xs font-sans-ui font-medium shadow-xs transition-colors"
                    >
                      <MapPin className="w-3.5 h-3.5" /> Buka Google Maps
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────
          6. GALLERY (LIGHTBOX POPUP)
         ───────────────────────────────────────────── */}
      {sectionConfig.gallery && gallery.length > 0 && (
        <section id="gallery" className="relative z-10 py-20 px-4 max-w-5xl mx-auto text-center">
          <div className="mb-12 space-y-2">
            <span className="text-xs font-sans-ui uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">
              Galeri Foto
            </span>
            <h2 className="font-royal-title text-2xl sm:text-4xl text-[#F9F295]">
              Momen Bahagia
            </h2>
            <p className="text-xs font-sans-ui text-[#C2B29F] font-light">Klik foto untuk memperbesar</p>
          </div>

          <GalleryLightbox
            photos={gallery.map((g) => ({
              imageUrl: g.imageUrl,
              caption: g.caption,
            }))}
          />
        </section>
      )}

      {/* ─────────────────────────────────────────────
          7. SHARED SECTIONS (GIFT, RSVP, WISHES)
         ───────────────────────────────────────────── */}
      <PublicSharedSections data={data} isDark={true} />
    </div>
  )
}
