export type SiteContent = {
    name: string;
    role: string;
    stack: string[];
    url: string;
    cv: {
        label: string;
        href: string;
    };
    hero: {
        intro: string;
        projectsLinkLabel: string;
    };
    projectsSection: {
        heading: string;
        linksPreview?: {
            label: string;
            href: string;
        }[];
    }
    contact: {
        githubUrl: string;
        githubLabel: string;
        linkedinUrl: string;
        linkedinLabel: string;
        email: string;
    };
    notFound: {
        message: string;
        backHomeLabel: string;
    };
    meta: {
        homeTitle: string;
        homeDescription: string;
        notFoundTitle: string;
    };
};

// One project page. Fields follow the 8 page sections in spec §2, in order.
export type Project = {
  // 1. Name and one-line description
  slug: string;
  name: string;
  oneLiner: string;
  logo: string;
  // 2. Overview
  overview: string;
  // 3. My role
  role: string;
  // 4. Stack
  stack: string[];
  // 5. Key features
  keyFeatures: string[];
  // 6. Unique feature
  uniqueFeature: {
    title: string;
    howIBuiltIt: string;
    video: string;
    poster: string;
  };
  // 7. Preview
  screenshots: {
    src: string;
    alt: string;
  }[];
  // 8. Links
  links: {
    // Optional: only added once the previewec §2, US-10).
    preview?: string;
    code: string;
  };
};