export interface ThemeMeta {
  name: string
  category: string
  description?: string
}

export interface ThemeRegistryEntry {
  meta: ThemeMeta
}

// Registry maps theme slugs to metadata
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
  oceanic: {
    meta: { name: 'Oceanic', category: 'nature', description: 'Mediterranean blue glassmorphism' },
  },
  terracotta: {
    meta: { name: 'Terracotta', category: 'nature', description: 'Warm earth tones & arch frames' },
  },
  botanical: {
    meta: { name: 'Botanical', category: 'luxury', description: 'Emerald luxury editorial layout' },
  },
  celestial: {
    meta: { name: 'Celestial', category: 'luxury', description: 'Starry night & cosmic glow' },
  },
  rustic: {
    meta: { name: 'Rustic', category: 'nature', description: 'Warm paper & polaroid photos' },
  },
  vintage: {
    meta: { name: 'Vintage', category: 'classic', description: 'European vintage newspaper' },
  },
  blossom: {
    meta: { name: 'Blossom Animated', category: 'romantic', description: 'Swaying floral animations & falling petals' },
  },
  arcade: {
    meta: { name: '8-Bit Arcade Pixel', category: 'creative', description: 'Retro 8-bit game wedding adventure with pixel art UI, HP hearts, quest log, & coin counters' },
  },
  heritage: {
    meta: { name: 'Nusantara Heritage Royal', category: 'classic', description: 'Kemewahan adat Nusantara dengan ornamen Gunungan emas, aksen batik keraton, dan font klasik' },
  },
  gatsby: {
    meta: { name: 'Gatsby Art Deco', category: 'luxury', description: '1920s Art Deco glamour with geometric gold patterns & noir elegance' },
  },
}

export function isValidTheme(slug: string): boolean {
  return slug in themeRegistry
}
