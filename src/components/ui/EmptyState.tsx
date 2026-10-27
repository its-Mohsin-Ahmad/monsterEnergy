export function EmptyState({ icon: Icon, title, description, action }: any) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      {Icon && <Icon size={40} className="text-muted mb-4" />}
      <div className="font-display text-xl mb-2">{title}</div>
      <p className="text-sm text-muted max-w-md">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}
