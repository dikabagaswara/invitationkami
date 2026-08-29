import { prisma } from '../src/lib/db'

async function createLuxuryInvitationForCustomer() {
  console.log('Finding customer@gmail.com...')
  const user = await prisma.user.findUnique({
    where: { email: 'customer@gmail.com' },
  })

  if (!user) {
    console.error('User customer@gmail.com not found!')
    return
  }

  console.log('Finding Luxury theme and music...')
  const luxuryTheme = await prisma.theme.findUnique({
    where: { slug: 'luxury' },
  })

  if (!luxuryTheme) {
    console.error('Theme luxury not found!')
    return
  }

  const music = await prisma.music.findFirst({
    where: { isActive: true },
  })

  const slug = 'dika-dan-nurdi'
  const couplePhoto = 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1000&auto=format&fit=crop&q=80'

  console.log(`Creating/updating luxury invitation with slug: /i/${slug}...`)
  const invitation = await prisma.invitation.upsert({
    where: { slug },
    update: {
      userId: user.id,
      themeId: luxuryTheme.id,
      groomName: 'Dika',
      groomFullName: 'Dika Bagaswara, S.Kom.',
      groomFather: 'Bapak Ahmad Bagaswara',
      groomMother: 'Ibu Siti Aminah',
      groomPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80',
      brideName: 'Nurdi',
      brideFullName: 'Nurdi Anindya, S.M.',
      brideFather: 'Bapak Rahmat Hidayat',
      brideMother: 'Ibu Ratna Dewi',
      bridePhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=80',
      musicId: music?.id,
      isPublished: true,
      colorPreset: 'default',
      fontPreset: 'default',
      openingTitle: 'THE ROYAL WEDDING OF',
      openingText: 'Dengan memohon rahmat dan ridho Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri perayaan pernikahan kami.',
      quote: 'Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup dari jenismu sendiri, supaya kamu merasa tenteram kepadanya, dan dijadikan-Nya di antaramu rasa kasih dan sayang.',
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
    },
    create: {
      userId: user.id,
      slug,
      themeId: luxuryTheme.id,
      groomName: 'Dika',
      groomFullName: 'Dika Bagaswara, S.Kom.',
      groomFather: 'Bapak Ahmad Bagaswara',
      groomMother: 'Ibu Siti Aminah',
      groomPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80',
      brideName: 'Nurdi',
      brideFullName: 'Nurdi Anindya, S.M.',
      brideFather: 'Bapak Rahmat Hidayat',
      brideMother: 'Ibu Ratna Dewi',
      bridePhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=80',
      musicId: music?.id,
      isPublished: true,
      colorPreset: 'default',
      fontPreset: 'default',
      openingTitle: 'THE ROYAL WEDDING OF',
      openingText: 'Dengan memohon rahmat dan ridho Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri perayaan pernikahan kami.',
      quote: 'Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup dari jenismu sendiri, supaya kamu merasa tenteram kepadanya, dan dijadikan-Nya di antaramu rasa kasih dan sayang.',
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
    },
  })

  // Ensure events exist
  await prisma.event.deleteMany({ where: { invitationId: invitation.id } })
  await prisma.event.createMany({
    data: [
      {
        invitationId: invitation.id,
        title: 'Akad Nikah',
        date: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000),
        startTime: '08:00 WIB',
        endTime: '10:00 WIB',
        venue: 'Grand Ballroom Hotel Mulia Senayan',
        address: 'Jl. Asia Afrika No.6, Gelora, Tanah Abang, Jakarta Pusat',
        mapUrl: 'https://maps.google.com/?q=Hotel+Mulia+Senayan+Jakarta',
        order: 1,
      },
      {
        invitationId: invitation.id,
        title: 'Resepsi Pernikahan (The Royal Reception)',
        date: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000),
        startTime: '11:00 WIB',
        endTime: '14:00 WIB',
        venue: 'Grand Ballroom Hotel Mulia Senayan',
        address: 'Jl. Asia Afrika No.6, Gelora, Tanah Abang, Jakarta Pusat',
        mapUrl: 'https://maps.google.com/?q=Hotel+Mulia+Senayan+Jakarta',
        order: 2,
      },
    ],
  })

  // Ensure Love Stories exist
  await prisma.loveStory.deleteMany({ where: { invitationId: invitation.id } })
  await prisma.loveStory.createMany({
    data: [
      {
        invitationId: invitation.id,
        title: 'Pertemuan Pertama',
        date: '12 Maret 2022',
        description: 'Pertemuan tak sengaja di sebuah seminar teknologi yang mengawali percakapan hangat dan persahabatan yang indah.',
        order: 1,
      },
      {
        invitationId: invitation.id,
        title: 'Menjalin Komitmen',
        date: '15 Agustus 2023',
        description: 'Setelah saling mengenal lebih dekat, kami memutuskan untuk melangkah bersama membangun masa depan.',
        order: 2,
      },
      {
        invitationId: invitation.id,
        title: 'Momen Lamaran',
        date: '20 Januari 2025',
        description: 'Dengan restu kedua orang tua, kami mengikat janji suci untuk melangkah ke jenjang pernikahan.',
        order: 3,
      },
    ],
  })

  // Ensure Gallery exists
  await prisma.galleryItem.deleteMany({ where: { invitationId: invitation.id } })
  await prisma.galleryItem.createMany({
    data: [
      {
        invitationId: invitation.id,
        imageUrl: couplePhoto,
        caption: 'Momen Bahagia Dika & Nurdi',
        order: 1,
      },
      {
        invitationId: invitation.id,
        imageUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&auto=format&fit=crop&q=80',
        caption: 'Menatap Masa Depan Bersama',
        order: 2,
      },
      {
        invitationId: invitation.id,
        imageUrl: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&auto=format&fit=crop&q=80',
        caption: 'Senyuman Penuh Syukur',
        order: 3,
      },
    ],
  })

  // Ensure Wedding Gifts exist
  await prisma.weddingGift.deleteMany({ where: { invitationId: invitation.id } })
  await prisma.weddingGift.createMany({
    data: [
      {
        invitationId: invitation.id,
        type: 'BANK_TRANSFER',
        bankName: 'BCA',
        accountNumber: '8735019284',
        accountHolder: 'Dika Bagaswara',
        order: 1,
      },
      {
        invitationId: invitation.id,
        type: 'BANK_TRANSFER',
        bankName: 'Bank Mandiri',
        accountNumber: '1370019827364',
        accountHolder: 'Nurdi Anindya',
        order: 2,
      },
      {
        invitationId: invitation.id,
        type: 'SHIPPING_ADDRESS',
        address: 'Jl. Senayan Residences No. 18, Kebayoran Baru, Jakarta Selatan (Kode Pos: 12180)',
        notes: 'Penerima: Dika & Nurdi',
        order: 3,
      },
    ],
  })

  // Ensure sample guests exist
  await prisma.guest.deleteMany({ where: { invitationId: invitation.id } })
  await prisma.guest.createMany({
    data: [
      {
        invitationId: invitation.id,
        name: 'Dika dan Istri',
        slug: 'dika-dan-istri',
        rsvpStatus: 'ATTENDING',
        attendance: 2,
      },
      {
        invitationId: invitation.id,
        name: 'Keluarga Besar Ahmad',
        slug: 'keluarga-besar-ahmad',
        rsvpStatus: 'ATTENDING',
        attendance: 4,
      },
    ],
  })

  console.log(`\n🎉 SUKSES! Undangan Luxury Dika & Nurdi berhasil dibuat untuk customer@gmail.com!`)
  console.log(`URL Undangan: http://localhost:3000/i/${invitation.slug}`)
  console.log(`URL Tamu 1: http://localhost:3000/i/${invitation.slug}?to=Dika%20dan%20Istri`)
  console.log(`URL Tamu 2: http://localhost:3000/i/${invitation.slug}?to=Keluarga%20Besar%20Ahmad`)
}

createLuxuryInvitationForCustomer()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
  })
