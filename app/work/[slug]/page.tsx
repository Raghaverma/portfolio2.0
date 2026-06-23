import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject, projectSlugs } from "@/content/projects";
import { CaseStudy } from "@/components/work/CaseStudy";

export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata(
  props: PageProps<"/work/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) return {};
  const title = `${project.name} — ${project.kind}`;
  return {
    title,
    description: project.summary,
    openGraph: {
      title,
      description: project.summary,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: project.summary,
    },
  };
}

export default async function ProjectPage(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) notFound();
  return (
    <main>
      <CaseStudy project={project} />
    </main>
  );
}
