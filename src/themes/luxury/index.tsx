import { PublicSharedSections } from '@/components/public/PublicSharedSections'
import { CountdownTimer } from '@/components/public/CountdownTimer'
import { ThemeData } from '@/modules/theme/types/theme-data'

export default function LuxuryTheme({ data }: { data: ThemeData }) {
  const { invitation, events, gallery, loveStory, weddingGifts } = data
  const { sectionConfig } = invitation

  return (
    <div className="bg-[#0b0b0c] text-[#c5a880] min-h-screen">
      <style>{
        `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Montserrat:wght@300;400;500&display=swap');
        .font-cormorant { font-family: 'Cormorant Garamond', serif; }
        .font-montserrat { font-family: 'Montserrat', sans-serif; }`
      }</style>

      {/* Hero */}
      {sectionConfig.hero && (
        <section className="min-h-screen flex flex-col items-center justify-center p-8 text-center border-[12px] border-[#151517] m-4 relative overflow-hidden font-cormorant">
          <div className="absolute inset-4 border border-[#c5a880]/20"></div>
          <div className="absolute inset-8 border border-[#c5a880]/30"></div>
          
          <p className="tracking-[0.3em] text-xs uppercase mb-8 text-[#c5a880]/80 font-montserrat font-light">
            {invitation.openingTitle || 'The Wedding Celebration of'}
          </p>
          <h1 className="text-5xl md:text-7xl mb-4 leading-tight z-10 font-normal tracking-wide text-white">
            {invitation.groomName} <br />
            <span className="text-3xl md:text-4xl text-[#c5a880] italic my-3 block font-light">&</span> 
            {invitation.brideName}
          </h1>
          {events.length > 0 && (
            <div className="mt-8 tracking-[0.2em] font-montserrat text-xs md:text-sm border-t border-b border-[#c5a880]/30 py-3 px-8 z-10 text-[#c5a880]/90">
              {new Date(events[0].date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          )}
        </section>
      )}

      {/* Quote */}
      {sectionConfig.quote && invitation.quote && (
        <section className="py-20 px-8 text-center font-montserrat max-w-3xl mx-auto">
          <div className="w-10 h-px bg-[#c5a880]/40 mx-auto mb-8"></div>
          <p className="text-lg md:text-xl font-light text-stone-200 leading-relaxed italic mb-6">"{invitation.quote}"</p>
          {invitation.quoteSource && (
            <p className="text-xs tracking-widest text-[#c5a880]/80 uppercase">{invitation.quoteSource}</p>
          )}
          <div className="w-10 h-px bg-[#c5a880]/40 mx-auto mt-8"></div>
        </section>
      )}

      {/* Couple */}
      {sectionConfig.couple && (
        <section className="py-24 px-8 max-w-5xl mx-auto font-montserrat text-center">
          <h2 className="font-cormorant text-3xl md:text-4xl mb-16 tracking-wider font-light text-white">Mempelai</h2>
          <div className="grid md:grid-cols-2 gap-16 md:gap-24">
            <div className="space-y-6">
              <div className="w-56 h-72 mx-auto bg-[#18181a] border border-[#c5a880]/30 p-2 shadow-xl rounded-t-full overflow-hidden">
                <div className="w-full h-full rounded-t-full overflow-hidden bg-[#222]">
                  {invitation.groomPhoto ? (
                    <img src={invitation.groomPhoto} className="w-full h-full object-cover grayscale opacity-90 hover:grayscale-0 transition-all duration-700" alt="Groom" />
                  ) : null}
                </div>
              </div>
              <div>
                <h3 className="font-cormorant text-3xl mb-1 text-white font-normal">{invitation.groomFullName || invitation.groomName}</h3>
                <p className="text-[#c5a880]/80 text-xs tracking-widest uppercase mb-3">Mempelai Pria</p>
                {(invitation.groomFather || invitation.groomMother) && (
                  <p className="text-stone-400 text-xs font-light leading-relaxed">
                    Putra dari <br/> {invitation.groomFather} & {invitation.groomMother}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div className="w-56 h-72 mx-auto bg-[#18181a] border border-[#c5a880]/30 p-2 shadow-xl rounded-t-full overflow-hidden">
                <div className="w-full h-full rounded-t-full overflow-hidden bg-[#222]">
                  {invitation.bridePhoto ? (
                    <img src={invitation.bridePhoto} className="w-full h-full object-cover grayscale opacity-90 hover:grayscale-0 transition-all duration-700" alt="Bride" />
                  ) : null}
                </div>
              </div>
              <div>
                <h3 className="font-cormorant text-3xl mb-1 text-white font-normal">{invitation.brideFullName || invitation.brideName}</h3>
                <p className="text-[#c5a880]/80 text-xs tracking-widest uppercase mb-3">Mempelai Wanita</p>
                {(invitation.brideFather || invitation.brideMother) && (
                  <p className="text-stone-400 text-xs font-light leading-relaxed">
                    Putri dari <br/> {invitation.brideFather} & {invitation.brideMother}
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Countdown */}
      {sectionConfig.countdown && events.length > 0 && (
        <section className="py-20 px-8 bg-[#111113] text-center border-y border-[#c5a880]/20 font-montserrat">
          <h2 className="text-xs tracking-[0.3em] uppercase text-[#c5a880]/80 mb-8">Menghitung Hari</h2>
          <div className="opacity-90">
            <CountdownTimer targetDate={events[0].date} />
          </div>
        </section>
      )}

      {/* Events */}
      {sectionConfig.events && events.length > 0 && (
        <section className="py-24 px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-cormorant text-center text-3xl md:text-4xl mb-16 tracking-wider font-light text-white">Rangkaian Acara</h2>
            <div className="grid md:grid-cols-2 gap-10">
              {events.map(event => (
                <div key={event.id} className="text-center font-montserrat p-8 bg-[#131315] border border-[#c5a880]/20 rounded-xl relative">
                  <h3 className="font-cormorant text-2xl mb-4 text-white font-normal">{event.title}</h3>
                  <div className="space-y-1 mb-6">
                    <p className="text-xs tracking-wider text-[#c5a880]">
                      {new Date(event.date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                    {(event.startTime || event.endTime) && (
                      <p className="text-stone-400 text-xs">{event.startTime || ''} — {event.endTime || 'Selesai'}</p>
                    )}
                  </div>
                  <p className="text-stone-200 font-normal text-base mb-1">{event.venue}</p>
                  {event.address && <p className="text-stone-400 font-light text-xs mb-6 leading-relaxed">{event.address}</p>}
                  
                  {event.mapUrl && (
                    <a href={event.mapUrl} target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-2 border border-[#c5a880]/60 text-[#c5a880] hover:bg-[#c5a880] hover:text-black transition-colors text-xs tracking-wider rounded-md">
                      Lihat Petunjuk Lokasi
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Story */}
      {sectionConfig.story && loveStory.length > 0 && (
        <section className="py-24 px-8 bg-[#111113] border-y border-[#c5a880]/20 font-montserrat">
          <h2 className="font-cormorant text-center text-3xl md:text-4xl mb-16 tracking-wider font-light text-white">Kisah Cinta</h2>
          <div className="max-w-3xl mx-auto space-y-12">
            {loveStory.map((story, i) => (
              <div key={story.id} className={`flex flex-col md:flex-row gap-6 items-center text-center ${i % 2 === 0 ? 'md:text-right' : 'md:text-left md:flex-row-reverse'}`}>
                <div className="flex-1">
                  {story.date && <p className="text-xs tracking-wider text-[#c5a880]/80 mb-1">{story.date}</p>}
                  <h3 className="font-cormorant text-2xl text-white mb-2 font-normal">{story.title}</h3>
                  <p className="text-stone-400 font-light text-xs leading-relaxed">{story.description}</p>
                </div>
                <div className="hidden md:flex w-12 justify-center">
                  <div className="w-px h-full min-h-[80px] bg-[#c5a880]/30 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rotate-45 bg-[#c5a880]"></div>
                  </div>
                </div>
                <div className="flex-1"></div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Gallery */}
      {sectionConfig.gallery && gallery.length > 0 && (
        <section className="py-24 px-8">
          <h2 className="font-cormorant text-center text-3xl md:text-4xl mb-16 tracking-wider font-light text-white">Galeri Foto</h2>
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-3">
            {gallery.map((item, i) => (
              <div key={item.id} className={`relative bg-[#1a1a1a] rounded-lg overflow-hidden ${i === 0 ? 'col-span-2 row-span-2' : 'aspect-square'}`}>
                <img src={item.imageUrl} alt={item.caption || 'Gallery'} className="w-full h-full object-cover grayscale opacity-85 hover:grayscale-0 hover:opacity-100 transition duration-700" />
              </div>
            ))}
          </div>
        </section>
      )}
    
      <PublicSharedSections data={data} isDark={true} />
    </div>
  )
}
