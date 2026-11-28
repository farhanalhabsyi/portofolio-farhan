# Portfolio Website — M Farhan Alhabsyi

Website portofolio mahasiswa yang dikembangkan sebagai project Praktikum Pemrograman Web 2 di Universitas Teknokrat Indonesia.

Repository ini mencakup pengembangan website portofolio menggunakan HTML, Tailwind CSS, dan JavaScript, serta backend Laravel yang menyediakan REST API, fitur pengelolaan project melalui dashboard admin, dan deployment website.

## Website

| Keterangan | Link |
|---|---|
| Website Publik | https://portofolio-farhan-production.up.railway.app/ |
| GitHub Pages | https://farhanalhabsyi.github.io/portofolio-farhan/ |
| Admin Login | https://portofolio-farhan-production.up.railway.app/admin/login |
| Admin Dashboard | https://portofolio-farhan-production.up.railway.app/admin/dashboard |

> Dashboard admin memerlukan autentikasi. Jangan menyimpan password admin atau kredensial production di repository publik.

## Identitas Mahasiswa

- **Nama:** M Farhan Alhabsyi
- **NPM:** 22312084
- **Kelas:** IF 23C
- **Program Studi:** Informatika
- **Universitas:** Universitas Teknokrat Indonesia

## Teknologi

### Frontend
- HTML5
- Tailwind CSS
- JavaScript (Vanilla JavaScript)
- Fetch API
- Vite

### Backend
- PHP
- Laravel
- Laravel REST API
- MySQL
- Laravel Sanctum

### Tools
- Git
- GitHub
- Railway
- Postman

## Fitur Website

- Menampilkan informasi profil mahasiswa.
- Menampilkan skills, projects, experiences, dan certificates.
- Mengambil data portfolio melalui REST API.
- Loading skeleton saat data sedang dimuat.
- Menangani kondisi data kosong dan error.
- Pencarian project dengan debounce.
- Form contact menggunakan HTTP POST.
- Validasi form dan penanganan HTTP 422.
- Penanganan rate limit HTTP 429.
- Indikator loading dan notifikasi toast.
- Widget profil GitHub menggunakan GitHub API.
- Fallback avatar apabila foto profil gagal dimuat.
- Desain responsif untuk desktop, tablet, dan mobile.
- Tombol download CV.

## Fitur Admin

- Login admin menggunakan autentikasi.
- Dashboard pengelolaan portfolio.
- Menambahkan project baru.
- Mengelola data project yang tersimpan di database.
- Integrasi dashboard dengan database dan REST API.

Project yang ditambahkan melalui dashboard admin dapat disimpan ke database production dan ditampilkan melalui API website.

## REST API

Base URL:

```text
https://portofolio-farhan-production.up.railway.app/api/portfolio
```

| Method | Endpoint | Keterangan |
|---|---|---|
| GET | `/profile` | Mengambil data profil |
| GET | `/skills` | Mengambil data skills |
| GET | `/projects` | Mengambil daftar project |
| GET | `/projects/{slug}` | Mengambil detail project |
| GET | `/experiences` | Mengambil data pengalaman |
| GET | `/certificates` | Mengambil data sertifikat |
| POST | `/messages` | Mengirim pesan contact |

## Struktur Repository

```text
portofolio-farhan/
├── index.html
├── assets/
│   ├── script.js
│   ├── style.css
│   ├── profile.jpg
│   └── cv-farhan.pdf
├── docs/
├── portofolio-web/
│   ├── app/
│   ├── routes/
│   ├── database/
│   ├── public/
│   ├── resources/
│   └── README.md
├── vite.config.mjs
├── vite.railway.config.mjs
└── README.md
```

## Menjalankan Project Secara Lokal

### 1. Clone repository

```bash
git clone https://github.com/farhanalhabsyi/portofolio-farhan.git
cd portofolio-farhan
```

### 2. Menjalankan backend Laravel

Masuk ke folder Laravel:

```bash
cd portofolio-web
```

Install dependency:

```bash
composer install
```

Salin file environment:

```bash
copy .env.example .env
```

Generate application key:

```bash
php artisan key:generate
```

Atur konfigurasi database pada file `.env`, kemudian jalankan migration dan seeder jika diperlukan:

```bash
php artisan migrate --seed
```

Jalankan server Laravel:

```bash
php artisan serve --port=8000
```

API lokal dapat diakses melalui:

```text
http://127.0.0.1:8000/api/portfolio
```

### 3. Menjalankan frontend

Kembali ke root repository dan install dependency frontend:

```bash
cd ..
npm install
```

Jalankan development server:

```bash
npm run dev
```

Pastikan backend Laravel tetap berjalan ketika frontend mengambil data dari API.

## Deployment

Website portofolio dipublikasikan menggunakan Railway.

- **Platform:** Railway
- **Branch:** `Lat-8_Deployment`
- **Laravel Root Directory:** `/portofolio-web`
- **Production URL:** https://portofolio-farhan-production.up.railway.app/

Konfigurasi production menggunakan environment variables Railway. File `.env` tidak disimpan ke repository.

## Dokumentasi Laravel

Dokumentasi instalasi, database, REST API, pengujian, dan pengembangan backend tersedia di:

[Dokumentasi Project Laravel](./portofolio-web/README.md)

## Pengembang

**M Farhan Alhabsyi**

Informatika — Universitas Teknokrat Indonesia

2026