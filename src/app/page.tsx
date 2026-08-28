import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { appConfig } from '@/lib/config'

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">{appConfig.name}</h1>
        <p className="text-xl text-gray-600 mb-8">{appConfig.tagline}</p>
        <div className="flex gap-4 justify-center">
          <Link href="/register">
            <Button size="lg">Get Started</Button>
          </Link>
          <Link href="/login">
            <Button variant="outline" size="lg">Login</Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
