'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { signOut } from 'next-auth/react'
import { appConfig } from '@/lib/config'
import { 
  LayoutDashboard, 
  Mail, 
  Share2, 
  Settings, 
  Users, 
  Palette, 
  Music, 
  LogOut, 
  Menu, 
  X, 
  ShieldCheck 
} from 'lucide-react'

interface NavUser {
  name?: string | null
  email?: string | null
  role?: string | null
}

export function DashboardNav({ user }: { user: NavUser }) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/invitations', label: 'Invitations', icon: Mail },
    { href: '/share-generator', label: 'Convert & Bagi Tamu', icon: Share2 },
    { href: '/settings', label: 'Settings', icon: Settings },
  ]

  const adminNavItems = [
    { href: '/admin/users', label: 'User & Agent (CRUD)', icon: Users },
    { href: '/admin/invitations', label: 'Semua Undangan', icon: Mail },
    { href: '/share-generator', label: 'Convert & Bagi Tamu', icon: Share2 },
    { href: '/admin/themes', label: 'Master Tema', icon: Palette },
    { href: '/admin/music', label: 'Master Musik', icon: Music },
  ]

  async function handleLogout() {
    await signOut({ redirect: false })
    window.location.href = '/login'
  }

  const NavContent = () => (
    <div className="flex flex-col h-full bg-white">
      {/* Brand Header */}
      <div className="p-4 sm:p-5 border-b flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
          <img src="/images/logo.png" alt="Logo" className="h-8 sm:h-9 w-auto object-contain" />
          <div>
            <h2 className="font-bold text-sm sm:text-base tracking-tight leading-tight text-stone-900">{appConfig.name}</h2>
            <p className="text-[10px] text-muted-foreground font-sans">Panel Dashboard</p>
          </div>
        </Link>
        {/* Mobile Close Button */}
        <button 
          onClick={() => setMobileOpen(false)}
          className="md:hidden p-2 rounded-lg text-stone-500 hover:bg-stone-100 hover:text-stone-900 transition-colors"
          aria-label="Tutup Menu"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-3 sm:p-4 space-y-4 overflow-y-auto">
        <div className="space-y-1">
          <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
            Menu Utama
          </p>
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-stone-900 text-white font-semibold shadow-xs'
                    : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900',
                )}
              >
                <Icon className={cn('w-4 h-4', isActive ? 'text-white' : 'text-stone-500')} />
                {item.label}
              </Link>
            )
          })}
        </div>

        {user.role === 'SUPER_ADMIN' && (
          <div className="space-y-1 pt-3 border-t">
            <div className="px-3 flex items-center gap-1.5 text-amber-700 mb-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <p className="text-[10px] font-bold uppercase tracking-wider">
                Super Admin Panel
              </p>
            </div>
            {adminNavItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-amber-500 text-white font-semibold shadow-xs'
                      : 'text-amber-900 hover:bg-amber-50/70',
                  )}
                >
                  <Icon className={cn('w-4 h-4', isActive ? 'text-white' : 'text-amber-600')} />
                  {item.label}
                </Link>
              )
            })}
          </div>
        )}
      </nav>

      {/* User Info & Logout Footer */}
      <div className="p-4 border-t bg-stone-50/80">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-stone-200 text-stone-700 font-bold flex items-center justify-center text-xs">
            {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div className="overflow-hidden">
            <p className="text-xs font-semibold text-stone-900 truncate">{user.name || 'User'}</p>
            <p className="text-[11px] text-stone-500 truncate">{user.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 w-full px-3 py-2 rounded-lg text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 transition-colors border border-red-200/60"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Keluar (Logout)</span>
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* ─── MOBILE TOP BAR (Visible on screens < md) ─── */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-white border-b border-stone-200 z-40 px-4 flex items-center justify-between shadow-2xs">
        <Link href="/dashboard" className="flex items-center gap-2">
          <img src="/images/logo.png" alt="Logo" className="h-7 w-auto object-contain" />
          <span className="font-bold text-sm text-stone-900">{appConfig.name}</span>
        </Link>
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 rounded-lg text-stone-700 hover:bg-stone-100 transition-colors"
          aria-label="Buka Menu"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* ─── MOBILE DRAWER OVERLAY ─── */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity" 
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative w-4/5 max-w-xs h-full z-10 animate-in slide-in-from-left duration-200 shadow-2xl">
            <NavContent />
          </div>
        </div>
      )}

      {/* ─── DESKTOP SIDEBAR (Visible on md and up) ─── */}
      <aside className="hidden md:flex w-64 min-h-screen border-r border-stone-200 flex-col sticky top-0 h-screen">
        <NavContent />
      </aside>
    </>
  )
}
