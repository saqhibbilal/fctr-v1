"use client"

import { useEffect, useRef, useState } from "react"
import ExpertCard from "./expert-card"

const experts = [
  {
    name: "Mir Azher Ali",
    title: "Director | ERP Cloud & AI Program Lead",
    bio: "With over 20 years of experience in enterprise transformation, Mir drives ERP Cloud and AI initiatives, leading CWBS toward innovation and strategic growth.",
    initials: "MA",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    facebook: "https://facebook.com",
  },
  {
    name: "Mohammed Ghouse",
    title: "Director | Chief Technology Officer",
    bio: "Mohammed brings extensive expertise across ERP, SCM, and HCM systems while leveraging AI to deliver next-generation enterprise solutions and drive product innovation.",
    initials: "MG",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    facebook: "https://facebook.com",
  },
  {
    name: "Syed",
    title: "Oracle Cloud ERP Delivery & Engagement Manager",
    bio: "Syed specializes in managing Oracle Cloud ERP delivery and client engagement, optimizing operations and outcomes through intelligent automation and AI-driven strategies.",
    initials: "SY",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    facebook: "https://facebook.com",
  },
  {
    name: "Saqhib Bilal",
    title: "AI & Data Solutions Manager",
    bio: "Saqhib focuses on harnessing AI and data-driven insights to enhance delivery excellence, streamline operations, and support data-centric decision-making across projects.",
    initials: "SB",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
    facebook: "https://facebook.com",
  },
];


export default function ExpertsSection() {
  const [visibleCards, setVisibleCards] = useState<boolean[]>(new Array(experts.length).fill(false))
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
  const resizeObserverRef = useRef<number | null>(null)

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

  // Ensure all cards have uniform height by measuring the tallest card
  useEffect(() => {
    function applyUniformHeight() {
      try {
        const heights = cardsRef.current.map((wrapper) => {
          if (!wrapper) return 0
          // the card element is the first child inside wrapper
          const cardEl = wrapper.firstElementChild as HTMLElement | null
          return cardEl ? cardEl.offsetHeight : wrapper.offsetHeight
        })

        const max = Math.max(...heights, 0)
        if (max > 0) {
          cardsRef.current.forEach((wrapper) => {
            if (wrapper) {
              wrapper.style.minHeight = `${max}px`
            }
          })
        }
      } catch (e) {
        // ignore measurement errors
      }
    }

    // Run after a short delay to allow animations/content to settle
    const id = window.setTimeout(() => applyUniformHeight(), 200)

    // Recompute on window resize
    function onResize() {
      // debounce
      if (resizeObserverRef.current) window.clearTimeout(resizeObserverRef.current)
      resizeObserverRef.current = window.setTimeout(() => applyUniformHeight(), 150) as unknown as number
    }

    window.addEventListener('resize', onResize)

    // also run whenever visibility changes (cards animating into view)
    applyUniformHeight()

    return () => {
      window.clearTimeout(id)
      window.removeEventListener('resize', onResize)
      if (resizeObserverRef.current) window.clearTimeout(resizeObserverRef.current)
    }
  }, [visibleCards])

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
              className={`transition-all duration-700 min-h-[28rem] h-full flex ${
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
