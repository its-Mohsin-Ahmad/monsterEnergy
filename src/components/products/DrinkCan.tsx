export function DrinkCan({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  return <img src={src} alt={alt} className={`drink-can ${className}`} loading="lazy" />
}
