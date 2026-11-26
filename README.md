
# Website Portofolio — Latihan 6

Website portofolio mahasiswa yang dikembangkan menggunakan HTML, Tailwind CSS, dan JavaScript. Website diintegrasikan dengan API menggunakan Fetch API untuk menampilkan data secara dinamis.

## Identitas Mahasiswa

- Nama: M Farhan Alhabsyi
- NPM: 22312084
- Kelas: IF 23C
- Program Studi: Informatika
- Universitas: Universitas Teknokrat Indonesia

## Teknologi

- HTML
- Tailwind CSS
- JavaScript (Vanilla JavaScript)
- Fetch API
- Laravel REST API
- Git dan GitHub

## Fitur

- Menampilkan data skills, projects, dan certificates dari API.
- Loading skeleton saat data sedang dimuat.
- Menangani kondisi data kosong dan error.
- Pencarian project dengan debounce.
- Form contact menggunakan POST tanpa reload halaman.
- Validasi form dan penanganan HTTP 422.
- Penanganan rate limit HTTP 429.
- Indikator loading dan notifikasi toast.
- Widget profil GitHub menggunakan GitHub API.
- Fallback avatar apabila foto profil gagal dimuat.
- Desain responsif untuk desktop, tablet, dan mobile.
- Tombol unduh CV.

## Struktur Folder

```text
portofolio-farhan/
├── index.html
├── README.md
├── assets/
│   ├── script.js
│   ├── style.css
│   ├── profile.jpg
│   └── cv-farhan.pdf
└── portofolio-web/
    └── Laravel API
```

## Menjalankan Project

1. Buka folder `portofolio-web` dan jalankan backend Laravel:

   ```bash
   php artisan serve --port=8000
   ```

2. Pastikan API dapat diakses melalui:

   `http://127.0.0.1:8000/api/portfolio`

3. Buka `index.html` menggunakan Live Server atau server frontend lokal.

4. Pastikan backend Laravel tetap berjalan ketika website mengambil data dari API.

## GitHub API

Website mengambil informasi profil GitHub melalui endpoint:

`https://api.github.com/users/farhanalhabsyi`

## Pengembang

M Farhan Alhabsyi — 2026
## Project Praktikum Laravel

Repository ini juga berisi pengembangan website portofolio menggunakan Laravel untuk Praktikum Pemrograman Web 2.

Pengembangan project mencakup:

- Pengembangan fitur website portofolio
- REST API GET
- REST API POST
- Validasi request dan penyimpanan pesan kontak
- Dokumentasi dan pengujian API

Project Laravel berada di folder `portofolio-web`.

Dokumentasi lengkap mengenai instalasi, fitur, endpoint API, dan pengujian dapat dibaca di:

[Dokumentasi Project Laravel](./portofolio-web/README.md)

---

Dibuat oleh M Farhan Alhabsyi — 2026
