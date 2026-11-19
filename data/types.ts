import { ProjectStatusTone } from "@/components/project-carousel/project-card";
import { StaticImageData } from "next/image";

export type PlayStoreInfo = {
  title: string;
  url: string;
};

export type Project = {
  title: string;
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

export type CarouselProject = {
  id: string | number;
  title: string;
  description: string;
  tag: string;
  status?: { label: string; tone?: ProjectStatusTone };
  image?: string | StaticImageData;
  imageAlt?: string;
  category: string;
  role: string;
  stack: string;
  href: string;
  demoUrl?: string;
  github?: string;
};
