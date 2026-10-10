import type { SiteContent } from "./types";

export const site: SiteContent = {
  name: "Luís Marques",
  role: "Web & Mobile Developer",
  stack: [
    "Next.js",
    "React",
    "TypeScript",
    "React Native",
    "Expo",
    "Tailwind CSS",
    "Sanity",
    "Firebase",
  ],
  url: "https://luis-marques.vercel.app",
  cv: {
    label: "View CV",
    href: "/luis-marques-cv.pdf",
  },
  hero: {
    intro:
      "I build websites and mobile apps with React, from real-estate platforms to B2B catalogues and a baby-care app. Based in Viana do Castelo, Portugal, and open to new opportunities.",
    projectsLinkLabel: "See my projects",
  },
  projectsSection: {
    heading: "Projects",
  },
  contact: {
    githubUrl: "https://github.com/lmarques39",
    githubLabel: "GitHub",
    linkedinUrl: "https://www.linkedin.com/in/lu%C3%ADs-marques39/",
    linkedinLabel: "LinkedIn",
    email: "lfrm39@gmail.com",
  },
  notFound: {
    message: "Sorry, this page doesn't exist.",
    backHomeLabel: "Back to Home",
  },
  meta: {
    homeTitle: "Luís Marques — Web & Mobile Developer",
    homeDescription:
      "Portfolio of Luís Marques, a web and mobile developer in Portugal building with Next.js, React and React Native.",
    notFoundTitle: "Page not found — Luís Marques",
  },
};
