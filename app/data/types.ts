export type Project = {
  name: string;
  category: string;
  description: string;
  technologies: string[];
  contributions?: string;
  role: string[];
  result?: string;
  demoUrl?: string;
  sourceUrl?: string;
  playStoreUrl?: string;
  image?: {
    src: string;
    alt: string;
  };
};
