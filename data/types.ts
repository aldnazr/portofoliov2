export type PlayStoreInfo = {
  title: string;
  url: string;
};

export type Project = {
  name: string;
  category: string;
  description: string;
  technologies: string[];
  contributions?: string;
  role: string[];
  year?: string | number;
  result?: string;
  demoUrl?: string;
  sourceUrl?: string;
  playStoreUrl?: PlayStoreInfo[];
  image?: {
    src: string;
    alt: string;
  };
};
