'use client'

import { useEffect, useRef, useState } from 'react'
import { Brain, BarChart3, Code2, Database, Layers, Cloud, Terminal } from 'lucide-react'

interface SkillGroup { icon: React.ReactNode; title: string; description: string; tools: string[]; level: number; color: string }

const skills: SkillGroup[] = [
  { icon: <Brain className="w-5 h-5" />, title: 'DATA_SCIENCE & AI/ML',
    description: 'Production ML systems with XGBoost, BERT, LLMs, LangChain, and CrewAI. End-to-end pipelines from feature engineering to model deployment with drift detection, AI agents, and agentic systems.',
    tools: ['MLflow','TensorFlow','PyTorch','XGBoost','BERT','Transformers','LangChain','CrewAI','Phidata','SHAP','Deep Learning'],
    level: 92, color: '#00f5ff' },
  { icon: <Layers className="w-5 h-5" />, title: 'DATA_ENGINEERING & ETL',
    description: 'Robust cloud data pipelines processing billions of events/day with 99.99% uptime. Apache Spark, Delta Lake, Apache Airflow, Event Hubs, and NoSQL/SQL data architecture.',
    tools: ['Apache Spark','Apache Airflow','Delta Lake','Event Hubs','Pandas','MongoDB','Redis','PostgreSQL','MySQL'],
    level: 88, color: '#bf00ff' },
  { icon: <Cloud className="w-5 h-5" />, title: 'CLOUD_PLATFORMS & MLOPS',
    description: 'Cloud-native AI deployments on Azure (Databricks, AKS, ADLS Gen2) and AWS with CI/CD pipelines, Kubernetes orchestration, Terraform IaC, and Prometheus monitoring.',
    tools: ['Azure','AWS','Google Cloud','Docker','Kubernetes','Terraform','CI/CD Pipelines','Git/GitHub','Prometheus','Grafana'],
    level: 85, color: '#00ff41' },
  { icon: <Code2 className="w-5 h-5" />, title: 'WEB_DEV & APIS',
    description: 'Enterprise full-stack applications with FastAPI, Flask, Spring Boot, MERN Stack, and event-driven architecture. JWT authentication, RESTful APIs, and scalable microservices on AWS.',
    tools: ['FastAPI','Flask','Spring Boot','Node.js','Express.js','React.js','Angular.js','RESTful APIs','Hibernate'],
    level: 80, color: '#ff0090' },
  { icon: <BarChart3 className="w-5 h-5" />, title: 'DATA_VISUALIZATION & BI',
    description: 'Interactive analytics dashboards for market segmentation, sentiment analysis, flight analytics, and Netflix content strategy through rich interactive visual tools.',
    tools: ['Matplotlib','Seaborn','Plotly','Power BI','Tableau','Excel','Streamlit','Gradio','Jupyter','DAX Studio'],
    level: 87, color: '#ff6d00' },
  { icon: <Database className="w-5 h-5" />, title: 'BIG_DATA & PROGRAMMING',
    description: 'Expert-level Python (9+ months) and SQL for advanced data manipulation and ETL processes. Big Data technologies for distributed processing across logistics, payments, and e-commerce domains.',
    tools: ['Python (Expert)','SQL (Expert)','Java','JavaScript','TypeScript','R','Hadoop','MapReduce','HDFS','Hive','Sqoop'],
    level: 95, color: '#00f5ff' },
]

const domains = ['Logistics','Payment Processing','Marketplaces','E-commerce','Predictive Maintenance','Cybersecurity','Telecom','Agritech']

function NeonBar({ level, color, inView }: { level: number; color: string; inView: boolean }) {
  const [prog, setProg] = useState(0)
  useEffect(() => { if (inView) { const t = setTimeout(() => setProg(level), 300); return () => clearTimeout(t) } }, [inView, level])
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-1.5 rounded-none" style={{ background: '#0d2444', clipPath: 'polygon(2px 0%,100% 0%,calc(100% - 2px) 100%,0% 100%)' }}>
        <div className="h-full transition-all duration-1000 ease-out rounded-none"
          style={{ width: `${prog}%`, background: `linear-gradient(90deg,${color},${color}88)`,
            boxShadow: `0 0 8px ${color}88`, transition: 'width 1.4s cubic-bezier(0.34,1.56,0.64,1)' }} />
      </div>
      <span className="font-mono text-xs w-8 text-right" style={{ color }}>{prog}%</span>
    </div>
  )
}

