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
      sections: [
        {
          heading: "Introduction",
          text: "Your privacy is important to us. This policy explains how we collect, use, and protect your personal information when you use our services and website."
        },
        {
          heading: "Information We Collect",
          text: "We may collect personal information such as your name, email address, and usage data when you interact with our website or services."
        },
        {
          heading: "How We Use Your Information",
          text: "Your information is used to provide and improve our services, communicate with you, and ensure the security of our platform."
        },
        {
          heading: "Data Protection",
          text: "We implement industry-standard security measures to protect your data from unauthorized access, disclosure, or misuse."
        },
        {
          heading: "Contact",
          text: "For questions about this policy, contact us at support@fusioncloudtrainings.com."
        }
      ]
    },
    terms: {
      title: "Terms of Service",
      sections: [
        {
          heading: "Acceptance of Terms",
          text: "By accessing and using Fusion Cloud Trainings, you agree to be bound by these terms. If you do not agree, please do not use our services."
        },
        {
          heading: "User Responsibilities",
          text: "You agree to use our services lawfully and not to misuse or attempt to disrupt our platform."
        },
        {
          heading: "Intellectual Property",
          text: "All content, trademarks, and data on this site are the property of Fusion Cloud Trainings or its licensors."
        },
        {
          heading: "Changes to Terms",
          text: "We reserve the right to update these terms at any time. Continued use of the service constitutes acceptance of the new terms."
        },
        {
          heading: "Contact",
          text: "For questions about these terms, contact us at support@fusioncloudtrainings.com."
        }
      ]
    },
    cookie: {
      title: "Cookie Policy",
      sections: [
        {
          heading: "What Are Cookies?",
          text: "Cookies are small files stored on your device that help us understand how you use our site and improve your experience."
        },
        {
          heading: "How We Use Cookies",
          text: "We use cookies to remember your preferences, analyze site traffic, and personalize content."
        },
        {
          heading: "Managing Cookies",
          text: "You can control cookies through your browser settings. Disabling cookies may affect your experience on our site."
        },
        {
          heading: "Contact",
          text: "For questions about our cookie policy, contact us at support@fusioncloudtrainings.com."
        }
      ]
    },
  }

  const current = content[type]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      {/* Blur background */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      {/* Modal */}
      <div
        className="relative bg-card border border-border rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scale-in shadow-xl"
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
          <h2 className="text-3xl font-extrabold text-foreground mb-6 border-b border-border pb-2">{current.title}</h2>
          <div className="space-y-6">
            {current.sections.map((section, idx) => (
              <div key={idx}>
                <h3 className="text-lg font-semibold text-primary mb-1">{section.heading}</h3>
                <p className="text-muted-foreground leading-relaxed">{section.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-xs text-muted-foreground border-t border-border pt-4 flex flex-col gap-1">
            <span>Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
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
