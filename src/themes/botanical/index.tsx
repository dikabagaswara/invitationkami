import { PublicSharedSections } from '@/components/public/PublicSharedSections'
import { CountdownTimer } from '@/components/public/CountdownTimer'
import { ThemeData } from '@/modules/theme/types/theme-data'

export default function BotanicalTheme({ data }: { data: ThemeData }) {
  const { invitation, events, gallery, loveStory, weddingGifts } = data
  const { sectionConfig } = invitation

  return (
    <div className="font-serif bg-emerald-50 text-stone-800 min-h-screen">
      {/* Hero Section */}
      {sectionConfig.hero && (
        <section className="min-h-screen flex flex-col items-center justify-center text-center p-8 border-8 border-double border-emerald-200 m-4 relative">
          <h2 className="text-xl tracking-[0.3em] uppercase mb-8 text-emerald-700 font-light">
            {invitation.openingTitle || 'The Wedding Of'}
          </h2>
          <h1 className="text-6xl md:text-8xl mb-8 font-light tracking-wider drop-shadow-sm">
            {invitation.groomName} <span className="text-emerald-500 italic">&</span> {invitation.brideName}
          </h1>
          {events.length > 0 && (
            <p className="text-xl tracking-widest uppercase border-t border-b border-emerald-300 py-4 px-12 mt-8 text-emerald-800">
              {new Date(events[0].date).toLocaleDateString('id-ID', {
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
              })}
            </p>
          )}
        </section>
      )}

      {/* Quote Section */}
      {sectionConfig.quote && invitation.quote && (
        <section className="py-20 px-8 text-center max-w-2xl mx-auto">
          <p className="text-emerald-500 text-3xl mb-4">❧</p>
          <p className="italic text-lg md:text-xl text-stone-600 leading-relaxed">
            "{invitation.quote}"
          </p>
          {invitation.quoteSource && (
            <p className="mt-4 font-semibold text-sm uppercase tracking-wider text-emerald-700">
              - {invitation.quoteSource} -
            </p>
          )}
        </section>
      )}

      {/* Couple Section */}
      {sectionConfig.couple && (
        <section className="py-24 px-8 max-w-4xl mx-auto text-center relative">
          <h2 className="text-4xl italic text-emerald-700 mb-20 font-light">Meet the Couple</h2>
          <div className="grid md:grid-cols-2 gap-16">
            <div className="space-y-6">
              <div className="w-56 h-72 mx-auto bg-emerald-100 rounded-t-full shadow-lg overflow-hidden border-8 border-white">
                {invitation.groomPhoto ? (
                  <img src={invitation.groomPhoto} alt="Groom" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-emerald-200/50"></div>
                )}
              </div>
              <div>
                <h3 className="text-3xl font-semibold mb-2">{invitation.groomFullName || invitation.groomName}</h3>
                <p className="text-sm text-stone-500 uppercase tracking-widest mb-2">The Groom</p>
                {(invitation.groomFather || invitation.groomMother) && (
                  <p className="text-sm text-stone-600">
                    Putra dari <br />
                    Bapak {invitation.groomFather} & Ibu {invitation.groomMother}
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-6">
              <div className="w-56 h-72 mx-auto bg-emerald-100 rounded-t-full shadow-lg overflow-hidden border-8 border-white">
                {invitation.bridePhoto ? (
                  <img src={invitation.bridePhoto} alt="Bride" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-emerald-200/50"></div>
                )}
              </div>
              <div>
                <h3 className="text-3xl font-semibold mb-2">{invitation.brideFullName || invitation.brideName}</h3>
                <p className="text-sm text-stone-500 uppercase tracking-widest mb-2">The Bride</p>
                {(invitation.brideFather || invitation.brideMother) && (
                  <p className="text-sm text-stone-600">
                    Putri dari <br />
                    Bapak {invitation.brideFather} & Ibu {invitation.brideMother}
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Countdown Section */}
      {sectionConfig.countdown && events.length > 0 && (
        <section className="py-20 px-8 bg-emerald-100/50 text-center border-y border-emerald-200">
          <h2 className="text-3xl italic text-emerald-700 mb-12 font-light">Save the Date</h2>
          <CountdownTimer targetDate={events[0].date} />
        </section>
      )}

      {/* Events Section */}
      {sectionConfig.events && events.length > 0 && (
        <section className="py-24 px-8 bg-white text-center">
          <h2 className="text-4xl italic text-emerald-700 mb-20 font-light">Wedding Events</h2>
          <div className="max-w-3xl mx-auto space-y-12">
            {events.map(event => (
              <div key={event.id} className="p-10 border border-emerald-200 shadow-sm relative bg-emerald-50/30">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-emerald-500 text-2xl">❧</div>
                <h3 className="text-3xl mb-4 font-semibold">{event.title}</h3>
                <p className="mb-2 font-semibold text-lg text-emerald-800">
                  {new Date(event.date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
                {(event.startTime || event.endTime) && (
                  <p className="text-stone-600 mb-4">{event.startTime || '??'} - {event.endTime || 'Selesai'}</p>
                )}
                <div className="w-16 h-px bg-emerald-300 mx-auto my-4"></div>
                <p className="font-medium text-lg mb-1">{event.venue}</p>
                {event.address && <p className="text-stone-500 text-sm mb-6 max-w-md mx-auto">{event.address}</p>}
                
                {event.mapUrl && (
                  <a href={event.mapUrl} target="_blank" rel="noopener noreferrer" className="inline-block mt-4 px-6 py-2 border border-emerald-600 text-emerald-700 hover:bg-emerald-600 hover:text-white transition-colors rounded-full text-sm uppercase tracking-widest">
                    Buka Google Maps
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Story Section */}
      {sectionConfig.story && loveStory.length > 0 && (
        <section className="py-24 px-8 max-w-4xl mx-auto text-center">
          <h2 className="text-4xl italic text-emerald-700 mb-20 font-light">Our Love Story</h2>
          <div className="space-y-12 relative before:absolute before:inset-0 before:ml-1/2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-emerald-200">
            {loveStory.map((story, i) => (
              <div key={story.id} className="relative z-10 bg-emerald-50 p-6 md:p-8 border border-emerald-200 shadow-sm max-w-lg mx-auto">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-emerald-500 border-4 border-emerald-50"></div>
                <h3 className="text-2xl mb-2 font-semibold text-emerald-800">{story.title}</h3>
                {story.date && <p className="text-sm font-semibold text-emerald-600 mb-4">{story.date}</p>}
                <p className="text-stone-600 leading-relaxed text-sm md:text-base">{story.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Gallery Section */}
      {sectionConfig.gallery && gallery.length > 0 && (
        <section className="py-24 px-8 bg-emerald-100/50">
          <h2 className="text-4xl italic text-emerald-700 mb-16 font-light text-center">Gallery</h2>
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {gallery.map(item => (
              <div key={item.id} className="aspect-square bg-emerald-200 overflow-hidden shadow-md border-4 border-white">
                <img src={item.imageUrl} alt={item.caption || 'Gallery'} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
            ))}
          </div>
        </section>
      )}
    
      <PublicSharedSections data={data} />
    </div>
  )
}

