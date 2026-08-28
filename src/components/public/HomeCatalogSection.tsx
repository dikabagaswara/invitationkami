'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ExternalLink, Sparkles } from 'lucide-react'

export interface CatalogItem {
  id: string
  name: string
  themeSlug: string
  category: string
  coverImage: string
  demoSlug: string
  tagline: string
  isPremium?: boolean
}

const CATEGORIES = [
  { id: 'all', label: 'Semua' },
  { id: 'minimalist', label: 'Minimalis' },
  { id: 'elegant', label: 'Elegant' },
  { id: 'floral', label: 'Floral' },
  { id: 'luxury', label: 'Luxury' },
  { id: 'modern', label: 'Modern' },
]

export function HomeCatalogSection({ items }: { items: CatalogItem[] }) {
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredItems = activeCategory === 'all'
    ? items
    : items.filter(
        (item) =>
          item.themeSlug.toLowerCase() === activeCategory.toLowerCase() ||
          item.category.toLowerCase() === activeCategory.toLowerCase()
      )

  return (
    <div className="space-y-10">
      {/* Category Filter Tabs */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={
                isActive
                  ? "px-5 py-2 rounded-full text-sm font-medium transition-all cursor-pointer bg-slate-900 text-white shadow-md"
                  : "px-5 py-2 rounded-full text-sm font-medium transition-all cursor-pointer bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:text-slate-900"
              }
            >
              {cat.label}
            </button>
          )
        })}
      </div>

      {/* Grid of Design Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="group bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Card Image Preview */}
              <div className="relative aspect-[3/4] overflow-hidden bg-slate-100">
                <img
                  src={item.coverImage}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                {item.isPremium && (
                  <div className="absolute top-4 left-4 bg-amber-400 text-amber-950 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm">
                    <Sparkles className="h-3 w-3" /> Premium
                  </div>
                )}

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[11px] font-medium uppercase tracking-widest text-amber-300/90 block mb-1">
                    Tema {item.category}
                  </span>
                  <h3 className="text-xl font-bold font-serif">{item.name}</h3>
                </div>
              </div>

              {/* Card Info */}
              <div className="p-5">
                <p className="text-xs text-slate-500 line-clamp-2">
                  {item.tagline}
                </p>
              </div>
            </div>

            {/* Card Action */}
            <div className="p-5 pt-0">
              <Link href={`/i/${item.demoSlug}`} target="_blank" className="block w-full">
                <Button
                  variant="outline"
                  className="w-full justify-center text-xs h-10 border-slate-300 hover:bg-slate-900 hover:text-white transition-colors"
                >
                  <ExternalLink className="mr-2 h-3.5 w-3.5" /> Preview Desain
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center pt-4">
        <Button
          variant="outline"
          onClick={() => setActiveCategory('all')}
          className="text-sm px-8 py-2.5 rounded-full border-slate-300 text-slate-800 hover:bg-slate-900 hover:text-white transition-all shadow-xs"
        >
          Lihat Semua Desain ({items.length})
        </Button>
      </div>
    </div>
  )
}
