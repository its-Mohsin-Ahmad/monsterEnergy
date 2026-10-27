export function Badge({ children, tone = 'neutral' }: any) {
  const tones: any = {
    neutral: 'bg-card border border-border text-text-2',
    green: 'bg-neon/10 border border-neon text-neon',
    warn: 'bg-warn/10 border border-warn text-warn',
    error: 'bg-error/10 border border-error text-error',
  }
  return <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-md ${tones[tone]}`}>{children}</span>
}
