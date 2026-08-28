import { requireAdmin } from '@/lib/authorization'
import { Card } from '@/components/ui/card'

export default async function AdminUsersPage() {
  await requireAdmin()
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight capitalize">users Management</h1>
      <Card className="p-6">
        <p className="text-muted-foreground">users manager goes here.</p>
      </Card>
    </div>
  )
}