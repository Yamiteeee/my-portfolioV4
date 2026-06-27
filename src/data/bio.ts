// src/data/bio.ts

export interface SkillGroup {
  category: string;
  skills: string[];
}

export interface StatChipData {
  value: string;
  label: string;
}

export interface BioData {
  sectionIndex: string;
  sectionTitle: string;
  headline: string;
  paragraphs: string[];
  avatarSrc: string;
  cvSrc: string;
  cvDownloadName: string;
  expertise: SkillGroup[];
  stats: StatChipData[];
}

export const bioData: BioData = {
  sectionIndex: "",
  sectionTitle: "About Me",
  headline: "Engineering with intent, not just convention.",
   paragraphs: [
  "I build full-stack web applications independently — from architecture decisions to deployment — using AI tools like Copilot and ChatGPT as part of my daily workflow, not as a crutch. I move fast because I own the whole problem, not just my slice of it.",
  "Over the past year I shipped three production apps solo at work: a Flutter ticketing system, an internal file management platform, and a learning management system — each built from scratch and handed off to real users. On the side I've been building web projects too, including a resort landing and booking page and an inventory SaaS — with more in the pipeline.",
  "My current stack is Next.js with the App Router, Supabase for auth and real-time databases, and Vercel for deployment. I care about shipping something that works, is maintainable, and doesn't need a second person to keep it alive."
],
  avatarSrc: "/Bio/ProfilePic/Profile.jpg",
  cvSrc: "/Bio/Cv/Jason_Platino_Resume.pdf",
  cvDownloadName: "Jason_Platino_Resume.pdf",

  // ─── Proof stats — shown in the stat bar beneath the identity header ───────
  // ~2 yrs = 4th year college projects + capstone + 9 months solo professional
  // 3 solo apps = ticketing app (Flutter), file system, LMS
  // 15+ = honest count of tools actively used, not "mastered"
    stats: [
    { value: "~2 yrs", label: "Building software" },
    { value: "7+",     label: "Projects shipped" },
    { value: "15+",    label: "Tools in my stack" },
    ],

  expertise: [
    {
      category: "Architecture & Frontend",
      skills: [
        "Next.js (App Router)",
        "TypeScript",
        "Tailwind CSS",
        "React Server Components",
        "State Management",
        "Framer Motion",
      ]
    },
    {
      category: "Backend & Databases",
      skills: [
        "Node.js",
        "PostgreSQL",
        "Supabase",
        "Express.js",
        "REST APIs",
        "Database Design",
      ]
    },
    {
      category: "DevOps & Deployment",
      skills: [
        "Vercel",
        "CI/CD Pipelines",
        "Git / GitHub Actions",
        "Proxmox",
        "Ubuntu Server Management",
      ]
    }
  ]
};