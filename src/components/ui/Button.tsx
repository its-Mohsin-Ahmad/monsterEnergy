export function Button({ children, variant = 'primary', className = '', ...props }: any) {
  const base = 'inline-flex items-center justify-center gap-2 font-semibold text-sm rounded-lg px-4 py-2.5 transition active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed'
  const variants: any = {
    primary: 'bg-neon text-black hover:bg-neon-bright shadow-[0_0_12px_rgba(183,255,0,0.25)]',
    secondary: 'bg-card border border-border text-text hover:border-neon hover:text-neon',
    ghost: 'text-text-2 hover:text-text hover:bg-card',
    danger: 'bg-error/10 border border-error text-error hover:bg-error/20',
  }
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>{children}</button>
  )
}

