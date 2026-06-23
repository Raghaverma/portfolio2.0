export type SkillGroup = {
  label: string;
  index: string;
  items: string[];
};

export const skills: SkillGroup[] = [
  {
    index: "01",
    label: "Languages",
    items: ["TypeScript", "JavaScript (ES6+)", "Python", "SQL"],
  },
  {
    index: "02",
    label: "Frontend",
    items: ["React", "Next.js", "Vite", "Tailwind CSS", "shadcn/ui", "HTML5", "CSS3"],
  },
  {
    index: "03",
    label: "CV / AI",
    items: [
      "YOLOv8",
      "OpenCV",
      "Pose estimation",
      "Object tracking",
      "Temporal motion analysis",
      "Geometric feature extraction",
    ],
  },
  {
    index: "04",
    label: "Backend",
    items: ["Node.js", "Express", "Socket.IO", "WebSocket", "REST APIs", "PostgreSQL", "Prisma ORM"],
  },
  {
    index: "05",
    label: "Systems",
    items: ["FFmpeg", "Docker", "Python CLI", "Shell scripting", "Git", "Electron"],
  },
  {
    index: "06",
    label: "Visualization",
    items: ["Three.js", "React Three Fiber", "WebGL", "Canvas API"],
  },
  {
    index: "07",
    label: "Testing",
    items: ["Postman", "Jest", "Vitest"],
  },
];

// Marquee tokens — a fast-scrolling technical ticker
export const marqueeTokens: string[] = [
  "TypeScript",
  "Python",
  "Next.js",
  "React",
  "YOLOv8",
  "OpenCV",
  "FFmpeg",
  "Socket.IO",
  "WebSocket",
  "PostgreSQL",
  "Docker",
  "Node.js",
  "Three.js",
  "WebGL",
  "Circuit Breakers",
  "Real-time",
  "Computer Vision",
];
