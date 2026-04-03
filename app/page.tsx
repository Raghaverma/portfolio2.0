import { Navigation } from "@/components/layout/navigation"
import { GreetingPreloaderClient } from "@/components/shared/greeting-preloader-client"
import { HeroNew } from "@/components/sections/hero-new"
import { StatsBar } from "@/components/sections/stats-bar"
import { SelectedWork } from "@/components/sections/selected-work"
import { StatusDashboard } from "@/components/sections/status-dashboard"
import { ExperienceSnippet } from "@/components/sections/experience-snippet"
import { SkillsSnippet } from "@/components/sections/skills-snippet"
import { ContactSectionNew } from "@/components/sections/contact-section-new"
import { SiteFooter } from "@/components/layout/site-footer"

export default function Home() {
  return (
    <>
      <GreetingPreloaderClient />
      <Navigation />
      <main className="pb-24 md:pb-0">
        <HeroNew />
        <StatsBar />
        <SelectedWork />
        <StatusDashboard />
        <ExperienceSnippet />
        <SkillsSnippet />
        <ContactSectionNew />
      </main>
      <SiteFooter />
    </>
  )
}
