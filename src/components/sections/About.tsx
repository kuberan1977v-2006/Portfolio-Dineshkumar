import { motion, useInView, useMotionValue, useSpring } from "framer-motion"
import { useEffect, useRef } from "react"
import { GraduationCap, Languages, Award } from "lucide-react"
import { personalInfo, stats } from "@/data/content"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { FadeIn } from "@/components/animations/FadeIn"
import { Card } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { formatNumber } from "@/lib/utils"

const AnimatedCounter = ({ value, suffix }: { value: number; suffix: string }) => {
  const count = useMotionValue(0)
  const springCount = useSpring(count, { duration: 2000 })
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      count.set(value)
    }
  }, [count, isInView, value])

  useEffect(() => {
    const unsubscribe = springCount.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = formatNumber(Math.round(latest)) + suffix
      }
    })
    return unsubscribe
  }, [springCount, suffix])

  return (
    <span ref={ref} className="text-3xl font-bold text-gradient">
      {formatNumber(value)}{suffix}
    </span>
  )
}

export const About = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="about" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          title="About Me"
          subtitle="Get to know me"
          description="Passionate Frontend Developer and UI/UX Designer specializing in responsive, user-centered web applications with React.js and Figma."
          align="center"
          iconSrc="/images/icon.png"
        />

        <div ref={ref} className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="glass-card rounded-3xl p-8 md:p-12 mb-16">
              <div className="max-w-3xl mx-auto text-center">
                <p className="text-muted leading-relaxed text-lg mb-8">
                  {personalInfo.bio}
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <Badge variant="primary">Clean Code</Badge>
                  <Badge variant="accent">Accessibility</Badge>
                  <Badge variant="success">Performance</Badge>
                  <Badge variant="warning">Responsive Design</Badge>
                  <Badge variant="primary">Problem Solving</Badge>
                  <Badge variant="accent">UI/UX</Badge>
                </div>
              </div>
            </div>
          </FadeIn>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-16">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card hover className="text-center h-full">
                  <div className="text-4xl font-bold text-gradient mb-2">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className="text-muted text-sm font-medium">{stat.label}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <FadeIn delay={0.1}>
              <Card hover className="h-full">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-text">Education</h3>
                </div>
              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-semibold text-text">B.E. Computer Science Engineering</h4>
                  <p className="text-xs text-muted mt-1">University College of Engineering, Dindigul</p>
                  <p className="text-xs text-muted">2023 - 2027</p>
                  <p className="text-xs text-muted">Final Year</p>
                </div>
              </div>
              </Card>
            </FadeIn>

            <FadeIn delay={0.2}>
              <Card hover className="h-full">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Languages className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-text">Languages</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text">Tamil</span>
                    <Badge variant="primary" className="text-xs">Native</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text">English</span>
                    <Badge variant="accent" className="text-xs">Professional</Badge>
                  </div>
                </div>
              </Card>
            </FadeIn>

            <FadeIn delay={0.3}>
              <Card hover className="h-full">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-11 h-11 rounded-xl bg-success/10 flex items-center justify-center">
                    <Award className="w-5 h-5 text-success" />
                  </div>
                  <h3 className="text-lg font-semibold text-text">Achievements</h3>
                </div>
                <ul className="space-y-2.5">
                  <li className="text-sm text-muted flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 bg-success rounded-full mt-1.5 flex-shrink-0" />
                    12+ projects completed
                  </li>
                  <li className="text-sm text-muted flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 bg-success rounded-full mt-1.5 flex-shrink-0" />
                    18 professional certificates
                  </li>
                  <li className="text-sm text-muted flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 bg-success rounded-full mt-1.5 flex-shrink-0" />
                    Frontend Development Internship
                  </li>
                </ul>
              </Card>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  )
}
