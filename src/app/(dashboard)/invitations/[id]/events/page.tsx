import { requireInvitationOwnership, requireAuth } from '@/lib/authorization'
import { getInvitationById } from '@/modules/invitation/services/invitation.service'
import EventsManager from './EventsManager'

export default async function EventsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const user = await requireAuth();
  if (!user.id) throw new Error("No user");
  await requireInvitationOwnership(id, user.id);
  
  const invitation = await getInvitationById(id, user.id)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Acara & Lokasi</h1>
        <p className="text-muted-foreground mt-1">Kelola daftar acara seperti Akad, Resepsi, dll.</p>
      </div>
      <EventsManager invitationId={id} initialEvents={invitation.events} />
    </div>
  )
}