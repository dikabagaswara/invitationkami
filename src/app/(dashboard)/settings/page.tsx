import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

export const metadata = { title: 'Settings' }

export default async function SettingsPage() {
  const session = await auth()
  if (!session?.user) redirect('/login')

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Account Settings</h1>
      <p className="text-gray-500">Settings will be available here.</p>
    </div>
  )
}
