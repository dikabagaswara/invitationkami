import { requireAdmin } from '@/lib/authorization'
import { Card } from '@/components/ui/card'

export default async function AdminSettingsPage() {
  await requireAdmin()
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight capitalize">settings Management</h1>
      <Card className="p-6">
        <p className="text-muted-foreground">settings manager goes here.</p>
      </Card>
    </div>
  )
}