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

  // 3. Move 'dika-dan-nurdi' to customer@invitationkami.com if it exists
  await prisma.invitation.updateMany({
    where: { slug: 'dika-dan-nurdi' },
    data: { userId: customerKami.id },
  })

  // 4. Delete legacy user customer@gmail.com
  const deleted = await prisma.user.deleteMany({
    where: { email: 'customer@gmail.com' },
  })
  console.log(`  ✓ Removed ${deleted.count} legacy customer@gmail.com user(s)`)

  // 5. Update all demo-* invitations to belong to customer@invitationkami.com
  const updateResult = await prisma.invitation.updateMany({
    where: {
      slug: { startsWith: 'demo-' },
    },
    data: {
      userId: customerKami.id,
    },
  })
  console.log(`  ✓ Assigned ${updateResult.count} demo invitations to customer@invitationkami.com`)

  console.log('\n🎉 Selesai! Akun customer@gmail.com berhasil dihapus dan semua data kini milik customer@invitationkami.com.')
}

setupCleanCustomerData()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
  })
