import { motion, useInView } from "framer-motion"
import { useRef } from "react"

interface ScaleInProps {
  children: React.ReactNode
  className?: string
  delay?: number
  scale?: number
}

export const ScaleIn = ({ children, className, delay = 0, scale = 0.9 }: ScaleInProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
