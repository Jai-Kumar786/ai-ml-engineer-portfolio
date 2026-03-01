import type { Metadata } from 'next'
import { Share_Tech_Mono, JetBrains_Mono, Orbitron } from 'next/font/google'
import './globals.css'

const shareTechMono = Share_Tech_Mono({ subsets: ['latin'], weight: '400', variable: '--font-sans' })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })
const orbitron = Orbitron({ subsets: ['latin'], variable: '--font-display', weight: ['400','700','900'] })

export const metadata: Metadata = {
  title: 'Jai Kumar Gupta — AI & ML Engineer',
  description: 'Portfolio of Jai Kumar Gupta, an AI & ML Engineer specializing in deep learning, NLP, LLMs, and production-ready AI systems.',
  keywords: ['AI Engineer', 'ML Engineer', 'Deep Learning', 'NLP', 'LLMs', 'MLOps', 'Python', 'FastAPI'],
  authors: [{ name: 'Jai Kumar Gupta' }],
  openGraph: {
    title: 'Jai Kumar Gupta — AI & ML Engineer',
    description: 'Architecting Intelligence, Automating the Future.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${shareTechMono.variable} ${jetbrainsMono.variable} ${orbitron.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
      </body>
    </html>
  )
}
