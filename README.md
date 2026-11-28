# Latihan 5a — REST API GET Laravel

## Identitas Mahasiswa

| Keterangan | Data |
|---|---|
| Nama | M Farhan Alhabsyi |
| NPM | 22312084 |
| Program Studi | Informatika |
| Universitas | Universitas Teknokrat Indonesia |
| Kelas | IF 24Cx |

## Deskripsi

Latihan 5a berfokus pada pembuatan REST API menggunakan Laravel untuk menyediakan data portofolio melalui HTTP method GET.

API mengambil data dari database menggunakan Eloquent Model dan mengembalikan respons dalam format JSON.

Project Laravel berada di dalam folder `portofolio-web`.

## Teknologi

- Laravel 11.57.1
- PHP 8.2.12
- MySQL
- Laravel Sanctum
- Eloquent ORM
- PHPUnit

## Endpoint API

| Method | Endpoint | Fungsi |
|---|---|---|
| GET | `/api/portfolio/profile` | Mengambil data profil |
| GET | `/api/portfolio/skills` | Mengambil daftar keahlian |
| GET | `/api/portfolio/projects` | Mengambil daftar proyek beserta keahlian |
| GET | `/api/portfolio/projects/{slug}` | Mengambil detail proyek berdasarkan slug |
| GET | `/api/portfolio/experiences` | Mengambil daftar pengalaman |
| GET | `/api/portfolio/certificates` | Mengambil daftar sertifikat |
| GET | `/api/user` | Mengambil data pengguna terautentikasi |

## Format Respons

Respons API menggunakan format JSON dengan struktur:

```json
{
  "status": "success",
  "message": "Data berhasil diambil.",
  "data": {}
}
```

Endpoint detail proyek menggunakan parameter `slug`.

Apabila proyek tidak ditemukan, API mengembalikan respons error dengan status HTTP 404 dan data bernilai `null`.

## Implementasi

API dibuat menggunakan `PortfolioController` dan route yang didefinisikan pada `routes/api.php`.

Data proyek mengambil relasi keahlian menggunakan eager loading agar informasi skill dapat disertakan dalam respons proyek.

Laravel Sanctum dipasang melalui perintah `php artisan install:api`.

## Pengujian

Pengujian API dilakukan menggunakan Laravel PHPUnit Feature Test.

Pengujian mencakup:

- Mengambil data profil
- Mengambil daftar keahlian
- Mengambil daftar proyek beserta relasi keahlian
- Mengakses detail proyek dengan slug yang tidak ditemukan

Hasil pengujian pada latihan ini:

- 4 tests passed
- 19 assertions

## Menjalankan Project

Masuk ke folder Laravel:

```bash
cd portofolio-web
```

Install dependency:

```bash
composer install
```

Salin konfigurasi environment jika belum tersedia:

```bash
copy .env.example .env
```

Atur konfigurasi database MySQL pada file `.env`, kemudian jalankan:

```bash
php artisan key:generate
php artisan migrate
php artisan serve
```

API dapat diakses melalui alamat lokal:

```text
http://127.0.0.1:8000/api/portfolio
```

## Menjalankan Pengujian

Dari folder `portofolio-web`, jalankan:

```bash
php artisan test
```

## Repository

Repository GitHub:

https://github.com/farhanalhabsyi/portofolio-farhan