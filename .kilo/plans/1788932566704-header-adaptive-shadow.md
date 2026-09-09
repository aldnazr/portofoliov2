# Rencana: Shadow Header Adaptif Tema

## Konteks & Masalah

- `app/components/header.tsx:13` memakai `shadow-2xl shadow-black/50` (hitam 50%, blur 50px).
- **Tema gelap** (bg `#08090d`): bayangan hitam di atas background hampir hitam → nyaris tak terlihat, hanya kesan kedalaman halus (terlihat bagus).
- **Tema terang** (bg `#fafafa`): bayangan hitam 50% menjadi kontras sangat keras → pill header tampak "mengambang".
- Akar masalah: shadow tidak adaptif tema; design system belum punya token elevation.
- Dropdown mobile (`header.tsx:81`, `shadow-xl` hitam default) punya masalah serupa, lebih ringan.

## Solusi

Token shadow adaptif tema, mengikuti pola `light-dark()` yang sudah ada di `app/globals.css`:

1. Variabel mentah `--elevated-shadow`:
   - Di `:root` (fallback browser tanpa dukungan `light-dark()`): nilai gelap.
   - Di blok `@supports (color: light-dark(#fff, #000))`: warna per tema via `light-dark()`.
2. Registrasi di `@theme inline`: `--shadow-elevated: var(--elevated-shadow)` → menghasilkan utility Tailwind v4 `shadow-elevated`.
3. Ganti class shadow di header pill dan dropdown mobile.

### Batasan teknis (sudah diakomodasi)

`light-dark()` hanya bisa membungkus **warna**, bukan seluruh nilai `box-shadow`. Karena itu geometri (offset/blur/spread) dibagi kedua tema; hanya warna per lapisan yang berbeda.

### Nilai shadow (3 lapis, dapat disetel)

```css
0 1px 2px light-dark(rgba(24, 24, 27, 0.06), rgba(0, 0, 0, 0.4)),
0 4px 12px light-dark(rgba(24, 24, 27, 0.05), rgba(0, 0, 0, 0.35)),
0 25px 50px -12px light-dark(rgba(24, 24, 27, 0.08), rgba(0, 0, 0, 0.5))
```

- **Terang**: contact shadow 1px + ambient lembut → pill terlihat "menempel" elegan (gaya Vercel/Linear), bukan melayang. Warna tint zinc `24,24,27` selaras dengan palet foreground.
- **Gelap**: lapisan ke-3 geometri & warnanya identik dengan `shadow-2xl shadow-black/50` saat ini; dua lapisan contact/mid tak terlihat di atas bg `#08090d` → tampilan gelap praktis tidak berubah.

## Tugas

1. **`app/globals.css`**
   - Tambah ke `:root` (fallback gelap):
     ```css
     --elevated-shadow:
       0 1px 2px rgba(0, 0, 0, 0.4),
       0 4px 12px rgba(0, 0, 0, 0.35),
       0 25px 50px -12px rgba(0, 0, 0, 0.5);
     ```
   - Tambah ke blok `@supports (color: light-dark(#fff, #000))` → `:root`:
     ```css
     --elevated-shadow:
       0 1px 2px light-dark(rgba(24, 24, 27, 0.06), rgba(0, 0, 0, 0.4)),
       0 4px 12px light-dark(rgba(24, 24, 27, 0.05), rgba(0, 0, 0, 0.35)),
       0 25px 50px -12px light-dark(rgba(24, 24, 27, 0.08), rgba(0, 0, 0, 0.5));
     ```
   - Tambah ke `@theme inline`:
     ```css
     --shadow-elevated: var(--elevated-shadow);
     ```
2. **`app/components/header.tsx`**
   - Baris 13 (pill header): hapus `shadow-2xl shadow-black/50`, ganti dengan `shadow-elevated`.
   - Baris 81 (dropdown mobile): ganti `shadow-xl` dengan `shadow-elevated`.
3. **Tidak mengubah** `app/components/button.tsx` (`hover:shadow-lg hover:shadow-emerald-500/25` adalah glow aksen yang bekerja baik di kedua tema) — di luar cakupan.

## Validasi

1. `bun run build` lolos tanpa error.
2. `bun run dev`, lalu:
   - Toggle terang / gelap / sistem via `ThemeToggle`.
   - **Terang**: pill tidak lagi mengambang; tepi tetap terdefinisi (border-hairline + backdrop-blur + contact shadow tipis).
   - **Gelap**: tampilan praktis sama seperti sebelumnya.
   - **Sistem**: mengikuti preferensi OS tanpa flash saat load pertama (CSS-native, tidak bergantung JS).
   - Scroll konten melewati header sticky di kedua tema.
   - Buka dropdown mobile (viewport < 768px) di kedua tema.
   - DevTools: computed `box-shadow` pada pill menunjukkan nilai token `--elevated-shadow`.

## Risiko & Catatan

- Browser tanpa dukungan `light-dark()` selalu mendapat nilai gelap — konsisten dengan perilaku seluruh token lain yang sudah ada.
- Nilai opacity bersifat tunable; cukup ubah di satu tempat (token) jika hasil visual kurang pas saat review.
