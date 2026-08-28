import { PublicSharedSections } from '@/components/public/PublicSharedSections'
import { CountdownTimer } from '@/components/public/CountdownTimer'
import { ThemeData } from '@/modules/theme/types/theme-data'

export default function ModernTheme({ data }: { data: ThemeData }) {
  const { invitation, events, gallery, loveStory, weddingGifts } = data
  const { sectionConfig } = invitation

  return (
    <div className="font-sans bg-zinc-50 text-zinc-900 min-h-screen selection:bg-black selection:text-white">
      {/* Hero */}
      {sectionConfig.hero && (
        <section className="min-h-screen flex flex-col items-start justify-center p-8 md:p-24 relative overflow-hidden">
          <div className="w-24 h-2 bg-black mb-12"></div>
          <h2 className="text-sm md:text-base tracking-[0.2em] uppercase text-zinc-500 font-bold mb-6">
            {invitation.openingTitle || 'Wedding Invitation'}
          </h2>
          <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tighter leading-none mb-4">
            {invitation.groomName}
          </h1>
          <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tighter leading-none text-zinc-400 mb-12">
            {invitation.brideName}
          </h1>
          {events.length > 0 && (
            <div className="inline-block border-2 border-black p-4 font-bold uppercase tracking-wider text-sm">
              {new Date(events[0].date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          )}
        </section>
      )}

      {/* Quote */}
      {sectionConfig.quote && invitation.quote && (
        <section className="py-24 px-8 md:px-24 bg-zinc-200">
          <div className="max-w-4xl">
            <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-8">
              "{invitation.quote}"
            </h2>
            {invitation.quoteSource && (
              <p className="font-bold uppercase tracking-widest text-zinc-600">
                — {invitation.quoteSource}
              </p>
            )}
          </div>
        </section>
      )}

      {/* Couple */}
      {sectionConfig.couple && (
        <section className="py-24 px-8 md:px-24 bg-black text-white">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 md:gap-8 items-center justify-between">
            <div className="flex-1 space-y-6 w-full">
              <div className="aspect-square bg-zinc-800 relative group overflow-hidden">
                {invitation.groomPhoto ? (
                  <img src={invitation.groomPhoto} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="Groom" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-bold text-zinc-700 uppercase">No Photo</div>
                )}
                <div className="absolute bottom-4 left-4 bg-white text-black px-4 py-1 font-bold text-xs uppercase">Groom</div>
              </div>
              <div>
                <h3 className="text-3xl font-black uppercase">{invitation.groomFullName || invitation.groomName}</h3>
                {(invitation.groomFather || invitation.groomMother) && (
                  <p className="text-zinc-500 text-sm mt-2 font-medium">Son of {invitation.groomFather} & {invitation.groomMother}</p>
                )}
              </div>
            </div>
            
            <div className="text-6xl font-black text-zinc-800 md:-mx-8 z-10">&</div>

            <div className="flex-1 space-y-6 w-full text-right md:text-left">
              <div className="aspect-square bg-zinc-800 relative group overflow-hidden">
                {invitation.bridePhoto ? (
                  <img src={invitation.bridePhoto} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="Bride" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-bold text-zinc-700 uppercase">No Photo</div>
                )}
                <div className="absolute bottom-4 right-4 md:right-auto md:left-4 bg-white text-black px-4 py-1 font-bold text-xs uppercase">Bride</div>
              </div>
              <div>
                <h3 className="text-3xl font-black uppercase">{invitation.brideFullName || invitation.brideName}</h3>
                {(invitation.brideFather || invitation.brideMother) && (
                  <p className="text-zinc-500 text-sm mt-2 font-medium">Daughter of {invitation.brideFather} & {invitation.brideMother}</p>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Countdown */}
      {sectionConfig.countdown && events.length > 0 && (
        <section className="py-24 px-8 bg-zinc-900 text-white flex flex-col items-center border-t border-zinc-800">
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-zinc-500 mb-12">Countdown</h2>
          <CountdownTimer targetDate={events[0].date} />
        </section>
      )}

      {/* Events Timeline */}
      {sectionConfig.events && events.length > 0 && (
        <section className="py-32 px-8 md:px-24 max-w-6xl mx-auto">
          <h2 className="text-5xl font-black mb-24 uppercase tracking-tight">The Details</h2>
          <div className="space-y-24 border-l-4 border-black pl-8 md:pl-16">
            {events.map((event, i) => (
              <div key={event.id} className="relative">
                <div className="absolute -left-[38px] md:-left-[70px] top-2 w-8 h-8 bg-black rounded-full border-4 border-zinc-50"></div>
                <div className="inline-block bg-zinc-200 px-3 py-1 text-sm font-bold uppercase tracking-wider mb-4">
                  {new Date(event.date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
                <h3 className="text-4xl md:text-5xl font-black uppercase mb-4">{event.title}</h3>
                {(event.startTime || event.endTime) && (
                  <p className="text-xl font-medium text-zinc-600 mb-6">{event.startTime || '??'} - {event.endTime || 'Selesai'}</p>
                )}
                <div className="bg-white p-6 border-2 border-black max-w-2xl">
                  <p className="text-xl font-bold mb-2">{event.venue}</p>
                  {event.address && <p className="text-zinc-600 mb-6">{event.address}</p>}
                  {event.mapUrl && (
                    <a href={event.mapUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center bg-black text-white px-6 py-3 font-bold uppercase text-sm hover:bg-zinc-800 transition">
                      View on Map
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Story */}
      {sectionConfig.story && loveStory.length > 0 && (
        <section className="py-32 px-8 md:px-24 bg-zinc-100">
          <h2 className="text-5xl font-black mb-24 uppercase tracking-tight text-center">Our Story</h2>
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
            {loveStory.map((story, i) => (
              <div key={story.id} className="bg-white border-2 border-black p-8 group hover:-translate-y-2 transition-transform">
                {story.date && <p className="text-zinc-400 font-bold uppercase tracking-wider text-sm mb-4">{story.date}</p>}
                <h3 className="text-2xl font-black uppercase mb-4">{story.title}</h3>
                <p className="text-zinc-600 font-medium leading-relaxed">{story.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Gallery */}
      {sectionConfig.gallery && gallery.length > 0 && (
        <section className="px-4 py-12 md:px-12 md:py-24 bg-zinc-900">
          <h2 className="text-white text-5xl font-black mb-16 uppercase tracking-tight text-center">Moments</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {gallery.map((item, i) => (
              <div key={item.id} className={`bg-zinc-800 aspect-square grayscale hover:grayscale-0 transition duration-500 ${i % 5 === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}>
                <img src={item.imageUrl} className="w-full h-full object-cover opacity-80 hover:opacity-100" alt="Gallery" />
              </div>
            ))}
          </div>
        </section>
      )}
    
      <PublicSharedSections data={data} />
    </div>
  )
}
