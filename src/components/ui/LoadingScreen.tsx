import { useEffect, useState, useMemo } from 'react'
import { useUIStore } from '../../store/uiStore'
import loaderLogo from '../../images/loader logo/Monster_Energy_ragged_M_text_logo-removebg-preview.png'
import './LoadingScreen.css'

const STATUS_MESSAGES = [
  'INITIALIZING EXPERIENCE',
  'PREPARING YOUR COLLECTION',
  'LOADING ENERGY',
  'ALMOST READY',
]

interface LoadingScreenProps {
  /** Minimum time to display loader in ms (defaults to 1800ms for cinematic feel) */
  minDuration?: number
  /** Maximum safe timeout before forcing exit in ms (defaults to 3500ms) */
  maxTimeout?: number
}

export function LoadingScreen({ minDuration = 1800, maxTimeout = 3500 }: LoadingScreenProps) {
  const hasAppLoaded = useUIStore((s) => s.hasAppLoaded)
  const setAppLoaded = useUIStore((s) => s.setAppLoaded)

  // If the app was already loaded during this session, do not re-render
  const [isMounted, setIsMounted] = useState(!hasAppLoaded)
  const [isExiting, setIsExiting] = useState(false)
  const [statusIndex, setStatusIndex] = useState(0)
  const [statusFade, setStatusFade] = useState(false)

  // Generate lightweight ambient dust particles
  const particles = useMemo(() => {
    return Array.from({ length: 6 }).map((_, i) => ({
      id: i,
      left: `${15 + i * 14}%`,
      bottom: `${10 + (i % 3) * 15}%`,
      delay: `${i * 0.8}s`,
      duration: `${4 + (i % 3) * 1.5}s`,
      size: `${1.5 + (i % 2) * 1}px`,
    }))
  }, [])

  // Rotate status messages smoothly
  useEffect(() => {
    if (!isMounted || isExiting) return

    const interval = setInterval(() => {
      setStatusFade(true)
      setTimeout(() => {
        setStatusIndex((prev) => (prev + 1) % STATUS_MESSAGES.length)
        setStatusFade(false)
      }, 250)
    }, 2000)

    return () => clearInterval(interval)
  }, [isMounted, isExiting])

  // Application readiness and lifecycle management
  useEffect(() => {
    if (hasAppLoaded) {
      setIsMounted(false)
      return
    }

    // Lock page scroll during full-screen overlay
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    let isReady = false
    let minTimePassed = false
    let exitTriggered = false

    const triggerExit = () => {
      if (exitTriggered) return
      exitTriggered = true
      setIsExiting(true)

      // Allow CSS transition to finish before unmounting completely
      setTimeout(() => {
        setIsMounted(false)
        setAppLoaded()
        document.body.style.overflow = originalOverflow
      }, 480)
    }

    // Check when minimum cinematic presentation time has passed
    const minTimer = setTimeout(() => {
      minTimePassed = true
      if (isReady || document.readyState === 'complete') {
        triggerExit()
      }
    }, minDuration)

    // Safety timeout: never trap user on loading screen
    const safetyTimer = setTimeout(() => {
      triggerExit()
    }, maxTimeout)

    // Window load handler
    const handleLoad = () => {
      isReady = true
      if (minTimePassed) {
        triggerExit()
      }
    }

    if (document.readyState === 'complete') {
      isReady = true
    } else {
      window.addEventListener('load', handleLoad)
    }

    return () => {
      clearTimeout(minTimer)
      clearTimeout(safetyTimer)
      window.removeEventListener('load', handleLoad)
      document.body.style.overflow = originalOverflow
    }
  }, [hasAppLoaded, minDuration, maxTimeout, setAppLoaded])

  if (!isMounted) {
    return null
  }

  return (
    <aside
      className={`monster-loader-root ${isExiting ? 'loader-exit' : ''}`}
      role="status"
      aria-busy={!isExiting}
      aria-label="Loading Monster Energy application"
    >
      {/* Cinematic Background Lighting & Atmosphere */}
      <div className="loader-atmosphere" aria-hidden="true">
        <div className="loader-bloom" />
        <div className="loader-vignette" />

        {/* Ambient Floating Dust */}
        {particles.map((p) => (
          <span
            key={p.id}
            className="loader-particle"
            style={{
              left: p.left,
              bottom: p.bottom,
              width: p.size,
              height: p.size,
              animationDelay: p.delay,
              animationDuration: p.duration,
            }}
          />
        ))}
      </div>

      {/* Main Core Content */}
      <div className="loader-content">
        {/* Monster Energy Claw Logo */}
        <div className="loader-logo-wrapper">
          <div className="loader-logo-aura" aria-hidden="true" />
          <img
            src={loaderLogo}
            alt="Monster Energy Logo"
            className="loader-logo-img"
            width={175}
            height={175}
            loading="eager"
            decoding="async"
          />
        </div>

        {/* Brand Typography */}
        <h2 className="loader-brand-title">
          MONSTER <span className="loader-brand-accent">ENERGY</span>
        </h2>

        {/* Rotating Status Message */}
        <div className="loader-status-container">
          <span
            className={`loader-status-text ${statusFade ? 'status-fade' : 'status-show'}`}
            aria-live="polite"
          >
            {STATUS_MESSAGES[statusIndex]}
          </span>
        </div>

        {/* Three Animated Loading Dots */}
        <div className="loader-dots" aria-hidden="true">
          <span className="loader-dot" />
          <span className="loader-dot" />
          <span className="loader-dot" />
        </div>

        {/* Thin Indeterminate Progress Line */}
        <div className="loader-progress-track" aria-hidden="true">
          <div className="loader-progress-indicator" />
        </div>
      </div>
    </aside>
  )
}

export default LoadingScreen
