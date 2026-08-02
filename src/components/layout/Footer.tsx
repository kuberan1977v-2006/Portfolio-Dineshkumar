import { motion } from "framer-motion"
import { ArrowUp, Github, Linkedin, Instagram, Mail, Heart, Sparkles } from "lucide-react"
import { personalInfo } from "@/data/content"
import { scrollTo } from "@/lib/utils"
import { Button } from "@/components/ui/Button"

export const Footer = () => {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: Github, href: personalInfo.socials.github, label: "GitHub" },
    { icon: Linkedin, href: personalInfo.socials.linkedin, label: "LinkedIn" },
    { icon: Instagram, href: personalInfo.socials.instagram, label: "Instagram" },
    { icon: Mail, href: `mailto:${personalInfo.email}`, label: "Email" },
  ]

  return (
    <footer className="relative pt-24 pb-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-30" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-medium text-primary tracking-wider uppercase mb-4"
          >
            What&apos;s Next?
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6"
          >
            <span className="text-gradient">Let&apos;s work together</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-muted text-lg max-w-xl mx-auto mb-10 leading-relaxed"
          >
            I&apos;m currently looking for new opportunities. Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Button
              size="lg"
              variant="primary"
              magnetic
              className="group"
              onClick={() => scrollTo("contact")}
            >
              <Mail size={18} />
              Get In Touch
              <Sparkles size={16} className="group-hover:rotate-12 transition-transform" />
            </Button>
          </motion.div>
        </div>

        <div className="relative py-12">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/5" />
          </div>
          <div className="relative flex justify-center">
            <div className="flex items-center gap-5">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative group"
                  aria-label={social.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="absolute -inset-2 bg-gradient-to-r from-primary to-accent rounded-full opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500" />
                  <div className="relative w-12 h-12 rounded-full glass flex items-center justify-center text-muted group-hover:text-text group-hover:border-primary/40 transition-all duration-300 group-hover:scale-110">
                    <social.icon size={20} />
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
              <h3 className="text-xl font-bold text-gradient">
                {personalInfo.name}
              </h3>
              <span className="hidden md:block w-1 h-1 rounded-full bg-muted" />
              <p className="text-sm text-muted">
                {personalInfo.role}
              </p>
            </div>

            <div className="flex items-center gap-3 flex-wrap justify-center">
              {["React", "TypeScript", "Tailwind", "Next.js"].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-muted hover:text-text hover:border-primary/30 transition-all duration-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted flex items-center gap-1">
              © {currentYear} {personalInfo.name}. Built with <Heart size={14} className="text-danger fill-danger" /> and lots of coffee.
            </p>
            <button
              onClick={() => scrollTo("hero")}
              className="w-10 h-10 rounded-full glass flex items-center justify-center text-muted hover:text-text hover:border-primary/30 transition-all duration-300 hover:scale-110 hover:-translate-y-1"
              aria-label="Back to top"
            >
              <ArrowUp size={18} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
