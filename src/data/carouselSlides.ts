// Shop banner carousel — the five original uploaded images
// These are imported via Vite's static-asset handling
import slide1 from '../images/shop hero section images/Coffee-Fueled Racing Energy.png'
import slide2 from '../images/shop hero section images/Monster Energy_ Break the Ordinary.png'
import slide3 from '../images/shop hero section images/Neon Monster Energy Flavor Showcase.png'
import slide4 from '../images/shop hero section images/Own the Night_ Tropical Energy Trio.png'
import slide5 from '../images/shop hero section images/Unleash Your Energy_ Neon Storm.png'

export interface CarouselSlide {
  id: string
  src: string
  alt: string
  label: string
  shopLink: string
}

export const shopCarouselSlides: CarouselSlide[] = [
  {
    id: 'slide-1',
    src: slide1,
    alt: 'Coffee-Fueled Racing Energy — Monster Energy motorsport collection banner',
    label: 'Coffee-Fueled Racing Energy',
    shopLink: '/shop?category=original',
  },
  {
    id: 'slide-2',
    src: slide2,
    alt: 'Monster Energy: Break the Ordinary — flagship collection showcase',
    label: 'Break the Ordinary',
    shopLink: '/shop',
  },
  {
    id: 'slide-3',
    src: slide3,
    alt: 'Neon Monster Energy Flavor Showcase — vibrant flavor lineup',
    label: 'Neon Flavor Showcase',
    shopLink: '/shop?category=ultra',
  },
  {
    id: 'slide-4',
    src: slide4,
    alt: 'Own the Night: Tropical Energy Trio — three tropical cans displayed',
    label: 'Own the Night — Tropical Trio',
    shopLink: '/shop?category=juiced',
  },
  {
    id: 'slide-5',
    src: slide5,
    alt: 'Unleash Your Energy: Neon Storm — high-energy neon artwork',
    label: 'Unleash Your Energy — Neon Storm',
    shopLink: '/shop',
  },
]
