'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { registerAction } from '@/app/(auth)/register/actions'

export function RegisterForm() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const result = await registerAction(formData)

    if (result?.error) {
      setError(result.error)
      setLoading(false)
      return
    }

    // Auto login on client side to keep dynamic active domain/tunnel
    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (res?.error) {
        setError('Pendaftaran berhasil, silakan masuk manual.')
        setLoading(false)
        router.push('/login')
        return
      }

      router.push('/dashboard')
      router.refresh()
    } catch {
      router.push('/dashboard')
    }
  }

  return (
    <Card className="rounded-2xl border-stone-200 shadow-sm bg-white">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-serif">Daftar Akun Baru</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="name">Nama Lengkap</Label>
            <Input id="name" name="name" type="text" required placeholder="Nama Anda" className="h-10 text-sm" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required placeholder="you@example.com" className="h-10 text-sm" />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              placeholder="Minimal 8 karakter, 1 huruf kapital, 1 angka"
              className="h-10 text-sm"
            />
          </div>
          {error && (
            <div className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
              {error}
            </div>
          )}
          <Button type="submit" className="w-full h-10 bg-stone-900 hover:bg-stone-800 text-white font-medium" disabled={loading}>
            {loading ? 'Mendaftarkan...' : 'Daftar Sekarang'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
