"use client"

import { useState, useEffect } from "react"
import { ContactModal } from "./contact-modal"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/80 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Name Only */}
        <div className="flex flex-col">
          <h1 className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent leading-tight">
            Fusion Cloud Trainings
          </h1>
        </div>

        {/* Contact Button */}
        <button
          onClick={() => setIsContactModalOpen(true)}
          className="px-6 py-2 bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-accent text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-primary/50"
        >
          Contact Us
        </button>
      </div>

      {/* Contact Modal */}
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </header>
  )
}
