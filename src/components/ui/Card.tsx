import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  gradient?: boolean
  onClick?: () => void
}

export const Card = ({ children, className, hover = true, gradient = false, onClick }: CardProps) => {
  return (
    <motion.div
      whileHover={hover && onClick ? undefined : hover ? { y: -4 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn(
        "glass-card rounded-2xl p-6 transition-all duration-300",
        hover && onClick && "cursor-pointer",
        gradient && "bg-gradient-to-br from-card/80 to-surface/80",
        className
      )}
      onClick={onClick}
    >
      {children}
    </motion.div>
  )
}
