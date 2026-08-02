import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { experience } from "@/data/content"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { Card } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"

export const Experience = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="experience" className="py-32 relative">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeading
          title="Experience"
          subtitle="Work history"
          description="Professional experience and key contributions."
          align="center"
          iconSrc="/images/icon.png"
        />

        <div ref={ref} className="space-y-8">
          {experience.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Card hover className="relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full -mr-16 -mt-16" />
                
                <div className="relative">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-text mb-1">
                        {exp.role}
                      </h3>
                      <p className="text-primary font-medium">
                        {exp.company}
                      </p>
                    </div>
                    <Badge variant="primary" className="w-fit">
                      {exp.period}
                    </Badge>
                  </div>

                  <div className="space-y-3 mb-6">
                    {exp.description.map((item, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.4, delay: 0.3 + idx * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <p className="text-muted leading-relaxed">{item}</p>
                      </motion.div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-lg text-xs font-medium bg-white/5 border border-white/10 text-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
