const store = new Map<string, { count: number; expiresAt: number }>()

export function rateLimit(ip: string, limit: number, windowMs: number): boolean {
  const now = Date.now()
  const record = store.get(ip)

  if (!record || record.expiresAt < now) {
    store.set(ip, { count: 1, expiresAt: now + windowMs })
    return true
  }

  if (record.count >= limit) {
    return false
  }

  record.count += 1
  return true
}
