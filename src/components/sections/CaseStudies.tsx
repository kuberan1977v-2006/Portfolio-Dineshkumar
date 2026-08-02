import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { caseStudies } from "@/data/content"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { Card } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { ExternalLink } from "lucide-react"

export const CaseStudies = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="case-studies" className="py-32 relative">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          title="Case Studies"
          subtitle="Design thinking"
          description="Deep dives into product challenges, research, and design solutions."
          align="center"
          iconSrc="/images/icon.png"
        />

        <div ref={ref} className="space-y-12">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: index * 0.2 }}
            >
              <Card hover className="overflow-hidden">
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="md:col-span-1">
                    <div className="flex items-center gap-3 mb-4">
                      <Badge variant="primary">Case Study</Badge>
                      <span className="text-xs text-muted">{study.duration}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-text mb-4 leading-tight">
                      {study.title}
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-muted">Client: </span>
                        <span className="text-text">{study.client}</span>
                      </div>
                      <div>
                        <span className="text-muted">Role: </span>
                        <span className="text-text">{study.role}</span>
                      </div>
                    </div>
                    <a
                      href="#"
                      className="inline-flex items-center gap-2 text-sm text-primary hover:text-accent transition-colors mt-4"
                    >
                      Read full case study <ExternalLink size={14} />
                    </a>
                  </div>

                  <div className="md:col-span-2 space-y-6">
                    <div>
                      <h4 className="text-lg font-semibold text-text mb-2 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-danger rounded-full" />
                        Problem
                      </h4>
                      <p className="text-muted leading-relaxed text-sm">
                        {study.problem}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-text mb-2 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                        Research & Solution
                      </h4>
                      <p className="text-muted leading-relaxed text-sm mb-3">
                        {study.research}
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                        <h5 className="text-sm font-semibold text-text mb-2">User Persona</h5>
                        <p className="text-xs text-muted leading-relaxed">{study.persona}</p>
                      </div>
                      <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                        <h5 className="text-sm font-semibold text-text mb-2">Outcome</h5>
                        <p className="text-xs text-muted leading-relaxed">{study.outcome}</p>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                      <h5 className="text-sm font-semibold text-primary mb-2">Lessons Learned</h5>
                      <p className="text-xs text-muted leading-relaxed">{study.lessons}</p>
                    </div>
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
