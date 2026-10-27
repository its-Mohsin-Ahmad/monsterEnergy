import { Zap } from 'lucide-react'

interface EnergyMarqueeProps {
  speed?: 'normal' | 'fast'
  reverse?: boolean
  className?: string
  accent?: string
}

const MARQUEE_ITEMS = [
  'UNLEASH THE BEAST',
  'ZERO SUGAR ULTRA',
  '160MG CAFFEINE HIT',
  'OFFICIAL MOTOGP & UFC PARTNER',
  '100% RECYCLED CAN',
  'REAL FRUIT JUICE',
  'ENERGY WITHOUT COMPROMISE',
  'BUILT FOR ACTION SPORTS',
  'LIVE LIFE AT FULL THROTTLE',
]

export function EnergyMarquee({
  speed = 'normal',
  reverse = false,
  className = '',
  accent = '#B7FF00',
}: EnergyMarqueeProps) {
  const animClass = reverse
    ? 'animate-marquee-reverse'
    : speed === 'fast'
    ? 'animate-marquee-fast'
    : 'animate-marquee'

  return (
    <div
      className={`relative w-full max-w-full overflow-hidden overflow-x-hidden py-3 bg-[#030603] border-y border-[#1C2A20] select-none ${className}`}
      style={{ contain: 'paint' }}
      aria-hidden="true"
    >
      {/* Edge gradient masks for smooth fade */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#030603] to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#030603] to-transparent z-10" />

      <div className={animClass}>
        {/* Set 1 */}
        <div className="flex items-center gap-8 pr-8 whitespace-nowrap">
          {MARQUEE_ITEMS.map((item, idx) => (
            <div key={`set1-${idx}`} className="flex items-center gap-6">
              <span className="font-display tracking-widest text-sm md:text-base font-bold uppercase text-white/90 hover:text-neon transition-colors duration-200">
                {item}
              </span>
              <Zap
                size={14}
                className="fill-current animate-pulse"
                style={{ color: accent }}
              />
            </div>
          ))}
        </div>

        {/* Set 2 (Duplicate for seamless loop) */}
        <div className="flex items-center gap-8 pr-8 whitespace-nowrap">
          {MARQUEE_ITEMS.map((item, idx) => (
            <div key={`set2-${idx}`} className="flex items-center gap-6">
              <span className="font-display tracking-widest text-sm md:text-base font-bold uppercase text-white/90 hover:text-neon transition-colors duration-200">
                {item}
              </span>
              <Zap
                size={14}
                className="fill-current animate-pulse"
                style={{ color: accent }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
