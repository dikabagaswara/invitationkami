import { PublicSharedSections } from '@/components/public/PublicSharedSections'
import { ThemeData } from '@/modules/theme/types/theme-data'

export default function FloralTheme({ data }: { data: ThemeData }) {
  const { invitation, events } = data
  const { sectionConfig } = invitation

  return (
    <div className="bg-rose-50 text-rose-900 min-h-screen font-sans">
      <style>{
        `@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Lora:ital@0;1&display=swap');
        .font-cursive { font-family: 'Dancing Script', cursive; }
        .font-lora { font-family: 'Lora', serif; }`
      }</style>

      {/* Hero */}
      {sectionConfig.hero && (
        <section className="min-h-screen relative flex flex-col items-center justify-center p-8 overflow-hidden font-lora">
          <div className="absolute top-0 left-0 w-64 h-64 bg-rose-200 rounded-full blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-200 rounded-full blur-3xl opacity-50 translate-x-1/3 translate-y-1/3"></div>
          
          <div className="z-10 text-center bg-white/60 p-12 rounded-3xl backdrop-blur-sm border border-white/50 shadow-xl max-w-2xl w-full">
            <h2 className="tracking-widest uppercase text-sm mb-6 text-rose-700">We Are Getting Married</h2>
            <h1 className="font-cursive text-6xl md:text-8xl text-rose-600 mb-6 drop-shadow-sm">
              {invitation.groomName} <br/><span className="text-4xl">&</span><br/> {invitation.brideName}
            </h1>
          </div>
        </section>
      )}

      {/* Couple */}
      {sectionConfig.couple && (
        <section className="py-24 px-8 text-center font-lora">
          <h2 className="font-cursive text-5xl text-rose-600 mb-16">The Happy Couple</h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-16">
            <div className="text-center">
              <div className="w-56 h-56 rounded-full bg-rose-200 mx-auto mb-6 border-8 border-white shadow-lg overflow-hidden">
                {invitation.groomPhoto && <img src={invitation.groomPhoto} className="w-full h-full object-cover" />}
              </div>
              <h3 className="text-2xl font-bold">{invitation.groomFullName || invitation.groomName}</h3>
            </div>
            <div className="font-cursive text-5xl text-pink-400">&</div>
            <div className="text-center">
              <div className="w-56 h-56 rounded-full bg-rose-200 mx-auto mb-6 border-8 border-white shadow-lg overflow-hidden">
                {invitation.bridePhoto && <img src={invitation.bridePhoto} className="w-full h-full object-cover" />}
              </div>
              <h3 className="text-2xl font-bold">{invitation.brideFullName || invitation.brideName}</h3>
            </div>
          </div>
        </section>
      )}

      {/* Events */}
      {sectionConfig.events && events.length > 0 && (
        <section className="py-24 px-8 bg-white/60 font-lora">
          <h2 className="font-cursive text-5xl text-rose-600 mb-16 text-center">When & Where</h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            {events.map(event => (
              <div key={event.id} className="bg-white p-8 rounded-2xl shadow-sm border border-rose-100 text-center">
                <h3 className="font-cursive text-3xl text-rose-500 mb-4">{event.title}</h3>
                <p className="font-bold text-lg mb-2">{new Date(event.date).toLocaleDateString()}</p>
                <p className="text-rose-700">{event.venue}</p>
                {event.address && <p className="text-sm mt-4 text-rose-500">{event.address}</p>}
              </div>
            ))}
          </div>
        </section>
      )}
    
      <PublicSharedSections data={data} />
    </div>
  )
}
