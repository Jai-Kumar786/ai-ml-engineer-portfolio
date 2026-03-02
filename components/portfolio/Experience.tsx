'use client'

import { useEffect, useRef, useState } from 'react'
import { Briefcase, GraduationCap, Award, ExternalLink, Terminal } from 'lucide-react'

interface TimelineItem {
  role: string; company: string; period: string; location: string; type: 'work' | 'education'
  bullets: string[]; tags?: string[]; subProjects?: { title: string; period: string; stack: string }[]
}

const timeline: TimelineItem[] = [
  {
    role: 'Data Science Intern', company: 'Unified Mentor Pvt. Ltd.', period: 'Sept 2025 — Mar 2026',
    location: 'Gurugram, India', type: 'work',
    bullets: [
      'Developed and executed the Indian Agricultural Market Analysis and EV Predictive Maintenance System projects, covering the full lifecycle of data collection, cleaning, EDA, and predictive modeling.',
      'Leveraged Python, Pandas, and NumPy alongside machine learning algorithms to derive actionable insights from real-world problem statements.',
      'Commended for strong problem-solving abilities, an eagerness to learn new concepts, and a commitment to continuous improvement based on technical feedback.',
    ],
    tags: ['Python', 'Pandas', 'NumPy', 'Machine Learning', 'Data Visualization', 'EDA'],
    subProjects: [
      { title: 'Indian Agricultural Market Analysis', period: 'Sept 2025 — Mar 2026', stack: 'Python, Pandas, NumPy, Data Visualization, EDA' },
      { title: 'EV Predictive Maintenance System', period: 'Sept 2025 — Mar 2026', stack: 'Python, Machine Learning, Predictive Modeling, NumPy' },
    ]
  },
  {
    role: 'Data Analyst Intern', company: 'Labmentix Pvt. Ltd.', period: 'Aug 2025 — Feb 2026',
    location: 'Bengaluru, India', type: 'work',
    bullets: [
      'Achieved 40% improvement in data processing efficiency through execution of data cleaning, data analysis, and data visualization projects using Python and SQL.',
      'Delivered 25% improvement in strategic decision-making by collaborating with cross-functional teams providing analytical insights.',
      'Ensured 95% data quality and attention to detail across multiple data analysis projects.',
      'Achievement: TCS iON MLOps Expert certification (86%) during tenure — application-oriented knowledge in production ML systems.',
    ],
    tags: ['Python', 'SQL', 'Power BI', 'Tableau', 'Streamlit', 'Excel', 'Data Analysis']
  },
  {
    role: 'Machine Learning & Data Science Intern', company: 'Feynn Labs Services', period: 'Oct 2025 — Dec 2025',
    location: 'Remote', type: 'work',
    bullets: [
      'Achieved 78.3% market coverage and projected 8% revenue growth through market segmentation analysis on 1,431 consumer records using K-means and hierarchical clustering.',
      'Delivered 15% enhancement in business solution development through creation of AI product prototypes and financial models.',
      'Enhanced business intelligence by 20% through demographic, behavioral, and psychographic data analysis.',
      'Enhanced analytical capabilities by 25% through developing 15+ business intelligence SQL queries.',
    ],
    tags: ['Python', 'K-means', 'Clustering', 'Scikit-learn', 'Pandas', 'SQL', 'Market Analysis', 'AI Prototyping'],
    subProjects: [
      { title: "McDonald's Market Segmentation & Analysis", period: 'Oct–Nov 2025', stack: 'K-means, Hierarchical Clustering, Python, Scikit-learn' },
      { title: 'Netflix Sentiment Analysis & Content Recommendation', period: 'Sept–Oct 2025', stack: 'Python, BERT, NLP, Sentiment Analysis, Transformers' },
      { title: 'Airbnb Pricing Prediction Model', period: 'Sept–Oct 2025', stack: 'Python, Scikit-learn, XGBoost, Feature Engineering' },
    ]
  },
  {
    role: 'Data Science Intern — AI & ML Skilling Program', company: 'AICTE × Vodafone Idea Foundation × Edunet × BSNL',
    period: '25 Nov 2025 — 26 Dec 2025', location: 'Remote, India', type: 'work',
    bullets: [
      'Completed government-backed AI & ML Skilling Program in partnership with IGNOU, Vodafone Idea Foundation, BSNL, and Department of Telecommunications.',
      'Gained expertise in data analysis with Large Language Models, enhancing analytical capabilities for complex data sets.',
      'Achieved 85% prediction accuracy in Airbnb pricing model and developed Netflix sentiment data analysis system.',
      'Improved data processing efficiency by 30% through implementation of advanced NLP techniques.',
    ],
    tags: ['LLMs', 'NLP', 'Python', 'AI & ML', 'Telecom', 'IGNOU', 'Vodafone', 'BSNL', 'Edunet', 'Predictive Modeling']
  },
  {
    role: 'Web Developer', company: 'Innomatics Research Labs', period: 'June 2023 — Mar 2024',
    location: 'Remote, India', type: 'work',
    bullets: [
      'Achieved 20% improvement in user engagement through development of full-stack web applications using MERN Stack.',
      'Delivered 30% enhancement in system integration through building enterprise solutions with Java Spring Boot and RESTful APIs.',
      'Improved user experience by 25% through seamless frontend and backend integration.',
    ],
    tags: ['MERN Stack', 'Java', 'Spring Boot', 'RESTful APIs', 'MongoDB', 'React.js', 'Node.js'],
    subProjects: [
      { title: 'ToDo Application (MERN Stack)', period: 'Jan 2024 — Dec 2024', stack: 'React.js, Node.js, Express.js, MongoDB, JWT, RESTful APIs' },
      { title: 'Engineering Materials: Data-Driven Analysis', period: 'Apr–May 2025', stack: 'Python, Pandas, Seaborn, Matplotlib, Plotly' },
    ]
  },
  {
    role: 'Advanced Nanodegree — Data Science & AI/ML for Engineering Applications',
    company: 'DIYguru Mobility Pvt. Ltd. (Certified by EICT, IIT Guwahati — Accredited by AICTE)',
    period: 'Jan 2025 — Nov 2025', location: 'Remote, India', type: 'education',
    bullets: [
      'Comprehensive advanced program covering production MLOps systems, transformer-based NLP, LLM fine-tuning, and enterprise AI deployment.',
      'Built end-to-end AI pipelines processing 8.6B events/day with 99.99% uptime and 24.7x ROI on Azure.',
      'Deep focus on BERT, LLMs, LangChain, CrewAI, AI agents, and scalable distributed systems.',
    ],
    tags: ['MLOps', 'NLP', 'BERT', 'LLMs', 'LangChain', 'AI Agents', 'Distributed Systems']
  },
  {
    role: 'MLOps — Scalable ML Operations (Associate Level)',
    company: 'IIT Madras Pravartak Technologies Foundation & TCS iON',
    period: 'Sept 2025 — Dec 2025', location: 'Remote, India', type: 'education',
    bullets: [
      'Certificate ID: 26130110837 — Issue Date: 11/12/2025.',
      'Comprehensive training in ML model deployment, CI/CD pipelines, model monitoring, and production systems.',
    ],
    tags: ['CI/CD', 'MLflow', 'Kubernetes', 'Model Monitoring', 'Docker']
  },
  {
    role: 'Master of Computer Applications (MCA)',
    company: 'Indira Gandhi National Open University (IGNOU)',
    period: 'July 2022 — Dec 2025', location: 'Delhi, India', type: 'education',
    bullets: ['First Division — Overall Score: 62%.', 'Specialized in advanced algorithms, distributed systems, AI/ML, and full-stack development.'],
    tags: ['Algorithms', 'AI/ML', 'Full-Stack', 'Distributed Systems']
  },
  {
    role: 'Post Graduate Diploma in Computer Applications (PGDCA)',
    company: 'Indira Gandhi National Open University (IGNOU)',
    period: 'Jan 2021 — June 2022', location: 'Delhi, India', type: 'education',
    bullets: ['First Division — Overall Score: 68%.', 'Foundation in programming, database management, networking, and software engineering.'],
    tags: ['Programming', 'DBMS', 'Networking', 'Software Engineering']
  },
  {
    role: 'Bachelor of Arts (BA)', company: 'Chhatrapati Shahu Ji Maharaj University',
    period: 'Jan 2017 — Dec 2020', location: 'Kanpur, India', type: 'education',
    bullets: ['Second Division — Overall Score: 54%.'], tags: []
  },
]

