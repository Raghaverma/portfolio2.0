import { otherWork } from "@/content/projects";
import { TextLink } from "@/components/TextLink";

export function OtherWork() {
  return (
    <ul className="space-y-5">
      {otherWork.map((project) => (
        <li key={project.name}>
          <div className="flex flex-wrap items-baseline justify-between gap-x-4">
            <h3 className="font-semibold text-fg">{project.name}</h3>
            <p className="flex gap-3 text-sm text-muted">
              {project.links.length > 0
                ? project.links.map((link) => (
                    <TextLink key={link.href} href={link.href} className="link">
                      {link.label}
                      <span aria-hidden> ↗</span>
                    </TextLink>
                  ))
                : project.note}
            </p>
          </div>
          <p className="mt-1 text-pretty text-[15px] text-muted">{project.summary}</p>
        </li>
      ))}
    </ul>
  );
}
