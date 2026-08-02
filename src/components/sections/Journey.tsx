import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { journey } from "@/data/content"
import { SectionHeading } from "@/components/ui/SectionHeading"

export const Journey = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="journey" className="py-32 relative">
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeading
          title="My Journey"
          subtitle="Career path"
          description="A timeline of growth, learning, and building."
          align="center"
          iconSrc="/images/icon.png"
        />

        <div ref={ref} className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-transparent" />

          <div className="space-y-12">
            {journey.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex items-center gap-6 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } flex-row`}
              >
                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? "md:text-right md:pr-12" : "md:text-left md:pl-12"}`}>
                  <div className="glass-card rounded-2xl p-6 inline-block text-left">
                    <span className="text-xs font-medium text-primary tracking-wider uppercase">
                      {item.year}
                    </span>
                    <h3 className="text-xl font-semibold text-text mt-2 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-muted text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="absolute left-4 md:left-1/2 w-3 h-3 -ml-1.5 bg-primary rounded-full border-2 border-bg z-10 shadow-lg shadow-primary/50" />

                <div className="hidden md:block w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
