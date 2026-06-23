export type Role = {
  company: string;
  title: string;
  start: string;
  end: string;
  current?: boolean;
  summary: string;
  highlights: string[];
  stack: string[];
};

export const experience: Role[] = [
  {
    company: "Khel.AI",
    title: "Software Engineer",
    start: "May 2026",
    end: "Present",
    current: true,
    summary:
      "Continuing to own and extend AutoClip post-internship — deepening the CV pipeline and taking on broader system responsibilities.",
    highlights: [
      "Retained full ownership of the AutoClip pipeline after internship completion; continuing active development.",
      "Expanding scope beyond clip extraction into downstream analytics and model improvement workflows.",
    ],
    stack: ["Python", "YOLOv8", "OpenCV", "FFmpeg", "Express", "Socket.IO", "React"],
  },
  {
    company: "Khel.AI",
    title: "SDE Intern",
    start: "Feb 2026",
    end: "May 2026",
    summary:
      "Built the real-time computer-vision pipeline behind AutoClip — from broadcast ingestion to lossless clip extraction.",
    highlights: [
      "Architected a low-latency edge ingestion system with Express, OBS WebSocket, and Socket.IO for real-time broadcast processing.",
      "Built FFmpeg video workflows — transcoding, stream-copy clipping, atomic writes, automated cache cleanup.",
      "Developed an end-to-end cricket analytics pipeline (YOLOv8, OpenCV, temporal motion analysis) that auto-detects and clips deliveries from full-match footage.",
      "Engineered multi-stage delivery detection: wrist-apex tracking, foot-contact analysis, trajectory validation, replay suppression, scene segmentation.",
      "Built React review tooling and frame-level analytics for classification, release tracking, no-ball estimation, and detector-training workflows.",
    ],
    stack: ["Python", "YOLOv8", "OpenCV", "FFmpeg", "Express", "Socket.IO", "React"],
  },
  {
    company: "Hypeliv Solutions",
    title: "Frontend Engineer (Contract)",
    start: "Aug 2025",
    end: "Jan 2026",
    summary:
      "Performance and reliability work on a real-time Next.js trading platform.",
    highlights: [
      "Cut LCP from 2.5s to 1.5s through code splitting and lazy loading.",
      "Built real-time trading interfaces over WebSocket market streams.",
      "Defined type-safe API contracts with backend teams.",
      "Hardened UI data handling with schema validation.",
    ],
    stack: ["Next.js", "TypeScript", "WebSocket", "Tailwind CSS"],
  },
  {
    company: "The TechnoLabs",
    title: "Frontend Engineer Intern",
    start: "Jan 2024",
    end: "Jul 2024",
    summary:
      "Full invoice-lifecycle tooling and data-validation automation.",
    highlights: [
      "Built a React invoice system with validation and PDF export.",
      "Integrated REST APIs across the full invoice lifecycle.",
      "Automated OCR dataset validation with Python scripts.",
      "Improved data consistency through structured validation logic.",
    ],
    stack: ["React", "REST APIs", "Python", "JavaScript"],
  },
];

export type Education = {
  school: string;
  degree: string;
  start: string;
  end: string;
};

export const education: Education[] = [
  {
    school: "Vivekananda Institute of Professional Studies · GGSIPU",
    degree: "Master of Computer Applications",
    start: "2024",
    end: "2026",
  },
  {
    school: "Bennett University",
    degree: "Bachelor of Computer Applications",
    start: "2021",
    end: "2024",
  },
];
