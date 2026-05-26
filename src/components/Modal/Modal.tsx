import { useEffect } from 'react'
import { CloseIcon } from '@/commons/icons'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  useEffect(() => {
    if (!isOpen) return
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="relative w-full sm:max-w-2xl sm:mx-4 bg-surface/90 backdrop-blur-xl border border-white/[0.1] rounded-t-3xl sm:rounded-3xl shadow-[0_-8px_60px_rgba(0,0,0,0.8)] z-10 max-h-[85vh] sm:max-h-[80vh] flex flex-col">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.03] to-transparent rounded-3xl pointer-events-none" />
        <div className="relative flex items-center justify-between px-6 py-5 border-b border-white/[0.06] shrink-0">
          {title && (
            <h2 className="font-display font-semibold text-text-primary truncate pr-4 text-lg">
              {title}
            </h2>
          )}
          <button
            onClick={onClose}
            className="ml-auto p-2 rounded-xl text-text-secondary hover:text-text-primary hover:bg-white/[0.06] transition-colors"
            aria-label="Close"
          >
            <CloseIcon />
          </button>
        </div>
        <div className="relative overflow-y-auto flex-1 px-6 py-5">{children}</div>
      </div>
    </div>
  )
}
