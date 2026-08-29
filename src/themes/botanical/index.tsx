'use client'

import { ThemeData } from '@/modules/theme/types/theme-data'
import { CountdownTimer } from '@/components/public/CountdownTimer'
import { PublicSharedSections } from '@/components/public/PublicSharedSections'
import { MapPin, Calendar, Clock, Compass, Sparkles } from 'lucide-react'

export default function BotanicalTheme({ data }: { data: ThemeData }) {
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
    <div className="min-h-screen bg-[#07130a] text-[#e2f0d9] font-sans selection:bg-emerald-600 selection:text-white relative overflow-x-hidden">
      {/* Ambient Forest & Emerald Glow Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-emerald-900/30 rounded-full blur-[160px]"></div>
        <div className="absolute bottom-1/4 -left-40 w-[600px] h-[600px] bg-[#1a4329]/40 rounded-full blur-[140px]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#10b981_0.5px,transparent_0.5px)] opacity-[0.05] [background-size:28px_28px]"></div>
      </div>

      {/* ─── 1. HERO SECTION (Full-Width Fashion Editorial Cover) ─── */}
      {sectionConfig.hero && (
        <section className="relative z-10 min-h-screen flex flex-col justify-between p-6 sm:p-12 md:p-20 bg-gradient-to-b from-[#0b1f11] via-[#07130a] to-[#07130a]">
          <div className="flex items-center justify-between border-b border-emerald-800/40 pb-6">
            <span className="text-xs uppercase tracking-[0.4em] text-emerald-400 font-medium">
              Botanical Luxury Edition
            </span>
            <span className="text-xs font-serif italic text-emerald-300">
              {eventDateFormatted || 'The Wedding Day'}
            </span>
          </div>

          {/* Full-width Oversized Editorial Typography */}
          <div className="my-auto py-12">
            <span className="text-xs sm:text-sm uppercase tracking-[0.5em] text-emerald-400 block mb-4">
              {invitation.openingTitle || 'THE WEDDING CELEBRATION OF'}
            </span>
            <h1 className="text-5xl sm:text-7xl md:text-9xl font-serif font-light text-white tracking-tight leading-none uppercase">
              {invitation.groomName}
              <span className="inline-block text-emerald-400 font-serif italic font-normal text-4xl sm:text-6xl md:text-8xl mx-3 sm:mx-6">
                &amp;
              </span>
              {invitation.brideName}
            </h1>

            {invitation.openingText && (
              <p className="mt-8 text-emerald-200/80 max-w-xl text-sm sm:text-base leading-relaxed font-light">
                {invitation.openingText}
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-6 border-t border-emerald-800/40 gap-4">
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-emerald-300">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Scroll to Explore</span>
            </div>
            {eventDateFormatted && (
              <div className="text-xs uppercase tracking-widest text-emerald-400 font-medium">
                {eventDateFormatted}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ─── 2. QUOTE SECTION (Wide Minimalist Botanical Banner) ─── */}
      {sectionConfig.quote && invitation.quote && (
        <section className="relative z-10 py-24 px-6 sm:px-12 bg-[#0b1d10] border-y border-emerald-900/50">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-3xl text-emerald-400 mb-6 block font-serif">❦</span>
            <blockquote className="text-2xl sm:text-3xl md:text-4xl font-serif font-light italic text-white leading-relaxed">
              “{invitation.quote}”
            </blockquote>
            {invitation.quoteSource && (
              <cite className="block mt-6 text-xs sm:text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400 not-italic">
                — {invitation.quoteSource} —
              </cite>
            )}
          </div>
        </section>
      )}

      {/* ─── 3. COUPLE SECTION (Alternating Full-Width Editorial Layout) ─── */}
      {sectionConfig.couple && (
        <section className="relative z-10 py-24 sm:py-32 px-6 sm:px-12 md:px-20 space-y-24 sm:space-y-36">
          <div className="max-w-7xl mx-auto">
            <div className="mb-20">
              <span className="text-xs uppercase tracking-[0.4em] text-emerald-400 block mb-2">The Protagonists</span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-light text-white">Kedua Mempelai</h2>
            </div>

            {/* Groom Row (Photo Left, Text Right) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center">
              <div className="md:col-span-6 lg:col-span-5">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-emerald-700/40 bg-[#0d2414] relative group">
                  {invitation.groomPhoto ? (
                    <img
                      src={invitation.groomPhoto}
                      alt="Groom"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-emerald-500">Portrait of Groom</div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07130a] via-transparent to-transparent opacity-60"></div>
                </div>
              </div>

              <div className="md:col-span-6 lg:col-span-7 space-y-4">
                <span className="text-xs uppercase tracking-[0.3em] font-medium text-emerald-400">The Groom</span>
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white font-light">
                  {invitation.groomFullName || invitation.groomName}
                </h3>
                <div className="w-20 h-0.5 bg-emerald-600/60 my-4"></div>
                {(invitation.groomFather || invitation.groomMother) && (
                  <p className="text-sm sm:text-base text-emerald-200/80 leading-relaxed font-light">
                    Putra tercinta dari pasangan yang berbahagia: <br />
                    <strong className="text-white font-medium">Bapak {invitation.groomFather || '-'}</strong> &amp; <br />
                    <strong className="text-white font-medium">Ibu {invitation.groomMother || '-'}</strong>
                  </p>
                )}
              </div>
            </div>

            {/* Bride Row (Photo Right, Text Left - Alternating) */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-center mt-20 sm:mt-32">
              <div className="md:col-span-6 lg:col-span-7 space-y-4 order-2 md:order-1 md:text-right">
                <span className="text-xs uppercase tracking-[0.3em] font-medium text-emerald-400">The Bride</span>
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white font-light">
                  {invitation.brideFullName || invitation.brideName}
                </h3>
                <div className="w-20 h-0.5 bg-emerald-600/60 my-4 md:ml-auto"></div>
                {(invitation.brideFather || invitation.brideMother) && (
                  <p className="text-sm sm:text-base text-emerald-200/80 leading-relaxed font-light">
                    Putri tercinta dari pasangan yang berbahagia: <br />
                    <strong className="text-white font-medium">Bapak {invitation.brideFather || '-'}</strong> &amp; <br />
                    <strong className="text-white font-medium">Ibu {invitation.brideMother || '-'}</strong>
                  </p>
                )}
              </div>

              <div className="md:col-span-6 lg:col-span-5 order-1 md:order-2">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-emerald-700/40 bg-[#0d2414] relative group">
                  {invitation.bridePhoto ? (
                    <img
                      src={invitation.bridePhoto}
                      alt="Bride"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-emerald-500">Portrait of Bride</div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07130a] via-transparent to-transparent opacity-60"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─── 4. COUNTDOWN SECTION ─── */}
      {sectionConfig.countdown && primaryEvent && (
        <section className="relative z-10 py-20 px-6 sm:px-12 bg-gradient-to-r from-[#0d2414] via-[#10331b] to-[#0d2414] border-y border-emerald-800/40">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-xs uppercase tracking-[0.3em] text-emerald-300 font-medium">The Countdown</span>
            <h2 className="text-3xl font-serif font-light text-white mt-1 mb-10">Menghitung Hari Bahagia</h2>
            <CountdownTimer targetDate={primaryEvent.date} isDark={true} />
          </div>
        </section>
      )}

      {/* ─── 5. EVENTS SECTION (Alternating Magazine Schedule Cards) ─── */}
      {sectionConfig.events && events.length > 0 && (
        <section className="relative z-10 py-24 sm:py-32 px-6 sm:px-12 md:px-20">
          <div className="max-w-6xl mx-auto">
            <div className="mb-20">
              <span className="text-xs uppercase tracking-[0.4em] text-emerald-400 block mb-2">Save The Date</span>
              <h2 className="text-4xl sm:text-5xl font-serif font-light text-white">Rangkaian Acara</h2>
            </div>

            <div className="space-y-12">
              {events.map((evt, idx) => {
                const isEven = idx % 2 === 0
                return (
                  <div
                    key={evt.id}
                    className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 sm:p-12 rounded-3xl border border-emerald-800/40 bg-[#0c1f12]/80 backdrop-blur-md shadow-2xl ${
                      !isEven ? 'lg:flex-row-reverse' : ''
                    }`}
                  >
                    <div className="lg:col-span-7 space-y-4">
                      <span className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-400">
                        Acara 0{idx + 1}
                      </span>
                      <h3 className="text-3xl sm:text-4xl font-serif text-white font-light">{evt.title}</h3>
                      
                      <div className="space-y-2 pt-4 text-sm text-emerald-200/90">
                        <div className="flex items-center gap-3">
                          <Calendar className="w-4 h-4 text-emerald-400 shrink-0" />
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
                            <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                            <span>{evt.startTime || '09:00'} - {evt.endTime || 'Selesai'} WIB</span>
                          </div>
                        )}
                        <div className="flex items-start gap-3">
                          <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <div>
                            <strong className="text-white block">{evt.venue}</strong>
                            {evt.address && <span className="text-emerald-300/70 text-xs block">{evt.address}</span>}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-5 flex flex-col justify-center">
                      {evt.mapUrl && (
                        <a
                          href={evt.mapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold uppercase tracking-widest transition-colors shadow-lg shadow-emerald-950/50"
                        >
                          <Compass className="w-4 h-4" />
                          <span>Petunjuk Google Maps</span>
                        </a>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ─── 6. LOVE STORY SECTION ─── */}
      {sectionConfig.story && loveStory.length > 0 && (
        <section className="relative z-10 py-24 px-6 sm:px-12 bg-[#09180d] border-y border-emerald-900/50">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-xs uppercase tracking-[0.4em] text-emerald-400">Chronicles</span>
              <h2 className="text-3xl sm:text-4xl font-serif font-light text-white mt-1">Kisah Cinta Kami</h2>
            </div>

            <div className="space-y-8">
              {loveStory.map((story) => (
                <div key={story.id} className="p-8 rounded-2xl border border-emerald-800/30 bg-[#0c1f12]">
                  {story.date && (
                    <span className="text-xs uppercase tracking-widest text-emerald-400 font-semibold mb-2 block">
                      {story.date}
                    </span>
                  )}
                  <h3 className="text-2xl font-serif text-white mb-2">{story.title}</h3>
                  <p className="text-sm text-emerald-200/80 leading-relaxed font-light">{story.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── 7. GALLERY SECTION (Full-Width Fashion Grid) ─── */}
      {sectionConfig.gallery && gallery.length > 0 && (
        <section className="relative z-10 py-24 sm:py-32 px-6 sm:px-12 md:px-20">
          <div className="max-w-7xl mx-auto">
            <div className="mb-16">
              <span className="text-xs uppercase tracking-[0.4em] text-emerald-400 block mb-2">Visual Editorial</span>
              <h2 className="text-4xl sm:text-5xl font-serif font-light text-white">Galeri Foto</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {gallery.map((item, idx) => (
                <div
                  key={item.id}
                  className={`rounded-2xl overflow-hidden border border-emerald-800/40 bg-[#0d2414] group relative ${
                    idx === 0 ? 'sm:col-span-2 aspect-[16/9]' : 'aspect-square'
                  }`}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.caption || `Gallery ${idx + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {item.caption && (
                    <div className="absolute inset-0 bg-gradient-to-t from-[#07130a] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                      <p className="text-white text-sm font-serif italic">{item.caption}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── 8. SHARED SECTIONS (Dark Mode RSVP, Wishes, Gifts, Share) ─── */}
      <PublicSharedSections data={data} isDark={true} />
    </div>
  )
}
