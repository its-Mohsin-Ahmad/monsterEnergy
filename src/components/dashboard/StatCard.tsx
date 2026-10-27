export function StatCard({ title, value, sub }: any) {
  return (
    <div className="bg-card border border-border rounded-card p-5">
      <div className="text-xs text-muted uppercase tracking-wider mb-2">{title}</div>
      <div className="font-display text-3xl text-neon">{value}</div>
      {sub && <div className="text-xs text-text-2 mt-2">{sub}</div>}
    </div>
  )
}
