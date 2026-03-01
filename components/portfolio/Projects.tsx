'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { ArrowUpRight, Terminal } from 'lucide-react'

interface Project {
  id: number; title: string; description: string; highlights: string[]
  tags: string[]; image: string; imageAlt: string; category: string; period: string; link: string
}

const projects: Project[] = [
  { id: 1, title: 'Production MLOps Architecture for Predictive Maintenance (Azure)',
    description: 'End-to-end automated production data pipeline on Azure with MLOps practices, Docker, Kubernetes, and FastAPI — achieving 99.99% uptime, 24.7x ROI, and $52K/year cost savings.',
    highlights: ['99.99% uptime & 24.7x ROI on Azure production pipeline','92% F1 score with automated drift detection & retraining','65% infrastructure cost reduction ($52K/year) via Terraform IaC'],
    tags: ['Azure','MLOps','Python','Docker','Kubernetes','FastAPI','MLflow','Terraform','Prometheus'],
    image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&q=80&auto=format&fit=crop',
    imageAlt: 'Cloud MLOps architecture visualization with server infrastructure and monitoring dashboards',
    category: 'MLOps', period: 'Nov 2025 — Dec 2025', link: '#' },
  { id: 2, title: 'EV Predictive Maintenance System (Capstone)',
    description: 'Production-ready AI system using Python, XGBoost, Flask, Streamlit, Docker, and Kubernetes — achieving 0.82% error (3.7x better than industry) and 147x ROI with SHAP explainability.',
    highlights: ['0.82% error rate — 3.7x better than industry benchmark','147x ROI via predictive maintenance & reduced downtime','SHAP explainability for 20% better model interpretability'],
    tags: ['XGBoost','SHAP','Flask','Streamlit','Docker','Kubernetes','MLflow','Time Series','Python'],
    image: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=800&q=80&auto=format&fit=crop',
    imageAlt: 'Electric vehicle charging station with glowing cables and modern EV predictive analytics dashboard',
    category: 'Machine Learning', period: 'Aug 2025 — Nov 2025', link: '#' },
  { id: 3, title: 'Reviews Data Analysis Pipeline (ETL + ML)',
    description: 'End-to-end automated ETL pipeline using Python, Apache Airflow, BERT, and Streamlit — processing 100K+ customer reviews with 90%+ sentiment accuracy.',
    highlights: ['90%+ accuracy on sentiment classification at scale (100K+ reviews)','30% data processing efficiency improvement via advanced NLP','40% better stakeholder decision-making through Streamlit dashboards'],
    tags: ['Python','BERT','NLP','Apache Airflow','ETL','Pandas','Streamlit','Great Expectations'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&auto=format&fit=crop',
    imageAlt: 'Data analytics dashboard with colorful sentiment charts and automated ETL pipeline metrics',
    category: 'Data Analytics', period: 'Dec 2025', link: '#' },
  { id: 4, title: "McDonald's Market Segmentation & Analysis",
    description: 'K-means and hierarchical clustering on 1,431 consumer records achieving 78.3% market coverage — identifying 4 distinct customer segments to drive targeted marketing strategies.',
    highlights: ['78.3% market coverage via K-means & hierarchical clustering','Projected 8% revenue growth through targeted strategies','4 distinct segments via demographic, behavioral & psychographic analysis'],
    tags: ['Python','K-means','Hierarchical Clustering','Scikit-learn','Pandas','Statistical Validation'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&auto=format&fit=crop',
    imageAlt: 'Business analytics charts showing market segmentation clusters and revenue growth projections',
    category: 'Data Analytics', period: 'Oct 2025 — Nov 2025', link: '#' },
  { id: 5, title: 'Netflix Sentiment Analysis & Content Recommendation',
    description: 'BERT-based sentiment classification system for Netflix reviews — achieving high review analysis accuracy and personalized content recommendations with 25% better user preference targeting.',
    highlights: ['BERT-based sentiment classification on Netflix review data','25% improvement in user preference & content recommendation accuracy','30% data processing efficiency gain via transformer NLP pipeline'],
    tags: ['Python','BERT','NLP','Sentiment Analysis','Scikit-learn','Transformers','HuggingFace'],
    image: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=800&q=80&auto=format&fit=crop',
    imageAlt: 'Streaming content recommendation interface with sentiment analysis scores and NLP classification charts',
    category: 'Machine Learning', period: 'Sept 2025 — Oct 2025', link: '#' },
  { id: 6, title: 'Airbnb Pricing Prediction Model',
    description: 'ML regression model using XGBoost and Feature Engineering to predict optimal Airbnb pricing — achieving 85% accuracy and 20% improved prediction performance.',
    highlights: ['85% accuracy in Airbnb price prediction with XGBoost','20% improved prediction via advanced feature engineering','25% better price recommendations through comprehensive data analysis'],
    tags: ['Python','Scikit-learn','XGBoost','Feature Engineering','Regression','Pandas','Data Analysis'],
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80&auto=format&fit=crop',
    imageAlt: 'Modern apartment rental platform with pricing analytics and machine learning prediction dashboard',
    category: 'Machine Learning', period: 'Sept 2025 — Oct 2025', link: '#' },
  { id: 7, title: 'Engineering Materials: Data-Driven Analysis',
    description: 'Comprehensive data analysis of engineering materials covering 12 analytical tasks across mechanical, physical, and chemical properties for material selection optimization.',
    highlights: ['30% improvement in material selection via 12 analytical tasks','Statistical modeling across mechanical, physical & chemical properties','25% enhanced data processing via comprehensive visualization pipeline'],
    tags: ['Python','Pandas','Seaborn','Matplotlib','Plotly','Statistical Modeling','Data Visualization'],
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80&auto=format&fit=crop',
    imageAlt: 'Engineering laboratory with material analysis charts and statistical data visualization plots',
    category: 'Data Analytics', period: 'Apr 2025 — May 2025', link: '#' },
  { id: 8, title: 'Pet Clinic Appointment Booking System (Full-Stack)',
    description: 'Enterprise-grade veterinary appointment booking platform using Java 17, Spring Boot, React.js, MySQL, and JWT authentication — deployed on AWS.',
    highlights: ['35% performance boost & 20% reduction in manual booking errors','JWT authentication & RESTful API security on AWS','Full-stack: Spring Boot backend + React.js frontend + MySQL'],
    tags: ['Java 17','Spring Boot','React.js','MySQL','JWT','AWS','RESTful APIs','TypeScript'],
    image: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=800&q=80&auto=format&fit=crop',
    imageAlt: 'Veterinarian examining a dog at a modern pet clinic with digital appointment booking system',
    category: 'Full-Stack', period: 'July 2024 — Feb 2025', link: '#' },
  { id: 9, title: 'ToDo Application (MERN Stack)',
    description: 'Full-stack task management application using the MERN Stack with JWT authentication and RESTful APIs — achieving 20% productivity improvement.',
    highlights: ['20% productivity improvement via full-stack MERN task management','Robust MongoDB data persistence with comprehensive user session management','25% better UX via responsive React.js UI with RESTful backend'],
    tags: ['React.js','Node.js','Express.js','MongoDB','JWT','RESTful APIs','JavaScript'],
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80&auto=format&fit=crop',
    imageAlt: 'Modern task management application interface with clean to-do list UI and productivity metrics',
    category: 'Full-Stack', period: 'Jan 2024 — Dec 2024', link: '#' },
  { id: 10, title: 'British Airways Analytics Dashboard',
    description: 'Interactive BI dashboard using Plotly and Streamlit to analyze British Airways customer review sentiment, flight delay patterns, and route profitability.',
    highlights: ['End-to-end sentiment NLP pipeline on British Airways reviews','Interactive Plotly dashboards for flight & route analytics','Custom NLP preprocessing for unstructured review data at scale'],
    tags: ['Plotly','Streamlit','NLP','Pandas','Python','Text Analytics','Power BI'],
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80&auto=format&fit=crop',
    imageAlt: 'Aerial view of commercial aircraft with BI dashboard overlay and sentiment analytics metrics',
    category: 'Data Analytics', period: '2025', link: '#' },
]

const CATS = ['ALL', 'MLOPS', 'MACHINE_LEARNING', 'DATA_ANALYTICS', 'FULL_STACK']
const CAT_COLORS: Record<string, string> = {
  'MLOps': '#00f5ff', 'Machine Learning': '#bf00ff', 'Data Analytics': '#00ff41', 'Full-Stack': '#ff0090',
}

function ProjectCard({ project, index, inView }: { project: Project; index: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLElement>(null)
  const color = CAT_COLORS[project.category] || '#00f5ff'

  const onMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const r = cardRef.current?.getBoundingClientRect()
    if (!r) return
    setTilt({ x: ((e.clientY - r.top - r.height / 2) / r.height) * -8, y: ((e.clientX - r.left - r.width / 2) / r.width) * 8 })
  }, [])

  return (
    <article ref={cardRef}
      className="relative overflow-hidden cursor-pointer group"
      style={{
        background: '#020b18',
        border: hovered ? `1px solid ${color}55` : '1px solid #0d2444',
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${hovered ? 'translateY(-6px)' : 'translateY(0)'}`,
        boxShadow: hovered ? `0 20px 50px rgba(0,0,0,0.6), 0 0 40px ${color}22` : '0 2px 10px rgba(0,0,0,0.4)',
        transition: 'transform 0.15s ease, box-shadow 0.3s ease, border-color 0.3s ease, opacity 0.5s ease',
        opacity: inView ? 1 : 0,
        clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))',
        transitionDelay: `${index * 70}ms`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={onMove}
      onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }) }}
      aria-label={`Project: ${project.title}`}
    >
      {/* Animated scan line on hover */}
      {hovered && (
        <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
          <div className="w-full h-px absolute left-0"
            style={{ background: `linear-gradient(90deg,transparent,${color}88,transparent)`, animation: 'scanline 1.5s linear infinite', top: 0 }} />
        </div>
      )}

      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-4 h-4 pointer-events-none" aria-hidden="true"
        style={{ borderRight: `1px solid ${color}99`, borderTop: `1px solid ${color}99` }} />

      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img src={project.image} alt={project.imageAlt}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
        <div className="absolute inset-0 transition-opacity duration-300"
          style={{ background: `linear-gradient(180deg,${color}22 0%,#020b18 100%)`, opacity: hovered ? 1 : 0.6 }} />

        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center transition-all duration-300"
          style={{ background: `${color}dd`, opacity: hovered ? 1 : 0 }}>
          <a href={project.link}
            className="flex items-center gap-2 px-5 py-2.5 font-mono text-sm tracking-widest transition-all duration-200"
            style={{
              color: '#000408', background: '#fff',
              clipPath: 'polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)',
              transform: hovered ? 'scale(1) translateY(0)' : 'scale(0.8) translateY(10px)',
            }}
            onClick={e => e.stopPropagation()}>
            VIEW_PROJECT <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className="font-mono text-xs tracking-widest px-2 py-1"
            style={{ color, border: `1px solid ${color}66`, background: '#020b18ee',
              clipPath: 'polygon(4px 0%,100% 0%,calc(100% - 4px) 100%,0% 100%)' }}>
            {project.category.toUpperCase().replace(' ', '_')}
          </span>
        </div>
        <div className="absolute bottom-3 right-3">
          <span className="font-mono text-xs px-2 py-1" style={{ color: '#4a7a9b', background: 'rgba(0,0,0,0.8)' }}>
            {project.period}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-mono text-sm font-bold mb-2 leading-snug line-clamp-2 transition-colors duration-200"
          style={{ color: hovered ? color : '#e2f0ff', textShadow: hovered ? `0 0 10px ${color}66` : 'none' }}>
          {project.title}
        </h3>
        <p className="font-mono text-xs leading-relaxed mb-3 line-clamp-2" style={{ color: '#4a7a9b' }}>
          {project.description}
        </p>
        <ul className="flex flex-col gap-1 mb-4">
          {project.highlights.slice(0, 2).map((h, i) => (
            <li key={i} className="flex gap-2 font-mono text-xs leading-relaxed" style={{ color: '#6a8a9b' }}>
              <span className="mt-1.5 w-1 h-1 flex-shrink-0" style={{ background: color, boxShadow: `0 0 4px ${color}` }} />
              {h}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-1.5">
          {project.tags.slice(0, 4).map(tag => (
            <span key={tag} className="font-mono text-xs px-2 py-0.5 tracking-wide"
              style={{ color: '#4a7a9b', border: '1px solid #0d2444', background: '#050f20',
                clipPath: 'polygon(3px 0%,100% 0%,calc(100% - 3px) 100%,0% 100%)' }}>
              {tag}
            </span>
          ))}
          {project.tags.length > 4 && (
            <span className="font-mono text-xs px-2 py-0.5" style={{ color: '#4a7a9b', border: '1px solid #0d2444', background: '#050f20' }}>
              +{project.tags.length - 4}
            </span>
          )}
        </div>
      </div>
    </article>
  )
}

export default function Projects() {
  const [active, setActive]         = useState('ALL')
  const [display, setDisplay]       = useState('ALL')
  const [fading, setFading]         = useState(false)
  const gridRef = useRef<HTMLDivElement>(null)
  const [inView, setInView]         = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold: 0.05 })
    if (gridRef.current) obs.observe(gridRef.current)
    return () => obs.disconnect()
  }, [])

  const changeFilter = (cat: string) => {
    if (cat === active) return
    setFading(true)
    setTimeout(() => { setDisplay(cat); setActive(cat); setFading(false) }, 200)
  }

  const filtered = display === 'ALL'
    ? projects
    : projects.filter(p => p.category.toUpperCase().replace(' ', '_') === display)

  return (
    <section id="projects" className="relative py-24 overflow-hidden"
      style={{ background: '#000408' }} aria-labelledby="projects-heading">

      {/* Circuit trace BG */}
      <div className="absolute inset-0 pointer-events-none opacity-30" aria-hidden="true"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cpath d='M10 10 H90 V50 H50 V90' fill='none' stroke='%2300f5ff' stroke-width='0.4' opacity='0.15'/%3E%3Ccircle cx='10' cy='10' r='2' fill='%2300f5ff' opacity='0.2'/%3E%3Ccircle cx='90' cy='50' r='2' fill='%2300f5ff' opacity='0.2'/%3E%3Ccircle cx='50' cy='90' r='2' fill='%2300f5ff' opacity='0.2'/%3E%3C/svg%3E")` }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="flex items-center gap-2 mb-3">
            <Terminal className="w-4 h-4" style={{ color: '#00ff41', filter: 'drop-shadow(0 0 4px #00ff41)' }} />
            <span className="sys-label">// MODULE: SELECTED_WORK</span>
          </div>
          <h2 id="projects-heading"
            className="font-bold mb-4 text-balance"
            style={{ fontFamily: 'var(--font-display,Orbitron),monospace', fontSize: 'clamp(1.6rem,4vw,2.8rem)',
              background: 'linear-gradient(90deg,#ffffff 0%,#00f5ff 100%)', WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            PROJECTS_THAT_SHIP_REAL_IMPACT
          </h2>
          <p className="font-mono text-sm max-w-xl leading-relaxed" style={{ color: '#4a7a9b' }}>
            10 production AI/ML systems spanning MLOps pipelines, predictive maintenance, NLP, market segmentation, and full-stack development.
          </p>
          <div className="cyber-line w-32 mt-6" />
        </div>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12" role="group" aria-label="Filter by category">
          {CATS.map(cat => (
            <button key={cat} onClick={() => changeFilter(cat)}
              className="font-mono text-xs tracking-widest px-4 py-2 transition-all duration-200"
              style={{
                color: active === cat ? '#000408' : '#4a7a9b',
                background: active === cat ? '#00f5ff' : 'transparent',
                border: `1px solid ${active === cat ? '#00f5ff' : '#0d2444'}`,
                clipPath: 'polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%)',
                boxShadow: active === cat ? '0 0 20px #00f5ff44' : 'none',
              }}
              aria-pressed={active === cat}>
              {cat}
              <span className="ml-1.5 text-xs opacity-60">
                ({cat === 'ALL' ? projects.length : projects.filter(p => p.category.toUpperCase().replace(' ', '_') === cat).length})
              </span>
            </button>
          ))}
        </div>

        {/* Grid */}
        <div ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-opacity duration-200"
          style={{ opacity: fading ? 0 : 1 }}>
          {filtered.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
