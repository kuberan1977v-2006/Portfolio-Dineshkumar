import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { skills } from "@/data/content"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { Card } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"

const skillCategories = [
  { key: "frontend", label: "Frontend", icon: "💻", color: "from-primary to-accent" },
  { key: "design", label: "Design", icon: "🎨", color: "from-accent-2 to-primary" },
  { key: "tools", label: "Tools", icon: "🛠️", color: "from-primary to-accent-2" },
]

export const Skills = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="skills" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          title="Skills & Expertise"
          subtitle="What I do"
          description="A comprehensive toolkit for building modern, scalable web applications."
          align="center"
          iconSrc="/images/icon.png"
        />

        <div ref={ref} className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.key}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: catIndex * 0.1 }}
            >
              <Card className="h-full">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">{category.icon}</span>
                  <h3 className="text-xl font-semibold text-text">
                    {category.label}
                  </h3>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {skills[category.key as keyof typeof skills].map((skill, skillIndex) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.3, delay: catIndex * 0.1 + skillIndex * 0.03 }}
                    >
                      <Badge variant={catIndex % 2 === 0 ? "primary" : "accent"} className="text-sm px-4 py-2">
                        {skill}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div ref={ref} className="mt-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <Card gradient>
              <h3 className="text-xl font-semibold text-text mb-4 text-center">
                Core Competencies
              </h3>
              <div className="flex flex-wrap justify-center gap-3">
                {["React", "TypeScript", "Tailwind CSS", "Next.js", "Figma", "UI/UX Design", "Responsive Design", "Accessibility", "Performance Optimization", "Clean Architecture"].map((skill, index) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.3, delay: 0.1 + index * 0.03 }}
                    className="px-4 py-2 rounded-full text-sm font-medium bg-white/5 border border-white/10 text-text hover:border-primary/30 transition-all duration-300"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
