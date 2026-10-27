import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

export function SalesChart({ data }: { data: any[] }) {
  return (
    <div className="bg-card border border-border rounded-card p-5 h-72">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#B7FF00" stopOpacity={0.4} />
              <stop offset="100%" stopColor="#B7FF00" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#1C2A20" vertical={false} />
          <XAxis dataKey="label" stroke="#68746C" fontSize={11} />
          <YAxis stroke="#68746C" fontSize={11} />
          <Tooltip contentStyle={{ background: '#0D130F', border: '1px solid #1C2A20', color: '#F5F7F4' }} />
          <Area type="monotone" dataKey="value" stroke="#B7FF00" fill="url(#g)" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
