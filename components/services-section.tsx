"use client"

import { useEffect, useRef, useState } from "react"
import ServiceCard from "./service-card"

const serviceCategories = [
  {
    category: "Technology & Innovation",
    services: [
      {
        title: "AI & Data Intelligence",
        description: "AI-driven solutions and data analytics for smarter decision-making and enhanced business intelligence.",
      },
      {
        title: "AI Automation",
        description: "Intelligent automation solutions leveraging AI for advanced process optimization and workflow efficiency.",
      },
      {
        title: "Software Development",
        description: "Custom software solutions tailored to your unique business requirements and scalability needs.",
      },
      {
        title: "Industrial Automation",
        description: "Advanced automation solutions for manufacturing, production, and industrial processes optimization.",
      },
      {
        title: "Cloud Infrastructure",
        description: "Comprehensive cloud and DevOps services for scalable, reliable, and secure infrastructure solutions.",
      },
    ],
  },
  {
    category: "Business Operations & Management",
    services: [
      {
        title: "ERP Services",
        description: "Enterprise resource planning solutions for integrated business management and operational excellence.",
      },
      {
        title: "Enterprise Solutions",
        description: "Scalable enterprise solutions designed for large organizations with complex requirements.",
      },
      {
        title: "Product Management",
        description: "End-to-end product lifecycle management services, from concept to market launch and optimization.",
      },
      {
        title: "Project Management",
        description: "Agile and waterfall methodologies to ensure successful project delivery on time and within budget.",
      },
      {
        title: "IT Operations",
        description: "Comprehensive IT setup, support, and maintenance services to ensure seamless business operations.",
      },
      {
        title: "Migration Services",
        description: "Cloud and data migration services ensuring smooth transitions with minimal downtime.",
      },
    ],
  },
  {
    category: "Strategic Growth & Development",
    services: [
      {
        title: "Industrial Training",
        description: "Hands-on industrial and technical training programs designed to upskill professionals and fresh graduates for modern industry demands.",
      },
      {
        title: "Marketing Services",
        description: "Comprehensive digital marketing and SEO solutions to enhance your online presence and reach.",
      },
      {
        title: "Consulting Services",
        description: "Strategic business consulting to guide your organization through transformation and growth.",
      },
      {
        title: "Digital Transformation",
        description: "End-to-end digital transformation services to modernize your business processes and technology stack.",
      },
      {
        title: "Compliance & Security",
        description: "Regulatory compliance and security solutions to protect your business and meet industry standards.",
      },
      {
        title: "HR & Staffing",
        description: "Talent acquisition and management solutions to build and nurture your workforce.",
      },
    ],
  },
]


export default function ServicesSection() {
  const totalServices = serviceCategories.reduce((acc, category) => acc + category.services.length, 0)
  const [visibleCards, setVisibleCards] = useState<boolean[]>(new Array(totalServices).fill(false))
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

  let cardIndex = 0

  return (
    <section id="services" className="py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Our Services
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Comprehensive solutions tailored to drive your business forward
          </p>
        </div>

        <div className="space-y-16">
          {serviceCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="space-y-6">
              <h3 className="text-2xl font-semibold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent text-center mb-8">
                {category.category}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.services.map((service) => {
                  const currentIndex = cardIndex++
                  return (
                    <div
                      key={service.title}
                      ref={(el) => {
                        cardsRef.current[currentIndex] = el
                      }}
                      className={`transition-all duration-700 min-h-[14rem] h-full ${
                        visibleCards[currentIndex] ? "animate-fade-in-up opacity-100" : "opacity-0 translate-y-10"
                      }`}
                    >
                      <ServiceCard service={service} />
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}