import { CarouselProject, type Project } from "@/data/types";

export const projects: Project[] = [
  {
    name: "Ahsan Xpress",
    category: "Logistik dan Transportasi",
    role: ["Mobile", "Frontend"],
    description:
      "Memperbarui ekosistem mulai dari mobile apps (customer & driver), dan juga web admin.",
    technologies: [
      "Flutter",
      "Dart",
      "Riverpod",
      "Dio",
      "GoRouter",
      "Next.js",
      "Typescript",
      "NextAuth",
      "Zustand",
      "React Query",
      "Zod",
    ],
    contributions:
      "Berkolaborasi dengan tim untuk membangun ulang aplikasi customer dan driver dengan Flutter serta Riverpod untuk state management yang reaktif, sambil mengembangkan ulang web admin berbasis Next.js dan TypeScript. Pekerjaan saya mencakup perancangan arsitektur fitur baru, integrasi API logistik untuk order, tracking, dan penugasan driver, sampai memastikan pengalaman pengguna di kedua platform tetap konsisten.",
    playStoreUrl: [
      {
        title: "Ahsan Driver",
        url: "https://play.google.com/store/apps/details?id=com.ahsanxpress.driver",
      },
      {
        title: "Ahsan Customer",
        url: "https://play.google.com/store/apps/details?id=com.ahsanxpress.dev",
      },
    ],
    image: {
      src: "/projects/driver.webp",
      alt: "Ahsan Brand",
    },
  },
  {
    name: "Roomly",
    image: { src: "/projects/roomly.webp", alt: "roomly" },
    category: "Hotel Booking & Operations System",
    role: ["Frontend"],
    description:
      "Sistem reservasi dan operasional hotel untuk properti tunggal (single-property) berbasis monorepo.",
    technologies: ["Next.js", "NextAuth", "Zustand", "TypeScript"],
    contributions:
      "Saya membangun sistem reservasi dan operasional hotel monorepo dengan Next.js 16: merancang API backend dengan Bun dan LibSQL, mengimplementasikan autentikasi JWT dan RBAC, serta membangun antarmuka web reaktif dengan TanStack Query dan NextAuth.",
    sourceUrl: "https://github.com/aldnazr/Roomly",
    demoUrl: "https://roomly-green.vercel.app/",
  },
  // {
  //   name: "Web SmartVet",
  //   category: "Petshop Management SaaS",
  //   role: ["Fullstack"],
  //   description:
  //     "Klinik petshop untuk manajemen data pasien hewan, pemeriksaan, pengobatan, hingga penjadwalan appointment.",
  //   technologies: ["Laravel", "PHP", "PostgreSQL", "Livewire"],
  //   contributions:
  //     "Saya membangun SmartVet secara end-to-end dengan Laravel, Livewire, dan PostgreSQL: merancang skema database untuk data pasien hewan, rekam medis, dan penjadwalan appointment, lalu mengembangkan antarmuka reaktif dengan Livewire agar pemeriksaan dan pengobatan dapat dicatat tanpa reload halaman.",
  // },
  {
    name: "Inventory SCP",
    category: "Inventory Management System",
    role: ["Fullstack"],
    description:
      "Website inventory untuk manajemen data barang, supplier, pembelian, penjualan, dan laporan. yang berfokus pada perusahaan persediaan material",
    technologies: ["Laravel", "PHP", "MySQL", "Livewire"],
    contributions:
      "Saya mengembangkan sistem inventory SCP dengan Laravel dan Livewire: membangun modul manajemen barang dan supplier, alur pembelian serta penjualan, dan laporan stok yang mencerminkan kebutuhan operasional perusahaan persediaan material.",
  },
  {
    name: "Vault Chain",
    category: "Crypto APP",
    role: ["Mobile"],
    description:
      "Aplikasi mobile untuk memantau harga dan trending cryptocurrency terkini.",
    technologies: ["Flutter", "Dart", "Provider"],
    contributions:
      "Saya mengembangkan Vault Chain dengan Flutter dan Provider: mengintegrasikan public API untuk harga dan trending cryptocurrency, membangun state management untuk watchlist, serta merancang antarmuka yang informatif dan nyaman dipantau.",
    sourceUrl: "https://github.com/aldnazr/vault-chain.git",
    image: {
      src: "/projects/bitcoin.webp",
      alt: "Bitcoin Banner",
    },
  },
  {
    name: "PPTA - Layanan Akademik",
    category: "Academic Final Project Service Center",
    role: ["Fullstack"],
    description:
      "Rebuild website pusat pelayanan tugas akhir untuk kebutuhan akademik Universitas Dinamika",
    technologies: ["Laravel", "PHP", "SQL"],
    contributions:
      "Saya membangun ulang website PPTA Universitas Dinamika dengan Laravel: memperbarui alur pendaftaran dan pengelolaan tugas akhir, meningkatkan aksesibilitas antarmuka, serta memastikan data akademik terkelola terstruktur.",
  },
  // {
  //   name: "Asclepius",
  //   category: "Cancer Detector App",
  //   role: ["Mobile"],
  //   description:
  //     "Asclepius adalah aplikasi Android untuk deteksi kanker berbasis AI on-device menggunakan TensorFlow Lite.",
  //   technologies: ["Android", "Kotlin", "Tensorflow Lite"],
  //   contributions:
  //     "Saya mengembangkan aplikasi Android native dengan Kotlin dan mengintegrasikan model klasifikasi gambar TensorFlow Lite agar inferensi berjalan sepenuhnya on-device, termasuk preprocessing gambar dari kamera dan galeri serta menampilkan hasil prediksi beserta tingkat keyakinannya.",
  //   sourceUrl: "https://github.com/aldnazr/android-tensorflow",
  //   image: {
  //     src: "/projects/asclepius.webp",
  //     alt: "Asclepius Banner",
  //   },
  // },
  {
    name: "Blendit",
    category: "Face Recognition for Makeup Recommendation",
    role: ["Mobile"],
    description:
      "Pengenalan wajah dan analisis gambar AI Based untuk memberikan rekomendasi produk riasan berdasarkan wajah, warna kulit, dan kondisi kulit pengguna.",
    technologies: ["Android", "Kotlin"],
    contributions:
      "Saya mengembangkan aplikasi Android dengan Kotlin untuk capstone Bangkit Academy: mengimplementasikan pengenalan wajah dan analisis gambar berbasis AI, lalu menerjemahkan hasilnya menjadi rekomendasi produk riasan yang dipersonalisasi sesuai bentuk wajah, warna kulit, dan kondisi kulit pengguna.",
    sourceUrl: "https://github.com/aldnazr/bangkit-capstone",
    image: {
      src: "/projects/blendit.webp",
      alt: "Blendit Banner",
    },
  },
  {
    name: "EcoSort",
    category: "Smart Waste Detector",
    role: ["Mobile"],
    description:
      "Aplikasi Flutter untuk klasifikasi sampah lewat kamera atau foto galeri, berjalan luring (offline) di perangkat. Model deteksi object YOLO dijalankan dengan TFLite melalui flutter_litert.",
    technologies: ["Android", "Flutter", "LiteRT"],
    contributions:
      "Saya mengembangkan aplikasi Flutter untuk klasifikasi sampah melalui kamera atau foto galeri, mengintegrasikan model deteksi objek YOLO dengan TFLite melalui flutter_litert agar seluruh inferensi berjalan on-device tanpa server, sehingga aplikasi tetap berfungsi penuh saat luring.",
    sourceUrl: "https://github.com/aldnazr/ecosort",
    image: {
      src: "/projects/ecosort.webp",
      alt: "Ecosort Banner",
    },
  },
];

export function slugifyProject(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => slugifyProject(project.name) === slug);
}

export const carouselProjects: CarouselProject[] = projects.map((project) => ({
  id: slugifyProject(project.name),
  title: project.name,
  description: project.description,
  tag: project.category,
  image: project.image?.src,
  imageAlt: project.image?.alt,
  category: project.category,
  role: project.role.join(", "),
  stack: project.technologies.join(", "),
  href: `/projects/${slugifyProject(project.name)}`,
  demoUrl: project.demoUrl,
  github: project.sourceUrl,
}));
