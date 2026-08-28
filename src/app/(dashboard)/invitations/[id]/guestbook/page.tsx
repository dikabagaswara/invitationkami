import { requireInvitationOwnership, requireAuth } from '@/lib/authorization'
import { prisma } from '@/lib/db'
import { revalidatePath } from 'next/cache'

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
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Moderasi Ucapan & Doa</h1>
      <div className="space-y-4">
        {messages.length === 0 ? (
          <p>No messages yet.</p>
        ) : (
          messages.map(msg => (
            <div key={msg.id} className="p-4 border rounded shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div>
                <p className="font-semibold">{msg.name}</p>
                <p className="text-sm text-gray-600">{msg.message}</p>
                <p className="text-xs mt-1 text-gray-500">Status: <span className="font-bold">{msg.status}</span></p>
              </div>
              <div className="flex space-x-2 mt-4 sm:mt-0">
                {msg.status !== 'APPROVED' && (
                  <form action={updateStatus.bind(null, msg.id, 'APPROVED')}>
                    <button type="submit" className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600">Approve</button>
                  </form>
                )}
                {msg.status !== 'REJECTED' && (
                  <form action={updateStatus.bind(null, msg.id, 'REJECTED')}>
                    <button type="submit" className="px-3 py-1 bg-yellow-500 text-white rounded text-sm hover:bg-yellow-600">Reject</button>
                  </form>
                )}
                <form action={deleteMessage.bind(null, msg.id)}>
                  <button type="submit" className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600">Delete</button>
                </form>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}