const certifications = [
  { name: 'TCS iON NPT — Machine Learning Operations (Expert)', issuer: 'Tata Consultancy Services', year: 'Jan 2026', detail: 'Score: 86% • App Score: 50/50 (Perfect) • Valid Jan 2028 • ID: 26020211015' },
  { name: 'MLOps — Scalable ML Operations (Associate)', issuer: 'IIT Madras Pravartak & TCS iON', year: 'Dec 2025', detail: 'Certificate ID: 26130110837 • Issue: 11/12/2025' },
  { name: 'Skilling Program — AI & ML in Emerging Technologies', issuer: 'Vodafone Idea Foundation × BSNL × Edunet × IGNOU', year: 'Dec 2025', detail: '25 Nov – 26 Dec 2025 • TIRTC & BRBRAITT, Dept. of Telecommunications' },
  { name: 'Advanced Nanodegree — Data Science & AI/ML', issuer: 'EICT IIT Guwahati (AICTE Accredited)', year: 'Nov 2025', detail: 'Via DIYguru Mobility Pvt. Ltd.' },
  { name: '15+ Professional Certifications', issuer: 'IIT Madras, Harvard, NIELIT & others', year: '2023–2026', detail: 'Deep Learning, NLP, Cloud, Full-Stack, Data Science' },
]

