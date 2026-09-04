import { PublicSharedSections } from '@/components/public/PublicSharedSections'
import { CountdownTimer } from '@/components/public/CountdownTimer'
import { HeroCouplePhoto } from '@/components/public/HeroCouplePhoto'
import { AddToCalendarButton } from '@/components/public/AddToCalendarButton'
import { ThemeData } from '@/modules/theme/types/theme-data'

export default function GatsbyTheme({ data }: { data: ThemeData }) {
  const { invitation, events, gallery, loveStory } = data
  const { sectionConfig } = invitation

  return (
    <div className="bg-[#0A0E1A] text-white min-h-screen relative overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Raleway:wght@300;400;500&display=swap');
        .font-gatsby-title { font-family: 'Playfair Display', serif; }
        .font-gatsby-body { font-family: 'Raleway', sans-serif; }
        
        .deco-border {
          position: relative;
        }
        .deco-border::before, .deco-border::after {
          content: '';
          position: absolute;
          border: 1px solid #D4AF37;
          width: 90%;
          height: 90%;
          top: 5%;
          left: 5%;
          pointer-events: none;
        }
        .deco-border::after {
          width: 94%;
          height: 94%;
          top: 3%;
          left: 3%;
          border: 2px solid #D4AF37;
        }

        .gold-gradient-text {
          background: linear-gradient(to right, #D4AF37, #FFD700, #D4AF37);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      {/* Decorative corners for the entire page */}
      <div className="fixed top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-[#D4AF37] pointer-events-none z-0 opacity-50"></div>
      <div className="fixed top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-[#D4AF37] pointer-events-none z-0 opacity-50"></div>
      <div className="fixed bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-[#D4AF37] pointer-events-none z-0 opacity-50"></div>
      <div className="fixed bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-[#D4AF37] pointer-events-none z-0 opacity-50"></div>

      <div className="relative z-10">
        {/* Hero Section */}
        {sectionConfig.hero && (
          <section className="min-h-screen flex flex-col items-center justify-center p-8 font-gatsby-body text-center deco-border relative overflow-hidden pt-20 pb-20">
            <div className="max-w-2xl w-full flex flex-col items-center relative z-10">
              <div className="mb-6 flex flex-col items-center">
                <span className="text-[#D4AF37] mb-2 text-2xl">✧</span>
                <p className="text-sm uppercase tracking-[0.4em] text-[#D4AF37] font-semibold">
                  {invitation.openingTitle || 'The Grand Celebration'}
                </p>
                {invitation.openingText && (
                  <p className="text-gray-300 text-sm mt-4 font-light max-w-md italic font-gatsby-title">
                    {invitation.openingText}
                  </p>
                )}
              </div>

              <div className="my-10 relative">
                <HeroCouplePhoto
                  photoUrl={invitation.heroPhoto || invitation.coverPhoto || gallery[0]?.imageUrl || invitation.groomPhoto || invitation.bridePhoto}
                  groomName={invitation.groomName}
                  brideName={invitation.brideName}
                  themeSlug="gatsby"
                  frameVariant="double-ring"
                />
                <div className="absolute inset-0 border border-[#D4AF37] rotate-45 scale-[1.15] opacity-50 pointer-events-none rounded-sm"></div>
              </div>

              <div className="mb-12 mt-6">
                <h1 className="text-5xl md:text-7xl font-bold mb-4 font-gatsby-title gold-gradient-text tracking-wider uppercase">
                  {invitation.groomName}
                </h1>
                <p className="text-3xl text-[#D4AF37] my-4 font-gatsby-title italic">&</p>
                <h1 className="text-5xl md:text-7xl font-bold font-gatsby-title gold-gradient-text tracking-wider uppercase">
                  {invitation.brideName}
                </h1>
              </div>

              {events.length > 0 && (
                <div className="border-t border-b border-[#D4AF37] py-4 px-12 mt-8 flex flex-col items-center">
                  <p className="text-lg font-bold tracking-[0.3em] uppercase text-[#FFD700]">
                    {new Date(events[0].date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
              )}
            </div>
            {/* Background geometric pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(45deg, transparent 49%, #D4AF37 49%, #D4AF37 51%, transparent 51%)', backgroundSize: '40px 40px' }}></div>
          </section>
        )}

        {/* Quote Section */}
        {sectionConfig.quote && invitation.quote && (
          <section className="py-24 px-8 text-center font-gatsby-title max-w-4xl mx-auto border-b border-[#D4AF37]/30">
            <span className="text-[#D4AF37] text-4xl block mb-6">❝</span>
            <p className="text-2xl md:text-3xl font-light text-white leading-relaxed mb-8 italic">
              {invitation.quote}
            </p>
            {invitation.quoteSource && (
              <p className="text-sm uppercase tracking-widest text-[#D4AF37] font-gatsby-body font-semibold">
                — {invitation.quoteSource} —
              </p>
            )}
            <span className="text-[#D4AF37] text-4xl block mt-6">❞</span>
          </section>
        )}

        {/* Couple Section */}
        {sectionConfig.couple && (
          <section className="py-32 px-8 font-gatsby-body max-w-5xl mx-auto border-b border-[#D4AF37]/30">
            <div className="text-center mb-20 flex flex-col items-center">
              <div className="w-16 h-1 bg-[#D4AF37] mb-6"></div>
              <h2 className="text-3xl font-gatsby-title gold-gradient-text uppercase tracking-widest">The Couple</h2>
              <div className="w-16 h-1 bg-[#D4AF37] mt-6"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-20 text-center">
              <div className="relative p-8 border border-[#D4AF37]/50 bg-[#151a28]">
                <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#D4AF37]"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#D4AF37]"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-[#D4AF37]"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#D4AF37]"></div>
                
                <p className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] mb-6 font-semibold">The Groom</p>
                <div className="w-40 h-40 overflow-hidden mx-auto mb-8 border-4 border-[#D4AF37] rotate-45 transform origin-center">
                  <div className="-rotate-45 w-full h-full transform origin-center scale-[1.42]">
                    {invitation.groomPhoto ? (
                      <img src={invitation.groomPhoto} className="w-full h-full object-cover" alt="Groom" />
                    ) : (
                      <div className="w-full h-full bg-[#1A1F30] flex items-center justify-center">
                        <span className="text-[#D4AF37] text-4xl font-gatsby-title">G</span>
                      </div>
                    )}
                  </div>
                </div>
                <h2 className="text-2xl font-bold mb-4 font-gatsby-title text-white mt-12">{invitation.groomFullName || invitation.groomName}</h2>
                {(invitation.groomFather || invitation.groomMother) && (
                  <p className="text-gray-400 text-sm">Son of {invitation.groomFather} & {invitation.groomMother}</p>
                )}
              </div>
              
              <div className="relative p-8 border border-[#D4AF37]/50 bg-[#151a28]">
                <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-[#D4AF37]"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-[#D4AF37]"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-[#D4AF37]"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-[#D4AF37]"></div>

                <p className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] mb-6 font-semibold">The Bride</p>
                <div className="w-40 h-40 overflow-hidden mx-auto mb-8 border-4 border-[#D4AF37] rotate-45 transform origin-center">
                  <div className="-rotate-45 w-full h-full transform origin-center scale-[1.42]">
                    {invitation.bridePhoto ? (
                      <img src={invitation.bridePhoto} className="w-full h-full object-cover" alt="Bride" />
                    ) : (
                      <div className="w-full h-full bg-[#1A1F30] flex items-center justify-center">
                        <span className="text-[#D4AF37] text-4xl font-gatsby-title">B</span>
                      </div>
                    )}
                  </div>
                </div>
                <h2 className="text-2xl font-bold mb-4 font-gatsby-title text-white mt-12">{invitation.brideFullName || invitation.brideName}</h2>
                {(invitation.brideFather || invitation.brideMother) && (
                  <p className="text-gray-400 text-sm">Daughter of {invitation.brideFather} & {invitation.brideMother}</p>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Countdown Section */}
        {sectionConfig.countdown && events.length > 0 && (
          <section className="py-24 px-8 border-b border-[#D4AF37]/30 font-gatsby-body bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#1a2235] to-[#0A0E1A]">
            <div className="text-center mb-10">
              <span className="text-[#D4AF37] text-xl">✧ ✧ ✧</span>
              <h2 className="text-2xl font-gatsby-title text-[#D4AF37] mt-4 uppercase tracking-widest">Awaiting the Day</h2>
            </div>
            <CountdownTimer targetDate={events[0].date} />
          </section>
        )}

        {/* Events Section */}
        {sectionConfig.events && events.length > 0 && (
          <section className="py-32 px-8 font-gatsby-body border-b border-[#D4AF37]/30">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-20 flex flex-col items-center">
                <div className="w-16 h-1 bg-[#D4AF37] mb-6"></div>
                <h2 className="text-3xl font-gatsby-title gold-gradient-text uppercase tracking-widest">Event Details</h2>
                <div className="w-16 h-1 bg-[#D4AF37] mt-6"></div>
              </div>

              <div className="space-y-16">
                {events.map((event, i) => (
                  <div key={event.id} className="relative p-10 border border-[#D4AF37]/30 bg-[#0d121c] text-center">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-[#0A0E1A] rotate-45 border border-[#D4AF37] flex items-center justify-center">
                      <span className="text-[#D4AF37] -rotate-45 font-gatsby-title font-bold text-xl">{i + 1}</span>
                    </div>
                    
                    <h3 className="text-3xl font-gatsby-title font-bold mb-4 text-[#D4AF37] mt-6 uppercase tracking-wider">{event.title}</h3>
                    
                    <div className="my-6 space-y-2">
                      <p className="font-bold text-white text-lg tracking-widest uppercase">
                        {new Date(event.date).toLocaleDateString('id-ID', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                      </p>
                      {(event.startTime || event.endTime) && (
                        <p className="text-[#D4AF37] font-semibold tracking-widest">
                          {event.startTime || '??'} - {event.endTime || 'End'}
                        </p>
                      )}
                    </div>
                    
                    <div className="my-6">
                      <p className="text-white font-bold text-xl mb-2">{event.venue}</p>
                      {event.address && <p className="text-gray-400 text-sm max-w-md mx-auto">{event.address}</p>}
                    </div>
                    
                    <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
                      {event.mapUrl && (
                        <a href={event.mapUrl} target="_blank" rel="noopener noreferrer" className="inline-block px-8 py-3 border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-colors uppercase tracking-widest font-semibold text-xs">
                          View Map
                        </a>
                      )}
                      <AddToCalendarButton
                        title={`${invitation.groomName} & ${invitation.brideName} - ${event.title}`}
                        description={`Undangan pernikahan ${invitation.groomName} & ${invitation.brideName}`}
                        location={event.address || event.venue}
                        startDate={event.date}
                        startTime={event.startTime}
                        endTime={event.endTime}
                        themeSlug="gatsby"
                        className="mt-1"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Love Story Section */}
        {sectionConfig.story && loveStory.length > 0 && (
          <section className="py-32 px-8 font-gatsby-body border-b border-[#D4AF37]/30 bg-[linear-gradient(180deg,#0A0E1A_0%,#151a28_100%)]">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-20 flex flex-col items-center">
                <div className="w-16 h-1 bg-[#D4AF37] mb-6"></div>
                <h2 className="text-3xl font-gatsby-title gold-gradient-text uppercase tracking-widest">Our Journey</h2>
                <div className="w-16 h-1 bg-[#D4AF37] mt-6"></div>
              </div>

              <div className="space-y-0 relative before:absolute before:inset-0 before:ml-5 md:before:mx-auto before:w-0.5 before:bg-gradient-to-b before:from-[#D4AF37] before:via-[#FFD700] before:to-[#D4AF37]">
                {loveStory.map((story, i) => (
                  <div key={story.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group pb-16 last:pb-0">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#0A0E1A] border-2 border-[#D4AF37] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_15px_rgba(212,175,55,0.4)] z-10">
                      <div className="w-3 h-3 bg-[#D4AF37] rounded-full"></div>
                    </div>
                    <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 border border-[#D4AF37]/40 bg-[#0d121c] md:text-right md:group-odd:text-left relative">
                      {/* Deco corner */}
                      <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-[#D4AF37]/50"></div>
                      <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-[#D4AF37]/50"></div>
                      
                      {story.date && <p className="text-xs text-[#D4AF37] uppercase tracking-[0.2em] font-bold mb-2">{story.date}</p>}
                      <h3 className="text-xl font-gatsby-title font-bold mb-3 text-white">{story.title}</h3>
                      <p className="text-gray-400 font-light text-sm leading-relaxed">{story.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Gallery Section */}
        {sectionConfig.gallery && gallery.length > 0 && (
          <section className="py-32 px-8 border-b border-[#D4AF37]/30">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-20 flex flex-col items-center">
                <div className="w-16 h-1 bg-[#D4AF37] mb-6"></div>
                <h2 className="text-3xl font-gatsby-title gold-gradient-text uppercase tracking-widest">Captured Moments</h2>
                <div className="w-16 h-1 bg-[#D4AF37] mt-6"></div>
              </div>

              <div className="columns-1 md:columns-3 gap-6 space-y-6">
                {gallery.map(item => (
                  <div key={item.id} className="break-inside-avoid relative p-2 border border-[#D4AF37]/50 bg-[#151a28]">
                    <img src={item.imageUrl} alt={item.caption || 'Gallery'} className="w-full h-auto filter sepia-[0.3]" />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      
        <PublicSharedSections data={data} />
      </div>
    </div>
  )
}
