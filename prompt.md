## Task

Buat halaman pembelajaran **Functional Programming vs OOP** di `app/(pages)/learns/page.tsx`, lengkap dengan penjelasan konsep, contoh kode dengan syntax highlighting (Shiki), dan switch untuk berpindah antar paradigma.

## Context

- Framework: Next.js (App Router), TypeScript
- Path halaman: `app/(pages)/learns/page.tsx`
- Package `shiki` sudah terinstall (`bun add -D shiki`)
- Sebelum menulis kode, baca dulu struktur project: cek `package.json`, konfigurasi Tailwind/styling, komponen UI yang sudah ada (mis. `components/ui/*`), dan halaman lain di `app/(pages)/` agar gaya konsisten

## Konten yang Harus Dibuat

### Functional Programming

1. **Pure Function**: tidak ada side effect, output hanya bergantung pada input
2. **Immutability**: tidak memutasi data, gunakan spread/`map`/`filter`/`Object.freeze`
3. **Higher-Order Function**: function yang menerima/mengembalikan function (`map`, `filter`, `reduce`, custom HOF)
4. **Closure**: function yang mengingat scope lexical-nya (counter, private state, function factory)
5. **Recursion**: base case + recursive case (factorial, fibonacci, tree/nested traversal)

### Object-Oriented Programming

1. **Encapsulation**: `private`/`protected`/`public`, getter/setter
2. **Inheritance**: `extends`, `super`, penggunaan `protected`
3. **Polymorphism**
   - **Overriding**: subclass menimpa method parent
   - **Overloading**: method overload signatures di TypeScript
4. **Abstraction**: `abstract class` dan `interface`

## Struktur Setiap Materi

Setiap konsep ditampilkan dalam satu card/section dengan urutan:

1. **Judul konsep**
2. **Penjelasan singkat** (2-3 kalimat, Bahasa Indonesia)
3. **Contoh kode TypeScript** (dengan syntax highlighting, 15-30 baris, ada komentar penjelas)
4. _(Opsional)_ Bad example vs good example jika relevan (mis. impure vs pure, mutable vs immutable)

## Requirements Teknis

### Switch Paradigma

- Toggle/tabs untuk berpindah **Functional** ↔ **OOP**
- Gunakan `useState` (client component) atau URL search param `?paradigm=functional|oop` agar bisa di-share, pilih salah satu yang paling sesuai dengan struktur project
- Default: Functional
- Ada transisi halus saat berpindah

### Syntax Highlighting dengan Shiki

- Gunakan `codeToHtml` dari `shiki`
- **Penting**: highlight dilakukan di **Server Component** (async) agar tidak menambah bundle client. Pisahkan:
  - `page.tsx` → Server Component, melakukan highlight semua snippet lalu mengirim HTML hasilnya sebagai props
  - Komponen client terpisah (mis. `paradigm-switcher.tsx`) → hanya menangani state switch
- Buat komponen reusable `CodeBlock` yang menerima `code`, `lang`, dan (opsional) `filename`
- Gunakan theme dual (light/dark) jika project mendukung dark mode, misalnya `github-light` / `github-dark`; jika tidak, cukup `github-dark`
- Load hanya language yang dipakai (`typescript`) untuk menghindari bundle berlebih
- Sertakan tombol **copy code** pada `CodeBlock`

### Data & Struktur File

- Simpan konten materi (judul, deskripsi, kode) di file data terpisah, mis. `app/(pages)/learns/_data/functional.ts` dan `oop.ts`, supaya `page.tsx` tetap bersih
- Tipe data: `{ id: string; title: string; description: string; code: string; }`

### UI/UX

- Responsive (mobile-first)
- Sidebar/anchor navigation untuk lompat antar konsep (opsional tapi diutamakan di desktop)
- Gunakan komponen dan design token yang sudah ada di project, jangan menambah library UI baru
- Aksesibilitas: toggle memiliki `aria-label`/`role="tablist"`, kontras kode memadai

## Constraints

- Semua kode contoh dalam **TypeScript**, bisa dijalankan apa adanya (tidak ada pseudo-code)
- Jangan menambah dependency baru selain `shiki`
- Penjelasan dalam **Bahasa Indonesia**, istilah teknis tetap dalam bahasa Inggris
- Jangan mengubah file lain di luar folder `learns/` dan (jika perlu) komponen shared baru

## Output yang Diharapkan

1. Daftar file yang dibuat/diubah
2. Implementasi lengkap setiap file
3. Catatan singkat cara kerja pemisahan server/client component
4. Verifikasi: jalankan `bun run build` (atau `bun run lint` + `tsc --noEmit`) dan pastikan tidak ada error

## Acceptance Criteria

- [ ] Switch Functional ↔ OOP berfungsi tanpa reload halaman
- [ ] Kelima konsep Functional dan empat konsep OOP (dengan overriding & overloading terpisah) tampil lengkap
- [ ] Semua code block ter-highlight oleh Shiki, dirender di server
- [ ] Tidak ada error TypeScript/lint, build sukses
- [ ] Tampilan konsisten dengan halaman lain dan responsive
