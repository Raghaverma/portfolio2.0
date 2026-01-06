"use client"

import { DockDemo } from "@/components/dock-navigation"
import { HeroSection } from "@/components/hero-section"
import { ExperiencePreview } from "@/components/experience-preview"
import { ProjectsPreview } from "@/components/projects-preview"
import { SkillsPreview } from "@/components/skills-preview"
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
        <ExperiencePreview />
        <SkillsPreview />
        <ProjectsPreview />
        <FooterBento />
        <ContactSection />
      </main>
    </>
  )
}
