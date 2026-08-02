import { motion } from "framer-motion"
import { useMousePosition } from "@/hooks/useMousePosition"

export const AuroraBackground = () => {
  const { x, y } = useMousePosition()

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="aurora-bg" />
      
      <motion.div
        className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-primary/20 blur-3xl opacity-30"
        animate={{
          x: x * 0.02,
          y: y * 0.02,
        }}
        transition={{ type: "spring", stiffness: 40, damping: 30 }}
      />
      
      <motion.div
        className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-accent/20 blur-3xl opacity-30"
        animate={{
          x: -x * 0.02,
          y: -y * 0.02,
        }}
        transition={{ type: "spring", stiffness: 40, damping: 30 }}
      />

      <motion.div
        className="absolute top-1/2 left-1/2 w-32 h-32 rounded-full bg-accent-2/30 blur-3xl opacity-20"
        animate={{
          x: (x - window.innerWidth / 2) * 0.03,
          y: (y - window.innerHeight / 2) * 0.03,
        }}
        transition={{ type: "spring", stiffness: 60, damping: 20 }}
      />

      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle, #fff 1px, transparent 1px)`,
        backgroundSize: '30px 30px'
      }} />
      
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />
    </div>
  )
}
