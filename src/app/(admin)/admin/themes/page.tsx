import { requireAdmin } from '@/lib/authorization'
import { Card } from '@/components/ui/card'

export default async function AdminThemesPage() {
  await requireAdmin()
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight capitalize">themes Management</h1>
      <Card className="p-6">
        <p className="text-muted-foreground">themes manager goes here.</p>
      </Card>
    </div>
  )
}