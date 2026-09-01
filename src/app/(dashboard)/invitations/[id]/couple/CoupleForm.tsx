/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { updateCoupleAction } from '../../actions'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ImageUpload } from '@/components/shared/ImageUpload'
import { toast } from 'sonner'
import { Loader2, Sparkles, BookOpen, Image as ImageIcon } from 'lucide-react'

const PRESET_QUOTES = [
  {
    category: 'Islami (QS. Ar-Rum: 21)',
    source: 'QS. Ar-Rum: 21',
    text: 'Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.',
  },
  {
    category: 'Islami (QS. An-Nur: 32)',
    source: 'QS. An-Nur: 32',
    text: 'Dan nikahkanlah orang-orang yang masih membujang di antara kamu, dan orang-orang yang layak (bernikah) dari hamba-hamba sahayamu yang lelaki dan hamba-hamba sahayamu yang perempuan. Jika mereka miskin Allah akan memampukan mereka dengan kurnia-Nya.',
  },
  {
    category: 'Kristen / Katolik (1 Korintus 13: 4-7)',
    source: '1 Korintus 13:4-7',
    text: 'Kasih itu sabar; kasih itu murah hati; ia tidak cemburu. Ia tidak memegahkan diri dan tidak sombong. Ia menutupi segala sesuatu, percaya segala sesuatu, mengharapkan segala sesuatu, sabar menanggung segala sesuatu.',
  },
  {
    category: 'Kristen / Katolik (Kolose 3: 14)',
    source: 'Kolose 3:14',
    text: 'Dan di atas semuanya itu: kenakanlah kasih, sebagai pengikat yang mempersatukan dan menyempurnakan.',
  },
  {
    category: 'Universal / Puisi Romantis',
    source: 'Kahlil Gibran',
    text: 'Cinta tidak memiliki dan tidak ingin dimiliki, karena cinta telah cukup bagi cinta itu sendiri. Saling mencintailah, namun jangan jadikan cinta sebagai belenggu.',
  },
  {
    category: 'Universal / Modern',
    source: 'The Wedding Promise',
    text: 'Dua jiwa, dua hati, berjanji untuk melangkah bersama dalam sebuah petualangan baru yang penuh cinta, tawa, dan kebahagiaan abadi.',
  },
]

