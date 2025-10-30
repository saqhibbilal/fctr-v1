"use client"

import { useState } from "react"

interface Course {
  title: string
  description: string
  originalPrice: string
  price: string
  duration: string
  mode: string
}

export default function CourseCard({
  course,
  onSelect,
}: {
  course: Course
  onSelect: () => void
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="relative h-full group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card background with gradient border */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>

      <div className="relative h-full bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-300 flex flex-col">
        {/* Badge */}
        <div className="absolute top-4 right-4">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-secondary to-accent text-accent-foreground">
            50% OFF
          </span>
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="text-xl font-bold text-foreground mb-3 pr-16 line-clamp-2">{course.title}</h3>

          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{course.description}</p>

          {/* Duration and Mode */}
          <div className="flex gap-4 mb-6 text-xs">
            <div className="flex items-center gap-1">
              <span className="text-primary">⏱</span>
              <span className="text-muted-foreground">{course.duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-secondary">👨‍🏫</span>
              <span className="text-muted-foreground">{course.mode}</span>
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="mb-6 pb-6 border-b border-border">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-sm text-muted-foreground line-through">{course.originalPrice}</span>
            <span className="text-2xl font-bold text-accent">{course.price}</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onSelect}
            className="flex-1 px-4 py-2 rounded-lg border border-primary text-primary hover:bg-primary/10 font-medium transition-all duration-300 hover:scale-105"
          >
            More Info
          </button>
          <button
            onClick={() => window.open(course.registerUrl || "#", "_blank")}
            className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-accent text-white font-medium transition-all duration-300 hover:scale-105"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  )
}
