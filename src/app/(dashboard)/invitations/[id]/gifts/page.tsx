import { requireInvitationOwnership, requireAuth } from '@/lib/authorization'
import { getInvitationById } from '@/modules/invitation/services/invitation.service'
import GiftsManager from './GiftsManager'

export default async function GiftsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const user = await requireAuth();
  if (!user.id) throw new Error("No user");
  await requireInvitationOwnership(id, user.id);
  
  const invitation = await getInvitationById(id, user.id)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Hadiah & Rekening</h1>
        <p className="text-muted-foreground mt-1">Kelola metode pemberian hadiah berupa rekening bank, e-wallet, atau alamat fisik.</p>
      </div>
      <GiftsManager invitationId={id} initialGifts={invitation.weddingGifts} />
    </div>
  )
}