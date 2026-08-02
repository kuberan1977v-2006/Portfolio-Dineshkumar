import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { Github as GithubIcon, GitFork, Star, Users, Activity } from "lucide-react"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { Card } from "@/components/ui/Card"

const topLanguages = [
  { name: "TypeScript", percentage: 45, color: "from-blue-400 to-blue-600" },
  { name: "JavaScript", percentage: 30, color: "from-yellow-400 to-orange-500" },
  { name: "CSS", percentage: 15, color: "from-pink-400 to-purple-500" },
  { name: "HTML", percentage: 10, color: "from-orange-400 to-red-500" },
]

export const GitHubSection = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const githubStats = [
    { label: "Repositories", value: "45+", icon: GithubIcon },
    { label: "Followers", value: "120+", icon: Users },
    { label: "Contributions", value: "850+", icon: Activity },
    { label: "Stars Earned", value: "320+", icon: Star },
  ]

  const recentRepos = [
    {
      name: "react-dashboard",
      description: "A modern admin dashboard with dark mode and analytics",
      language: "TypeScript",
      stars: 42,
      forks: 12,
    },
    {
      name: "portfolio-v3",
      description: "Premium portfolio with advanced animations",
      language: "TypeScript",
      stars: 38,
      forks: 8,
    },
    {
      name: "tailwind-components",
      description: "Collection of reusable Tailwind CSS components",
      language: "CSS",
      stars: 25,
      forks: 6,
    },
  ]

  return (
    <section id="github" className="py-32 relative">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeading
          title="GitHub Activity"
          subtitle="Open source"
          description="Contributing to the community and building in public."
          align="center"
          iconSrc="/images/icon.png"
        />

        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {githubStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card hover className="text-center h-full p-6">
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                <div className="text-2xl font-bold text-text mb-1">{stat.value}</div>
                <p className="text-xs text-muted">{stat.label}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Card className="h-full">
              <h3 className="text-xl font-semibold text-text mb-6">Top Languages</h3>
              <div className="space-y-4">
                {topLanguages.map((lang, index) => (
                  <div key={lang.name}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-text font-medium">{lang.name}</span>
                      <span className="text-xs text-muted">{lang.percentage}%</span>
                    </div>
                    <div className="h-2 bg-surface rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${lang.percentage}%` } : {}}
                        transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                        className={`h-full bg-gradient-to-r ${lang.color} rounded-full`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card className="h-full">
              <h3 className="text-xl font-semibold text-text mb-6">Recent Repositories</h3>
              <div className="space-y-4">
                {recentRepos.map((repo, index) => (
                  <motion.div
                    key={repo.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-primary/30 transition-all group cursor-pointer"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-sm font-semibold text-primary group-hover:text-accent transition-colors">
                          {repo.name}
                        </h4>
                        <p className="text-xs text-muted mt-1 mb-3">
                          {repo.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted">
                          <span className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-primary" />
                            {repo.language}
                          </span>
                          <span className="flex items-center gap-1">
                            <Star size={12} />
                            {repo.stars}
                          </span>
                          <span className="flex items-center gap-1">
                            <GitFork size={12} />
                            {repo.forks}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
