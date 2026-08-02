import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface ButtonProps {
  variant?: "primary" | "secondary" | "ghost" | "outline"
  size?: "sm" | "md" | "lg"
  magnetic?: boolean
  onClick?: () => void
  disabled?: boolean
  children: React.ReactNode
  className?: string
  type?: "button" | "submit" | "reset"
}

export const Button = ({
  variant = "primary",
  size = "md",
  magnetic = false,
  onClick,
  disabled = false,
  children,
  className,
  type = "button",
}: ButtonProps) => {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 cursor-pointer"
  const variants = {
    primary:
      "bg-gradient-to-r from-primary to-accent text-white hover:shadow-lg hover:shadow-primary/25 disabled:opacity-50",
    secondary:
      "bg-white/5 border border-white/10 text-text hover:bg-white/10 backdrop-blur-sm disabled:opacity-50",
    ghost: "text-muted hover:text-text hover:bg-white/5 disabled:opacity-50",
    outline:
      "border border-white/20 text-text hover:bg-white/5 hover:border-white/30 disabled:opacity-50",
  }
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  }

  return (
    <motion.button
      whileHover={magnetic ? { scale: 1.02 } : { y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={cn(base, variants[variant], sizes[size], className)}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </motion.button>
  )
}
