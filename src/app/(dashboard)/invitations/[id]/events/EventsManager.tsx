/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { addEventAction, updateEventAction, deleteEventAction } from '../../actions'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { toast } from 'sonner'
import { Loader2, Plus, Trash2, MapPin, Calendar, Clock } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

export default function EventsManager({
  invitationId,
  initialEvents
}: {
  invitationId: string
  initialEvents: any[]
}) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingEvent, setEditingEvent] = useState<any>(null)

  async function onSubmit(formData: FormData) {
    const data = {
      title: formData.get('title') as string,
      date: formData.get('date') as string,
      startTime: formData.get('startTime') as string,
      endTime: formData.get('endTime') as string,
      venue: formData.get('venue') as string,
      address: formData.get('address') as string,
      mapUrl: formData.get('mapUrl') as string,
      order: 0,
    }
    
    startTransition(async () => {
      try {
        if (editingEvent) {
          await updateEventAction(invitationId, editingEvent.id, data)
          toast.success("Berhasil mengupdate acara")
        } else {
          await addEventAction(invitationId, data)
          toast.success("Berhasil menambahkan acara")
        }
        setIsDialogOpen(false)
        setEditingEvent(null)
        router.refresh()
      } catch {
        toast.error("Gagal menyimpan acara")
      }
    })
  }

  async function handleDelete(eventId: string) {
    if (!confirm('Yakin ingin menghapus acara ini?')) return
    
    startTransition(async () => {
      try {
        await deleteEventAction(invitationId, eventId)
        toast.success("Acara dihapus")
        router.refresh()
      } catch {
        toast.error("Gagal menghapus acara")
      }
    })
  }

  function openNewDialog() {
    setEditingEvent(null)
    setIsDialogOpen(true)
  }

  function openEditDialog(event: any) {
    setEditingEvent(event)
    setIsDialogOpen(true)
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger>
            <Button onClick={openNewDialog}><Plus className="mr-2 h-4 w-4" /> Tambah Acara</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{editingEvent ? 'Edit Acara' : 'Tambah Acara'}</DialogTitle>
              <DialogDescription>
                Isi detail acara yang akan diselenggarakan.
              </DialogDescription>
            </DialogHeader>
            <form action={onSubmit} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>Nama Acara</Label>
                <Input name="title" defaultValue={editingEvent?.title} placeholder="Contoh: Akad Nikah" required />
              </div>
              <div className="space-y-2">
                <Label>Tanggal</Label>
                <Input type="date" name="date" defaultValue={editingEvent?.date ? new Date(editingEvent.date).toISOString().split('T')[0] : ''} required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Jam Mulai</Label>
                  <Input type="time" name="startTime" defaultValue={editingEvent?.startTime} placeholder="08:00" />
                </div>
                <div className="space-y-2">
                  <Label>Jam Selesai</Label>
                  <Input type="time" name="endTime" defaultValue={editingEvent?.endTime} placeholder="Selesai" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Nama Tempat</Label>
                <Input name="venue" defaultValue={editingEvent?.venue} placeholder="Contoh: Hotel Mulia" required />
              </div>
              <div className="space-y-2">
                <Label>Alamat Lengkap</Label>
                <Textarea name="address" defaultValue={editingEvent?.address} placeholder="Jalan Raya No. 123..." />
              </div>
              <div className="space-y-2">
                <Label>URL Google Maps</Label>
                <Input name="mapUrl" defaultValue={editingEvent?.mapUrl} placeholder="https://goo.gl/maps/..." />
              </div>
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Simpan
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {initialEvents.length === 0 ? (
          <p className="text-muted-foreground text-sm py-4 col-span-full">Belum ada acara yang ditambahkan.</p>
        ) : (
          initialEvents.map((event) => (
            <Card key={event.id} className="relative overflow-hidden group">
              <CardHeader className="pb-3">
                <CardTitle className="flex justify-between items-center text-lg">
                  {event.title}
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEditDialog(event)}>
                      <span className="sr-only">Edit</span>
                      <Plus className="h-4 w-4 rotate-45" /> {/* Just using as edit for now or we could use pencil */}
                    </Button>
                    <Button variant="destructive" size="icon" className="h-8 w-8" onClick={() => handleDelete(event.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" /> 
                  {new Date(event.date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                {(event.startTime || event.endTime) && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {event.startTime || '??:??'} - {event.endTime || 'Selesai'}
                  </div>
                )}
                <div className="flex gap-2 text-muted-foreground items-start">
                  <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-foreground">{event.venue}</span>
                    {event.address && <p className="mt-0.5">{event.address}</p>}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
