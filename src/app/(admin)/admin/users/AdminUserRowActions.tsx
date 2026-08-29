'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { 
  Trash2, 
  KeyRound, 
  Edit, 
  LogIn, 
  AlertCircle, 
  Check, 
  X, 
  Loader2, 
  ShieldAlert,
  Lock
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'

interface UserItem {
  id: string
  name: string
  email: string
  role: string
  invitationsCount: number
}

export function AdminUserRowActions({
  user,
  currentAdminId,
  updateUserAction,
  deleteUserAction,
  resetPasswordAction,
  impersonateUserAction,
}: {
  user: UserItem
  currentAdminId: string
  updateUserAction: (userId: string, data: { name: string; email: string }) => Promise<void>
  deleteUserAction: (userId: string) => Promise<void>
  resetPasswordAction: (userId: string, newPass: string) => Promise<void>
  impersonateUserAction: (userId: string) => Promise<void>
}) {
  const router = useRouter()
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isResetOpen, setIsResetOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Edit state
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)

  // Password state
  const [newPassword, setNewPassword] = useState('')

  const isSelf = user.id === currentAdminId
  const hasInvitations = user.invitationsCount > 0

  // 1. Handle Edit Customer (Name & Email)
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim()) {
      toast.error('Nama dan email wajib diisi')
      return
    }

    if (!window.confirm(`Simpan perubahan profil untuk "${user.name}"?`)) {
      return
    }

    try {
      setIsLoading(true)
      await updateUserAction(user.id, { name: name.trim(), email: email.trim() })
      toast.success('Data pengguna berhasil diperbarui')
      setIsEditOpen(false)
      router.refresh()
    } catch {
      toast.error('Gagal memperbarui data pengguna. Mungkin email sudah digunakan.')
    } finally {
      setIsLoading(false)
    }
  }

  // 2. Handle Reset Password
  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newPassword.length < 8) {
      toast.error('Kata sandi baru minimal 8 karakter')
      return
    }

    if (!window.confirm(`Konfirmasi ganti kata sandi untuk akun "${user.name}"?`)) {
      return
    }

    try {
      setIsLoading(true)
      await resetPasswordAction(user.id, newPassword)
      toast.success('Kata sandi berhasil direset')
      setIsResetOpen(false)
      setNewPassword('')
      router.refresh()
    } catch {
      toast.error('Gagal mereset kata sandi')
    } finally {
      setIsLoading(false)
    }
  }

  // 3. Handle Impersonate Login
  const handleLoginAsCustomer = async () => {
    if (isSelf) {
      toast.info('Anda sudah login sebagai akun ini')
      return
    }

    if (!window.confirm(`LOGIN SEBAGAI CUSTOMER:\nAnda akan beralih masuk ke dashboard akun "${user.name}" (${user.email}). Lanjutkan?`)) {
      return
    }

    try {
      setIsLoading(true)
      await impersonateUserAction(user.id)
      toast.success(`Berhasil login sebagai ${user.name}`)
      window.location.href = '/dashboard'
    } catch {
      toast.error('Gagal login sebagai customer')
      setIsLoading(false)
    }
  }

  // 4. Handle Delete User (with Guard)
  const handleDeleteUser = async () => {
    if (isSelf) {
      toast.error('Tidak dapat menghapus akun admin yang sedang Anda gunakan')
      return
    }

    if (hasInvitations) {
      alert(`AKSI DITOLAK:\nPengguna "${user.name}" memiliki ${user.invitationsCount} undangan aktif. Akun yang telah memiliki undangan tidak dapat dihapus demi menjaga integritas data undangan.\n\nSilakan hapus atau arsipkan data undangan terlebih dahulu jika ingin menghapus akun ini.`)
      return
    }

    if (!window.confirm(`PERINGATAN SUPER ADMIN:\nApakah Anda yakin ingin menghapus akun pengguna "${user.name}"? Tindakan ini tidak dapat dibatalkan.`)) {
      return
    }

    try {
      setIsLoading(true)
      await deleteUserAction(user.id)
      toast.success('Akun pengguna berhasil dihapus')
      router.refresh()
    } catch {
      toast.error('Gagal menghapus akun pengguna')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="flex items-center gap-1.5 flex-wrap self-end md:self-center">
        {/* Login as Customer Button */}
        {!isSelf && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleLoginAsCustomer}
            disabled={isLoading}
            className="h-8 text-xs text-blue-600 border-blue-200 hover:bg-blue-50"
            title={`Login langsung sebagai ${user.name}`}
          >
            <LogIn className="w-3.5 h-3.5 mr-1" /> Login Akun
          </Button>
        )}

        {/* Edit User Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsEditOpen(true)}
          disabled={isLoading}
          className="h-8 text-xs"
          title="Edit nama / email"
        >
          <Edit className="w-3.5 h-3.5 mr-1" /> Edit
        </Button>

        {/* Reset Password Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsResetOpen(true)}
          disabled={isLoading}
          className="h-8 text-xs"
          title="Reset Password"
        >
          <KeyRound className="w-3.5 h-3.5 mr-1" /> Password
        </Button>

        {/* Delete User Button (with Guard check) */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleDeleteUser}
          disabled={isLoading || isSelf}
          className={`h-8 w-8 ${
            hasInvitations
              ? 'text-gray-300 hover:text-gray-400 cursor-not-allowed'
              : 'text-red-500 hover:text-red-700 hover:bg-red-50'
          }`}
          title={
            hasInvitations
              ? `Tidak dapat dihapus (${user.invitationsCount} undangan aktif)`
              : 'Hapus Akun Pengguna'
          }
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {/* ─── Dialog Edit Pengguna ─── */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Data Pengguna</DialogTitle>
            <DialogDescription>
              Ubah nama tampilan atau alamat email akun customer ini.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditSubmit} className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Nama Lengkap</Label>
              <Input
                id="edit-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama Pengguna"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-email">Alamat Email</Label>
              <Input
                id="edit-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                required
              />
            </div>
            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={() => setIsEditOpen(false)}>
                Batal
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-1.5" /> : <Check className="w-4 h-4 mr-1.5" />}
                Simpan Perubahan
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* ─── Dialog Reset Password ─── */}
      <Dialog open={isResetOpen} onOpenChange={setIsResetOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Reset Kata Sandi</DialogTitle>
            <DialogDescription>
              Masukkan kata sandi baru untuk akun <strong>{user.name}</strong> ({user.email}).
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleResetSubmit} className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="new-password">Kata Sandi Baru</Label>
              <Input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Minimal 8 karakter"
                required
                minLength={8}
              />
            </div>
            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={() => setIsResetOpen(false)}>
                Batal
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin mr-1.5" /> : <KeyRound className="w-4 h-4 mr-1.5" />}
                Setel Password Baru
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
