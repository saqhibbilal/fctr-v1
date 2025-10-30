"use client"

import { useState } from "react"
import Header from "@/components/header"
import Hero from "@/components/hero"
import CoursesSection from "@/components/courses-section"
import ExpertsSection from "@/components/experts-section"
import Footer from "@/components/footer"
import CourseModal from "@/components/course-modal"
import LegalModal from "@/components/legal-modal"

export default function Home() {
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [legalModal, setLegalModal] = useState<{ type: "privacy" | "terms" | "cookie" } | null>(null)

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <CoursesSection onCourseSelect={setSelectedCourse} />
      <ExpertsSection />
      <Footer onLegalClick={(type) => setLegalModal({ type })} />

      {selectedCourse && <CourseModal course={selectedCourse} onClose={() => setSelectedCourse(null)} />}

      {legalModal && <LegalModal type={legalModal.type} onClose={() => setLegalModal(null)} />}
    </main>
  )
}
