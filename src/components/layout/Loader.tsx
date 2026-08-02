import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface LoaderProps {
  onComplete?: () => void
}

export const Loader = ({ onComplete }: LoaderProps) => {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + getRandomIncrement()
      })
    }, 40)

    const timeout = setTimeout(() => {
      setIsComplete(true)
      onComplete?.()
    }, 2500)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [onComplete])

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          exit={{ opacity: 0, filter: "blur(20px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-bg"
        >
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-20 h-20 rounded-full border-2 border-transparent border-t-primary border-r-accent"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 w-20 h-20 rounded-full border-2 border-transparent border-b-accent-2 border-l-primary"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center"
          >
            <p className="text-2xl font-bold text-gradient mb-2">Dineshkumar K</p>
            <div className="flex items-center gap-3">
              <div className="w-32 h-1 bg-surface rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-accent"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
              <span className="text-sm font-mono text-muted tabular-nums">
                {Math.min(progress, 100)}%
              </span>
            </div>
          </motion.div>

          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent opacity-50"
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function getRandomIncrement() {
  return Math.random() * 15 + 5
}
