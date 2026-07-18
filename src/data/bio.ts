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
 headline: "From data schema to fluid interface.",
paragraphs: [
      "I build full-stack web applications independently from architecture decisions to deployment using AI tools like Copilot and ChatGPT as part of my daily workflow, not as a crutch. I move fast because I own the whole problem, not just my slice of it.",
      
      "As a self-driven Full-Stack Engineer, my focus is on velocity, architectural autonomy, and shipping software that solves real enterprise problems. Working inside the EdTech space, I operate as a solo engineering unit—designing, deploying, and maintaining a robust suite of applications used across corporate environments.",
      
      "Enterprise & Solo Deployments Include:",
      
      "• Enterprise EdTech Architecture: Engineered and shipped a comprehensive, city-scale Learning Management System (LMS).",
      
      "• Mobile Ecosystems: Built and launched a cross-platform Flutter ticketing application for immediate workplace triage.",
      
      "• Data Infrastructure: Designed a secure, internal enterprise file management platform.",
      
      "• Commercial SaaS & Web: Shipped multi-tenant inventory management systems and custom booking engines for private clients.",
      
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
    { value: "9+",     label: "Projects shipped" },
    { value: "15+",    label: "Tools in my stack" },
  ],

 expertise: [
    {
      category: "Architecture & Frontend",
      skills: [
        "Next.js (App Router)",
        "TypeScript",
        "Refine Framework", //  ADDED: Showcases your enterprise state engine capability
        "shadcn/ui",         // ADDED: Proves modern component-driven layout mastery
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
    },
    {
      category: "AI & Workflow Automation",
      skills: [
        "Zapier",
        "Make.com",
        "LLM API Integration",
        "Workflow Engineering",
      ]
    }
  ]
};