import { requireAdmin } from '@/lib/authorization'
import { prisma } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { AdminMusicClient } from './AdminMusicClient'
import fs from 'fs/promises'
import path from 'path'

export default async function AdminMusicPage() {
  await requireAdmin()

  const musicList = await prisma.music.findMany({
    include: {
      _count: {
        select: { invitations: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  })

  async function addMusicAction(formData: FormData) {
    'use server'
    await requireAdmin()

    const title = (formData.get('title') as string || '').trim()
    const artist = (formData.get('artist') as string || '').trim()
    let fileUrl = (formData.get('fileUrl') as string || '').trim()
    const category = (formData.get('category') as string) || 'pop'
    const audioFile = formData.get('audioFile') as File | null

    if (!title) throw new Error('Judul lagu wajib diisi')

    // Handle Direct MP3 File Upload to Server
    if (audioFile && audioFile.size > 0) {
      const buffer = Buffer.from(await audioFile.arrayBuffer())
      const sanitizedName = title
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-') + '-' + Date.now() + '.mp3'

      const uploadDir = path.join(process.cwd(), 'public', 'music')
      await fs.mkdir(uploadDir, { recursive: true })
      const filePath = path.join(uploadDir, sanitizedName)
      await fs.writeFile(filePath, buffer)

      fileUrl = `/music/${sanitizedName}`
    }

    if (!fileUrl) {
      throw new Error('Pilih file audio MP3 untuk diupload atau masukkan URL file MP3')
    }

    await prisma.music.create({
      data: {
        title,
        artist: artist || null,
        fileUrl,
        category,
        isActive: true,
      },
    })

    revalidatePath('/admin/music')
    revalidatePath('/invitations/[id]/music', 'page')
  }

  async function toggleMusicActive(musicId: string, currentStatus: boolean) {
    'use server'
    await requireAdmin()

    await prisma.music.update({
      where: { id: musicId },
      data: { isActive: !currentStatus },
    })

    revalidatePath('/admin/music')
    revalidatePath('/invitations/[id]/music', 'page')
  }

  async function deleteMusic(musicId: string) {
    'use server'
    await requireAdmin()

    const music = await prisma.music.findUnique({ where: { id: musicId } })
    if (music && music.fileUrl && music.fileUrl.startsWith('/music/')) {
      // Clean up uploaded file if on local server
      const localFilePath = path.join(process.cwd(), 'public', music.fileUrl)
      try {
        await fs.unlink(localFilePath)
      } catch (err) {
        console.warn('Could not delete local file:', err)
      }
    }

    await prisma.music.delete({
      where: { id: musicId },
    })

    revalidatePath('/admin/music')
    revalidatePath('/invitations/[id]/music', 'page')
  }

  return (
    <AdminMusicClient
      musicList={musicList.map((m) => ({
        id: m.id,
        title: m.title,
        artist: m.artist,
        fileUrl: m.fileUrl,
        category: m.category,
        isActive: m.isActive,
        usageCount: m._count.invitations,
      }))}
      addMusicAction={addMusicAction}
      toggleMusicActive={toggleMusicActive}
      deleteMusic={deleteMusic}
    />
  )
}
