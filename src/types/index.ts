export interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  challenge: string
  solution: string
  architecture: string
  techStack: string[]
  features: string[]
  images: string[]
  liveUrl: string
  githubUrl: string
  stats: { label: string; value: string }[]
  status: 'completed' | 'in-progress' | 'upcoming'
}

export interface Certificate {
  id: string
  title: string
  issuer: string
  date: string
  image: string
  credentialUrl: string
}

export interface Skill {
  name: string
  category: 'frontend' | 'backend' | 'design' | 'tools'
  level: number
}

export interface Experience {
  id: string
  role: string
  company: string
  period: string
  description: string[]
  technologies: string[]
}

export interface TimelineItem {
  year: string
  title: string
  description: string
  icon?: string
}

export interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  content: string
  avatar: string
}

export interface CaseStudy {
  id: string
  title: string
  client: string
  role: string
  duration: string
  problem: string
  research: string
  persona: string
  wireframes: string[]
  outcome: string
  lessons: string
}
