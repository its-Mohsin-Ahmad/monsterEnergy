import { Minus, Plus } from 'lucide-react'

export function QuantitySelector({ value, onChange, min = 1, max = 99 }: any) {
  return (
    <div className="inline-flex items-center border border-border rounded-lg overflow-hidden">
      <button onClick={() => onChange(Math.max(min, value - 1))} className="px-3 py-2 hover:bg-card text-text-2 hover:text-text"><Minus size={14} /></button>
      <span className="px-4 py-2 text-sm font-semibold min-w-[40px] text-center">{value}</span>
      <button onClick={() => onChange(Math.min(max, value + 1))} className="px-3 py-2 hover:bg-card text-text-2 hover:text-text"><Plus size={14} /></button>
    </div>
  )
}
