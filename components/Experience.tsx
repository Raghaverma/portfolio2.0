import { roles, education, dateRange } from "@/content/experience";

export function Experience() {
  return (
    <>
      <ol className="space-y-6">
        {roles.map((role) => (
          <li key={`${role.company}-${role.start}`}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
              <h3 className="font-semibold text-fg">
                {role.title} <span className="font-normal text-muted">· {role.company}</span>
              </h3>
              <p className="font-mono text-[13px] text-muted">{dateRange(role.start, role.end)}</p>
            </div>
            <p className="mt-1 text-pretty text-[15px] text-muted">{role.summary}</p>
          </li>
        ))}
      </ol>

      <h3 className="mt-10 text-sm font-medium text-muted">Education</h3>
      <ul className="mt-4 space-y-4">
        {education.map((item) => (
          <li key={item.degree}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
              <p className="text-[15px] text-fg">{item.degree}</p>
              <p className="font-mono text-[13px] text-muted">{dateRange(item.start, item.end)}</p>
            </div>
            <p className="text-pretty text-[15px] text-muted">{item.school}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
