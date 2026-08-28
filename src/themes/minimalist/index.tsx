import { PublicSharedSections } from '@/components/public/PublicSharedSections'
import { CountdownTimer } from '@/components/public/CountdownTimer'
import { ThemeData } from '@/modules/theme/types/theme-data'

export default function MinimalistTheme({ data }: { data: ThemeData }) {
  const { invitation, events, gallery, loveStory, weddingGifts } = data
  const { sectionConfig } = invitation

  return (
    <div className="bg-white text-black min-h-screen">
      <style>{
        `@import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');
        .font-dm { font-family: 'DM Sans', sans-serif; }`
      }</style>

      {/* Hero */}
      {sectionConfig.hero && (
        <section className="min-h-screen flex flex-col items-center justify-center p-8 font-dm text-center">
          <div className="max-w-4xl w-full">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-16">
              {invitation.openingTitle || 'Wedding Invitation'}
            </p>
            <h1 className="text-6xl md:text-8xl font-light mb-4 tracking-tight">
              {invitation.groomName}
            </h1>
            <p className="text-3xl font-light text-gray-300 my-4">&</p>
            <h1 className="text-6xl md:text-8xl font-light mb-16 tracking-tight">
              {invitation.brideName}
            </h1>
            {events.length > 0 && (
              <p className="text-sm font-medium tracking-widest uppercase text-gray-600">
                {new Date(events[0].date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            )}
          </div>
        </section>
      )}

      {/* Quote */}
      {sectionConfig.quote && invitation.quote && (
        <section className="py-24 px-8 text-center font-dm max-w-3xl mx-auto">
          <p className="text-2xl font-light text-gray-800 leading-relaxed mb-8">
            {invitation.quote}
          </p>
          {invitation.quoteSource && (
            <p className="text-xs uppercase tracking-widest text-gray-500">{invitation.quoteSource}</p>
          )}
        </section>
      )}

      {/* Couple */}
      {sectionConfig.couple && (
        <section className="py-32 px-8 font-dm max-w-4xl mx-auto border-t border-gray-100">
          <div className="grid md:grid-cols-2 gap-24 text-center md:text-left">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-6">Groom</p>
              <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 mx-auto md:mx-0 mb-8">
                {invitation.groomPhoto && <img src={invitation.groomPhoto} className="w-full h-full object-cover" alt="Groom" />}
              </div>
              <h2 className="text-3xl font-light mb-4">{invitation.groomFullName || invitation.groomName}</h2>
              {(invitation.groomFather || invitation.groomMother) && (
                <p className="text-gray-500 text-sm">Son of {invitation.groomFather} & {invitation.groomMother}</p>
              )}
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-6">Bride</p>
              <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 mx-auto md:mx-0 mb-8">
                {invitation.bridePhoto && <img src={invitation.bridePhoto} className="w-full h-full object-cover" alt="Bride" />}
              </div>
              <h2 className="text-3xl font-light mb-4">{invitation.brideFullName || invitation.brideName}</h2>
              {(invitation.brideFather || invitation.brideMother) && (
                <p className="text-gray-500 text-sm">Daughter of {invitation.brideFather} & {invitation.brideMother}</p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Countdown */}
      {sectionConfig.countdown && events.length > 0 && (
        <section className="py-24 px-8 border-y border-gray-100 font-dm">
          <CountdownTimer targetDate={events[0].date} />
        </section>
      )}

      {/* Events */}
      {sectionConfig.events && events.length > 0 && (
        <section className="py-32 px-8 font-dm">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-20 text-center">Itinerary</h2>
            <div className="space-y-16">
              {events.map((event, i) => (
                <div key={event.id} className="grid md:grid-cols-4 gap-8 items-start">
                  <div className="text-gray-500 text-sm md:text-right pt-1">
                    <p className="font-medium text-black mb-1">{new Date(event.date).toLocaleDateString('id-ID', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                    {(event.startTime || event.endTime) && (
                      <p>{event.startTime || '??'} - {event.endTime || 'End'}</p>
                    )}
                  </div>
                  <div className="md:col-span-3">
                    <h3 className="text-2xl font-light mb-3">{event.title}</h3>
                    <p className="text-black font-medium mb-1">{event.venue}</p>
                    {event.address && <p className="text-gray-500 text-sm mb-6">{event.address}</p>}
                    {event.mapUrl && (
                      <a href={event.mapUrl} target="_blank" rel="noopener noreferrer" className="text-xs uppercase tracking-widest text-black border-b border-black pb-1 hover:text-gray-500 hover:border-gray-500 transition-colors">
                        Map Location
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Story */}
      {sectionConfig.story && loveStory.length > 0 && (
        <section className="py-32 px-8 border-t border-gray-100 font-dm">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-20 text-center">Timeline</h2>
            <div className="space-y-12">
              {loveStory.map((story, i) => (
                <div key={story.id} className="flex gap-8">
                  <div className="text-gray-300 font-light text-3xl pt-1 w-12 text-right">0{i + 1}</div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">{story.title}</h3>
                    {story.date && <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">{story.date}</p>}
                    <p className="text-gray-600 font-light leading-relaxed">{story.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery */}
      {sectionConfig.gallery && gallery.length > 0 && (
        <section className="py-32 px-8 border-t border-gray-100">
          <div className="max-w-5xl mx-auto">
            <div className="columns-1 md:columns-3 gap-6 space-y-6">
              {gallery.map(item => (
                <div key={item.id} className="break-inside-avoid">
                  <img src={item.imageUrl} alt={item.caption || 'Gallery'} className="w-full h-auto" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    
      <PublicSharedSections data={data} />
    </div>
  )
}
