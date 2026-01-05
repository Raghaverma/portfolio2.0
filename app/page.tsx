"use client"

import { DockDemo } from "@/components/dock-navigation"
import { HeroSection } from "@/components/hero-section"
import { ExperienceSection } from "@/components/experience-section"
import { ProjectsSection } from "@/components/projects-section"
import { SkillsSection } from "@/components/skills-section"
import { ContactSection } from "@/components/contact-section"
import { FooterBento } from "@/components/footer-bento"

export default function Home() {
  return (
    <>
      <div className="fixed top-4 left-0 right-0 z-50 pointer-events-none">
        <div className="pointer-events-auto">
          <DockDemo />
        </div>
      </div>

      <main className="min-h-screen blueprint-grid">
        <HeroSection />
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
        <FooterBento />
        <ContactSection />
      </main>
    </>
  )
}
