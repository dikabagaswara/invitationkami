'use client'

import { ThemeData } from '@/modules/theme/types/theme-data'
import { AddToCalendarButton } from '@/components/public/AddToCalendarButton'
import { CountdownTimer } from '@/components/public/CountdownTimer'
import { PublicSharedSections } from '@/components/public/PublicSharedSections'
import { MapPin, Calendar, Clock, Compass, Heart } from 'lucide-react'

export default function RusticTheme({ data }: { data: ThemeData }) {
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
    <div className="min-h-screen bg-[#FAF6F0] text-[#4A3728] font-serif selection:bg-[#785338] selection:text-white relative">
      {/* Background Kraft Paper Texture Subtle Noise */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(#8C6D53_0.75px,transparent_0.75px)] opacity-[0.08] [background-size:20px_20px]"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-16 sm:space-y-24">
        {/* ─── 1. HERO SECTION (Stacked Organic Paper Card) ─── */}
        {sectionConfig.hero && (
          <section className="relative">
            {/* Background Offset Shadow Card (Stacked Layer effect) */}
            <div className="absolute inset-0 bg-[#E8DDD0] rounded-[2.5rem] rotate-1 translate-y-3 translate-x-2 border border-[#D9CBB9] -z-10 shadow-sm"></div>

            {/* Main Front Card */}
            <div className="bg-[#FFFDF9] rounded-[2.5rem] p-8 sm:p-14 border border-[#D9CBB9] shadow-xl text-center relative overflow-hidden">
              {/* Botanical Line Art Accent Header */}
              <div className="flex items-center justify-center gap-3 text-[#8C6D53] text-xs uppercase tracking-[0.3em] font-semibold mb-6">
                <span>✦</span>
                <span>{invitation.openingTitle || 'The Wedding Celebration'}</span>
                <span>✦</span>
              </div>

              {/* Couple Photo */}
              {(gallery[0]?.imageUrl || invitation.groomPhoto || invitation.bridePhoto) && (
                <div className="relative mx-auto mb-8 w-36 h-36 sm:w-48 sm:h-48 rounded-full p-2 border-2 border-dashed border-[#8C6D53]/60 bg-[#FAF6F0]">
                  <img
                    src={gallery[0]?.imageUrl || invitation.groomPhoto || invitation.bridePhoto || '/placeholder.jpg'}
                    alt="Couple"
                    className="w-full h-full object-cover rounded-full filter sepia-[15%] contrast-[105%]"
                  />
                  <div className="absolute bottom-1 right-2 bg-[#785338] text-[#FAF6F0] p-2 rounded-full shadow-md">
                    <Heart className="w-3.5 h-3.5 fill-current" />
                  </div>
                </div>
              )}

              {/* Typography */}
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif text-[#3E2B1E] tracking-tight leading-tight my-2">
                {invitation.groomName}
                <span className="block text-3xl sm:text-4xl text-[#8C6D53] italic my-2 font-normal">
                  — &amp; —
                </span>
                {invitation.brideName}
              </h1>

              {eventDateFormatted && (
                <div className="inline-block mt-6 px-6 py-2 rounded-full border border-[#D9CBB9] bg-[#FAF6F0] text-[#5C3E28] font-medium text-xs sm:text-sm tracking-wider uppercase">
                  {eventDateFormatted}
                </div>
              )}

              {invitation.openingText && (
                <p className="mt-8 text-[#6B5341] max-w-lg mx-auto text-sm sm:text-base leading-relaxed italic">
                  "{invitation.openingText}"
                </p>
              )}
            </div>
          </section>
        )}

        {/* ─── 2. QUOTE SECTION (Stacked Postcard) ─── */}
        {sectionConfig.quote && invitation.quote && (
          <section className="relative">
            <div className="absolute inset-0 bg-[#E8DDD0] rounded-3xl -rotate-1 translate-y-2 -translate-x-2 border border-[#D9CBB9] -z-10"></div>
            <div className="bg-[#FFFDF9] rounded-3xl p-8 sm:p-12 border border-[#D9CBB9] shadow-lg text-center">
              <div className="text-2xl text-[#8C6D53] mb-3">❧</div>
              <blockquote className="text-lg sm:text-xl font-serif italic text-[#4A3728] leading-relaxed">
                “{invitation.quote}”
              </blockquote>
              {invitation.quoteSource && (
                <cite className="block mt-4 text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-[#785338] not-italic">
                  — {invitation.quoteSource} —
                </cite>
              )}
            </div>
          </section>
        )}

        {/* ─── 3. COUPLE SECTION (Warm Handmade Profile Cards) ─── */}
        {sectionConfig.couple && (
          <section className="space-y-8">
            <div className="text-center">
              <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#8C6D53]">Our Story Begins</span>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#3E2B1E] mt-1">Kedua Mempelai</h2>
              {/* Asymmetric Organic Divider */}
              <div className="flex items-center justify-center gap-2 my-4 text-[#8C6D53]/60">
                <div className="w-16 h-px bg-[#8C6D53]/40"></div>
                <span className="text-xs">🌿</span>
                <div className="w-24 h-px bg-[#8C6D53]/40"></div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Groom Stacked Card */}
              <div className="relative">
                <div className="absolute inset-0 bg-[#E8DDD0] rounded-3xl rotate-1 translate-y-2 border border-[#D9CBB9] -z-10"></div>
                <div className="bg-[#FFFDF9] rounded-3xl p-8 border border-[#D9CBB9] shadow-md flex flex-col items-center text-center h-full">
                  <div className="w-44 h-56 rounded-2xl overflow-hidden shadow-inner mb-6 border-4 border-[#FAF6F0] bg-[#EFE6DB]">
                    {invitation.groomPhoto ? (
                      <img src={invitation.groomPhoto} alt="Groom" className="w-full h-full object-cover filter sepia-[20%]" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#8C6D53]">Foto Groom</div>
                    )}
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-[#3E2B1E]">
                    {invitation.groomFullName || invitation.groomName}
                  </h3>
                  <span className="text-xs font-semibold text-[#785338] uppercase tracking-widest mt-1 mb-4">Mempelai Pria</span>
                  {(invitation.groomFather || invitation.groomMother) && (
                    <p className="text-xs sm:text-sm text-[#6B5341] leading-relaxed mt-auto">
                      Putra dari <br />
                      <strong className="text-[#3E2B1E]">Bapak {invitation.groomFather || '-'}</strong> &amp; <br />
                      <strong className="text-[#3E2B1E]">Ibu {invitation.groomMother || '-'}</strong>
                    </p>
                  )}
                </div>
              </div>

              {/* Bride Stacked Card */}
              <div className="relative">
                <div className="absolute inset-0 bg-[#E8DDD0] rounded-3xl -rotate-1 translate-y-2 border border-[#D9CBB9] -z-10"></div>
                <div className="bg-[#FFFDF9] rounded-3xl p-8 border border-[#D9CBB9] shadow-md flex flex-col items-center text-center h-full">
                  <div className="w-44 h-56 rounded-2xl overflow-hidden shadow-inner mb-6 border-4 border-[#FAF6F0] bg-[#EFE6DB]">
                    {invitation.bridePhoto ? (
                      <img src={invitation.bridePhoto} alt="Bride" className="w-full h-full object-cover filter sepia-[20%]" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#8C6D53]">Foto Bride</div>
                    )}
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-[#3E2B1E]">
                    {invitation.brideFullName || invitation.brideName}
                  </h3>
                  <span className="text-xs font-semibold text-[#785338] uppercase tracking-widest mt-1 mb-4">Mempelai Wanita</span>
                  {(invitation.brideFather || invitation.brideMother) && (
                    <p className="text-xs sm:text-sm text-[#6B5341] leading-relaxed mt-auto">
                      Putri dari <br />
                      <strong className="text-[#3E2B1E]">Bapak {invitation.brideFather || '-'}</strong> &amp; <br />
                      <strong className="text-[#3E2B1E]">Ibu {invitation.brideMother || '-'}</strong>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ─── 4. COUNTDOWN SECTION ─── */}
        {sectionConfig.countdown && primaryEvent && (
          <section className="relative">
            <div className="absolute inset-0 bg-[#E8DDD0] rounded-3xl rotate-1 translate-y-2 border border-[#D9CBB9] -z-10"></div>
            <div className="bg-[#5C3E28] rounded-3xl p-8 sm:p-12 text-[#FAF6F0] text-center border border-[#785338] shadow-xl">
              <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#D9CBB9]">Menanti Hari Bahagia</span>
              <h2 className="text-2xl sm:text-3xl font-serif mt-1 mb-8">Hitung Mundur</h2>
              <CountdownTimer targetDate={primaryEvent.date} isDark={true} />
            </div>
          </section>
        )}

        {/* ─── 5. EVENTS SECTION (Rustic Asymmetric Hand-Drawn Timeline) ─── */}
        {sectionConfig.events && events.length > 0 && (
          <section className="space-y-8">
            <div className="text-center">
              <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#8C6D53]">Wedding Schedule</span>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#3E2B1E] mt-1">Agenda Acara</h2>
            </div>

            {/* Asymmetric Organic Divider */}
            <div className="w-full max-w-xs mx-auto text-[#8C6D53] overflow-hidden my-4 opacity-80">
              <svg viewBox="0 0 200 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                <path d="M0 6C30 1 50 11 80 6C110 1 140 11 170 6C185 3.5 195 7 200 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 3"/>
              </svg>
            </div>

            <div className="space-y-8">
              {events.map((evt, idx) => {
                const isOdd = idx % 2 !== 0
                return (
                  <div key={evt.id} className="relative">
                    <div className={`absolute inset-0 bg-[#E8DDD0] rounded-3xl ${isOdd ? '-rotate-1 -translate-x-2' : 'rotate-1 translate-x-2'} translate-y-2 border border-[#D9CBB9] -z-10`}></div>
                    <div className="bg-[#FFFDF9] rounded-3xl p-8 sm:p-10 border border-[#D9CBB9] shadow-md relative">
                      {/* Organic Stamp Title */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D9CBB9]/80 pb-4 mb-6">
                        <div>
                          <span className="inline-block px-3 py-1 rounded-full bg-[#EFE6DB] text-[#5C3E28] text-xs uppercase tracking-wider font-semibold mb-2">
                            Acara {idx + 1}
                          </span>
                          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#3E2B1E]">{evt.title}</h3>
                        </div>
                        <div className="text-sm font-semibold text-[#785338] sm:text-right">
                          <div className="flex items-center sm:justify-end gap-1.5">
                            <Calendar className="w-4 h-4 text-[#8C6D53]" />
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
                            <div className="flex items-center sm:justify-end gap-1.5 text-xs text-[#8C6D53] mt-1">
                              <Clock className="w-3.5 h-3.5" />
                              <span>{evt.startTime || '09:00'} - {evt.endTime || 'Selesai'} WIB</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Venue info */}
                      <div className="flex items-start gap-3 text-sm text-[#5C3E28] mb-6">
                        <MapPin className="w-5 h-5 text-[#8C6D53] shrink-0 mt-0.5" />
                        <div>
                          <strong className="block text-base text-[#3E2B1E]">{evt.venue}</strong>
                          {evt.address && <p className="text-xs sm:text-sm text-[#6B5341] mt-0.5 leading-relaxed">{evt.address}</p>}
                        </div>
                      </div>

                      {evt.mapUrl && (
                        <a
                          href={evt.mapUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#785338] hover:bg-[#5C3E28] text-[#FAF6F0] text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs"
                        >
                          <Compass className="w-3.5 h-3.5" />
                          <span>Lihat di Google Maps</span>
                        </a>
                      )}
                      
                      <AddToCalendarButton
                        title={`${invitation.groomName} & ${invitation.brideName} - ${evt.title}`}
                        description={`Undangan pernikahan ${invitation.groomName} & ${invitation.brideName}`}
                        location={evt.address || evt.venue}
                        startDate={evt.date}
                        startTime={evt.startTime}
                        endTime={evt.endTime}
                        themeSlug="rustic"
                        className="mt-3 block"
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {/* ─── 6. LOVE STORY SECTION ─── */}
        {sectionConfig.story && loveStory.length > 0 && (
          <section className="space-y-8">
            <div className="text-center">
              <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#8C6D53]">Memories</span>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#3E2B1E] mt-1">Cerita Kita</h2>
            </div>

            <div className="space-y-6">
              {loveStory.map((story) => (
                <div key={story.id} className="relative">
                  <div className="absolute inset-0 bg-[#E8DDD0] rounded-2xl rotate-0.5 translate-y-1.5 border border-[#D9CBB9] -z-10"></div>
                  <div className="bg-[#FFFDF9] rounded-2xl p-6 sm:p-8 border border-[#D9CBB9] shadow-sm">
                    {story.date && (
                      <span className="inline-block text-xs font-bold uppercase tracking-wider text-[#785338] mb-1">
                        🗓 {story.date}
                      </span>
                    )}
                    <h3 className="text-xl font-serif font-bold text-[#3E2B1E] mb-2">{story.title}</h3>
                    <p className="text-sm text-[#6B5341] leading-relaxed">{story.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ─── 7. GALLERY SECTION (Warm Textured Polaroids) ─── */}
        {sectionConfig.gallery && gallery.length > 0 && (
          <section className="space-y-8">
            <div className="text-center">
              <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#8C6D53]">Gallery</span>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#3E2B1E] mt-1">Momen Kebersamaan</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {gallery.map((item, idx) => {
                const rotation = idx % 2 === 0 ? 'rotate-1' : '-rotate-1'
                return (
                  <div
                    key={item.id}
                    className={`bg-[#FFFDF9] p-3 pb-6 rounded-xl border border-[#D9CBB9] shadow-md transform ${rotation} hover:rotate-0 transition-transform duration-300`}
                  >
                    <div className="aspect-square bg-[#EFE6DB] rounded-lg overflow-hidden mb-2">
                      <img
                        src={item.imageUrl}
                        alt={item.caption || `Gallery ${idx + 1}`}
                        className="w-full h-full object-cover filter sepia-[15%] contrast-[105%]"
                      />
                    </div>
                    {item.caption && (
                      <p className="text-center font-serif text-xs text-[#6B5341] italic truncate px-1">
                        {item.caption}
                      </p>
                    )}
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {/* ─── 8. SHARED SECTIONS (RSVP, Wishes, Gifts, Share, Branding) ─── */}
        <PublicSharedSections data={data} isDark={false} />
      </div>
    </div>
  )
}
