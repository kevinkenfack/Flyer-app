'use client'

import { useEffect } from 'react'
import { CheckCircle2, XCircle, X } from 'lucide-react'

interface MessageProps {
  text: string
  type?: 'success' | 'error'
  onClose?: () => void
  duration?: number
}

export default function Message({ 
  text, 
  type = 'success', 
  onClose, 
  duration = 3000 
}: MessageProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose?.()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  const icons = {
    success: <CheckCircle2 className="text-green-500" />,
    error: <XCircle className="text-red-500" />
  }

  const backgrounds = {
    success: 'bg-green-50 border-green-200',
    error: 'bg-red-50 border-red-200'
  }

  const textColors = {
    success: 'text-green-800',
    error: 'text-red-800'
  }

  return (
    <div 
      className={`
        fixed top-4 left-1/2 -translate-x-1/2 z-50 
        flex items-center space-x-3 
        px-4 py-3 rounded-lg 
        border shadow-md
        ${backgrounds[type]}
        ${textColors[type]}
        animate-fadeIn
      `}
    >
      {icons[type]}
      <span>{text}</span>
      {onClose && (
        <button 
          onClick={onClose} 
          className="ml-4 hover:bg-gray-100 rounded-full p-1"
        >
          <X size={16} />
        </button>
      )}
    </div>
  )
}