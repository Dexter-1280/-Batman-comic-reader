import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

export default function GothamCanvas({ className = '' }) {
  const canvasRef = useRef(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = 0
    let height = 0
    let raf = 0
    let time = 0
    const rain = Array.from({ length: 95 }, (_, index) => ({
      x: (index * 83) % 1600,
      y: (index * 137) % 900,
      speed: 1.4 + (index % 5) * 0.55,
      length: 7 + (index % 4) * 3,
      alpha: 0.08 + (index % 4) * 0.025
    }))

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.max(1, Math.floor(width * dpr))
      canvas.height = Math.max(1, Math.floor(height * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      draw()
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      const glow = ctx.createRadialGradient(width * 0.77, height * 0.25, 8, width * 0.77, height * 0.25, Math.max(width, height) * 0.62)
      glow.addColorStop(0, 'rgba(202, 176, 112, 0.12)')
      glow.addColorStop(0.45, 'rgba(77, 100, 132, 0.07)')
      glow.addColorStop(1, 'rgba(5, 8, 13, 0)')
      ctx.fillStyle = glow
      ctx.fillRect(0, 0, width, height)

      ctx.save()
      ctx.translate(width * 0.78, height * 0.2)
      ctx.rotate(-0.17 + Math.sin(time * 0.0002) * 0.025)
      const beam = ctx.createLinearGradient(-width * 0.16, 0, width * 0.22, 0)
      beam.addColorStop(0, 'rgba(221, 208, 165, 0)')
      beam.addColorStop(0.5, 'rgba(221, 208, 165, 0.035)')
      beam.addColorStop(1, 'rgba(221, 208, 165, 0)')
      ctx.fillStyle = beam
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.lineTo(-width * 0.29, -height * 0.52)
      ctx.lineTo(width * 0.39, -height * 0.57)
      ctx.closePath()
      ctx.fill()
      ctx.restore()

      ctx.lineWidth = 0.75
      rain.forEach((drop) => {
        const y = (drop.y + time * drop.speed * 0.035) % (height + 24)
        ctx.strokeStyle = `rgba(171, 188, 207, ${drop.alpha})`
        ctx.beginPath()
        ctx.moveTo(drop.x % Math.max(width, 1), y)
        ctx.lineTo((drop.x - 3) % Math.max(width, 1), y + drop.length)
        ctx.stroke()
      })
    }

    const animate = (nextTime) => {
      time = nextTime
      draw()
      raf = window.requestAnimationFrame(animate)
    }

    resize()
    window.addEventListener('resize', resize)
    if (!reducedMotion) raf = window.requestAnimationFrame(animate)
    return () => {
      window.cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [reducedMotion])

  return <canvas ref={canvasRef} className={`gotham-canvas ${className}`} aria-hidden="true" />
}
