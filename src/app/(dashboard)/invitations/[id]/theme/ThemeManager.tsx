/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { updateThemeAction } from '../../actions'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { Loader2, LayoutTemplate, Palette, Type, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function ThemeManager({
  invitationId,
  currentThemeId,
  currentColor,
  currentFont,
  currentSectionConfig,
  themes
}: {
  invitationId: string
  currentThemeId: string
  currentColor: string
  currentFont: string
  currentSectionConfig: Record<string, boolean>
  themes: any[] // eslint-disable-line @typescript-eslint/no-explicit-any
}) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const [selectedThemeId, setSelectedThemeId] = useState(currentThemeId)
  const [selectedColor, setSelectedColor] = useState(currentColor || 'default')
  const [selectedFont, setSelectedFont] = useState(currentFont || 'default')
  const [sections, setSections] = useState<Record<string, boolean>>(currentSectionConfig || {
    hero: true, quote: true, couple: true, countdown: true,
    events: true, story: true, gallery: true, rsvp: true,
    guestbook: true, gift: true, location: true, footer: true
  })

  // Dummy presets since we don't have them in the DB yet in this mock
  const colorPresets = ['default', 'emerald', 'rose', 'sky', 'amber', 'slate']
  const fontPresets = ['default', 'serif', 'sans', 'mono', 'script']

  const toggleSection = (key: string) => {
    setSections(prev => ({ ...prev, [key]: !prev[key] }))
  }

  async function handleSave() {
    startTransition(async () => {
      try {
        await updateThemeAction(invitationId, {
          themeId: selectedThemeId,
          colorPreset: selectedColor,
          fontPreset: selectedFont,
          animationIntensity: 'NORMAL',
          sectionConfig: sections,
        })
        toast.success("Pengaturan tampilan berhasil disimpan")
        router.refresh()
      } catch {
        toast.error("Gagal menyimpan tampilan")
      }
    })
  }

  return (
    <div className="space-y-8 pb-20">
      {/* Themes */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold flex items-center gap-2"><LayoutTemplate className="h-5 w-5" /> Pilih Tema</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {themes.map(theme => (
            <div 
              key={theme.id}
              onClick={() => setSelectedThemeId(theme.id)}
              className={cn(
                "relative rounded-xl border-2 cursor-pointer transition-all overflow-hidden",
                selectedThemeId === theme.id ? "border-primary ring-2 ring-primary/20 ring-offset-2" : "border-transparent hover:border-border"
              )}
            >
              <div className="aspect-[3/4] bg-muted relative">
                {theme.thumbnail ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={theme.thumbnail} alt={theme.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="flex items-center justify-center w-full h-full text-muted-foreground bg-gray-100">
                    {theme.name}
                  </div>
                )}
                {selectedThemeId === theme.id && (
                  <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                )}
              </div>
              <div className="p-3 bg-white border-t">
                <p className="font-medium">{theme.name}</p>
                {theme.category && <p className="text-xs text-muted-foreground">{theme.category}</p>}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Colors & Fonts */}
        <section className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2"><Palette className="h-5 w-5" /> Warna Tema</h2>
            <div className="flex flex-wrap gap-2">
              {colorPresets.map(color => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium border capitalize transition-all",
                    selectedColor === color ? "bg-primary text-primary-foreground border-primary" : "bg-white hover:bg-gray-50 text-gray-700"
                  )}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold flex items-center gap-2"><Type className="h-5 w-5" /> Jenis Huruf</h2>
            <div className="flex flex-wrap gap-2">
              {fontPresets.map(font => (
                <button
                  key={font}
                  onClick={() => setSelectedFont(font)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium border capitalize transition-all",
                    selectedFont === font ? "bg-primary text-primary-foreground border-primary" : "bg-white hover:bg-gray-50 text-gray-700"
                  )}
                >
                  {font}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Section Config */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Visibility Bagian</h2>
          <Card>
            <CardContent className="p-0 divide-y">
              {Object.keys(sections).map((key) => (
                <div key={key} className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                  <Label htmlFor={`switch-${key}`} className="cursor-pointer capitalize flex-1 font-medium">
                    {key}
                  </Label>
                  <Switch
                    id={`switch-${key}`}
                    checked={sections[key]}
                    onCheckedChange={() => toggleSection(key)}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </section>
      </div>

      <div className="flex justify-end pt-4 border-t sticky bottom-0 bg-white/80 backdrop-blur-sm p-4 -mx-8 px-8 z-10">
        <Button onClick={handleSave} disabled={isPending} size="lg">
          {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          Simpan Tampilan
        </Button>
      </div>
    </div>
  )
}
