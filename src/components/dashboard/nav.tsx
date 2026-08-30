'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { signOut } from 'next-auth/react'
import { appConfig } from '@/lib/config'

interface NavUser {
  name?: string | null
  email?: string | null
  role?: string | null
}

export function DashboardNav({ user }: { user: NavUser }) {
  const pathname = usePathname()

  const navItems = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/invitations', label: 'Invitations' },
    { href: '/share-generator', label: 'Convert & Bagi Tamu' },
    { href: '/settings', label: 'Settings' },
  ]

  const adminNavItems = [
    { href: '/admin/users', label: 'User & Agent (CRUD)' },
    { href: '/admin/invitations', label: 'Semua Undangan' },
    { href: '/share-generator', label: 'Convert & Bagi Tamu' },
    { href: '/admin/themes', label: 'Master Tema' },
    { href: '/admin/music', label: 'Master Musik' },
  ]

  async function handleLogout() {
    // redirect: false prevents NextAuth server from issuing a 302 to AUTH_URL (localhost:3000)
    await signOut({ redirect: false })
    // Hard navigate with active browser origin (e.g. Cloudflare tunnel URL)
    window.location.href = '/login'
  }

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-200 flex flex-col">
      <div className="p-5 border-b flex items-center gap-3">
        <img src="/images/logo.png" alt="Logo" className="h-9 w-auto object-contain" />
        <div>
          <h2 className="font-bold text-base tracking-tight leading-tight">{appConfig.name}</h2>
          <p className="text-[10px] text-muted-foreground font-sans">Copyright © 2026 InvitationKami</p>
        </div>
      </div>
      <nav className="flex-1 p-4 space-y-4 overflow-y-auto">
        <div className="space-y-1">
          <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1">
            Menu Utama
          </p>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'block px-3 py-2 rounded-md text-sm font-medium transition-colors',
                pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))
                  ? 'bg-gray-100 text-gray-900 font-semibold'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900',
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {user.role === 'SUPER_ADMIN' && (
          <div className="space-y-1 pt-2 border-t">
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-amber-700 mb-1">
              Super Admin Panel
            </p>
            {adminNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'block px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  pathname.startsWith(item.href)
                    ? 'bg-amber-50 text-amber-950 font-semibold border border-amber-200'
                    : 'text-amber-800 hover:bg-amber-50/50',
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
      <div className="p-4 border-t">
        <p className="text-sm text-gray-700 truncate mb-2">{user.email}</p>
        <button
          onClick={handleLogout}
          className="text-sm text-red-600 hover:underline w-full text-left font-medium"
        >
          Logout
        </button>
      </div>
    </aside>
  )
}
