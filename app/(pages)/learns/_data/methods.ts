import type { LearnConcept } from "./types";

export const methodsConcepts: LearnConcept[] = [
  {
    id: "foreach",
    kind: "array",
    title: "forEach",
    description:
      "Menjalankan perintah untuk setiap item di array secara berurutan. Method ini tidak menghasilkan array baru (hasil kembaliannya selalu undefined) dan tidak bisa dihentikan di tengah jalan. Cocok untuk aksi seperti mencetak log, kirim data ke API, atau mengubah data di luar array.",
    filename: "foreach.ts",
    code: `interface User {
  id: number;
  name: string;
  isActive: boolean;
}

const users: User[] = [
  { id: 1, name: "Andi", isActive: true },
  { id: 2, name: "Budi", isActive: false },
  { id: 3, name: "Citra", isActive: true },
];

// 1. Eksekusi side-effect (logging / notifikasi)
users.forEach((user, index) => {
  console.log(\`[\${index + 1}] Memeriksa akun: \${user.name}\`);
  if (!user.isActive) {
    console.warn(\`Perhatian: Akun \${user.name} berstatus nonaktif!\`);
  }
});

// 2. Penting: forEach me-return undefined (TIDAK menghasilkan array baru)
const result = users.forEach((user) => user.name);
console.log(result); // undefined
`,
  },
  {
    id: "map",
    kind: "array",
    title: "map",
    description:
      "Mengubah setiap item di dalam array menjadi format baru, lalu mengembalikannya sebagai array baru dengan jumlah item yang sama tanpa merusak array aslinya. Sangat pas untuk mengambil properti tertentu dari objek atau memformat tampilan data.",
    filename: "map.ts",
    code: `interface Product {
  id: string;
  name: string;
  price: number;
}

const products: Product[] = [
  { id: "p1", name: "Mechanical Keyboard", price: 750_000 },
  { id: "p2", name: "Wireless Mouse", price: 250_000 },
  { id: "p3", name: "Desk Mat", price: 150_000 },
];

// 1. Ekstraksi satu field menjadi array string
const titles: string[] = products.map((item) => item.name);
// ["Mechanical Keyboard", "Wireless Mouse", "Desk Mat"]

// 2. Transformasi objek menjadi struktur data baru (ViewModel)
const viewModels = products.map((product) => ({
  ...product,
  tax: product.price * 0.11,
  formattedPrice: \`Rp \${product.price.toLocaleString("id-ID")}\`,
}));
`,
  },
  {
    id: "filter",
    kind: "array",
    title: "filter",
    description:
      "Menyaring item dalam array berdasarkan syarat tertentu. Hanya item yang lolos seleksi (bernilai benar/true) yang akan dimasukkan ke array baru, tanpa mengubah array aslinya.",
    filename: "filter.ts",
    code: `interface Task {
  id: number;
  title: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
}

const tasks: Task[] = [
  { id: 1, title: "Setup repo", completed: true, priority: "high" },
  { id: 2, title: "Tulis unit test", completed: false, priority: "high" },
  { id: 3, title: "Desain UI", completed: false, priority: "medium" },
  { id: 4, title: "Deploy demo", completed: true, priority: "low" },
];

// 1. Filter tugas yang belum selesai
const pendingTasks = tasks.filter((t) => !t.completed);

// 2. Menyaring dengan multi-kondisi: belum selesai DAN prioritas tinggi
const urgentTasks = tasks.filter((t) => !t.completed && t.priority === "high");

// 3. Menghapus elemen falsy dari array campuran (type-guard)
const rawValues = [0, "halo", null, 42, undefined, "dev"];
const truthyValues = rawValues.filter(Boolean);
// ["halo", 42, "dev"]
`,
  },
  {
    id: "find",
    kind: "array",
    title: "find",
    description:
      "Mencari satu item pertama dalam array yang cocok dengan syarat yang kamu tentukan. Hasilnya langsung berupa item tersebut (bukan array baru), atau undefined jika tidak ada yang cocok. Cocok untuk mengambil satu data spesifik, misalnya mencari user berdasarkan id.",
    filename: "find.ts",
    code: `interface User {
  id: number;
  name: string;
  isActive: boolean;
}

const users: User[] = [
  { id: 1, name: "Andi", isActive: true },
  { id: 2, name: "Budi", isActive: false },
  { id: 3, name: "Citra", isActive: true },
];

// 1. Cari satu user berdasarkan id
const target = users.find((user) => user.id === 2);
// { id: 2, name: "Budi", isActive: false }

// 2. Hasilnya bisa undefined, jadi selalu periksa sebelum dipakai
if (target) {
  console.log(\`Ketemu: \${target.name}\`);
} else {
  console.log("Data tidak ditemukan");
}

// 3. Pola umum: cari + pakai optional chaining (?.)
const nameById = users.find((user) => user.id === 99)?.name;
// undefined (id 99 tidak ada)

// 4. Beda dengan filter: find berhenti di item pertama yang cocok
//    filter mengumpulkan SEMUA yang cocok ke array baru
const firstActive = users.find((user) => user.isActive); // 1 objek User
const allActive = users.filter((user) => user.isActive); // array berisi 2 User
`,
  },
  {
    id: "reduce",
    kind: "array",
    title: "reduce",
    description:
      "Menggabungkan atau mengolah semua item dalam array menjadi satu nilai akhir (bisa berupa angka total, teks, objek kelompok, atau array lain). Menerima nilai awal dan rumus perhitungan untuk setiap langkahnya.",
    filename: "reduce.ts",
    code: `// 1. Menghitung total nominal belanja dari array objek
const cart = [
  { item: "Buku TypeScript", price: 120_000, qty: 2 },
  { item: "Mousepad", price: 80_000, qty: 1 },
  { item: "Stiker Dev", price: 15_000, qty: 3 },
];

const totalBelanja = cart.reduce(
  (subtotal, item) => subtotal + item.price * item.qty,
  0
);
// 365_000

// 2. Mengelompokkan data (Grouping by Category)
interface Expense {
  category: "food" | "transport" | "office";
  amount: number;
}

const expenses: Expense[] = [
  { category: "food", amount: 45_000 },
  { category: "transport", amount: 20_000 },
  { category: "food", amount: 35_000 },
  { category: "office", amount: 150_000 },
];

const totalByCategory = expenses.reduce<Record<string, number>>(
  (acc, expense) => {
    acc[expense.category] = (acc[expense.category] ?? 0) + expense.amount;
    return acc;
  },
  {}
);
// { food: 80000, transport: 20000, office: 150000 }
`,
  },
  {
    id: "flat",
    kind: "array",
    title: "flat",
    description:
      "Meratakan array bertingkat (array di dalam array) menjadi satu array datar. Secara bawaan hanya membuka 1 tingkat kedalaman, namun kamu bisa menentukan tingkat kedalaman atau memakai Infinity agar diratakan sampai tuntas. Sekaligus membersihkan slot kosong.",
    filename: "flat.ts",
    code: `// 1. Meratakan 1 level (default depth = 1)
const matrix = [[1, 2], [3, 4], [5, 6]];
const flattened = matrix.flat();
// [1, 2, 3, 4, 5, 6]

// 2. Meratakan array bersarang banyak level (multi-level nesting)
const nestedNumbers = [1, [2, [3, [4, [5]]]]];

const depthTwo = nestedNumbers.flat(2);
// [1, 2, 3, [4, [5]]]

const completelyFlat = nestedNumbers.flat(Infinity);
// [1, 2, 3, 4, 5]

// 3. Menghilangkan empty slot (celah kosong pada sparse array)
const sparse = ["a", , "b", undefined, , "c"];
const cleaned = sparse.flat();
// ["a", "b", undefined, "c"]
`,
  },
  {
    id: "flatmap",
    kind: "array",
    title: "flatMap",
    description:
      "Gabungan langsung dari map() dan flat(1). Berguna saat kamu mengubah setiap item menjadi array kecil, lalu ingin langsung meratakannya jadi satu array tanpa perlu memanggil dua fungsi terpisah.",
    filename: "flatmap.ts",
    code: `interface Author {
  name: string;
  books: string[];
}

const authors: Author[] = [
  { name: "Alice", books: ["TypeScript Clean Code", "Modern React"] },
  { name: "Bob", books: ["Dart & Flutter Guide"] },
  { name: "Charlie", books: [] },
];

// 1. Ekstrak seluruh daftar buku menjadi satu array flat
const allBooks = authors.flatMap((author) => author.books);
// ["TypeScript Clean Code", "Modern React", "Dart & Flutter Guide"]

// 2. Filter + Map simultan dalam satu lintasan:
// Kembalikan [] jika ingin menghapus elemen, atau [item] untuk menyimpannya
const sentences = ["Halo dunia", "", "Belajar web dev"];
const words = sentences.flatMap((s) => (s ? s.split(" ") : []));
// ["Halo", "dunia", "Belajar", "web", "dev"]
`,
  },
  {
    id: "split",
    kind: "string",
    title: "split",
    description:
      "Memotong teks (string) menjadi kumpulan potongan yang disimpan di dalam array, berdasarkan tanda pemisah seperti koma, spasi, atau karakter lainnya.",
    filename: "split.ts",
    code: `// 1. Memecah string data CSV dengan koma
const csv = "TypeScript,React,Tailwind,Next.js";
const stack = csv.split(",");
// ["TypeScript", "React", "Tailwind", "Next.js"]

// 2. Memecah kalimat menjadi array kata dengan spasi
const phrase = "Stay hungry stay foolish";
const words = phrase.split(" ");
// ["Stay", "hungry", "stay", "foolish"]

// 3. Memecah string menggunakan Regular Expression
const query = "tag=frontend&sort=recent&limit=10";
const pairs = query.split("&");
// ["tag=frontend", "sort=recent", "limit=10"]

// 4. Memecah dengan batas limit jumlah elemen
const path = "blog/frontend/2026/artikel-baru";
const [root, ...rest] = path.split("/", 2);
// root: "blog", rest: ["frontend"]
`,
  },
  {
    id: "join",
    kind: "array",
    title: "join",
    description:
      "Kebalikan dari split. Menggabungkan seluruh isi array menjadi satu teks panjang dengan karakter penyambung yang bisa kamu tentukan sendiri (seperti tanda hubung, koma, atau spasi).",
    filename: "join.ts",
    code: `// 1. Menggabungkan array segmen path menjadi URL
const pathSegments = ["users", "dewi", "settings"];
const urlPath = "/" + pathSegments.join("/");
// "/users/dewi/settings"

// 2. Menggabungkan tag menjadi representasi teks dengan pemisah kustom
const tags = ["Next.js", "TypeScript", "Tailwind"];
const badgeText = tags.join(" • ");
// "Next.js • TypeScript • Tailwind"

// 3. Kolaborasi split dan join: membuat URL slug yang bersih
function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .split(/\\s+/) // pecah teks berdasarkan 1 atau lebih spasi
    .join("-");    // gabungkan kembali dengan tanda hubung (-)
}

const slug = slugify("Panduan Praktis Belajar TypeScript Modern");
// "panduan-praktis-belajar-typescript-modern"
`,
  },
  {
    id: "slice",
    kind: "string",
    title: "slice",
    description:
      "Mengambil potongan teks tanpa mengubah aslinya. Cukup tentukan indeks awal (ikut terambil) dan batas akhir (tidak ikut terambil). Indeks minus dihitung dari belakang, jadi slice(-7) mengambil 7 karakter terakhir. Pola yang paling sering dipakai adalah memisahkan teks sebelum dan sesudah suatu tanda, misalnya titik.",
    filename: "slice.ts",
    code: `// 1. Potongan berdasarkan index [start, end)
const fullName = "Rizky Pratama";
const first = fullName.slice(0, 5);
// "Rizky"

// 2. Index negatif dihitung dari akhir string
const lastWord = fullName.slice(-7);
// "Pratama"

// 3. Potong teks panjang untuk preview UI
const excerpt = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
const short = excerpt.slice(0, 31) + "...";
// "Lorem ipsum dolor sit amet, con..."

// 4. Mengambil SESUDAH tanda titik: mulai dari posisi tanda + 1 sampai akhir string
const roomName = "ruang-kelas.dev";
const domain = roomName.slice(roomName.indexOf(".") + 1);
// "dev"

// 5. Mengambil SEBELUM tanda titik: ujung string dibatasi pada posisi tanda
const result = roomName.slice(0, roomName.indexOf("."));
// "ruang-kelas"

// 6. Extension file: pakai lastIndexOf karena titik bisa muncul lebih dari satu
const fileName = "laporan-2026.v2.pdf";
const ext = fileName.slice(fileName.lastIndexOf("."));
// ".pdf"

// 7. PENTING: indexOf() mengembalikan -1 kalau tanda tidak ditemukan,
//    sehingga slice(0, -1) justru membuang 1 karakter terakhir.
const noDot = "ruangkelas";
const safe = noDot.slice(0, noDot.indexOf("."));
// "ruangkela" -- bukan "ruangkelas"!
`,
  },
  {
    id: "slice-array",
    kind: "array",
    title: "slice",
    description:
      "Menyalin sebagian array menjadi array baru tanpa memutasi aslinya, jadi aman untuk immutable update. Indeks awal ikut terambil, indeks akhir tidak ikut. Batas yang melebihi panjang array tidak memicu error, potongannya berhenti di akhir.",
    filename: "slice-array.ts",
    code: `const colors = ["red", "green", "blue", "yellow"];

// 1. Salin sebagian array tanpa memutasi asli (immutable)
const partial = colors.slice(1, 3);
// ["green", "blue"]

// 2. Salin penuh array (kloning dangkal)
const copy = colors.slice();
// ["red", "green", "blue", "yellow"]

// 3. Batas melebihi panjang array tetap aman, tidak error
const tail = colors.slice(2, 99);
// ["blue", "yellow"]
`,
  },
  {
    id: "sublist",
    kind: "array",
    title: "sublist",
    description:
      "Di Dart, digunakan untuk mengambil potongan list menjadi list baru. Cukup tentukan indeks awal dan batas akhir (opsional, jika tidak diisi maka diambil sampai habis). Catatan: Dart tidak mendukung indeks minus, jadi nilai indeks harus valid agar tidak memicu error.",
    filename: "sublist.dart",
    language: "dart",
    code: `void main() {
  final colors = <String>['red', 'green', 'blue', 'yellow'];

  // Index end tidak ikut diambil, sama seperti slice(1, 3).
  final partial = colors.sublist(1, 3);
  print(partial); // [green, blue]

  // Tanpa end, potongan mencakup sisa list.
  print(colors.sublist(2)); // [blue, yellow]

  // Dart tidak mendukung index negatif; hitung dari length.
  print(colors.sublist(colors.length - 2)); // [blue, yellow]

  // sublist(0) menyalin seluruh list, tetapi bukan deep copy.
  final copy = colors.sublist(0);
  copy[0] = 'purple';
  print(copy); // [purple, green, blue, yellow]
  print(colors); // [red, green, blue, yellow]

  print(colors.sublist(2, 2)); // []
  // colors.sublist(-2); // RangeError: start negatif.
  // colors.sublist(3, 1); // RangeError: start > end.
  // colors.sublist(0, 5); // RangeError: end > length.
}
`,
  },
  {
    id: "substring",
    kind: "string",
    title: "substring",
    description:
      "Di Dart, digunakan untuk mengambil sebagian potongan teks (string) dari indeks awal hingga batas akhir yang diinginkan. Mirip seperti sublist, indeks harus berada di dalam batas teks dan tidak mendukung angka minus.",
    filename: "substring.dart",
    language: "dart",
    code: `void main() {
  const email = 'rizky@example.com';
  final atIndex = email.indexOf('@');

  // Index @ menjadi batas akhir sehingga tidak ikut diambil.
  final username = email.substring(0, atIndex);
  print(username); // rizky

  // Tanpa end, potongan berlanjut sampai akhir string.
  final domain = email.substring(atIndex + 1);
  print(domain); // example.com

  const fileName = 'laporan-2026.pdf';
  final extension = fileName.substring(fileName.lastIndexOf('.'));
  print(extension); // .pdf

  // Mengambil teks sebelum dan sesudah tanda titik.
  const roomName = 'ruang-kelas.dev';
  print(roomName.substring(0, roomName.indexOf('.')));  // ruang-kelas
  print(roomName.substring(roomName.indexOf('.') + 1)); // dev

  const text = 'Dart';
  print(text.substring(0, 2)); // Da
  print(text.substring(text.length - 2)); // rt
  print(text.substring(2, 2)); // String kosong.

  // Dart menolak batas tidak valid, bukan menyesuaikan argumennya.
  // text.substring(-1); // RangeError: start negatif.
  // text.substring(3, 1); // RangeError: start > end.
  // text.substring(0, 5); // RangeError: end > length.
}
`,
  },
  {
    id: "has",
    kind: "set",
    title: "has",
    description:
      "Mengecek apakah sebuah nilai sudah ada di dalam Set. Hasilnya berupa true jika ketemu, atau false jika tidak. Pencariannya sangat cepat dan tidak peduli seberapa besar Set-nya, jadi cocok untuk memeriksa duplikat atau keanggotaan data tanpa harus menelusuri satu per satu seperti pada array.",
    filename: "has.ts",
    code: `const tags = new Set(["typescript", "react", "nextjs"]);

// 1. Cek apakah nilai ada di dalam Set
console.log(tags.has("react")); // true
console.log(tags.has("vue"));   // false

// 2. Praktis untuk mencegah duplikat saat menambah data
function addTag(tag: string) {
  if (tags.has(tag)) {
    console.log(\`"\${tag}" sudah ada, dilewati\`);
    return;
  }
  tags.add(tag);
}

addTag("react"); // "react" sudah ada, dilewati
addTag("vue");   // ditambahkan

// 3. Pengecekan pakai aturan SameValueZero:
//    NaN dianggap sama dengan NaN (berbeda dari ===)
const numbers = new Set([NaN, 0]);
console.log(numbers.has(NaN)); // true

// 4. Untuk objek/array, pengecekan berdasarkan REFERENSI, bukan isi
const users = new Set([{ id: 1 }]);
const user = { id: 1 };
console.log(users.has(user)); // false (beda referensi objek)
`,
  },
];
