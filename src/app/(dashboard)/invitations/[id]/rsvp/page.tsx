import { requireInvitationOwnership, requireAuth } from '@/lib/authorization'

export default async function RsvpPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const user = await requireAuth();
  if (!user.id) throw new Error("No user");
  await requireInvitationOwnership(id, user.id);
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight capitalize">rsvp</h1>
      <p>Manager for rsvp goes here.</p>
    </div>
  )
}