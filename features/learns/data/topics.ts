import { LearnTopic } from "./types";

export type TopicCard = {
  id: LearnTopic | "rendering";
  index: string;
  category: string;
  title: string;
  description: string;
  tags: string[];
  href: string;
};

export const topicCards: TopicCard[] = [
  {
    id: "paradigms",
    index: "01",
    category: "Paradigma Pemrograman",
    title: "Functional & OOP",
    description:
      "Perbandingan mendalam Functional Programming (TypeScript) dan Object-Oriented Programming (Dart): pure function, immutability, closure, higher-order function, encapsulation, inheritance, polymorphism, hingga abstraction.",
    tags: [
      "TypeScript",
      "Dart",
      "Pure Function",
      "Immutability",
      "Encapsulation",
      "Polymorphism",
    ],
    href: "/learns/paradigms",
  },
  {
    id: "methods",
    index: "02",
    category: "Manipulasi Data",
    title: "Array & String Methods",
    description:
      "Keterangan dan contoh penggunaan dari method esensial: forEach, map, filter, reduce, flat, flatMap, split, dan join.",
    tags: [
      "forEach",
      "map",
      "filter",
      "reduce",
      "flat",
      "flatMap",
      "split",
      "join",
    ],
    href: "/learns/methods",
  },
  {
    id: "state-management",
    index: "03",
    category: "Manajemen State",
    title: "Global State Management",
    description:
      "Kapan UI harus ikut update saat state berubah dan kapan cukup baca atau ubah sekali, dibandingkan antara React (Zustand) dan Flutter (Riverpod) lewat contoh kode nyata.",
    tags: [
      "Zustand",
      "Riverpod",
      "useStore",
      "ref.watch",
      "getState",
      "ref.listen",
    ],
    href: "/learns/state-management",
  },
  {
    id: "rendering",
    index: "04",
    category: "Rendering Strategies",
    title: "Rendering Strategies",
    description:
      "Perbandingan empat strategi rendering Next.js dengan demo timestamp: kapan HTML dibuat, dari mana timestamp berasal, dan bagaimana perilaku refresh tiap strategi (CSR, SSR, SSG, ISR).",
    tags: ["CSR", "SSR", "SSG", "ISR", "Next.js", "Revalidation"],
    href: "/learns/rendering",
  },
];