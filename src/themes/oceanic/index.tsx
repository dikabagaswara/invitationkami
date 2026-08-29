'use client'

import { ThemeData } from '@/modules/theme/types/theme-data'
import { CountdownTimer } from '@/components/public/CountdownTimer'
import { PublicSharedSections } from '@/components/public/PublicSharedSections'
import { MapPin, Calendar, Clock, Waves, Sparkles, Heart, Compass } from 'lucide-react'

export default function OceanicTheme({ data }: { data: ThemeData }) {
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
    <div className="min-h-screen bg-[#F0F7FA] text-slate-800 font-sans selection:bg-[#0077B6] selection:text-white relative overflow-x-hidden">
      {/* Dynamic Ambient Sea Water & Coastal Deep Blue Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-[#90E0EF]/35 rounded-full blur-[140px]"></div>
        <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] bg-[#0077B6]/15 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-10 left-1/4 w-[700px] h-[700px] bg-[#03045E]/10 rounded-full blur-[160px]"></div>
        {/* Subtle oceanic water wave dots */}
        <div className="absolute inset-0 bg-[radial-gradient(#0077B6_0.75px,transparent_0.75px)] opacity-[0.07] [background-size:24px_24px]"></div>
      </div>

      {/* ─── 1. HERO SECTION (Deep Sea Oceanic Glass) ─── */}
      {sectionConfig.hero && (
        <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-16 sm:px-6">
          {/* Main Floating Sea Glass Container */}
          <div className="w-full max-w-4xl mx-auto rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-12 md:p-16 backdrop-blur-2xl bg-white/85 border border-white shadow-[0_20px_50px_rgba(0,119,182,0.12)] text-center relative transition-all duration-700 hover:shadow-[0_25px_60px_rgba(0,119,182,0.18)]">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E0F2FE] border border-[#BAE6FD] text-[#0284C7] text-xs font-semibold uppercase tracking-[0.25em] mb-6 shadow-xs">
              <Waves className="w-3.5 h-3.5 text-[#0077B6] animate-bounce" />
              <span>{invitation.openingTitle || 'The Wedding Celebration'}</span>
            </div>

            {/* Couple Feature Focus Photo / Avatar with Sea Gradient Ring */}
            {(gallery[0]?.imageUrl || invitation.groomPhoto || invitation.bridePhoto) && (
              <div className="relative mx-auto mb-8 w-32 h-32 sm:w-44 sm:h-44 rounded-full p-1.5 bg-gradient-to-tr from-[#0077B6] via-[#48CAE4] to-[#023E8A] shadow-xl shadow-[#0077B6]/25">
                <div className="w-full h-full rounded-full overflow-hidden backdrop-blur-sm bg-white">
                  <img
                    src={gallery[0]?.imageUrl || invitation.groomPhoto || invitation.bridePhoto || '/placeholder.jpg'}
                    alt="Couple"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="absolute -bottom-2 right-2 bg-gradient-to-r from-[#0077B6] to-[#023E8A] text-white p-2 rounded-full shadow-lg shadow-[#023E8A]/30">
                  <Heart className="w-4 h-4 fill-current animate-pulse" />
                </div>
              </div>
            )}

            {/* Typography with Rich Ocean Blue & Navy Palette */}
            <div className="space-y-2 my-4">
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-slate-900 leading-tight">
                <span className="bg-gradient-to-r from-[#023E8A] via-[#0077B6] to-[#0096C7] bg-clip-text text-transparent">
                  {invitation.groomName}
                </span>
              </h1>
              <span className="text-[#0077B6] font-serif font-normal italic text-2xl sm:text-3xl block my-1">&</span>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-slate-900 leading-tight">
                <span className="bg-gradient-to-r from-[#0096C7] via-[#0077B6] to-[#023E8A] bg-clip-text text-transparent">
                  {invitation.brideName}
                </span>
              </h1>
            </div>

            {eventDateFormatted && (
              <div className="inline-flex items-center gap-2 mt-6 px-5 py-2 rounded-2xl bg-[#E0F2FE]/80 border border-[#BAE6FD] shadow-xs text-[#023E8A] font-medium text-sm sm:text-base">
                <Calendar className="w-4 h-4 text-[#0077B6]" />
                <span>{eventDateFormatted}</span>
              </div>
            )}

            {invitation.openingText && (
              <p className="mt-6 text-slate-600 max-w-lg mx-auto text-sm sm:text-base leading-relaxed">
                {invitation.openingText}
              </p>
            )}
          </div>
        </section>
      )}

      {/* ─── 2. QUOTE SECTION (Floating Sea Glass Strip) ─── */}
      {sectionConfig.quote && invitation.quote && (
        <section className="relative z-10 py-16 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto rounded-3xl p-8 sm:p-12 backdrop-blur-xl bg-white/75 border border-white shadow-lg shadow-[#0077B6]/8 text-center">
            <Sparkles className="w-5 h-5 text-[#0077B6] mx-auto mb-4 opacity-90" />
            <blockquote className="text-lg sm:text-xl md:text-2xl font-light italic text-slate-800 leading-relaxed font-serif">
              “{invitation.quote}”
            </blockquote>
            {invitation.quoteSource && (
              <cite className="block mt-4 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#0077B6] not-italic">
                — {invitation.quoteSource} —
              </cite>
            )}
          </div>
        </section>
      )}

      {/* ─── 3. COUPLE SECTION (Dual Ocean Glass Cards) ─── */}
      {sectionConfig.couple && (
        <section className="relative z-10 py-20 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#0077B6]">The Groom & The Bride</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#03045E] mt-2">Mempelai Bahagia</h2>
              <div className="w-16 h-1 bg-gradient-to-r from-[#48CAE4] to-[#023E8A] mx-auto mt-4 rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-stretch">
              {/* Groom Card */}
              <div className="rounded-3xl p-8 sm:p-10 backdrop-blur-xl bg-white/80 border border-white shadow-xl shadow-[#0077B6]/10 flex flex-col items-center text-center transition-all duration-300 hover:translate-y-[-4px] hover:shadow-2xl">
                <div className="w-48 h-56 sm:w-56 sm:h-64 rounded-2xl overflow-hidden shadow-md mb-6 border-4 border-white bg-[#E0F2FE]">
                  {invitation.groomPhoto ? (
                    <img src={invitation.groomPhoto} alt="Groom" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#0077B6] font-medium">Foto Groom</div>
                  )}
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
                  {invitation.groomFullName || invitation.groomName}
                </h3>
                <span className="text-xs font-semibold text-[#0077B6] uppercase tracking-widest mt-1 mb-4">Mempelai Pria</span>
                {(invitation.groomFather || invitation.groomMother) && (
                  <p className="text-sm text-slate-600 leading-relaxed mt-auto">
                    Putra tercinta dari <br />
                    <strong className="text-slate-800 font-medium">Bapak {invitation.groomFather || '-'}</strong> &amp; <br />
                    <strong className="text-slate-800 font-medium">Ibu {invitation.groomMother || '-'}</strong>
                  </p>
                )}
              </div>

              {/* Bride Card */}
              <div className="rounded-3xl p-8 sm:p-10 backdrop-blur-xl bg-white/80 border border-white shadow-xl shadow-[#0077B6]/10 flex flex-col items-center text-center transition-all duration-300 hover:translate-y-[-4px] hover:shadow-2xl">
                <div className="w-48 h-56 sm:w-56 sm:h-64 rounded-2xl overflow-hidden shadow-md mb-6 border-4 border-white bg-[#E0F2FE]">
                  {invitation.bridePhoto ? (
                    <img src={invitation.bridePhoto} alt="Bride" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#0077B6] font-medium">Foto Bride</div>
                  )}
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">
                  {invitation.brideFullName || invitation.brideName}
                </h3>
                <span className="text-xs font-semibold text-[#0077B6] uppercase tracking-widest mt-1 mb-4">Mempelai Wanita</span>
                {(invitation.brideFather || invitation.brideMother) && (
                  <p className="text-sm text-slate-600 leading-relaxed mt-auto">
                    Putri tercinta dari <br />
                    <strong className="text-slate-800 font-medium">Bapak {invitation.brideFather || '-'}</strong> &amp; <br />
                    <strong className="text-slate-800 font-medium">Ibu {invitation.brideMother || '-'}</strong>
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ─── 4. COUNTDOWN SECTION ─── */}
      {sectionConfig.countdown && primaryEvent && (
        <section className="relative z-10 py-16 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto rounded-3xl p-8 sm:p-12 backdrop-blur-xl bg-gradient-to-r from-[#023E8A] via-[#0077B6] to-[#0096C7] text-white shadow-xl shadow-[#0077B6]/25 text-center border border-white/20">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#CAF0F8]">Save The Date</span>
            <h2 className="text-2xl sm:text-3xl font-bold mt-1 mb-8">Menghitung Hari Bahagia</h2>
            <CountdownTimer targetDate={primaryEvent.date} isDark={true} />
          </div>
        </section>
      )}

      {/* ─── 5. EVENTS SECTION (Floating Glass Panels with Ocean Badges) ─── */}
      {sectionConfig.events && events.length > 0 && (
        <section className="relative z-10 py-20 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#0077B6]">Save The Schedule</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#03045E] mt-2">Rangkaian Acara</h2>
              <div className="w-16 h-1 bg-gradient-to-r from-[#48CAE4] to-[#023E8A] mx-auto mt-4 rounded-full"></div>
            </div>

            <div className={`grid grid-cols-1 ${events.length > 1 ? 'md:grid-cols-2' : 'max-w-2xl mx-auto'} gap-8`}>
              {events.map((evt) => (
                <div
                  key={evt.id}
                  className="rounded-3xl p-8 sm:p-10 backdrop-blur-xl bg-white/85 border border-white shadow-xl shadow-[#0077B6]/10 flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:border-[#BAE6FD]"
                >
                  <div className="relative z-10">
                    <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#E0F2FE] text-[#023E8A] text-xs font-semibold uppercase tracking-wider mb-4 border border-[#BAE6FD]">
                      <Sparkles className="w-3.5 h-3.5 text-[#0077B6]" />
                      <span>{evt.title}</span>
                    </div>

                    <h3 className="text-2xl font-bold text-slate-900 mb-4">{evt.title}</h3>

                    <div className="space-y-3 text-sm text-slate-600 mb-6">
                      <div className="flex items-center gap-3">
                        <Calendar className="w-4 h-4 text-[#0077B6] shrink-0" />
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
                          <Clock className="w-4 h-4 text-[#0077B6] shrink-0" />
                          <span>
                            {evt.startTime || '09:00'} - {evt.endTime || 'Selesai'} WIB
                          </span>
                        </div>
                      )}
                      <div className="flex items-start gap-3">
                        <MapPin className="w-4 h-4 text-[#0077B6] shrink-0 mt-1" />
                        <div>
                          <strong className="text-slate-800 block">{evt.venue}</strong>
                          {evt.address && <span className="text-slate-500 text-xs mt-0.5 block">{evt.address}</span>}
                        </div>
                      </div>
                    </div>
                  </div>

                  {evt.mapUrl && (
                    <a
                      href={evt.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative z-10 mt-4 inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#0077B6] to-[#023E8A] hover:from-[#023E8A] hover:to-[#03045E] text-white text-xs font-semibold uppercase tracking-wider shadow-md shadow-[#0077B6]/25 transition-all active:scale-[0.99]"
                    >
                      <Compass className="w-4 h-4" />
                      <span>Petunjuk Lokasi (Google Maps)</span>
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── 6. LOVE STORY SECTION ─── */}
      {sectionConfig.story && loveStory.length > 0 && (
        <section className="relative z-10 py-20 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#0077B6]">Our Journey</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#03045E] mt-2">Kisah Cinta Kami</h2>
              <div className="w-16 h-1 bg-gradient-to-r from-[#48CAE4] to-[#023E8A] mx-auto mt-4 rounded-full"></div>
            </div>

            <div className="space-y-8 relative before:absolute before:inset-0 before:left-4 sm:before:left-1/2 sm:before:-translate-x-1/2 before:w-0.5 before:bg-[#BAE6FD]">
              {loveStory.map((story, idx) => {
                const isEven = idx % 2 === 0
                return (
                  <div
                    key={story.id}
                    className={`relative flex flex-col sm:flex-row items-start ${
                      isEven ? 'sm:flex-row-reverse' : ''
                    } gap-6 sm:gap-12 pl-10 sm:pl-0`}
                  >
                    {/* Center glowing node */}
                    <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 top-4 w-4 h-4 rounded-full bg-gradient-to-tr from-[#0077B6] to-[#023E8A] border-4 border-white shadow-md z-10"></div>

                    {/* Content Card */}
                    <div className="w-full sm:w-1/2 rounded-3xl p-6 sm:p-8 backdrop-blur-xl bg-white/80 border border-white shadow-lg shadow-[#0077B6]/8">
                      {story.date && (
                        <span className="inline-block px-3 py-1 rounded-full bg-[#E0F2FE] text-[#023E8A] text-xs font-semibold mb-2">
                          {story.date}
                        </span>
                      )}
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{story.title}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed">{story.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ─── 7. GALLERY SECTION (Ocean Blue Masonry) ─── */}
      {sectionConfig.gallery && gallery.length > 0 && (
        <section className="relative z-10 py-20 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#0077B6]">Moments</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#03045E] mt-2">Galeri Foto</h2>
              <div className="w-16 h-1 bg-gradient-to-r from-[#48CAE4] to-[#023E8A] mx-auto mt-4 rounded-full"></div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {gallery.map((item, idx) => (
                <div
                  key={item.id}
                  className={`rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg shadow-[#0077B6]/10 border-2 border-white bg-[#E0F2FE] group relative ${
                    idx === 0 ? 'col-span-2 md:col-span-2 aspect-[16/9]' : 'aspect-square'
                  }`}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.caption || `Gallery ${idx + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {item.caption && (
                    <div className="absolute inset-0 bg-gradient-to-t from-[#03045E]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <p className="text-white text-xs sm:text-sm font-medium">{item.caption}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── 8. SHARED SECTIONS (RSVP, Wishes, Gifts, Share, Branding) ─── */}
      <PublicSharedSections data={data} isDark={false} />
    </div>
  )
}
