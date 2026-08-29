import { PublicSharedSections } from '@/components/public/PublicSharedSections'
import { CountdownTimer } from '@/components/public/CountdownTimer'
import { ThemeData } from '@/modules/theme/types/theme-data'

export default function VintageTheme({ data }: { data: ThemeData }) {
  const { invitation, events, gallery, loveStory, weddingGifts } = data
  const { sectionConfig } = invitation

  return (
    <div className="font-serif bg-[#fdfbf7] text-[#5c3a21] min-h-screen">
      {/* Hero Section */}
      {sectionConfig.hero && (
        <section className="min-h-screen flex flex-col items-center justify-center p-4">
          <div className="w-full max-w-3xl border-8 border-double border-[#d2b48c] p-2">
            <div className="border border-[#d2b48c] p-12 text-center relative bg-[url('/vintage-paper-texture.png')] bg-cover bg-center">
              <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-[#8b5a2b]"></div>
              <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-[#8b5a2b]"></div>
              <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-[#8b5a2b]"></div>
              <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-[#8b5a2b]"></div>

              <h2 className="text-sm tracking-[0.4em] uppercase mb-12 text-[#a67c52]">
                {invitation.openingTitle || 'The Wedding Of'}
              </h2>
              <h1 className="text-6xl md:text-8xl mb-4 font-normal text-[#4a2e1b]">
                {invitation.groomName}
              </h1>
              <div className="text-3xl italic text-[#8b5a2b] my-4">&</div>
              <h1 className="text-6xl md:text-8xl mb-12 font-normal text-[#4a2e1b]">
                {invitation.brideName}
              </h1>
              {events.length > 0 && (
                <div className="inline-block border-y-2 border-[#a67c52] py-4 px-12 mt-4 text-[#5c3a21] tracking-[0.2em] uppercase text-sm">
                  {new Date(events[0].date).toLocaleDateString('id-ID', {
                    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                  })}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Quote Section */}
      {sectionConfig.quote && invitation.quote && (
        <section className="py-24 px-8 text-center max-w-2xl mx-auto">
          <div className="w-16 h-px bg-[#a67c52] mx-auto mb-8"></div>
          <p className="italic text-2xl text-[#8b5a2b] leading-loose">
            "{invitation.quote}"
          </p>
          {invitation.quoteSource && (
            <p className="mt-8 font-medium text-sm uppercase tracking-widest text-[#5c3a21]">
              ~ {invitation.quoteSource} ~
            </p>
          )}
          <div className="w-16 h-px bg-[#a67c52] mx-auto mt-8"></div>
        </section>
      )}

      {/* Couple Section */}
      {sectionConfig.couple && (
        <section className="py-20 px-8 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl italic text-[#8b5a2b] mb-16">The Beloved Couple</h2>
          <div className="space-y-24">
            <div className="flex flex-col items-center">
              <div className="w-48 h-64 mx-auto p-2 border-2 border-[#d2b48c] mb-8">
                <img src={invitation.groomPhoto || '/placeholder.jpg'} alt="Groom" className="w-full h-full object-cover grayscale-[30%] sepia-[40%]" />
              </div>
              <h3 className="text-4xl font-semibold mb-4 text-[#4a2e1b]">{invitation.groomFullName || invitation.groomName}</h3>
              <p className="text-sm text-[#a67c52] uppercase tracking-[0.3em] mb-4">The Groom</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-48 h-64 mx-auto p-2 border-2 border-[#d2b48c] mb-8">
                <img src={invitation.bridePhoto || '/placeholder.jpg'} alt="Bride" className="w-full h-full object-cover grayscale-[30%] sepia-[40%]" />
              </div>
              <h3 className="text-4xl font-semibold mb-4 text-[#4a2e1b]">{invitation.brideFullName || invitation.brideName}</h3>
              <p className="text-sm text-[#a67c52] uppercase tracking-[0.3em] mb-4">The Bride</p>
            </div>
          </div>
        </section>
      )}

      {/* Events Section */}
      {sectionConfig.events && events.length > 0 && (
        <section className="py-24 px-8 border-y-8 border-double border-[#d2b48c] bg-[#f5f0e6]">
          <h2 className="text-3xl italic text-[#8b5a2b] mb-16 text-center">Wedding Celebration</h2>
          <div className="max-w-3xl mx-auto space-y-16">
            {events.map(event => (
              <div key={event.id} className="text-center relative">
                <h3 className="text-3xl mb-4 font-semibold text-[#4a2e1b]">{event.title}</h3>
                <p className="mb-2 uppercase tracking-[0.2em] text-[#8b5a2b] text-sm">
                  {new Date(event.date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
                <div className="w-32 h-px bg-[#a67c52] mx-auto my-6"></div>
                {(event.startTime || event.endTime) && (
                  <p className="text-[#5c3a21] mb-6 italic">{event.startTime || '??'} to {event.endTime || 'Selesai'}</p>
                )}
                <p className="font-semibold text-xl mb-2 text-[#4a2e1b]">{event.venue}</p>
                {event.address && <p className="text-[#a67c52] text-sm mb-8 max-w-sm mx-auto leading-relaxed">{event.address}</p>}
                
                {event.mapUrl && (
                  <a href={event.mapUrl} target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-3 border border-[#8b5a2b] text-[#8b5a2b] hover:bg-[#8b5a2b] hover:text-white transition-colors uppercase tracking-[0.2em] text-xs">
                    View Direction
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>
      )}
    
      <PublicSharedSections data={data} />
    </div>
  )
}
