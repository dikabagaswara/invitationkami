import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { requireAdmin } from '@/lib/authorization'
import { DashboardNav } from '@/components/dashboard/nav'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session?.user) redirect('/login')
  await requireAdmin()

  return (
    <div className="min-h-screen flex">
      <DashboardNav user={session.user as { name?: string | null; email?: string | null; role?: string | null }} />
      <main className="flex-1 p-6 bg-gray-50">
        {children}
      </main>
    </div>
  )
}