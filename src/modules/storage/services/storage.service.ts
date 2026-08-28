export interface UploadResult {
  url: string
  path: string
}

export interface StorageAdapter {
  upload(file: Buffer, path: string, mimeType: string): Promise<UploadResult>
  delete(path: string): Promise<void>
  getUrl(path: string): string
}

let _adapter: StorageAdapter | null = null

export async function getStorageAdapter(): Promise<StorageAdapter> {
  if (_adapter) return _adapter

  const adapterType = process.env.STORAGE_ADAPTER ?? 'local'

  if (adapterType === 'local') {
    const { LocalStorageAdapter } = await import('@/modules/storage/adapters/local.adapter')
    _adapter = new LocalStorageAdapter()
    return _adapter
  }

  // Future: s3, r2, minio — add here
  throw new Error(`Unknown STORAGE_ADAPTER: ${adapterType}`)
}
