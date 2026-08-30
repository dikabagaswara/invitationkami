'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function LoginForm() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (res?.error) {
        setError('Email atau password tidak sesuai')
        setLoading(false)
        return
      }

      // Read callbackUrl from query params if available, else default to /dashboard
      const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'
      
      // Hard navigation ensures session cookies are fully recognized and refreshed immediately
      window.location.href = callbackUrl
    } catch (err: unknown) {
      setError('Terjadi kesalahan saat masuk')
      setLoading(false)
    }
  }

  return (
    <Card className="rounded-2xl border-stone-200 shadow-sm bg-white">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-serif">Masuk ke Akun</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              name="email" 
              type="email" 
              required 
              placeholder="customer@gmail.com" 
              className="h-10 text-sm"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              name="password" 
              type="password" 
              required 
              placeholder="Password akun Anda" 
              className="h-10 text-sm"
            />
          </div>
          {error && (
            <div className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
              {error}
            </div>
          )}
          <Button type="submit" className="w-full h-10 bg-stone-900 hover:bg-stone-800 text-white font-medium" disabled={loading}>
            {loading ? 'Memverifikasi...' : 'Masuk'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
