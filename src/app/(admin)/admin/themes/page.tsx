import { requireAdmin } from '@/lib/authorization'
import { prisma } from '@/lib/db'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { revalidatePath } from 'next/cache'
import Link from 'next/link'
import { Palette, ExternalLink, Sparkles, Check, X, ShieldCheck } from 'lucide-react'

export default async function AdminThemesPage() {
  await requireAdmin()

  const themes = await prisma.theme.findMany({
    include: {
      _count: {
        select: { invitations: true },
      },
    },
    orderBy: { createdAt: 'asc' },
  })

  async function toggleThemeStatus(themeId: string, currentStatus: boolean) {
    'use server'
    await requireAdmin()

    await prisma.theme.update({
      where: { id: themeId },
      data: { isActive: !currentStatus },
    })

    revalidatePath('/admin/themes')
    revalidatePath('/invitations/new')
  }

  async function togglePremiumStatus(themeId: string, currentPremium: boolean) {
    'use server'
    await requireAdmin()

    await prisma.theme.update({
      where: { id: themeId },
      data: { isPremium: !currentPremium },
    })

    revalidatePath('/admin/themes')
  }

  async function updateThemeInfo(formData: FormData) {
    'use server'
    await requireAdmin()

    const themeId = formData.get('themeId') as string
    const name = formData.get('name') as string
    const description = formData.get('description') as string
    const category = formData.get('category') as string

    if (!themeId || !name) return

    await prisma.theme.update({
      where: { id: themeId },
      data: { name, description, category },
    })

    revalidatePath('/admin/themes')
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Master Desain & Tema Undangan</h1>
        <p className="text-muted-foreground mt-1">
          Kelola ketersediaan tema, status premium, serta pantau penggunaan tema di seluruh platform.
        </p>
      </div>

      {/* Grid Theme Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {themes.map((theme) => {
          const demoSlug = `demo-${theme.slug}`

          return (
            <Card key={theme.id} className="flex flex-col justify-between overflow-hidden border">
              <div>
                <CardHeader className="pb-3 border-b bg-gray-50/50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Palette className="h-5 w-5 text-primary" />
                      <CardTitle className="text-lg">{theme.name}</CardTitle>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {theme.isPremium && (
                        <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 text-[10px]">
                          <Sparkles className="mr-1 h-3 w-3" /> Premium
                        </Badge>
                      )}
                      {theme.isActive ? (
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100 text-[10px]">
                          Aktif
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="text-[10px]">
                          Nonaktif
                        </Badge>
                      )}
                    </div>
                  </div>
                  <CardDescription className="text-xs mt-1">
                    Slug: <code className="font-mono text-gray-700 font-semibold">{theme.slug}</code> | Kategori: {theme.category || 'General'}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-4 space-y-4 text-sm">
                  <p className="text-gray-600 text-xs line-clamp-2">
                    {theme.description || 'Desain tema undangan digital eksklusif.'}
                  </p>

                  <div className="p-3 bg-gray-50 rounded-lg text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Digunakan:</span>
                      <span className="font-bold text-gray-900">{theme._count.invitations} Undangan</span>
                    </div>
                  </div>

                  {/* Form Update Basic Info */}
                  <form action={updateThemeInfo} className="space-y-3 pt-2 border-t text-xs">
                    <input type="hidden" name="themeId" value={theme.id} />
                    <div className="space-y-1">
                      <Label htmlFor={`name-${theme.id}`} className="text-xs">Nama Tema</Label>
                      <Input
                        id={`name-${theme.id}`}
                        name="name"
                        defaultValue={theme.name}
                        className="h-8 text-xs"
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor={`desc-${theme.id}`} className="text-xs">Deskripsi Singkat</Label>
                      <Input
                        id={`desc-${theme.id}`}
                        name="description"
                        defaultValue={theme.description || ''}
                        className="h-8 text-xs"
                      />
                    </div>
                    <div className="flex justify-end">
                      <Button type="submit" variant="outline" size="sm" className="h-7 text-xs">
                        Simpan Perubahan
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </div>

              <div className="p-4 border-t bg-gray-50/50 flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  {/* Toggle Active */}
                  <form action={toggleThemeStatus.bind(null, theme.id, theme.isActive)}>
                    <Button
                      type="submit"
                      variant={theme.isActive ? 'outline' : 'default'}
                      size="sm"
                      className="h-8 text-xs"
                    >
                      {theme.isActive ? (
                        <>
                          <X className="mr-1 h-3 w-3" /> Nonaktifkan
                        </>
                      ) : (
                        <>
                          <Check className="mr-1 h-3 w-3" /> Aktifkan
                        </>
                      )}
                    </Button>
                  </form>

                  {/* Toggle Premium */}
                  <form action={togglePremiumStatus.bind(null, theme.id, theme.isPremium)}>
                    <Button
                      type="submit"
                      variant="ghost"
                      size="sm"
                      className="h-8 text-xs text-amber-700 hover:bg-amber-50"
                    >
                      <ShieldCheck className="mr-1 h-3.5 w-3.5" />
                      {theme.isPremium ? 'Standard' : 'Premium'}
                    </Button>
                  </form>
                </div>

                <Link href={`/i/${demoSlug}`} target="_blank">
                  <Button variant="outline" size="sm" className="h-8 text-xs">
                    <ExternalLink className="mr-1 h-3 w-3" /> Demo Live
                  </Button>
                </Link>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}