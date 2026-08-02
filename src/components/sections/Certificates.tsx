import { useState } from "react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { certificates } from "@/data/content"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { Card } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { ExternalLink, X, Award } from "lucide-react"

export const Certificates = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [selectedCert, setSelectedCert] = useState<string | null>(null)

  return (
    <section id="certificates" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          title="Certificates"
          subtitle="Credentials"
          description="Professional certifications and continuous learning achievements."
          align="center"
          iconSrc="/images/icon.png"
        />

        <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                hover
                className="cursor-pointer group relative overflow-hidden"
                onClick={() => setSelectedCert(cert.id)}
              >
                <div className="aspect-[3/4] rounded-xl bg-gradient-to-br from-surface to-card mb-4 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 opacity-50 group-hover:opacity-80 transition-opacity duration-500" />
                  <Award className="w-16 h-16 text-primary/60 group-hover:text-primary transition-colors duration-300" />
                </div>
                
                <div className="relative">
                  <Badge variant="primary" className="mb-2">
                    {cert.issuer}
                  </Badge>
                  <h3 className="text-lg font-semibold text-text mb-1 group-hover:text-primary transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-sm text-muted">{cert.date}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {selectedCert && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedCert(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-card rounded-3xl p-8 max-w-lg w-full text-center relative"
          >
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full glass flex items-center justify-center text-muted hover:text-text transition-colors"
            >
              <X size={18} />
            </button>
            
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-6">
              <Award className="w-12 h-12 text-white" />
            </div>
            
            <h3 className="text-2xl font-bold text-text mb-2">
              {certificates.find((c) => c.id === selectedCert)?.title}
            </h3>
            <p className="text-primary font-medium mb-1">
              {certificates.find((c) => c.id === selectedCert)?.issuer}
            </p>
            <p className="text-muted text-sm mb-6">
              {certificates.find((c) => c.id === selectedCert)?.date}
            </p>
            <a
              href={certificates.find((c) => c.id === selectedCert)?.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary to-accent text-white font-medium hover:shadow-lg hover:shadow-primary/25 transition-all"
            >
              View Credential <ExternalLink size={16} />
            </a>
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}
