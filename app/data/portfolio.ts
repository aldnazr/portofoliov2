export type Project = {
  number: string;
  name: string;
  category: string;
  description: string;
  technologies: string[];
  role?: string;
  result?: string;
  image?: {
    src: string;
    alt: string;
  };
  demoUrl?: string;
  sourceUrl?: string;
  playStoreUrl?: string;
};

export const profile = {
  name: "Muhammad Alauddin Azhary",
  initials: "AZ",
  role: "Software Engineer",
  location: "Bogor, Indonesia",
  availability: "Open to works",
  email: "alauddinazhary05@gmail.com",
  hero: "Saya mengembangkan aplikasi web dan mobile dari frontend hingga backend dengan fokus pada performa, kualitas, dan pengalaman pengguna.",
  about:
    "Saya seorang Software Engineer yang berfokus pada pengembangan aplikasi end-to-end, mulai dari frontend dan backend hingga pengalaman pengguna. Saya senang menyederhanakan proses dan kebutuhan bisnis menjadi produk digital yang efisien, scalable, dan nyaman digunakan.",
  skills: ["Mobile Development", "Frontend Development", "Backend Development"],
  // stats: [
  //   { value: "2+", label: "tahun membangun produk" },
  //   { value: "18", label: "rilis digital" },
  //   { value: "12", label: "kolaborasi tim" },
  // ],
  socialLinks: [
    { label: "GitHub", href: "https://github.com/aldnazr" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/aldnazr" },
  ],
} as const;

export const navigation = [
  { label: "Tentang", href: "#about" },
  { label: "Proyek", href: "#project" },
  { label: "Pengalaman", href: "#experience" },
  { label: "Kontak", href: "#contact" },
] as const;

export const projects: Project[] = [
  {
    number: "01",
    name: "Ahsan Xpress",
    category: "Mobile - Logistik dan Transportasi",
    description:
      "Memperbarui seluruh ekosistem mulai dari mobile apps (customer & driver), dan juga web admin.",
    technologies: ["Flutter", "Dart", "Riverpod", "Next.js", "Typescript"],
    image: {
      src: "/projects/driver.png",
      alt: "Ahsan Brand",
    },
    playStoreUrl:
      "https://play.google.com/store/apps/details?id=com.ahsanxpress.dev",
  },
  {
    number: "02",
    name: "Web SmartVet",
    category: "Fullstack - Petshop Management SaaS",
    description:
      "Klinik petshop untuk manajemen data pasien hewan, pemeriksaan, pengobatan, hingga penjadwalan appointment.",
    technologies: ["Laravel", "PHP", "PostgreSQL", "Livewire"],
    image: {
      src: "/projects/nusapay-dashboard.svg",
      alt: "SmartVet Banner",
    },
  },
  {
    number: "03",
    name: "Inventory SCP",
    category: "Fullstack - Inventory Management System",
    description:
      "Website inventory untuk manajemen data barang, supplier, pembelian, penjualan, dan laporan. yang berfokus pada perusahaan persediaan material",
    technologies: ["Laravel", "PHP", "MySQL", "Livewire"],
    image: {
      src: "/projects/karsa-studio.svg",
      alt: "SCP Banner",
    },
  },
  {
    number: "04",
    name: "Web CatatPro",
    category: "Fullstack - Accounting Software",
    description:
      "Software untuk kebutuhan pencatatan pengeluaran dan pemasukan, dilengkapi dengan dashboard, laporan, dan grafik untuk memudahkan pengguna dalam mengelola keuangan mereka.",
    technologies: ["Laravel", "PHP", "MySQL", "Livewire"],
  },
  {
    number: "05",
    name: "Vault Chain",
    category: "Mobile - Crypto APP",
    description:
      "Aplikasi mobile untuk memantau harga dan trending cryptocurrency terkini.",
    technologies: ["Flutter", "Dart", "Provider"],
    image: {
      src: "/projects/bitcoin.png",
      alt: "Bitcoin Banner",
    },
    sourceUrl: "https://github.com/aldnazr/vault-chain.git",
  },
  {
    number: "06",
    name: "Backend - TokoHP",
    category: "Backend",
    description: "Rest API untuk kebutuhan frontend",
    technologies: ["Laravel", "REST API", "PHP", "MySQL"],
  },
  {
    number: "07",
    name: "PPTA",
    category: "Fullstack - Academic Final Project Service Center Website",
    description:
      "Rebuild website pusat pelayanan tugas akhir untuk kebutuhan akademik Universitas Dinamika",
    technologies: ["Laravel", "PHP", "SQL"],
  },
  {
    number: "08",
    name: "Asclepius",
    category: "Mobile - Cancer Detector App",
    description:
      "Asclepius adalah aplikasi Android untuk deteksi kanker berbasis AI on-device menggunakan TensorFlow Lite.",
    technologies: ["Android", "Kotlin", "Tensorflow Lite"],
    image: {
      src: "/projects/asclepius.webp",
      alt: "Asclepius Banner",
    },
    sourceUrl: "https://github.com/aldnazr/android-tensorflow",
  },
  {
    number: "09",
    name: "Blendit",
    category: "Mobile - Face Recognition for Makeup Recommendation",
    description:
      "Pengenalan wajah dan analisis gambar AI Based untuk memberikan rekomendasi produk riasan berdasarkan wajah, warna kulit, dan kondisi kulit pengguna.",
    technologies: ["Android", "Kotlin"],
    image: {
      src: "/projects/blendit.webp",
      alt: "Blendit Banner",
    },
    sourceUrl: "https://github.com/aldnazr/bangkit-capstone",
  },
];

export const experience = [
  {
    period: "Oktober 2025 — sekarang",
    title: "Fullstack & Mobile Developer",
    company: "PT. Shidiq Membangun Indonesia",
    description:
      "Berkolaborasi dengan tim untuk merilis aplikasi mobile dan web yang sesuai kebutuhan bisnis user.",
  },
  {
    period: "Agustus 2024 — Februari 2025",
    title: "Fullstack Developer",
    company: "PPTA Universitas Dinamika",
    description:
      "Memperbarui website PPTA (pusat pelayanan tugas akhir) untuk meningkatkan aksesibilitas pengguna.",
  },
  {
    period: "Februari 2024 — Juni 2024",
    title: "Mobile Development Learning Path",
    company: "Bangkit Academy",
    description:
      "Bangkit Academy adalah program akademi talenta teknologi eksklusif yang dipimpin oleh Google, GoTo, dan Traveloka serta merupakan salah satu program Kampus Merdeka (MSIB).",
  },
  {
    period: "Februari 2023 — Juni 2023",
    title: "UI/UX Designer",
    company: "CV. Aikari Harvest",
    description: "Merancang tampilan aplikasi inventory internal perusahaan.",
  },
] as const;
