import { requireInvitationOwnership, requireAuth } from '@/lib/authorization'
import { getInvitationById } from '@/modules/invitation/services/invitation.service'
import SettingsManager from './SettingsManager'

export default async function SettingsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const user = await requireAuth();
  if (!user.id) throw new Error("No user");
  await requireInvitationOwnership(id, user.id);
  
  const invitation = await getInvitationById(id, user.id)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Pengaturan Undangan</h1>
        <p className="text-muted-foreground mt-1">Atur tautan, status publikasi, atau hapus undangan Anda.</p>
      </div>
      <SettingsManager 
        invitationId={id} 
        initialSlug={invitation.slug} 
        initialIsPublished={invitation.isPublished} 
      />
    </div>
  )
}