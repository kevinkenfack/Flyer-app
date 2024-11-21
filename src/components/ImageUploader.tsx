'use client'

import { useRef, useState } from 'react'
import { useImageProcessing } from '@/hooks/useImageProcessing'
import { useImageStore } from '@/hooks/useStore'
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.min.css'
import LoadingOverlay from './LoadingOverlay'
import Message from './Message'
import Image from 'next/image'
import { Camera, Upload, Scissors, Download } from 'lucide-react'

export default function ImageUploader() {
  const [cropper, setCropper] = useState<Cropper | null>(null)
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null)
  
  const imageInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)
  const cropperImageRef = useRef<HTMLImageElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const { processImage, isLoading, error } = useImageProcessing()
  const { 
    originalImage, 
    croppedImage, 
    flyerImage, 
    setCroppedImage,
    setFlyerImage 
  } = useImageStore()

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      const processedImage = await processImage(file)
      if (processedImage) {
        const reader = new FileReader()
        reader.onloadend = () => {
          if (cropperImageRef.current) {
            cropperImageRef.current.src = reader.result as string
            initializeCropper()
          }
        }
        reader.readAsDataURL(processedImage)
      }
    } catch (err) {
      setMessage({ 
        text: err instanceof Error ? err.message : 'Erreur de traitement', 
        type: 'error' 
      })
    }
  }

  const initializeCropper = () => {
    if (cropperImageRef.current) {
      // Détruire le cropper existant si nécessaire
      if (cropper) {
        cropper.destroy()
      }

      const newCropper = new Cropper(cropperImageRef.current, {
        aspectRatio: 1,
        viewMode: 2,
        dragMode: 'move',
        autoCropArea: 0.8,
        restore: false,
        guides: true,
        center: true,
        highlight: false,
        cropBoxMovable: true,
        cropBoxResizable: true,
        toggleDragModeOnDblclick: false,
      })

      setCropper(newCropper)
      setMessage({ text: 'Image chargée. Recadrez votre image.', type: 'success' })
    }
  }

  const handleCrop = () => {
    if (cropper) {
      const croppedCanvas = cropper.getCroppedCanvas({
        width: 800,
        height: 800,
        imageSmoothingEnabled: true,
        imageSmoothingQuality: 'high'
      })

      if (croppedCanvas) {
        const croppedImageUrl = croppedCanvas.toDataURL('image/jpeg')
        setCroppedImage(croppedImageUrl)
        setMessage({ text: 'Image recadrée avec succès', type: 'success' })
      }
    }
  }

  const generateFlyer = async () => {
    if (!canvasRef.current || !croppedImage) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    try {
      const flyerBase = await loadImage('/forex.jpg')
      const userImage = await loadImage(croppedImage)

      // Dimensions du flyer
      canvas.width = 8334
      canvas.height = 10410

      // Zone pour l'image personnalisée
      const IMAGE_ZONE = {
        x: 2750,
        y: 4500,
        width: 2830,
        height: 2830
      }

      // Dessiner le fond du flyer
      ctx.drawImage(flyerBase, 0, 0, canvas.width, canvas.height)

      // Dessiner l'image personnalisée
      ctx.drawImage(
        userImage, 
        IMAGE_ZONE.x, 
        IMAGE_ZONE.y, 
        IMAGE_ZONE.width, 
        IMAGE_ZONE.height
      )

      // Convertir le canvas en image
      const finalFlyerUrl = canvas.toDataURL('image/jpeg', 0.85)
      setFlyerImage(finalFlyerUrl)
      setMessage({ text: 'Flyer généré avec succès', type: 'success' })
    } catch (err) {
      setMessage({ 
        text: 'Erreur lors de la génération du flyer', 
        type: 'error' 
      })
    }
  }

  const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
      // Utilisez document.createElement('img') au lieu de new Image()
      const img = document.createElement('img')
      img.onload = () => resolve(img)
      img.onerror = (error) => reject(error)
      img.crossOrigin = 'Anonymous'
      img.src = src
    })
  }

  const downloadFlyer = () => {
    if (!flyerImage) return

    const link = document.createElement('a')
    link.href = flyerImage
    link.download = `flyer_${new Date().toISOString().slice(0,10)}.jpg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="space-y-6">
      {isLoading && <LoadingOverlay />}
      {message && (
        <Message 
          text={message.text} 
          type={message.type} 
          onClose={() => setMessage(null)} 
        />
      )}

      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-primary">
          Créez votre Flyer Personnalisé
        </h1>
        <p className="text-gray-600">
          Importez une photo ou prenez-en une nouvelle
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <button 
          onClick={() => imageInputRef.current?.click()}
          className="btn btn-primary flex items-center justify-center"
        >
          <Upload className="mr-2" />
          Choisir une image
        </button>
        <button 
          onClick={() => cameraInputRef.current?.click()}
          className="btn btn-secondary flex items-center justify-center"
        >
          <Camera className="mr-2" />
          Prendre une photo
        </button>

        <input 
          type="file" 
          ref={imageInputRef}
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />
        <input 
          type="file" 
          ref={cameraInputRef}
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={handleImageUpload}
        />
      </div>

      {originalImage && (
        <div className="image-preview space-y-4">
          <img 
            ref={cropperImageRef} 
            alt="Image à recadrer" 
            className="max-w-full hidden" 
          />

          <div className="flex justify-center space-x-4">
            <button 
              onClick={handleCrop}
              className="btn btn-primary flex items-center"
              disabled={!cropper}
            >
              <Scissors className="mr-2" />
              Recadrer
            </button>
          </div>
        </div>
      )}

      {croppedImage && (
        <div className="space-y-4">
          <img 
            src={croppedImage} 
            alt="Image recadrée" 
            className="mx-auto max-w-64 rounded-lg"
          />
          <div className="flex justify-center">
            <button 
              onClick={generateFlyer}
              className="btn btn-success flex items-center"
            >
              Générer le Flyer
            </button>
          </div>
        </div>
      )}

      {flyerImage && (
        <div className="space-y-4">
          <img 
            src={flyerImage} 
            alt="Flyer généré" 
            className="mx-auto max-w-96 rounded-lg"
          />
          <div className="flex justify-center">
            <button 
              onClick={downloadFlyer}
              className="btn btn-primary flex items-center"
            >
              <Download className="mr-2" />
              Télécharger le Flyer
            </button>
          </div>
        </div>
      )}

      <canvas ref={canvasRef} className="hidden" />
    </div>
  )
}