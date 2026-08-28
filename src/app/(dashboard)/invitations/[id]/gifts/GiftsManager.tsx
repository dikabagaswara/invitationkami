/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { addGiftAction, deleteGiftAction } from '../../actions'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { toast } from 'sonner'
import { Loader2, Plus, Trash2, Wallet, Landmark, Truck } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function GiftsManager({
  invitationId,
  initialGifts
}: {
  invitationId: string
  initialGifts: any[]
}) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [giftType, setGiftType] = useState<string>('BANK_TRANSFER')

  async function onSubmit(formData: FormData) {
    const data: any = {
      type: giftType,
      order: initialGifts.length,
    }

    if (giftType === 'BANK_TRANSFER' || giftType === 'EWALLET') {
      data.bankName = formData.get('bankName') as string
      data.accountNumber = formData.get('accountNumber') as string
      data.accountHolder = formData.get('accountHolder') as string
    } else {
      data.address = formData.get('address') as string
      data.accountHolder = formData.get('accountHolder') as string
      data.notes = formData.get('notes') as string
    }
    
    startTransition(async () => {
      try {
        await addGiftAction(invitationId, data)
        toast.success("Berhasil menambahkan hadiah")
        setIsDialogOpen(false)
        router.refresh()
      } catch {
        toast.error("Gagal menyimpan hadiah")
      }
    })
  }

  async function handleDelete(giftId: string) {
    if (!confirm('Yakin ingin menghapus data ini?')) return
    
    startTransition(async () => {
      try {
        await deleteGiftAction(invitationId, giftId)
        toast.success("Data dihapus")
        router.refresh()
      } catch {
        toast.error("Gagal menghapus data")
      }
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger>
            <Button><Plus className="mr-2 h-4 w-4" /> Tambah Rekening/Alamat</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Tambah Data Hadiah</DialogTitle>
              <DialogDescription>
                Pilih metode penerimaan hadiah untuk tamu Anda.
              </DialogDescription>
            </DialogHeader>
            <form action={onSubmit} className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>Tipe</Label>
                <Select value={giftType} onValueChange={(val) => setGiftType(val || 'BANK_TRANSFER')}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih tipe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BANK_TRANSFER">Transfer Bank</SelectItem>
                    <SelectItem value="EWALLET">E-Wallet (OVO, GoPay, dll)</SelectItem>
                    <SelectItem value="SHIPPING_ADDRESS">Alamat Pengiriman Fisik</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {(giftType === 'BANK_TRANSFER' || giftType === 'EWALLET') && (
                <>
                  <div className="space-y-2">
                    <Label>{giftType === 'BANK_TRANSFER' ? 'Nama Bank' : 'Nama E-Wallet'}</Label>
                    <Input name="bankName" placeholder={giftType === 'BANK_TRANSFER' ? "BCA" : "GoPay"} required />
                  </div>
                  <div className="space-y-2">
                    <Label>{giftType === 'BANK_TRANSFER' ? 'Nomor Rekening' : 'Nomor HP/Akun'}</Label>
                    <Input name="accountNumber" required />
                  </div>
                  <div className="space-y-2">
                    <Label>Atas Nama</Label>
                    <Input name="accountHolder" placeholder="Nama pemilik rekening/akun" required />
                  </div>
                </>
              )}

              {giftType === 'SHIPPING_ADDRESS' && (
                <>
                  <div className="space-y-2">
                    <Label>Nama Penerima</Label>
                    <Input name="accountHolder" placeholder="Nama penerima paket" required />
                  </div>
                  <div className="space-y-2">
                    <Label>Alamat Lengkap</Label>
                    <Textarea name="address" placeholder="Jalan Raya..." required />
                  </div>
                  <div className="space-y-2">
                    <Label>Catatan (Opsional)</Label>
                    <Input name="notes" placeholder="Titip di pos satpam..." />
                  </div>
                </>
              )}

              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Simpan
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {initialGifts.length === 0 ? (
          <p className="text-muted-foreground text-sm py-4 col-span-full">Belum ada data hadiah yang ditambahkan.</p>
        ) : (
          initialGifts.map((gift) => (
            <Card key={gift.id} className="relative">
              <CardHeader className="pb-3 flex flex-row justify-between items-start space-y-0">
                <div className="flex items-center gap-2">
                  {gift.type === 'BANK_TRANSFER' ? <Landmark className="h-5 w-5 text-primary" /> : 
                   gift.type === 'EWALLET' ? <Wallet className="h-5 w-5 text-primary" /> : 
                   <Truck className="h-5 w-5 text-primary" />}
                  <CardTitle className="text-lg">
                    {gift.type === 'BANK_TRANSFER' ? gift.bankName : 
                     gift.type === 'EWALLET' ? gift.bankName : 'Alamat Pengiriman'}
                  </CardTitle>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive -mt-2 -mr-2" onClick={() => handleDelete(gift.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-1">
                {(gift.type === 'BANK_TRANSFER' || gift.type === 'EWALLET') ? (
                  <>
                    <p className="text-2xl font-mono tracking-wider font-semibold">{gift.accountNumber}</p>
                    <p className="text-sm text-muted-foreground uppercase">a.n. {gift.accountHolder}</p>
                  </>
                ) : (
                  <>
                    <p className="font-medium">{gift.accountHolder}</p>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">{gift.address}</p>
                    {gift.notes && <p className="text-xs text-muted-foreground mt-2 italic">Catatan: {gift.notes}</p>}
                  </>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
