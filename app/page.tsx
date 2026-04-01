import { Navigation } from "@/components/layout/navigation"
import { HeroNew } from "@/components/sections/hero-new"
import { StatsBar } from "@/components/sections/stats-bar"
import { SelectedWork } from "@/components/sections/selected-work"
import { StatusDashboard } from "@/components/sections/status-dashboard"
import { ExperienceSnippet } from "@/components/sections/experience-snippet"
import { ContactSectionNew } from "@/components/sections/contact-section-new"
import { SiteFooter } from "@/components/layout/site-footer"

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="pb-24 md:pb-0">
        <HeroNew />
        <StatsBar />
        <SelectedWork />
        <StatusDashboard />
        <ExperienceSnippet />
        <ContactSectionNew />
      </main>
      <SiteFooter />
    </>
  )
}
