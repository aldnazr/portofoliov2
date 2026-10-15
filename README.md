# Portofolio Muhammad Alauddin Azhary

Situs portofolio pribadi untuk menampilkan profil, proyek, pengalaman kerja, dan materi belajar pengembangan perangkat lunak. Dibangun dengan Next.js App Router, React, TypeScript, dan Tailwind CSS.

## Fitur

- Beranda dengan bagian profil, tentang, proyek, pengalaman, dan kontak.
- Proyek ditampilkan dalam carousel atau daftar, dengan halaman detail untuk setiap proyek.
- Halaman belajar berisi topik paradigma pemrograman, metode array/string, dan manajemen state. Materi dilengkapi filter dan contoh kode yang dapat disalin; contoh kode tidak dijalankan di browser.
- Tema terang, gelap, dan sistem, serta tampilan responsif.

## Teknologi

Next.js 16, React 19, TypeScript, Tailwind CSS 4, Motion, Zustand, dan Shiki. Integrasi Vercel Analytics dan Speed Insights dipasang di layout aplikasi.

## Menjalankan secara lokal

Gunakan [Bun](https://bun.sh/) sebagai package manager (versi yang tercantum di `package.json`: 1.3.14).

```bash
bun install
bun dev
```

Buka [http://localhost:3000](http://localhost:3000). Untuk membuat dan menjalankan build produksi:

```bash
bun run build
bun start
```

Pemeriksaan lint tersedia melalui `bun run lint`. Saat ini belum ada skrip pengujian otomatis di `package.json`.

## Halaman

| URL | Isi |
| --- | --- |
| `/` | Beranda; bagian `#about`, `#project`, `#experience`, dan `#contact` |
| `/projects/[slug]` | Detail proyek dari `data/projects.ts`; slug dibuat dari nama proyek |
| `/learns` | Daftar topik belajar |
| `/learns/paradigms` | Functional Programming dan OOP |
| `/learns/methods` | Array & String Methods |
| `/learns/state-management` | Zustand dan Riverpod |

## Mengubah konten

| File/direktori | Kegunaan |
| --- | --- |
| `data/profile.ts` | Nama, deskripsi diri, email, dan tautan sosial |
| `data/projects.ts` | Daftar proyek, detail, tautan, gambar, dan slug halaman detail |
| `data/experience.ts` | Riwayat pengalaman |
| `data/navigation.ts` | Tautan navigasi |
| `data/site.ts` | Judul dan deskripsi metadata situs |
| `features/learns/data/` | Kartu topik dan materi belajar |
| `components/sections/` | Bagian-bagian beranda |
| `app/globals.css` | Gaya global, warna, dan tema |
| `public/projects/` | Aset gambar proyek yang dirujuk dari `data/projects.ts` |

Rute beranda disusun di `app/page.tsx`; halaman detail proyek dan belajar berada di `app/(pages)/`. Saat menambah proyek, nama proyek digunakan untuk membuat slug URL melalui `slugifyProject` di `data/projects.ts`. Proyek tanpa gambar menggunakan visual bawaan.

## Catatan formulir kontak

Tombol salin email menggunakan alamat di `data/profile.ts`. Formulir kontak mengirim permintaan ke `/api/send`, tetapi **pengiriman pesan belum berfungsi pada struktur proyek saat ini**: handler Resend ada di `api/send/route.ts`, sedangkan Next.js App Router memerlukan `app/api/send/route.ts` untuk rute tersebut.

Untuk mengaktifkannya, pindahkan handler ke `app/api/send/route.ts`, sediakan `RESEND_API_KEY` melalui environment lokal/deployment (misalnya `.env.local` untuk pengembangan), dan periksa konfigurasi pengirim serta penerima email di handler. Jangan commit kunci API atau berkas `.env*`. Tanpa perbaikan rute tersebut, konfigurasi kunci API saja tidak akan mengaktifkan formulir.
