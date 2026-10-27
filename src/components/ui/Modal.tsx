import { useEffect } from 'react'
import { X } from 'lucide-react'

export function Modal({ open, onClose, title, children }: any) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    if (open) document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, onClose])
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="relative bg-card border border-border rounded-card w-full max-w-lg p-6 fade-in">
        <div className="flex items-center justify-between mb-4">
          <div className="font-display text-xl">{title}</div>
          <button onClick={onClose} className="text-text-2 hover:text-text"><X size={18} /></button>
        </div>
        {children}
      </div>
    </div>
  )
}
