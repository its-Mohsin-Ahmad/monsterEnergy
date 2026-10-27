import { useDemoStore } from '../../store/demoStore'
import { InventoryAlert } from '../../components/dashboard/InventoryAlert'

export default function AdminInventory() {
  const products = useDemoStore((s) => s.products)
  const updateProduct = useDemoStore((s) => s.updateProduct)
  const low = products.filter((p) => p.stock < 25)
  return (
    <div className="space-y-4">
      <h1 className="font-display text-2xl">Inventory</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-card p-4"><div className="text-xs text-muted">Total SKUs</div><div className="font-display text-2xl text-neon">{products.length}</div></div>
        <div className="bg-card border border-border rounded-card p-4"><div className="text-xs text-muted">Low Stock</div><div className="font-display text-2xl text-warn">{low.length}</div></div>
        <div className="bg-card border border-border rounded-card p-4"><div className="text-xs text-muted">Out of Stock</div><div className="font-display text-2xl text-error">{products.filter((p) => p.stock === 0).length}</div></div>
        <div className="bg-card border border-border rounded-card p-4"><div className="text-xs text-muted">Total Units</div><div className="font-display text-2xl text-neon">{products.reduce((a, p) => a + p.stock, 0)}</div></div>
      </div>
      <div className="space-y-2">
        {low.map((p) => <InventoryAlert key={p.id} product={p} />)}
      </div>
      <div className="bg-card border border-border rounded-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-card-elev text-text-2 text-xs uppercase">
            <tr><th className="text-left p-3">Product</th><th className="p-3">Stock</th><th className="p-3">Adjust</th></tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-t border-border">
                <td className="p-3 flex items-center gap-2"><img src={p.image} alt={p.name} className="w-8 h-8 object-contain drink-can" />{p.name}</td>
                <td className="p-3 text-center">{p.stock}</td>
                <td className="p-3 text-center">
                  <button onClick={() => updateProduct(p.id, { stock: p.stock + 10 })} className="border border-border px-2 py-1 rounded text-xs hover:border-neon mr-1">+10</button>
                  <button onClick={() => updateProduct(p.id, { stock: Math.max(0, p.stock - 10) })} className="border border-border px-2 py-1 rounded text-xs hover:border-neon">-10</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