function TimelineEntry({ item, index }: { item: TimelineItem; index: number }) {
  const ref = useRef<HTMLElement>(null)
  const [vis, setVis] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  const isWork = item.type === 'work'
  const color = isWork ? '#00f5ff' : '#bf00ff'

  return (
    <article ref={ref} className="relative pl-14 group"
      style={{
        opacity: vis ? 1 : 0, transform: vis ? 'translateX(0)' : 'translateX(-24px)',
        transition: 'opacity 0.6s ease, transform 0.6s ease', transitionDelay: `${index * 60}ms`
      }}>

      {/* Dot */}
      <div className="absolute left-3.5 top-2 w-3 h-3 transition-all duration-500"
        style={{
          border: `1px solid ${color}`, background: vis ? color : '#000408',
          transform: vis ? 'scale(1.2)' : 'scale(1)', transitionDelay: `${index * 60 + 300}ms`,
          boxShadow: vis ? `0 0 10px ${color}88` : 'none',
          clipPath: 'polygon(50% 0%,100% 50%,50% 100%,0% 50%)',
        }} aria-hidden="true" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            {isWork
              ? <Briefcase className="w-3.5 h-3.5 flex-shrink-0" style={{ color }} aria-hidden="true" />
              : <GraduationCap className="w-3.5 h-3.5 flex-shrink-0" style={{ color }} aria-hidden="true" />}
            <h3 className="font-mono text-sm font-bold leading-snug" style={{ color: '#e2f0ff' }}>{item.role}</h3>
          </div>
          <p className="font-mono text-xs pl-5 font-medium" style={{ color }}>
            {item.company}
          </p>
          <p className="font-mono text-xs pl-5 mt-0.5" style={{ color: '#4a7a9b' }}>{item.location}</p>
        </div>
        <span className="font-mono text-xs px-3 py-1 flex-shrink-0 self-start"
          style={{
            color: '#4a7a9b', border: '1px solid #0d2444', background: '#050f20',
            clipPath: 'polygon(4px 0%,100% 0%,calc(100% - 4px) 100%,0% 100%)'
          }}>
          {item.period}
        </span>
      </div>

      {/* Bullets */}
      <ul className="flex flex-col gap-1.5 mb-3">
        {item.bullets.map((b, i) => (
          <li key={i} className="flex gap-2 font-mono text-xs leading-relaxed" style={{ color: '#6a8a9b' }}>
            <span className="mt-1.5 w-1 h-1 flex-shrink-0" style={{ background: color, boxShadow: `0 0 4px ${color}` }} aria-hidden="true" />
            {b}
          </li>
        ))}
      </ul>

      {/* Sub-projects */}
      {item.subProjects && item.subProjects.length > 0 && (
        <div className="mb-3 ml-1 pl-4 flex flex-col gap-2" style={{ borderLeft: `1px solid ${color}33` }}>
          <p className="font-mono text-xs uppercase tracking-widest mb-1" style={{ color: '#4a7a9b' }}>
            {'// PROJECTS_DELIVERED'}
          </p>
          {item.subProjects.map(sp => (
            <div key={sp.title} className="flex flex-col gap-0.5">
              <p className="font-mono text-xs font-semibold" style={{ color }}>{sp.title}</p>
              <p className="font-mono text-xs" style={{ color: '#4a7a9b' }}>{sp.period} — <em>{sp.stack}</em></p>
            </div>
          ))}
        </div>
      )}

      {/* Tags */}
      {item.tags && item.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {item.tags.map(tag => (
            <span key={tag} className="font-mono text-xs px-2 py-0.5 tracking-wide"
              style={{
                color: isWork ? color : '#6a6a9b',
                border: `1px solid ${isWork ? color + '44' : '#1a1a3a'}`,
                background: isWork ? color + '0d' : '#050510',
                clipPath: 'polygon(3px 0%,100% 0%,calc(100% - 3px) 100%,0% 100%)'
              }}>
              {tag}
            </span>
          ))}
        </div>
      )}
    </article>
  )
}

