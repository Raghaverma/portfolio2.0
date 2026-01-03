"use client"

import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { ExperienceSection } from "@/components/experience-section"
import { ProjectsSection } from "@/components/projects-section"
import { SkillsSection } from "@/components/skills-section"
import { ContactSection } from "@/components/contact-section"
import { FooterBento } from "@/components/footer-bento"

export default function Home() {
  return (
    <>
      <Navigation />
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
