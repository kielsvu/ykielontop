'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import BlackHole from '@/components/BlackHole'
import Statistics from '@/components/sections/Statistics'
import WelcomeScreen from '@/components/WelcomeScreen'
import { hasPlayedIntro, setIntroPlayed } from '@/lib/introState'

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(false)
  const [showApp, setShowApp] = useState(true)

  useEffect(() => {
    if (window.location.pathname === '/') {
      window.history.scrollRestoration = 'manual'
      window.scrollTo(0, 0)
    }

    const navEntries = performance.getEntriesByType('navigation')
    const navigationType =
      navEntries.length > 0
        ? (navEntries[0] as PerformanceNavigationTiming).type
        : null

    const isReload = navigationType === 'reload'
    if (isReload && window.location.pathname === '/') {
      sessionStorage.removeItem('introPlayed')
      sessionStorage.removeItem('heroPlayed')
      sessionStorage.removeItem('navbarPlayed')
      window.scrollTo({ top: 0, behavior: 'instant' })
    }

    if (!hasPlayedIntro()) {
      setShowWelcome(true)
      setShowApp(false)

      const timer = setTimeout(() => {
        setShowWelcome(false)
        setShowApp(true)
        setIntroPlayed()
      }, 2800)

      return () => clearTimeout(timer)
    }

    setShowWelcome(false)
    setShowApp(true)
  }, [])

  return (
    <main style={{ position: 'relative', overflow: 'hidden' }}>
      <BlackHole
        particleCount={900}
        particleSize={3}
        colors={['#B284FF', '#D6BEFF', '#FFFFFF']}
        outerRadius={100}
        tilt={18}
        tiltSideway={160}
        trail={46}
        orbitSpeed={4}
        pullSpeed={0}
      />

      <div style={{ position: 'relative', zIndex: 2 }}>
        <section id="home" style={{ minHeight: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '72px 24px 28px' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={showApp ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{ width: '100%', maxWidth: 760, textAlign: 'center' }}
          >
            <div
              style={{
                width: 128,
                height: 128,
                margin: '0 auto 18px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '1px solid var(--border)',
                background: 'var(--bg-card)',
              }}
            >
              <img
                src="/assets/PP.png"
                alt="Ykiel profile"
                draggable={false}
                onContextMenu={(event) => event.preventDefault()}
                onDragStart={(event) => event.preventDefault()}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  userSelect: 'none',
                  WebkitTouchCallout: 'none',
                }}
              />
            </div>

            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: '0.2em', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              ykiel Documentation
            </span>

            <h1 style={{ margin: '12px 0 14px', fontSize: 'clamp(52px, 11vw, 92px)', lineHeight: 0.95, letterSpacing: '-0.06em', fontWeight: 800 }}>
              ykiel
            </h1>

            <p style={{ maxWidth: 560, margin: '0 auto', color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.8 }}>
              A personal record of ykiel's server wipe activity
            </p>
          </motion.div>
        </section>

        {showApp && <Statistics />}
      </div>

      <AnimatePresence>
        {showWelcome && (
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            onAnimationStart={(definition) => {
              if (definition === 'exit') setShowApp(true)
            }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
            style={{ position: 'fixed', inset: 0, zIndex: 9999 }}
          >
            <WelcomeScreen />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}
