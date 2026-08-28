import { requireAuth } from '@/lib/authorization'
import { prisma } from '@/lib/db'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createInvitationAction } from '../actions'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function NewInvitationPage() {
  await requireAuth()
  const themes = await prisma.theme.findMany({ where: { isActive: true } })

  async function handleCreate(formData: FormData) {
    'use server'
    const result = await createInvitationAction(formData)
    redirect(`/invitations/${result.id}/couple`)
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Buat Undangan Baru</h1>
          <p className="text-muted-foreground mt-1">Lengkapi informasi dasar untuk memulai pembuatan undangan.</p>
        </div>
        <Link href="/invitations">
          <Button variant="ghost">Batal</Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informasi Awal</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={handleCreate} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="groomName">Nama Panggilan Pria</Label>
                <Input id="groomName" name="groomName" required placeholder="Contoh: Romeo" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="brideName">Nama Panggilan Wanita</Label>
                <Input id="brideName" name="brideName" required placeholder="Contoh: Juliet" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">Link / URL Undangan (Slug)</Label>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground font-mono">/i/</span>
                <Input id="slug" name="slug" required placeholder="romeo-juliet" className="font-mono" />
              </div>
              <p className="text-xs text-muted-foreground">Hanya huruf kecil, angka, dan tanda hubung (-).</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="themeSlug">Pilih Desain Tema Awal</Label>
              <select
                id="themeSlug"
                name="themeSlug"
                className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                defaultValue={themes[0]?.slug || 'elegant'}
              >
                {themes.map((t) => (
                  <option key={t.id} value={t.slug}>
                    {t.name} — {t.description || t.category}
                  </option>
                ))}
              </select>
            </div>

            <div className="pt-4 flex justify-end gap-3">
              <Link href="/invitations">
                <Button type="button" variant="outline">Kembali</Button>
              </Link>
              <Button type="submit">Buat & Lanjut ke Editor →</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}