/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { addStoryAction, deleteStoryAction } from '../../actions'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { toast } from 'sonner'
import { Loader2, Plus, Trash2, CalendarHeart } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export default function StoryManager({
  invitationId,
  initialStories
}: {
  invitationId: string
  initialStories: any[] // eslint-disable-line @typescript-eslint/no-explicit-any
}) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  async function onSubmit(formData: FormData) {
    const data = {
      title: formData.get('title') as string,
      date: formData.get('date') as string,
      description: formData.get('description') as string,
      imageUrl: formData.get('imageUrl') as string || undefined,
      order: initialStories.length,
    }
    
    startTransition(async () => {
      try {
        await addStoryAction(invitationId, data)
        toast.success("Berhasil menambahkan cerita")
        setIsDialogOpen(false)
        router.refresh()
      } catch {
        toast.error("Gagal menyimpan cerita")
      }
    })
  }

  async function handleDelete(storyId: string) {
    if (!confirm('Yakin ingin menghapus cerita ini?')) return
    
    startTransition(async () => {
      try {
        await deleteStoryAction(invitationId, storyId)
        toast.success("Cerita dihapus")
        router.refresh()
      } catch {
        toast.error("Gagal menghapus cerita")
      }
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="mr-2 h-4 w-4" /> Tambah Cerita</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Tambah Cerita Cinta</DialogTitle>
              <DialogDescription>
                Tambahkan momen penting dalam perjalanan cinta Anda.
              </DialogDescription>
            </DialogHeader>
            <form action={onSubmit} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>Judul Momen</Label>
                <Input name="title" placeholder="Contoh: Awal Bertemu" required />
              </div>
              <div className="space-y-2">
                <Label>Tanggal / Tahun</Label>
                <Input name="date" placeholder="Contoh: Januari 2020" />
              </div>
              <div className="space-y-2">
                <Label>Deskripsi Cerita</Label>
                <Textarea name="description" placeholder="Ceritakan momen ini..." required />
              </div>
              <div className="space-y-2">
                <Label>URL Foto (Opsional)</Label>
                <Input name="imageUrl" placeholder="https://..." />
              </div>
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Simpan
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="relative border-l border-gray-200 ml-3 md:ml-6 space-y-6 pb-4">
        {initialStories.length === 0 ? (
          <p className="text-muted-foreground text-sm py-4 ml-6">Belum ada cerita yang ditambahkan.</p>
        ) : (
          initialStories.map((story) => (
            <div key={story.id} className="relative pl-8 md:pl-10">
              <span className="absolute -left-[1.3rem] bg-white border-2 border-primary rounded-full p-1.5 flex items-center justify-center">
                <CalendarHeart className="h-4 w-4 text-primary" />
              </span>
              <Card className="relative group">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <CardTitle className="text-lg">{story.title}</CardTitle>
                      {story.date && <CardDescription className="mt-1">{story.date}</CardDescription>}
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => handleDelete(story.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {story.description}
                  {story.imageUrl && (
                    <div className="mt-4 rounded-md overflow-hidden bg-muted">
                      {/* Using regular img for simple usage in dashboard */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={story.imageUrl} alt={story.title} className="w-full h-auto object-cover max-h-48" />
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
