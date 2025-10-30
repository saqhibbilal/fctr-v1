"use client"

import { useEffect, useRef, useState } from "react"
import ExpertCard from "./expert-card"

const experts = [
  {
    name: "Mir Azher Ali",
    title: "Oracle Cloud Program Director",
    bio: "With 20 years of experience in enterprise solutions, Mir leads CWBS with a vision for innovation and growth.",
    initials: "MA",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    facebook: "https://facebook.com",
  },
  {
    name: "Mohammed Ghouse",
    title: "Director | Chief Technology Officer",
    bio: "Mohammed brings deep expertise in AI and cloud technologies, driving our technical innovation and product strategy.",
    initials: "MG",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    facebook: "https://facebook.com",
  },
  {
    name: "Syed",
    title: "Chief Operations Officer",
    bio: "Syed ensures operational excellence and scalability, managing our global operations and client success.",
    initials: "SY",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    facebook: "https://facebook.com",
  },
  {
    name: "Saqhib Bilal",
    title: "Delivery Excellence Manager",
    bio: "Saqhib ensures operational excellence and scalability, managing our global operations and client success.",
    initials: "SB",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    facebook: "https://facebook.com",
  },
]

export default function ExpertsSection() {
  const [visibleCards, setVisibleCards] = useState<boolean[]>(new Array(experts.length).fill(false))
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = cardsRef.current.indexOf(entry.target as HTMLDivElement)
            if (index !== -1) {
              setVisibleCards((prev) => {
                const newVisible = [...prev]
                newVisible[index] = true
                return newVisible
              })
            }
          }
        })
      },
      { threshold: 0.1 },
    )

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="experts" className="py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Meet Our Experts
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Industry leaders with decades of combined experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {experts.map((expert, index) => (
            <div
              key={index}
              ref={(el) => {
                cardsRef.current[index] = el
              }}
              className={`transition-all duration-700 ${
                visibleCards[index] ? "animate-fade-in-up opacity-100" : "opacity-0 translate-y-10"
              }`}
            >
              <ExpertCard expert={expert} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
