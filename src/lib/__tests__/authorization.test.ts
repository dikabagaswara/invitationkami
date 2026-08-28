import { describe, it, expect, vi } from 'vitest'
import { requireAuth, requireAdmin, requireInvitationOwnership } from '../authorization'
import { UnauthorizedError, ForbiddenError, NotFoundError } from '../errors'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'

vi.mock('@/lib/auth', () => ({
  auth: vi.fn(),
}))

vi.mock('@/lib/db', () => ({
  prisma: {
    invitation: {
      findFirst: vi.fn(),
    },
  },
}))

describe('Authorization', () => {
  describe('requireAuth', () => {
    it('throws UnauthorizedError if no session', async () => {
      vi.mocked(auth).mockResolvedValueOnce(null as unknown as never)
      await expect(requireAuth()).rejects.toThrow(UnauthorizedError)
    })

    it('returns user if session exists', async () => {
      vi.mocked(auth).mockResolvedValueOnce({ user: { id: 'u1' } } as unknown as never)
      const user = await requireAuth()
      expect(user.id).toBe('u1')
    })
  })

  describe('requireAdmin', () => {
    it('throws ForbiddenError if user is not SUPER_ADMIN', async () => {
      vi.mocked(auth).mockResolvedValueOnce({ user: { id: 'u1', role: 'CUSTOMER' } } as unknown as never)
      await expect(requireAdmin()).rejects.toThrow(ForbiddenError)
    })

    it('returns user if role is SUPER_ADMIN', async () => {
      vi.mocked(auth).mockResolvedValueOnce({ user: { id: 'u2', role: 'SUPER_ADMIN' } } as unknown as never)
      const user = await requireAdmin()
      expect(user.id).toBe('u2')
    })
  })

  describe('requireInvitationOwnership', () => {
    it('throws NotFoundError if invitation not found for user', async () => {
      vi.mocked(prisma.invitation.findFirst).mockResolvedValueOnce(null)
      await expect(requireInvitationOwnership('inv1', 'u1')).rejects.toThrow(NotFoundError)
    })

    it('returns invitation if ownership matches', async () => {
      const mockInv = { id: 'inv1' }
      vi.mocked(prisma.invitation.findFirst).mockResolvedValueOnce(mockInv as unknown as never)
      const result = await requireInvitationOwnership('inv1', 'u1')
      expect(result).toEqual(mockInv)
    })
  })
})
