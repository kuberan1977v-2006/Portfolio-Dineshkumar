import { useState, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { ChevronDown, Download, FolderOpen, Mail, Github, Linkedin, Instagram } from "lucide-react"
import { useRef } from "react"
import { personalInfo } from "@/data/content"
import { scrollTo } from "@/lib/utils"
import { Button } from "@/components/ui/Button"

export const Hero = () => {
  const [text, setText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [wordIndex, setWordIndex] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const words = ["Frontend Developer", "UI/UX Designer", "React Specialist", "Creative Engineer"]

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        const currentWord = words[wordIndex]
        if (isDeleting) {
          setText((prev) => prev.slice(0, -1))
          if (text === "") {
            setIsDeleting(false)
            setWordIndex((prev) => (prev + 1) % words.length)
          }
        } else {
          setText(currentWord.slice(0, text.length + 1))
          if (text === currentWord) {
            setIsDeleting(true)
            setTimeout(() => setIsDeleting(false), 2000)
          }
        }
      },
      isDeleting ? 50 : 100
    )
    return () => clearTimeout(timeout)
  }, [text, isDeleting, wordIndex])

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-bg to-bg" />
      
      <motion.div
        className="absolute top-1/4 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl opacity-40"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />
      
      <motion.div
        className="absolute bottom-1/4 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl opacity-40"
        animate={{
          scale: [1.2, 1, 1.2],
          x: [0, -50, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      />

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="order-2 lg:order-1"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full glass text-sm font-medium text-text mb-6 border border-white/10 shadow-lg shadow-primary/5"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inset-0 rounded-full bg-success opacity-75 animate-ping" />
                <span className="relative rounded-full h-2.5 w-2.5 bg-success" />
              </span>
              Available for opportunities
            </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1]"
        >
          <span className="text-gradient">{personalInfo.name}</span>
        </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="h-16 md:h-20 flex items-center mb-6"
            >
              <p className="text-2xl md:text-3xl lg:text-4xl font-medium text-muted">
                I build{" "}
                <span className="text-text relative">
                  {text}
                  <span className="absolute right-0 top-0 h-full w-0.5 bg-primary animate-pulse" />
                </span>
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-lg text-muted max-w-xl mb-10 leading-relaxed"
            >
              Crafting premium digital experiences with clean code, beautiful design, and obsessive attention to detail.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col items-center gap-6"
            >
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Button
                  size="lg"
                  variant="primary"
                  magnetic
                  className="group"
                  onClick={() => scrollTo("projects")}
                >
                  <FolderOpen size={18} />
                  View Projects
                </Button>
                <Button
                  size="lg"
                  variant="secondary"
                  magnetic
                  onClick={() => scrollTo("contact")}
                >
                  <Mail size={18} />
                  Hire Me
                </Button>
                <Button
                  size="lg"
                  variant="ghost"
                  magnetic
                  className="flex items-center gap-2"
                  onClick={() => {
                    const link = document.createElement("a")
                    link.href = personalInfo.resumeUrl
                    link.download = "Dineshkumar_K_Resume.pdf"
                    document.body.appendChild(link)
                    link.click()
                    document.body.removeChild(link)
                  }}
                >
                  <Download size={18} />
                  Resume
                </Button>
              </div>

              <div className="flex items-center gap-5">
                <a
                  href={personalInfo.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-muted hover:text-text hover:border-primary/30 transition-all duration-300 hover:scale-110"
                  aria-label="GitHub"
                >
                  <Github size={24} />
                </a>
                <a
                  href={personalInfo.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-muted hover:text-text hover:border-primary/30 transition-all duration-300 hover:scale-110"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={24} />
                </a>
                <a
                  href={personalInfo.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-muted hover:text-text hover:border-primary/30 transition-all duration-300 hover:scale-110"
                  aria-label="Instagram"
                >
                  <Instagram size={24} />
                </a>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="w-12 h-12 rounded-2xl glass flex items-center justify-center text-muted hover:text-text hover:border-primary/30 transition-all duration-300 hover:scale-110"
                  aria-label="Email"
                >
                  <Mail size={24} />
                </a>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <div className="relative">
              <div className="absolute -inset-6 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full opacity-60 blur-3xl" />
              
              <div className="relative w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-accent p-[3px] animate-spin-slow">
                  <div className="w-full h-full rounded-full bg-bg" />
                </div>
                
                <div className="absolute inset-3 rounded-full overflow-hidden border border-white/10 shadow-2xl">
                  <img
                    src="/images/profile.png"
                    alt="Dineshkumar K - Professional Profile"
                    className="w-full h-full object-cover"
                    loading="eager"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = 'none'
                      const parent = target.parentElement
                      if (parent) {
                        parent.innerHTML = '<div class="w-full h-full flex items-center justify-center text-6xl font-bold text-primary bg-surface rounded-full">DK</div>'
                      }
                    }}
                  />
                </div>

                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-2 -right-2 glass-card px-4 py-2 rounded-2xl"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                    <span className="text-xs font-medium text-text">Open to work</span>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-2 -left-2 glass-card px-4 py-2 rounded-2xl"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary shadow-lg shadow-primary/50" />
                    <span className="text-xs font-medium text-text">Frontend Dev</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="mt-16 lg:mt-20 flex justify-center"
        >
          <button
            onClick={() => scrollTo("about")}
            className="text-muted hover:text-text transition-colors duration-300 animate-bounce"
            aria-label="Scroll down"
          >
            <ChevronDown size={32} />
          </button>
        </motion.div>
      </div>
    </section>
  )
}
