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
    title: "StockLogic Inventory SaaS",
    description: "A professional B2B inventory asset platform featuring deep ledger auditing and real-time temporal revenue tracking. Implements automated day, week, month, and year financial metrics parsed directly from state-mutating inventory records.",
    tags: ["Next.js", "Supabase", "PostgreSQL", "Tailwind CSS", "Framer Motion"],
    folderSlug: "inventory-saas",
    imageExtension: "jpg",
    imageCount: 5,
    status: "live",
    role: "Solo · Full Stack",
    projectUrl: "https://inventory-saas-kappa.vercel.app",
    githubUrl: "https://github.com/Yamiteeee/inventory-saas",
  },


    {
      id: "my-hospital-booking",
      title: "MedVA Secure Hospital Booking",
      description: "An advanced, enterprise-grade healthcare portal with a real-time scheduling engine. Implements complex constraint validation for doctor leaves and dynamic off-time blocks, an atomic Postgres global metrics pipeline, and state-guarded role authorization flows.",
      tags: ["Next.js 16", "React", "TypeScript", "Tailwind CSS", "Supabase", "Refine Framework", "PostgreSQL"],
      folderSlug: "hospital-booking",
      imageExtension: "jpg", 
      imageCount: 5,         
      status: "live",
      role: "Solo · Full Stack",
      projectUrl: "https://hospital-booking-neon.vercel.app/", // Adjust if your live URL is different
      githubUrl: "https://github.com/Yamiteeee/my-hospital-booking", 
    },


      {
      id: "job-copilot",
      title: "Job Copilot Dashboard",
     description: "Engineered a state-driven Kanban architecture utilizing Next.js custom hooks to enable real-time, zero-auth cross-device synchronization via dynamic REST proxy API routes. Implemented an automated background data ingestion system processing webhook payloads from a Make.com web scraper directly into a cloud-hosted Supabase PostgreSQL database, backed by a programmatic duplicate filtration layer and an algorithmic local match engine evaluation tool.",
      tags: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Make.com"],
      folderSlug: "job-copilot",
      imageExtension: "jpg", // Change to "png" if your images are png files
      imageCount: 3,        // Set this to the number of screenshots you added to public/job-copilot/
      status: "live",
      role: "Solo · Full-Stack",
      projectUrl: "https://job-copilot-one.vercel.app", // Update with your actual deployed app link
      githubUrl: "https://github.com/Yamiteeee/job-copilot",   // Update with your repository link if different
    },

 {
    id: "lms",
    title: "Atlas LMS",
    description: "A sophisticated, multi-tenant learning management architecture supporting tier virtualization from early education to graduate schools. Engineered with an automated computational grading engine, responsive state attendance modules, dynamic assignment/assessment creation, and proctored client-telemetry validation for exam integrity.",
    tags: ["Next.js", "Express.js", "MySQL", "Proxmox VE", "Ubuntu Server", "TypeScript"],
    folderSlug: "lms",
    imageExtension: "png",
    imageCount: 5,
    status: "in-progress",
    role: "Solo · Fullstack",
    // Private repo — no githubUrl, no projectUrl
  },

{
      id: "ticketing-app",
      title: "Enterprise Mobile IT Ticketing System",
      description: "A production-grade mobile ticketing system deployed internally within a corporate network. Features full administrative account lifecycle controls, monthly operational metrics monitoring, and a continuous ticket-locked communication thread managed via a client-side API short-polling mechanism.",
      tags: ["Flutter", "Express.js", "MySQL", "Aiven Cloud", "Render Cloud"],
      folderSlug: "ticketing-app",
      imageExtension: "jpg",
      imageCount: 13,
      status: "internal",
      role: "Solo · Full Stack",
      // No links — internal tool, company data
    },


{
    id: "spc-file-storage",
    title: "SPCDrive Secure Asset Repository",
    description: "An enterprise-grade, internal cloud storage infrastructure deploying full asset lifecycle management and granular Role-Based Access Control (RBAC). Outfitted with an administrative portal allowing comprehensive account manipulation, security suspension, and profile tuning mapped over a relational database schema.",
    tags: ["Next.js", "Supabase", "PostgreSQL", "TypeScript", "Tailwind CSS"],
    folderSlug: "spc-file-storage",
    imageExtension: "jpg",
    imageCount: 12,
    status: "internal",
    role: "Solo · Full Stack ",
    projectUrl: "https://spcdrive.vercel.app",
    // No githubUrl — internal company project
  },



      {
      id: "aplaya-boracay",
      title: "Aplaya Boracay",
      description: "A premium, high-performance web experience for a luxury beachfront restaurant in Boracay. Implements client-side database simulation via mock data files, custom UI carousels, and adaptive device viewports.",
      tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Mock Data Architecture"],
      folderSlug: "BoracayBar",
      imageExtension: "jpg", 
      imageCount: 4,         
      status: "live",
      role: "Solo · Frontend",
      projectUrl: "https://boracay-resto-bar.vercel.app",
      githubUrl: "https://github.com/Yamiteeee/boracay-resto-bar", 
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

];