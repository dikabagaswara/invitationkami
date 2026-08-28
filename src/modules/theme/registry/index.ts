export interface ThemeMeta {
  name: string
  category: string
  description?: string
}

export interface ThemeRegistryEntry {
  meta: ThemeMeta
}

// Registry maps theme slugs to metadata
// Components will be loaded dynamically via next/dynamic
export const themeRegistry: Record<string, ThemeRegistryEntry> = {
  elegant: {
    meta: { name: 'Elegant', category: 'classic', description: 'Timeless elegance' },
  },
  modern: {
    meta: { name: 'Modern', category: 'modern', description: 'Clean minimal design' },
  },
  floral: {
    meta: { name: 'Floral', category: 'romantic', description: 'Romantic botanical' },
  },
  luxury: {
    meta: { name: 'Luxury', category: 'luxury', description: 'Opulent premium design' },
  },
  minimalist: {
    meta: { name: 'Minimalist', category: 'minimal', description: 'Pure typography-driven' },
  },
}

export function isValidTheme(slug: string): boolean {
  return slug in themeRegistry
}
