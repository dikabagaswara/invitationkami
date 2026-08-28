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
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{appConfig.name}</h1>
          <p className="text-gray-600 mt-2">{appConfig.tagline}</p>
        </div>
        <LoginForm />
        <p className="text-center mt-4 text-sm text-gray-600">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-blue-600 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}
