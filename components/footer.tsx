"use client"

import { Linkedin, Twitter, Facebook, Instagram } from "lucide-react"

export default function Footer({
  onLegalClick,
}: {
  onLegalClick: (type: "privacy" | "terms" | "cookie") => void
}) {
  return (
    <footer id="contact" className="bg-card border-t border-border py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span className="text-white font-bold">F</span>
              </div>
              <h3 className="font-bold text-foreground">Fusion Cloud</h3>
            </div>
            <p className="text-sm text-muted-foreground">Professional training for enterprise cloud solutions</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <button
                  onClick={() => {
                    const element = document.getElementById("courses")
                    element?.scrollIntoView({ behavior: "smooth" })
                  }}
                  className="hover:text-primary transition-colors"
                >
                  Courses
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    const element = document.getElementById("experts")
                    element?.scrollIntoView({ behavior: "smooth" })
                  }}
                  className="hover:text-primary transition-colors"
                >
                  Experts
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Email: info@fusioncloud.com</li>
              <li>Phone: +1 (555) 123-4567</li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onLegalClick("privacy")}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onLegalClick("terms")}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  onClick={() => onLegalClick("cookie")}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Cookie Policy
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media */}
        <div className="flex justify-center gap-6 mb-8">
          <a
            href="https://linkedin.com/company/fusion-cloud"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 hover:bg-primary/20 text-muted-foreground hover:text-primary transition-all duration-300"
          >
            <Linkedin className="w-6 h-6" />
          </a>
          <a
            href="https://twitter.com/fusioncloud"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 hover:bg-secondary/20 text-muted-foreground hover:text-secondary transition-all duration-300"
          >
            <Twitter className="w-6 h-6" />
          </a>
          <a
            href="https://facebook.com/fusioncloud"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 hover:bg-accent/20 text-muted-foreground hover:text-accent transition-all duration-300"
          >
            <Facebook className="w-6 h-6" />
          </a>
          <a
            href="https://instagram.com/fusioncloud"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 hover:bg-primary/20 text-muted-foreground hover:text-primary transition-all duration-300"
          >
            <Instagram className="w-6 h-6" />
          </a>
        </div>

        {/* Bottom */}
        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>© 2025 Fusion Cloud Trainings. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
