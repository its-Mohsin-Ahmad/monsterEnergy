export function DataTable({ columns, rows }: { columns: { key: string; label: string }[]; rows: any[] }) {
  return (
    <div className="overflow-x-auto bg-card border border-border rounded-card">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border text-left text-muted">
            {columns.map((c) => <th key={c.key} className="px-4 py-3 font-medium">{c.label}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, idx) => (
            <tr key={idx} className="border-b border-border/50 hover:bg-card-elev">
              {columns.map((c) => <td key={c.key} className="px-4 py-3">{r[c.key]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
