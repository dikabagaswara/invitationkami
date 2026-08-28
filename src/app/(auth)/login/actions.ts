'use server'

import { signIn } from '@/lib/auth'
import { loginSchema } from '@/modules/auth/schemas/auth.schema'
import { AuthError } from 'next-auth'

export async function loginAction(formData: FormData) {
  const raw = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const parsed = loginSchema.safeParse(raw)
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  try {
    await signIn('credentials', {
      email: parsed.data.email,
      password: parsed.data.password,
      redirectTo: '/dashboard',
    })
  } catch (err) {
    if (err instanceof AuthError) {
      return { error: 'Invalid email or password' }
    }
    throw err
  }
}
