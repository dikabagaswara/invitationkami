'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { 
  Calendar, 
  Clock, 
  Search, 
  Users, 
  Sparkles, 
  ExternalLink, 
  Edit3, 
  Settings, 
  Filter,
  CheckCircle2,
  FileEdit,
  Timer,
  Share2
} from 'lucide-react'

export interface InvitationItemData {
  id: string
  slug: string
  groomName: string
  brideName: string
  isPublished: boolean
  createdAt: string | Date
  themeName: string
  eventsCount: number
  guestsCount: number
  primaryEventDate: string | null
  owner?: { name: string; email: string } | null
}

export function InvitationsListClient({
  invitations,
  isAdmin,
}: {
  invitations: InvitationItemData[]
  isAdmin: boolean
}) {
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'LIVE' | 'DRAFT'>('ALL')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredInvitations = useMemo(() => {
    return invitations.filter((inv) => {
      // Filter status
      if (filterStatus === 'LIVE' && !inv.isPublished) return false
      if (filterStatus === 'DRAFT' && inv.isPublished) return false

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        const matchCouple = `${inv.groomName} ${inv.brideName}`.toLowerCase().includes(q)
        const matchSlug = inv.slug.toLowerCase().includes(q)
        const matchTheme = inv.themeName.toLowerCase().includes(q)
        const matchOwner = inv.owner ? `${inv.owner.name} ${inv.owner.email}`.toLowerCase().includes(q) : false
        return matchCouple || matchSlug || matchTheme || matchOwner
      }

      return true
    })
  }, [invitations, filterStatus, searchQuery])

  // Stats
  const liveCount = invitations.filter((i) => i.isPublished).length
  const draftCount = invitations.filter((i) => !i.isPublished).length

  function getCountdownInfo(eventDateStr: string | null) {
    if (!eventDateStr) return { text: 'Belum diatur', isPast: false }

    const now = new Date()
    const target = new Date(eventDateStr)
    const diffMs = target.getTime() - now.getTime()
    const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24))

    if (diffDays > 0) {
      return { text: `${diffDays} hari lagi`, isPast: false, days: diffDays }
    } else if (diffDays === 0) {
      return { text: 'Hari ini!', isPast: false, days: 0 }
    } else {
      return { text: `Selesai (${Math.abs(diffDays)} hari lalu)`, isPast: true, days: diffDays }
    }
  }

  return (
    <div className="space-y-6">
      {/* ─── Top Filter Bar & Search ─── */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center bg-white p-4 rounded-xl border shadow-xs">
        {/* Tabs Status Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <Button
            size="sm"
            variant={filterStatus === 'ALL' ? 'default' : 'outline'}
            onClick={() => setFilterStatus('ALL')}
            className="text-xs shrink-0"
          >
            Semua ({invitations.length})
          </Button>
          <Button
            size="sm"
            variant={filterStatus === 'LIVE' ? 'default' : 'outline'}
            onClick={() => setFilterStatus('LIVE')}
            className={`text-xs shrink-0 ${filterStatus === 'LIVE' ? 'bg-green-600 hover:bg-green-700 text-white' : 'text-green-700 border-green-200 hover:bg-green-50'}`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
            Live / Published ({liveCount})
          </Button>
          <Button
            size="sm"
            variant={filterStatus === 'DRAFT' ? 'default' : 'outline'}
            onClick={() => setFilterStatus('DRAFT')}
            className={`text-xs shrink-0 ${filterStatus === 'DRAFT' ? 'bg-amber-600 hover:bg-amber-700 text-white' : 'text-amber-700 border-amber-200 hover:bg-amber-50'}`}
          >
            <FileEdit className="w-3.5 h-3.5 mr-1" />
            Draft ({draftCount})
          </Button>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-72 shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Cari nama, tema, slug..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 text-xs h-9"
          />
        </div>
      </div>

      {/* ─── Grid Cards ─── */}
      {filteredInvitations.length === 0 ? (
        <Card className="p-12 text-center bg-white">
          <Filter className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <h3 className="text-lg font-semibold mb-1">Tidak ada undangan ditemukan</h3>
          <p className="text-sm text-muted-foreground mb-4">
            {searchQuery ? 'Coba ubah kata kunci pencarian Anda.' : 'Belum ada undangan pada kategori filter ini.'}
          </p>
          {(filterStatus !== 'ALL' || searchQuery) && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setFilterStatus('ALL')
                setSearchQuery('')
              }}
            >
              Reset Filter
            </Button>
          )}
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredInvitations.map((inv) => {
            const countdown = getCountdownInfo(inv.primaryEventDate)
            const createdDateFormatted = new Date(inv.createdAt).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })
            const eventDateFormatted = inv.primaryEventDate
              ? new Date(inv.primaryEventDate).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })
              : null

            return (
              <Card
                key={inv.id}
                className="p-5 flex flex-col justify-between hover:shadow-lg transition-all duration-200 bg-white border border-gray-200/80 rounded-2xl relative overflow-hidden group"
              >
                <div>
                  {/* Top Badge Row */}
                  <div className="flex justify-between items-start mb-3 gap-2">
                    <span className="text-[11px] font-semibold px-2.5 py-1 bg-slate-100 rounded-lg text-slate-700 uppercase tracking-wider">
                      {inv.themeName}
                    </span>
                    <Badge
                      variant="secondary"
                      className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full ${
                        inv.isPublished
                          ? 'bg-green-100 text-green-800 hover:bg-green-100'
                          : 'bg-amber-100 text-amber-800 hover:bg-amber-100'
                      }`}
                    >
                      {inv.isPublished ? '● Live' : '○ Draft'}
                    </Badge>
                  </div>

                  {/* Couple Title */}
                  <h3 className="font-bold text-xl text-slate-900 group-hover:text-primary transition-colors">
                    {inv.groomName} &amp; {inv.brideName}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5 font-mono">/i/{inv.slug}</p>

                  {inv.owner && (
                    <p className="text-xs text-amber-800 bg-amber-50/70 border border-amber-200/50 rounded-md px-2 py-1 mt-2 font-medium">
                      👤 {inv.owner.name} ({inv.owner.email})
                    </p>
                  )}

                  {/* ─── Timeline & Event Countdown Information ─── */}
                  <div className="mt-4 pt-3 border-t border-gray-100 space-y-2 text-xs">
                    {/* Event Countdown */}
                    <div className="flex items-center justify-between py-1 px-2.5 rounded-lg bg-slate-50 border border-slate-100">
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <Timer className="w-3.5 h-3.5 text-primary shrink-0" />
                        <span>Acara:</span>
                      </div>
                      <span
                        className={`font-semibold ${
                          countdown.isPast
                            ? 'text-gray-500'
                            : countdown.text === 'Hari ini!'
                            ? 'text-green-600 font-bold'
                            : 'text-primary'
                        }`}
                      >
                        {eventDateFormatted ? `${eventDateFormatted} (${countdown.text})` : 'Belum diatur'}
                      </span>
                    </div>

                    {/* Creation Date */}
                    <div className="flex items-center justify-between text-muted-foreground px-1">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 shrink-0" />
                        <span>Dibuat:</span>
                      </div>
                      <span className="font-medium text-slate-700">{createdDateFormatted}</span>
                    </div>

                    {/* Stats Counter */}
                    <div className="flex items-center justify-between text-muted-foreground px-1 pt-1">
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 shrink-0" />
                        <span>Total Tamu:</span>
                      </div>
                      <span className="font-semibold text-slate-800">{inv.guestsCount} Tamu</span>
                    </div>
                  </div>
                </div>

                {/* ─── Action Buttons ─── */}
                <div className="mt-6 pt-4 border-t border-gray-100 flex flex-col gap-2">
                  <div className="flex gap-2">
                    <Link href={`/invitations/${inv.id}/couple`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full text-xs">
                        <Edit3 className="w-3.5 h-3.5 mr-1" /> Edit Data
                      </Button>
                    </Link>
                    <Link href={`/i/${inv.slug}`} target="_blank" className="flex-1">
                      <Button size="sm" className="w-full text-xs">
                        <ExternalLink className="w-3.5 h-3.5 mr-1" /> Preview
                      </Button>
                    </Link>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/share-generator`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full text-xs text-emerald-700 border-emerald-200 hover:bg-emerald-50">
                        <Share2 className="w-3.5 h-3.5 mr-1" /> Bagi Undangan
                      </Button>
                    </Link>
                    <Link href={`/invitations/${inv.id}/settings`} className="flex-1">
                      <Button variant="ghost" size="sm" className="w-full text-xs text-muted-foreground hover:text-foreground">
                        <Settings className="w-3.5 h-3.5 mr-1" /> Pengaturan
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
