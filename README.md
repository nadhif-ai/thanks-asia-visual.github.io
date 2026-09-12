# Ucapan Terimakasih — 6 Tahun (2020-2026)

Website farewell / ucapan terima kasih pribadi, dibuat sebagai static website (HTML, CSS, JavaScript murni) dan siap di-deploy ke GitHub Pages.

## Status Pengerjaan

- [x] Tahap 1 — Struktur folder & HTML seluruh section
- [x] Tahap 2 — CSS dasar & responsive mobile
- [x] Tahap 3 — Hero + animasi
- [x] Tahap 4 — Gallery carousel
- [x] Tahap 5 — Timeline kenangan
- [x] Tahap 6 — Pesan 20 rekan kerja
- [x] Tahap 7 — Mini game endless runner
- [x] Tahap 8 — Animasi global & polish
- [x] Tahap 9 — Testing responsive (mobile 390px & desktop 1440px, tanpa horizontal scroll)
- [x] Tahap 10 — Siap deploy ke GitHub Pages

Semua fitur inti sudah **berfungsi**, bukan sekadar mockup:
scroll animation, carousel (swipe + tombol + dots + autoplay), timeline reveal,
20 friend card + modal, mini game (jump, score, collision, restart, high score
tersimpan di browser), scroll progress bar, back to top, dan dukungan
`prefers-reduced-motion`.

## Struktur Folder

```
/
├── index.html
├── style.css
├── script.js
├── assets/
│   ├── images/
│   └── audio/
└── README.md
```

## Cara Menjalankan (Testing Lokal)

Karena ini static website, cukup buka `index.html` langsung di browser, atau gunakan local server sederhana (disarankan agar semua fitur JS berjalan normal nantinya):

```bash
# Opsi 1: Python
python3 -m http.server 8000
# lalu buka http://localhost:8000

# Opsi 2: VS Code Live Server extension
```

## Bagian yang Nanti Mudah Diedit

Setelah semua tahap selesai, bagian-bagian berikut akan mudah diubah sendiri:

1. Nama website (`<title>` di index.html)
2. Background hero (`assets/images/`)
3. Foto carousel (`assets/images/`)
4. Data timeline kenangan (di script.js)
5. Nama & pesan rekan kerja (di script.js)
6. Foto rekan jika ada (di script.js)
7. Warna & font (di style.css, bagian CONFIG/variables)
8. Musik (`assets/audio/`)
9. Teks closing (di index.html)
