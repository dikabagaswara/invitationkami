'use client'

import { ThemeData } from '@/modules/theme/types/theme-data'
import { CountdownTimer } from '@/components/public/CountdownTimer'
import { PublicSharedSections } from '@/components/public/PublicSharedSections'
import { AddToCalendarButton } from '@/components/public/AddToCalendarButton'
import { MapPin, Calendar, Clock, Compass, Heart, Sun } from 'lucide-react'

export default function TerracottaTheme({ data }: { data: ThemeData }) {
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
    <div className="min-h-screen bg-[#FBF6F0] text-[#3D2619] font-sans selection:bg-[#C85A32] selection:text-white relative overflow-x-hidden">
      {/* Background Soft Terracotta Clay & Sand Glow Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-[#E7C1AC]/35 rounded-full blur-[140px]"></div>
        <div className="absolute top-1/2 -left-40 w-[600px] h-[600px] bg-[#D48B6C]/25 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-10 right-1/4 w-[700px] h-[700px] bg-[#F3D7CA]/40 rounded-full blur-[160px]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#C85A32_0.6px,transparent_0.6px)] opacity-[0.06] [background-size:24px_24px]"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-20 sm:space-y-32">
        {/* ─── 1. HERO SECTION (Mediterranean Arch & Clay Aesthetics) ─── */}
        {sectionConfig.hero && (
          <section className="relative flex flex-col items-center justify-center text-center pt-8">
            {/* Mediterranean Arch Outer Card */}
            <div className="w-full bg-[#FFFBF7] rounded-t-[5rem] sm:rounded-t-[8rem] rounded-b-[2.5rem] p-6 sm:p-14 border border-[#EBD7CE] shadow-[0_20px_50px_rgba(200,90,50,0.08)] relative overflow-hidden">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F5E6DF] border border-[#EBD7CE] text-[#C85A32] text-xs font-semibold uppercase tracking-[0.25em] mb-8">
                <Sun className="w-3.5 h-3.5 text-[#C85A32]" />
                <span>{invitation.openingTitle || 'TERRACOTTA CELEBRATION'}</span>
              </div>

              {/* Arch Shaped Photo Frame */}
              {(gallery[0]?.imageUrl || invitation.groomPhoto || invitation.bridePhoto) && (
                <div className="relative mx-auto mb-8 w-44 h-60 sm:w-56 sm:h-72 rounded-t-[5rem] sm:rounded-t-[7rem] rounded-b-2xl overflow-hidden p-2 border-2 border-[#D48B6C]/50 bg-[#FBF6F0] shadow-md">
                  <div className="w-full h-full rounded-t-[4.5rem] sm:rounded-t-[6.5rem] rounded-b-xl overflow-hidden">
                    <img
                      src={gallery[0]?.imageUrl || invitation.groomPhoto || invitation.bridePhoto || '/placeholder.jpg'}
                      alt="Couple"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 filter contrast-[105%]"
                    />
                  </div>
                  <div className="absolute bottom-2 right-2 bg-[#C85A32] text-white p-2 rounded-full shadow-md">
                    <Heart className="w-3.5 h-3.5 fill-current" />
                  </div>
                </div>
              )}

              {/* Typography - Clean and fully visible */}
              <div className="space-y-2 my-4">
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif text-[#3D2619] tracking-tight leading-tight">
                  {invitation.groomName}
                </h1>
                <span className="block text-2xl sm:text-3xl text-[#C85A32] italic font-serif my-1">
                  — &amp; —
                </span>
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif text-[#3D2619] tracking-tight leading-tight">
                  {invitation.brideName}
                </h1>
              </div>

              {eventDateFormatted && (
                <div className="inline-block mt-6 px-6 py-2 rounded-full bg-[#F5E6DF] text-[#C85A32] font-semibold text-xs sm:text-sm tracking-widest uppercase border border-[#EBD7CE]">
                  {eventDateFormatted}
                </div>
              )}

              {invitation.openingText && (
                <p className="mt-8 text-[#735140] max-w-lg mx-auto text-sm sm:text-base leading-relaxed font-light">
                  {invitation.openingText}
                </p>
              )}
            </div>
          </section>
        )}

        {/* ─── 2. QUOTE SECTION (Mediterranean Minimalist Card) ─── */}
        {sectionConfig.quote && invitation.quote && (
          <section className="relative">
            <div className="bg-[#FFFBF7] rounded-[2rem] p-8 sm:p-12 border border-[#EBD7CE] shadow-sm text-center">
              <span className="text-2xl text-[#C85A32] mb-3 block">✺</span>
              <blockquote className="text-lg sm:text-xl font-serif italic text-[#4F3323] leading-relaxed">
                “{invitation.quote}”
              </blockquote>
              {invitation.quoteSource && (
                <cite className="block mt-4 text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-[#C85A32] not-italic">
                  — {invitation.quoteSource} —
                </cite>
              )}
            </div>
          </section>
        )}

        {/* ─── 3. COUPLE SECTION (Arch Profile Cards) ─── */}
        {sectionConfig.couple && (
          <section className="space-y-10">
            <div className="text-center">
              <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#C85A32]">The Happy Couple</span>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#3D2619] mt-1">Kedua Mempelai</h2>
              <div className="w-16 h-1 bg-[#C85A32] mx-auto mt-4 rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Groom Arch Card */}
              <div className="bg-[#FFFBF7] rounded-t-[5rem] rounded-b-3xl p-8 border border-[#EBD7CE] shadow-md flex flex-col items-center text-center">
                <div className="w-44 h-56 rounded-t-[4.5rem] rounded-b-xl overflow-hidden shadow-inner mb-6 border-2 border-[#EBD7CE] bg-[#F5E6DF]">
                  {invitation.groomPhoto ? (
                    <img src={invitation.groomPhoto} alt="Groom" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#C85A32]">Foto Groom</div>
                  )}
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#3D2619]">
                  {invitation.groomFullName || invitation.groomName}
                </h3>
                <span className="text-xs font-semibold text-[#C85A32] uppercase tracking-widest mt-1 mb-4">Mempelai Pria</span>
                {(invitation.groomFather || invitation.groomMother) && (
                  <p className="text-sm text-[#735140] leading-relaxed mt-auto">
                    Putra dari <br />
                    <strong className="text-[#3D2619]">Bapak {invitation.groomFather || '-'}</strong> &amp; <br />
                    <strong className="text-[#3D2619]">Ibu {invitation.groomMother || '-'}</strong>
                  </p>
                )}
              </div>

              {/* Bride Arch Card */}
              <div className="bg-[#FFFBF7] rounded-t-[5rem] rounded-b-3xl p-8 border border-[#EBD7CE] shadow-md flex flex-col items-center text-center">
                <div className="w-44 h-56 rounded-t-[4.5rem] rounded-b-xl overflow-hidden shadow-inner mb-6 border-2 border-[#EBD7CE] bg-[#F5E6DF]">
                  {invitation.bridePhoto ? (
                    <img src={invitation.bridePhoto} alt="Bride" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#C85A32]">Foto Bride</div>
                  )}
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#3D2619]">
                  {invitation.brideFullName || invitation.brideName}
                </h3>
                <span className="text-xs font-semibold text-[#C85A32] uppercase tracking-widest mt-1 mb-4">Mempelai Wanita</span>
                {(invitation.brideFather || invitation.brideMother) && (
                  <p className="text-sm text-[#735140] leading-relaxed mt-auto">
                    Putri dari <br />
                    <strong className="text-[#3D2619]">Bapak {invitation.brideFather || '-'}</strong> &amp; <br />
                    <strong className="text-[#3D2619]">Ibu {invitation.brideMother || '-'}</strong>
                  </p>
                )}
              </div>
            </div>
          </section>
        )}

        {/* ─── 4. COUNTDOWN SECTION ─── */}
        {sectionConfig.countdown && primaryEvent && (
          <section className="relative">
            <div className="bg-[#C85A32] rounded-3xl p-8 sm:p-12 text-white text-center shadow-xl shadow-[#C85A32]/20">
              <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#FBEBE5]">Save The Date</span>
              <h2 className="text-2xl sm:text-3xl font-serif mt-1 mb-8">Menghitung Hari Bahagia</h2>
              <CountdownTimer targetDate={primaryEvent.date} isDark={true} />
            </div>
          </section>
        )}

        {/* ─── 5. EVENTS SECTION (Warm Terracotta Cards) ─── */}
        {sectionConfig.events && events.length > 0 && (
          <section className="space-y-10">
            <div className="text-center">
              <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#C85A32]">Schedule</span>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#3D2619] mt-1">Rangkaian Acara</h2>
              <div className="w-16 h-1 bg-[#C85A32] mx-auto mt-4 rounded-full"></div>
            </div>

            <div className="space-y-8">
              {events.map((evt, idx) => (
                <div key={evt.id} className="bg-[#FFFBF7] rounded-3xl p-8 sm:p-10 border border-[#EBD7CE] shadow-md relative">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#EBD7CE] pb-4 mb-6">
                    <div>
                      <span className="inline-block px-3 py-1 rounded-full bg-[#F5E6DF] text-[#C85A32] text-xs uppercase tracking-wider font-semibold mb-2">
                        Acara {idx + 1}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#3D2619]">{evt.title}</h3>
                    </div>
                    <div className="text-sm font-semibold text-[#C85A32] sm:text-right">
                      <div className="flex items-center sm:justify-end gap-1.5">
                        <Calendar className="w-4 h-4 text-[#C85A32]" />
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
                        <div className="flex items-center sm:justify-end gap-1.5 text-xs text-[#735140] mt-1">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{evt.startTime || '09:00'} - {evt.endTime || 'Selesai'} WIB</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-sm text-[#735140] mb-6">
                    <MapPin className="w-5 h-5 text-[#C85A32] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-base text-[#3D2619]">{evt.venue}</strong>
                      {evt.address && <p className="text-xs sm:text-sm text-[#735140] mt-0.5 leading-relaxed">{evt.address}</p>}
                    </div>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center gap-2.5">
                    <AddToCalendarButton
                      title={`${evt.title} - ${invitation.groomName} & ${invitation.brideName}`}
                      description={`Pernikahan ${invitation.groomName} & ${invitation.brideName}. Waktu: ${evt.startTime || '09:00'} WIB. Lokasi: ${evt.venue}`}
                      location={`${evt.venue}, ${evt.address || ''}`}
                      startDate={evt.date}
                      startTime={evt.startTime}
                      endTime={evt.endTime}
                      themeSlug="terracotta"
                    />

                    {evt.mapUrl && (
                      <a
                        href={evt.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 px-5 py-2 rounded-xl bg-white border border-[#EBD7CE] hover:bg-[#F5E6DF] text-[#C85A32] text-xs font-semibold uppercase tracking-wider transition-colors shadow-2xs"
                      >
                        <Compass className="w-3.5 h-3.5" />
                        <span>Buka Google Maps</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ─── 6. LOVE STORY SECTION ─── */}
        {sectionConfig.story && loveStory.length > 0 && (
          <section className="space-y-8">
            <div className="text-center">
              <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#C85A32]">Our Journey</span>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#3D2619] mt-1">Kisah Cinta Kami</h2>
            </div>

            <div className="space-y-6">
              {loveStory.map((story) => (
                <div key={story.id} className="bg-[#FFFBF7] rounded-2xl p-6 sm:p-8 border border-[#EBD7CE] shadow-xs">
                  {story.date && (
                    <span className="inline-block text-xs font-bold uppercase tracking-wider text-[#C85A32] mb-1">
                      {story.date}
                    </span>
                  )}
                  <h3 className="text-xl font-serif font-bold text-[#3D2619] mb-2">{story.title}</h3>
                  <p className="text-sm text-[#735140] leading-relaxed font-light">{story.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ─── 7. GALLERY SECTION ─── */}
        {sectionConfig.gallery && gallery.length > 0 && (
          <section className="space-y-8">
            <div className="text-center">
              <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#C85A32]">Gallery</span>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#3D2619] mt-1">Momen Bahagia</h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {gallery.map((item, idx) => (
                <div
                  key={item.id}
                  className="bg-[#FFFBF7] p-2 rounded-2xl border border-[#EBD7CE] shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="aspect-square rounded-xl overflow-hidden mb-2 bg-[#F5E6DF]">
                    <img
                      src={item.imageUrl}
                      alt={item.caption || `Gallery ${idx + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  {item.caption && (
                    <p className="text-center font-serif text-xs text-[#735140] italic truncate px-1">
                      {item.caption}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ─── 8. SHARED SECTIONS (RSVP, Wishes, Gifts, Share) ─── */}
        <PublicSharedSections data={data} isDark={false} />
      </div>
    </div>
  )
}
