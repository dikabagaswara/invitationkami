'use client'

import { useState } from 'react'
import { Download, FileSpreadsheet } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface GuestExportItem {
  id: string
  name: string
  phone: string | null
  rsvpStatus: string
  attendance: number
  rsvpAt: string | Date | null
  createdAt: string | Date
}

export function ExportGuestsButton({
  guests,
  weddingTitle,
}: {
  guests: GuestExportItem[]
  weddingTitle: string
}) {
  const [isExporting, setIsExporting] = useState(false)

  const exportToCSV = () => {
    setIsExporting(true)
    try {
      const headers = ['No', 'Nama Tamu', 'No. WhatsApp', 'Status RSVP', 'Jumlah Pax (Orang)', 'Waktu RSVP', 'Tanggal Ditambahkan']
      
      const rows = guests.map((g, idx) => {
        let rsvpText = 'Belum Konfirmasi'
        if (g.rsvpStatus === 'ATTENDING') rsvpText = 'Hadir'
        if (g.rsvpStatus === 'NOT_ATTENDING') rsvpText = 'Tidak Hadir'

        const rsvpTime = g.rsvpAt ? new Date(g.rsvpAt).toLocaleString('id-ID') : '-'
        const createdTime = new Date(g.createdAt).toLocaleString('id-ID')

        return [
          idx + 1,
          `"${(g.name || '').replace(/"/g, '""')}"`,
          `"${g.phone || '-'}"`,
          `"${rsvpText}"`,
          g.attendance,
          `"${rsvpTime}"`,
          `"${createdTime}"`
        ].join(',')
      })

      const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\r\n')
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const url = URL.createObjectURL(blob)
      
      const link = document.createElement('a')
      const safeTitle = weddingTitle.toLowerCase().replace(/[^a-z0-9]/g, '-')
      link.setAttribute('href', url)
      link.setAttribute('download', `rekap-tamu-${safeTitle}-${new Date().toISOString().slice(0, 10)}.csv`)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } finally {
      setIsExporting(false)
    }
  }

  if (guests.length === 0) return null

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={exportToCSV}
      disabled={isExporting}
      className="text-xs text-emerald-700 border-emerald-300 hover:bg-emerald-50 shadow-xs"
    >
      <FileSpreadsheet className="w-3.5 h-3.5 mr-1.5 text-emerald-600" />
      <span>{isExporting ? 'Mengekspor...' : 'Export Excel / CSV'}</span>
    </Button>
  )
}
