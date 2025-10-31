"use client"

import { useState } from "react"

interface Service {
  title: string
  description: string
}

export default function ServiceCard({ service }: { service: Service }) {
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
        {/* Content */}
        <div className="flex-1">
          <h3 className="text-xl font-bold text-accent mb-3 line-clamp-2">
            {service.title}
          </h3>

          <div className="text-sm text-muted-foreground overflow-auto pr-1" style={{ maxHeight: '4.2rem' }}>
            {service.description}
          </div>
        </div>
      </div>
    </div>
  )
}