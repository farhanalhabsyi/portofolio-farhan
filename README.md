# Latihan 6 — Integrasi Fetch API dengan REST API

Website portofolio mahasiswa yang dikembangkan menggunakan HTML, Tailwind CSS, dan JavaScript. Pada latihan ini, website diintegrasikan dengan Laravel REST API menggunakan Fetch API untuk mengambil dan menampilkan data portofolio secara dinamis.

## Identitas Mahasiswa

| Keterangan | Data |
|---|---|
| Nama | M Farhan Alhabsyi |
| NPM | 22312084 |
| Kelas | IF 24Cx |
| Program Studi | Informatika |
| Universitas | Universitas Teknokrat Indonesia |

## Teknologi

- HTML
- Tailwind CSS
- JavaScript
- Vite
- Fetch API
- Laravel REST API

## Fitur

- Menampilkan data profil dari API
- Menampilkan daftar keahlian
- Menampilkan proyek portofolio beserta keahliannya
- Menampilkan pengalaman
- Menampilkan sertifikat
- Mengambil data menggunakan Fetch API
- Menampilkan data secara dinamis dari backend Laravel

## Integrasi REST API

Website mengambil data dari Laravel REST API melalui endpoint GET berikut:

| Endpoint | Data |
|---|---|
| `/api/portfolio/profile` | Profil mahasiswa |
| `/api/portfolio/skills` | Daftar keahlian |
| `/api/portfolio/projects` | Daftar proyek |
| `/api/portfolio/experiences` | Pengalaman |
| `/api/portfolio/certificates` | Sertifikat |

Data yang diterima dari API digunakan untuk memperbarui konten pada halaman portofolio.

## Struktur Project

```text
portofolio-farhan/
├── assets/
│   ├── script.js
│   └── style.css
├── index.html
├── package.json
├── vite.config.mjs
└── portofolio-web/
    └── Laravel REST API
```

## Menjalankan Website

Pastikan Node.js dan npm sudah terpasang.

Masuk ke folder utama repository:

```bash
npm install
```

Jalankan development server:

```bash
npm run dev
```

Buka alamat lokal yang ditampilkan oleh Vite pada terminal.

## Menjalankan Backend Laravel

Buka terminal baru dan masuk ke folder Laravel:

```bash
cd portofolio-web
```

Install dependency:

```bash
composer install
```

Siapkan file environment jika belum tersedia:

```bash
copy .env.example .env
```

Atur konfigurasi database pada file `.env`, lalu jalankan:

```bash
php artisan key:generate
php artisan migrate --seed
php artisan serve
```

Pastikan Laravel REST API berjalan agar website dapat mengambil data portofolio.

## Repository

Repository GitHub:

https://github.com/farhanalhabsyi/portofolio-farhan