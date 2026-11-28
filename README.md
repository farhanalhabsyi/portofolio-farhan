\# Latihan 4a — Pengenalan Laravel



Latihan ini merupakan tahap awal pengembangan website portofolio menggunakan Laravel. Pada tahap ini dilakukan setup project Laravel, konfigurasi database MySQL, dan pembuatan halaman identitas mahasiswa menggunakan Blade Template.



\## Identitas Mahasiswa



\- \*\*Nama:\*\* M Farhan Alhabsyi

\- \*\*NPM:\*\* 22312084

\- \*\*Program Studi:\*\* Informatika

\- \*\*Universitas:\*\* Universitas Teknokrat Indonesia

\- \*\*Kelas:\*\* IF 24Cx



\## Tentang Latihan



Latihan 4a berfokus pada pengenalan framework Laravel dan konfigurasi awal aplikasi web.



Project Laravel berada di folder `portofolio-web`.



\## Implementasi



\- Setup project Laravel.

\- Konfigurasi koneksi database MySQL.

\- Menggunakan file konfigurasi environment `.env`.

\- Membuat halaman identitas mahasiswa menggunakan Laravel Blade.

\- Menampilkan informasi mahasiswa pada halaman web.

\- Menampilkan versi Laravel.

\- Menampilkan status koneksi database.

\- Menampilkan nama database yang digunakan.



\## Teknologi



\- PHP 8.2.12

\- Laravel 11.57.1

\- Composer 2.7.3

\- MySQL

\- Laravel Blade

\- XAMPP



\## Database



Database yang digunakan pada latihan ini:



\- \*\*Nama database:\*\* `portofolio\_web`

\- \*\*DBMS:\*\* MySQL



Halaman identitas menampilkan status koneksi database dan nama database yang sedang digunakan.



\## Menjalankan Project



Pastikan PHP, Composer, dan MySQL sudah tersedia di komputer.



1\. Masuk ke folder aplikasi Laravel:



&#x20;  ```bash

&#x20;  cd portofolio-web

&#x20;  ```



2\. Pasang dependencies:



&#x20;  ```bash

&#x20;  composer install

&#x20;  ```



3\. Salin file environment:



&#x20;  ```bash

&#x20;  copy .env.example .env

&#x20;  ```



4\. Buat database MySQL dengan nama `portofolio\_web`.



5\. Sesuaikan konfigurasi database pada file `.env`:



&#x20;  ```env

&#x20;  DB\_CONNECTION=mysql

&#x20;  DB\_HOST=127.0.0.1

&#x20;  DB\_PORT=3306

&#x20;  DB\_DATABASE=portofolio\_web

&#x20;  DB\_USERNAME=root

&#x20;  DB\_PASSWORD=

&#x20;  ```



6\. Generate application key:



&#x20;  ```bash

&#x20;  php artisan key:generate

&#x20;  ```



7\. Jalankan migration:



&#x20;  ```bash

&#x20;  php artisan migrate

&#x20;  ```



8\. Jalankan development server:



&#x20;  ```bash

&#x20;  php artisan serve

&#x20;  ```



9\. Buka aplikasi melalui browser:



&#x20;  \[http://127.0.0.1:8000](http://127.0.0.1:8000)



\## Dokumentasi



Dokumentasi project Laravel tersedia di:



`portofolio-web/README.md`



\## Repository



\[GitHub — portofolio-farhan](https://github.com/farhanalhabsyi/portofolio-farhan)



\## Author



\*\*M Farhan Alhabsyi\*\*

Informatika — Universitas Teknokrat Indonesia
