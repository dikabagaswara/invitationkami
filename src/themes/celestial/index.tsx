'use client'

import { ThemeData } from '@/modules/theme/types/theme-data'
import { CountdownTimer } from '@/components/public/CountdownTimer'
import { PublicSharedSections } from '@/components/public/PublicSharedSections'
import { MapPin, Calendar, Clock, Compass, Sparkles, Star, Moon, Heart } from 'lucide-react'

export default function CelestialTheme({ data }: { data: ThemeData }) {
  const { invitation, events, gallery, loveStory, weddingGifts } = data
  const { sectionConfig } = invitation

  const primaryEvent = events[0]
  const eventDateFormatted = primaryEvent
    ? new Date(primaryEvent.date).toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : ''

  return (
    <div className="min-h-screen bg-[#070514] text-[#E0DCFC] font-sans selection:bg-[#7C3AED] selection:text-white relative overflow-x-hidden">
      {/* ─── AMBIENT STARFIELD & NEBULA GLOW ─── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 left-1/4 w-[700px] h-[700px] bg-purple-900/25 rounded-full blur-[170px] animate-pulse"></div>
        <div className="absolute top-1/2 -right-40 w-[600px] h-[600px] bg-indigo-950/35 rounded-full blur-[160px]"></div>
        <div className="absolute bottom-10 left-10 w-[700px] h-[700px] bg-violet-950/30 rounded-full blur-[180px]"></div>
        {/* Starfield twinkling particles */}
        <div className="absolute inset-0 bg-[radial-gradient(#c084fc_0.75px,transparent_0.75px)] opacity-[0.12] [background-size:32px_32px]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#fbbf24_0.5px,transparent_0.5px)] opacity-[0.08] [background-size:48px_48px]"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-24 sm:space-y-36">
        {/* ─── 1. HERO SECTION (Celestial Moon Gateway) ─── */}
        {sectionConfig.hero && (
          <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center">
            {/* Celestial Circular Orbit Ring Glow */}
            <div className="relative w-full max-w-3xl rounded-[3rem] p-8 sm:p-16 backdrop-blur-2xl bg-[#140F2D]/85 border border-[#8B5CF6]/30 shadow-[0_0_60px_rgba(139,92,246,0.15)] overflow-hidden">
              <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>

              {/* Starlight Pill Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#261A4E]/80 border border-[#A78BFA]/30 text-[#C4B5FD] text-xs font-semibold uppercase tracking-[0.3em] mb-8 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#FBBF24] animate-spin" />
                <span>{invitation.openingTitle || 'THE WEDDING CELEBRATION'}</span>
                <Moon className="w-3.5 h-3.5 text-[#C4B5FD]" />
              </div>

              {/* Couple Avatar with Cosmic Golden Halo */}
              {(gallery[0]?.imageUrl || invitation.groomPhoto || invitation.bridePhoto) && (
                <div className="relative mx-auto mb-8 w-36 h-36 sm:w-48 sm:h-48 rounded-full p-1.5 bg-gradient-to-tr from-[#8B5CF6] via-[#FBBF24] to-[#EC4899] shadow-2xl shadow-purple-900/50">
                  <div className="w-full h-full rounded-full overflow-hidden backdrop-blur-sm bg-[#0A071B]">
                    <img
                      src={gallery[0]?.imageUrl || invitation.groomPhoto || invitation.bridePhoto || '/placeholder.jpg'}
                      alt="Couple"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="absolute bottom-1 right-2 bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] text-white p-2 rounded-full shadow-lg shadow-purple-900/50">
                    <Star className="w-4 h-4 fill-current text-[#FBBF24]" />
                  </div>
                </div>
              )}

              <div className="space-y-2 my-4">
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif text-white tracking-wide leading-tight">
                  <span className="bg-gradient-to-r from-[#DDD6FE] via-white to-[#FDE68A] bg-clip-text text-transparent">
                    {invitation.groomName}
                  </span>
                </h1>
                <span className="block text-2xl sm:text-3xl font-light italic text-[#A78BFA] my-2 font-serif">
                  ✧ &amp; ✧
                </span>
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif text-white tracking-wide leading-tight">
                  <span className="bg-gradient-to-r from-[#FDE68A] via-white to-[#DDD6FE] bg-clip-text text-transparent">
                    {invitation.brideName}
                  </span>
                </h1>
              </div>

              {eventDateFormatted && (
                <div className="inline-flex items-center gap-2 mt-6 px-6 py-2 rounded-full border border-[#8B5CF6]/40 bg-[#1D143D]/80 text-[#FDE68A] font-medium text-xs sm:text-sm tracking-widest uppercase shadow-inner">
                  <Calendar className="w-4 h-4 text-[#FBBF24]" />
                  <span>{eventDateFormatted}</span>
                </div>
              )}

              {invitation.openingText && (
                <p className="mt-8 text-[#C4B5FD]/90 max-w-lg mx-auto text-sm sm:text-base leading-relaxed font-light">
                  {invitation.openingText}
                </p>
              )}
            </div>
          </section>
        )}

        {/* ─── 2. QUOTE SECTION (Starlight Constellation Banner) ─── */}
        {sectionConfig.quote && invitation.quote && (
          <section className="relative">
            <div className="rounded-3xl p-8 sm:p-12 backdrop-blur-xl bg-[#140F2D]/60 border border-[#8B5CF6]/30 shadow-xl text-center relative overflow-hidden">
              <div className="flex items-center justify-center gap-2 text-[#FBBF24] mb-4">
                <span>✦</span>
                <span className="text-xl">✧</span>
                <span>✦</span>
              </div>
              <blockquote className="text-xl sm:text-2xl font-serif italic text-white/90 max-w-2xl mx-auto leading-relaxed">
                “{invitation.quote}”
              </blockquote>
              {invitation.quoteSource && (
                <cite className="block mt-4 text-xs sm:text-sm font-semibold uppercase tracking-[0.3em] text-[#A78BFA] not-italic">
                  — {invitation.quoteSource} —
                </cite>
              )}
            </div>
          </section>
        )}

        {/* ─── 3. COUPLE SECTION (Celestial Star Portal Cards) ─── */}
        {sectionConfig.couple && (
          <section className="space-y-12">
            <div className="text-center">
              <span className="text-xs uppercase tracking-[0.4em] font-semibold text-[#A78BFA]">Celestial Souls</span>
              <h2 className="text-3xl sm:text-4xl font-serif text-white mt-2">Kedua Mempelai</h2>
              <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#8B5CF6] to-transparent mx-auto mt-4"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {/* Groom Cosmic Portal Card */}
              <div className="rounded-3xl p-8 sm:p-10 backdrop-blur-xl bg-[#140F2D]/70 border border-[#8B5CF6]/30 shadow-2xl flex flex-col items-center text-center transition-all duration-500 hover:border-[#A78BFA]/60 hover:shadow-[0_0_40px_rgba(139,92,246,0.25)]">
                <div className="w-48 h-60 rounded-2xl overflow-hidden shadow-xl mb-6 border-2 border-[#A78BFA]/40 bg-[#1D143D] relative group">
                  {invitation.groomPhoto ? (
                    <img src={invitation.groomPhoto} alt="Groom" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#A78BFA]">Foto Groom</div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A071B]/80 via-transparent to-transparent"></div>
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                  {invitation.groomFullName || invitation.groomName}
                </h3>
                <span className="text-xs font-semibold text-[#FBBF24] uppercase tracking-widest mt-1 mb-4">Mempelai Pria</span>
                {(invitation.groomFather || invitation.groomMother) && (
                  <p className="text-sm text-[#C4B5FD]/80 leading-relaxed mt-auto font-light">
                    Putra tercinta dari: <br />
                    <strong className="text-white font-medium">Bapak {invitation.groomFather || '-'}</strong> &amp; <br />
                    <strong className="text-white font-medium">Ibu {invitation.groomMother || '-'}</strong>
                  </p>
                )}
              </div>

              {/* Bride Cosmic Portal Card */}
              <div className="rounded-3xl p-8 sm:p-10 backdrop-blur-xl bg-[#140F2D]/70 border border-[#8B5CF6]/30 shadow-2xl flex flex-col items-center text-center transition-all duration-500 hover:border-[#A78BFA]/60 hover:shadow-[0_0_40px_rgba(139,92,246,0.25)]">
                <div className="w-48 h-60 rounded-2xl overflow-hidden shadow-xl mb-6 border-2 border-[#A78BFA]/40 bg-[#1D143D] relative group">
                  {invitation.bridePhoto ? (
                    <img src={invitation.bridePhoto} alt="Bride" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#A78BFA]">Foto Bride</div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A071B]/80 via-transparent to-transparent"></div>
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                  {invitation.brideFullName || invitation.brideName}
                </h3>
                <span className="text-xs font-semibold text-[#FBBF24] uppercase tracking-widest mt-1 mb-4">Mempelai Wanita</span>
                {(invitation.brideFather || invitation.brideMother) && (
                  <p className="text-sm text-[#C4B5FD]/80 leading-relaxed mt-auto font-light">
                    Putri tercinta dari: <br />
                    <strong className="text-white font-medium">Bapak {invitation.brideFather || '-'}</strong> &amp; <br />
                    <strong className="text-white font-medium">Ibu {invitation.brideMother || '-'}</strong>
                  </p>
                )}
              </div>
            </div>
          </section>
        )}

        {/* ─── 4. COUNTDOWN SECTION ─── */}
        {sectionConfig.countdown && primaryEvent && (
          <section className="relative">
            <div className="rounded-3xl p-8 sm:p-12 backdrop-blur-xl bg-gradient-to-r from-[#21134E]/90 via-[#2E186B]/90 to-[#21134E]/90 text-white shadow-2xl shadow-purple-950/80 text-center border border-[#8B5CF6]/40">
              <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#FDE68A]">Constellation Aligning</span>
              <h2 className="text-2xl sm:text-3xl font-serif mt-1 mb-8">Hitung Mundur Acara</h2>
              <CountdownTimer targetDate={primaryEvent.date} isDark={true} />
            </div>
          </section>
        )}

        {/* ─── 5. EVENTS SECTION (Cosmic Starlight Timeline) ─── */}
        {sectionConfig.events && events.length > 0 && (
          <section className="space-y-12">
            <div className="text-center">
              <span className="text-xs uppercase tracking-[0.4em] font-semibold text-[#A78BFA]">Sacred Moments</span>
              <h2 className="text-3xl sm:text-4xl font-serif text-white mt-2">Rangkaian Acara</h2>
              <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#8B5CF6] to-transparent mx-auto mt-4"></div>
            </div>

            <div className={`grid grid-cols-1 ${events.length > 1 ? 'md:grid-cols-2' : 'max-w-2xl mx-auto'} gap-8`}>
              {events.map((evt) => (
                <div
                  key={evt.id}
                  className="rounded-3xl p-8 sm:p-10 backdrop-blur-xl bg-[#140F2D]/75 border border-[#8B5CF6]/30 shadow-2xl flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:border-[#A78BFA]/70"
                >
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#261A4E] text-[#FDE68A] text-xs font-semibold uppercase tracking-wider mb-4 border border-[#8B5CF6]/30">
                      <Star className="w-3.5 h-3.5 text-[#FBBF24]" />
                      <span>{evt.title}</span>
                    </div>

                    <h3 className="text-2xl font-serif font-bold text-white mb-4">{evt.title}</h3>

                    <div className="space-y-3 text-sm text-[#C4B5FD]/90 mb-6">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-4 h-4 text-[#FBBF24] shrink-0" />
                        <span>
                          {new Date(evt.date).toLocaleDateString('id-ID', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                      {(evt.startTime || evt.endTime) && (
                        <div className="flex items-center gap-3">
                          <Clock className="w-4 h-4 text-[#FBBF24] shrink-0" />
                          <span>{evt.startTime || '09:00'} - {evt.endTime || 'Selesai'} WIB</span>
                        </div>
                      )}
                      <div className="flex items-start gap-3">
                        <MapPin className="w-4 h-4 text-[#FBBF24] shrink-0 mt-1" />
                        <div>
                          <strong className="text-white block">{evt.venue}</strong>
                          {evt.address && <span className="text-[#A78BFA] text-xs block mt-0.5">{evt.address}</span>}
                        </div>
                      </div>
                    </div>
                  </div>

                  {evt.mapUrl && (
                    <a
                      href={evt.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-[#A855F7] hover:from-[#6D28D9] hover:to-[#9333EA] text-white text-xs font-semibold uppercase tracking-widest shadow-lg shadow-purple-900/50 transition-all active:scale-[0.99]"
                    >
                      <Compass className="w-4 h-4" />
                      <span>Petunjuk Lokasi (Google Maps)</span>
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ─── 6. LOVE STORY SECTION ─── */}
        {sectionConfig.story && loveStory.length > 0 && (
          <section className="space-y-12">
            <div className="text-center">
              <span className="text-xs uppercase tracking-[0.4em] font-semibold text-[#A78BFA]">Our Universe</span>
              <h2 className="text-3xl sm:text-4xl font-serif text-white mt-2">Kisah Cinta Kami</h2>
            </div>

            <div className="space-y-6 max-w-3xl mx-auto">
              {loveStory.map((story) => (
                <div key={story.id} className="rounded-2xl p-6 sm:p-8 backdrop-blur-xl bg-[#140F2D]/60 border border-[#8B5CF6]/30">
                  {story.date && (
                    <span className="inline-block px-3 py-1 rounded-full bg-[#261A4E] text-[#FDE68A] text-xs font-semibold mb-2 border border-[#8B5CF6]/20">
                      ✧ {story.date}
                    </span>
                  )}
                  <h3 className="text-xl font-serif font-bold text-white mb-2">{story.title}</h3>
                  <p className="text-sm text-[#C4B5FD]/80 leading-relaxed font-light">{story.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ─── 7. GALLERY SECTION (Cosmic Midnight Starlight Grid) ─── */}
        {sectionConfig.gallery && gallery.length > 0 && (
          <section className="space-y-12">
            <div className="text-center">
              <span className="text-xs uppercase tracking-[0.4em] font-semibold text-[#A78BFA]">Starlit Memories</span>
              <h2 className="text-3xl sm:text-4xl font-serif text-white mt-2">Galeri Foto</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {gallery.map((item, idx) => (
                <div
                  key={item.id}
                  className={`rounded-2xl overflow-hidden border border-[#8B5CF6]/30 bg-[#140F2D] group relative shadow-lg shadow-purple-950/40 ${
                    idx === 0 ? 'col-span-2 md:col-span-2 aspect-[16/9]' : 'aspect-square'
                  }`}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.caption || `Gallery ${idx + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {item.caption && (
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A071B]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <p className="text-white text-xs sm:text-sm font-serif italic">{item.caption}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ─── 8. SHARED SECTIONS (Dark Mode RSVP, Wishes, Gifts, Share) ─── */}
        <PublicSharedSections data={data} isDark={true} />
      </div>
    </div>
  )
}
