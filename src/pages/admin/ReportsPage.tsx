import { useState } from 'react'
import { BarChart3, Download, TrendingUp, Calendar, DollarSign, ShoppingCart, Percent } from 'lucide-react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts'
import { formatCurrency } from '../../utils/formatCurrency'

const weeklyReport = [
  { day: 'Mon', revenue: 2950, orders: 42, aov: 70.2 },
  { day: 'Tue', revenue: 3410, orders: 51, aov: 66.8 },
  { day: 'Wed', revenue: 4120, orders: 60, aov: 68.6 },
  { day: 'Thu', revenue: 4850, orders: 69, aov: 70.2 },
  { day: 'Fri', revenue: 5320, orders: 74, aov: 71.8 },
  { day: 'Sat', revenue: 6410, orders: 88, aov: 72.8 },
  { day: 'Sun', revenue: 5890, orders: 79, aov: 74.5 },
]

export default function AdminReportsPage() {
  const [range, setRange] = useState('7d')

  const exportReportCSV = () => {
    const csv = 'Day,Revenue,Orders,Average Order Value\n' + weeklyReport.map((r) => `${r.day},${r.revenue},${r.orders},${r.aov}`).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `Monster_Energy_Sales_Report_${range}.csv`
    a.click()
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl sm:text-4xl text-white tracking-wide">
            Sales & Analytics Reports
          </h1>
          <p className="text-xs sm:text-sm text-white/50 mt-1">
            Financial revenue trends, gross sales, average order value, and category breakdowns.
          </p>
        </div>

        <button
          onClick={exportReportCSV}
          className="flex items-center gap-2 bg-[#0D140E] hover:bg-[#B7FF00] hover:text-black border border-[#1C2C1D] text-[#B7FF00] font-semibold text-xs px-4 py-2.5 rounded-xl transition w-fit"
        >
          <Download size={15} />
          <span>Export Analytics CSV</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#0B100C] border border-[#182619] rounded-2xl p-5">
          <div className="text-xs text-white/50">Gross Revenue (Week)</div>
          <div className="font-display text-3xl text-white mt-1">$32,950.00</div>
          <div className="text-xs text-[#B7FF00] font-semibold mt-1">↑ 14.2% vs previous week</div>
        </div>

        <div className="bg-[#0B100C] border border-[#182619] rounded-2xl p-5">
          <div className="text-xs text-white/50">Average Order Value (AOV)</div>
          <div className="font-display text-3xl text-white mt-1">$70.70</div>
          <div className="text-xs text-[#B7FF00] font-semibold mt-1">↑ 3.8% efficiency</div>
        </div>

        <div className="bg-[#0B100C] border border-[#182619] rounded-2xl p-5">
          <div className="text-xs text-white/50">Return & Refund Rate</div>
          <div className="font-display text-3xl text-white mt-1">0.42%</div>
          <div className="text-xs text-emerald-400 font-semibold mt-1">Well within safe margin (&lt; 2%)</div>
        </div>
      </div>

      <div className="bg-[#0B100C] border border-[#182619] rounded-2xl p-5">
        <h2 className="font-display text-lg text-white mb-4">Daily Sales Velocity (Last 7 Days)</h2>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyReport}>
              <XAxis dataKey="day" stroke="#ffffff30" fontSize={11} tickLine={false} />
              <YAxis stroke="#ffffff30" fontSize={11} tickLine={false} tickFormatter={(v) => `$${v}`} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#090E0A',
                  borderColor: '#1E2E1F',
                  borderRadius: '12px',
                  fontSize: '12px',
                  color: '#fff',
                }}
                formatter={(val: number) => [`$${val}`, 'Revenue']}
              />
              <Bar dataKey="revenue" fill="#B7FF00" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

