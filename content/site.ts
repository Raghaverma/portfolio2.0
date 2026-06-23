export const site = {
  name: "Raghav Verma",
  role: "Software Engineer",
  roleLong: "Full-stack & applied-CV engineer",
  location: "New Delhi, India",
  timezone: "IST · UTC+5:30",
  url: "https://raghav-verma.com",
  email: "raghav.verma.work@gmail.com",
  description:
    "Software engineer building real-time systems, computer-vision pipelines, and resilient developer tooling. I care about architecture, type safety, and interfaces that feel inevitable.",
  keywords: [
    "Raghav Verma",
    "Software Engineer",
    "Full-stack Developer",
    "Computer Vision",
    "TypeScript",
    "Next.js",
    "Python",
    "Khel.AI",
  ],
  // One-line positioning used in the hero
  pitch: [
    "I build systems that",
    "survive the real world",
  ],
  available: true,
  availabilityNote: "Open to SDE roles · 2026",
  socials: {
    github: "https://github.com/Raghaverma",
    npm: "https://www.npmjs.com/~0xsantoryu",
    linkedin: "https://www.linkedin.com/in/raghaverma/",
    email: "mailto:raghav.verma.work@gmail.com",
    resume: "/RaghavVerma_CV.pdf",
  },
} as const;

export const nav = [
  { label: "Work", href: "/#work", index: "01" },
  { label: "About", href: "/#about", index: "02" },
  { label: "Stack", href: "/#stack", index: "03" },
  { label: "Contact", href: "/#contact", index: "04" },
] as const;
