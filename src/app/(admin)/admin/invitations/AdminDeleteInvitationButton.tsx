'use client'

import { Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function AdminDeleteInvitationButton({
  invitationId,
  title,
  deleteAction,
}: {
  invitationId: string
  title: string
  deleteAction: (invitationId: string) => Promise<void>
}) {
  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault()
    if (window.confirm(`PERINGATAN SUPER ADMIN:\nApakah Anda yakin ingin menghapus undangan "${title}" secara permanen? Seluruh data tamu, pesan, dan galeri akan terhapus.`)) {
      await deleteAction(invitationId)
    }
  }

  return (
    <form onSubmit={handleDelete}>
      <Button
        variant="ghost"
        size="icon"
        type="submit"
        className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
        title="Hapus Undangan"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </form>
  )
}
