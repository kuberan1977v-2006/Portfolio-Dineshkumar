import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Download, Award, CheckCircle } from "lucide-react"
import { personalInfo } from "@/data/content"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { FadeIn } from "@/components/animations/FadeIn"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"

export const Resume = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const highlights = [
    "Frontend Developer with strong React/TypeScript expertise",
    "UI/UX design experience with Figma and user research",
    "Built 12+ production applications",
    "Optimized performance for 95+ Lighthouse scores",
    "Clean code advocate with focus on accessibility",
  ]

  return (
    <section id="resume" className="py-32 relative">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeading
          title="Resume"
          subtitle="Download"
          description="A detailed overview of my skills, experience, and education."
          align="center"
          iconSrc="/images/icon.png"
        />

        <div ref={ref} className="grid lg:grid-cols-2 gap-12 items-center">
          <FadeIn>
            <div className="space-y-6">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gradient-to-br from-primary to-accent p-[2px] shadow-lg shadow-primary/20">
                  <img src="/images/icon.png" alt="DK" className="w-full h-full object-cover rounded-[14px]" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-text">Dineshkumar K</h3>
                  <p className="text-muted">Frontend Developer & UI/UX Designer</p>
                </div>
              </div>

              <div className="space-y-3">
                {highlights.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                    <span className="text-muted">{item}</span>
                  </motion.div>
                ))}
              </div>

              <div className="pt-6">
                <Button
                  size="lg"
                  variant="primary"
                  magnetic
                  className="group flex items-center gap-2"
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
                  Download Resume
                </Button>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={0.3}>
            <Card gradient className="relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-primary/20 to-transparent rounded-full -mr-20 -mt-20" />
              
              <div className="relative">
                <div className="flex items-center gap-2 mb-6">
                  <Award className="w-5 h-5 text-warning" />
                  <span className="text-sm font-medium text-warning">ATS Optimized</span>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <h4 className="text-sm font-semibold text-text mb-2">Technical Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {["React", "TypeScript", "Next.js", "Tailwind CSS", "Node.js", "MongoDB", "Figma", "Git"].map((skill) => (
                        <span key={skill} className="px-2 py-1 rounded-md text-xs bg-primary/10 text-primary border border-primary/20">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <h4 className="text-sm font-semibold text-text mb-2">Experience</h4>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted">Frontend Intern</span>
                      <span className="text-xs text-primary">2025 - Present</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <h4 className="text-sm font-semibold text-text mb-2">Education</h4>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted">B.E. Computer Science</span>
                      <span className="text-xs text-primary">Final Year</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
