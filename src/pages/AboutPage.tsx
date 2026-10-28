import { Link } from 'react-router-dom'
import aboutBanner from '../images/about/about banner.png'

export default function AboutPage() {
  return (
    <div className="px-4 md:px-8 py-6 space-y-12">
      <section className="relative rounded-card overflow-hidden border border-border h-64">
        <img src={aboutBanner} alt="About hero banner — Monster Energy brand spirit" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 h-full flex items-center px-8">
          <h1 className="font-display text-4xl md:text-6xl">BUILT AROUND A BOLD SPIRIT.</h1>
        </div>
      </section>
      <section className="grid md:grid-cols-2 gap-8">
        <div>
          <h2 className="font-display text-2xl mb-3">Brand Philosophy</h2>
          <p className="text-text-2">This is a frontend demonstration of a premium energy-drink brand experience. Bold flavors, iconic cans, and an energetic lifestyle.</p>
        </div>
        <div className="bg-card border border-border rounded-card p-6 flex items-center justify-center">
          <img src="https://images.unsplash.com/photo-1581636625402-29b2a704ef13?auto=format&fit=crop&w=500&q=80" alt="can" className="drink-can h-56 object-contain" />
        </div>
      </section>
      <section className="grid md:grid-cols-3 gap-4">
        {['Quality', 'Energy', 'Lifestyle'].map((t) => (
          <div key={t} className="bg-card border border-border rounded-card p-6">
            <div className="font-display text-xl text-neon mb-2">{t}</div>
            <p className="text-sm text-text-2">Premium experience crafted for those who push limits.</p>
          </div>
        ))}
      </section>
      <div className="text-center">
        <Link to="/shop" className="inline-flex bg-neon text-black font-semibold px-6 py-2.5 rounded-lg hover:bg-neon-bright">Shop Now</Link>
      </div>
    </div>
  )
}
