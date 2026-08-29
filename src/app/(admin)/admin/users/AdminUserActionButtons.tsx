'use client'

import { Trash2, KeyRound } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function AdminDeleteUserButton({
  userId,
  userName,
  deleteAction,
}: {
  userId: string
  userName: string
  deleteAction: (userId: string) => Promise<void>
}) {
  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault()
    if (window.confirm(`PERINGATAN SUPER ADMIN:\nApakah Anda yakin ingin menghapus akun pengguna "${userName}"? Seluruh undangan yang dimiliki akun ini akan ikut terhapus.`)) {
      await deleteAction(userId)
    }
  }

  return (
    <form onSubmit={handleDelete}>
      <Button
        variant="ghost"
        size="icon"
        type="submit"
        className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
        title="Hapus Akun"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </form>
  )
}

export function AdminResetPasswordForm({
  userId,
  userName,
  resetAction,
}: {
  userId: string
  userName: string
  resetAction: (formData: FormData) => Promise<void>
}) {
  const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newPass = formData.get('newPassword') as string
    if (!newPass) return

    if (window.confirm(`Konfirmasi reset kata sandi untuk pengguna "${userName}"?`)) {
      await resetAction(formData)
    }
  }

  return (
    <form onSubmit={handleReset} className="flex items-center gap-2">
      <input type="hidden" name="userId" value={userId} />
      <Input
        name="newPassword"
        type="password"
        placeholder="Password baru"
        className="h-8 w-32 text-xs"
        required
      />
      <Button variant="outline" size="sm" type="submit" className="h-8 text-xs">
        <KeyRound className="mr-1 h-3 w-3" /> Reset
      </Button>
    </form>
  )
}
