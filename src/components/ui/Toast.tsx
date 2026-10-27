import { useEffect } from 'react'
import { useUIStore } from '../../store/uiStore'

export function Toast() {
  const toast = useUIStore((s) => s.toast)
  const clear = useUIStore((s) => s.clearToast)
  useEffect(() => {
    if (toast) {
      const t = setTimeout(clear, 2500)
      return () => clearTimeout(t)
    }
  }, [toast, clear])
  if (!toast) return null
  const color = toast.type === 'error' ? 'border-error text-error' : toast.type === 'info' ? 'border-border text-text' : 'border-neon text-neon'
  return (
    <div className={`fixed bottom-6 right-6 z-50 bg-card border ${color} rounded-lg px-4 py-3 shadow-xl fade-in`}>
      {toast.message}
    </div>
  )
}
