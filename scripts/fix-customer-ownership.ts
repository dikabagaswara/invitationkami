import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function setupCleanCustomerData() {
  console.log('🔄 Cleaning non-demo invitations and ensuring ONLY demo-* invitations exist...')

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

  // 3. Delete ANY invitation whose slug does NOT start with 'demo-'
  const deletedNonDemo = await prisma.invitation.deleteMany({
    where: {
      slug: {
        not: {
          startsWith: 'demo-',
        },
      },
    },
  })
  console.log(`  ✓ Successfully deleted ${deletedNonDemo.count} non-demo invitation(s) (including test/sample slugs)`)

  // 4. Update demo-oceanic to Bagas & Anggra
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
        coverPhoto: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1000&auto=format&fit=crop&q=80',
        heroPhoto: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1000&auto=format&fit=crop&q=80',
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
        coverPhoto: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1000&auto=format&fit=crop&q=80',
        heroPhoto: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1000&auto=format&fit=crop&q=80',
      },
    })
    console.log(`  ✓ Updated demo-oceanic to Bagas & Anggra with coverPhoto and heroPhoto`)
  }

  // 5. Update all demo-* invitations to belong to customer@invitationkami.com and ensure default couple cover
  const updateResult = await prisma.invitation.updateMany({
    where: {
      slug: { startsWith: 'demo-' },
    },
    data: {
      userId: customerKami.id,
    },
  })
  console.log(`  ✓ Assigned all ${updateResult.count} demo invitations exclusively to customer@invitationkami.com`)

  // 6. List all remaining invitations in the database for verification
  const remainingInvitations = await prisma.invitation.findMany({
    select: { slug: true, groomName: true, brideName: true, userId: true },
    orderBy: { slug: 'asc' },
  })

  console.log(`\n📋 Status Database Saat Ini (${remainingInvitations.length} total demo):`)
  remainingInvitations.forEach((inv, i) => {
    console.log(`  ${i + 1}. /i/${inv.slug} (${inv.groomName} & ${inv.brideName})`)
  })

  console.log('\n🎉 Selesai! Semua undangan selain demo-* berhasil dihapus secara bersih.')
}

setupCleanCustomerData()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
  })
