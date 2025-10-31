"use client"

import { useState } from "react"
import Header from "@/components/header"
import Hero from "@/components/hero"
import ServicesSection from "@/components/services-section"
import CoursesSection from "@/components/courses-section"
import ExpertsSection from "@/components/experts-section"
import Footer from "@/components/footer"
import CourseModal from "@/components/course-modal"
import LegalModal from "@/components/legal-modal"
import { ContactModal } from "@/components/contact-modal"

export default function Home() {
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [legalModal, setLegalModal] = useState<{ type: "privacy" | "terms" | "cookie" } | null>(null)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <ServicesSection />

      {/* Get in touch CTA (opens same Contact Modal used in Header) */}
      <div className="max-w-7xl mx-auto px-4 mt-8 mb-12 text-center">
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
          Ready to elevate your business with tailored technology and strategic solutions?
        </p>
        <div className="flex justify-center">
          <button
            onClick={() => setIsContactModalOpen(true)}
            className="px-6 py-3 bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-accent text-white font-medium rounded-lg transition-all duration-300 shadow-sm hover:shadow-primary/40"
          >
            Get in touch
          </button>
        </div>
      </div>

      <CoursesSection onCourseSelect={setSelectedCourse} />
      <ExpertsSection />
      <Footer onLegalClick={(type) => setLegalModal({ type })} />

  {selectedCourse && <CourseModal course={selectedCourse} onClose={() => setSelectedCourse(null)} />}

  {/* Contact modal instance for the Get in touch CTA (header has its own too) */}
  <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />

  {legalModal && <LegalModal type={legalModal.type} onClose={() => setLegalModal(null)} />}
    </main>
  )
}
