'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Download, ChevronDown } from 'lucide-react'

const ROLES = ['DATA_SCIENTIST', 'ML_ENGINEER', 'MLOPS_SPECIALIST', 'FULL_STACK_DEV', 'AI_ORCHESTRATOR']
const STATS = [
  { value: '99.99%', label: 'UPTIME',      color: '#00f5ff' },
  { value: '24.7x',  label: 'ROI',         color: '#bf00ff' },
  { value: '8.6B',   label: 'EVENTS/DAY',  color: '#00ff41' },
  { value: '95%',    label: 'AI_ACCURACY', color: '#ff0090' },
]

function HexGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let raf: number
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight }
    resize()
    window.addEventListener('resize', resize)
    const R = 30; let t = 0
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const cols = Math.ceil(canvas.width  / (R * 1.5)) + 2
      const rows = Math.ceil(canvas.height / (R * Math.sqrt(3))) + 2
      for (let col = -1; col < cols; col++) {
        for (let row = -1; row < rows; row++) {
          const x = col * R * 3
          const y = row * R * Math.sqrt(3) + (col % 2 === 0 ? 0 : R * Math.sqrt(3) / 2)
          const pulse = (Math.sin(t * 0.6 + col * 0.4 + row * 0.3) + 1) / 2
          const alpha = 0.02 + pulse * 0.07
          ctx.beginPath()
          for (let i = 0; i < 6; i++) {
            const a = (Math.PI / 3) * i - Math.PI / 6
            const px = x + R * Math.cos(a); const py = y + R * Math.sin(a)
            i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py)
          }
          ctx.closePath()
          ctx.strokeStyle = `rgba(0,245,255,${alpha})`
          ctx.lineWidth = 0.5
          ctx.stroke()
          if (pulse > 0.9) { ctx.fillStyle = `rgba(0,245,255,${(pulse - 0.9) * 0.1})`; ctx.fill() }
        }
      }
      t += 0.01
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(raf) }
  }, [])
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true" />
}

function PlasmaOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
        style={{ background: 'radial-gradient(circle,#00f5ff 0%,transparent 60%)', opacity: 0.12, animation: 'plasma 12s ease-in-out infinite', filter: 'blur(60px)' }} />
      <div className="absolute top-1/3 left-1/5 w-96 h-96 rounded-full"
        style={{ background: 'radial-gradient(circle,#bf00ff 0%,transparent 60%)', opacity: 0.1, animation: 'plasma 16s ease-in-out infinite 4s', filter: 'blur(70px)' }} />
      <div className="absolute bottom-1/3 right-1/5 w-72 h-72 rounded-full"
        style={{ background: 'radial-gradient(circle,#00ff41 0%,transparent 60%)', opacity: 0.08, animation: 'plasma 10s ease-in-out infinite 2s', filter: 'blur(55px)' }} />
      <div className="absolute bottom-1/4 left-1/3 w-56 h-56 rounded-full"
        style={{ background: 'radial-gradient(circle,#ff0090 0%,transparent 60%)', opacity: 0.07, animation: 'plasma 18s ease-in-out infinite 7s', filter: 'blur(50px)' }} />
    </div>
  )
}

function Typewriter() {
  const [display, setDisplay] = useState('')
  const [idx, setIdx]         = useState(0)
  const [del, setDel]         = useState(false)
  useEffect(() => {
    const role = ROLES[idx]
    let t: ReturnType<typeof setTimeout>
    if (!del && display.length < role.length)       t = setTimeout(() => setDisplay(role.slice(0, display.length + 1)), 75)
    else if (!del && display.length === role.length) t = setTimeout(() => setDel(true), 1600)
    else if (del && display.length > 0)              t = setTimeout(() => setDisplay(role.slice(0, display.length - 1)), 40)
    else { setDel(false); setIdx(i => (i + 1) % ROLES.length) }
    return () => clearTimeout(t)
  }, [display, del, idx])
  return (
    <span className="font-mono tracking-widest" style={{ color: '#00ff41', textShadow: '0 0 12px #00ff4188' }}>
      {display}
      <span className="inline-block w-2 h-5 ml-1 align-middle" style={{ background: '#00ff41', animation: 'termCursor 1s step-end infinite', boxShadow: '0 0 8px #00ff41' }} />
    </span>
  )
}

function StatCard({ value, label, color }: { value: string; label: string; color: string }) {
  const [vis, setVis] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, { threshold: 0.4 })
    if (ref.current) o.observe(ref.current)
    return () => o.disconnect()
  }, [])
  return (
    <div ref={ref} className="holo-card flex flex-col items-center gap-1 px-5 py-4 transition-all duration-500"
      style={{ borderColor: vis ? `${color}55` : '#0d2444', boxShadow: vis ? `0 0 24px ${color}22, 0 0 60px ${color}0a` : 'none' }}>
      <span className="font-mono text-2xl font-bold tracking-wider transition-all duration-700"
        style={{ color, textShadow: vis ? `0 0 16px ${color}99` : 'none', opacity: vis ? 1 : 0, transform: vis ? 'scale(1)' : 'scale(0.7)' }}>
        {value}
      </span>
      <span className="font-mono text-xs tracking-widest" style={{ color: '#4a7a9b' }}>{label}</span>
    </div>
  )
}

