import { PublicSharedSections } from '@/components/public/PublicSharedSections'
import { CountdownTimer } from '@/components/public/CountdownTimer'
import { HeroCouplePhoto } from '@/components/public/HeroCouplePhoto'
import { ThemeData } from '@/modules/theme/types/theme-data'

export default function FloralTheme({ data }: { data: ThemeData }) {
  const { invitation, events, gallery, loveStory, weddingGifts } = data
  const { sectionConfig } = invitation
  const couplePhoto = gallery[0]?.imageUrl || invitation.groomPhoto || invitation.bridePhoto

  return (
    <div className="bg-rose-50/50 text-rose-900 min-h-screen font-sans">
      <style>{
        `@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Lora:ital,wght@0,400;0,600;1,400&display=swap');
        .font-cursive { font-family: 'Dancing Script', cursive; }
        .font-lora { font-family: 'Lora', serif; }`
      }</style>

      {/* Hero */}
      {sectionConfig.hero && (
        <section id="hero" className="min-h-screen relative flex flex-col items-center justify-center p-6 sm:p-8 overflow-hidden font-lora text-center">
          <div className="absolute top-0 left-0 w-64 h-64 bg-rose-200 rounded-full blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-200 rounded-full blur-3xl opacity-50 translate-x-1/3 translate-y-1/3"></div>
          
          <div className="z-10 bg-white/75 p-8 sm:p-12 rounded-3xl backdrop-blur-sm border border-white shadow-xl max-w-2xl w-full space-y-4">
            <h2 className="tracking-[0.2em] uppercase text-xs sm:text-sm text-rose-600 font-semibold">
              {invitation.openingTitle || 'The Wedding Of'}
            </h2>

            {/* Couple Feature Focus Photo with Frame */}
            <HeroCouplePhoto
              photoUrl={couplePhoto}
              groomName={invitation.groomName}
              brideName={invitation.brideName}
              themeSlug="floral"
              frameVariant="double-ring"
            />

            <h1 className="font-cursive text-5xl sm:text-7xl md:text-8xl text-rose-600 drop-shadow-sm leading-tight">
              {invitation.groomName} <br/><span className="text-4xl sm:text-5xl text-rose-400">&</span><br/> {invitation.brideName}
            </h1>
            {events.length > 0 && (
              <p className="pt-4 font-semibold text-rose-700 tracking-wider text-sm sm:text-base">
                {new Date(events[0].date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            )}
          </div>
        </section>
      )}

      {/* Quote */}
      {sectionConfig.quote && invitation.quote && (
        <section className="py-20 px-8 text-center font-lora">
          <div className="max-w-3xl mx-auto">
            <p className="text-rose-400 text-3xl mb-6">🌿</p>
            <p className="text-xl md:text-2xl text-rose-800 italic leading-relaxed font-medium">"{invitation.quote}"</p>
            {invitation.quoteSource && (
              <p className="mt-6 text-rose-600 font-semibold uppercase tracking-widest text-sm">— {invitation.quoteSource} —</p>
            )}
          </div>
        </section>
      )}

      {/* Couple */}
      {sectionConfig.couple && (
        <section id="couple" className="py-24 px-8 text-center font-lora">
          <h2 className="font-cursive text-5xl text-rose-600 mb-16">The Happy Couple</h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-16 max-w-5xl mx-auto">
            <div className="text-center w-full">
              <div className="w-56 h-56 md:w-64 md:h-64 rounded-full bg-rose-100 mx-auto mb-8 border-[12px] border-white shadow-xl overflow-hidden relative">
                {invitation.groomPhoto ? (
                  <img src={invitation.groomPhoto} className="w-full h-full object-cover" alt="Groom" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">🤵</div>
                )}
              </div>
              <h3 className="text-3xl font-bold text-rose-800 mb-3">{invitation.groomFullName || invitation.groomName}</h3>
              {(invitation.groomFather || invitation.groomMother) && (
                <p className="text-rose-600 text-sm leading-relaxed">
                  Putra dari <br/><span className="font-semibold">Bapak {invitation.groomFather} & Ibu {invitation.groomMother}</span>
                </p>
              )}
            </div>
            
            <div className="font-cursive text-6xl text-pink-400">🤍</div>
            
            <div className="text-center w-full">
              <div className="w-56 h-56 md:w-64 md:h-64 rounded-full bg-rose-100 mx-auto mb-8 border-[12px] border-white shadow-xl overflow-hidden relative">
                {invitation.bridePhoto ? (
                  <img src={invitation.bridePhoto} className="w-full h-full object-cover" alt="Bride" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">👰</div>
                )}
              </div>
              <h3 className="text-3xl font-bold text-rose-800 mb-3">{invitation.brideFullName || invitation.brideName}</h3>
              {(invitation.brideFather || invitation.brideMother) && (
                <p className="text-rose-600 text-sm leading-relaxed">
                  Putri dari <br/><span className="font-semibold">Bapak {invitation.brideFather} & Ibu {invitation.brideMother}</span>
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Countdown */}
      {sectionConfig.countdown && events.length > 0 && (
        <section className="py-20 px-8 bg-rose-100/50 text-center relative font-lora">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-4xl">🌺</div>
          <h2 className="font-cursive text-4xl text-rose-600 mb-12 mt-4">Save the Date</h2>
          <CountdownTimer targetDate={events[0].date} />
        </section>
      )}

      {/* Events */}
      {sectionConfig.events && events.length > 0 && (
        <section id="events" className="py-24 px-8 bg-white/60 font-lora relative">
          <h2 className="font-cursive text-5xl text-rose-600 mb-16 text-center">Wedding Events</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            {events.map(event => (
              <div key={event.id} className="bg-white p-10 rounded-3xl shadow-lg shadow-rose-100/50 border border-rose-50 text-center relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 text-6xl opacity-10 group-hover:scale-110 transition-transform">🌸</div>
                <h3 className="font-cursive text-4xl text-rose-500 mb-6">{event.title}</h3>
                <div className="bg-rose-50 rounded-xl py-3 px-4 inline-block mb-6">
                  <p className="font-bold text-rose-800">{new Date(event.date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  {(event.startTime || event.endTime) && (
                    <p className="text-rose-600 text-sm mt-1">{event.startTime || '??'} - {event.endTime || 'Selesai'}</p>
                  )}
                </div>
                <p className="font-semibold text-lg text-rose-800 mb-2">{event.venue}</p>
                {event.address && <p className="text-sm text-rose-500 mb-8">{event.address}</p>}
                
                {event.mapUrl && (
                  <a href={event.mapUrl} target="_blank" rel="noopener noreferrer" className="inline-block bg-rose-400 hover:bg-rose-500 text-white px-6 py-2 rounded-full text-sm transition-colors shadow-md">
                    Buka Google Maps
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Story */}
      {sectionConfig.story && loveStory.length > 0 && (
        <section id="story" className="py-24 px-8 font-lora">
          <h2 className="font-cursive text-5xl text-rose-600 mb-16 text-center">Our Journey</h2>
          <div className="max-w-3xl mx-auto space-y-12">
            {loveStory.map((story, i) => (
              <div key={story.id} className="flex flex-col md:flex-row gap-6 items-center md:items-start bg-white p-8 rounded-3xl shadow-sm border border-rose-100">
                <div className="w-16 h-16 shrink-0 bg-rose-100 rounded-full flex items-center justify-center text-2xl">
                  {['🌱', '🌿', '🌷', '🌺', '💝'][i % 5]}
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-2xl font-bold text-rose-800 mb-2">{story.title}</h3>
                  {story.date && <p className="text-rose-500 font-semibold text-sm mb-3">{story.date}</p>}
                  <p className="text-rose-700 leading-relaxed">{story.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Gallery */}
      {sectionConfig.gallery && gallery.length > 0 && (
        <section id="gallery" className="py-24 px-8 bg-rose-100/30">
          <h2 className="font-cursive text-5xl text-rose-600 mb-16 text-center">Beautiful Moments</h2>
          <div className="max-w-6xl mx-auto columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            {gallery.map(item => (
              <div key={item.id} className="break-inside-avoid rounded-2xl overflow-hidden shadow-sm border-4 border-white">
                <img src={item.imageUrl} alt={item.caption || 'Gallery'} className="w-full h-auto hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </section>
      )}
    
      <PublicSharedSections data={data} />
    </div>
  )
}
