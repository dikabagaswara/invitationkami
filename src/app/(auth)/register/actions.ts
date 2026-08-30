'use server'

import { registerUser } from '@/modules/auth/services/auth.service'
import { registerSchema } from '@/modules/auth/schemas/auth.schema'

export async function registerAction(formData: FormData) {
  const raw = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const parsed = registerSchema.safeParse(raw)
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  try {
    await registerUser(parsed.data)
    return { success: true }
  } catch (err: unknown) {
    const error = err as { code?: string; message?: string }
    return { error: error.message ?? 'Pendaftaran gagal' }
  }
}
