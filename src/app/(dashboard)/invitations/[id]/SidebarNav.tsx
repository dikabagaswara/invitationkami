/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export default function SidebarNav({
  items
}: {
  items: { name: string; href: string; icon: any }[]
}) {
  const pathname = usePathname()

  return (
    <nav className="flex-1 overflow-y-auto p-4 space-y-1">
      {items.map((item) => {
        const isActive = pathname === item.href
        const Icon = item.icon
        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
              isActive 
                ? "bg-primary text-primary-foreground font-medium" 
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <Icon className="h-4 w-4" />
            {item.name}
          </Link>
        )
      })}
    </nav>
  )
}
