import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/db'
import { registerSchema, type RegisterInput } from '@/modules/auth/schemas/auth.schema'
import { AppError } from '@/lib/errors'

const BCRYPT_ROUNDS = 12

export async function registerUser(input: RegisterInput) {
  const parsed = registerSchema.safeParse(input)
  if (!parsed.success) {
    throw new AppError(parsed.error.issues[0].message, 'VALIDATION_ERROR', 422)
  }

  const existing = await prisma.user.findUnique({
    where: { email: parsed.data.email },
    select: { id: true },
  })

  if (existing) {
    throw new AppError('Email already registered', 'EMAIL_TAKEN', 409)
  }

  const passwordHash = await bcrypt.hash(parsed.data.password, BCRYPT_ROUNDS)

  const user = await prisma.user.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      passwordHash,
      role: 'CUSTOMER',
    },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
    },
  })

  return user
}
