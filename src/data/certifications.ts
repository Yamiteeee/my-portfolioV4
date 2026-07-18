// src/data/certifications.ts

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  date: string;
  credentialId?: string;
  verifyUrl?: string;
  skills: string[];
  imagePath: string; // Points directly to the PDF in public/certs
}

export const certificationsData: Certification[] = [
  {
    id: "google-cybersecurity-foundations",
    title: "Foundations of Cybersecurity",
    issuer: "Google (via Coursera)",
    date: "Jul 2026",
    credentialId: "FEM29BC50749",
    verifyUrl: "https://coursera.org/verify/FEM29BC50749",
    skills: ["Cybersecurity Frameworks", "Network Security", "Risk Assessment"],
    imagePath: "/certs/Coursera Cyber Security Certificate.pdf", 
  },
  {
    id: "brighttalk-cybersecurity-ai-regulatory",
    title: "The Evolving Cybersecurity & AI Regulatory Landscape",
    issuer: "BrightTALK (by Informa TechTarget)",
    date: "Oct 2025",
    verifyUrl: "https://www.blackduck.com/resources/webinars.html?commid=650996",
    skills: ["AI Regulation", "Software Supply Chain Risk", "Compliance Management"],
    imagePath: "/certs/brighttalk-viewing-certificate-the-evolving-cybersecurity-&-ai-regulatory-landscape.pdf", 
  },
  {
    id: "spc-mobile-api-guest-speaker",
    title: "Guest Speaker: API Integration in Mobile Development Emerging Technologies",
    issuer: "San Pablo Colleges (Computer Studies Dept.)",
    date: "May 2026",
    skills: [
      "API Integration", 
      "Mobile Innovation", 
      "Technical Mentorship", 
      "Emerging Technologies"
    ],
    imagePath: "/certs/mobile-api-appreciation.jpg", 
  },
];