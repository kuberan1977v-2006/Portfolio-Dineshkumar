import { cn } from "@/lib/utils"

interface DividerProps {
  className?: string
  orientation?: "horizontal" | "vertical"
}

export const Divider = ({ className, orientation = "horizontal" }: DividerProps) => {
  return (
    <div
      className={cn(
        "bg-white/5",
        orientation === "horizontal" ? "w-full h-px" : "h-full w-px",
        className
      )}
    />
  )
}
