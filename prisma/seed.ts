import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding themes...')

  const themes = [
    {
      slug: 'elegant',
      name: 'Elegant',
      description: 'Timeless elegance with classic typography and soft color palettes.',
      category: 'classic',
      colorPresets: [
        { id: 'default', name: 'Ivory & Gold', primary: '#C9A84C', background: '#FAF7F2' },
        { id: 'blush', name: 'Blush & Rose', primary: '#D4808A', background: '#FFF5F5' },
      ],
      fontPresets: [
        { id: 'default', name: 'Cormorant + Lato', heading: 'Cormorant Garamond', body: 'Lato' },
        { id: 'serif', name: 'Playfair + Raleway', heading: 'Playfair Display', body: 'Raleway' },
      ],
    },
    {
      slug: 'modern',
      name: 'Modern',
      description: 'Clean, minimal design with bold geometric elements.',
      category: 'modern',
      colorPresets: [
        { id: 'default', name: 'Charcoal & White', primary: '#2C2C2C', background: '#FFFFFF' },
        { id: 'navy', name: 'Navy & Cream', primary: '#1B2B5B', background: '#FAFAF0' },
      ],
      fontPresets: [
        { id: 'default', name: 'Inter + Inter', heading: 'Inter', body: 'Inter' },
      ],
    },
    {
      slug: 'floral',
      name: 'Floral',
      description: 'Romantic floral patterns with soft pastels and botanical elements.',
      category: 'romantic',
      colorPresets: [
        { id: 'default', name: 'Garden Rose', primary: '#E8A5A0', background: '#FFF8F8' },
      ],
      fontPresets: [
        { id: 'default', name: 'Dancing Script + Lato', heading: 'Dancing Script', body: 'Lato' },
      ],
    },
    {
      slug: 'luxury',
      name: 'Luxury',
      description: 'Opulent design with deep colors, gold accents, and premium typography.',
      category: 'luxury',
      isPremium: true,
      colorPresets: [
        { id: 'default', name: 'Black & Gold', primary: '#C9A84C', background: '#0A0A0A' },
      ],
      fontPresets: [
        { id: 'default', name: 'Cinzel + Montserrat', heading: 'Cinzel', body: 'Montserrat' },
      ],
    },
    {
      slug: 'minimalist',
      name: 'Minimalist',
      description: 'Less is more. Pure typography-driven design with generous white space.',
      category: 'minimal',
      colorPresets: [
        { id: 'default', name: 'Pure White', primary: '#1A1A1A', background: '#FFFFFF' },
        { id: 'warm', name: 'Warm Beige', primary: '#4A3728', background: '#F9F5F0' },
      ],
      fontPresets: [
        { id: 'default', name: 'DM Serif + DM Sans', heading: 'DM Serif Display', body: 'DM Sans' },
      ],
    },
    {
      slug: 'oceanic',
      name: 'Oceanic',
      description: 'Modern glassmorphism wedding with sky blue, translucent panels, and layered ocean aesthetics.',
      category: 'modern',
      colorPresets: [
        { id: 'default', name: 'Ocean Glass', primary: '#0284c7', background: '#f0f9ff' },
      ],
      fontPresets: [
        { id: 'default', name: 'Plus Jakarta Sans + Outfit', heading: 'Plus Jakarta Sans', body: 'Outfit' },
      ],
    },
    {
      slug: 'rustic',
      name: 'Rustic',
      description: 'Warm organic stacked-card wedding with earthy tones, natural wood aesthetics, and asymmetric dividers.',
      category: 'nature',
      colorPresets: [
        { id: 'default', name: 'Warm Earth & Terracotta', primary: '#785338', background: '#FAF6F0' },
      ],
      fontPresets: [
        { id: 'default', name: 'Lora + Nunito', heading: 'Lora', body: 'Nunito' },
      ],
    },
    {
      slug: 'vintage',
      name: 'Vintage',
      description: 'European vintage newspaper wedding announcement with double borders, editorial typography, and sepia filters.',
      category: 'classic',
      colorPresets: [
        { id: 'default', name: 'Antique Parchment', primary: '#4a2e1b', background: '#F7F3EB' },
      ],
      fontPresets: [
        { id: 'default', name: 'Playfair Display + Newsreader', heading: 'Playfair Display', body: 'Newsreader' },
      ],
    },
    {
      slug: 'botanical',
      name: 'Botanical',
      description: 'Luxury deep emerald fashion-editorial wedding with full-width layout and alternating photo compositions.',
      category: 'luxury',
      isPremium: true,
      colorPresets: [
        { id: 'default', name: 'Emerald & Gold', primary: '#1b3b22', background: '#0d1f12' },
      ],
      fontPresets: [
        { id: 'default', name: 'Cinzel + Cormorant', heading: 'Cinzel', body: 'Cormorant Garamond' },
      ],
    },
    {
      slug: 'celestial',
      name: 'Celestial',
      description: 'Deep midnight cosmos and starlight romantic wedding with glowing nebula halos, gold stars, and starlight typography.',
      category: 'luxury',
      isPremium: true,
      colorPresets: [
        { id: 'default', name: 'Midnight Starlight', primary: '#8B5CF6', background: '#0A071B' },
      ],
      fontPresets: [
        { id: 'default', name: 'Cinzel + Plus Jakarta Sans', heading: 'Cinzel', body: 'Plus Jakarta Sans' },
      ],
    },
  ]

  for (const theme of themes) {
    await prisma.theme.upsert({
      where: { slug: theme.slug },
      update: {},
      create: {
        slug: theme.slug,
        name: theme.name,
        description: theme.description,
        category: theme.category,
        colorPresets: theme.colorPresets,
        fontPresets: theme.fontPresets,
        isPremium: (theme as { isPremium?: boolean }).isPremium ?? false,
        isActive: true,
      },
    })
    console.log(`  ✓ Theme: ${theme.name}`)
  }

  console.log('Seeding music...')

  const musicList = [
    { title: 'A Thousand Years', artist: 'Christina Perri (Instrumental)', fileUrl: '/music/a-thousand-years.mp3', category: 'pop' },
    { title: 'Perfect', artist: 'Ed Sheeran (Acoustic Guitar)', fileUrl: '/music/perfect.mp3', category: 'pop' },
    { title: 'Canon in D', artist: 'Johann Pachelbel (Piano & Strings)', fileUrl: '/music/canon-in-d.mp3', category: 'classic' },
    { title: 'Romantic Wedding Bliss', artist: 'Wedding Melody Ensemble', fileUrl: '/music/wedding-song.mp3', category: 'acoustic' },
  ]

  for (const music of musicList) {
    const existing = await prisma.music.findFirst({ where: { title: music.title } })
    if (!existing) {
      await prisma.music.create({ data: { ...music, isActive: true } })
      console.log(`  ✓ Music created: ${music.title}`)
    } else {
      await prisma.music.update({
        where: { id: existing.id },
        data: { fileUrl: music.fileUrl, artist: music.artist, category: music.category, isActive: true },
      })
      console.log(`  ✓ Music updated: ${music.title}`)
    }
  }

  console.log('Seeding demo users...')
  const bcrypt = await import('bcryptjs')
  const passwordHash = await bcrypt.default.hash('Password123!', 12)

  // Demo Customer
  const customer = await prisma.user.upsert({
    where: { email: 'customer@invitationkami.com' },
    update: {},
    create: {
      email: 'customer@invitationkami.com',
      name: 'Budi Santoso',
      passwordHash,
      role: 'CUSTOMER',
    },
  })
  console.log(`  ✓ Customer user: ${customer.email}`)

  // Demo Admin
  const admin = await prisma.user.upsert({
    where: { email: 'admin@invitationkami.com' },
    update: {},
    create: {
      email: 'admin@invitationkami.com',
      name: 'Super Admin',
      passwordHash,
      role: 'SUPER_ADMIN',
    },
  })
  console.log(`  ✓ Admin user: ${admin.email}`)

  console.log('Seeding demo wedding invitations for all 5 themes...')
  const allThemes = await prisma.theme.findMany()
  const firstMusic = await prisma.music.findFirst()

  const demoPresets = [
    {
      slug: 'demo-elegant',
      themeSlug: 'elegant',
      groom: 'Romeo Montague, S.Kom',
      groomNick: 'Romeo',
      bride: 'Juliet Capulet, S.Ds',
      brideNick: 'Juliet',
      opening: 'THE WEDDING CELEBRATION',
    },
    {
      slug: 'demo-modern',
      themeSlug: 'modern',
      groom: 'Adam Pratama, B.Eng',
      groomNick: 'Adam',
      bride: 'Hawa Anindya, M.B.A',
      brideNick: 'Hawa',
      opening: 'WE ARE GETTING MARRIED',
    },
    {
      slug: 'demo-floral',
      themeSlug: 'floral',
      groom: 'Bintang Raditya',
      groomNick: 'Bintang',
      bride: 'Kirana Larasati',
      brideNick: 'Kirana',
      opening: 'SAVE THE DATE',
    },
    {
      slug: 'demo-luxury',
      themeSlug: 'luxury',
      groom: 'Alexander Wijaya, S.E',
      groomNick: 'Alex',
      bride: 'Victoria Salim, B.A',
      brideNick: 'Victoria',
      opening: 'THE ROYAL WEDDING OF',
    },
    {
      slug: 'demo-minimalist',
      themeSlug: 'minimalist',
      groom: 'Dimas Setiawan',
      groomNick: 'Dimas',
      bride: 'Alya Sabrina',
      brideNick: 'Alya',
      opening: 'WALKING TOGETHER',
    },
    {
      slug: 'demo-oceanic',
      themeSlug: 'oceanic',
      groom: 'Bagas Pratama, S.T.',
      groomNick: 'Bagas',
      bride: 'Dika Anggraini, S.Kom.',
      brideNick: 'Dika',
      opening: 'OCEAN OF LOVE',
    },
    {
      slug: 'demo-rustic',
      themeSlug: 'rustic',
      groom: 'Arka Bumi, S.Hut.',
      groomNick: 'Arka',
      bride: 'Rinjani Laras, S.P.',
      brideNick: 'Rinjani',
      opening: 'OUR RUSTIC JOURNEY',
    },
    {
      slug: 'demo-vintage',
      themeSlug: 'vintage',
      groom: 'Raden Mas Haryo, M.Hum.',
      groomNick: 'Haryo',
      bride: 'Sekar Arum Ningrum, S.Sn.',
      brideNick: 'Sekar',
      opening: 'SPECIAL WEDDING GAZETTE',
    },
    {
      slug: 'demo-botanical',
      themeSlug: 'botanical',
      groom: 'Adrian Hakim, B.Arch.',
      groomNick: 'Adrian',
      bride: 'Bella Safira, M.A.',
      brideNick: 'Bella',
      opening: 'BOTANICAL ELEGANCE',
    },
    {
      slug: 'demo-celestial',
      themeSlug: 'celestial',
      groom: 'Orion Althair, S.Si.',
      groomNick: 'Orion',
      bride: 'Lyra Vega, S.T.',
      brideNick: 'Lyra',
      opening: 'WRITTEN IN THE STARS',
    },
  ]

  for (const demo of demoPresets) {
    const matchedTheme = allThemes.find((t) => t.slug === demo.themeSlug)
    if (!matchedTheme) continue

    await prisma.invitation.upsert({
      where: { slug: demo.slug },
      update: {
        themeId: matchedTheme.id,
        isPublished: true,
      },
      create: {
        userId: customer.id,
        slug: demo.slug,
        isPublished: true,
        groomName: demo.groomNick,
        groomFullName: demo.groom,
        groomFather: 'Bapak ' + demo.groomNick + ' Snr.',
        groomMother: 'Ibu ' + demo.groomNick + ' Snr.',
        groomPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80',
        brideName: demo.brideNick,
        brideFullName: demo.bride,
        brideFather: 'Bapak ' + demo.brideNick + ' Snr.',
        brideMother: 'Ibu ' + demo.brideNick + ' Snr.',
        bridePhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=80',
        themeId: matchedTheme.id,
        musicId: firstMusic?.id,
        colorPreset: 'default',
        fontPreset: 'default',
        openingTitle: demo.opening,
        openingText: 'Tanpa mengurangi rasa hormat, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk hadir di acara pernikahan kami.',
        quote: 'Dan di antara tanda-tanda kebesaran-Nya diciptakan-Nya pasangan-pasangan untukmu agar kamu merasa tenteram bersamanya.',
        quoteSource: 'QS. Ar-Rum: 21',
        sectionConfig: {
          hero: true,
          quote: true,
          couple: true,
          countdown: true,
          events: true,
          story: true,
          gallery: true,
          rsvp: true,
          guestbook: true,
          gift: true,
          location: true,
        },
        events: {
          create: [
            {
              title: 'Akad Nikah',
              date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
              startTime: '08:00 WIB',
              endTime: '10:00 WIB',
              venue: 'Masjid Agung Al-Azhar',
              address: 'Jl. Sisingamangaraja No.1, Kebayoran Baru, Jakarta Selatan',
              mapUrl: 'https://maps.google.com/?q=Masjid+Agung+Al-Azhar+Jakarta',
              order: 1,
            },
            {
              title: 'Resepsi Pernikahan',
              date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
              startTime: '11:00 WIB',
              endTime: '14:00 WIB',
              venue: 'Grand Ballroom Hotel Mulia',
              address: 'Jl. Asia Afrika, Senayan, Jakarta Pusat',
              mapUrl: 'https://maps.google.com/?q=Hotel+Mulia+Senayan',
              order: 2,
            },
          ],
        },
        loveStory: {
          create: [
            {
              title: 'Pertama Kali Bertemu',
              date: '2021',
              description: 'Kami pertama kali bertemu di sebuah perpustakaan kota saat menyelesaikan tugas akhir kuliah.',
              order: 1,
            },
            {
              title: 'Komitmen Bersama',
              date: '2023',
              description: 'Setelah saling mengenal lebih dekat, kami memutuskan untuk melangkah ke jenjang yang lebih serius.',
              order: 2,
            },
            {
              title: 'Lamaran',
              date: '2025',
              description: 'Di hadapan kedua keluarga besar, kami mengikat janji suci untuk melangsungkan pernikahan.',
              order: 3,
            },
          ],
        },
        gallery: {
          create: [
            {
              imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop&q=80',
              caption: 'Momen Prewedding di Alam Terbuka',
              order: 1,
            },
            {
              imageUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&auto=format&fit=crop&q=80',
              caption: 'Senyum Bahagia Bersama',
              order: 2,
            },
            {
              imageUrl: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&auto=format&fit=crop&q=80',
              caption: 'Menatap Masa Depan',
              order: 3,
            },
          ],
        },
        weddingGifts: {
          create: [
            {
              type: 'BANK_TRANSFER',
              bankName: 'BCA',
              accountNumber: '1234567890',
              accountHolder: demo.groomNick + ' & ' + demo.brideNick,
              order: 1,
            },
            {
              type: 'BANK_TRANSFER',
              bankName: 'Bank Mandiri',
              accountNumber: '9876543210',
              accountHolder: demo.groomNick + ' & ' + demo.brideNick,
              order: 2,
            },
            {
              type: 'SHIPPING_ADDRESS',
              address: 'Jl. Mawar No. 12, Kebayoran Baru, Jakarta Selatan (Kode Pos: 12180)',
              notes: 'Penerima: ' + demo.groomNick + ' & ' + demo.brideNick,
              order: 3,
            },
          ],
        },
      },
    })
    console.log(`  ✓ Demo [${matchedTheme.name}]: /i/${demo.slug}`)
  }

  console.log('\nSeed complete!')
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
