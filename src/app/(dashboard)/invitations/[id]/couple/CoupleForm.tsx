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
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'

export default function CoupleForm({
  invitationId,
  defaultValues
}: {
  invitationId: string
  defaultValues: any
}) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

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
      openingTitle: formData.get('openingTitle') as string,
      openingText: formData.get('openingText') as string,
      quote: formData.get('quote') as string,
      quoteSource: formData.get('quoteSource') as string,
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
              <Input name="groomName" defaultValue={defaultValues.groomName || ''} required />
            </div>
            <div className="space-y-2">
              <Label>Nama Lengkap & Gelar</Label>
              <Input name="groomFullName" defaultValue={defaultValues.groomFullName || ''} />
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
              <Label>URL Foto</Label>
              <Input name="groomPhoto" defaultValue={defaultValues.groomPhoto || ''} placeholder="https://..." />
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
              <Input name="brideName" defaultValue={defaultValues.brideName || ''} required />
            </div>
            <div className="space-y-2">
              <Label>Nama Lengkap & Gelar</Label>
              <Input name="brideFullName" defaultValue={defaultValues.brideFullName || ''} />
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
              <Label>URL Foto</Label>
              <Input name="bridePhoto" defaultValue={defaultValues.bridePhoto || ''} placeholder="https://..." />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Kata Pembuka & Kutipan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Judul Pembuka</Label>
            <Input name="openingTitle" defaultValue={defaultValues.openingTitle || ''} placeholder="Assalamu'alaikum Wr. Wb." />
          </div>
          <div className="space-y-2">
            <Label>Teks Pembuka</Label>
            <Textarea name="openingText" defaultValue={defaultValues.openingText || ''} placeholder="Dengan memohon rahmat dan ridho Allah SWT..." />
          </div>
          <div className="space-y-2">
            <Label>Teks Kutipan</Label>
            <Textarea name="quote" defaultValue={defaultValues.quote || ''} placeholder="Dan di antara tanda-tanda kekuasaan-Nya..." />
          </div>
          <div className="space-y-2">
            <Label>Sumber Kutipan</Label>
            <Input name="quoteSource" defaultValue={defaultValues.quoteSource || ''} placeholder="QS. Ar-Rum: 21" />
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
