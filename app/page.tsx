import { Intro } from "@/components/Intro";
import { Section } from "@/components/Section";
import { ProjectEntry } from "@/components/ProjectEntry";
import { OtherWork } from "@/components/OtherWork";
import { Experience } from "@/components/Experience";
import { featured } from "@/content/projects";

export default function Home() {
  return (
    <>
      <Intro />
      <Section id="work" title="Work">
        <div className="divide-y divide-line">
          {featured.map((project) => (
            <ProjectEntry key={project.slug} project={project} />
          ))}
        </div>
      </Section>
      <Section id="other-work" title="Other work">
        <OtherWork />
      </Section>
      <Section id="experience" title="Experience">
        <Experience />
      </Section>
    </>
  );
}
