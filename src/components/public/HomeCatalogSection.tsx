'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'

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
    <div className="space-y-12">
      {/* Minimalist Filter Tabs */}
      <div className="flex items-center justify-center gap-1 sm:gap-2 border-b border-stone-200 pb-4 max-w-xl mx-auto flex-wrap">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.id
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-1.5 text-xs sm:text-sm transition-all cursor-pointer rounded-full ${
                isActive
                  ? 'bg-stone-900 text-white font-medium shadow-xs'
                  : 'text-stone-500 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              {cat.label}
            </button>
          )
        })}
      </div>

      {/* Elegant Design Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="group bg-white rounded-xl border border-stone-200/80 overflow-hidden hover:border-stone-400/80 transition-all duration-300 flex flex-col"
          >
            {/* Image Preview Container */}
            <div className="relative aspect-[3/4] overflow-hidden bg-stone-100">
              <img
                src={item.coverImage}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] tracking-[0.2em] uppercase text-stone-300 font-light block mb-1">
                  Tema {item.category}
                </span>
                <h3 className="text-lg font-serif font-normal tracking-wide">{item.name}</h3>
              </div>
            </div>

            {/* Info & Action */}
            <div className="p-5 flex items-center justify-between gap-4 border-t border-stone-100 bg-white">
              <p className="text-xs text-stone-500 line-clamp-1">
                {item.tagline}
              </p>
              <Link
                href={`/i/${item.demoSlug}`}
                target="_blank"
                className="shrink-0 inline-flex items-center gap-1.5 text-xs font-medium text-stone-900 hover:text-stone-600 transition-colors"
              >
                Preview <ExternalLink className="h-3 w-3" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* View All */}
      {activeCategory !== 'all' && (
        <div className="text-center pt-2">
          <button
            onClick={() => setActiveCategory('all')}
            className="text-xs tracking-wider uppercase text-stone-500 hover:text-stone-900 border-b border-stone-300 pb-0.5 transition-colors cursor-pointer"
          >
            Lihat Semua Desain ({items.length})
          </button>
        </div>
      )}
    </div>
  )
}

