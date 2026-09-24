import type { LearnConcept } from "./types";

export const methodsConcepts: LearnConcept[] = [
  {
    id: "foreach",
    kind: "array",
    title: "forEach",
    description:
      "Mengeksekusi fungsi callback pada setiap elemen array secara berurutan. Method ini selalu mengembalikan undefined dan tidak dapat di-break atau di-continue. Gunakan forEach hanya untuk side-effect (seperti logging, menyimpan data, atau mutasi state luar), bukan untuk mentransformasi data.",
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
      "Mentransformasi setiap elemen array dengan memanggil callback function, lalu mengembalikan array baru dengan panjang yang sama persis tanpa memutasi array asli (immutable). Sangat ideal untuk ekstraksi field objek, formatting data, atau konversi tipe data.",
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
      "Menyaring elemen array berdasarkan kondisi boolean (predicate function). Mengembalikan array baru yang hanya memuat elemen yang menghasilkan nilai true tanpa mengubah array sumber. Panjang array hasil bisa sama, lebih sedikit, atau kosong.",
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
    id: "reduce",
    kind: "array",
    title: "reduce",
    description:
      "Mengakumulasi seluruh elemen array menjadi satu nilai tunggal (angka, string, objek, atau array baru). Menerima fungsi (accumulator, current) => nextAccumulator dan nilai awal (initialValue). Sangat fleksibel untuk perhitungan total, pengelompokan data (grouping), atau flattening kustom.",
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
      "Meratakan (flatten) sub-array bersarang menjadi array baru satu dimensi hingga kedalaman tertentu (depth, default bernilai 1). Gunakan argumen Infinity untuk meratakan array berapapun dalamnya tingkat sarangnya, sekaligus menghapus celah kosong (sparse array).",
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
      "Kombinasi efisien dari memanggil map() yang langsung dilanjutkan dengan flat(1). Memetakan setiap elemen lalu otomatis meratakan hasilnya satu level tanpa membuat array perantara di memori. Sangat berguna untuk mengekstrak array anak dari kumpulan objek atau melakukan filter + map dalam 1 langkah.",
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
      "Method milik String (String.prototype.split) yang membagi sebuah string menjadi array potongan kata/teks berdasarkan separator karakter atau Regular Expression yang ditentukan, dengan opsi limit jumlah item yang diambil.",
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
      "Method milik Array (Array.prototype.join) yang menggabungkan seluruh elemen array menjadi sebuah string tunggal, disisipkan oleh separator pemisah yang ditentukan (default tanda koma ','). Merupakan kebalikan (inverse) dari split.",
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
    kind: "both",
    title: "slice",
    description:
      "Di TypeScript, slice memotong string atau array tanpa memutasi sumber, dengan index awal inklusif dan akhir eksklusif. Mendukung index negatif (dihitung dari akhir). Di Dart, gunakan List.sublist untuk mengambil bagian list sebagai list baru (salinan dangkal). Berbeda dari slice, sublist mensyaratkan 0 ≤ start ≤ end ≤ length; index negatif atau di luar batas menyebabkan RangeError.",
    filename: "slice.ts",
    code: `// === String.prototype.slice ===

const fullName = "Rizky Pratama";

// 1. Potongan berdasarkan index [start, end)
const first = fullName.slice(0, 5);
// "Rizky"

// 2. Index negatif dihitung dari akhir string
const lastWord = fullName.slice(-7);
// "Pratama"

// 3. Potong teks panjang untuk preview UI
const excerpt = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
const short = excerpt.slice(0, 30) + "...";
// "Lorem ipsum dolor sit amet, con..."

// === Array.prototype.slice ===

const colors = ["red", "green", "blue", "yellow"];

// 4. Salin sebagian array tanpa memutasi asli (immutable)
const partial = colors.slice(1, 3);
// ["green", "blue"]

// 5. Salin penuh array (kloning dangkal)
const copy = colors.slice();
// ["red", "green", "blue", "yellow"]
`,
    examples: [
      {
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
    ],
  },
  {
    id: "substring",
    kind: "string",
    title: "substring",
    description:
      "Di Dart, String.substring mengambil bagian string dengan index awal inklusif dan akhir eksklusif. Jika end tidak diberikan, potongan berlanjut sampai akhir string. Index wajib memenuhi 0 ≤ start ≤ end ≤ length; index negatif, di luar batas, atau start > end menyebabkan RangeError, bukan disesuaikan atau ditukar otomatis. Untuk contoh TypeScript, utamakan slice yang juga mendukung index negatif.",
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
];
