// src/data/projects.ts

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  folderSlug: string; 
  imageExtension: 'png' | 'jpg' | 'jpeg' | 'webp';
  imageCount?: number; // 👈 Add this single number flag instead of names!
  projectUrl?: string;
  githubUrl?: string;
}

export const projectsData: Project[] = [
  {
    id: "inventory-saas",
    title: "Inventory SaaS",
    description: "A professional inventory management dashboard with real-time stock tracking and analytics.",
    tags: ["Next.js", "Tailwind CSS", "Framer Motion", "PostgreSQL" , "Supabase" ],
    folderSlug: "inventory-saas",
    imageExtension: "jpg",
    imageCount: 5, // 👈 Means you have 1.jpg, 2.jpg, 3.jpg, 4.jpg inside that folder!
  },
  {
    id: "lms",
    title: "Learning Management System",
    description: "An educational platform featuring video streaming, course progress tracking, and student quizzes.",
    tags: ["Next.js", "Express.js", "Mysql", "Tailwind CSS", "TypeScript" , "Proxmox" , "Ubuntu"],
    folderSlug: "lms",
    imageExtension: "png",
    imageCount: 5, // 👈 Means you have 1.png, 2.png, 3.png inside that folder!
  },
  {
    id: "soliya-resort",
    title: "Soliya Resort Website",
    description: "A luxury resort booking platform with smooth animations and an integrated reservation calendar.",
    tags: ["Next.js", "Framer Motion", "Tailwind CSS"],
    folderSlug: "soliya-resort",
    imageExtension: "jpg",
    imageCount: 4,
  },
  {
    id: "spc-file-storage",
    title: "SPC File Storage",
    description: "A secure cloud storage application allowing users to upload, organize, and share documents.",
    tags: ["Next.js", "React", "Supabase", "Tailwind CSS", "TypeScript", "postgreSQL"],
    folderSlug: "spc-file-storage",
    imageExtension: "jpg",
    imageCount: 12,
  },
  {
    id: "ticketing-app",
    title: "Ticketing App",
    description: "A Mobile Ticketing App built with Flutter and Dart, featuring real-time ticket booking and event management.",
    tags: ["Flutter", "Dart","node.js","Rails", "Aiven", "render"],
    folderSlug: "ticketing-app",
    imageExtension: "jpg",
    imageCount: 13,
  }
];