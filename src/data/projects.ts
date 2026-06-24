// src/data/projects.ts

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  folderSlug: string;
  imageExtension: 'png' | 'jpg' | 'jpeg' | 'webp';
  imageCount?: number;
  projectUrl?: string;
  githubUrl?: string;
  status: 'live' | 'internal' | 'in-progress';
  role: string;
}

export const projectsData: Project[] = [
  {
    id: "inventory-saas",
    title: "Inventory SaaS",
    description: "A professional inventory management dashboard with real-time stock tracking and analytics.",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion", "PostgreSQL", "Supabase"],
    folderSlug: "inventory-saas",
    imageExtension: "jpg",
    imageCount: 5,
    status: "live",
    role: "Solo · Full Stack",
    projectUrl: "https://inventory-saas-kappa.vercel.app",
    githubUrl: "https://github.com/Yamiteeee/inventory-saas",
  },
  {
    id: "lms",
    title: "Learning Management System",
    description: "An educational platform featuring video streaming, course progress tracking, and student quizzes. Built independently — currently in final polish before deployment.",
    tags: ["Next.js", "Express.js", "MySQL", "Tailwind CSS", "TypeScript", "Proxmox", "Ubuntu"],
    folderSlug: "lms",
    imageExtension: "png",
    imageCount: 5,
    status: "in-progress",
    role: "Solo · Full Stack",
    // Private repo — no githubUrl, no projectUrl
  },
  {
    id: "soliya-resort",
    title: "Soliya Resort Website",
    description: "A luxury resort landing and booking platform with smooth animations and an integrated reservation calendar.",
    tags: ["Next.js", "Framer Motion", "Tailwind CSS"],
    folderSlug: "soliya-resort",
    imageExtension: "jpg",
    imageCount: 4,
    status: "live",
    role: "Solo · Frontend",
    projectUrl: "https://soliya-resort.vercel.app",
    githubUrl: "https://github.com/Yamiteeee/soliya-resort",
  },
  {
    id: "spc-file-storage",
    title: "SPC File Storage",
    description: "Secure internal cloud storage for a company — upload, organize, and share documents with permission-based access. Built solo and used in production.",
    tags: ["Next.js", "React", "Supabase", "Tailwind CSS", "TypeScript", "PostgreSQL"],
    folderSlug: "spc-file-storage",
    imageExtension: "jpg",
    imageCount: 12,
    status: "internal",
    role: "Solo · Full Stack",
    projectUrl: "https://spcdrive.vercel.app",
    // No githubUrl — internal company project
  },
  {
    id: "ticketing-app",
    title: " Mobile Ticketing  System App",
    description: "Mobile app for real-time ticket booking and event management, built solo and deployed inside a company. 13 screens, full booking flow.",
    tags: ["Flutter", "Dart", "Node.js", "Rails", "Aiven", "Render"],
    folderSlug: "ticketing-app",
    imageExtension: "jpg",
    imageCount: 13,
    status: "internal",
    role: "Solo · Mobile",
    // No links — internal tool, company data
  },
];