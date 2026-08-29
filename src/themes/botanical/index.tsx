import { PublicSharedSections } from '@/components/public/PublicSharedSections'
import { CountdownTimer } from '@/components/public/CountdownTimer'
import { ThemeData } from '@/modules/theme/types/theme-data'

export default function BotanicalTheme({ data }: { data: ThemeData }) {
  const { invitation, events, gallery, loveStory, weddingGifts } = data
  const { sectionConfig } = invitation

  return (
    <div className="font-serif bg-[#1a2f14] text-[#e8eee8] min-h-screen">
      {/* Hero Section */}
      {sectionConfig.hero && (
        <section className="min-h-screen flex flex-col items-center justify-center text-center p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#2d4a22] to-[#1a2f14] opacity-80"></div>
          <div className="relative z-10 w-full max-w-3xl border border-[#4b6b43]/40 p-12 bg-[#1a2f14]/50 backdrop-blur-sm">
            <h2 className="text-sm tracking-[0.4em] uppercase mb-10 text-[#a3b899] font-light">
              {invitation.openingTitle || 'The Wedding Of'}
            </h2>
            <h1 className="text-5xl md:text-7xl mb-6 font-medium text-white tracking-wide">
              {invitation.groomName} <span className="text-[#a3b899] italic font-light mx-2">&</span> {invitation.brideName}
            </h1>
            {events.length > 0 && (
              <div className="w-24 h-px bg-[#a3b899] mx-auto my-8"></div>
            )}
            {events.length > 0 && (
              <p className="text-lg tracking-widest uppercase text-[#c1d1bd]">
                {new Date(events[0].date).toLocaleDateString('id-ID', {
                  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                })}
              </p>
            )}
          </div>
        </section>
      )}

      {/* Quote Section */}
      {sectionConfig.quote && invitation.quote && (
        <section className="py-24 px-8 text-center max-w-3xl mx-auto border-b border-[#4b6b43]/30">
          <p className="text-[#a3b899] text-4xl mb-6">â š</p>
          <p className="italic text-xl md:text-2xl text-[#c1d1bd] leading-relaxed font-light">
            "{invitation.quote}"
          </p>
          {invitation.quoteSource && (
            <p className="mt-8 font-medium text-xs uppercase tracking-widest text-[#a3b899]">
              {invitation.quoteSource}
            </p>
          )}
        </section>
      )}

      {/* Couple Section */}
      {sectionConfig.couple && (
        <section className="py-32 px-8 max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-16 md:gap-8 justify-between">
            <div className="flex-1 text-center md:text-right space-y-6">
              <h3 className="text-4xl font-medium text-white">{invitation.groomFullName || invitation.groomName}</h3>
              <p className="text-sm text-[#a3b899] uppercase tracking-[0.2em]">The Groom</p>
              {(invitation.groomFather || invitation.groomMother) && (
                <p className="text-sm text-[#c1d1bd] opacity-80">
                  Putra dari <br />
                  Bapak {invitation.groomFather} & Ibu {invitation.groomMother}
                </p>
              )}
            </div>
            <div className="w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-2 border-[#a3b899] p-2 flex-shrink-0">
              <div className="w-full h-full rounded-full overflow-hidden">
                <img src={invitation.groomPhoto || '/placeholder.jpg'} alt="Groom" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row-reverse items-center gap-16 md:gap-8 justify-between mt-24">
            <div className="flex-1 text-center md:text-left space-y-6">
              <h3 className="text-4xl font-medium text-white">{invitation.brideFullName || invitation.brideName}</h3>
              <p className="text-sm text-[#a3b899] uppercase tracking-[0.2em]">The Bride</p>
              {(invitation.brideFather || invitation.brideMother) && (
                <p className="text-sm text-[#c1d1bd] opacity-80">
                  Putri dari <br />
                  Bapak {invitation.brideFather} & Ibu {invitation.brideMother}
                </p>
              )}
            </div>
            <div className="w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-2 border-[#a3b899] p-2 flex-shrink-0">
              <div className="w-full h-full rounded-full overflow-hidden">
                <img src={invitation.bridePhoto || '/placeholder.jpg'} alt="Bride" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Events Section */}
      {sectionConfig.events && events.length > 0 && (
        <section className="py-24 px-4 bg-[#233c1b]">
          <h2 className="text-3xl text-[#a3b899] mb-16 font-light text-center tracking-widest uppercase">Wedding Events</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            {events.map(event => (
              <div key={event.id} className="p-12 border border-[#4b6b43] bg-[#1a2f14] text-center">
                <h3 className="text-2xl mb-4 font-medium text-white">{event.title}</h3>
                <p className="mb-6 font-light text-[#a3b899]">
                  {new Date(event.date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
                <div className="w-12 h-px bg-[#4b6b43] mx-auto my-6"></div>
                {(event.startTime || event.endTime) && (
                  <p className="text-[#c1d1bd] mb-6 tracking-wide">{event.startTime || '??'} - {event.endTime || 'Selesai'}</p>
                )}
                <p className="font-medium text-lg mb-2 text-white">{event.venue}</p>
                {event.address && <p className="text-[#8c9e82] text-sm mb-8 leading-relaxed">{event.address}</p>}
                
                {event.mapUrl && (
                  <a href={event.mapUrl} target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-3 bg-[#a3b899] text-[#1a2f14] hover:bg-white transition-colors text-xs uppercase tracking-widest font-semibold">
                    View on Map
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
