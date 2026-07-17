import { useEffect, useState } from 'react'
import './App.css'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import SkillMatrix from './components/SkillMatrix'
import BugleArchive from './components/BugleArchive'
import Resume from './components/Resume'
import Contact from './components/Contact'
import ScrollTop from './components/ScrollTop'
import SectionNav from './components/SectionNav'
import Particles from './components/Particles'
import Loader from './components/Loader'
import { ThemeProvider } from './context/ThemeContext'

function App() {
  const [loading, setLoading] = useState(true)

  // Konami code Easter egg: ↑↑↓↓←→←→BA
  useEffect(() => {
    const konamiCode = [
      'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
      'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
      'KeyB', 'KeyA'
    ]
    let index = 0

    const onKeyDown = (e) => {
      if (e.code === konamiCode[index]) {
        index++
        if (index === konamiCode.length) {
          document.body.classList.toggle('venom-mode')
          index = 0
        }
      } else {
        index = 0
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <ThemeProvider>
      <>
        {loading && <Loader onComplete={() => setLoading(false)} />}
        <Particles />
        <SectionNav />
        <Hero />
        <About />
        <Skills />
        <SkillMatrix />
        <Projects />
        <Experience />
        <BugleArchive />
        <Resume />
        <Contact />
        <ScrollTop />
      </>
    </ThemeProvider>
  )
}

export default App
