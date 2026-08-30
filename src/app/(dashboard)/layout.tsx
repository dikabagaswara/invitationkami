import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { DashboardNav } from '@/components/dashboard/nav'
import { FloatingWhatsAppWidget } from '@/components/shared/FloatingWhatsAppWidget'

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  if (!session?.user) redirect('/login')

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-stone-50">
      <DashboardNav user={session.user as { name?: string | null; email?: string | null; role?: string | null }} />
      <main className="flex-1 p-4 sm:p-6 md:p-8 pt-18 md:pt-8 w-full overflow-x-hidden">
        {children}
      </main>
      <FloatingWhatsAppWidget defaultMessage="Halo Admin InvitationKami, saya sedang di dashboard dan butuh bantuan terkait undangan saya." />
    </div>
  )
}
