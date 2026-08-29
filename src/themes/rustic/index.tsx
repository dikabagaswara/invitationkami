import { PublicSharedSections } from '@/components/public/PublicSharedSections'
import { CountdownTimer } from '@/components/public/CountdownTimer'
import { ThemeData } from '@/modules/theme/types/theme-data'

export default function RusticTheme({ data }: { data: ThemeData }) {
  const { invitation, events, gallery, loveStory, weddingGifts } = data
  const { sectionConfig } = invitation

  return (
    <div className="font-serif bg-[#f6f4f0] text-[#4e5340] min-h-screen">
      {/* Hero Section */}
      {sectionConfig.hero && (
        <section className="min-h-screen flex flex-col items-center justify-center p-6 relative">
          <div className="w-full max-w-4xl h-[85vh] bg-white rounded-3xl shadow-xl flex flex-col items-center justify-center p-8 relative overflow-hidden border border-[#d3cec4]">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,#f9f8f6,transparent_50%)]"></div>
            <h2 className="relative z-10 text-sm tracking-[0.3em] uppercase mb-12 text-[#8b9176] font-semibold">
              {invitation.openingTitle || 'The Wedding Of'}
            </h2>
            <div className="relative z-10 flex flex-col items-center gap-4">
              <h1 className="text-6xl md:text-8xl font-normal text-[#4e5340]">
                {invitation.groomName}
              </h1>
              <span className="text-5xl text-[#6b705c] italic">&</span>
              <h1 className="text-6xl md:text-8xl font-normal text-[#4e5340]">
                {invitation.brideName}
              </h1>
            </div>
            {events.length > 0 && (
              <div className="relative z-10 mt-16 px-8 py-3 bg-[#f6f4f0] rounded-full text-[#6b705c] tracking-widest uppercase text-sm border border-[#e2dfd8]">
                {new Date(events[0].date).toLocaleDateString('id-ID', {
                  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                })}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Quote Section */}
      {sectionConfig.quote && invitation.quote && (
        <section className="py-20 px-6 max-w-2xl mx-auto text-center">
          <div className="bg-white p-10 rounded-3xl shadow-sm border border-[#d3cec4]">
            <p className="italic text-xl text-[#6b705c] leading-relaxed">
              "{invitation.quote}"
            </p>
            {invitation.quoteSource && (
              <p className="mt-6 font-semibold text-sm uppercase tracking-wider text-[#8b9176]">
                - {invitation.quoteSource} -
              </p>
            )}
          </div>
        </section>
      )}

      {/* Couple Section */}
      {sectionConfig.couple && (
        <section className="py-20 px-6 max-w-5xl mx-auto">
          <h2 className="text-3xl text-center text-[#6b705c] mb-16 uppercase tracking-widest">The Couple</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-6 rounded-3xl shadow-md border border-[#d3cec4] text-center">
              <div className="w-full aspect-[4/5] rounded-2xl overflow-hidden mb-6">
                <img src={invitation.groomPhoto || '/placeholder.jpg'} alt="Groom" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-2xl font-bold mb-2">{invitation.groomFullName || invitation.groomName}</h3>
              <p className="text-sm text-[#8b9176] mb-4 uppercase tracking-wider">The Groom</p>
              {(invitation.groomFather || invitation.groomMother) && (
                <p className="text-sm text-[#6b705c]">
                  Putra dari Bapak {invitation.groomFather} & Ibu {invitation.groomMother}
                </p>
              )}
            </div>
            <div className="bg-white p-6 rounded-3xl shadow-md border border-[#d3cec4] text-center">
              <div className="w-full aspect-[4/5] rounded-2xl overflow-hidden mb-6">
                <img src={invitation.bridePhoto || '/placeholder.jpg'} alt="Bride" className="w-full h-full object-cover" />
              </div>
              <h3 className="text-2xl font-bold mb-2">{invitation.brideFullName || invitation.brideName}</h3>
              <p className="text-sm text-[#8b9176] mb-4 uppercase tracking-wider">The Bride</p>
              {(invitation.brideFather || invitation.brideMother) && (
                <p className="text-sm text-[#6b705c]">
                  Putri dari Bapak {invitation.brideFather} & Ibu {invitation.brideMother}
                </p>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Events Section */}
      {sectionConfig.events && events.length > 0 && (
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 md:p-16 shadow-xl border border-[#d3cec4]">
            <h2 className="text-3xl text-center text-[#6b705c] mb-16 uppercase tracking-widest">Events</h2>
            <div className="space-y-12">
              {events.map((event, index) => (
                <div key={event.id} className={`relative pl-8 md:pl-0 md:flex items-start gap-8 ${index !== events.length - 1 ? 'border-b border-[#e2dfd8] pb-12' : ''}`}>
                  <div className="md:w-1/3 md:text-right mb-4 md:mb-0">
                    <h3 className="text-2xl font-bold text-[#4e5340] mb-2">{event.title}</h3>
                    <p className="text-[#6b705c] font-medium">
                      {new Date(event.date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                    <p className="text-[#8b9176] text-sm mt-1">{event.startTime || '??'} - {event.endTime || 'Selesai'}</p>
                  </div>
                  <div className="hidden md:block w-px bg-[#d3cec4] h-full absolute left-1/3 top-0 bottom-0 mx-4"></div>
                  <div className="md:w-2/3 md:pl-8">
                    <p className="font-bold text-lg mb-2">{event.venue}</p>
                    {event.address && <p className="text-[#6b705c] mb-6">{event.address}</p>}
                    {event.mapUrl && (
                      <a href={event.mapUrl} target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-2 bg-[#6b705c] text-white rounded-xl text-sm font-medium hover:bg-[#4e5340] transition-colors">
                        View Map
                      </a>
                    )}
                  </div>
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
