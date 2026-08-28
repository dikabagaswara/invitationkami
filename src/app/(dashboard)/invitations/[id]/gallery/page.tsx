import { requireInvitationOwnership, requireAuth } from '@/lib/authorization'
import { getInvitationById } from '@/modules/invitation/services/invitation.service'
import GalleryManager from './GalleryManager'

export default async function GalleryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const user = await requireAuth();
  if (!user.id) throw new Error("No user");
  await requireInvitationOwnership(id, user.id);
  
  const invitation = await getInvitationById(id, user.id)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Galeri Foto</h1>
        <p className="text-muted-foreground mt-1">Kelola foto-foto pre-wedding atau momen kebersamaan Anda.</p>
      </div>
      <GalleryManager invitationId={id} initialPhotos={invitation.gallery} />
    </div>
  )
}