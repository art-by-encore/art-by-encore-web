'use client'
import { useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis'

export default function SmoothLayout({ children }) {
  const lenisRef = useRef(null)
  const rafRef = useRef(null)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 769px)')

    const startLenis = () => {
      if (lenisRef.current) return

      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
        smoothTouch: false,
      })

      lenisRef.current = lenis

      const raf = (time) => {
        lenis.raf(time)
        rafRef.current = requestAnimationFrame(raf)
      }

      rafRef.current = requestAnimationFrame(raf)
      console.log('Lenis enabled (desktop)')
    }

    const stopLenis = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }

      if (lenisRef.current) {
        lenisRef.current.destroy()
        lenisRef.current = null
        console.log('Lenis disabled (mobile)')
      }
    }

    const handleChange = (e) => {
      e.matches ? startLenis() : stopLenis()
    }

    // Initial check
    handleChange(mediaQuery)

    // Listen for breakpoint changes
    mediaQuery.addEventListener('change', handleChange)

    return () => {
      mediaQuery.removeEventListener('change', handleChange)
      stopLenis()
    }
  }, [])

  return <>{children}</>
}
