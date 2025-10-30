"use client"

import { useEffect } from "react"

interface Course {
  title: string
  description: string
  originalPrice: string
  price: string
  duration: string
  mode: string
  handsOn: string
  overview: string
  curriculum: string[]
  outcomes: string
  registerUrl: string
}

export default function CourseModal({
  course,
  onClose,
}: {
  course: Course
  onClose: () => void
}) {
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      {/* Blur background */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      {/* Modal */}
      <div
        className="relative bg-card border border-border rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-muted hover:bg-primary/20 text-muted-foreground hover:text-primary transition-all duration-300 flex items-center justify-center z-10"
        >
          ✕
        </button>

        <div className="p-8">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-foreground mb-2">{course.title}</h2>
            <p className="text-muted-foreground">{course.description}</p>
          </div>

          {/* Quick Info */}
          <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-muted/50 rounded-lg">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Duration</p>
              <p className="font-semibold text-foreground">{course.duration}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Mode</p>
              <p className="font-semibold text-foreground">{course.mode}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Original Price</p>
              <p className="font-semibold text-foreground line-through">{course.originalPrice}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Discounted Price</p>
              <p className="font-semibold text-accent text-lg">{course.price}</p>
            </div>
          </div>

          {/* Overview */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-foreground mb-2">Overview</h3>
            <p className="text-muted-foreground">{course.overview}</p>
          </div>

          {/* Hands-on */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-foreground mb-2">Hands-on Experience</h3>
            <p className="text-muted-foreground">{course.handsOn}</p>
          </div>

          {/* Curriculum */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-foreground mb-3">Curriculum</h3>
            <ul className="space-y-2">
              {course.curriculum.map((item, index) => (
                <li key={index} className="flex gap-3 text-muted-foreground">
                  <span className="text-primary font-bold">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Outcomes */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-foreground mb-2">Learning Outcomes</h3>
            <p className="text-muted-foreground">{course.outcomes}</p>
          </div>

          {/* CTA */}
          <button
            onClick={() => window.open(course.registerUrl, "_blank")}
            className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-accent text-white font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-primary/50"
          >
            Register Now
          </button>
        </div>
      </div>
    </div>
  )
}
