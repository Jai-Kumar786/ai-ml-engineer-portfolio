import Navigation from '@/components/portfolio/Navigation'
import Hero from '@/components/portfolio/Hero'
import Projects from '@/components/portfolio/Projects'
import Skills from '@/components/portfolio/Skills'
import Experience from '@/components/portfolio/Experience'
import Contact from '@/components/portfolio/Contact'
import Footer from '@/components/portfolio/Footer'

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main>
        <Hero />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
