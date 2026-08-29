import { auth } from '@/lib/auth'
import { ShareGeneratorClient } from './ShareGeneratorClient'

export const metadata = {
  title: 'Generator Link & Bagi Undangan WhatsApp',
  description: 'Konversi nama tamu menjadi link undangan khusus dan format pesan WhatsApp siap kirim secara massal.',
}

export default async function PublicShareGeneratorPage() {
  const session = await auth()
  const user = session?.user
  const baseUrl = process.env.APP_URL || 'http://localhost:3000'

  return (
    <ShareGeneratorClient
      baseUrl={baseUrl}
      isLoggedIn={!!user}
    />
  )
}
