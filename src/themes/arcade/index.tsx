'use client'

import { PublicSharedSections } from '@/components/public/PublicSharedSections'
import { CountdownTimer } from '@/components/public/CountdownTimer'
import { HeroCouplePhoto } from '@/components/public/HeroCouplePhoto'
import { ThemeData } from '@/modules/theme/types/theme-data'
import { 
  Gamepad2, 
  Heart, 
  Sparkles, 
  Trophy, 
  Calendar, 
  MapPin, 
  Swords, 
  ShieldCheck, 
  Coins, 
  Zap, 
  Flame 
} from 'lucide-react'

export default function ArcadeTheme({ data }: { data: ThemeData }) {
  const { invitation, events, gallery, loveStory, weddingGifts, guestMessages, guestName } = data
  const { sectionConfig } = invitation

  const primaryEvent = events[0]
  const receptionEvent = events[1] || events[0]
  const couplePhoto = invitation.heroPhoto || invitation.coverPhoto || gallery[0]?.imageUrl || invitation.groomPhoto || invitation.bridePhoto

  return (
    <div className="relative min-h-screen bg-[#070913] text-stone-100 font-mono selection:bg-[#ec4899] selection:text-white overflow-x-hidden">
      {/* ─────────────────────────────────────────────
          PIXEL ART & ARCADE CSS STYLES & KEYFRAMES
         ───────────────────────────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Silkscreen:wght@400;700&family=VT323&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        
        .font-pixel-title { font-family: 'Press Start 2P', monospace; }
        .font-pixel-sub { font-family: 'Silkscreen', monospace; }
        .font-pixel-body { font-family: 'VT323', monospace; }
        .font-ui { font-family: 'Plus Jakarta Sans', sans-serif; }

        @keyframes coinRotate {
          0%, 100% { transform: rotateY(0deg); }
          50% { transform: rotateY(180deg); }
        }

        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(1000%); }
        }

        @keyframes pixelFlicker {
          0%, 100% { opacity: 1; text-shadow: 0 0 10px #38bdf8, 0 0 20px #ec4899; }
          50% { opacity: 0.9; text-shadow: 0 0 4px #38bdf8; }
        }

        .animate-coin {
          animation: coinRotate 3s infinite linear;
        }

        .animate-flicker {
          animation: pixelFlicker 3s infinite ease-in-out;
        }

        /* 8-bit Pixel Border Box */
        .pixel-box {
          border: 4px solid #38bdf8;
          box-shadow: 
            inset -4px -4px 0px 0px #0284c7,
            inset 4px 4px 0px 0px #7dd3fc,
            0 0 20px rgba(56, 189, 248, 0.25);
        }

        .pixel-box-rose {
          border: 4px solid #f43f5e;
          box-shadow: 
            inset -4px -4px 0px 0px #be123c,
            inset 4px 4px 0px 0px #fda4af,
            0 0 20px rgba(244, 63, 94, 0.25);
        }

        .pixel-box-gold {
          border: 4px solid #fbbf24;
          box-shadow: 
            inset -4px -4px 0px 0px #d97706,
            inset 4px 4px 0px 0px #fef08a,
            0 0 20px rgba(251, 191, 36, 0.25);
        }
      `}</style>

      {/* ─── RETRO GRID BACKGROUND & SCANLINES ─── */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20 bg-[linear-gradient(to_right,#38bdf8_1px,transparent_1px),linear-gradient(to_bottom,#38bdf8_1px,transparent_1px)] bg-[size:32px_32px]"></div>
      
      {/* ─── TOP ARCADE HUD BAR ─── */}
      <header className="sticky top-0 z-30 w-full bg-[#0a0f1d]/90 border-b-2 border-[#38bdf8]/40 backdrop-blur-md px-4 py-2.5 flex items-center justify-between text-xs font-pixel-sub">
        <div className="flex items-center gap-2 text-cyan-400">
          <Gamepad2 className="w-4 h-4 animate-pulse" />
          <span className="hidden sm:inline">STAGE: WEDDING QUEST</span>
          <span className="sm:hidden">STAGE 1</span>
        </div>
        <div className="flex items-center gap-3 text-[11px]">
          <span className="text-rose-400 flex items-center gap-1">
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 animate-pulse" /> x99
          </span>
          <span className="text-amber-400 flex items-center gap-1">
            <Coins className="w-3.5 h-3.5 animate-coin" /> 9999
          </span>
        </div>
      </header>

      {/* ─────────────────────────────────────────────
          1. HERO SECTION (GAME START SCREEN)
         ───────────────────────────────────────────── */}
      {sectionConfig.hero && (
        <section id="hero" className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6 text-center">
          <div className="max-w-2xl w-full pixel-box bg-[#0c1222]/95 p-6 sm:p-10 rounded-2xl space-y-6">
            
            {/* Top Pixel Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1e1b4b] border border-[#818cf8] text-[#818cf8] text-xs font-pixel-sub rounded">
              <Sparkles className="w-3.5 h-3.5" />
              <span>PLAYER 1 &amp; PLAYER 2 READY</span>
            </div>

            {/* Couple Feature Focus Photo */}
            <div className="py-2">
              <HeroCouplePhoto
                photoUrl={couplePhoto}
                groomName={invitation.groomName}
                brideName={invitation.brideName}
                themeSlug="arcade"
                frameVariant="double-ring"
              />
            </div>

            {/* Couple Names */}
            <div className="space-y-3">
              <h1 className="font-pixel-title text-2xl sm:text-4xl md:text-5xl text-cyan-400 leading-relaxed tracking-wider animate-flicker">
                {invitation.groomName}
              </h1>
              <div className="text-rose-500 text-xl sm:text-2xl font-pixel-title flex items-center justify-center gap-2">
                <span>❤️</span>
                <span>LEVEL UP</span>
                <span>❤️</span>
              </div>
              <h1 className="font-pixel-title text-2xl sm:text-4xl md:text-5xl text-pink-400 leading-relaxed tracking-wider animate-flicker">
                {invitation.brideName}
              </h1>
            </div>

            {/* Event Date HUD */}
            {primaryEvent && (
              <div className="pt-4 border-t-2 border-dashed border-[#38bdf8]/30 font-pixel-sub text-xs sm:text-sm text-cyan-200">
                <p>
                  📅 EVENT TIME:{' '}
                  <span className="text-amber-300">
                    {new Date(primaryEvent.date).toLocaleDateString('id-ID', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </p>
                <p className="text-[11px] text-stone-400 mt-1">📍 ZONE: {primaryEvent.venue}</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────
          2. QUOTE / QUEST DIALOGUE BOX
         ───────────────────────────────────────────── */}
      {sectionConfig.quote && invitation.quote && (
        <section className="relative z-10 py-16 px-4 max-w-3xl mx-auto">
          <div className="pixel-box-gold bg-[#0f172a]/95 p-6 sm:p-8 rounded-xl space-y-3">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-pixel-sub">
              <Trophy className="w-4 h-4" />
              <span>[DIALOGUE BOX — SACRED VOWS]</span>
            </div>
            <p className="font-pixel-body text-2xl sm:text-3xl text-stone-200 leading-relaxed">
              &quot;{invitation.quote}&quot;
            </p>
            {invitation.quoteSource && (
              <p className="text-right text-xs font-pixel-sub text-amber-400 pt-2">
                — {invitation.quoteSource} —
              </p>
            )}
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────
          3. COUPLE SECTION (PLAYER STATS / CHARACTER SELECT)
         ───────────────────────────────────────────── */}
      {sectionConfig.couple && (
        <section id="couple" className="relative z-10 py-20 px-4 max-w-5xl mx-auto">
          <div className="text-center mb-12 space-y-2">
            <span className="text-xs font-pixel-sub text-rose-400 uppercase tracking-widest">
              [CHARACTER PROFILES]
            </span>
            <h2 className="font-pixel-title text-xl sm:text-3xl text-cyan-300">
              MEET THE PLAYERS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Player 1: Groom */}
            <div className="pixel-box bg-[#0c1222]/95 p-6 sm:p-8 rounded-2xl space-y-4 text-center">
              <div className="inline-block px-3 py-1 bg-cyan-950 border border-cyan-500 text-cyan-400 text-[11px] font-pixel-sub rounded">
                PLAYER 1 (GROOM)
              </div>
              <div className="w-36 h-36 sm:w-44 sm:h-44 mx-auto rounded-xl p-1 bg-gradient-to-tr from-cyan-400 to-blue-600 shadow-[0_0_15px_rgba(6,182,212,0.5)] overflow-hidden">
                <img
                  src={invitation.groomPhoto || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80'}
                  alt="Groom"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div>
                <h3 className="font-pixel-title text-lg sm:text-xl text-cyan-300">
                  {invitation.groomName}
                </h3>
                <p className="font-ui text-sm font-semibold text-stone-300 mt-1">
                  {invitation.groomFullName || invitation.groomName}
                </p>
              </div>
              <div className="p-3 bg-[#131b2e] rounded-lg text-xs font-ui text-stone-300 text-left space-y-1 border border-cyan-500/30">
                <p><strong className="text-cyan-400">Class:</strong> The Groom</p>
                {(invitation.groomFather || invitation.groomMother) && (
                  <p><strong className="text-cyan-400">Guild/Parents:</strong> Bapak {invitation.groomFather || '...'} &amp; Ibu {invitation.groomMother || '...'}</p>
                )}
                <p><strong className="text-cyan-400">Special Skill:</strong> Eternal Love &amp; Protection</p>
              </div>
            </div>

            {/* Player 2: Bride */}
            <div className="pixel-box-rose bg-[#0c1222]/95 p-6 sm:p-8 rounded-2xl space-y-4 text-center">
              <div className="inline-block px-3 py-1 bg-rose-950 border border-rose-500 text-rose-400 text-[11px] font-pixel-sub rounded">
                PLAYER 2 (BRIDE)
              </div>
              <div className="w-36 h-36 sm:w-44 sm:h-44 mx-auto rounded-xl p-1 bg-gradient-to-tr from-rose-400 to-pink-600 shadow-[0_0_15px_rgba(244,63,94,0.5)] overflow-hidden">
                <img
                  src={invitation.bridePhoto || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=80'}
                  alt="Bride"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div>
                <h3 className="font-pixel-title text-lg sm:text-xl text-pink-300">
                  {invitation.brideName}
                </h3>
                <p className="font-ui text-sm font-semibold text-stone-300 mt-1">
                  {invitation.brideFullName || invitation.brideName}
                </p>
              </div>
              <div className="p-3 bg-[#1f1422] rounded-lg text-xs font-ui text-stone-300 text-left space-y-1 border border-rose-500/30">
                <p><strong className="text-pink-400">Class:</strong> The Bride</p>
                {(invitation.brideFather || invitation.brideMother) && (
                  <p><strong className="text-pink-400">Guild/Parents:</strong> Bapak {invitation.brideFather || '...'} &amp; Ibu {invitation.brideMother || '...'}</p>
                )}
                <p><strong className="text-pink-400">Special Skill:</strong> Grace, Radiance &amp; Harmony</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────
          4. COUNTDOWN (BOSS RAID / WEDDING TIMER)
         ───────────────────────────────────────────── */}
      {sectionConfig.countdown && primaryEvent && (
        <section className="relative z-10 py-14 px-4 text-center">
          <div className="max-w-2xl mx-auto pixel-box bg-[#0a0f1d]/90 p-8 rounded-2xl space-y-4">
            <span className="text-xs font-pixel-sub text-amber-400 uppercase tracking-widest flex items-center justify-center gap-2">
              <Zap className="w-4 h-4 animate-bounce" /> TIME REMAINING UNTIL THE BIG EVENT
            </span>
            <div className="font-pixel-title text-stone-100">
              <CountdownTimer targetDate={primaryEvent.date} />
            </div>
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────
          5. EVENTS (MAIN QUEST LOCATIONS & BOSS STAGES)
         ───────────────────────────────────────────── */}
      {sectionConfig.events && events.length > 0 && (
        <section id="events" className="relative z-10 py-20 px-4 max-w-5xl mx-auto">
          <div className="text-center mb-12 space-y-2">
            <span className="text-xs font-pixel-sub text-cyan-400 uppercase tracking-widest">
              [EVENT QUEST MAP]
            </span>
            <h2 className="font-pixel-title text-xl sm:text-3xl text-amber-300">
              STAGE SCHEDULE
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {events.map((evt, idx) => (
              <div
                key={evt.id || idx}
                className="pixel-box bg-[#0c1222]/95 p-6 sm:p-8 rounded-2xl space-y-4 text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-cyan-950 border-2 border-cyan-400 mx-auto flex items-center justify-center text-cyan-300 text-xl shadow-[0_0_10px_rgba(6,182,212,0.4)]">
                  <Swords className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-pixel-title text-base sm:text-lg text-cyan-300">
                    {evt.title}
                  </h3>
                  <p className="text-xs font-pixel-sub text-amber-400 mt-2">
                    {new Date(evt.date).toLocaleDateString('id-ID', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>

                <div className="space-y-1 text-xs font-ui text-stone-300 border-t border-b border-cyan-500/20 py-3">
                  <p className="font-semibold text-white">
                    🕒 TIME: {evt.startTime || '08:00 WIB'} - {evt.endTime || 'Selesai'}
                  </p>
                  <p className="font-semibold text-white">📍 ARENA: {evt.venue}</p>
                  {evt.address && <p className="text-stone-400 text-[11px] pt-1">{evt.address}</p>}
                </div>

                {evt.mapUrl && (
                  <a
                    href={evt.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-pixel-sub shadow-[0_0_15px_rgba(6,182,212,0.5)] transition-colors"
                  >
                    <MapPin className="w-3.5 h-3.5" /> OPEN GPS MAP
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────
          6. LOVE STORY (QUEST LOG / ADVENTURE LOG)
         ───────────────────────────────────────────── */}
      {sectionConfig.story && loveStory.length > 0 && (
        <section id="story" className="relative z-10 py-20 px-4 max-w-4xl mx-auto">
          <div className="text-center mb-12 space-y-2">
            <span className="text-xs font-pixel-sub text-pink-400 uppercase tracking-widest">
              [QUEST LOG ARCHIVE]
            </span>
            <h2 className="font-pixel-title text-xl sm:text-3xl text-pink-400">
              OUR LOVE EXP
            </h2>
          </div>

          <div className="space-y-6">
            {loveStory.map((story, idx) => (
              <div
                key={story.id || idx}
                className="pixel-box-rose bg-[#100d20]/95 p-6 rounded-xl space-y-2"
              >
                <div className="flex items-center justify-between text-xs font-pixel-sub text-pink-400">
                  <span>CHAPTER {idx + 1}</span>
                  {story.date && <span>{story.date}</span>}
                </div>
                <h3 className="font-pixel-title text-base sm:text-lg text-white">
                  {story.title}
                </h3>
                <p className="font-ui text-sm text-stone-300 leading-relaxed">
                  {story.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────
          7. GALLERY (SCREENSHOTS / CUTSCENES)
         ───────────────────────────────────────────── */}
      {sectionConfig.gallery && gallery.length > 0 && (
        <section id="gallery" className="relative z-10 py-20 px-4 max-w-5xl mx-auto">
          <div className="text-center mb-12 space-y-2">
            <span className="text-xs font-pixel-sub text-amber-400 uppercase tracking-widest">
              [MEMORY SCREENSHOTS]
            </span>
            <h2 className="font-pixel-title text-xl sm:text-3xl text-cyan-300">
              PHOTO GALLERY
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {gallery.map((item, idx) => (
              <div
                key={item.id || idx}
                className="pixel-box bg-[#0c1222] rounded-xl overflow-hidden group aspect-[4/5] relative"
              >
                <img
                  src={item.imageUrl}
                  alt={item.caption || 'Game Screenshot'}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {item.caption && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4 font-pixel-sub text-xs text-cyan-300">
                    {item.caption}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────
          8. SHARED SECTIONS (GIFT, RSVP, WISHES)
         ───────────────────────────────────────────── */}
      <PublicSharedSections data={data} isDark={true} />
    </div>
  )
}
