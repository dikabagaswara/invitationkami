'use client'

import { useState, useRef } from 'react'
import { Upload, X, Loader2, Image as ImageIcon, Check } from 'lucide-react'
import { toast } from 'sonner'

interface ImageUploadProps {
  id?: string
  name: string
  defaultValue?: string | null
  label?: string
  aspectRatioHint?: string
  description?: string
  className?: string
}

export function ImageUpload({
  id,
  name,
  defaultValue = '',
  label,
  aspectRatioHint,
  description,
  className = '',
}: ImageUploadProps) {
  const [imageUrl, setImageUrl] = useState<string>(defaultValue || '')
  const [isUploading, setIsUploading] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const handleFileChange = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('File harus berupa gambar (JPG, PNG, WEBP)')
      return
    }

    // Limit 10MB
    if (file.size > 10 * 1024 * 1024) {
      toast.error('Ukuran gambar maksimal 10MB')
      return
    }

    setIsUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/api/v1/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.error || 'Gagal mengupload gambar')
      }

      setImageUrl(data.url)
      toast.success('Foto berhasil diupload!')
    } catch (err: any) {
      toast.error(err.message || 'Terjadi kesalahan saat upload')
    } finally {
      setIsUploading(false)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0])
    }
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Hidden input to hold the actual value when the parent form is submitted */}
      <input type="hidden" id={id} name={name} value={imageUrl} />

      {label && (
        <div className="flex items-center justify-between">
          <label className="text-xs sm:text-sm font-semibold text-stone-800">
            {label}
          </label>
          {aspectRatioHint && (
            <span className="text-[10px] text-amber-700 bg-amber-100 px-2 py-0.5 rounded font-normal">
              {aspectRatioHint}
            </span>
          )}
        </div>
      )}

      {/* Hidden native file input */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFileChange(e.target.files[0])
          }
        }}
      />

      {/* Upload Box / Image Preview */}
      {imageUrl ? (
        <div className="relative group rounded-2xl overflow-hidden border border-stone-200 bg-stone-50 aspect-[4/3] max-h-48 flex items-center justify-center shadow-xs">
          <img
            src={imageUrl}
            alt="Preview Foto"
            className="w-full h-full object-cover"
          />
          {/* Overlay Actions */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2.5">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="px-3 py-1.5 rounded-lg bg-white/90 hover:bg-white text-stone-900 text-xs font-semibold shadow-md flex items-center gap-1.5 transition-transform active:scale-95 cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" /> Ganti Foto
            </button>
            <button
              type="button"
              onClick={() => setImageUrl('')}
              className="p-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white shadow-md transition-transform active:scale-95 cursor-pointer"
              title="Hapus Foto"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          {/* Subtle Success Badge */}
          <div className="absolute bottom-2 right-2 bg-emerald-600/90 text-white text-[10px] font-medium px-2 py-0.5 rounded-full flex items-center gap-1 backdrop-blur-xs">
            <Check className="w-3 h-3" /> Terpilih
          </div>
        </div>
      ) : (
        <div
          onDragOver={(e) => {
            e.preventDefault()
            setIsDragging(true)
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-2 ${
            isDragging
              ? 'border-amber-500 bg-amber-50/50 scale-[1.01]'
              : 'border-stone-200 hover:border-amber-400 bg-stone-50/50 hover:bg-amber-50/30'
          }`}
        >
          {isUploading ? (
            <div className="py-4 flex flex-col items-center gap-2">
              <Loader2 className="w-7 h-7 text-amber-600 animate-spin" />
              <p className="text-xs text-stone-600 font-medium">Sedang mengompres &amp; mengupload...</p>
            </div>
          ) : (
            <>
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-700 shadow-2xs">
                <ImageIcon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-stone-800">
                  Klik untuk pilih foto <span className="text-stone-400 font-normal">atau tarik ke sini</span>
                </p>
                <p className="text-[11px] text-stone-500 font-light mt-0.5">
                  JPG, PNG, atau WEBP (Maksimal 10MB)
                </p>
              </div>
            </>
          )}
        </div>
      )}

      {description && (
        <p className="text-[11px] text-muted-foreground">{description}</p>
      )}
    </div>
  )
}
