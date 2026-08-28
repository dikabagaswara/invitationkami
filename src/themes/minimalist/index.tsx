import { PublicSharedSections } from '@/components/public/PublicSharedSections'
import { ThemeData } from '@/modules/theme/types/theme-data'

export default function MinimalistTheme({ data }: { data: ThemeData }) {
  const { invitation, events } = data
  const { sectionConfig } = invitation

  return (
    <div className="bg-white text-gray-800 min-h-screen">
      <style>{
        `@import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400&display=swap');
        .font-dm { font-family: 'DM Sans', sans-serif; }`
      }</style>

      {/* Hero */}
      {sectionConfig.hero && (
        <section className="min-h-screen flex flex-col items-start justify-end p-8 md:p-16 font-dm">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.2em] text-gray-400 mb-8">Wedding Invitation</p>
            <h1 className="text-5xl md:text-8xl font-light mb-4">
              {invitation.groomName}
            </h1>
            <h1 className="text-5xl md:text-8xl font-light text-gray-400 mb-12">
              {invitation.brideName}
            </h1>
            {events.length > 0 && (
              <p className="text-lg font-light text-gray-500">
                {new Date(events[0].date).toLocaleDateString()} — {events[0].venue}
              </p>
            )}
          </div>
        </section>
      )}

      {/* Couple */}
      {sectionConfig.couple && (
        <section className="py-32 px-8 md:px-16 font-dm">
          <div className="grid md:grid-cols-2 gap-16 max-w-5xl">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-gray-400 mb-4">Groom</p>
              <h2 className="text-3xl font-light">{invitation.groomFullName || invitation.groomName}</h2>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-gray-400 mb-4">Bride</p>
              <h2 className="text-3xl font-light">{invitation.brideFullName || invitation.brideName}</h2>
            </div>
          </div>
        </section>
      )}

      {/* Events */}
      {sectionConfig.events && events.length > 0 && (
        <section className="py-32 px-8 md:px-16 font-dm bg-gray-50">
          <div className="max-w-5xl">
            <h2 className="text-3xl font-light mb-16">Itinerary</h2>
            <div className="space-y-12">
              {events.map(event => (
                <div key={event.id} className="grid md:grid-cols-3 gap-8 pb-12 border-b border-gray-200 last:border-0">
                  <div className="text-gray-400">
                    <p>{new Date(event.date).toLocaleDateString()}</p>
                    <p>{event.startTime} - {event.endTime}</p>
                  </div>
                  <div className="md:col-span-2">
                    <h3 className="text-xl mb-2">{event.title}</h3>
                    <p className="text-gray-500">{event.venue}</p>
                    {event.address && <p className="text-sm text-gray-400 mt-2">{event.address}</p>}
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
