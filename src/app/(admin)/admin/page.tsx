import { requireAdmin } from '@/lib/authorization'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default async function AdminOverviewPage() {
  await requireAdmin()
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Platform Overview</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card><CardHeader><CardTitle className="text-sm font-medium">Total Users</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">0</div></CardContent></Card>
        <Card><CardHeader><CardTitle className="text-sm font-medium">Total Invitations</CardTitle></CardHeader><CardContent><div className="text-2xl font-bold">0</div></CardContent></Card>
      </div>
    </div>
  )
}