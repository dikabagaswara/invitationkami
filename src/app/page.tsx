import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { appConfig } from '@/lib/config'

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50/50 px-4">
      <div className="text-center max-w-2xl bg-white p-10 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center">
        <div className="mb-6 p-2 rounded-2xl inline-block">
          <img src="/images/logo.png" alt="InvitationKami Logo" className="h-24 w-auto object-contain mx-auto" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">{appConfig.name}</h1>
        <p className="text-base text-gray-600 mb-2">{appConfig.tagline}</p>
        <p className="text-xs text-muted-foreground font-sans mb-8">Copyright © 2026 InvitationKami</p>
        
        <div className="flex justify-center w-full max-w-xs">
          <Link href="/login" className="w-full">
            <Button size="lg" className="w-full">Masuk ke Dashboard</Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
