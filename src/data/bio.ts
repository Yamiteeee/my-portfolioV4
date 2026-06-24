// src/data/bio.ts

export interface SkillGroup {
  category: string;
  skills: string[];
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
}

export const bioData: BioData = {
  sectionIndex: "",
  sectionTitle: "About Me",
  headline: "Engineering with intent, not just convention.",
  paragraphs: [
"I am an AI-accelerated software engineer built for autonomous execution. By combining deep full-stack architecture with modern AI tools like Gemini, ChatGPT, and GitHub Copilot, I cut out overhead and rapidly transition complex concepts into production-ready software independently, requiring minimal oversight to drive results.",
    "My engineering capabilities allow me to act as a complete, one-person product team across the entire software spectrum. I own the lifecycle from end to end—whether that means crafting pixel-perfect business landing pages, spinning up functional MVPs from scratch for startups, or developing secure, multi-layered custom web applications to streamline company operations.",
    "I specialize in shipping rapidly with Next.js on the frontend and Supabase as my robust backend engine for instant authentication and real-time PostgreSQL databases, all continuously deployed via Vercel. I bring a highly disciplined, self-starting approach to software development, utilizing bleeding-edge workflows to maximize shipping velocity without sacrificing architectural quality."
  ],
  // Pointing directly to your organized public assets folder structure
  avatarSrc: "/Bio/ProfilePic/profile.jpg",
  cvSrc: "/Bio/Cv/Jason_Platino_Resume.pdf",
  cvDownloadName: "Jason_Platino_Resume.pdf",
  expertise: [
    {
      category: "Architecture & Frontend",
      skills: ["Next.js (App Router)", "TypeScript", "Tailwind CSS", "React Server Components", "State Management" , "Framer Motion", ]
    },
    {
      category: "Backend & Databases",
      skills: ["Node.js", "PostgreSQL", "Supabase", "Express.js", "REST APIs", "Database Design"]
    },
    {
      category: "DevOps & Deployment",
      skills: ["Vercel", "CI/CD Pipelines", "Git / GitHub Action" ,"Proxmox", "Ubuntu Server Management"]
    }
  ]
};