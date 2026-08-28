import { PublicSharedSections } from '@/components/public/PublicSharedSections'
import { ThemeData } from '@/modules/theme/types/theme-data'

export default function ElegantTheme({ data }: { data: ThemeData }) {
  const { invitation, events, gallery, loveStory, weddingGifts } = data
  const { sectionConfig } = invitation

  return (
    <div className="font-serif bg-amber-50 text-stone-800 min-h-screen">
      {/* Hero Section */}
      {sectionConfig.hero && (
        <section className="min-h-screen flex flex-col items-center justify-center text-center p-8 border-8 border-double border-amber-200 m-4">
          <h2 className="text-xl tracking-[0.3em] uppercase mb-8 text-amber-700">The Wedding Of</h2>
          <h1 className="text-6xl md:text-8xl mb-8 font-light tracking-wider">
            {invitation.groomName} <span className="text-amber-500 italic">&</span> {invitation.brideName}
          </h1>
          {events.length > 0 && (
            <p className="text-xl tracking-widest uppercase border-t border-b border-amber-300 py-4 px-12">
              {new Date(events[0].date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          )}
        </section>
      )}

      {/* Couple Section */}
      {sectionConfig.couple && (
        <section className="py-24 px-8 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl italic text-amber-700 mb-16">Meet the Couple</h2>
          <div className="grid md:grid-cols-2 gap-16">
            <div className="space-y-6">
              <div className="w-48 h-64 mx-auto bg-amber-100 rounded-t-full shadow-lg overflow-hidden border-4 border-white">
                {invitation.groomPhoto && <img src={invitation.groomPhoto} alt="Groom" className="w-full h-full object-cover" />}
              </div>
              <h3 className="text-2xl">{invitation.groomFullName || invitation.groomName}</h3>
              <p className="text-sm text-stone-500 uppercase tracking-widest">The Groom</p>
            </div>
            <div className="space-y-6">
              <div className="w-48 h-64 mx-auto bg-amber-100 rounded-t-full shadow-lg overflow-hidden border-4 border-white">
                {invitation.bridePhoto && <img src={invitation.bridePhoto} alt="Bride" className="w-full h-full object-cover" />}
              </div>
              <h3 className="text-2xl">{invitation.brideFullName || invitation.brideName}</h3>
              <p className="text-sm text-stone-500 uppercase tracking-widest">The Bride</p>
            </div>
          </div>
        </section>
      )}

      {/* Events Section */}
      {sectionConfig.events && events.length > 0 && (
        <section className="py-24 px-8 bg-white text-center">
          <h2 className="text-3xl italic text-amber-700 mb-16">Wedding Events</h2>
          <div className="max-w-3xl mx-auto space-y-12">
            {events.map(event => (
              <div key={event.id} className="p-8 border border-amber-200 shadow-sm relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-amber-500">❧</div>
                <h3 className="text-2xl mb-4">{event.title}</h3>
                <p className="mb-2 font-semibold">{new Date(event.date).toLocaleDateString()}</p>
                <p className="text-stone-600">{event.venue}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Story & Gallery */}
      {sectionConfig.story && loveStory.length > 0 && (
        <section className="py-24 px-8 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl italic text-amber-700 mb-16">Our Love Story</h2>
          <div className="space-y-12">
            {loveStory.map(story => (
              <div key={story.id}>
                <h3 className="text-xl mb-4">{story.title}</h3>
                <p className="text-stone-600 leading-relaxed">{story.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {sectionConfig.gallery && gallery.length > 0 && (
        <section className="py-24 px-8 bg-amber-50">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-4">
            {gallery.map(item => (
              <div key={item.id} className="aspect-square bg-amber-200 overflow-hidden shadow-md">
                <img src={item.imageUrl} alt={item.caption || 'Gallery'} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Gifts */}
      {sectionConfig.gift && weddingGifts.length > 0 && (
        <section className="py-24 px-8 max-w-2xl mx-auto text-center">
          <h2 className="text-3xl italic text-amber-700 mb-8">Wedding Gift</h2>
          <div className="space-y-6">
            {weddingGifts.map(gift => (
              <div key={gift.id} className="p-6 border border-amber-200 bg-white">
                <h3 className="font-semibold">{gift.type}</h3>
                <p>{gift.bankName} {gift.accountNumber}</p>
                <p>{gift.accountHolder}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    
      <PublicSharedSections data={data} />
    </div>
  )
}
