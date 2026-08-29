import { requireAdmin } from '@/lib/authorization'
import { prisma } from '@/lib/db'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { revalidatePath } from 'next/cache'
import bcrypt from 'bcryptjs'
import { Users, UserPlus, Trash2, Shield, KeyRound, Mail, Calendar } from 'lucide-react'
import { AdminDeleteUserButton, AdminResetPasswordForm } from './AdminUserActionButtons'

export default async function AdminUsersPage() {
  await requireAdmin()

  const users = await prisma.user.findMany({
    include: {
      _count: {
        select: { invitations: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  })

  async function createUser(formData: FormData) {
    'use server'
    await requireAdmin()

    const name = formData.get('name') as string
    const email = (formData.get('email') as string).toLowerCase().trim()
    const password = formData.get('password') as string
    const role = (formData.get('role') as string) || 'CUSTOMER'

    if (!email || !name || !password) return

    const passwordHash = await bcrypt.hash(password, 12)

    await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        role: role === 'SUPER_ADMIN' ? 'SUPER_ADMIN' : 'CUSTOMER',
      },
    })

    revalidatePath('/admin/users')
  }

  async function deleteUser(targetUserId: string) {
    'use server'
    const admin = await requireAdmin()
    if (admin.id === targetUserId) {
      throw new Error('Tidak dapat menghapus akun admin yang sedang login')
    }

    await prisma.user.delete({
      where: { id: targetUserId },
    })

    revalidatePath('/admin/users')
  }

  async function resetPassword(formData: FormData) {
    'use server'
    await requireAdmin()

    const targetUserId = formData.get('userId') as string
    const newPassword = formData.get('newPassword') as string

    if (!targetUserId || !newPassword) return

    const passwordHash = await bcrypt.hash(newPassword, 12)

    await prisma.user.update({
      where: { id: targetUserId },
      data: { passwordHash },
    })

    revalidatePath('/admin/users')
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Manajemen Pengguna (Agent & Customer)</h1>
        <p className="text-muted-foreground mt-1">
          Hanya Super Admin yang dapat membuat, mengelola, dan menghapus akun pengguna/agent.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Total Akun</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Pengguna Terdaftar</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-blue-600">Total Undangan</CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {users.reduce((acc, u) => acc + u._count.invitations, 0)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Dikelola Semua User</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium text-amber-600">Super Admin</CardTitle>
            <Shield className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">
              {users.filter((u) => u.role === 'SUPER_ADMIN').length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Hak Akses Penuh</p>
          </CardContent>
        </Card>
      </div>

      {/* Create User Form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <UserPlus className="h-4 w-4" /> Buat Akun Pengguna / Agent Baru
          </CardTitle>
          <CardDescription>
            Pendaftaran publik telah dinonaktifkan. Anda dapat membuatkan akun untuk agent atau customer di sini.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={createUser} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div className="space-y-2">
              <Label htmlFor="name">Nama Lengkap</Label>
              <Input id="name" name="name" required placeholder="Contoh: Agent Jakarta 1" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required placeholder="agent@invitationkami.com" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" name="password" type="password" required placeholder="Minimal 8 karakter" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role / Akses</Label>
              <select
                id="role"
                name="role"
                className="w-full h-9 px-3 rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                defaultValue="CUSTOMER"
              >
                <option value="CUSTOMER">Customer / Agent</option>
                <option value="SUPER_ADMIN">Super Admin</option>
              </select>
            </div>

            <div className="md:col-span-4 flex justify-end">
              <Button type="submit">
                <UserPlus className="mr-2 h-4 w-4" /> Daftarkan Pengguna
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Users List */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Daftar Pengguna</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="divide-y border rounded-md overflow-hidden">
            {users.map((u) => (
              <div
                key={u.id}
                className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:bg-gray-50/50"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{u.name}</span>
                    {u.role === 'SUPER_ADMIN' ? (
                      <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Super Admin</Badge>
                    ) : (
                      <Badge variant="secondary">Customer / Agent</Badge>
                    )}
                    <Badge variant="outline" className="text-xs">
                      {u._count.invitations} Undangan
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
                    <Mail className="h-3 w-3" />
                    <span>{u.email}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end md:self-center">
                  {/* Reset Password Form */}
                  <AdminResetPasswordForm
                    userId={u.id}
                    userName={u.name}
                    resetAction={resetPassword}
                  />

                  {/* Delete User */}
                  <AdminDeleteUserButton
                    userId={u.id}
                    userName={u.name}
                    deleteAction={deleteUser}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}