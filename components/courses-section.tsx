"use client"

import { useEffect, useRef, useState } from "react"
import CourseCard from "./course-card"

const courses = [
  {
    title: "Oracle ERP Cloud Financials with AI",
    description: "End-to-end learning of Oracle Financials modules enhanced with AI-driven automation and analytics.",
    originalPrice: "$1,999",
    price: "$999",
    duration: "3 Months",
    mode: "Instructor-guided",
    handsOn: "Scenario-based labs and live configuration walkthroughs",
    overview:
      "Gain hands-on exposure to Oracle ERP Cloud Financials — from ledger setup to intelligent reconciliation — while understanding how AI improves accuracy, forecasting, and decision-making in finance operations.",
    curriculum: [
      "General Ledger and Chart of Accounts Configuration",
      "Accounts Payable and Invoice Automation",
      "Accounts Receivable and Collections Management",
      "Fixed Assets Lifecycle and Depreciation Tracking",
      "Cash Management and Bank Statement Processing",
      "Expense Management and Policy Controls",
      "Smart Reconciliation and AI-driven Anomaly Detection",
    ],
    outcomes:
      "Develop practical skills in configuring, analyzing, and optimizing Oracle Financials Cloud using AI and automation for better financial visibility and compliance.",
    registerUrl: "https://forms.google.com/dummy-financials-registration",
  },
  {
    title: "Oracle SCM Cloud with AI",
    description:
      "Comprehensive overview of Oracle SCM Cloud with embedded AI features for predictive planning and intelligent sourcing.",
    originalPrice: "$1,999",
    price: "$999",
    duration: "3 Months",
    mode: "Instructor-guided",
    handsOn: "Practical configuration sessions and AI forecasting simulations",
    overview:
      "Understand how Oracle SCM Cloud leverages AI to enhance supply chain performance — covering planning, procurement, inventory, and sourcing — while applying data-driven insights for better supplier and demand management.",
    curriculum: [
      "Demand Forecasting and Predictive Analytics",
      "Supplier Risk Analytics and Performance Monitoring",
      "Inventory Optimization using AI-driven Recommendations",
      "Smart Procurement and Automated Purchase Processing",
      "Supplier Qualification and Onboarding Workflows",
      "Sourcing and Contract Management",
      "Purchasing Analytics and Spend Optimization",
    ],
    outcomes:
      "Learn how to configure and utilize Oracle SCM Cloud modules with AI capabilities to drive cost efficiency, reduce risk, and improve supply chain agility.",
    registerUrl: "https://forms.google.com/dummy-scm-registration",
  },
  {
    title: "Oracle Cloud HCM",
    description:
      "Focused learning on Oracle HCM Cloud modules for managing workforce time, attendance, and absence policies with automation and analytics.",
    originalPrice: "$1,999",
    price: "$999",
    duration: "3 Months",
    mode: "Instructor-guided",
    handsOn: "Configuration labs and real-world policy mapping exercises",
    overview:
      "Explore how Oracle HCM Cloud simplifies workforce operations through Absence Management and Time & Labor modules — helping HR teams automate leave policies, streamline time tracking, and ensure compliance.",
    curriculum: [
      "Absence Types, Plans, and Eligibility Configuration",
      "Absence Accruals, Balances, and Entitlements",
      "Time Entry Layouts and Rule Setup",
      "Work Schedules, Shifts, and Calendars",
      "Integration with Payroll and Project Costing",
      "Reporting and Analytics for Attendance Insights",
    ],
    outcomes:
      "Acquire hands-on knowledge of Oracle HCM's time and absence solutions to enhance workforce efficiency, compliance, and data-driven HR operations.",
    registerUrl: "https://forms.google.com/dummy-hcm-registration",
  },
  {
    title: "AI for Business",
    description:
      "Learn how to apply AI, automation, and GenAI tools to streamline business operations and improve decision-making.",
    originalPrice: "$1,999",
    price: "$999",
    duration: "2 Months",
    mode: "Instructor-guided",
    handsOn: "Applied AI, workflow automation exercises, and real-world case studies",
    overview:
      "This program bridges business strategy and AI adoption. Understand practical AI applications for process optimization, forecasting, and insight generation — even without a technical background.",
    curriculum: [
      "AI and GenAI Fundamentals for Business Leaders",
      "Operational AI Applications and Workflow Automation",
      "Intelligent Forecasting and Resource Planning",
      "Data-Driven Decision Making and KPI Interpretation",
      "AI in CRM, Marketing, and Supply Chain Operations",
      "Ethics, Governance, and Responsible AI Practices",
      "Hands-on AI Automation Projects using Business Tools",
    ],
    outcomes:
      "Gain a practical understanding of how AI and GenAI reshape operations, enabling faster, smarter, and data-informed decisions across business functions.",
    registerUrl: "https://forms.google.com/dummy-aiops-registration",
  },
  {
    title: "Data Analysis and Visualization",
    description:
      "Learn how to interpret, analyze, and visualize data using tools like Power BI, Tableau, and Oracle Analytics Cloud.",
    originalPrice: "$1,999",
    price: "$999",
    duration: "2 Months",
    mode: "Instructor-guided",
    handsOn: "Interactive sessions for data cleaning, dashboarding, and storytelling",
    overview:
      "Develop analytical and visualization skills to convert raw data into business insights using modern tools and visualization techniques.",
    curriculum: [
      "Foundations of Data Analysis and SQL Basics",
      "Exploratory Data Analysis (EDA) and Statistics",
      "Data Visualization Design Principles and Storytelling",
      "Hands-on with Power BI, Tableau, and Oracle Analytics",
      "AI-driven Forecasting and Predictive Insights",
      "Integrating Data Sources and Building Dashboards",
      "Presenting Insights and Business Communication Skills",
    ],
    outcomes:
      "Build confidence in turning data into insights through visualization and analytics — ready for roles in data analysis, BI, and reporting.",
    registerUrl: "https://forms.google.com/dummy-dataviz-registration",
  },
  {
    title: "Data Engineering",
    description:
      "Learn the core principles of modern data engineering — from ETL design to cloud-based pipelines and distributed data processing.",
    originalPrice: "$2,499",
    price: "$1,099",
    duration: "3 Months",
    mode: "Instructor-guided",
    handsOn: "Pipeline building labs and data flow simulations across cloud environments",
    overview:
      "Understand how data moves, transforms, and scales in enterprise ecosystems. Get exposure to ETL processes, data lakes, warehouses, and modern platforms like Snowflake and Databricks.",
    curriculum: [
      "Data Pipelines and Orchestration Concepts",
      "ETL/ELT Design and Data Lake Architecture",
      "Data Warehousing with Snowflake and Cloud Platforms",
      "Distributed Data Processing using Databricks and Spark",
      "Data Leakage Prevention and Quality Assurance",
      "Cloud Data Engineering Solutions and Integrations",
      "Monitoring, Governance, and Best Practices",
    ],
    outcomes:
      "Develop an applied understanding of modern data engineering workflows and cloud-based architectures commonly used in enterprise data teams.",
    registerUrl: "https://forms.google.com/dummy-dataeng-registration",
  },
]

export default function CoursesSection({ onCourseSelect }: { onCourseSelect: (course: any) => void }) {
  const [visibleCards, setVisibleCards] = useState<boolean[]>(new Array(courses.length).fill(false))
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
    <section id="courses" className="py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Professional Courses
            </span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Comprehensive training programs designed for enterprise professionals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <div
              key={index}
              ref={(el) => {
                cardsRef.current[index] = el
              }}
              className={`transition-all duration-700 ${
                visibleCards[index] ? "animate-fade-in-up opacity-100" : "opacity-0 translate-y-10"
              }`}
            >
              <CourseCard course={course} onSelect={() => onCourseSelect(course)} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
