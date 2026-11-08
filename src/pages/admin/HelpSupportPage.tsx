import { HelpCircle, Terminal, BookOpen, LifeBuoy, CheckCircle2, ShieldCheck, Mail } from 'lucide-react'

export default function AdminHelpSupportPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl sm:text-4xl text-white tracking-wide">
          Help & Operational Support
        </h1>
        <p className="text-xs sm:text-sm text-white/50 mt-1">
          Documentation, keyboard shortcuts, inventory best practices, and emergency support channels.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#0B100C] border border-[#182619] rounded-2xl p-5 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#B7FF00]/10 border border-[#B7FF00]/30 flex items-center justify-center text-[#B7FF00]">
            <BookOpen size={20} />
          </div>
          <h2 className="font-display text-lg text-white">Stock Equation</h2>
          <p className="text-xs text-white/60 leading-relaxed">
            Sellable Available Stock is strictly computed as:<br />
            <strong className="text-[#B7FF00] font-mono">Available = On-Hand Physical − Reserved</strong>.<br />
            Damaged, expired, or quarantined cans are excluded.
          </p>
        </div>

        <div className="bg-[#0B100C] border border-[#182619] rounded-2xl p-5 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#B7FF00]/10 border border-[#B7FF00]/30 flex items-center justify-center text-[#B7FF00]">
            <Terminal size={20} />
          </div>
          <h2 className="font-display text-lg text-white">Keyboard Shortcuts</h2>
          <div className="space-y-1.5 text-xs text-white/70">
            <div className="flex items-center justify-between">
              <span>Global Search:</span>
              <kbd className="px-2 py-0.5 rounded bg-black/60 border border-white/10 text-[10px] text-[#B7FF00] font-mono">
                ⌘K / Ctrl+K
              </kbd>
            </div>
            <div className="flex items-center justify-between">
              <span>Close Modals:</span>
              <kbd className="px-2 py-0.5 rounded bg-black/60 border border-white/10 text-[10px] text-white/40 font-mono">
                ESC
              </kbd>
            </div>
          </div>
        </div>

        <div className="bg-[#0B100C] border border-[#182619] rounded-2xl p-5 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#B7FF00]/10 border border-[#B7FF00]/30 flex items-center justify-center text-[#B7FF00]">
            <LifeBuoy size={20} />
          </div>
          <h2 className="font-display text-lg text-white">Technical Support</h2>
          <p className="text-xs text-white/60 leading-relaxed">
            For critical database synchronization issues or bottling order dispatch errors, contact Monster IT Support:
          </p>
          <div className="text-xs font-mono text-[#B7FF00] flex items-center gap-1.5">
            <Mail size={13} />
            <span>ops-support@monsterenergy.com</span>
          </div>
        </div>
      </div>

      <div className="bg-[#0B100C] border border-[#182619] rounded-2xl p-6">
        <h2 className="font-display text-lg text-white mb-3">System Health & Connected Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
            <span className="text-white/60">Catalog Synchronizer:</span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle2 size={13} /> Active
            </span>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
            <span className="text-white/60">Inventory Auditor:</span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle2 size={13} /> 100% Synced
            </span>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
            <span className="text-white/60">Order Processing Queue:</span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle2 size={13} /> Operational
            </span>
          </div>
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
            <span className="text-white/60">Security Audit Trail:</span>
            <span className="text-[#B7FF00] font-bold flex items-center gap-1">
              <ShieldCheck size={13} /> Armed
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
