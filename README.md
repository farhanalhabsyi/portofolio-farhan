# Latihan 8 — Deployment Website Portofolio

Website portofolio mahasiswa yang dikembangkan menggunakan HTML, Tailwind CSS, JavaScript, dan Laravel REST API. Pada Latihan 8, website diintegrasikan dengan backend Laravel dan dipublikasikan melalui Railway dengan koneksi HTTPS.

## Deployment

**Website Portofolio:**
https://portofolio-farhan-production.up.railway.app/

**Admin Login:**
https://portofolio-farhan-production.up.railway.app/admin/login

**Admin Dashboard:**
https://portofolio-farhan-production.up.railway.app/admin/dashboard

**API Portfolio:**
https://portofolio-farhan-production.up.railway.app/api/portfolio

Hosting menggunakan Railway dengan HTTPS.

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
- JavaScript (Vanilla JavaScript)
- Fetch API
- Laravel
- Laravel REST API
- Laravel Sanctum
- MySQL
- Git dan GitHub
- Railway

## Fitur Website

- Menampilkan data profil, skills, projects, experiences, dan certificates dari Laravel REST API.
- Menampilkan daftar proyek beserta skills terkait.
- Loading skeleton ketika data sedang dimuat.
- Menangani kondisi data kosong dan error.
- Pencarian project dengan debounce.
- Form contact menggunakan API POST tanpa reload halaman.
- Validasi form dan penanganan HTTP 422.
- Penanganan rate limit HTTP 429.
- Indikator loading dan notifikasi toast.
- Widget profil GitHub menggunakan GitHub API.
- Fallback avatar apabila foto profil gagal dimuat.
- Desain responsif untuk desktop, tablet, dan mobile.
- Tombol unduh CV.
- Admin login menggunakan Laravel Sanctum.
- Admin dashboard untuk mengelola data proyek.
- Fitur CRUD proyek melalui REST API.

## Deployment dengan Railway

Project Laravel berada di folder `portofolio-web` dan digunakan sebagai backend sekaligus server website portofolio.

Pada deployment, frontend hasil build ditempatkan di direktori publik Laravel agar website dan API dapat diakses melalui domain yang sama.

Konfigurasi deployment mencakup:

- Konfigurasi build frontend untuk Railway.
- Integrasi hasil build frontend ke direktori publik Laravel.
- Penggunaan HTTPS untuk website dan admin dashboard.
- Penyesuaian path asset dan file CV agar dapat diakses pada deployment.
- Penggunaan environment variables untuk konfigurasi aplikasi dan database.

## Menjalankan Project secara Lokal

### 1. Menjalankan Laravel

Buka terminal dan masuk ke folder Laravel:

```bash
cd portofolio-web
```

Install dependency PHP:

```bash
composer install
```

Siapkan file environment:

```bash
copy .env.example .env
```

Sesuaikan konfigurasi database pada file `.env`, kemudian jalankan:

```bash
php artisan key:generate
php artisan migrate --seed
php artisan serve --port=8000
```

### 2. Mengakses Website

Setelah server Laravel berjalan, buka:

```text
http://127.0.0.1:8000
```

Admin login dapat diakses melalui:

```text
http://127.0.0.1:8000/admin/login
```

API portfolio tersedia pada:

```text
http://127.0.0.1:8000/api/portfolio
```

Pastikan database sudah tersedia dan backend Laravel tetap berjalan ketika website mengambil data dari API.

## Admin Panel

Admin panel digunakan untuk mengelola data proyek portofolio melalui autentikasi Laravel Sanctum.

Fitur admin meliputi:

- Login dan logout admin.
- Menampilkan daftar proyek.
- Menambahkan proyek baru.
- Mengubah data proyek.
- Menghapus proyek.
- Mengatur skills dan status featured proyek.

Akun admin demo yang dibuat melalui seeder untuk pengujian lokal:

| Keterangan | Data |
|---|---|
| Email | admin@demo.com |
| Password | password123 |

Gunakan akun demo hanya untuk pengujian lokal. Jangan menggunakan password demo sebagai kredensial admin produksi.

## Dokumentasi Laravel

Project Laravel mencakup pengembangan website portofolio, REST API GET dan POST, validasi request, penyimpanan pesan kontak, autentikasi admin, serta pengujian API.

Dokumentasi lengkap mengenai instalasi, konfigurasi, fitur, endpoint API, dan pengujian dapat dibaca pada:

[Dokumentasi Project Laravel](./portofolio-web/README.md)

## Pengembang

M Farhan Alhabsyi

Informatika — Universitas Teknokrat Indonesia

2026