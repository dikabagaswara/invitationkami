'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check, X, Trash2, MessageSquare, Loader2 } from 'lucide-react'

interface MessageItem {
  id: string
  name: string
  message: string
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
  createdAt: Date | string
}

export function GuestbookClient({
  messages,
  updateStatusAction,
  deleteMessageAction,
}: {
  messages: MessageItem[]
  updateStatusAction: (messageId: string, status: 'PENDING' | 'APPROVED' | 'REJECTED') => Promise<void>
  deleteMessageAction: (messageId: string) => Promise<void>
}) {
  const router = useRouter()
  const [loadingId, setLoadingId] = useState<string | null>(null)

  const handleUpdateStatus = async (id: string, status: 'PENDING' | 'APPROVED' | 'REJECTED', name: string) => {
    const actionLabel = status === 'APPROVED' ? 'menyetujui' : 'menolak'
    if (!window.confirm(`Apakah Anda yakin ingin ${actionLabel} ucapan dari "${name}"?`)) {
      return
    }

    try {
      setLoadingId(id)
      await updateStatusAction(id, status)
      toast.success(`Status ucapan berhasil diubah menjadi ${status}`)
      router.refresh()
    } catch {
      toast.error('Gagal memperbarui status ucapan')
    } finally {
      setLoadingId(null)
    }
  }

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`PERINGATAN: Apakah Anda yakin ingin menghapus ucapan dari "${name}" secara permanen?`)) {
      return
    }

    try {
      setLoadingId(id)
      await deleteMessageAction(id)
      toast.success('Ucapan berhasil dihapus')
      router.refresh()
    } catch {
      toast.error('Gagal menghapus ucapan')
    } finally {
      setLoadingId(null)
    }
  }

  if (messages.length === 0) {
    return (
      <div className="text-center py-12 border rounded-xl bg-white p-8">
        <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <p className="text-gray-500 font-medium">Belum ada ucapan & doa dari tamu.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className="p-5 border rounded-xl bg-white shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:border-gray-300 transition"
        >
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-gray-900">{msg.name}</h3>
              {msg.status === 'APPROVED' && (
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100 text-[10px]">Ditampilkan</Badge>
              )}
              {msg.status === 'REJECTED' && (
                <Badge variant="secondary" className="bg-red-100 text-red-800 hover:bg-red-100 text-[10px]">Ditolak</Badge>
              )}
              {msg.status === 'PENDING' && (
                <Badge variant="outline" className="text-amber-700 border-amber-300 text-[10px]">Menunggu</Badge>
              )}
            </div>
            <p className="text-sm text-gray-600 leading-relaxed max-w-2xl">{msg.message}</p>
            <p className="text-[11px] text-gray-400">
              {new Date(msg.createdAt).toLocaleDateString('id-ID', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
            {msg.status !== 'APPROVED' && (
              <Button
                size="sm"
                variant="outline"
                disabled={loadingId === msg.id}
                onClick={() => handleUpdateStatus(msg.id, 'APPROVED', msg.name)}
                className="text-xs text-green-700 border-green-200 hover:bg-green-50"
              >
                {loadingId === msg.id ? <Loader2 className="w-3 h-3 animate-spin mr-1" /> : <Check className="w-3.5 h-3.5 mr-1" />}
                Tampilkan
              </Button>
            )}
            {msg.status !== 'REJECTED' && (
              <Button
                size="sm"
                variant="outline"
                disabled={loadingId === msg.id}
                onClick={() => handleUpdateStatus(msg.id, 'REJECTED', msg.name)}
                className="text-xs text-amber-700 border-amber-200 hover:bg-amber-50"
              >
                {loadingId === msg.id ? <Loader2 className="w-3 h-3 animate-spin mr-1" /> : <X className="w-3.5 h-3.5 mr-1" />}
                Tolak
              </Button>
            )}
            <Button
              size="sm"
              variant="ghost"
              disabled={loadingId === msg.id}
              onClick={() => handleDelete(msg.id, msg.name)}
              className="text-xs text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
