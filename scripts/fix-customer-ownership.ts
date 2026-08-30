import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function setupCleanCustomerData() {
  console.log('🔄 Cleaning & assigning correct demo ownership, deleting dika-dan-nurdi and establishing bagas-anggra...')

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

  // 2. Ensure admin@invitationkami.com exists
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

  // 3. Permanently remove 'dika-dan-nurdi' invitation
  const deletedDika = await prisma.invitation.deleteMany({
    where: { slug: 'dika-dan-nurdi' },
  })
  console.log(`  ✓ Permanently deleted ${deletedDika.count} 'dika-dan-nurdi' invitation(s)`)

  // 4. Permanently delete legacy customer@gmail.com
  const deleted = await prisma.user.deleteMany({
    where: { email: 'customer@gmail.com' },
  })
  console.log(`  ✓ Removed ${deleted.count} legacy customer@gmail.com user(s)`)

  // 5. Update demo-oceanic to Bagas & Anggra
  const oceanicTheme = await prisma.theme.findFirst({ where: { slug: 'oceanic' } })
  const firstMusic = await prisma.music.findFirst({ where: { isActive: true } })

  if (oceanicTheme) {
    await prisma.invitation.upsert({
      where: { slug: 'demo-oceanic' },
      update: {
        userId: customerKami.id,
        groomName: 'Bagas',
        groomFullName: 'Bagas Pratama, S.T.',
        brideName: 'Anggra',
        brideFullName: 'Anggraini Putri, S.Kom.',
      },
      create: {
        userId: customerKami.id,
        slug: 'demo-oceanic',
        themeId: oceanicTheme.id,
        musicId: firstMusic?.id,
        isPublished: true,
        groomName: 'Bagas',
        groomFullName: 'Bagas Pratama, S.T.',
        brideName: 'Anggra',
        brideFullName: 'Anggraini Putri, S.Kom.',
        openingTitle: 'THE WEDDING CELEBRATION',
      },
    })
    console.log(`  ✓ Updated demo-oceanic to Bagas & Anggra`)
  }

  // 6. Create or update permanent invitation 'bagas-anggra'
  if (oceanicTheme) {
    await prisma.invitation.upsert({
      where: { slug: 'bagas-anggra' },
      update: {
        userId: customerKami.id,
        themeId: oceanicTheme.id,
        musicId: firstMusic?.id,
        isPublished: true,
        groomName: 'Bagas',
        groomFullName: 'Bagas Pratama, S.T.',
        groomFather: 'Bapak Hendra Pratama',
        groomMother: 'Ibu Ratna Dewi',
        groomPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80',
        brideName: 'Anggra',
        brideFullName: 'Anggraini Putri, S.Kom.',
        brideFather: 'Bapak Joko Santoso',
        brideMother: 'Ibu Sri Wahyuni',
        bridePhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=80',
        openingTitle: 'THE WEDDING CELEBRATION',
        openingText: 'Dengan penuh rasa syukur, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dalam pernikahan kami.',
        quote: 'Dan di antara tanda-tanda kebesaran-Nya diciptakan-Nya pasangan-pasangan untukmu agar kamu merasa tenteram bersamanya.',
        quoteSource: 'QS. Ar-Rum: 21',
      },
      create: {
        userId: customerKami.id,
        slug: 'bagas-anggra',
        themeId: oceanicTheme.id,
        musicId: firstMusic?.id,
        isPublished: true,
        groomName: 'Bagas',
        groomFullName: 'Bagas Pratama, S.T.',
        groomFather: 'Bapak Hendra Pratama',
        groomMother: 'Ibu Ratna Dewi',
        groomPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80',
        brideName: 'Anggra',
        brideFullName: 'Anggraini Putri, S.Kom.',
        brideFather: 'Bapak Joko Santoso',
        brideMother: 'Ibu Sri Wahyuni',
        bridePhoto: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&auto=format&fit=crop&q=80',
        openingTitle: 'THE WEDDING CELEBRATION',
        openingText: 'Dengan penuh rasa syukur, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dalam pernikahan kami.',
        quote: 'Dan di antara tanda-tanda kebesaran-Nya diciptakan-Nya pasangan-pasangan untukmu agar kamu merasa tenteram bersamanya.',
        quoteSource: 'QS. Ar-Rum: 21',
      },
    })
    console.log(`  ✓ Permanent invitation /i/bagas-anggra created & active!`)
  }

  // 7. Update all demo-* invitations to belong to customer@invitationkami.com
  const updateResult = await prisma.invitation.updateMany({
    where: {
      slug: { startsWith: 'demo-' },
    },
    data: {
      userId: customerKami.id,
    },
  })
  console.log(`  ✓ Assigned ${updateResult.count} demo invitations to customer@invitationkami.com`)

  console.log('\n🎉 Selesai! dika-dan-nurdi terhapus permanen dan bagas-anggra telah aktif sempurna.')
}

setupCleanCustomerData()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
  })
