import { LoginForm } from '@/components/auth/login-form'
import { appConfig } from '@/lib/config'
import Link from 'next/link'

export const metadata = {
  title: `Login  ${process.env.APP_NAME ?? 'InvitationKami'}`,
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 flex flex-col items-center">
          <Link href="/" className="mb-4 inline-block hover:scale-105 transition-transform">
            <img src="/images/logo.png" alt="InvitationKami Logo" className="h-16 w-auto object-contain mx-auto" />
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{appConfig.name}</h1>
          <p className="text-gray-600 mt-1 text-sm">{appConfig.tagline}</p>
          <p className="text-[11px] text-muted-foreground font-sans mt-1">Copyright © 2026 InvitationKami</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
