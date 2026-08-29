import { PublicSharedSections } from '@/components/public/PublicSharedSections'
import { CountdownTimer } from '@/components/public/CountdownTimer'
import { ThemeData } from '@/modules/theme/types/theme-data'

export default function OceanicTheme({ data }: { data: ThemeData }) {
  const { invitation, events, gallery, loveStory, weddingGifts } = data
  const { sectionConfig } = invitation

  return (
    <div className="font-sans bg-[#f0f9ff] text-[#0369a1] min-h-screen">
      {/* Hero Section */}
      {sectionConfig.hero && (
        <section className="min-h-screen flex flex-col items-center justify-center text-center p-6 relative overflow-hidden bg-[linear-gradient(to_bottom,#f0f9ff_0%,#e0f2fe_100%)]">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white to-transparent opacity-60"></div>
          
          <div className="relative z-10 w-full max-w-2xl bg-white/40 backdrop-blur-md border border-white/60 p-12 rounded-[3rem] shadow-[0_8px_32px_rgba(14,165,233,0.1)]">
            <h2 className="text-sm tracking-[0.3em] uppercase mb-8 text-[#0284c7] font-semibold">
              {invitation.openingTitle || 'The Wedding Of'}
            </h2>
            <h1 className="text-5xl md:text-7xl mb-4 font-bold text-[#0c4a6e] tracking-tight">
              {invitation.groomName}
            </h1>
            <div className="text-3xl text-[#38bdf8] italic my-2 font-serif">&</div>
            <h1 className="text-5xl md:text-7xl mb-8 font-bold text-[#0c4a6e] tracking-tight">
              {invitation.brideName}
            </h1>
            {events.length > 0 && (
              <div className="mt-8 pt-8 border-t border-[#bae6fd]">
                <p className="text-lg tracking-widest uppercase text-[#0369a1] font-medium">
                  {new Date(events[0].date).toLocaleDateString('id-ID', {
                    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                  })}
                </p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Quote Section */}
      {sectionConfig.quote && invitation.quote && (
        <section className="py-24 px-8 text-center max-w-3xl mx-auto">
          <p className="text-[#38bdf8] text-5xl mb-6">â š</p>
          <p className="text-2xl md:text-3xl text-[#0c4a6e] leading-snug font-light">
            "{invitation.quote}"
          </p>
          {invitation.quoteSource && (
            <p className="mt-8 font-bold text-sm uppercase tracking-widest text-[#0284c7]">
              - {invitation.quoteSource} -
            </p>
          )}
        </section>
      )}

      {/* Couple Section */}
      {sectionConfig.couple && (
        <section className="py-20 px-6 max-w-5xl mx-auto">
          <h2 className="text-sm font-bold text-center text-[#0284c7] mb-16 uppercase tracking-[0.3em]">Meet The Couple</h2>
          <div className="flex flex-col md:flex-row gap-12 justify-center items-center">
            <div className="flex-1 w-full max-w-sm bg-white rounded-[2.5rem] p-4 shadow-xl shadow-sky-100/50 text-center">
              <div className="w-full aspect-[3/4] rounded-[2rem] overflow-hidden mb-6">
                <img src={invitation.groomPhoto || '/placeholder.jpg'} alt="Groom" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-3xl font-bold text-[#0c4a6e] mb-2">{invitation.groomFullName || invitation.groomName}</h3>
              <p className="text-sm text-[#0284c7] font-semibold uppercase tracking-wider mb-2">The Groom</p>
            </div>
            
            <div className="w-12 h-12 rounded-full bg-[#e0f2fe] flex items-center justify-center text-[#0284c7] font-serif italic text-2xl z-10 -my-6 md:my-0 md:-mx-6 shadow-md border-4 border-white">
              &
            </div>

            <div className="flex-1 w-full max-w-sm bg-white rounded-[2.5rem] p-4 shadow-xl shadow-sky-100/50 text-center">
              <div className="w-full aspect-[3/4] rounded-[2rem] overflow-hidden mb-6">
                <img src={invitation.bridePhoto || '/placeholder.jpg'} alt="Bride" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-3xl font-bold text-[#0c4a6e] mb-2">{invitation.brideFullName || invitation.brideName}</h3>
              <p className="text-sm text-[#0284c7] font-semibold uppercase tracking-wider mb-2">The Bride</p>
            </div>
          </div>
        </section>
      )}

      {/* Events Section */}
      {sectionConfig.events && events.length > 0 && (
        <section className="py-24 px-6 relative bg-white">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#f0f9ff] to-white"></div>
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <h2 className="text-sm font-bold text-[#0284c7] mb-16 uppercase tracking-[0.3em]">Wedding Events</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {events.map(event => (
                <div key={event.id} className="p-10 rounded-[2rem] bg-[#f0f9ff] border border-[#e0f2fe] shadow-sm">
                  <h3 className="text-2xl font-bold text-[#0c4a6e] mb-4">{event.title}</h3>
                  <div className="inline-block px-4 py-1.5 bg-[#e0f2fe] text-[#0369a1] rounded-full text-sm font-semibold mb-4">
                    {new Date(event.date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                  <p className="text-[#0284c7] font-medium mb-6">{event.startTime || '??'} - {event.endTime || 'Selesai'}</p>
                  <p className="font-bold text-lg mb-2 text-[#0c4a6e]">{event.venue}</p>
                  {event.address && <p className="text-[#0369a1] text-sm mb-8">{event.address}</p>}
                  
                  {event.mapUrl && (
                    <a href={event.mapUrl} target="_blank" rel="noopener noreferrer" className="inline-block w-full py-3 bg-[#0ea5e9] text-white rounded-xl text-sm font-bold hover:bg-[#0284c7] transition-all shadow-md hover:shadow-lg">
                      View Location
                    </a>
                  )}
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
