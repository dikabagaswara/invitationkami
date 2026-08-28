import { PublicSharedSections } from '@/components/public/PublicSharedSections'
import { ThemeData } from '@/modules/theme/types/theme-data'

export default function LuxuryTheme({ data }: { data: ThemeData }) {
  const { invitation, events } = data
  const { sectionConfig } = invitation

  return (
    <div className="bg-[#0a0a0a] text-[#d4af37] min-h-screen">
      <style>{
        `@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=Montserrat:wght@300;400&display=swap');
        .font-cinzel { font-family: 'Cinzel', serif; }
        .font-montserrat { font-family: 'Montserrat', sans-serif; }`
      }</style>

      {/* Hero */}
      {sectionConfig.hero && (
        <section className="min-h-screen flex flex-col items-center justify-center p-8 font-cinzel text-center border-[12px] border-[#1a1a1a] m-4 relative">
          <div className="absolute inset-8 border border-[#d4af37]/30"></div>
          <p className="tracking-[0.5em] text-xs uppercase mb-12 text-[#d4af37]/70 font-montserrat">Join us to celebrate</p>
          <h1 className="text-5xl md:text-7xl mb-8 leading-tight">
            {invitation.groomName} <br />
            <span className="text-3xl text-[#d4af37]/50 italic my-4 block">&</span> 
            {invitation.brideName}
          </h1>
          {events.length > 0 && (
            <p className="mt-12 tracking-[0.2em] font-montserrat uppercase text-sm border-b border-[#d4af37]/30 pb-4 inline-block">
              {new Date(events[0].date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          )}
        </section>
      )}

      {/* Couple */}
      {sectionConfig.couple && (
        <section className="py-32 px-8 max-w-4xl mx-auto font-montserrat text-center">
          <h2 className="font-cinzel text-3xl md:text-4xl mb-16 text-[#d4af37]">The Groom & Bride</h2>
          <div className="space-y-24">
            <div>
              <h3 className="font-cinzel text-3xl mb-4">{invitation.groomFullName || invitation.groomName}</h3>
              <div className="w-16 h-px bg-[#d4af37]/50 mx-auto"></div>
            </div>
            <div>
              <h3 className="font-cinzel text-3xl mb-4">{invitation.brideFullName || invitation.brideName}</h3>
              <div className="w-16 h-px bg-[#d4af37]/50 mx-auto"></div>
            </div>
          </div>
        </section>
      )}

      {/* Events */}
      {sectionConfig.events && events.length > 0 && (
        <section className="py-32 px-8 bg-[#111] border-y border-[#d4af37]/20">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-cinzel text-center text-4xl mb-24">Wedding Details</h2>
            <div className="grid md:grid-cols-2 gap-16">
              {events.map(event => (
                <div key={event.id} className="text-center font-montserrat">
                  <h3 className="font-cinzel text-2xl mb-6 text-[#d4af37]">{event.title}</h3>
                  <p className="tracking-widest uppercase mb-4 text-sm text-[#d4af37]/80">
                    {new Date(event.date).toLocaleDateString()}
                  </p>
                  <p className="text-gray-400 font-light leading-relaxed">{event.venue}</p>
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
