'use client'

import { ThemeData } from '@/modules/theme/types/theme-data'
import { CountdownTimer } from '@/components/public/CountdownTimer'
import { PublicSharedSections } from '@/components/public/PublicSharedSections'
import { MapPin, Calendar, Clock, Compass } from 'lucide-react'

export default function VintageTheme({ data }: { data: ThemeData }) {
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
    <div className="min-h-screen bg-[#F7F3EB] text-[#302217] font-serif selection:bg-[#4A2E1B] selection:text-[#F7F3EB] p-3 sm:p-6 md:p-10 relative">
      {/* ─── CLASSIC NEWSPAPER DOUBLE BORDER CONTAINER ─── */}
      <div className="max-w-4xl mx-auto border-4 border-[#4A2E1B] p-2 sm:p-3 bg-[#FAF7F0] shadow-2xl relative">
        <div className="border border-[#7D5E46] p-6 sm:p-10 md:p-14 relative bg-[radial-gradient(#C2AB91_0.5px,transparent_0.5px)] [background-size:16px_16px] bg-opacity-30">
          
          {/* Vintage Header Ornamental Corners */}
          <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-[#4A2E1B]"></div>
          <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-[#4A2E1B]"></div>
          <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-[#4A2E1B]"></div>
          <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-[#4A2E1B]"></div>

          {/* Newspaper Masthead Banner */}
          <header className="text-center border-b-4 border-double border-[#4A2E1B] pb-6 mb-10">
            <div className="flex items-center justify-between border-b border-[#7D5E46] pb-1.5 mb-3 text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#7D5E46] font-sans font-bold">
              <span>EDISI KHUSUS PERNIKAHAN</span>
              <span>VOL. I — NO. 01</span>
              <span>{eventDateFormatted || 'TAHUN 2026'}</span>
            </div>

            <h2 className="text-sm sm:text-base tracking-[0.4em] uppercase text-[#7D5E46] font-sans font-bold mb-2">
              {invitation.openingTitle || 'THE WEDDING GAZETTE'}
            </h2>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-black tracking-tight text-[#302217] uppercase leading-none my-3">
              {invitation.groomName}
              <span className="block text-2xl sm:text-3xl font-light italic text-[#7D5E46] my-1 font-serif">
                &amp;
              </span>
              {invitation.brideName}
            </h1>

            <div className="w-24 h-0.5 bg-[#4A2E1B] mx-auto my-3"></div>

            {invitation.openingText && (
              <p className="max-w-xl mx-auto text-xs sm:text-sm text-[#5C4533] italic leading-relaxed">
                "{invitation.openingText}"
              </p>
            )}
          </header>

          {/* ─── 1. HERO PHOTO & EDITORIAL LEAD ─── */}
          {sectionConfig.hero && (
            <section className="mb-14">
              <div className="border-2 border-[#4A2E1B] p-2 bg-white shadow-sm mb-6">
                <div className="aspect-[16/10] sm:aspect-[21/9] w-full overflow-hidden bg-[#E8E0D2] relative">
                  <img
                    src={gallery[0]?.imageUrl || invitation.groomPhoto || invitation.bridePhoto || '/placeholder.jpg'}
                    alt="Couple Announcement"
                    className="w-full h-full object-cover filter grayscale contrast-[115%] sepia-[45%]"
                  />
                  <div className="absolute bottom-2 right-2 bg-[#302217]/85 text-[#FAF7F0] px-2 py-0.5 text-[9px] uppercase tracking-widest font-sans">
                    Foto Bersejarah
                  </div>
                </div>
              </div>

              {eventDateFormatted && (
                <div className="border-y-2 border-[#4A2E1B] py-3 text-center bg-[#F3EDE0]">
                  <p className="text-sm sm:text-base font-bold uppercase tracking-[0.2em] text-[#302217] font-sans">
                    Diresmikan Pada Hari {eventDateFormatted}
                  </p>
                </div>
              )}
            </section>
          )}

          {/* ─── 2. QUOTE SECTION (Editorial Column Callout) ─── */}
          {sectionConfig.quote && invitation.quote && (
            <section className="mb-14 text-center border-y border-dashed border-[#7D5E46] py-8 px-4 bg-[#F8F5ED]">
              <span className="text-xl text-[#7D5E46]">❦</span>
              <blockquote className="text-base sm:text-xl italic text-[#4A2E1B] max-w-2xl mx-auto leading-relaxed my-3">
                “{invitation.quote}”
              </blockquote>
              {invitation.quoteSource && (
                <cite className="block text-xs uppercase tracking-[0.25em] font-sans font-bold text-[#7D5E46] not-italic">
                  — {invitation.quoteSource} —
                </cite>
              )}
            </section>
          )}

          {/* ─── 3. COUPLE SECTION (Classic Column Profiles) ─── */}
          {sectionConfig.couple && (
            <section className="mb-14">
              <div className="text-center border-b-2 border-[#4A2E1B] pb-2 mb-8">
                <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-[0.2em] text-[#302217]">
                  PROFIL MEMPELAI
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:divide-x md:divide-[#C2AB91]">
                {/* Groom Column */}
                <div className="flex flex-col items-center text-center px-4">
                  <div className="w-36 h-48 sm:w-44 sm:h-56 p-1.5 border-2 border-[#4A2E1B] bg-white shadow-sm mb-4">
                    {invitation.groomPhoto ? (
                      <img
                        src={invitation.groomPhoto}
                        alt="Groom"
                        className="w-full h-full object-cover filter grayscale contrast-[115%] sepia-[45%]"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-[#E8E0D2] text-xs">Potret Pria</div>
                    )}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#302217]">
                    {invitation.groomFullName || invitation.groomName}
                  </h3>
                  <span className="text-xs uppercase tracking-widest text-[#7D5E46] font-sans font-bold mt-1 mb-3">
                    Mempelai Pria
                  </span>
                  {(invitation.groomFather || invitation.groomMother) && (
                    <p className="text-xs sm:text-sm text-[#5C4533] leading-relaxed">
                      Putra tercinta dari: <br />
                      <strong className="text-[#302217]">Bpk. {invitation.groomFather || '-'}</strong> &amp; <br />
                      <strong className="text-[#302217]">Ibu {invitation.groomMother || '-'}</strong>
                    </p>
                  )}
                </div>

                {/* Bride Column */}
                <div className="flex flex-col items-center text-center px-4">
                  <div className="w-36 h-48 sm:w-44 sm:h-56 p-1.5 border-2 border-[#4A2E1B] bg-white shadow-sm mb-4">
                    {invitation.bridePhoto ? (
                      <img
                        src={invitation.bridePhoto}
                        alt="Bride"
                        className="w-full h-full object-cover filter grayscale contrast-[115%] sepia-[45%]"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-[#E8E0D2] text-xs">Potret Wanita</div>
                    )}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#302217]">
                    {invitation.brideFullName || invitation.brideName}
                  </h3>
                  <span className="text-xs uppercase tracking-widest text-[#7D5E46] font-sans font-bold mt-1 mb-3">
                    Mempelai Wanita
                  </span>
                  {(invitation.brideFather || invitation.brideMother) && (
                    <p className="text-xs sm:text-sm text-[#5C4533] leading-relaxed">
                      Putri tercinta dari: <br />
                      <strong className="text-[#302217]">Bpk. {invitation.brideFather || '-'}</strong> &amp; <br />
                      <strong className="text-[#302217]">Ibu {invitation.brideMother || '-'}</strong>
                    </p>
                  )}
                </div>
              </div>
            </section>
          )}

          {/* ─── 4. COUNTDOWN SECTION (Telegram Style Timer) ─── */}
          {sectionConfig.countdown && primaryEvent && (
            <section className="mb-14">
              <div className="border-4 border-double border-[#4A2E1B] p-6 text-center bg-[#F3EDE0]">
                <span className="text-xs font-sans font-bold uppercase tracking-[0.3em] text-[#7D5E46]">
                  HITUNG MUNDUR UPACARA
                </span>
                <div className="my-4">
                  <CountdownTimer targetDate={primaryEvent.date} isDark={false} />
                </div>
              </div>
            </section>
          )}

          {/* ─── 5. EVENTS SECTION (Gazette Schedule Format) ─── */}
          {sectionConfig.events && events.length > 0 && (
            <section className="mb-14">
              <div className="text-center border-b-2 border-[#4A2E1B] pb-2 mb-8">
                <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-[0.2em] text-[#302217]">
                  WAKTU &amp; TEMPAT PERAYAAN
                </h2>
              </div>

              <div className="space-y-8">
                {events.map((evt, idx) => (
                  <div
                    key={evt.id}
                    className="border-2 border-[#4A2E1B] p-6 sm:p-8 bg-[#FAF7F0] shadow-sm relative"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-[#7D5E46] pb-3 mb-4">
                      <div>
                        <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#7D5E46]">
                          BAGIAN {idx + 1}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-bold text-[#302217]">{evt.title}</h3>
                      </div>
                      <div className="text-xs sm:text-sm font-sans font-bold text-[#4A2E1B] mt-2 sm:mt-0">
                        {new Date(evt.date).toLocaleDateString('id-ID', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </div>
                    </div>

                    <div className="space-y-2 text-sm text-[#5C4533] mb-6">
                      {(evt.startTime || evt.endTime) && (
                        <p className="font-sans font-semibold text-xs text-[#7D5E46] uppercase tracking-wider">
                          Pukul: {evt.startTime || '09:00'} — {evt.endTime || 'Selesai'} WIB
                        </p>
                      )}
                      <p className="font-serif text-base text-[#302217]">
                        Bertempat di: <strong>{evt.venue}</strong>
                      </p>
                      {evt.address && <p className="text-xs text-[#7D5E46]">{evt.address}</p>}
                    </div>

                    {evt.mapUrl && (
                      <a
                        href={evt.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-5 py-2 border-2 border-[#4A2E1B] hover:bg-[#4A2E1B] hover:text-[#FAF7F0] text-[#302217] font-sans text-xs font-bold uppercase tracking-widest transition-colors"
                      >
                        Buka Peta Lokasi (Google Maps)
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ─── 6. LOVE STORY SECTION (Chronological Columns) ─── */}
          {sectionConfig.story && loveStory.length > 0 && (
            <section className="mb-14">
              <div className="text-center border-b-2 border-[#4A2E1B] pb-2 mb-8">
                <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-[0.2em] text-[#302217]">
                  KRONOLOGI KISAH KASIH
                </h2>
              </div>

              <div className="space-y-6">
                {loveStory.map((story, idx) => (
                  <div key={story.id} className="border-l-4 border-[#4A2E1B] pl-4 py-2 bg-[#F8F5ED]">
                    <span className="text-[11px] font-sans font-bold uppercase tracking-widest text-[#7D5E46]">
                      {story.date || `Bab ${idx + 1}`}
                    </span>
                    <h3 className="text-lg font-bold text-[#302217] mb-1">{story.title}</h3>
                    <p className="text-xs sm:text-sm text-[#5C4533] leading-relaxed">{story.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ─── 7. GALLERY SECTION (Classic Sepia Newsprint Gallery) ─── */}
          {sectionConfig.gallery && gallery.length > 0 && (
            <section className="mb-14">
              <div className="text-center border-b-2 border-[#4A2E1B] pb-2 mb-8">
                <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-[0.2em] text-[#302217]">
                  DOKUMENTASI FOTOGRAFI
                </h2>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {gallery.map((item, idx) => (
                  <div key={item.id} className="border-2 border-[#4A2E1B] p-1.5 bg-white shadow-xs">
                    <div className="aspect-square bg-[#E8E0D2] overflow-hidden mb-1.5">
                      <img
                        src={item.imageUrl}
                        alt={item.caption || `Dokumentasi ${idx + 1}`}
                        className="w-full h-full object-cover filter grayscale contrast-[115%] sepia-[45%]"
                      />
                    </div>
                    {item.caption && (
                      <p className="text-[10px] font-sans text-center text-[#7D5E46] truncate px-1 uppercase tracking-wider">
                        {item.caption}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ─── 8. SHARED SECTIONS (RSVP, Wishes, Gifts, Share, Branding) ─── */}
          <div className="border-t-4 border-double border-[#4A2E1B] pt-8 mt-12">
            <PublicSharedSections data={data} isDark={false} />
          </div>
        </div>
      </div>
    </div>
  )
}
