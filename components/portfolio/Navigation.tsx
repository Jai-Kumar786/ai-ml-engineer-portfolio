'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Zap, Terminal } from 'lucide-react'

const navLinks = [
  { label: 'PROJECTS',   href: '#projects' },
  { label: 'SKILLS',     href: '#skills' },
  { label: 'EXPERIENCE', href: '#experience' },
  { label: 'CONTACT',    href: '#contact' },
]

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled]     = useState(false)
  const [scrollPct, setScrollPct]   = useState(0)
  const [active, setActive]         = useState('')
  const [time, setTime]             = useState('')

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString('en-US', { hour12: false }))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const doc   = document.documentElement
      const total = doc.scrollHeight - doc.clientHeight
      setScrollPct(total > 0 ? (doc.scrollTop / total) * 100 : 0)
      setScrolled(doc.scrollTop > 20)
      const ids = ['projects', 'skills', 'experience', 'contact']
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id)
        if (el && doc.scrollTop >= el.offsetTop - 120) { setActive(id); break }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (href: string) => {
    document.getElementById(href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' })
    setMobileOpen(false)
  }

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300"
        style={{
          background: scrolled
            ? 'linear-gradient(180deg,rgba(0,4,8,0.97) 0%,rgba(2,11,24,0.95) 100%)'
            : 'linear-gradient(180deg,rgba(0,4,8,0.6) 0%,transparent 100%)',
          borderBottom: scrolled ? '1px solid rgba(0,245,255,0.12)' : '1px solid transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          boxShadow: scrolled ? '0 4px 40px rgba(0,245,255,0.06)' : 'none',
        }}
        aria-label="Main navigation"
      >
        {/* Scroll progress bar */}
        <div
          className="absolute bottom-0 left-0 h-px transition-all duration-100"
          style={{
            width: `${scrollPct}%`,
            background: 'linear-gradient(90deg,#00f5ff,#bf00ff,#00ff41)',
            boxShadow: '0 0 8px #00f5ff88',
          }}
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">

          {/* Logo */}
          <a
            href="#"
            onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            className="flex items-center gap-2.5 group"
            aria-label="Jai Kumar Gupta — Home"
          >
            <div className="relative w-8 h-8 flex items-center justify-center flex-shrink-0">
              <div
                className="absolute inset-0 rotate-45 transition-all duration-700 group-hover:rotate-[225deg]"
                style={{ border: '1px solid #00f5ff', boxShadow: '0 0 10px #00f5ff44, inset 0 0 6px #00f5ff22' }}
              />
              <Zap className="w-3.5 h-3.5 relative z-10" style={{ color: '#00f5ff', filter: 'drop-shadow(0 0 5px #00f5ff)' }} />
            </div>
            <span
              style={{
                fontFamily: 'var(--font-display, Orbitron), monospace',
                fontSize: '1.1rem',
                fontWeight: 700,
                letterSpacing: '0.15em',
                color: '#00f5ff',
                textShadow: '0 0 14px #00f5ff88, 0 0 32px #00f5ff33',
              }}
            >
              JAI<span style={{ color: '#bf00ff', textShadow: '0 0 14px #bf00ff88' }}>.AI</span>
            </span>
          </a>

          {/* System clock — center */}
          <div className="hidden lg:flex items-center gap-2 absolute left-1/2 -translate-x-1/2 pointer-events-none">
            <Terminal className="w-3 h-3" style={{ color: '#00ff41', filter: 'drop-shadow(0 0 4px #00ff41)' }} />
            <span className="font-mono text-xs tracking-widest" style={{ color: '#00ff41', textShadow: '0 0 8px #00ff4155' }}>
              SYS_ONLINE :: {time}
            </span>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => {
              const isActive = active === link.href.replace('#', '')
              return (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="relative px-3 py-1.5 font-mono text-xs tracking-widest transition-all duration-200 group"
                  style={{ color: isActive ? '#00f5ff' : '#4a7a9b' }}
                  aria-current={isActive ? 'true' : undefined}
                >
                  {isActive && (
                    <span
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-3"
                      style={{ background: '#00f5ff', boxShadow: '0 0 6px #00f5ff' }}
                    />
                  )}
                  <span
                    className="group-hover:text-[#00f5ff] transition-colors duration-200"
                    style={{ textShadow: isActive ? '0 0 10px #00f5ff88' : undefined }}
                  >
                    {link.label}
                  </span>
                  <span
                    className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-300"
                    style={{ background: 'linear-gradient(90deg,#00f5ff,#bf00ff)' }}
                  />
                </button>
              )
            })}
            <a
              href="mailto:jaiku7867@gmail.com"
              className="ml-3 px-5 py-1.5 font-mono text-xs tracking-widest neon-btn"
            >
              HIRE_ME
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(o => !o)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            style={{ color: '#00f5ff', filter: 'drop-shadow(0 0 4px #00f5ff44)' }}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 pt-16 flex flex-col"
          style={{ background: 'rgba(0,4,8,0.97)', backdropFilter: 'blur(24px)' }}
        >
          <div className="cyber-line mx-4 mb-6" />
          <div className="flex flex-col px-6 gap-5">
            <span className="sys-label">// NAVIGATION_MENU</span>
            {navLinks.map((link, i) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-left font-mono text-base tracking-widest flex items-center gap-3 group"
                style={{ color: active === link.href.replace('#','') ? '#00f5ff' : '#4a7a9b' }}
              >
                <span className="font-mono text-xs" style={{ color: '#00ff41', textShadow: '0 0 6px #00ff41' }}>
                  0{i + 1}.
                </span>
                <span className="group-hover:text-[#00f5ff] transition-all group-hover:[text-shadow:0_0_10px_#00f5ff88]">
                  {link.label}
                </span>
              </button>
            ))}
            <div className="cyber-line mt-2" />
            <a
              href="mailto:jaiku7867@gmail.com"
              className="text-center py-2.5 font-mono text-sm tracking-widest neon-btn"
            >
              HIRE_ME
            </a>
          </div>
        </div>
      )}
    </>
  )
}
