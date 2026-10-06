import type { LearnConcept } from "./types";

export const functionalConcepts: LearnConcept[] = [
  {
    id: "pure-function",
    title: "Pure Function",
    description:
      "Pure function adalah function yang memenuhi dua syarat: (1) input yang sama selalu menghasilkan output yang sama, dan (2) tidak punya side effect, yaitu tidak mengubah apa pun di luar dirinya (misalnya mengubah variabel global, memutasi argumen, menulis ke database, atau console.log). Manfaatnya: mudah dites, mudah dilacak saat ada bug, dan aman dipanggil berulang kali.",
    filename: "pure-function.ts",
    code: `// 1) Bergantung pada variabel di luar function = IMPURE
let taxRate = 0.1;
const priceWithTaxImpure = (price: number) => price + price * taxRate;

// Semua data lewat parameter = PURE
const priceWithTax = (price: number, rate: number) => price + price * rate;
priceWithTax(100_000, 0.1); // 110000, selalu sama untuk input yang sama

// 2) Mengubah (mutasi) argumen = IMPURE
function addItemImpure(cart: string[], item: string) {
  cart.push(item); // array asli ikut berubah (side effect)
  return cart;
}

// Kembalikan array baru = PURE
const addItem = (cart: readonly string[], item: string) => [...cart, item];

// 3) Bergantung pada waktu = IMPURE
const isExpiredImpure = (expiredAt: number) => Date.now() > expiredAt;

// Waktu dikirim lewat parameter = PURE (jadi mudah dites)
const isExpired = (expiredAt: number, now: number) => now > expiredAt;
isExpired(1000, 2000); // true
`,
  },
  {
    id: "immutability",
    title: "Immutability",
    description:
      "Immutability berarti data tidak diubah setelah dibuat. Kalau butuh perubahan, kita buat salinan baru dengan nilai yang sudah diperbarui, sedangkan data lama dibiarkan utuh. Manfaatnya: tidak ada perubahan diam-diam yang bikin bug sulit dilacak, dan perubahan mudah dideteksi (misalnya React cukup membandingkan referensi lama dan baru untuk memutuskan re-render).",

    filename: "immutability.ts",
    code: `// 1) const BUKAN immutable: isi object tetap bisa diubah
const user = { name: "Raka", city: "Jakarta" };
user.city = "Bandung"; // jalan, const hanya melarang: user = {...}

// 2) Array: buat array baru, jangan mutasi yang lama
const nums = [1, 2, 3];
const added = [...nums, 4]; // [1, 2, 3, 4]
const removed = nums.filter((n) => n !== 2); // [1, 3]
const doubled = nums.map((n) => n * 2); // [2, 4, 6]
// nums tetap [1, 2, 3]. Hindari push, splice, sort, reverse karena memutasi array asli

// 3) Object: salin dengan spread. Kalau bersarang, spread di SETIAP level yang berubah
const state = { profile: { name: "Raka", city: "Jakarta" }, theme: "dark" };
const themeChanged = { ...state, theme: "light" };
const cityChanged = { ...state, profile: { ...state.profile, city: "Bandung" } };
// state asli tidak berubah. Untuk deep copy penuh: structuredClone(state)
`,
  },
  {
    id: "higher-order-function",
    title: "Higher-Order Function",
    description:
      "Higher-order function (HOF) adalah function yang menerima function lain sebagai parameter, mengembalikan function, atau keduanya (contoh bawaan JavaScript: map, filter, dan reduce). Manfaatnya: tidak perlu menulis loop manual, dan logikanya mudah dipakai ulang.",
    filename: "higher-order-function.ts",
    code: `const products = [
  { name: "Kopi", price: 20_000, stock: 5 },
  { name: "Teh", price: 10_000, stock: 0 },
  { name: "Roti", price: 15_000, stock: 8 },
];

// 1) HOF bawaan: map, filter, reduce
products.map((p) => p.name); // ["Kopi", "Teh", "Roti"]
products.filter((p) => p.stock > 0); // Kopi & Roti
products.reduce((total, p) => total + p.price * p.stock, 0); // 220000

// 2) HOF buatan sendiri: menerima function (beginilah cara kerja map)
function myMap(nums: number[], fn: (n: number) => number): number[] {
  const result: number[] = [];
  for (const n of nums) result.push(fn(n));
  return result;
}
myMap([1, 2, 3], (n) => n * 10); // [10, 20, 30]

// 3) HOF yang menerima DAN mengembalikan function (pola middleware / decorator)
function withLog(fn: (n: number) => number) {
  return (n: number) => {
    console.log("input:", n);
    return fn(n);
  };
}
const doubleWithLog = withLog((n) => n * 2);
doubleWithLog(5); // log "input: 5", hasilnya 10
`,
  },
  {
    id: "closure",
    title: "Closure",
    description:
      "Closure adalah function yang tetap mengingat variabel dari tempat ia dibuat (lexical scope), walaupun dipanggil di tempat lain atau setelah function induknya selesai. Manfaatnya: bisa menyimpan private state yang tidak bisa diubah sembarangan dari luar, serta membuat function factory.",
    filename: "closure.ts",
    code: `// 1) Private state: count tersembunyi, hanya bisa diakses lewat function
function createCounter() {
  let count = 0;
  return {
    increment: () => ++count,
    getCount: () => count,
  };
}
const counter = createCounter();
counter.increment(); // 1
counter.increment(); // 2
// counter.count -> tidak ada, tidak bisa diubah sembarangan dari luar

// 2) Function factory: factor "diingat" oleh function yang dikembalikan
function multiplier(factor: number) {
  return (n: number) => n * factor;
}
const double = multiplier(2);
const triple = multiplier(3);
double(5); // 10
triple(5); // 15

// 3) Pertanyaan interview klasik: var vs let di dalam loop
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0); // 3, 3, 3 (semua closure berbagi satu i)
}
for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log(j), 0); // 0, 1, 2 (tiap iterasi punya j sendiri)
}
`,
  },
  {
    id: "recursion",
    title: "Recursion",
    description:
      "Recursion adalah teknik ketika sebuah function memanggil dirinya sendiri untuk menyelesaikan masalah yang bisa dipecah menjadi versi yang lebih kecil. Setiap recursion wajib punya base case (kondisi berhenti) dan recursive case (memanggil diri sendiri dengan input yang makin kecil); tanpa base case akan muncul error stack overflow. Manfaatnya: kode lebih ringkas untuk struktur bersarang seperti tree, folder, atau menu bertingkat.",
    filename: "recursion.ts",
    code: `// 1) Factorial: 4! = 4 x 3 x 2 x 1
function factorial(n: number): number {
  if (n <= 1) return 1; // base case: berhenti di sini
  return n * factorial(n - 1); // recursive case: masalah makin kecil
}
factorial(4); // 24 (alurnya: 4 * 3 * 2 * 1)

// 2) Fibonacci: 0, 1, 1, 2, 3, 5, 8, ...
function fibonacci(n: number): number {
  if (n <= 1) return n; // base case: fib(0) = 0, fib(1) = 1
  return fibonacci(n - 1) + fibonacci(n - 2); // dua panggilan sekaligus
}
fibonacci(6); // 8
// Catatan: lambat untuk n besar (O(2^n)) karena menghitung ulang berkali-kali.
// Solusinya memoization atau loop biasa.

// 3) Struktur bersarang (tree): kedalaman tidak diketahui, cocok pakai recursion
type Category = { name: string; children?: Category[] };

function listNames(categories: Category[]): string[] {
  // base case: array kosong -> flatMap tidak memproses apa pun -> hasil []
  return categories.flatMap((c) => [c.name, ...listNames(c.children ?? [])]);
}

listNames([
  { name: "Makanan", children: [{ name: "Nasi" }, { name: "Mie" }] },
  { name: "Minuman" },
]); // ["Makanan", "Nasi", "Mie", "Minuman"]
`,
  },
];
