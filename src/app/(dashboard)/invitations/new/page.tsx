import { requireAuth } from '@/lib/authorization'
import { prisma } from '@/lib/db'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { createInvitationAction } from '../actions'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Sparkles, Copy, ExternalLink, Wand2 } from 'lucide-react'

export default async function NewInvitationPage({
  searchParams,
}: {
  searchParams: Promise<{ template?: string }>
}) {
  const { template: preselectedTemplate } = await searchParams
  const currentUser = await requireAuth()

  const [themes, demoInvitations, users] = await Promise.all([
    prisma.theme.findMany({ where: { isActive: true }, orderBy: { name: 'asc' } }),
    prisma.invitation.findMany({
      where: { slug: { startsWith: 'demo-' } },
      include: { theme: true },
      orderBy: { slug: 'asc' },
    }),
    currentUser.role === 'SUPER_ADMIN'
      ? prisma.user.findMany({ select: { id: true, name: true, email: true, role: true }, orderBy: { name: 'asc' } })
      : Promise.resolve([]),
  ])

  async function handleCreate(formData: FormData) {
    'use server'
    const result = await createInvitationAction(formData)
    redirect(`/invitations/${result.id}/couple`)
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Buat Undangan Baru</h1>
          <p className="text-muted-foreground mt-1">
            Mulai dari awal atau duplikasi template demo yang sudah lengkap dengan sekali klik.
          </p>
        </div>
        <Link href="/invitations">
          <Button variant="ghost">Batal</Button>
        </Link>
      </div>

      <Card className="border-stone-200 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Wand2 className="w-5 h-5 text-amber-600" />
            <span>Formulir Pembuatan Undangan</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form action={handleCreate} className="space-y-6">
            {/* ─── TEMPLATE DEMO SELECTOR (ONE-CLICK PRESET) ─── */}
            <div className="p-4 rounded-xl bg-gradient-to-r from-amber-50/90 via-orange-50/70 to-rose-50/70 border border-amber-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600 animate-pulse" />
                  <Label htmlFor="templateDemoSlug" className="text-xs font-bold uppercase tracking-wider text-amber-900">
                    Opsi Cepat: Buat dari Template Demo (Siap Pakai)
                  </Label>
                </div>
                {preselectedTemplate && (
                  <span className="text-[11px] bg-amber-200/80 text-amber-950 px-2 py-0.5 rounded font-semibold">
                    Template Terpilih
                  </span>
                )}
              </div>
              <p className="text-xs text-amber-800 leading-relaxed">
                Pilih salah satu template demo untuk menyalin susunan acara, galeri contoh, cerita cinta, amplop, dan gaya visual secara instan. Anda tinggal mengganti nama &amp; teks isiannya saja!
              </p>
              <select
                id="templateDemoSlug"
                name="templateDemoSlug"
                className="w-full h-11 px-3 rounded-lg border border-amber-300/80 bg-white text-xs sm:text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 shadow-xs"
                defaultValue={preselectedTemplate || ''}
              >
                <option value="">-- Buat Polos (Tanpa Duplikasi Template Demo) --</option>
                {demoInvitations.map((demo) => (
                  <option key={demo.id} value={demo.slug}>
                    ✨ Template {demo.theme?.name || demo.slug} ({demo.groomName} &amp; {demo.brideName})
                  </option>
                ))}
              </select>
            </div>

            {/* ─── SUPER ADMIN USER ASSIGNMENT ─── */}
            {currentUser.role === 'SUPER_ADMIN' && users.length > 0 && (
              <div className="space-y-2 p-3 bg-stone-100/80 border border-stone-200 rounded-lg">
                <Label htmlFor="userId" className="text-stone-900 font-semibold text-xs uppercase tracking-wider">
                  Pemilik Undangan (Agent / Customer)
                </Label>
                <select
                  id="userId"
                  name="userId"
                  className="w-full h-10 px-3 rounded-md border border-input bg-white text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  defaultValue={currentUser.id}
                >
                  {users.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name} ({u.email}) — {u.role === 'SUPER_ADMIN' ? 'Super Admin' : 'Customer'}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* ─── NAMES INPUT ─── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="groomName" className="font-semibold">Nama Panggilan Pria</Label>
                <Input id="groomName" name="groomName" required placeholder="Contoh: Dias" className="h-10" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="brideName" className="font-semibold">Nama Panggilan Wanita</Label>
                <Input id="brideName" name="brideName" required placeholder="Contoh: Azalia" className="h-10" />
              </div>
            </div>

            {/* ─── SLUG LINK INPUT ─── */}
            <div className="space-y-2">
              <Label htmlFor="slug" className="font-semibold">Link / URL Undangan (Slug)</Label>
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm text-muted-foreground font-mono bg-stone-100 px-3 py-2.5 rounded-md border border-stone-200">
                  /i/
                </span>
                <Input id="slug" name="slug" required placeholder="dias-dan-azalia" className="font-mono h-10" />
              </div>
              <p className="text-[11px] text-muted-foreground">Gunakan huruf kecil dan tanda hubung (-), contoh: <code>dias-azalia</code>.</p>
            </div>

            {/* ─── DEFAULT THEME FALLBACK ─── */}
            <div className="space-y-2">
              <Label htmlFor="themeSlug" className="font-semibold">Desain Tema (Jika Mulai Polos)</Label>
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

            <div className="pt-4 flex justify-end gap-3 border-t">
              <Link href="/invitations">
                <Button type="button" variant="outline">Kembali</Button>
              </Link>
              <Button type="submit" className="bg-stone-900 hover:bg-stone-800 text-white shadow-sm">
                <Copy className="w-4 h-4 mr-2" />
                Buat &amp; Lanjut ke Editor →
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}