// Approved real product image assets for Home Hero Carousel
import imgOriginal from '../images/home page/home page hero section carousal images/Monster-removebg-preview.png'
import imgWhite from '../images/home page/home page hero section carousal images/White_monster-removebg-preview.png'
import imgBlue from '../images/home page/home page hero section carousal images/download__6_-removebg-preview.png'
import imgDragon from '../images/home page/home page hero section carousal images/Monster_Energy_Dragon_Tea_Yerba_Mate-removebg-preview.png'
import imgMango from '../images/shop hero section images/drinks images/Drink_-_Mango_Matic_Maxx__monsterenergy_-removebg-preview.png'
import imgBest from '../images/home page/home page hero section carousal images/Best_monster_ever_-removebg-preview.png'
import imgGold from '../images/shop hero section images/drinks images/download__8_-removebg-preview.png'

export interface HeroProductSlide {
  id: string
  brandName: string
  flavorName: string
  subtitle: string
  image: string
  alt: string
  accentColor: string
  glowColor: string
  productSlug: string
  categorySlug: string
  tagline: string
  flavorNotes: string
  caffeine: string
  volume: string
}

export const heroSlides: HeroProductSlide[] = [
  {
    id: 'hero-original',
    brandName: 'MONSTER ENERGY',
    flavorName: 'ORIGINAL',
    subtitle: 'Unleash the Beast',
    image: imgOriginal,
    alt: 'Monster Energy Original 500ml can with glowing green claw logo',
    accentColor: '#B7FF00',
    glowColor: 'rgba(183, 255, 0, 0.45)',
    productSlug: 'monster-energy-original',
    categorySlug: 'original',
    tagline: 'The legendary green claw formula that ignited a global extreme sports revolution.',
    flavorNotes: 'Crisp & Sweet • Citrus Punch • Double Energy Blend',
    caffeine: '160mg Caffeine',
    volume: '500ml Can',
  },
  {
    id: 'hero-blue',
    brandName: 'MONSTER ENERGY',
    flavorName: 'ULTRA BLUE',
    subtitle: 'Blue Chill. Maximum Voltage.',
    image: imgBlue,
    alt: 'Monster Energy Ultra Blue zero-sugar electric blue can',
    accentColor: '#00D2FF',
    glowColor: 'rgba(0, 210, 255, 0.45)',
    productSlug: 'monster-download-series',
    categorySlug: 'ultra',
    tagline: 'Frosty, crisp citrus berry with zero sugar and maximum electric high-altitude buzz.',
    flavorNotes: 'Zero Sugar • Icy Wild Berry • Light Crisp Citrus',
    caffeine: '150mg Caffeine',
    volume: '500ml Can',
  },
  {
    id: 'hero-dragon',
    brandName: 'MONSTER ENERGY',
    flavorName: 'DRAGON TEA',
    subtitle: 'Smooth Green Lift. Ancient Energy.',
    image: imgDragon,
    alt: 'Monster Energy Dragon Tea Yerba Mate green can',
    accentColor: '#00FF88',
    glowColor: 'rgba(0, 255, 136, 0.42)',
    productSlug: 'monster-dragon-tea-yerba-mate',
    categorySlug: 'tea',
    tagline: 'Authentic brewed green tea and yerba mate infused with a clean, sustained lift.',
    flavorNotes: 'Real Brewed Tea • Yerba Mate • Herbal Lift',
    caffeine: '155mg Caffeine',
    volume: '458ml Can',
  },
  {
    id: 'hero-mango',
    brandName: 'MONSTER ENERGY',
    flavorName: 'MANGO LOCO',
    subtitle: 'Real Fruit. Explosive Energy.',
    image: imgMango,
    alt: 'Monster Energy Juice Mango Loco vibrant tropical can',
    accentColor: '#FFB800',
    glowColor: 'rgba(255, 184, 0, 0.45)',
    productSlug: 'monster-juice-mango-loco',
    categorySlug: 'juiced',
    tagline: 'Heavenly blend of exotic tropical juices loaded with our trademark energy formula.',
    flavorNotes: '16% Real Fruit Juice • Exotic Mango • Tropical Splash',
    caffeine: '160mg Caffeine',
    volume: '500ml Can',
  },
  {
    id: 'hero-best',
    brandName: 'MONSTER ENERGY',
    flavorName: 'BEST EVER',
    subtitle: 'Born Bold. Unapologetic Power.',
    image: imgBest,
    alt: 'Monster Energy Best Ever Edition bold black and orange can',
    accentColor: '#FF5500',
    glowColor: 'rgba(255, 85, 0, 0.45)',
    productSlug: 'monster-best-ever-edition',
    categorySlug: 'original',
    tagline: 'The legend redefined for extreme performance, high speeds, and bold track finish.',
    flavorNotes: 'Maximum Intensity • Blood Orange & Citrus • Smooth Finish',
    caffeine: '160mg Caffeine',
    volume: '500ml Can',
  },
  {
    id: 'hero-gold',
    brandName: 'MONSTER ENERGY',
    flavorName: 'ULTRA GOLD',
    subtitle: 'Pure Gold. Pineapple Rush.',
    image: imgGold,
    alt: 'Monster Energy Ultra Gold metallic golden can',
    accentColor: '#FFD700',
    glowColor: 'rgba(255, 215, 0, 0.45)',
    productSlug: 'monster-ultra-gold',
    categorySlug: 'ultra',
    tagline: 'Crisp, refreshing heavenly golden pineapple with zero sugar and pure gold taste.',
    flavorNotes: 'Zero Sugar • Golden Pineapple • Ultra Refreshing',
    caffeine: '150mg Caffeine',
    volume: '500ml Can',
  },
  {
    id: 'hero-white',
    brandName: 'MONSTER ENERGY',
    flavorName: 'ZERO SUGAR',
    subtitle: 'Zero Sugar. Pure Monster.',
    image: imgWhite,
    alt: 'Monster Energy Ultra White zero-sugar frosted silver can',
    accentColor: '#E2E8F0',
    glowColor: 'rgba(226, 232, 240, 0.40)',
    productSlug: 'monster-energy-ultra-white',
    categorySlug: 'zero-sugar',
    tagline: 'Light, crisp and refreshing citrus taste with zero calories and full energy kick.',
    flavorNotes: 'Zero Calories • Zero Sugar • Sparkling Citrus',
    caffeine: '150mg Caffeine',
    volume: '500ml Can',
  },
]
