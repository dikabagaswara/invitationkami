import { requireInvitationOwnership, requireAuth } from '@/lib/authorization'
import { getInvitationById } from '@/modules/invitation/services/invitation.service'
import CoupleForm from './CoupleForm'

export default async function CouplePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const user = await requireAuth();
  if (!user.id) throw new Error("No user");
  await requireInvitationOwnership(id, user.id);
  
  const invitation = await getInvitationById(id, user.id)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Data Mempelai & Opening</h1>
        <p className="text-muted-foreground mt-1">Lengkapi data profil mempelai dan kata pengantar undangan.</p>
      </div>
      <CoupleForm invitationId={id} defaultValues={invitation} />
    </div>
  )
}