import { create } from 'zustand'

interface ImageState {
  originalImage: File | null
  croppedImage: string | null
  flyerImage: string | null
  setOriginalImage: (image: File) => void
  setCroppedImage: (image: string) => void
  setFlyerImage: (image: string) => void
  resetImages: () => void
}

export const useImageStore = create<ImageState>((set) => ({
  originalImage: null,
  croppedImage: null,
  flyerImage: null,
  setOriginalImage: (image) => set({ originalImage: image }),
  setCroppedImage: (image) => set({ croppedImage: image }),
  setFlyerImage: (image) => set({ flyerImage: image }),
  resetImages: () => set({ 
    originalImage: null, 
    croppedImage: null, 
    flyerImage: null 
  })
}))