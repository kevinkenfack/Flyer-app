import { useState } from 'react'
import { useImageStore } from './useStore'

export const useImageProcessing = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const { 
    setOriginalImage, 
    setCroppedImage, 
    setFlyerImage 
  } = useImageStore()

  const processImage = async (file: File) => {
    setIsLoading(true)
    setError(null)

    try {
      // Validation du fichier
      const validTypes = ['image/jpeg', 'image/png', 'image/webp']
      if (!validTypes.includes(file.type)) {
        throw new Error('Format non supporté. Utilisez JPG, PNG ou WebP')
      }

      // Compression de l'image
      const compressedImage = await compressImage(file)
      
      setOriginalImage(compressedImage)
      setIsLoading(false)
      return compressedImage
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de traitement')
      setIsLoading(false)
      return null
    }
  }

  const compressImage = (file: File): Promise<File> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const img = new Image()
        img.onload = () => {
          const canvas = document.createElement('canvas')
          let width = img.width
          let height = img.height

          const MAX_SIZE = 2048
          if (width > MAX_SIZE || height > MAX_SIZE) {
            if (width > height) {
              height = (height / width) * MAX_SIZE
              width = MAX_SIZE
            } else {
              width = (width / height) * MAX_SIZE
              height = MAX_SIZE
            }
          }

          canvas.width = width
          canvas.height = height
          const ctx = canvas.getContext('2d')!
          ctx.drawImage(img, 0, 0, width, height)

          canvas.toBlob(
            (blob) => {
              if (!blob) {
                reject(new Error('Compression échouée'))
                return
              }
              const compressedFile = new File([blob], file.name, {
                type: 'image/jpeg',
                lastModified: Date.now()
              })
              resolve(compressedFile)
            },
            'image/jpeg',
            0.85
          )
        }
        img.onerror = reject
        img.src = e.target.result as string
      }
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  return { processImage, isLoading, error }
}