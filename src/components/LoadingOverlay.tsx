'use client'

import { Loader2 } from 'lucide-react'

export default function LoadingOverlay() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/90">
      <div className="flex flex-col items-center space-y-4">
        <Loader2 
          className="animate-spin text-primary" 
          size={48} 
        />
        <p className="text-gray-700">Traitement en cours...</p>
        <div className="w-48 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary animate-pulse" 
            style={{ width: '75%' }}
          />
        </div>
      </div>
    </div>
  )
}