function SkillCard({ skill, index, inView }: { skill: SkillGroup; index: number; inView: boolean }) {
  const [hov, setHov] = useState(false)
  return (
    <article
      className="relative p-5 holo-card transition-all duration-500 group"
      style={{
        opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(36px)',
        transition: 'opacity 0.55s ease, transform 0.55s ease, border-color 0.3s ease, box-shadow 0.3s ease',
        transitionDelay: `${index * 80}ms`,
        borderColor: hov ? `${skill.color}66` : '#0d2444',
        boxShadow: hov ? `0 0 30px ${skill.color}22, 0 0 60px ${skill.color}0a` : 'none',
      }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      aria-label={`Skill: ${skill.title}`}
    >
      {/* Animated top trace */}
      <div className="absolute top-0 left-0 right-0 h-px transition-all duration-300"
        style={{ background: `linear-gradient(90deg,transparent,${skill.color},transparent)`, opacity: hov ? 1 : 0 }} />

      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 transition-all duration-300"
            style={{
              border: `1px solid ${skill.color}55`, background: `${skill.color}0d`,
              color: skill.color, filter: hov ? `drop-shadow(0 0 6px ${skill.color})` : 'none',
              clipPath: 'polygon(4px 0%,100% 0%,calc(100% - 4px) 100%,0% 100%)',
            }}>
            {skill.icon}
          </div>
          <h3 className="font-mono text-sm font-bold tracking-wider transition-all duration-200"
            style={{ color: hov ? skill.color : '#e2f0ff', textShadow: hov ? `0 0 10px ${skill.color}66` : 'none' }}>
            {skill.title}
          </h3>
        </div>
        <span className="font-mono text-lg font-bold flex-shrink-0"
          style={{ color: skill.color, textShadow: `0 0 12px ${skill.color}88` }}>
          {skill.level}%
        </span>
      </div>

      {/* Progress bar */}
      <NeonBar level={skill.level} color={skill.color} inView={inView} />

      {/* Description */}
      <p className="font-mono text-xs leading-relaxed my-4" style={{ color: '#4a7a9b' }}>{skill.description}</p>

      {/* Tools */}
      <div className="flex flex-wrap gap-1.5">
          {skill.tools.map(tool => (
            <span key={tool} className="font-mono text-xs px-2 py-0.5 tracking-wide transition-all duration-200 hover:text-cyan-300"
              style={{ color: `${skill.color}99`, border: `1px solid ${skill.color}28`, background: `${skill.color}0a`,
                clipPath: 'polygon(3px 0%,100% 0%,calc(100% - 3px) 100%,0% 100%)' }}>
              {tool}
            </span>
          ))}
      </div>
    </article>
  )
}

export default function Skills() {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold: 0.06 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="skills" className="relative py-24 overflow-hidden"
      style={{ background: '#020b18', isolation: 'isolate' }} aria-labelledby="skills-heading">

      {/* Scanline overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-20" aria-hidden="true"
        style={{ backgroundImage: 'repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,245,255,0.015) 3px,rgba(0,245,255,0.015) 4px)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-2 mb-3">
            <Terminal className="w-4 h-4" style={{ color: '#bf00ff', filter: 'drop-shadow(0 0 4px #bf00ff)' }} />
            <span className="sys-label" style={{ color: '#bf00ff', textShadow: '0 0 8px #bf00ff55' }}>
              // MODULE: EXPERTISE_MATRIX
            </span>
          </div>
          <h2 id="skills-heading"
            className="font-bold mb-4 text-balance"
            style={{ fontFamily: 'var(--font-display,Orbitron),monospace', fontSize: 'clamp(1.6rem,4vw,2.8rem)',
              background: 'linear-gradient(90deg,#bf00ff 0%,#00f5ff 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            SKILLS_&amp;_ABILITIES
          </h2>
          <p className="font-mono text-sm max-w-xl leading-relaxed" style={{ color: '#4a7a9b' }}>
            Expert-level Python and SQL, production MLOps on Azure/AWS, transformer NLP, LLM-based AI agents, Big Data infrastructure, and enterprise full-stack development.
          </p>
          <div className="cyber-line w-32 mt-6" />
        </div>

        {/* Grid */}
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {skills.map((s, i) => <SkillCard key={s.title} skill={s} index={i} inView={inView} />)}
        </div>

        {/* Domain strip */}
        <div className="pt-8" style={{ borderTop: '1px solid #0d2444' }}>
          <span className="sys-label block text-center mb-5">// DOMAIN_KNOWLEDGE</span>
          <div className="flex flex-wrap justify-center gap-3">
            {domains.map((d, i) => (
              <span key={d} className="font-mono text-xs tracking-widest px-4 py-1.5 transition-all duration-200 cursor-default"
                style={{
                  color: '#00f5ff', border: '1px solid #00f5ff33', background: '#00f5ff08',
                  clipPath: 'polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%)',
                  opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(16px)',
                  transition: 'opacity 0.5s ease, transform 0.5s ease',
                  transitionDelay: `${600 + i * 60}ms`,
                }}>
                {d.toUpperCase().replace(' ', '_')}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
