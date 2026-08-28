import { PublicSharedSections } from '@/components/public/PublicSharedSections'
import { ThemeData } from '@/modules/theme/types/theme-data'

export default function ModernTheme({ data }: { data: ThemeData }) {
  const { invitation, events, gallery, loveStory, weddingGifts } = data
  const { sectionConfig } = invitation

  return (
    <div className="font-sans bg-zinc-50 text-zinc-900 min-h-screen selection:bg-black selection:text-white">
      {/* Hero */}
      {sectionConfig.hero && (
        <section className="min-h-screen flex flex-col md:flex-row items-center p-8 md:p-24 gap-12">
          <div className="flex-1 space-y-6 z-10 relative">
            <div className="w-16 h-1 bg-black mb-12"></div>
            <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-none">
              {invitation.groomName}
              <br />
              <span className="text-zinc-400">+</span>
              <br />
              {invitation.brideName}
            </h1>
          </div>
          <div className="flex-1 w-full aspect-[3/4] bg-zinc-200 grayscale contrast-125">
            {/* Optional abstract or hero image would go here */}
          </div>
        </section>
      )}

      {/* Couple */}
      {sectionConfig.couple && (
        <section className="py-24 px-8 md:px-24 bg-black text-white">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-end gap-12">
            <div>
              <p className="text-zinc-500 uppercase tracking-widest text-sm mb-4">Groom</p>
              <h2 className="text-4xl md:text-5xl font-bold">{invitation.groomFullName || invitation.groomName}</h2>
            </div>
            <div className="hidden md:block w-32 h-px bg-zinc-800"></div>
            <div className="text-right">
              <p className="text-zinc-500 uppercase tracking-widest text-sm mb-4">Bride</p>
              <h2 className="text-4xl md:text-5xl font-bold">{invitation.brideFullName || invitation.brideName}</h2>
            </div>
          </div>
        </section>
      )}

      {/* Events Timeline */}
      {sectionConfig.events && events.length > 0 && (
        <section className="py-32 px-8 md:px-24 max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold mb-24 uppercase tracking-tight">The Details</h2>
          <div className="space-y-24 border-l-4 border-black pl-8 md:pl-16">
            {events.map((event, i) => (
              <div key={event.id} className="relative">
                <div className="absolute -left-[38px] md:-left-[70px] top-2 w-8 h-8 bg-black rounded-full border-4 border-zinc-50"></div>
                <p className="text-xl font-bold text-zinc-500 mb-2">{new Date(event.date).toLocaleDateString()}</p>
                <h3 className="text-4xl font-black uppercase mb-4">{event.title}</h3>
                <p className="text-2xl">{event.venue}</p>
                {event.address && <p className="text-zinc-600 mt-2">{event.address}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Gallery */}
      {sectionConfig.gallery && gallery.length > 0 && (
        <section className="px-4 py-12 md:px-12 md:py-24 bg-zinc-900">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {gallery.map((item, i) => (
              <div key={item.id} className={`bg-zinc-800 aspect-square grayscale hover:grayscale-0 transition duration-500 ${i % 3 === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}>
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
