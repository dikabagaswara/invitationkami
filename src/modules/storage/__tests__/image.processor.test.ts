import { describe, it, expect, vi, beforeEach } from 'vitest'
import { processImage } from '../processors/image.processor'
import { AppError } from '@/lib/errors'

vi.mock('sharp', () => {
  const sharpMock = vi.fn().mockImplementation((buffer) => {
    return {
      metadata: vi.fn().mockResolvedValue({ format: buffer.toString() === 'invalid' ? undefined : 'jpeg' }),
      resize: vi.fn().mockReturnThis(),
      webp: vi.fn().mockReturnThis(),
      toBuffer: vi.fn().mockResolvedValue(Buffer.from('processed')),
    }
  })
  return { default: sharpMock }
})

describe('Image Processor', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    process.env.UPLOAD_MAX_SIZE_BYTES = '5242880'
  })

  it('rejects file too large', async () => {
    const buffer = Buffer.alloc(6 * 1024 * 1024) // 6MB
    await expect(processImage(buffer, 'test.jpg')).rejects.toThrow(/File too large/)
  })

  it('rejects blocked extensions', async () => {
    const buffer = Buffer.from('test')
    await expect(processImage(buffer, 'test.exe')).rejects.toThrow(/File type not allowed/)
    await expect(processImage(buffer, 'test.php')).rejects.toThrow(/File type not allowed/)
  })

  it('rejects invalid image format', async () => {
    const buffer = Buffer.from('invalid') // Will mock sharp metadata throwing or returning undefined
    await expect(processImage(buffer, 'test.jpg')).rejects.toThrow(/Invalid or corrupt image file|File type not allowed/)
  })

  it('processes a valid image successfully', async () => {
    const buffer = Buffer.from('valid')
    const result = await processImage(buffer, 'test.jpg')
    expect(result.mimeType).toBe('image/webp')
    expect(result.extension).toBe('.webp')
    expect(result.buffer).toBeDefined()
  })
})
