"use client"

import { useEffect } from "react"

export default function LegalModal({
  type,
  onClose,
}: {
  type: "privacy" | "terms" | "cookie"
  onClose: () => void
}) {
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [])

  const content = {
    privacy: {
      title: "Privacy Policy",
      body: "Your privacy is important to us. This policy explains how we collect, use, and protect your personal information when you use our services and website.",
    },
    terms: {
      title: "Terms of Service",
      body: "By accessing and using Fusion Cloud Trainings, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.",
    },
    cookie: {
      title: "Cookie Policy",
      body: "We use cookies to enhance your experience on our website. Cookies are small files stored on your device that help us understand how you use our site and improve our services.",
    },
  }

  const current = content[type]

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
          <h2 className="text-3xl font-bold text-foreground mb-4">{current.title}</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">{current.body}</p>

          <div className="space-y-4 text-muted-foreground text-sm">
            <p>
              Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </p>
            <p>
              For more information or questions about this policy, please contact us at support@fusioncloudtrainings.com
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-full mt-6 px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-accent text-white font-semibold transition-all duration-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
