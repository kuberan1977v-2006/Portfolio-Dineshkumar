"use client"

import { useState, useRef } from "react"
import type { FormEvent } from "react"
import { motion } from "framer-motion"
import { personalInfo } from "@/data/content"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { Card } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Textarea } from "@/components/ui/Textarea"
import { Mail, MapPin, Phone, Send, CheckCircle, Loader2, AlertCircle } from "lucide-react"

const API_URL = "https://portfolio-backend-cgcq.onrender.com"

export const Contact = () => {
  const ref = useRef<HTMLDivElement>(null)
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  const validateForm = () => {
    if (!formState.name.trim() || !formState.email.trim() || !formState.subject.trim() || !formState.message.trim()) {
      setError("All fields are required.")
      return false
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formState.email)) {
      setError("Please enter a valid email address.")
      return false
    }
    if (formState.message.trim().length < 10) {
      setError("Message must be at least 10 characters long.")
      return false
    }
    return true
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError("")

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formState.name.trim(),
          email: formState.email.trim(),
          subject: formState.subject.trim(),
          message: formState.message.trim(),
        }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setIsSuccess(true)
        setFormState({ name: "", email: "", subject: "", message: "" })
        setTimeout(() => setIsSuccess(false), 5000)
      } else {
        setError(data.message || "Failed to send message. Please try again.")
      }
    } catch (err) {
      setError("Network error. Please check your connection and try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-6 relative">
        <SectionHeading
          title="Contact Me"
          subtitle="Get in touch"
          description="Have a project in mind or just want to say hi? I'd love to hear from you."
          align="center"
          iconSrc="/images/icon.png"
        />

        <div ref={ref} className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <Card hover className="group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="text-text font-semibold mb-1">Email</h4>
                  <a href={`mailto:${personalInfo.email}`} className="text-muted hover:text-primary transition-colors">
                    {personalInfo.email}
                  </a>
                </div>
              </div>
            </Card>

            <Card hover className="group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h4 className="text-text font-semibold mb-1">Phone</h4>
                  <a href={`tel:${personalInfo.phone}`} className="text-muted hover:text-accent transition-colors">
                    {personalInfo.phone}
                  </a>
                </div>
              </div>
            </Card>

            <Card hover className="group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent-2/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <MapPin className="w-5 h-5 text-accent-2" />
                </div>
                <div>
                  <h4 className="text-text font-semibold mb-1">Location</h4>
                  <p className="text-muted">{personalInfo.location}</p>
                </div>
              </div>
            </Card>
          </div>

          <Card className="relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent/10 to-transparent rounded-full -mr-16 -mt-16" />
            
            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <CheckCircle className="w-16 h-16 text-success mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-text mb-2">Message Sent!</h3>
                <p className="text-muted">Thank you for reaching out. I'll get back to you soon.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 relative">
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-4 rounded-xl bg-danger/10 border border-danger/20 text-danger text-sm"
                  >
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{error}</span>
                  </motion.div>
                )}
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input
                    label="Your Name"
                    placeholder="John Doe"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="john@example.com"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  />
                </div>
                <Input
                  label="Subject"
                  placeholder="Project Inquiry"
                  required
                  value={formState.subject}
                  onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                />
                <Textarea
                  label="Message"
                  placeholder="Tell me about your project..."
                  required
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                />
                <Button
                  type="submit"
                  size="lg"
                  variant="primary"
                  magnetic
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            )}
          </Card>
        </div>
      </div>
    </section>
  )
}
