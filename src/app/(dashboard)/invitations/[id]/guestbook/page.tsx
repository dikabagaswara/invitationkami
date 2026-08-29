import { requireInvitationOwnership, requireAuth } from '@/lib/authorization'
import { prisma } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { GuestbookClient } from './GuestbookClient'

export default async function GuestbookPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const user = await requireAuth();
  if (!user.id) throw new Error("No user");
  await requireInvitationOwnership(id, user.id);

  const messages = await prisma.guestMessage.findMany({
    where: { invitationId: id },
    orderBy: { createdAt: 'desc' }
  });

  async function updateStatus(messageId: string, status: 'PENDING' | 'APPROVED' | 'REJECTED') {
    'use server'
    const currentUser = await requireAuth();
    if (!currentUser.id) throw new Error("No user");
    await requireInvitationOwnership(id, currentUser.id);

    await prisma.guestMessage.update({
      where: { id: messageId },
      data: { status }
    });
    revalidatePath(`/invitations/${id}/guestbook`);
  }

  async function deleteMessage(messageId: string) {
    'use server'
    const currentUser = await requireAuth();
    if (!currentUser.id) throw new Error("No user");
    await requireInvitationOwnership(id, currentUser.id);

    await prisma.guestMessage.delete({
      where: { id: messageId }
    });
    revalidatePath(`/invitations/${id}/guestbook`);
  }

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Moderasi Ucapan &amp; Doa</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Kelola pesan ucapan dan doa yang masuk dari tamu undangan. Tampilkan atau tolak pesan yang pantas.
        </p>
      </div>

      <GuestbookClient
        messages={messages.map((m) => ({
          id: m.id,
          name: m.name,
          message: m.message,
          status: m.status as 'PENDING' | 'APPROVED' | 'REJECTED',
          createdAt: m.createdAt,
        }))}
        updateStatusAction={updateStatus}
        deleteMessageAction={deleteMessage}
      />
    </div>
  )
}