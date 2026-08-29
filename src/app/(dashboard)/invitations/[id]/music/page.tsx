import { requireInvitationOwnership, requireAuth } from '@/lib/authorization'
import { prisma } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { MusicManagerClient } from './MusicManagerClient'

export default async function MusicPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const user = await requireAuth()
  if (!user.id) throw new Error('No user')
  await requireInvitationOwnership(id, user.id)

  const [invitation, musicList] = await Promise.all([
    prisma.invitation.findUnique({
      where: { id },
      include: { music: true },
    }),
    prisma.music.findMany({
      where: { isActive: true },
      orderBy: { title: 'asc' },
    }),
  ])

  if (!invitation) throw new Error('Not found')

  async function updateMusicAction(musicId: string | null, customUrl?: string) {
    'use server'
    const currentUser = await requireAuth()
    if (!currentUser.id) throw new Error('No user')
    await requireInvitationOwnership(id, currentUser.id)

    if (customUrl && customUrl.trim()) {
      let customMusic = await prisma.music.findFirst({
        where: { fileUrl: customUrl.trim() },
      })

      if (!customMusic) {
        customMusic = await prisma.music.create({
          data: {
            title: 'Custom Wedding Music',
            artist: 'User Upload/Link',
            fileUrl: customUrl.trim(),
            category: 'custom',
            isActive: true,
          },
        })
      }

      await prisma.invitation.update({
        where: { id },
        data: { musicId: customMusic.id },
      })
    } else {
      await prisma.invitation.update({
        where: { id },
        data: { musicId },
      })
    }

    revalidatePath(`/invitations/${id}/music`)
    if (invitation?.slug) {
      revalidatePath(`/i/${invitation.slug}`)
    }
  }

  return (
    <MusicManagerClient
      invitationId={id}
      currentMusicId={invitation.musicId}
      currentMusicUrl={invitation.music?.fileUrl || null}
      musicList={musicList.map((m) => ({
        id: m.id,
        title: m.title,
        artist: m.artist,
        fileUrl: m.fileUrl,
        category: m.category,
      }))}
      updateMusicAction={updateMusicAction}
    />
  )
}
