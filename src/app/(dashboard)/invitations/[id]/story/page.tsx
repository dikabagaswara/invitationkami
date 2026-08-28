import { requireInvitationOwnership, requireAuth } from '@/lib/authorization'
import { getInvitationById } from '@/modules/invitation/services/invitation.service'
import StoryManager from './StoryManager'

export default async function StoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const user = await requireAuth();
  if (!user.id) throw new Error("No user");
  await requireInvitationOwnership(id, user.id);
  
  const invitation = await getInvitationById(id, user.id)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Cerita Cinta</h1>
        <p className="text-muted-foreground mt-1">Bagikan perjalanan kisah cinta Anda kepada tamu undangan.</p>
      </div>
      <StoryManager invitationId={id} initialStories={invitation.loveStory} />
    </div>
  )
}