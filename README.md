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

## Formulir Pendaftaran (Supabase)

Formulir di `src/kontak.njk` mengirim data ke endpoint `/api/register` (Vercel Serverless Function) yang menyimpannya ke tabel `registrations` di Supabase.

### Setup database Supabase

1. Buat project baru di [supabase.com](https://supabase.com) (region pilih Singapore untuk latensi terbaik).
2. Di dashboard, buka **SQL Editor** → **New query**, lalu jalankan:

```sql
create table registrations (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  school text not null,
  birth_date date,
  whatsapp text,
  subjects text[],
  interests text[],
  motivation text,
  created_at timestamptz default now()
);
```

3. Buka **Project Settings → API**, salin `Project URL` (jadi `SUPABASE_URL`) dan `anon public key` (jadi `SUPABASE_ANON_KEY`).
4. (Opsional) Aktifkan RLS → **Authentication → Policies → New Policy** → *Enable insert* untuk role `anon`.
5. Di **Vercel → Project → Settings → Environment Variables**, tambahkan:
   - `SUPABASE_URL` = Project URL
   - `SUPABASE_ANON_KEY` = anon key
6. Deploy ulang situs. Kiriman form akan muncul di tabel `registrations`.

## Template

Menggunakan Nunjucks (.njk). Base layout `src/_includes/layouts/base.njk` membungkus semua halaman dengan header/footer. Komponen reusable ada di `src/_includes/partials/`.