export default function CoupleForm({
  invitationId,
  defaultValues
}: {
  invitationId: string
  defaultValues: any
}) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const [quoteText, setQuoteText] = useState(defaultValues.quote || '')
  const [quoteSourceText, setQuoteSourceText] = useState(defaultValues.quoteSource || '')

  const handleApplyPresetQuote = (presetIndex: number) => {
    const selected = PRESET_QUOTES[presetIndex]
    if (selected) {
      setQuoteText(selected.text)
      setQuoteSourceText(selected.source)
      toast.success(`Template kutipan "${selected.source}" diterapkan!`)
    }
  }

  async function action(formData: FormData) {
    const data = {
      groomName: formData.get('groomName') as string,
      groomFullName: formData.get('groomFullName') as string,
      groomFather: formData.get('groomFather') as string,
      groomMother: formData.get('groomMother') as string,
      groomPhoto: formData.get('groomPhoto') as string,
      brideName: formData.get('brideName') as string,
      brideFullName: formData.get('brideFullName') as string,
      brideFather: formData.get('brideFather') as string,
      brideMother: formData.get('brideMother') as string,
      bridePhoto: formData.get('bridePhoto') as string,
      coverPhoto: formData.get('coverPhoto') as string,
      heroPhoto: formData.get('heroPhoto') as string,
      openingTitle: formData.get('openingTitle') as string,
      openingText: formData.get('openingText') as string,
      quote: quoteText,
      quoteSource: quoteSourceText,
    }
    
    startTransition(async () => {
      try {
        await updateCoupleAction(invitationId, data)
        toast.success("Berhasil menyimpan data mempelai")
        router.refresh()
      } catch {
        toast.error("Gagal menyimpan data")
      }
    })
  }

  return (
    <form action={action} className="space-y-6 pb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Mempelai Pria</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Nama Panggilan</Label>
              <Input name="groomName" defaultValue={defaultValues.groomName} required placeholder="Contoh: Romeo" />
            </div>
            <div className="space-y-2">
              <Label>Nama Lengkap &amp; Gelar</Label>
              <Input name="groomFullName" defaultValue={defaultValues.groomFullName || ''} placeholder="Romeo Montague, S.Kom." />
            </div>
            <div className="space-y-2">
              <Label>Nama Ayah</Label>
              <Input name="groomFather" defaultValue={defaultValues.groomFather || ''} />
            </div>
            <div className="space-y-2">
              <Label>Nama Ibu</Label>
              <Input name="groomMother" defaultValue={defaultValues.groomMother || ''} />
            </div>
            <div className="space-y-2">
              <ImageUpload
                name="groomPhoto"
                defaultValue={defaultValues.groomPhoto || ''}
                label="Foto Mempelai Pria"
                aspectRatioHint="Rasio 1:1 (Kotak / Bulat)"
                description="Tampil pada profil perkenalan mempelai pria."
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mempelai Wanita</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Nama Panggilan</Label>
              <Input name="brideName" defaultValue={defaultValues.brideName} required placeholder="Contoh: Juliet" />
            </div>
            <div className="space-y-2">
              <Label>Nama Lengkap &amp; Gelar</Label>
              <Input name="brideFullName" defaultValue={defaultValues.brideFullName || ''} placeholder="Juliet Capulet, S.Ds." />
            </div>
            <div className="space-y-2">
              <Label>Nama Ayah</Label>
              <Input name="brideFather" defaultValue={defaultValues.brideFather || ''} />
            </div>
            <div className="space-y-2">
              <Label>Nama Ibu</Label>
              <Input name="brideMother" defaultValue={defaultValues.brideMother || ''} />
            </div>
            <div className="space-y-2">
              <ImageUpload
                name="bridePhoto"
                defaultValue={defaultValues.bridePhoto || ''}
                label="Foto Mempelai Wanita"
                aspectRatioHint="Rasio 1:1 (Kotak / Bulat)"
                description="Tampil pada profil perkenalan mempelai wanita."
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ─── FOTO BERDUA / COUPLE FEATURE PHOTOS (CRUD) ─── */}
      <Card className="border-rose-200/80 bg-rose-50/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-rose-900 text-lg">
            <ImageIcon className="w-5 h-5 text-rose-600" />
            <span>Foto Berdua Kedua Mempelai (Cover &amp; Hero)</span>
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            Upload foto berdua yang ditampilkan pada halaman awal sebelum membuka undangan dan section utama setelah undangan dibuka.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ImageUpload
              id="coverPhoto"
              name="coverPhoto"
              defaultValue={defaultValues.coverPhoto || ''}
              label="1. Foto Cover (Sebelum Buka Undangan)"
              aspectRatioHint="Rasio 1:1 atau 3:4"
              description="Tampil di tengah bingkai lingkaran bercahaya saat tamu pertama kali menerima link."
            />

            <ImageUpload
              id="heroPhoto"
              name="heroPhoto"
              defaultValue={defaultValues.heroPhoto || ''}
              label="2. Foto Hero (Setelah Buka Undangan)"
              aspectRatioHint="Rasio 3:4 atau Potrait"
              description="Tampil di section awal begitu undangan dibuka dengan bingkai estetik bergradasi."
            />
          </div>
        </CardContent>
      </Card>

      {/* ─── KATA PEMBUKA & KUTIPAN CEPAT ─── */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-600" />
            <span>Kata Pembuka &amp; Kutipan Doa / Ayat</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Label>Judul Pembuka</Label>
            <Input name="openingTitle" defaultValue={defaultValues.openingTitle || ''} placeholder="Assalamu'alaikum Wr. Wb. / The Wedding Celebration" />
          </div>
          <div className="space-y-2">
            <Label>Teks Pembuka</Label>
            <Textarea name="openingText" defaultValue={defaultValues.openingText || ''} placeholder="Dengan memohon rahmat dan ridho Tuhan Yang Maha Esa..." rows={2} />
          </div>

          {/* Quick Preset Selector */}
          <div className="p-3.5 bg-amber-50/70 border border-amber-200/80 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-amber-900 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Pilih Template Cepat Kutipan &amp; Ayat
              </span>
              <span className="text-[10px] text-amber-700 font-medium">Klik untuk mengisi otomatis</span>
            </div>
            <select
              className="w-full h-10 px-3 rounded-lg border border-amber-300 bg-white text-xs font-medium text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
              defaultValue=""
              onChange={(e) => {
                const val = e.target.value
                if (val !== '') {
                  handleApplyPresetQuote(parseInt(val, 10))
                }
              }}
            >
              <option value="">-- Pilih Contoh Ayat / Doa / Puisi Romantis --</option>
              {PRESET_QUOTES.map((q, idx) => (
                <option key={idx} value={idx}>
                  {q.category}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label>Teks Kutipan / Ayat</Label>
            <Textarea 
              name="quote" 
              value={quoteText} 
              onChange={(e) => setQuoteText(e.target.value)} 
              placeholder="Dan di antara tanda-tanda kekuasaan-Nya..." 
              rows={3} 
            />
          </div>
          <div className="space-y-2">
            <Label>Sumber Kutipan / Nama Surat / Tokoh</Label>
            <Input 
              name="quoteSource" 
              value={quoteSourceText} 
              onChange={(e) => setQuoteSourceText(e.target.value)} 
              placeholder="QS. Ar-Rum: 21 / 1 Korintus 13:4-7" 
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" disabled={isPending}>
          {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Simpan Perubahan
        </Button>
      </div>
    </form>
  )
}
