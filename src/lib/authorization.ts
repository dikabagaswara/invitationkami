import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { UnauthorizedError, ForbiddenError, NotFoundError } from '@/lib/errors'

/**
 * Get the authenticated session user.
 * Throws UnauthorizedError if not authenticated.
 */
export async function requireAuth() {
  const session = await auth()
  if (!session?.user?.id) {
    throw new UnauthorizedError()
  }
  return session.user
}

/**
 * Require SUPER_ADMIN role.
 */
export async function requireAdmin() {
  const user = await requireAuth()
  if (user.role !== 'SUPER_ADMIN') {
    throw new ForbiddenError()
  }
  return user
}

/**
 * Verify that the authenticated user owns the specified invitation.
 * Throws ForbiddenError or NotFoundError if not.
 */
export async function requireInvitationOwnership(invitationId: string, userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: true },
  })

  // SUPER_ADMIN has full access to all invitations
  if (user?.role === 'SUPER_ADMIN') {
    const invitation = await prisma.invitation.findUnique({
      where: { id: invitationId },
      select: { id: true },
    })
    if (!invitation) throw new NotFoundError('Invitation')
    return invitation
  }

  const invitation = await prisma.invitation.findFirst({
    where: {
      id: invitationId,
      userId, // MANDATORY tenant filter for regular users
    },
    select: { id: true },
  })

  if (!invitation) {
    throw new NotFoundError('Invitation')
  }

  return invitation
}
