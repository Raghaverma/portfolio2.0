export type Role = {
  company: string;
  title: string;
  start: string;
  end: string;
  summary: string;
};

export type Education = {
  degree: string;
  school: string;
  start: string;
  end: string;
};

/** "Feb 2026" + "May 2026" → "Feb – May 2026"; otherwise "start – end". */
export function dateRange(start: string, end: string): string {
  const [startMonth, startYear] = start.split(" ");
  const [, endYear] = end.split(" ");
  return startYear && startYear === endYear ? `${startMonth} – ${end}` : `${start} – ${end}`;
}

// Newest first.
export const roles: Role[] = [
  {
    company: "Khel.AI",
    title: "Computer Vision Engineer",
    start: "May 2026",
    end: "Present",
    summary: "Own AutoClip end to end, from model choice and detection logic to GPU deployment.",
  },
  {
    company: "Khel.AI",
    title: "SDE Intern",
    start: "Feb 2026",
    end: "May 2026",
    summary:
      "Built the first AutoClip: broadcast ingestion, YOLOv8 delivery detection, FFmpeg clipping and React review tools.",
  },
  {
    company: "Hypeliv Solutions",
    title: "Frontend Engineer (Contract)",
    start: "Aug 2025",
    end: "Jan 2026",
    summary: "Real-time trading UI on WebSocket market data; cut LCP from 2.5 s to 1.5 s.",
  },
  {
    company: "The TechnoLabs",
    title: "Frontend Engineer Intern",
    start: "Jan 2024",
    end: "Jul 2024",
    summary: "React invoicing app with PDF export; Python scripts to validate OCR datasets.",
  },
];

export const education: Education[] = [
  {
    degree: "Master of Computer Applications",
    school: "Vivekananda Institute of Professional Studies (GGSIPU)",
    start: "2024",
    end: "2026",
  },
  {
    degree: "Bachelor of Computer Applications",
    school: "Bennett University",
    start: "2021",
    end: "2024",
  },
];
