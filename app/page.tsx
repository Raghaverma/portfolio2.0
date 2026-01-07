"use client"

import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { ExperiencePreview } from "@/components/experience-preview"
import { ProjectsPreview } from "@/components/projects-preview"
import { SkillsPreview } from "@/components/skills-preview"
import { ContactSection } from "@/components/contact-section"
import { FooterBento } from "@/components/footer-bento"

export default function Home() {
  return (
    <>
      <Navigation />

      <main className="min-h-screen blueprint-grid pt-16">
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
