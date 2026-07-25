# KIR MAN 2 Kota Bogor — Website

Website resmi Kelompok Ilmiah Remaja MAN 2 Kota Bogor. Dibangun dengan [Eleventy](https://www.11ty.dev/) static site generator.

## Struktur

```
src/
├── _data/             # Data JSON (prestasi, tim, FAQ, dll.)
├── _includes/
│   ├── layouts/       # Template utama (base.njk)
│   └── partials/      # Komponen reusable (header, footer, card, dll.)
├── assets/            # CSS, JS, gambar (copy ke output)
├── berita/            # Artikel blog dalam format .md
├── index.njk          # Beranda
├── profil.njk         # Profil & Struktur
├── galeri.njk         # Galeri Karya
├── prestasi.njk       # Prestasi
├── berita.njk         # Daftar Berita
├── sumber-daya.njk    # Sumber Daya
└── kontak.njk         # Pendaftaran & Kontak
```

## Menambahkan Artikel

Buat file `.md` baru di `src/berita/`:

```markdown
---
title: "Judul Artikel"
date: 2026-07-25
author: "Nama Penulis"
tags: ["Kegiatan"]
excerpt: "Cuplikan singkat yang muncul di kartu berita."
---

Konten artikel ditulis di sini menggunakan Markdown biasa.
```

Artikel otomatis muncul di halaman depan (3 terbaru) dan halaman Berita.

## Menjalankan di Lokal

```bash
npm install        # sekali saja
npm run serve      # dev server di http://localhost:8080
```

## Build & Deploy

```bash
npm run build      # output ke _site/
```

Deploy `_site/` ke Netlify, Vercel, atau GitHub Pages. Github-connected auto-deploy: push ke main → build otomatis.

## Data

Konten statis (pengurus, prestasi, jurnal, FAQ) disimpan sebagai JSON di `src/_data/`. Edit langsung file `.json` untuk memperbarui konten tanpa menyentuh template.

## Template

Menggunakan Nunjucks (.njk). Base layout `src/_includes/layouts/base.njk` membungkus semua halaman dengan header/footer. Komponen reusable ada di `src/_includes/partials/`.
