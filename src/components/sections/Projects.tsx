import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { projects } from "@/data/content"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { Card } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { ExternalLink, Github, ArrowRight } from "lucide-react"

const statusColors = {
  completed: "success" as const,
  "in-progress": "warning" as const,
  upcoming: "primary" as const,
}

const getStatusVariant = (status: string) => {
  return statusColors[status as keyof typeof statusColors] || "primary"
}

export const Projects = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="projects" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          title="Featured Projects"
          subtitle="Work showcase"
          description="A selection of projects that demonstrate my skills and passion for building exceptional digital products."
          align="center"
          iconSrc="/images/icon.png"
        />

        <div ref={ref} className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <Card hover className="h-full flex flex-col group">
                <div className="relative aspect-video rounded-xl overflow-hidden mb-6 bg-surface">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 opacity-80 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl font-bold text-white/10 select-none">
                      {project.title.charAt(0)}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                    <Badge variant={getStatusVariant(project.status)}>
                      {project.status.replace("-", " ")}
                    </Badge>
                    <div className="flex gap-2">
                      <a
                        href={project.liveUrl}
                        className="w-8 h-8 rounded-lg glass flex items-center justify-center text-muted hover:text-text hover:border-primary/30 transition-all"
                        aria-label="Live demo"
                      >
                        <ExternalLink size={14} />
                      </a>
                      <a
                        href={project.githubUrl}
                        className="w-8 h-8 rounded-lg glass flex items-center justify-center text-muted hover:text-text hover:border-primary/30 transition-all"
                        aria-label="GitHub repository"
                      >
                        <Github size={14} />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex-1 flex flex-col">
                  <h3 className="text-2xl font-bold text-text mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted leading-relaxed mb-4 flex-1">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 rounded-md text-xs font-medium bg-white/5 border border-white/10 text-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                    {project.stats.map((stat) => (
                      <div key={stat.label}>
                        <span className="text-sm font-semibold text-text">
                          {stat.value}
                        </span>
                        <span className="text-xs text-muted ml-1">
                          {stat.label}
                        </span>
                      </div>
                    ))}
                    <a
                      href={project.liveUrl}
                      className="ml-auto text-sm text-primary hover:text-accent transition-colors flex items-center gap-1 group/link"
                    >
                      View Details
                      <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                    </a>
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
