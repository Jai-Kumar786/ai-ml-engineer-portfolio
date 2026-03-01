'use client'

import { useState } from 'react'
import { Mail, MapPin, Linkedin, Github, Send, CheckCircle, Phone, Terminal, Zap } from 'lucide-react'

interface FormState { name: string; email: string; message: string }

export default function Contact() {
  const [form, setForm]       = useState<FormState>({ name: '', email: '', message: '' })
  const [submitted, setSub]   = useState(false)
  const [loading, setLoad]    = useState(false)
  const [errors, setErrors]   = useState<Partial<FormState>>({})

  const validate = () => {
    const e: Partial<FormState> = {}
    if (!form.name.trim())    e.name    = 'NAME_REQUIRED'
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'VALID_EMAIL_REQUIRED'
    if (!form.message.trim() || form.message.trim().length < 10) e.message = 'MIN_10_CHARS'
    setErrors(e); return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); if (!validate()) return
    setLoad(true); await new Promise(r => setTimeout(r, 1200)); setLoad(false)
    setSub(true); setForm({ name: '', email: '', message: '' })
  }

  const fieldStyle = (field: keyof FormState) => ({
    background: '#050f20',
    border: `1px solid ${errors[field] ? '#ff003c' : '#0d2444'}`,
    color: '#e2f0ff',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.8rem',
    letterSpacing: '0.05em',
    outline: 'none',
    transition: 'border-color 0.2s ease',
    clipPath: 'polygon(4px 0%,100% 0%,calc(100% - 4px) 100%,0% 100%)',
  } as React.CSSProperties)

  const contactItems = [
    { icon: <Mail  className="w-4 h-4" />, label: 'EMAIL', value: 'jaiku7867@gmail.com', href: 'mailto:jaiku7867@gmail.com', color: '#00f5ff' },
    { icon: <Phone className="w-4 h-4" />, label: 'PHONE', value: '+91 89539 47619',     href: 'tel:+918953947619',        color: '#bf00ff' },
    { icon: <MapPin className="w-4 h-4" />,label: 'LOCATION',value: 'Hardoi, UP, India — Open to Remote', href: null,    color: '#00ff41' },
  ]
  const socialLinks = [
    { icon: <Linkedin className="w-4 h-4" />, label: 'LINKEDIN', href: 'https://linkedin.com/in/jai-kumar-gupta-805590137', color: '#00f5ff' },
    { icon: <Github   className="w-4 h-4" />, label: 'GITHUB',   href: 'https://github.com/Jai-Kumar786',                   color: '#bf00ff' },
  ]

  return (
    <section id="contact" className="relative py-24 overflow-hidden"
      style={{ background: '#020b18' }} aria-labelledby="contact-heading">

      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
        style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 100%,rgba(0,245,255,0.05),transparent 70%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-2 mb-3">
            <Terminal className="w-4 h-4" style={{ color: '#ff0090', filter: 'drop-shadow(0 0 4px #ff0090)' }} />
            <span className="sys-label" style={{ color: '#ff0090', textShadow: '0 0 8px #ff009055' }}>
              // MODULE: ESTABLISH_CONNECTION
            </span>
          </div>
          <h2 id="contact-heading"
            className="font-bold mb-4 text-balance"
            style={{ fontFamily: 'var(--font-display,Orbitron),monospace', fontSize: 'clamp(1.6rem,4vw,2.8rem)',
              background: 'linear-gradient(90deg,#ff0090 0%,#00f5ff 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            LET'S_BUILD_INTELLIGENCE
          </h2>
          <p className="font-mono text-sm max-w-xl leading-relaxed" style={{ color: '#4a7a9b' }}>
            Whether you have a project in mind, want to collaborate, or just want to talk AI — my uplink is always open.
          </p>
          <div className="cyber-line w-32 mt-6" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Info sidebar */}
          <aside className="lg:col-span-2 flex flex-col gap-4">
            {contactItems.map(info => (
              <div key={info.label} className="holo-card p-4 flex items-center gap-4 group transition-all duration-200 hover:-translate-y-0.5">
                <div className="flex items-center justify-center w-10 h-10 flex-shrink-0 transition-all duration-200"
                  style={{ border: `1px solid ${info.color}44`, background: `${info.color}0d`, color: info.color,
                    filter: 'none', clipPath: 'polygon(4px 0%,100% 0%,calc(100% - 4px) 100%,0% 100%)',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.filter = `drop-shadow(0 0 6px ${info.color})`)}
                  onMouseLeave={e => (e.currentTarget.style.filter = 'none')}>
                  {info.icon}
                </div>
                <div className="min-w-0">
                  <p className="font-mono text-xs mb-0.5" style={{ color: '#4a7a9b' }}>{info.label}</p>
                  {info.href ? (
                    <a href={info.href} className="font-mono text-sm font-semibold break-all transition-colors duration-200"
                      style={{ color: '#e2f0ff' }}
                      onMouseEnter={e => (e.currentTarget.style.color = info.color)}
                      onMouseLeave={e => (e.currentTarget.style.color = '#e2f0ff')}>
                      {info.value}
                    </a>
                  ) : (
                    <p className="font-mono text-sm font-semibold" style={{ color: '#e2f0ff' }}>{info.value}</p>
                  )}
                </div>
              </div>
            ))}

            <div className="holo-card p-4">
              <p className="sys-label mb-4">// ONLINE_PRESENCE</p>
              <div className="flex flex-col gap-3">
                {socialLinks.map(link => (
                  <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-2.5 font-mono text-sm tracking-widest transition-all duration-200 group"
                    style={{ border: `1px solid #0d2444`, background: '#050f20', color: '#4a7a9b',
                      clipPath: 'polygon(4px 0%,100% 0%,calc(100% - 4px) 100%,0% 100%)' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = link.color + '66'; (e.currentTarget as HTMLAnchorElement).style.color = link.color }}
                    onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = '#0d2444'; (e.currentTarget as HTMLAnchorElement).style.color = '#4a7a9b' }}
                    aria-label={`Visit ${link.label} profile`}>
                    {link.icon}
                    <span>{link.label}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 holo-card" style={{ borderColor: '#00ff4133' }}>
              <div className="relative w-3 h-3 flex-shrink-0">
                <span className="absolute inset-0 rounded-full" style={{ background: '#00ff41', animation: 'pulseGlow 2s ease-in-out infinite' }} />
                <span className="absolute inset-0.5 rounded-full" style={{ background: '#00ff41' }} />
              </div>
              <p className="font-mono text-xs tracking-widest" style={{ color: '#00ff41', textShadow: '0 0 8px #00ff4166' }}>
                STATUS: OPEN_TO_NEW_OPPORTUNITIES
              </p>
            </div>
          </aside>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="holo-card p-6 sm:p-8">
              {submitted ? (
                <div className="flex flex-col items-center justify-center text-center py-16 gap-5">
                  <div className="relative w-16 h-16 flex items-center justify-center"
                    style={{ border: '1px solid #00f5ff55', clipPath: 'polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)', background: '#00f5ff0d' }}>
                    <CheckCircle className="w-7 h-7" style={{ color: '#00f5ff', filter: 'drop-shadow(0 0 8px #00f5ff)' }} />
                  </div>
                  <div>
                    <p className="sys-label mb-2">// TRANSMISSION_COMPLETE</p>
                    <h3 className="font-mono text-base font-bold mb-2" style={{ color: '#00f5ff', textShadow: '0 0 10px #00f5ff88' }}>
                      MESSAGE_SENT
                    </h3>
                    <p className="font-mono text-sm" style={{ color: '#4a7a9b' }}>
                      Signal received. Response within 24hrs.
                    </p>
                  </div>
                  <button onClick={() => setSub(false)}
                    className="font-mono text-sm tracking-widest neon-btn px-5 py-2">
                    NEW_TRANSMISSION
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
                  <p className="sys-label mb-1">// COMPOSE_TRANSMISSION</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="name" className="sys-label">
                        NAME <span style={{ color: '#ff003c' }}>*</span>
                      </label>
                      <input id="name" type="text" placeholder="Your name..." value={form.name}
                        onChange={e => { setForm({ ...form, name: e.target.value }); if (errors.name) setErrors({ ...errors, name: undefined }) }}
                        className="w-full px-4 py-2.5 placeholder-[#2a4a5b]"
                        style={fieldStyle('name')}
                        onFocus={e => (e.target.style.borderColor = '#00f5ff55')}
                        onBlur={e => (e.target.style.borderColor = errors.name ? '#ff003c' : '#0d2444')}
                        autoComplete="name" />
                      {errors.name && <p className="font-mono text-xs" style={{ color: '#ff003c' }} role="alert">ERR: {errors.name}</p>}
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="email" className="sys-label">
                        EMAIL <span style={{ color: '#ff003c' }}>*</span>
                      </label>
                      <input id="email" type="email" placeholder="you@example.com" value={form.email}
                        onChange={e => { setForm({ ...form, email: e.target.value }); if (errors.email) setErrors({ ...errors, email: undefined }) }}
                        className="w-full px-4 py-2.5 placeholder-[#2a4a5b]"
                        style={fieldStyle('email')}
                        onFocus={e => (e.target.style.borderColor = '#00f5ff55')}
                        onBlur={e => (e.target.style.borderColor = errors.email ? '#ff003c' : '#0d2444')}
                        autoComplete="email" />
                      {errors.email && <p className="font-mono text-xs" style={{ color: '#ff003c' }} role="alert">ERR: {errors.email}</p>}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="message" className="sys-label">
                      MESSAGE <span style={{ color: '#ff003c' }}>*</span>
                    </label>
                    <textarea id="message" rows={6} placeholder="Describe your project or idea..." value={form.message}
                      onChange={e => { setForm({ ...form, message: e.target.value }); if (errors.message) setErrors({ ...errors, message: undefined }) }}
                      className="w-full px-4 py-2.5 placeholder-[#2a4a5b] resize-none"
                      style={fieldStyle('message')}
                      onFocus={e => (e.target.style.borderColor = '#00f5ff55')}
                      onBlur={e => (e.target.style.borderColor = errors.message ? '#ff003c' : '#0d2444')} />
                    {errors.message && <p className="font-mono text-xs" style={{ color: '#ff003c' }} role="alert">ERR: {errors.message}</p>}
                  </div>

                  <button type="submit" disabled={loading}
                    className="neon-btn flex items-center justify-center gap-2 px-8 py-3 font-mono text-sm tracking-widest self-start disabled:opacity-50 disabled:cursor-not-allowed">
                    {loading ? (
                      <><span className="w-4 h-4 border-2 border-[#00f5ff] border-t-transparent rounded-full animate-spin" />TRANSMITTING...</>
                    ) : (
                      <><Send className="w-4 h-4" />SEND_TRANSMISSION</>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
