'use client'

import { Zap, Linkedin, Github, ArrowUpRight, Phone, Mail, Terminal } from 'lucide-react'

const expertise = [
  'MLOPS_&_PRODUCTION_AI',
  'MACHINE_LEARNING_/_DEEP_LEARNING',
  'NLP_&_TRANSFORMERS_(BERT,_LLMs)',
  'DATA_ANALYTICS_&_BI_DASHBOARDS',
  'FULL_STACK_(MERN_+_JAVA)',
  'CLOUD_INFRA_(AZURE,_AWS,_GCP)',
]

const quickLinks = [
  { label: 'PROJECTS',   href: '#projects' },
  { label: 'SKILLS',     href: '#skills' },
  { label: 'EXPERIENCE', href: '#experience' },
  { label: 'CONTACT',    href: '#contact' },
  { label: 'RESUME',     href: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/api-attachments/ABNboQt7gFmLnfSQo77Y0-n18DvtCFSAbK60bsrbXRSOBacscf99.jpg' },
]

const socials = [
  { label: 'LINKEDIN', href: 'https://linkedin.com/in/jai-kumar-gupta-805590137', icon: <Linkedin className="w-4 h-4" />, handle: 'jai-kumar-gupta', color: '#00f5ff' },
  { label: 'GITHUB',   href: 'https://github.com/Jai-Kumar786',   icon: <Github className="w-4 h-4" />, handle: 'Jai-Kumar786',   color: '#bf00ff' },
]

export default function Footer() {
  const scrollTo = (href: string) => {
    if (href.startsWith('#')) document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer role="contentinfo"
      style={{ background: '#000408', borderTop: '1px solid #0d2444' }}>

      {/* Circuit top accent */}
      <div className="h-px w-full" style={{ background: 'linear-gradient(90deg,transparent,#00f5ff66,#bf00ff66,#00ff4166,transparent)' }} aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">

          {/* Brand */}
          <div className="lg:col-span-1 flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 flex items-center justify-center flex-shrink-0"
                style={{ border: '1px solid #00f5ff44', clipPath: 'polygon(4px 0%,100% 0%,calc(100% - 4px) 100%,0% 100%)' }}>
                <Zap className="w-4 h-4" style={{ color: '#00f5ff', filter: 'drop-shadow(0 0 4px #00f5ff)' }} aria-hidden="true" />
              </div>
              <span style={{ fontFamily: 'var(--font-display,Orbitron),monospace', fontSize: '1.1rem', fontWeight: 700,
                color: '#00f5ff', textShadow: '0 0 12px #00f5ff66', letterSpacing: '0.1em' }}>
                JAI<span style={{ color: '#bf00ff', textShadow: '0 0 12px #bf00ff66' }}>.AI</span>
              </span>
            </div>
            <p className="font-mono text-xs leading-relaxed" style={{ color: '#4a7a9b' }}>
              Data Scientist, ML Engineer &amp; MLOps Specialist building production-ready intelligent systems at the intersection of research and engineering.
            </p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: '#00ff41', boxShadow: '0 0 8px #00ff41', animation: 'pulseGlow 2s ease-in-out infinite' }} />
              <span className="font-mono text-xs" style={{ color: '#00ff41', textShadow: '0 0 8px #00ff4155' }}>AVAILABLE_FOR_OPPORTUNITIES</span>
            </div>
          </div>

          {/* Expertise */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <Terminal className="w-3 h-3" style={{ color: '#00f5ff' }} aria-hidden="true" />
              <h3 className="sys-label">EXPERTISE</h3>
            </div>
            <ul className="flex flex-col gap-2.5" role="list">
              {expertise.map(item => (
                <li key={item}
                  className="font-mono text-xs tracking-wide transition-colors duration-150 cursor-default"
                  style={{ color: '#2a4a5b' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#00f5ff')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#2a4a5b')}>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <Terminal className="w-3 h-3" style={{ color: '#bf00ff' }} aria-hidden="true" />
              <h3 className="sys-label" style={{ color: '#bf00ff', textShadow: '0 0 6px #bf00ff55' }}>QUICK_LINKS</h3>
            </div>
            <ul className="flex flex-col gap-2.5" role="list">
              {quickLinks.map(link => (
                <li key={link.label}>
                  {link.href.startsWith('#') ? (
                    <button onClick={() => scrollTo(link.href)}
                      className="font-mono text-xs tracking-widest transition-colors duration-150"
                      style={{ color: '#2a4a5b' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#00f5ff')}
                      onMouseLeave={e => (e.currentTarget.style.color = '#2a4a5b')}>
                      {link.label}
                    </button>
                  ) : (
                    <a href={link.href} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-mono text-xs tracking-widest transition-colors duration-150"
                      style={{ color: '#2a4a5b' }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#00f5ff')}
                      onMouseLeave={e => (e.currentTarget.style.color = '#2a4a5b')}>
                      {link.label} <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <Terminal className="w-3 h-3" style={{ color: '#00ff41' }} aria-hidden="true" />
              <h3 className="sys-label" style={{ color: '#00ff41', textShadow: '0 0 6px #00ff4155' }}>CONNECT</h3>
            </div>
            <div className="flex flex-col gap-3">
              {socials.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 font-mono text-xs tracking-widest transition-all duration-200 p-2.5 group"
                  style={{ color: '#4a7a9b', border: '1px solid #0d2444', background: '#050f20',
                    clipPath: 'polygon(4px 0%,100% 0%,calc(100% - 4px) 100%,0% 100%)' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = s.color + '66'; (e.currentTarget as HTMLAnchorElement).style.color = s.color }}
                  onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.borderColor = '#0d2444'; (e.currentTarget as HTMLAnchorElement).style.color = '#4a7a9b' }}
                  aria-label={`Visit ${s.label} profile`}>
                  {s.icon}
                  <span>@{s.handle}</span>
                </a>
              ))}
              <a href="mailto:jaiku7867@gmail.com"
                className="flex items-center gap-2 font-mono text-xs tracking-widest transition-colors duration-150"
                style={{ color: '#2a4a5b' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#00f5ff')}
                onMouseLeave={e => (e.currentTarget.style.color = '#2a4a5b')}>
                <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                jaiku7867@gmail.com
              </a>
              <a href="tel:+918953947619"
                className="flex items-center gap-2 font-mono text-xs tracking-widest transition-colors duration-150"
                style={{ color: '#2a4a5b' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#bf00ff')}
                onMouseLeave={e => (e.currentTarget.style.color = '#2a4a5b')}>
                <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                +91 89539 47619
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderTop: '1px solid #0d2444' }}>
          <p className="font-mono text-xs" style={{ color: '#2a4a5b' }}>
            &copy; 2026 JAI_KUMAR_GUPTA. ALL_RIGHTS_RESERVED.
          </p>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs" style={{ color: '#2a4a5b' }}>LET'S_BUILD_INTELLIGENCE_TOGETHER</span>
            <span className="font-mono text-xs" style={{ color: '#4a7a9b' }}>//</span>
            <a href="mailto:jaiku7867@gmail.com" className="font-mono text-xs transition-all duration-150"
              style={{ color: '#00f5ff', textShadow: '0 0 8px #00f5ff44' }}
              onMouseEnter={e => (e.currentTarget.style.textShadow = '0 0 14px #00f5ff')}
              onMouseLeave={e => (e.currentTarget.style.textShadow = '0 0 8px #00f5ff44')}>
              INIT_CONTACT &rarr;
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
