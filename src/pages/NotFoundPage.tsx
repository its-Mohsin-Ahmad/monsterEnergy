import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
      <div className="font-display text-6xl text-neon mb-2">404</div>
      <div className="text-text-2 mb-6">Page not found.</div>
      <Link to="/" className="bg-neon text-black font-semibold px-6 py-2.5 rounded-lg">Go Home</Link>
    </div>
  )
}
