'use client'

import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function DeleteGuestButton({
  guestId,
  guestName,
  deleteAction,
}: {
  guestId: string
  guestName: string
  deleteAction: (guestId: string) => Promise<void>
}) {
  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault()
    if (window.confirm(`Apakah Anda yakin ingin menghapus data tamu "${guestName}"?`)) {
      await deleteAction(guestId)
    }
  }

  return (
    <form onSubmit={handleDelete}>
      <Button
        variant="ghost"
        size="icon"
        type="submit"
        className="text-red-500 hover:text-red-700 hover:bg-red-50 h-8 w-8"
        title="Hapus Tamu"
      >
        <Trash2 className="h-4 w-4" />
        <span className="sr-only">Hapus</span>
      </Button>
    </form>
  )
}
