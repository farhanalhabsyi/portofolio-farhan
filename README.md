# Latihan 7 — Admin CRUD

Pengembangan Admin Panel pada website portofolio menggunakan Laravel dan REST API. Latihan ini menambahkan autentikasi admin menggunakan Laravel Sanctum serta fitur CRUD untuk mengelola data proyek portofolio.

## Identitas Mahasiswa

| Keterangan | Data |
|---|---|
| Nama | M Farhan Alhabsyi |
| NPM | 22312084 |
| Kelas | IF 24Cx |
| Program Studi | Informatika |
| Universitas | Universitas Teknokrat Indonesia |

## Teknologi

- Laravel
- PHP
- MySQL
- Laravel Sanctum
- REST API
- HTML
- CSS
- JavaScript
- Fetch API

## Fitur

### Autentikasi Admin

- Login admin menggunakan email dan password.
- Validasi kredensial login.
- Pembuatan token autentikasi menggunakan Laravel Sanctum.
- Penyimpanan token admin pada `localStorage`.
- Logout dengan menghapus token aktif.

### Dashboard Admin

- Menampilkan nama admin yang sedang login.
- Menampilkan total proyek.
- Menampilkan jumlah proyek unggulan dan proyek lainnya.
- Menampilkan daftar proyek dalam tabel.
- Menampilkan status proyek.
- Menyediakan tombol tambah, edit, dan hapus proyek.

### Manajemen Proyek

- Menambahkan proyek baru.
- Melihat detail proyek.
- Memperbarui data proyek.
- Menghapus proyek.
- Mengelola judul, slug, ringkasan, dan deskripsi proyek.
- Mengatur URL thumbnail, demo, dan GitHub.
- Menghubungkan proyek dengan beberapa keahlian (skills).
- Mengatur status proyek unggulan.

## Halaman Admin

| Halaman | URL |
|---|---|
| Login Admin | `/admin/login` |
| Dashboard Admin | `/admin/dashboard` |

## API Endpoint

### Autentikasi

| Method | Endpoint | Keterangan |
|---|---|---|
| POST | `/api/login` | Login admin dan mendapatkan token |
| POST | `/api/logout` | Logout dan menghapus token aktif |

### CRUD Proyek Admin

Seluruh endpoint CRUD proyek memerlukan autentikasi Laravel Sanctum.

| Method | Endpoint | Keterangan |
|---|---|---|
| GET | `/api/admin/projects` | Menampilkan daftar proyek |
| POST | `/api/admin/projects` | Menambahkan proyek |
| GET | `/api/admin/projects/{project}` | Menampilkan detail proyek |
| PUT/PATCH | `/api/admin/projects/{project}` | Memperbarui proyek |
| DELETE | `/api/admin/projects/{project}` | Menghapus proyek |

### API Portofolio Publik

| Method | Endpoint | Keterangan |
|---|---|---|
| GET | `/api/portfolio/profile` | Data profil |
| GET | `/api/portfolio/skills` | Daftar keahlian |
| GET | `/api/portfolio/projects` | Daftar proyek |
| GET | `/api/portfolio/projects/{slug}` | Detail proyek berdasarkan slug |
| GET | `/api/portfolio/experiences` | Data pengalaman |
| GET | `/api/portfolio/certificates` | Data sertifikat |
| POST | `/api/portfolio/messages` | Mengirim pesan dari formulir kontak |

## Instalasi dan Menjalankan Project

Pastikan PHP, Composer, Node.js, npm, dan MySQL sudah tersedia.

### 1. Masuk ke direktori Laravel

```bash
cd portofolio-web
```

### 2. Install dependency

```bash
composer install
```

### 3. Konfigurasi environment

Salin file environment:

```bash
cp .env.example .env
```

Atur konfigurasi database pada file `.env`, kemudian buat application key:

```bash
php artisan key:generate
```

### 4. Migrasi dan seeder

Jalankan migrasi database beserta data awal:

```bash
php artisan migrate --seed
```

Seeder akan membuat akun admin demo dan data portofolio awal.

### 5. Jalankan Laravel

```bash
php artisan serve
```

Buka website melalui:

```text
http://127.0.0.1:8000
```

## Akun Admin Demo

Akun berikut dibuat oleh `AdminSeeder` untuk keperluan pengujian lokal.

| Keterangan | Data |
|---|---|
| Email | admin@demo.com |
| Password | password123 |

Buka halaman login admin:

```text
http://127.0.0.1:8000/admin/login
```

Setelah login berhasil, admin diarahkan ke dashboard untuk mengelola data proyek.

**Catatan:** Akun demo ini hanya untuk pengembangan dan pengujian lokal. Jangan gunakan password demo pada lingkungan produksi.

## Pengujian

Pengujian dapat dilakukan melalui halaman Admin Panel maupun REST API.

1. Jalankan aplikasi Laravel.
2. Buka halaman login admin.
3. Login menggunakan akun admin demo.
4. Pastikan dashboard menampilkan ringkasan dan daftar proyek.
5. Tambahkan proyek baru melalui formulir.
6. Ubah data proyek yang tersedia.
7. Hapus proyek untuk menguji fungsi delete.
8. Pastikan proyek dan relasi skills tersimpan dengan benar.
9. Lakukan logout dan pastikan token aktif dihapus.

## Struktur File Utama

```text
portofolio-web/
├── app/
│   ├── Http/
│   │   └── Controllers/
│   │       └── Api/
│   │           ├── Admin/
│   │           │   └── ProjectController.php
│   │           └── AuthController.php
│   └── Models/
│       └── User.php
├── database/
│   └── seeders/
│       ├── AdminSeeder.php
│       └── DatabaseSeeder.php
├── public/
│   └── js/
│       └── admin.js
├── resources/
│   └── views/
│       └── admin/
│           ├── login.blade.php
│           └── dashboard.blade.php
└── routes/
    ├── api.php
    └── web.php
```

## Kesimpulan

Pada Latihan 7, website portofolio dikembangkan dengan Admin Panel untuk mengelola data proyek melalui REST API. Autentikasi admin menggunakan Laravel Sanctum, sedangkan operasi CRUD proyek dilindungi middleware autentikasi. Dashboard menyediakan antarmuka untuk melihat dan mengelola proyek portofolio secara dinamis.

---

**M Farhan Alhabsyi**
Informatika — Universitas Teknokrat Indonesia