"use client"

import { useState } from "react"
import { Linkedin, Twitter, Facebook } from "lucide-react"

interface Expert {
  name: string
  title: string
  bio: string
  initials: string
  linkedin: string
  twitter: string
  facebook: string
}

export default function ExpertCard({ expert }: { expert: Expert }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div className="group" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <div className="relative bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-all duration-300 h-full flex flex-col">
        {/* Avatar with initials */}
        <div
          className={`w-16 h-16 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4 transition-all duration-300 ${
            isHovered ? "scale-110 shadow-lg shadow-primary/50" : ""
          }`}
        >
          <span className="text-xl font-bold text-white">{expert.initials}</span>
        </div>

        {/* Name and Title */}
        <h3 className="text-lg font-bold text-foreground mb-1">{expert.name}</h3>
        <p className="text-sm text-accent font-semibold mb-3">{expert.title}</p>

        {/* Bio */}
        <p className="text-sm text-muted-foreground mb-6 flex-1 line-clamp-3">{expert.bio}</p>

        {/* Social Links */}
        <div className="flex gap-3 pt-4 border-t border-border">
          <a
            href={expert.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 hover:bg-primary/20 text-muted-foreground hover:text-primary transition-all duration-300"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href={expert.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 hover:bg-secondary/20 text-muted-foreground hover:text-secondary transition-all duration-300"
          >
            <Twitter className="w-5 h-5" />
          </a>
          <a
            href={expert.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 hover:bg-accent/20 text-muted-foreground hover:text-accent transition-all duration-300"
          >
            <Facebook className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  )
}
