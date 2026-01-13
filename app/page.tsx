import dynamic from "next/dynamic"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { SectionErrorBoundary } from "@/components/error-boundary"
import { getProjects, getExperiences } from "@/lib/api"
import {
  ExperiencePreviewSkeleton,
  SkillsPreviewSkeleton,
  ProjectsPreviewSkeleton,
  FooterBentoSkeleton,
  ContactSectionSkeleton
} from "@/components/loading-skeleton"

// Dynamically import below-the-fold components for better performance
// These components are lazy-loaded to reduce initial bundle size
const ExperiencePreview = dynamic(
  () => import("@/components/experience-preview").then(mod => ({ default: mod.ExperiencePreview })),
  { loading: () => <ExperiencePreviewSkeleton /> }
)

const SkillsPreview = dynamic(
  () => import("@/components/skills-preview").then(mod => ({ default: mod.SkillsPreview })),
  { loading: () => <SkillsPreviewSkeleton /> }
)

const ProjectsPreview = dynamic(
  () => import("@/components/projects-preview").then(mod => ({ default: mod.ProjectsPreview })),
  { loading: () => <ProjectsPreviewSkeleton /> }
)

const FooterBento = dynamic(
  () => import("@/components/footer-bento").then(mod => ({ default: mod.FooterBento })),
  { loading: () => <FooterBentoSkeleton /> }
)

const ContactSection = dynamic(
  () => import("@/components/contact-section").then(mod => ({ default: mod.ContactSection })),
  { loading: () => <ContactSectionSkeleton /> }
)

export default async function Home() {
  const [projects, experiences] = await Promise.all([
    getProjects(),
    getExperiences()
  ])

  return (
    <>
      <Navigation />

      <main id="main-content" className="min-h-screen blueprint-grid pt-16">
        <SectionErrorBoundary sectionName="hero section">
          <HeroSection />
        </SectionErrorBoundary>

        <SectionErrorBoundary sectionName="experience preview">
          <ExperiencePreview experience={experiences[0]} />
        </SectionErrorBoundary>

        <SectionErrorBoundary sectionName="skills preview">
          <SkillsPreview />
        </SectionErrorBoundary>

        <SectionErrorBoundary sectionName="projects preview">
          <ProjectsPreview projects={projects} />
        </SectionErrorBoundary>

        <SectionErrorBoundary sectionName="activity dashboard">
          <FooterBento />
        </SectionErrorBoundary>

        <SectionErrorBoundary sectionName="contact section">
          <ContactSection />
        </SectionErrorBoundary>
      </main>
    </>
  )
}
