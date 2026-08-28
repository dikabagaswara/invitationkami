import sharp, { Metadata } from 'sharp'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import { AppError } from '@/lib/errors'

// Allowed MIME types (allowlist)
const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
])

// Blocked extensions (deny list in addition to MIME)
const BLOCKED_EXTENSIONS = new Set([
  '.exe', '.php', '.js', '.ts', '.sh', '.bat', '.cmd',
  '.html', '.htm', '.svg', '.xml', '.zip', '.tar', '.gz',
])

const MAX_FILE_SIZE = parseInt(process.env.UPLOAD_MAX_SIZE_BYTES ?? '5242880', 10)

export interface ProcessedImage {
  buffer: Buffer
  mimeType: string
  extension: string
  filename: string
}

export interface ImageProcessorOptions {
  maxWidth?: number
  maxHeight?: number
  quality?: number
}

/**
 * Validate and process an uploaded image.
 * - Validates MIME type (allowlist)
 * - Validates file size
 * - Strips EXIF metadata
 * - Resizes to max dimensions
 * - Converts to WebP
 */
export async function processImage(
  buffer: Buffer,
  originalFilename: string,
  options: ImageProcessorOptions = {},
): Promise<ProcessedImage> {
  const { maxWidth = 1200, maxHeight = 1200, quality = 80 } = options

  // 1. Check file size
  if (buffer.byteLength > MAX_FILE_SIZE) {
    throw new AppError(
      `File too large. Maximum size is ${MAX_FILE_SIZE / 1024 / 1024} MB`,
      'FILE_TOO_LARGE',
      413,
    )
  }

  // 2. Check extension
  const ext = path.extname(originalFilename).toLowerCase()
  if (BLOCKED_EXTENSIONS.has(ext)) {
    throw new AppError(`File type not allowed: ${ext}`, 'INVALID_FILE_TYPE', 415)
  }

  // 3. Detect actual MIME type via sharp (prevents extension spoofing)
  let metadata: Metadata
  try {
    metadata = await sharp(buffer).metadata()
  } catch {
    throw new AppError('Invalid or corrupt image file', 'INVALID_IMAGE', 415)
  }

  const detectedMime = `image/${metadata.format}`
  if (!ALLOWED_MIME_TYPES.has(detectedMime)) {
    throw new AppError(`File type not allowed: ${metadata.format}`, 'INVALID_FILE_TYPE', 415)
  }

  // 4. Process: resize + convert to WebP + strip metadata
  const processed = await sharp(buffer)
    .resize(maxWidth, maxHeight, {
      fit: 'inside',
      withoutEnlargement: true,
    })
    .webp({ quality })
    .toBuffer()

  const filename = `${uuidv4()}.webp`

  return {
    buffer: processed,
    mimeType: 'image/webp',
    extension: '.webp',
    filename,
  }
}

/**
 * Profile photos: smaller target dimensions
 */
export async function processProfileImage(buffer: Buffer, originalFilename: string) {
  return processImage(buffer, originalFilename, {
    maxWidth: 600,
    maxHeight: 600,
    quality: 85,
  })
}

/**
 * Gallery images: standard dimensions
 */
export async function processGalleryImage(buffer: Buffer, originalFilename: string) {
  return processImage(buffer, originalFilename, {
    maxWidth: 1200,
    maxHeight: 1200,
    quality: 80,
  })
}
