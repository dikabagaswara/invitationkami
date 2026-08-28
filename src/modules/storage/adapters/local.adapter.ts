import fs from 'fs/promises'
import path from 'path'
import { type StorageAdapter, type UploadResult } from '@/modules/storage/services/storage.service'

export class LocalStorageAdapter implements StorageAdapter {
  private readonly baseDir: string
  private readonly baseUrl: string

  constructor() {
    this.baseDir = process.env.UPLOAD_DIR ?? path.join(process.cwd(), 'public', 'uploads')
    this.baseUrl = '/uploads'
  }

  async upload(file: Buffer, filePath: string, _mimeType: string): Promise<UploadResult> {
    const fullPath = path.join(this.baseDir, filePath)
    const dir = path.dirname(fullPath)

    await fs.mkdir(dir, { recursive: true })
    await fs.writeFile(fullPath, file)

    const url = `${this.baseUrl}/${filePath.replace(/\\/g, '/')}`
    return { url, path: filePath }
  }

  async delete(filePath: string): Promise<void> {
    const fullPath = path.join(this.baseDir, filePath)
    try {
      await fs.unlink(fullPath)
    } catch (err: unknown) {
      // File may not exist — ignore
      if ((err as NodeJS.ErrnoException).code !== 'ENOENT') {
        throw err
      }
    }
  }

  getUrl(filePath: string): string {
    return `${this.baseUrl}/${filePath.replace(/\\/g, '/')}`
  }
}
