import Link from 'next/link'
import { requireAuth } from '@/lib/authorization'
import { getInvitationById } from '@/modules/invitation/services/invitation.service'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import SidebarNav from './SidebarNav'

export default async function InvitationEditorLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ id: string }>
}) {
  const user = await requireAuth()
  const resolvedParams = await params
  const invitation = await getInvitationById(resolvedParams.id, user.id)

  return (
    <div className="flex h-screen overflow-hidden flex-col bg-gray-50/50">
      {/* Top Navigation Bar */}
      <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-white px-6">
        <div className="flex flex-1 items-center gap-4">
          <Link
            href="/dashboard"
            className={cn(buttonVariants({ variant: 'ghost', size: 'icon' }))}
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Kembali</span>
          </Link>
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold leading-none tracking-tight">
              {invitation.groomName && invitation.brideName ? `${invitation.groomName} & ${invitation.brideName}` : 'Editor Undangan'}
            </h1>
            <p className="text-sm text-muted-foreground mt-1">/{invitation.slug}</p>
          </div>
          {invitation.isPublished ? (
            <Badge variant="default" className="ml-2 bg-green-500 hover:bg-green-600">Published</Badge>
          ) : (
            <Badge variant="secondary" className="ml-2">Draft</Badge>
          )}
        </div>
        <div className="flex items-center gap-4">
          <Link
            href={`/i/${invitation.slug}`}
            target="_blank"
            className={cn(buttonVariants({ variant: 'outline' }))}
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Preview Live
          </Link>
        </div>
      </header>

      {/* Main Content Area with Sidebar */}
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 flex-shrink-0 border-r bg-white flex flex-col">
          <SidebarNav invitationId={resolvedParams.id} />
        </aside>
        <main className="flex-1 overflow-y-auto p-8">
          <div className="mx-auto max-w-4xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
