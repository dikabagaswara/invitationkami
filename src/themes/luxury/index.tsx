import { PublicSharedSections } from '@/components/public/PublicSharedSections'
import { CountdownTimer } from '@/components/public/CountdownTimer'
import { ThemeData } from '@/modules/theme/types/theme-data'

export default function LuxuryTheme({ data }: { data: ThemeData }) {
  const { invitation, events, gallery, loveStory, weddingGifts } = data
  const { sectionConfig } = invitation

  return (
    <div className="bg-[#0a0a0a] text-[#d4af37] min-h-screen">
      <style>{
        `@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Montserrat:wght@300;400;600&display=swap');
        .font-cinzel { font-family: 'Cinzel', serif; }
        .font-montserrat { font-family: 'Montserrat', sans-serif; }`
      }</style>

      {/* Hero */}
      {sectionConfig.hero && (
        <section className="min-h-screen flex flex-col items-center justify-center p-8 font-cinzel text-center border-[16px] border-[#151515] m-4 relative overflow-hidden">
          <div className="absolute inset-4 border border-[#d4af37]/20"></div>
          <div className="absolute inset-8 border border-[#d4af37]/40"></div>
          <p className="tracking-[0.5em] text-xs uppercase mb-12 text-[#d4af37]/70 font-montserrat">
            {invitation.openingTitle || 'Join us to celebrate'}
          </p>
          <h1 className="text-5xl md:text-7xl mb-6 leading-tight z-10">
            {invitation.groomName} <br />
            <span className="text-3xl text-[#d4af37]/50 italic my-6 block">&</span> 
            {invitation.brideName}
          </h1>
          {events.length > 0 && (
            <div className="mt-12 tracking-[0.3em] font-montserrat uppercase text-sm border-t border-b border-[#d4af37]/30 py-4 z-10">
              {new Date(events[0].date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          )}
        </section>
      )}

      {/* Quote */}
      {sectionConfig.quote && invitation.quote && (
        <section className="py-24 px-8 text-center font-montserrat max-w-4xl mx-auto">
          <div className="w-12 h-px bg-[#d4af37]/50 mx-auto mb-12"></div>
          <p className="text-xl md:text-2xl font-light text-white/90 leading-relaxed italic mb-8">"{invitation.quote}"</p>
          {invitation.quoteSource && (
            <p className="text-sm tracking-widest uppercase text-[#d4af37]/70">{invitation.quoteSource}</p>
          )}
          <div className="w-12 h-px bg-[#d4af37]/50 mx-auto mt-12"></div>
        </section>
      )}

      {/* Couple */}
      {sectionConfig.couple && (
        <section className="py-32 px-8 max-w-5xl mx-auto font-montserrat text-center">
          <h2 className="font-cinzel text-3xl md:text-4xl mb-24 tracking-widest uppercase">The Couple</h2>
          <div className="grid md:grid-cols-2 gap-24">
            <div className="space-y-8">
              <div className="w-64 h-80 mx-auto bg-[#1a1a1a] border-4 border-[#d4af37]/30 p-2 shadow-2xl">
                <div className="w-full h-full bg-[#222] overflow-hidden">
                  {invitation.groomPhoto ? (
                    <img src={invitation.groomPhoto} className="w-full h-full object-cover grayscale opacity-90" alt="Groom" />
                  ) : null}
                </div>
              </div>
              <div>
                <h3 className="font-cinzel text-3xl mb-2 text-white">{invitation.groomFullName || invitation.groomName}</h3>
                <p className="text-[#d4af37]/60 text-sm tracking-widest uppercase mb-4">The Groom</p>
                {(invitation.groomFather || invitation.groomMother) && (
                  <p className="text-gray-400 text-sm font-light leading-relaxed">
                    Son of <br/> {invitation.groomFather} & {invitation.groomMother}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-8">
              <div className="w-64 h-80 mx-auto bg-[#1a1a1a] border-4 border-[#d4af37]/30 p-2 shadow-2xl">
                <div className="w-full h-full bg-[#222] overflow-hidden">
                  {invitation.bridePhoto ? (
                    <img src={invitation.bridePhoto} className="w-full h-full object-cover grayscale opacity-90" alt="Bride" />
                  ) : null}
                </div>
              </div>
              <div>
                <h3 className="font-cinzel text-3xl mb-2 text-white">{invitation.brideFullName || invitation.brideName}</h3>
                <p className="text-[#d4af37]/60 text-sm tracking-widest uppercase mb-4">The Bride</p>
                {(invitation.brideFather || invitation.brideMother) && (
                  <p className="text-gray-400 text-sm font-light leading-relaxed">
                    Daughter of <br/> {invitation.brideFather} & {invitation.brideMother}
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Countdown */}
      {sectionConfig.countdown && events.length > 0 && (
        <section className="py-24 px-8 bg-[#111] text-center border-y border-[#d4af37]/20 font-montserrat">
          <h2 className="text-sm tracking-[0.5em] uppercase text-[#d4af37]/70 mb-12">Counting Down</h2>
          <div className="opacity-90">
            <CountdownTimer targetDate={events[0].date} />
          </div>
        </section>
      )}

      {/* Events */}
      {sectionConfig.events && events.length > 0 && (
        <section className="py-32 px-8">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-cinzel text-center text-4xl mb-24 tracking-widest uppercase">Wedding Details</h2>
            <div className="grid md:grid-cols-2 gap-16">
              {events.map(event => (
                <div key={event.id} className="text-center font-montserrat p-12 bg-[#111] border border-[#d4af37]/20 relative">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0a0a0a] px-4">
                    <div className="w-4 h-4 rotate-45 border border-[#d4af37]/50"></div>
                  </div>
                  <h3 className="font-cinzel text-2xl mb-6 text-white">{event.title}</h3>
                  <div className="space-y-2 mb-8">
                    <p className="tracking-widest uppercase text-sm text-[#d4af37]">
                      {new Date(event.date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                    {(event.startTime || event.endTime) && (
                      <p className="text-gray-400 text-sm">{event.startTime || '??'} — {event.endTime || 'End'}</p>
                    )}
                  </div>
                  <p className="text-white/90 font-light text-lg mb-2">{event.venue}</p>
                  {event.address && <p className="text-gray-500 font-light text-sm mb-8 leading-relaxed">{event.address}</p>}
                  
                  {event.mapUrl && (
                    <a href={event.mapUrl} target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-3 border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition-colors text-xs tracking-widest uppercase">
                      View on Map
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
        <section className="py-32 px-8 bg-[#111] border-y border-[#d4af37]/20 font-montserrat">
          <h2 className="font-cinzel text-center text-4xl mb-24 tracking-widest uppercase">Love Story</h2>
          <div className="max-w-4xl mx-auto space-y-16">
            {loveStory.map((story, i) => (
              <div key={story.id} className={`flex flex-col md:flex-row gap-8 items-center text-center ${i % 2 === 0 ? 'md:text-right' : 'md:text-left md:flex-row-reverse'}`}>
                <div className="flex-1">
                  {story.date && <p className="text-sm tracking-widest uppercase text-[#d4af37]/70 mb-2">{story.date}</p>}
                  <h3 className="font-cinzel text-2xl text-white mb-4">{story.title}</h3>
                  <p className="text-gray-400 font-light leading-relaxed">{story.description}</p>
                </div>
                <div className="hidden md:flex w-16 justify-center">
                  <div className="w-px h-full min-h-[100px] bg-[#d4af37]/30 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rotate-45 bg-[#d4af37]"></div>
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
        <section className="py-32 px-8">
          <h2 className="font-cinzel text-center text-4xl mb-24 tracking-widest uppercase">Gallery</h2>
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-2">
            {gallery.map((item, i) => (
              <div key={item.id} className={`relative bg-[#1a1a1a] group overflow-hidden ${i === 0 ? 'col-span-2 row-span-2' : 'aspect-square'}`}>
                <img src={item.imageUrl} alt={item.caption || 'Gallery'} className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition duration-700" />
                <div className="absolute inset-0 border border-[#d4af37]/0 group-hover:border-[#d4af37]/50 transition-colors m-2"></div>
              </div>
            ))}
          </div>
        </section>
      )}
    
      <PublicSharedSections data={data} isDark={true} />
    </div>
  )
}
