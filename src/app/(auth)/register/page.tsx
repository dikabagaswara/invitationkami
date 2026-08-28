import { RegisterForm } from '@/components/auth/register-form'
import { appConfig } from '@/lib/config'
import Link from 'next/link'

export const metadata = {
  title: `Register  ${process.env.APP_NAME ?? 'InvitationKami'}`,
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8 flex flex-col items-center">
          <Link href="/" className="mb-4 inline-block hover:scale-105 transition-transform">
            <img src="/images/logo.svg" alt="InvitationKami Logo" className="h-14 w-14 object-contain mx-auto" />
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">{appConfig.name}</h1>
          <p className="text-gray-600 mt-1 text-sm">{appConfig.tagline}</p>
        </div>
        <RegisterForm />
        <p className="text-center mt-4 text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}
