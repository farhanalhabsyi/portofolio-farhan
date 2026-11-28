# Latihan 5b — REST API POST Laravel

## Identitas Mahasiswa

| Keterangan | Data |
|---|---|
| Nama | M Farhan Alhabsyi |
| NPM | 22312084 |
| Program Studi | Informatika |
| Universitas | Universitas Teknokrat Indonesia |
| Kelas | IF 24Cx |

## Deskripsi

Latihan 5b merupakan pengembangan REST API Laravel dengan menambahkan endpoint untuk menerima pesan dari pengguna melalui HTTP method POST.

Data pesan divalidasi sebelum disimpan ke database. API mengembalikan respons JSON dengan status HTTP yang sesuai.

Project Laravel berada di dalam folder `portofolio-web`.

## Teknologi

- Laravel 11.57.1
- PHP 8.2.12
- MySQL
- Laravel Sanctum
- Eloquent ORM
- Laravel Form Request
- PHPUnit

## Endpoint API

| Method | Endpoint | Fungsi |
|---|---|---|
| POST | `/api/portfolio/messages` | Mengirim dan menyimpan pesan |

## Validasi Pesan

Validasi dilakukan menggunakan `StoreMessageRequest`.

| Field | Aturan |
|---|---|
| `sender_name` | Wajib, 3–100 karakter |
| `email` | Wajib, format email valid dengan pemeriksaan DNS |
| `subject` | Wajib, 3–150 karakter |
| `body` | Wajib, 10–2000 karakter |

Pesan validasi menggunakan bahasa Indonesia dan dikembalikan dalam format JSON.

## Format Request

Contoh body request JSON:

```json
{
  "sender_name": "Farhan Test",
  "email": "farhan@example.com",
  "subject": "Pengujian API Portofolio",
  "body": "Ini adalah pesan untuk menguji endpoint POST."
}
```

## Respons API

Jika pesan berhasil disimpan, API mengembalikan HTTP status `201 Created`.

Jika data tidak memenuhi aturan validasi, API mengembalikan HTTP status `422 Unprocessable Entity` beserta informasi kesalahan dalam format JSON.

Endpoint POST dilindungi rate limiter dengan batas 5 permintaan per menit.

## Implementasi

Fitur POST pesan diimplementasikan menggunakan:

- Route API pada `routes/api.php`
- `PortfolioController`
- `StoreMessageRequest` untuk validasi
- Model `Message` untuk menyimpan data ke database
- Middleware throttle untuk membatasi permintaan

## Pengujian

Pengujian dilakukan menggunakan Laravel PHPUnit Feature Test dan Postman.

Pengujian mencakup:

- Pengiriman pesan dengan data valid
- Penyimpanan pesan ke database
- Validasi data yang tidak valid
- Respons JSON dan status HTTP

Contoh hasil pengujian Postman:

- `201 Created` — pesan berhasil disimpan
- `422 Unprocessable Entity` — validasi gagal

Screenshot hasil pengujian tersedia pada folder dokumentasi:

- `post-message-success-201.png`
- `post-message-validation-422.png`

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

API dapat diakses melalui:

```text
http://127.0.0.1:8000/api/portfolio/messages
```

## Menjalankan Pengujian

Dari folder `portofolio-web`, jalankan:

```bash
php artisan test
```

## Repository

Repository GitHub:

https://github.com/farhanalhabsyi/portofolio-farhan