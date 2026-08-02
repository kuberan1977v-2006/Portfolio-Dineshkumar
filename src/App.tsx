import { useState, useEffect } from "react"
import { Loader } from "./components/layout/Loader"
import { Navbar } from "./components/layout/Navbar"
import { Footer } from "./components/layout/Footer"
import { AuroraBackground } from "./components/layout/AuroraBackground"
import { Hero } from "./components/sections/Hero"
import { About } from "./components/sections/About"
import { Journey } from "./components/sections/Journey"
import { Skills } from "./components/sections/Skills"
import { Experience } from "./components/sections/Experience"
import { Projects } from "./components/sections/Projects"
import { CaseStudies } from "./components/sections/CaseStudies"
import { GitHubSection as GitHub } from "./components/sections/GitHub"
import { Certificates } from "./components/sections/Certificates"
import { Resume } from "./components/sections/Resume"
import { Contact } from "./components/sections/Contact"

function App() {
  const [loading, setLoading] = useState(true)

  const handleLoaderComplete = () => {
    setTimeout(() => setLoading(false), 500)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (loading) setLoading(false)
    }, 4000)
    return () => clearTimeout(timer)
  }, [loading])

  return (
    <div className="relative min-h-screen bg-bg text-text antialiased">
      <AuroraBackground />
      
      <Loader onComplete={handleLoaderComplete} />
      
      {!loading && (
        <>
          <Navbar />
          <main>
            <Hero />
            <About />
            <Journey />
            <Skills />
            <Experience />
            <Projects />
            <CaseStudies />
            <GitHub />
            <Certificates />
            <Resume />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </div>
  )
}

export default App
