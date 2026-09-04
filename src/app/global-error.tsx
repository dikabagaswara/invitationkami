'use client'

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html><body>
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui', background: '#FAF8F5' }}>
        <div style={{ textAlign: 'center', maxWidth: 400 }}>
          <p style={{ fontSize: 48 }}>💐</p>
          <h2 style={{ fontSize: 24, color: '#1c1917' }}>Terjadi Kesalahan</h2>
          <p style={{ fontSize: 14, color: '#78716c', marginTop: 8 }}>Maaf, halaman tidak dapat dimuat.</p>
          <button onClick={reset} style={{ marginTop: 16, padding: '10px 24px', background: '#1c1917', color: 'white', border: 'none', borderRadius: 999, cursor: 'pointer', fontSize: 14 }}>Muat Ulang</button>
        </div>
      </div>
    </body></html>
  )
}
