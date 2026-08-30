import { PublicSharedSections } from '@/components/public/PublicSharedSections'
import { CountdownTimer } from '@/components/public/CountdownTimer'
import { HeroCouplePhoto } from '@/components/public/HeroCouplePhoto'
import { AddToCalendarButton } from '@/components/public/AddToCalendarButton'
import { GalleryLightbox } from '@/components/public/GalleryLightbox'
import { FloatingParticles } from '@/components/public/FloatingParticles'
import { ThemeData } from '@/modules/theme/types/theme-data'
import { Calendar, MapPin, Heart, Sparkles } from 'lucide-react'

export default function BlossomTheme({ data }: { data: ThemeData }) {
  const { invitation, events, gallery, loveStory, weddingGifts, guestMessages, guestName } = data
  const { sectionConfig } = invitation

  const primaryEvent = events[0]
  const receptionEvent = events[1] || events[0]
  const couplePhoto = invitation.heroPhoto || invitation.coverPhoto || gallery[0]?.imageUrl || invitation.groomPhoto || invitation.bridePhoto

  return (
    <div className="relative min-h-screen bg-[#FFF9F9] text-stone-800 font-sans selection:bg-rose-100 overflow-x-hidden">
      {/* ─────────────────────────────────────────────
          CSS ANIMATIONS & FLOWER PARTICLES (GOYANG / SWAY)
         ───────────────────────────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Alex+Brush&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap');
        
        .font-script { font-family: 'Alex Brush', cursive; }
        .font-serif-cormorant { font-family: 'Cormorant Garamond', Georgia, serif; }
        
        /* Floating / Swaying Flowers Animation (Inspired by nikahin.id goyang) */
        @keyframes flowerSwayLeft {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-8px, -12px) rotate(-6deg); }
        }
        
        @keyframes flowerSwayRight {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(10px, -10px) rotate(8deg); }
        }

        @keyframes flowerSwayTop {
          0%, 100% { transform: translate(0, 0) rotate(0deg) scale(1); }
          50% { transform: translate(-4px, 10px) rotate(4deg) scale(1.03); }
        }

        @keyframes flowerPulseSlow {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.85; }
          50% { transform: scale(1.05) rotate(3deg); opacity: 1; }
        }

        @keyframes petalFall {
          0% { transform: translateY(-10%) rotate(0deg) translateX(0); opacity: 0; }
          20% { opacity: 0.8; }
          80% { opacity: 0.6; }
          100% { transform: translateY(110vh) rotate(360deg) translateX(50px); opacity: 0; }
        }

        .animate-sway-left {
          animation: flowerSwayLeft 6s ease-in-out infinite;
        }

        .animate-sway-right {
          animation: flowerSwayRight 7s ease-in-out infinite;
        }

        .animate-sway-top {
          animation: flowerSwayTop 8s ease-in-out infinite;
        }

        .animate-flower-pulse {
          animation: flowerPulseSlow 5s ease-in-out infinite;
        }

        .petal-1 {
          position: fixed;
          top: -20px;
          left: 15%;
          animation: petalFall 12s linear infinite;
          pointer-events: none;
          z-index: 20;
        }

        .petal-2 {
          position: fixed;
          top: -20px;
          left: 45%;
          animation: petalFall 15s linear infinite 3s;
          pointer-events: none;
          z-index: 20;
        }

        .petal-3 {
          position: fixed;
          top: -20px;
          left: 80%;
          animation: petalFall 10s linear infinite 6s;
          pointer-events: none;
          z-index: 20;
        }
      `}</style>

      {/* ─────────────────────────────────────────────
          FALLING PETALS AMBIENT PARTICLES
         ───────────────────────────────────────────── */}
      <div className="petal-1 text-rose-300 text-xl opacity-70">🌸</div>
      <div className="petal-2 text-rose-400 text-2xl opacity-60">🌺</div>
      <div className="petal-3 text-pink-300 text-lg opacity-70">🌸</div>

      {/* ─────────────────────────────────────────────
          HERO COVER SECTION (WITH SWAYING FLOWER CORNERS)
         ───────────────────────────────────────────── */}
      {sectionConfig.hero && (
        <section id="hero" className="min-h-screen relative flex flex-col items-center justify-center p-6 text-center overflow-hidden bg-gradient-to-b from-[#FFF0F0] via-[#FFF8F8] to-[#FFF9F9]">
          {/* Top-Left Floral Ornament */}
          <div className="absolute -top-6 -left-6 w-48 sm:w-72 pointer-events-none z-10 animate-sway-left">
            <img 
              src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=600&auto=format&fit=crop&q=80" 
              alt="Floral" 
              className="w-full h-auto object-contain drop-shadow-md rounded-full opacity-80 mix-blend-multiply"
            />
          </div>

          {/* Top-Right Floral Ornament */}
          <div className="absolute -top-8 -right-8 w-44 sm:w-64 pointer-events-none z-10 animate-sway-right">
            <img 
              src="https://images.unsplash.com/photo-1508615039623-a25605d2b022?w=600&auto=format&fit=crop&q=80" 
              alt="Floral" 
              className="w-full h-auto object-contain drop-shadow-md rounded-full opacity-75 mix-blend-multiply"
            />
          </div>

          {/* Bottom-Left Floral Ornament */}
          <div className="absolute -bottom-10 -left-10 w-44 sm:w-64 pointer-events-none z-10 animate-sway-top">
            <img 
              src="https://images.unsplash.com/photo-1508615039623-a25605d2b022?w=600&auto=format&fit=crop&q=80" 
              alt="Floral" 
              className="w-full h-auto object-contain drop-shadow-md rounded-full opacity-75 mix-blend-multiply"
            />
          </div>

          {/* Bottom-Right Floral Ornament */}
          <div className="absolute -bottom-8 -right-8 w-48 sm:w-72 pointer-events-none z-10 animate-sway-left">
            <img 
              src="https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=600&auto=format&fit=crop&q=80" 
              alt="Floral" 
              className="w-full h-auto object-contain drop-shadow-md rounded-full opacity-80 mix-blend-multiply"
            />
          </div>

          {/* Main Hero Card Container */}
          <div className="relative z-10 max-w-lg w-full bg-white/85 backdrop-blur-md p-8 sm:p-12 rounded-[2.5rem] border border-rose-200/80 shadow-xl space-y-6 animate-flower-pulse">
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-[0.3em] font-semibold text-rose-500">
                {invitation.openingTitle || 'THE WEDDING CELEBRATION'}
              </span>
              <div className="w-12 h-0.5 bg-rose-300 mx-auto mt-2"></div>
            </div>

            {/* Couple Feature Focus Photo with Frame */}
            <HeroCouplePhoto
              photoUrl={couplePhoto}
              groomName={invitation.groomName}
              brideName={invitation.brideName}
              themeSlug="blossom"
              frameVariant="double-ring"
            />

            {/* Couple Names in Elegant Script */}
            <div className="py-2">
              <h1 className="font-script text-5xl sm:text-7xl text-rose-600 leading-tight drop-shadow-xs">
                {invitation.groomName}
              </h1>
              <span className="font-serif-cormorant italic text-3xl sm:text-4xl text-rose-400 block my-1">
                &amp;
              </span>
              <h1 className="font-script text-5xl sm:text-7xl text-rose-600 leading-tight drop-shadow-xs">
                {invitation.brideName}
              </h1>
            </div>

            {/* Event Date & Countdown Preview */}
            {primaryEvent && (
              <div className="pt-2 border-t border-rose-100/80">
                <p className="font-serif-cormorant text-lg sm:text-xl text-stone-700 font-medium">
                  {new Date(primaryEvent.date).toLocaleDateString('id-ID', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                <p className="text-xs text-rose-500 mt-1 font-light tracking-wide">
                  {primaryEvent.venue}
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────
          QUOTE / AYAT SECTION (WITH FLORAL CREST)
         ───────────────────────────────────────────── */}
      {sectionConfig.quote && invitation.quote && (
        <section className="py-20 px-6 text-center relative overflow-hidden bg-white/70">
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="w-10 h-10 mx-auto rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center text-xl text-rose-500 shadow-2xs">
              🌸
            </div>
            <p className="font-serif-cormorant italic text-xl sm:text-2xl text-stone-700 leading-relaxed font-normal">
              "{invitation.quote}"
            </p>
            {invitation.quoteSource && (
              <p className="text-xs uppercase tracking-[0.25em] font-semibold text-rose-600 pt-2">
                — {invitation.quoteSource} —
              </p>
            )}
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────
          COUPLE SECTION (BRIDE & GROOM PROFILES)
         ───────────────────────────────────────────── */}
      {sectionConfig.couple && (
        <section id="couple" className="py-20 sm:py-28 px-6 text-center max-w-5xl mx-auto relative">
          <div className="text-center mb-14 space-y-2">
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-rose-500">
              Pasangan Mempelai
            </span>
            <h2 className="font-serif-cormorant text-3xl sm:text-5xl text-stone-900 font-normal">
              Maha Suci Allah yang Mempersatukan Kami
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 font-light max-w-md mx-auto">
              Dengan memohon rahmat dan ridho Allah SWT, kami mengundang Anda untuk merayakan ikatan suci kami.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-16 items-center">
            {/* Groom Profile */}
            <div className="bg-white/90 p-8 rounded-3xl border border-rose-100 shadow-md space-y-4 relative group hover:-translate-y-1 transition-transform">
              <div className="w-44 h-44 sm:w-52 sm:h-52 mx-auto rounded-full p-2 bg-gradient-to-tr from-rose-200 via-pink-100 to-rose-300 shadow-inner overflow-hidden">
                <img
                  src={invitation.groomPhoto || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80'}
                  alt="Groom"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <h3 className="font-script text-4xl sm:text-5xl text-rose-600">
                  {invitation.groomName}
                </h3>
                <p className="font-serif-cormorant text-lg font-semibold text-stone-800 mt-1">
                  {invitation.groomFullName || invitation.groomName}
                </p>
              </div>
              {(invitation.groomFather || invitation.groomMother) && (
                <p className="text-xs text-stone-500 leading-relaxed font-light">
                  Putra dari Pasangan <br />
                  <strong className="text-stone-700">Bapak {invitation.groomFather || '...'}</strong> &amp;{' '}
                  <strong className="text-stone-700">Ibu {invitation.groomMother || '...'}</strong>
                </p>
              )}
            </div>

            {/* Bride Profile */}
            <div className="bg-white/90 p-8 rounded-3xl border border-rose-100 shadow-md space-y-4 relative group hover:-translate-y-1 transition-transform">
              <div className="w-44 h-44 sm:w-52 sm:h-52 mx-auto rounded-full p-2 bg-gradient-to-tr from-pink-200 via-rose-100 to-pink-300 shadow-inner overflow-hidden">
                <img
                  src={invitation.bridePhoto || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=80'}
                  alt="Bride"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <h3 className="font-script text-4xl sm:text-5xl text-rose-600">
                  {invitation.brideName}
                </h3>
                <p className="font-serif-cormorant text-lg font-semibold text-stone-800 mt-1">
                  {invitation.brideFullName || invitation.brideName}
                </p>
              </div>
              {(invitation.brideFather || invitation.brideMother) && (
                <p className="text-xs text-stone-500 leading-relaxed font-light">
                  Putri dari Pasangan <br />
                  <strong className="text-stone-700">Bapak {invitation.brideFather || '...'}</strong> &amp;{' '}
                  <strong className="text-stone-700">Ibu {invitation.brideMother || '...'}</strong>
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────
          COUNTDOWN TIMER SECTION
         ───────────────────────────────────────────── */}
      {sectionConfig.countdown && primaryEvent && (
        <section className="py-16 px-6 text-center bg-gradient-to-b from-[#FFF9F9] via-[#FFF0F0] to-[#FFF9F9]">
          <div className="max-w-2xl mx-auto space-y-6">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-rose-600">
              Menghitung Hari Bahagia
            </span>
            <CountdownTimer targetDate={primaryEvent.date} />
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────
          EVENTS / RANGKAIAN ACARA SECTION
         ───────────────────────────────────────────── */}
      {sectionConfig.events && events.length > 0 && (
        <section id="events" className="py-20 sm:py-28 px-6 max-w-5xl mx-auto relative">
          <div className="text-center mb-14 space-y-2">
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-rose-500">
              Waktu &amp; Tempat
            </span>
            <h2 className="font-serif-cormorant text-3xl sm:text-5xl text-stone-900 font-normal">
              Rangkaian Acara Pernikahan
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {events.map((evt, idx) => (
              <div
                key={evt.id || idx}
                className="bg-white/95 p-8 rounded-3xl border border-rose-200/80 shadow-md space-y-5 text-center relative overflow-hidden"
              >
                <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-200/80 mx-auto flex items-center justify-center text-rose-600 text-xl shadow-2xs">
                  <Calendar className="w-5 h-5" />
                </div>

                <div>
                  <h3 className="font-serif-cormorant text-2xl sm:text-3xl text-stone-900 font-semibold">
                    {evt.title}
                  </h3>
                  <p className="text-xs uppercase tracking-wider font-semibold text-rose-500 mt-1">
                    {new Date(evt.date).toLocaleDateString('id-ID', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>

                <div className="space-y-1 text-xs text-stone-600 border-t border-b border-rose-100 py-3">
                  <p className="font-medium text-stone-800">
                    🕒 Pukul: {evt.startTime || '08:00 WIB'} - {evt.endTime || 'Selesai'}
                  </p>
                  <p className="font-medium text-stone-800">
                    📍 Lokasi: {evt.venue}
                  </p>
                  {evt.address && (
                    <p className="text-stone-500 font-light pt-0.5">{evt.address}</p>
                  )}
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2.5">
                  <AddToCalendarButton
                    title={`${evt.title} - ${invitation.groomName} & ${invitation.brideName}`}
                    description={`Pernikahan ${invitation.groomName} & ${invitation.brideName}. Waktu: ${evt.startTime || '08:00'} WIB. Lokasi: ${evt.venue}`}
                    location={`${evt.venue}, ${evt.address || ''}`}
                    startDate={evt.date}
                    startTime={evt.startTime}
                    endTime={evt.endTime}
                    themeSlug="blossom"
                  />
                  {evt.mapUrl && (
                    <a
                      href={evt.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-white border border-rose-200 hover:bg-rose-50 text-rose-700 text-xs font-medium shadow-xs transition-colors"
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
          LOVE STORY TIMELINE SECTION
         ───────────────────────────────────────────── */}
      {sectionConfig.story && loveStory.length > 0 && (
        <section id="story" className="py-20 sm:py-28 px-6 max-w-4xl mx-auto text-center">
          <div className="mb-14 space-y-2">
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-rose-500">
              Perjalanan Kami
            </span>
            <h2 className="font-serif-cormorant text-3xl sm:text-5xl text-stone-900 font-normal">
              Kisah Cinta Manis
            </h2>
          </div>

          <div className="space-y-8 relative before:absolute before:inset-0 before:left-1/2 before:-translate-x-1/2 before:w-0.5 before:bg-rose-200">
            {loveStory.map((story, idx) => (
              <div
                key={story.id || idx}
                className="relative z-10 bg-white/95 p-6 sm:p-8 rounded-3xl border border-rose-200/70 shadow-sm max-w-lg mx-auto text-center space-y-2"
              >
                <div className="w-8 h-8 rounded-full bg-rose-500 text-white text-xs font-bold flex items-center justify-center mx-auto shadow-xs">
                  {idx + 1}
                </div>
                {story.date && (
                  <span className="text-xs font-semibold text-rose-500 block">
                    {story.date}
                  </span>
                )}
                <h3 className="font-serif-cormorant text-xl sm:text-2xl font-bold text-stone-900">
                  {story.title}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
                  {story.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────
          FLOATING SAKURA PETALS PARTICLES
         ───────────────────────────────────────────── */}
      <FloatingParticles themeSlug="blossom" />

      {/* ─────────────────────────────────────────────
          GALLERY PREWEDDING SECTION (LIGHTBOX POPUP)
         ───────────────────────────────────────────── */}
      {sectionConfig.gallery && gallery.length > 0 && (
        <section id="gallery" className="py-20 px-6 max-w-5xl mx-auto text-center">
          <div className="mb-12 space-y-2">
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-rose-500">
              Galeri Kenangan
            </span>
            <h2 className="font-serif-cormorant text-3xl sm:text-5xl text-stone-900 font-normal">
              Momen Bahagia Bersama
            </h2>
            <p className="text-xs text-stone-500 font-light">Klik foto untuk melihat dalam layar penuh</p>
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
          SHARED SECTIONS (AMPLOP DIGITAL, RSVP, BUKU TAMU)
         ───────────────────────────────────────────── */}
      <PublicSharedSections data={data} isDark={false} />
    </div>
  )
}
