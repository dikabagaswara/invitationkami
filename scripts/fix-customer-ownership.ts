import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function setupCleanCustomerData() {
  console.log('🔄 Cleaning & assigning correct demo ownership and slugs...')

  const bcrypt = await import('bcryptjs')
  const passwordHash = await bcrypt.default.hash('Password123!', 12)

  // 1. Ensure customer@invitationkami.com exists
  const customerKami = await prisma.user.upsert({
    where: { email: 'customer@invitationkami.com' },
    update: { passwordHash, name: 'Budi & Anisa' },
    create: {
      email: 'customer@invitationkami.com',
      name: 'Budi & Anisa',
      passwordHash,
      role: 'CUSTOMER',
    },
  })
  console.log(`  ✓ User customer@invitationkami.com (ID: ${customerKami.id})`)

  // 2. Ensure customer@gmail.com exists
  const customerGmail = await prisma.user.upsert({
    where: { email: 'customer@gmail.com' },
    update: { passwordHash, name: 'Dika Bagaswara & Nurdi' },
    create: {
      email: 'customer@gmail.com',
      name: 'Dika Bagaswara & Nurdi',
      passwordHash,
      role: 'CUSTOMER',
    },
  })
  console.log(`  ✓ User customer@gmail.com (ID: ${customerGmail.id})`)

  // 3. Ensure admin@invitationkami.com exists
  const admin = await prisma.user.upsert({
    where: { email: 'admin@invitationkami.com' },
    update: { passwordHash },
    create: {
      email: 'admin@invitationkami.com',
      name: 'Super Admin',
      passwordHash,
      role: 'SUPER_ADMIN',
    },
  })
  console.log(`  ✓ User admin@invitationkami.com`)

  // 4. Update all demo-* invitations to belong to customer@invitationkami.com
  const updateResult = await prisma.invitation.updateMany({
    where: {
      slug: { startsWith: 'demo-' },
    },
    data: {
      userId: customerKami.id,
    },
  })
  console.log(`  ✓ Assigned ${updateResult.count} demo invitations to customer@invitationkami.com`)

  // 5. Ensure luxury invitation 'dika-dan-nurdi' belongs to customer@gmail.com
  const luxuryTheme = await prisma.theme.findFirst({ where: { slug: 'luxury' } })
  const music = await prisma.music.findFirst({ where: { isActive: true } })

  if (luxuryTheme) {
    const invLuxury = await prisma.invitation.upsert({
      where: { slug: 'dika-dan-nurdi' },
      update: {
        userId: customerGmail.id,
        themeId: luxuryTheme.id,
        musicId: music?.id,
        isPublished: true,
        groomName: 'Dika',
        groomFullName: 'Dika Bagaswara, S.Kom.',
        brideName: 'Nurdi',
        brideFullName: 'Nurdi Anindya, S.M.',
      },
      create: {
        userId: customerGmail.id,
        slug: 'dika-dan-nurdi',
        themeId: luxuryTheme.id,
        musicId: music?.id,
        isPublished: true,
        groomName: 'Dika',
        groomFullName: 'Dika Bagaswara, S.Kom.',
        brideName: 'Nurdi',
        brideFullName: 'Nurdi Anindya, S.M.',
        openingTitle: 'THE ROYAL WEDDING OF',
        openingText: 'Dengan memohon rahmat dan ridho Allah SWT, kami mengundang Anda dalam perayaan pernikahan kami.',
        quote: 'Dan di antara tanda-tanda kebesaran-Nya diciptakan-Nya pasangan-pasangan untukmu agar kamu merasa tenteram bersamanya.',
        quoteSource: 'QS. Ar-Rum: 21',
      },
    })
    console.log(`  ✓ Luxury invitation /i/${invLuxury.slug} assigned to customer@gmail.com`)
  }

  // 6. Give customer@invitationkami.com a showcase invitation 'budi-dan-anisa'
  const elegantTheme = await prisma.theme.findFirst({ where: { slug: 'elegant' } })
  if (elegantTheme) {
    const invBudi = await prisma.invitation.upsert({
      where: { slug: 'budi-dan-anisa' },
      update: {
        userId: customerKami.id,
        themeId: elegantTheme.id,
        musicId: music?.id,
        isPublished: true,
        groomName: 'Budi',
        groomFullName: 'Budi Santoso, S.T.',
        brideName: 'Anisa',
        brideFullName: 'Anisa Rahmawati, S.E.',
      },
      create: {
        userId: customerKami.id,
        slug: 'budi-dan-anisa',
        themeId: elegantTheme.id,
        musicId: music?.id,
        isPublished: true,
        groomName: 'Budi',
        groomFullName: 'Budi Santoso, S.T.',
        brideName: 'Anisa',
        brideFullName: 'Anisa Rahmawati, S.E.',
        openingTitle: 'THE WEDDING CELEBRATION',
        openingText: 'Dengan penuh sukacita kami mengundang Bapak/Ibu/Saudara/i untuk hadir di hari bahagia kami.',
        quote: 'Dan di antara tanda-tanda kebesaran-Nya diciptakan-Nya pasangan-pasangan untukmu agar kamu merasa tenteram bersamanya.',
        quoteSource: 'QS. Ar-Rum: 21',
      },
    })
    console.log(`  ✓ Showcase invitation /i/${invBudi.slug} assigned to customer@invitationkami.com`)
  }

  console.log('\n🎉 Selesai! Semua kepemilikan undangan dan slug telah rapi & sinkron.')
}

setupCleanCustomerData()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
  })
