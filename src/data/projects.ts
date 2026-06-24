// src/data/projects.ts

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  folderSlug: string; 
  imageExtension: 'png' | 'jpg' | 'jpeg' | 'webp'; // 👈 Add this line
  projectUrl?: string;
  githubUrl?: string;
}

export const projectsData: Project[] = [
  {
    id: "inventory-saas",
    title: "Inventory SaaS",
    description: "A professional inventory management dashboard with real-time stock tracking and analytics.",
    tags: ["Next.js", "Tailwind CSS", "Prisma", "PostgreSQL"],
    folderSlug: "inventory-saas",
    imageExtension: "jpg", // Change to png if needed
  },
  {
    id: "lms",
    title: "Learning Management System",
    description: "An educational platform featuring video streaming, course progress tracking, and student quizzes.",
    tags: ["Next.js", "TypeScript", "Stripe"],
    folderSlug: "lms",
    imageExtension: "png", // 👈 Set to png for your LMS!
  },
  {
    id: "soliya-resort",
    title: "Soliya Resort Website",
    description: "A luxury resort booking platform with smooth animations and an integrated reservation calendar.",
    tags: ["Next.js", "Framer Motion", "Tailwind CSS"],
    folderSlug: "soliya-resort",
    imageExtension: "jpg",
  },
  {
    id: "spc-file-storage",
    title: "SPC File Storage",
    description: "A secure cloud storage application allowing users to upload, organize, and share documents.",
    tags: ["Next.js", "React", "Cloud Storage API"],
    folderSlug: "spc-file-storage",
    imageExtension: "jpg",
  },
  {
    id: "ticketing-app",
    title: "Ticketing App",
    description: "A collaborative support ticket tracker featuring kanban boards and real-time status updates.",
    tags: ["Next.js", "Zustand", "Tailwind CSS"],
    folderSlug: "ticketing-app",
    imageExtension: "jpg",
  }
];