function TimelineLine() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState('0%')
  useEffect(() => {
    const onScroll = () => {
      const r = containerRef.current?.getBoundingClientRect()
      if (!r) return
      const p = Math.max(0, Math.min(1, (window.innerHeight - r.top) / (r.height + window.innerHeight * 0.3)))
      setHeight(`${p * 100}%`)
    }
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <div ref={containerRef} className="absolute left-5 top-2 bottom-2 w-px" style={{ background: '#0d2444' }} aria-hidden="true">
      <div className="absolute top-0 left-0 w-full" style={{ height, background: 'linear-gradient(180deg,#00f5ff,#bf00ff55)', transition: 'height 0.1s linear', boxShadow: '0 0 8px #00f5ff44' }} />
    </div>
  )
}

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 overflow-hidden"
      style={{ background: '#000408' }} aria-labelledby="experience-heading">

      {/* Grid texture */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true"
        style={{ backgroundImage: 'linear-gradient(rgba(0,245,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(0,245,255,0.02) 1px,transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-2 mb-3">
            <Terminal className="w-4 h-4" style={{ color: '#00ff41', filter: 'drop-shadow(0 0 4px #00ff41)' }} />
            <span className="sys-label">// MODULE: EXPERIENCE_LOG</span>
          </div>
          <h2 id="experience-heading"
            className="font-bold mb-4 text-balance"
            style={{
              fontFamily: 'var(--font-display,Orbitron),monospace', fontSize: 'clamp(1.6rem,4vw,2.8rem)',
              background: 'linear-gradient(90deg,#ffffff 0%,#00f5ff 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'
            }}>
            EXPERIENCE_&amp;_EDUCATION
          </h2>
          <p className="font-mono text-sm max-w-xl leading-relaxed" style={{ color: '#4a7a9b' }}>
            5 internships across ML, data science, and full-stack development — grounded in real-world impact, with certifications from IIT Madras, IIT Guwahati, and TCS iON.
          </p>
          <div className="cyber-line w-32 mt-6" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Timeline */}
          <div className="lg:col-span-2">
            <div className="relative">
              <TimelineLine />
              <div className="flex flex-col gap-10">
                {timeline.map((item, i) => <TimelineEntry key={i} item={item} index={i} />)}
              </div>
            </div>
          </div>

          {/* Certs sidebar */}
          <aside className="lg:col-span-1" aria-labelledby="certs-heading">
            <div className="sticky top-24">
              <div className="flex items-center gap-2 mb-6">
                <Award className="w-4 h-4" style={{ color: '#00f5ff', filter: 'drop-shadow(0 0 4px #00f5ff)' }} aria-hidden="true" />
                <h3 id="certs-heading" className="font-mono text-sm font-bold tracking-widest" style={{ color: '#e2f0ff' }}>
                  // CERTIFICATIONS
                </h3>
              </div>
              <div className="flex flex-col gap-3">
                {certifications.map((cert, i) => (
                  <div key={i} className="holo-card p-4 group transition-all duration-200 hover:-translate-y-0.5">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="font-mono text-xs font-semibold leading-snug" style={{ color: '#e2f0ff' }}>{cert.name}</p>
                      <ExternalLink className="w-3 h-3 flex-shrink-0 mt-0.5 opacity-30 group-hover:opacity-70 transition-opacity" style={{ color: '#00f5ff' }} aria-hidden="true" />
                    </div>
                    <p className="font-mono text-xs" style={{ color: '#4a7a9b' }}>{cert.issuer}</p>
                    {cert.detail && <p className="font-mono text-xs italic mt-0.5" style={{ color: '#2a4a5b' }}>{cert.detail}</p>}
                    <span className="inline-block mt-2 font-mono text-xs px-2 py-0.5"
                      style={{
                        color: '#00f5ff', border: '1px solid #00f5ff33', background: '#00f5ff08',
                        clipPath: 'polygon(3px 0%,100% 0%,calc(100% - 3px) 100%,0% 100%)'
                      }}>
                      {cert.year}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