export default function Hero() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => { setTimeout(() => setMounted(true), 100) }, [])

  const delay = (ms: number) => ({ style: { animationDelay: `${ms}ms`, opacity: mounted ? 1 : 0 } })

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center overflow-hidden"
      style={{ background: 'linear-gradient(160deg,#000408 0%,#020b18 50%,#000408 100%)' }}
      aria-label="Hero — Jai Kumar Gupta">

      <HexGrid />
      <PlasmaOrbs />

      {/* Corner brackets */}
      {(['top-6 left-6','top-6 right-6','bottom-6 left-6','bottom-6 right-6'] as const).map((pos, i) => (
        <div key={i} className={`absolute ${pos} w-6 h-6 pointer-events-none`} aria-hidden="true"
          style={{
            borderTop:    i < 2 ? '1px solid rgba(0,245,255,0.5)' : undefined,
            borderBottom: i >= 2 ? '1px solid rgba(0,245,255,0.5)' : undefined,
            borderLeft:   i % 2 === 0 ? '1px solid rgba(0,245,255,0.5)' : undefined,
            borderRight:  i % 2 === 1 ? '1px solid rgba(0,245,255,0.5)' : undefined,
          }} />
      ))}

      <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-28 pb-20">

        {/* System tag */}
        <div className="flex items-center gap-3 mb-8" style={{ animation: 'slideUp 0.5s ease both' }}>
          <span className="w-2 h-2 rounded-full flex-shrink-0"
            style={{ background: '#00ff41', boxShadow: '0 0 10px #00ff41', animation: 'pulseGlow 2s ease-in-out infinite' }} />
          <span className="sys-label">// SYS_INIT :: UNIT_JAI_KUMAR_GUPTA :: STATUS_ONLINE</span>
        </div>

        {/* Headline */}
        <div className="mb-4 overflow-hidden" style={{ animation: 'slideUp 0.6s ease 0.1s both' }}>
          <h1 className="glitch font-bold leading-none"
            data-text="ARCHITECTING"
            style={{ fontFamily: 'var(--font-display,Orbitron),monospace', fontSize: 'clamp(2.2rem,7vw,6rem)', color: '#ffffff', letterSpacing: '-0.02em' }}>
            ARCHITECTING
          </h1>
          <h1 className="font-bold leading-none"
            style={{
              fontFamily: 'var(--font-display,Orbitron),monospace',
              fontSize: 'clamp(2.2rem,7vw,6rem)',
              letterSpacing: '-0.02em',
              background: 'linear-gradient(90deg,#00f5ff 0%,#bf00ff 45%,#00ff41 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              filter: 'drop-shadow(0 0 30px rgba(0,245,255,0.25))',
            }}>
            INTELLIGENCE
          </h1>
        </div>

        {/* Terminal typewriter */}
        <div className="flex items-center gap-2 mb-8 font-mono text-sm sm:text-base tracking-widest"
          style={{ animation: 'slideUp 0.6s ease 0.2s both' }}>
          <span style={{ color: '#4a7a9b' }}>root@jai-ai:~$</span>
          <Typewriter />
        </div>

        {/* Subtext */}
        <p className="font-mono text-sm sm:text-base leading-loose max-w-2xl mb-10"
          style={{ color: '#4a7a9b', animation: 'slideUp 0.6s ease 0.3s both' }}>
          <span style={{ color: '#00f5ff' }}>&gt;&gt;</span>{' '}
          Expert-level Python (9+ months) &amp; AI orchestration via LangChain, CrewAI &amp; Phidata.
          Specializing in AI agents &amp; ML models achieving{' '}
          <span style={{ color: '#00ff41', textShadow: '0 0 8px #00ff4177' }}>95% accuracy</span>.
          MLOps pipelines processing{' '}
          <span style={{ color: '#00f5ff', textShadow: '0 0 8px #00f5ff77' }}>8.6B events/day</span>{' '}
          with <span style={{ color: '#bf00ff', textShadow: '0 0 8px #bf00ff77' }}>99.99% uptime</span>{' '}
          &amp; 24.7x ROI on Azure, AWS &amp; GCP.
        </p>

        {/* Role pills */}
        <div className="flex flex-wrap gap-2 mb-10" style={{ animation: 'slideUp 0.6s ease 0.35s both' }}>
          {['DATA_SCIENTIST','ML_ENGINEER','MLOPS_SPECIALIST','FULL_STACK_DEV','AI_ORCHESTRATOR'].map((r, i) => (
            <span key={r} className="px-3 py-1 font-mono text-xs tracking-widest transition-all duration-200 cursor-default"
              style={{
                color: ['#00f5ff','#bf00ff','#00ff41','#ff0090','#ff6d00'][i],
                border: `1px solid ${['#00f5ff','#bf00ff','#00ff41','#ff0090','#ff6d00'][i]}44`,
                background: `${['#00f5ff','#bf00ff','#00ff41','#ff0090','#ff6d00'][i]}0d`,
                clipPath: 'polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%)',
              }}>
              {r}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4 mb-16" style={{ animation: 'slideUp 0.6s ease 0.4s both' }}>
          <button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="neon-btn flex items-center gap-2 px-7 py-3 font-mono text-sm tracking-widest group">
            EXPLORE_PROJECTS <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <a href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/api-attachments/ABNboQt7gFmLnfSQo77Y0-n18DvtCFSAbK60bsrbXRSOBacscf99.jpg"
            target="_blank" rel="noopener noreferrer"
            className="neon-btn neon-btn-purple flex items-center gap-2 px-7 py-3 font-mono text-sm tracking-widest">
            <Download className="w-4 h-4" /> VIEW_RESUME
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3" style={{ animation: 'slideUp 0.6s ease 0.5s both' }}>
          {STATS.map(s => <StatCard key={s.label} {...s} />)}
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10" aria-hidden="true">
        <span className="sys-label">SCROLL_DOWN</span>
        <ChevronDown className="w-4 h-4" style={{ color: '#00f5ff', animation: 'dataFlow 1.5s ease-in-out infinite', filter: 'drop-shadow(0 0 4px #00f5ff)' }} />
      </div>
    </section>
  )
}
