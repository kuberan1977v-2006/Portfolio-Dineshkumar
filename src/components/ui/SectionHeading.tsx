import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  title: string
  subtitle?: string
  description?: string
  align?: "left" | "center" | "right"
  icon?: ReactNode
  iconSrc?: string
  className?: string
}

export const SectionHeading = ({
  title,
  subtitle,
  description,
  align = "center",
  icon,
  iconSrc,
  className,
}: SectionHeadingProps) => {
  const alignClasses = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  }

  return (
    <div className={cn("flex flex-col gap-3 mb-16", alignClasses[align], className)}>
      {subtitle && (
        <span className="text-sm font-medium text-primary tracking-wider uppercase">
          {subtitle}
        </span>
      )}
      <div className={cn("flex items-center gap-3", align === "center" && "justify-center", align === "right" && "justify-end")}>
        {iconSrc ? (
          <div className="w-10 h-10 rounded-xl overflow-hidden bg-gradient-to-br from-primary to-accent p-[1.5px] shadow-lg shadow-primary/20 flex-shrink-0">
            <img src={iconSrc} alt="" className="w-full h-full object-cover rounded-[10px]" />
          </div>
        ) : icon ? (
          <span className="text-primary flex-shrink-0">{icon}</span>
        ) : null}
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
          <span className="text-gradient">{title}</span>
        </h2>
      </div>
      {description && (
        <p className="text-muted text-lg max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>
      )}
      <div className="w-20 h-1 bg-gradient-to-r from-primary to-accent rounded-full mt-2" />
    </div>
  )
}
