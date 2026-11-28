\# Latihan 4b — Database dan Model Laravel



\## Identitas Mahasiswa



| Keterangan | Data |

|---|---|

| Nama | M Farhan Alhabsyi |

| NPM | 22312084 |

| Program Studi | Informatika |

| Universitas | Universitas Teknokrat Indonesia |

| Kelas | IF 24Cx |



\## Deskripsi



Latihan 4b merupakan pengembangan project Laravel pada latihan sebelumnya dengan fokus pada perancangan database, pembuatan model, relasi antar-model, dan penggunaan seeder untuk mengisi data awal portofolio.



Project Laravel berada di dalam folder `portofolio-web`.



\## Teknologi



\- Laravel 11.57.1

\- PHP 8.2.12

\- MySQL

\- Eloquent ORM

\- Laravel Seeder



\## Database



Database yang digunakan bernama `portofolio\_web`.



Database terdiri dari 7 tabel:



| Tabel | Fungsi |

|---|---|

| `profiles` | Menyimpan data profil |

| `skills` | Menyimpan daftar keahlian |

| `projects` | Menyimpan data proyek |

| `experiences` | Menyimpan pengalaman |

| `certificates` | Menyimpan sertifikat |

| `messages` | Menyimpan pesan |

| `project\_skill` | Tabel pivot relasi proyek dan keahlian |



\## Relasi Model



Model `Project` dan `Skill` memiliki relasi many-to-many menggunakan tabel pivot `project\_skill`.



Relasi menggunakan `belongsToMany()` dan menyimpan timestamp pada tabel pivot. Foreign key pada relasi juga dikonfigurasi dengan cascade delete.



\## Seeder



Data awal database dimasukkan menggunakan `PortfolioSeeder`, yang dipanggil melalui `DatabaseSeeder`.



Data yang berhasil di-seed:



\- 1 profil

\- 6 keahlian

\- 3 proyek

\- 6 relasi proyek dan keahlian

\- 2 pengalaman

\- 1 sertifikat



Pengujian relasi dan cascade delete dilakukan menggunakan Laravel Tinker.



\## Screenshot



Dokumentasi hasil pengerjaan tersedia pada folder `docs/screenshots/`:



\- `database-tables.png` — struktur tabel database

\- `portofolio-projects.png` — data proyek portofolio

\- `project-skill-relations.png` — relasi proyek dan keahlian



\## Menjalankan Project



Masuk ke folder Laravel:



```bash

cd portofolio-web

```



Install dependency:



```bash

composer install

```



Salin file konfigurasi environment:



```bash

copy .env.example .env

```



Atur konfigurasi database MySQL pada file `.env` dengan nama database `portofolio\_web`, kemudian jalankan:



```bash

php artisan key:generate

php artisan migrate --seed

php artisan serve

```



Project dapat diakses melalui:



```text

http://127.0.0.1:8000

```



\## Repository



Repository GitHub:



https://github.com/farhanalhabsyi/portofolio-farhan
