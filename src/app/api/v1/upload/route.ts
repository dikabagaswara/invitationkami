import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { processImage } from '@/modules/storage/processors/image.processor'
import { getStorageAdapter } from '@/modules/storage/services/storage.service'

export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await req.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Process image: resize, convert to WebP, strip EXIF metadata
    const processed = await processImage(buffer, file.name, {
      maxWidth: 1600,
      maxHeight: 1600,
      quality: 85,
    })

    const storage = await getStorageAdapter()
    const relativePath = `invitations/${processed.filename}`
    const result = await storage.upload(processed.buffer, relativePath, processed.mimeType)

    return NextResponse.json({
      url: result.url,
      filename: processed.filename,
    })
  } catch (error: any) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: error?.message || 'Failed to upload image' },
      { status: error?.statusCode || 500 }
    )
  }
}
