/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { addGalleryAction, deleteGalleryAction } from '../../actions'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { toast } from 'sonner'
import { Loader2, Plus, Trash2, Image as ImageIcon } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export default function GalleryManager({
  invitationId,
  initialPhotos
}: {
  invitationId: string
  initialPhotos: any[] // eslint-disable-line @typescript-eslint/no-explicit-any
}) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  async function onSubmit(formData: FormData) {
    const data = {
      imageUrl: formData.get('imageUrl') as string,
      caption: formData.get('caption') as string || undefined,
      order: initialPhotos.length,
    }
    
    startTransition(async () => {
      try {
        await addGalleryAction(invitationId, data)
        toast.success("Berhasil menambahkan foto")
        setIsDialogOpen(false)
        router.refresh()
      } catch {
        toast.error("Gagal menyimpan foto")
      }
    })
  }

  async function handleDelete(photoId: string) {
    if (!confirm('Yakin ingin menghapus foto ini?')) return
    
    startTransition(async () => {
      try {
        await deleteGalleryAction(invitationId, photoId)
        toast.success("Foto dihapus")
        router.refresh()
      } catch {
        toast.error("Gagal menghapus foto")
      }
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="mr-2 h-4 w-4" /> Tambah Foto</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Tambah Foto Galeri</DialogTitle>
              <DialogDescription>
                Masukkan URL foto dan caption (opsional).
              </DialogDescription>
            </DialogHeader>
            <form action={onSubmit} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>URL Foto</Label>
                <Input name="imageUrl" placeholder="https://..." required />
              </div>
              <div className="space-y-2">
                <Label>Caption (Opsional)</Label>
                <Input name="caption" placeholder="Momen manis..." />
              </div>
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Simpan Foto
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {initialPhotos.length === 0 ? (
          <div className="col-span-full py-12 flex flex-col items-center justify-center text-muted-foreground border-2 border-dashed rounded-lg">
            <ImageIcon className="h-12 w-12 mb-4 opacity-20" />
            <p>Belum ada foto di galeri.</p>
          </div>
        ) : (
          initialPhotos.map((photo) => (
            <div key={photo.id} className="relative group rounded-xl overflow-hidden aspect-[3/4] border bg-muted">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo.imageUrl} alt={photo.caption || 'Gallery photo'} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
              
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4">
                <div className="flex justify-end">
                  <Button variant="destructive" size="icon" className="h-8 w-8" onClick={() => handleDelete(photo.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                {photo.caption && (
                  <p className="text-white text-sm font-medium line-clamp-2 drop-shadow-md">
                    {photo.caption}
                  </p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
