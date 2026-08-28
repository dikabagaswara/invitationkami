import { requireAdmin } from '@/lib/authorization'
import Link from 'next/link'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin()
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r bg-muted/40 p-4 space-y-4">
        <h2 className="font-bold mb-6">Super Admin</h2>
        <nav className="flex flex-col gap-2">
          <Link href="/admin" className="hover:underline">Overview</Link>
          <Link href="/admin/users" className="hover:underline">Users</Link>
          <Link href="/admin/invitations" className="hover:underline">Invitations</Link>
          <Link href="/admin/themes" className="hover:underline">Themes</Link>
          <Link href="/admin/music" className="hover:underline">Music Library</Link>
          <Link href="/admin/settings" className="hover:underline">System Settings</Link>
        </nav>
      </aside>
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  )
}