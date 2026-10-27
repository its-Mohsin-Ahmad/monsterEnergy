export function InventoryAlert({ product, threshold = 20 }: { product: any; threshold?: number }) {
  const low = product.stock <= threshold
  if (!low) return null
  return (
    <div className="flex items-center gap-3 bg-warn/10 border border-warn/40 rounded-lg px-4 py-3 text-sm">
      <span className="w-2 h-2 rounded-full bg-warn" />
      <span>{product.name} — low stock ({product.stock} left)</span>
    </div>
  )
}
