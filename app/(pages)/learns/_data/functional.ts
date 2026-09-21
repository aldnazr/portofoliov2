import type { LearnConcept } from "./types";

export const functionalConcepts: LearnConcept[] = [
  {
    id: "pure-function",
    title: "Pure Function",
    description:
      "Pure function tidak menimbulkan side effect dan outputnya hanya bergantung pada input. Karena itu ia mudah diuji, diprediksi, dan aman dipanggil berulang kali tanpa mengubah state di luar fungsinya.",
    filename: "pure-function.ts",
    code: `// IMPURE: mengandalkan dan memutasi state di luar fungsi
let discount = 0.1;
function priceImpure(price: number): number {
  return price - price * discount; // tergantung variabel global
}

// PURE: hanya bergantung pada argumen yang diterima
function priceOf(price: number, discount: number): number {
  return price - price * discount;
}

// PURE: tidak menyentuh data asli, hanya membacanya
function totalOf(items: ReadonlyArray<number>): number {
  return items.reduce((sum, item) => sum + item, 0);
}

priceOf(100_000, 0.1); // 90000 — selalu sama untuk input yang sama
totalOf([10, 20, 30]); // 60 — tidak ada data luar yang berubah
`,
  },
  {
    id: "immutability",
    title: "Immutability",
    description:
      "Data tidak pernah dimutasi; setiap perubahan membuat struktur baru. Memakai const, spread operator, method map/filter/reduce, dan Object.freeze membantu mencegah mutasi tak terduga.",
    filename: "immutability.ts",
    code: `// MUTABLE (hindari): push mengubah array asli secara langsung
function addBad(items: string[], value: string): string[] {
  items.push(value);
  return items;
}

// IMMUTABLE: array baru dibuat, array asli tetap utuh
function add(items: readonly string[], value: string): string[] {
  return [...items, value];
}

// IMMUTABLE: Object.freeze mencegah mutasi pada objek hasil
function freezePoint(x: number, y: number) {
  return Object.freeze({ x, y });
}

const point = freezePoint(1, 2);
// point.x = 5; // TypeError: cannot assign to read-only property

add(["react", "vue"], "svelte"); // ["react", "vue", "svelte"]
`,
  },
  {
    id: "higher-order-function",
    title: "Higher-Order Function",
    description:
      "Higher-order function (HOF) adalah function yang menerima function sebagai argumen atau mengembalikan function. Pola ini membuat logika menjadi composable dan reusable.",
    filename: "higher-order-function.ts",
    code: `type User = { name: string; role: string; active: boolean };

const users: User[] = [
  { name: "Alauddin", role: "engineer", active: true },
  { name: "Sari", role: "designer", active: false },
  { name: "Budi", role: "engineer", active: true },
];

// map: mengubah setiap elemen menjadi nilai baru
const names: string[] = users.map((user) => user.name);

// filter: mengambil elemen yang memenuhi kondisi
const activeEngineers: User[] = users.filter(
  (user) => user.active && user.role === "engineer",
);

// reduce: menggabungkan seluruh elemen menjadi satu nilai
const activeCount: number = users.reduce(
  (count, user) => count + (user.active ? 1 : 0),
  0,
);

// HOF custom: menerima predicate, mengembalikan function yang siap dipakai
function byActiveRole(role: string) {
  return (user: User): boolean => user.active && user.role === role;
}

users.filter(byActiveRole("designer")); // [Sari? cek active!]
`,
  },
  {
    id: "closure",
    title: "Closure",
    description:
      "Closure adalah function yang tetap mengingat lexical scope tempat ia didefinisikan, meskipun dipanggil di luar scope tersebut. Cocok untuk private state dan function factory.",
    filename: "closure.ts",
    code: `// Counter: variabel 'count' tidak bisa diakses dari luar
function createCounter(start = 0) {
  let count = start;
  return {
    increment: () => ++count,
    decrement: () => --count,
    value: () => count,
  };
}

const counter = createCounter();
counter.increment(); // 1
counter.increment(); // 2
counter.decrement(); // 1
// counter.count; // Error: hanya bisa diakses melalui method

// Function factory: membuat function sesuai pengali
function multiplier(factor: number) {
  return (value: number): number => value * factor;
}

const double = multiplier(2);
const triple = multiplier(3);
double(5); // 10
triple(5); // 15
`,
  },
  {
    id: "recursion",
    title: "Recursion",
    description:
      "Recursion terjadi ketika function memanggil dirinya sendiri. Setiap solusi recursive wajib punya base case (kapan berhenti) dan recursive case (panggilan diri sendiri menuju base case).",
    filename: "recursion.ts",
    code: `// Base case: n <= 1, recursive case: n * (n-1)!
function factorial(n: number): number {
  if (n <= 1) return 1; // base case
  return n * factorial(n - 1); // recursive case
}

// Fibonacci: penjumlahan dua angka sebelumnya
function fibonacci(n: number): number {
  if (n <= 0) return 0; // base case
  if (n === 1) return 1; // base case
  return fibonacci(n - 1) + fibonacci(n - 2);
}

type Category = { name: string; children?: Category[] };

// Traversal struktur pohon secara recursive
function listCategories(categories: Category[]): string[] {
  return categories.flatMap((category) => [
    category.name,
    ...listCategories(category.children ?? []),
  ]);
}

factorial(5); // 120
fibonacci(8); // 21
`,
  },
];
