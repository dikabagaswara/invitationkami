import { requireInvitationOwnership, requireAuth } from '@/lib/authorization'
import { getInvitationById } from '@/modules/invitation/services/invitation.service'
import { prisma } from '@/lib/db'
import ThemeManager from './ThemeManager'

export default async function ThemePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const user = await requireAuth();
  if (!user.id) throw new Error("No user");
  await requireInvitationOwnership(id, user.id);
  
  const invitation = await getInvitationById(id, user.id)
  const themes = await prisma.theme.findMany({ where: { isActive: true } })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Tema & Tampilan</h1>
        <p className="text-muted-foreground mt-1">Pilih desain dan atur bagian-bagian yang ingin ditampilkan pada undangan.</p>
      </div>
      <ThemeManager 
        invitationId={id} 
        currentThemeId={invitation.themeId}
        currentColor={invitation.colorPreset}
        currentFont={invitation.fontPreset}
        currentSectionConfig={invitation.sectionConfig as Record<string, boolean>}
        themes={themes}
      />
    </div>
  )
}