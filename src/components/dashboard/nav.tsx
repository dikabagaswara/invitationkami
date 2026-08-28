'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { signOut } from 'next-auth/react'
import { appConfig } from '@/lib/config'

interface NavUser {
  name?: string | null
  email?: string | null
}

const navItems = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/invitations', label: 'Invitations' },
  { href: '/settings', label: 'Settings' },
]

export function DashboardNav({ user }: { user: NavUser }) {
  const pathname = usePathname()

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b">
        <h2 className="font-bold text-lg">{appConfig.name}</h2>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'block px-3 py-2 rounded-md text-sm font-medium transition-colors',
              pathname === item.href || pathname.startsWith(item.href + '/')
                ? 'bg-gray-100 text-gray-900'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t">
        <p className="text-sm text-gray-700 truncate mb-2">{user.email}</p>
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="text-sm text-red-600 hover:underline w-full text-left"
        >
          Logout
        </button>
      </div>
    </aside>
  )
}
