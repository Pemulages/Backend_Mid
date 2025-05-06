# Inventory Management

NAMA  : Abdurrazzaq Ilham Aziz
NIM   : A11.2022.14301

Aplikasi pengelolaan persediaan barang toko yang lengkap, dengan fitur pengelolaan produk, kategori, pemasok, dan administrator yang bertanggung jawab atas manajemen data.

## Gambaran Umum Proyek

Proyek ini menyediakan API RESTful untuk sistem manajemen inventaris dengan fitur-fitur berikut:

- **Autentikasi Admin**: Fungsi pendaftaran dan masuk untuk para administrator
- **Pengelolaan Kategori**: Operasi CRUD untuk kategori produk
- **Pengelolaan Pemasok**: Operasi CRUD untuk pemasok barang
- **Pengelolaan Barang**: Operasi CRUD untuk inventaris barang
- **Pelaporan**: Berbagai laporan untuk analisis inventaris:
  - Ringkasan inventaris
  - Barang dengan stok rendah
  - Daftar barang berdasarkan kategori
  - Ringkasan kategori
  - Ringkasan pemasok
  - Ringkasan sistem

## Teknologi yang Digunakan

- **Kerangka Kerja Backend**: Express.js (Node.js)
- **Basis Data**: PostgreSQL
- **ORM**: Sequelize
- **Autentikasi**: JWT (JSON Web Tokens)
- **Kontainerisasi**: Docker

## Cara Memulai

### Prasyarat

- Docker dan Docker Compose sudah terpasang di sistem

### Penyiapan dan Instalasi

1. **Membangun dan menjalankan kontainer Docker**

```bash
docker-compose up -d
```

Perintah ini akan menjalankan dua kontainer:
- **inventory-app**: Aplikasi backend Express.js
- **inventory-db**: Basis data PostgreSQL

2. **Mengisi basis data dengan data contoh**

```bash
docker exec -it inventory-app npm run seed
```

3. **Mengakses API**

API akan tersedia di `http://localhost:3000`

## Kredensial Admin Default

- **Username**: admin2
- **Password**: admin

## Dokumentasi API

### Endpoints Autentikasi

- **POST /api/admins/register** - Mendaftarkan admin baru
- **POST /api/admins/login** - Login admin
- **GET /api/admins/profile** - Mendapatkan profil admin (memerlukan autentikasi)

### Endpoints Kategori

- **POST /api/categories** - Membuat kategori baru
- **GET /api/categories** - Mendapatkan semua kategori
- **GET /api/categories/:id** - Mendapatkan kategori berdasarkan ID

### Endpoints Pemasok

- **POST /api/suppliers** - Membuat pemasok baru
- **GET /api/suppliers** - Mendapatkan semua pemasok
- **GET /api/suppliers/:id** - Mendapatkan pemasok berdasarkan ID

### Endpoints Barang

- **POST /api/items** - Membuat barang baru
- **GET /api/items** - Mendapatkan semua barang
- **GET /api/items/:id** - Mendapatkan barang berdasarkan ID

### Endpoints Laporan

- **GET /api/reports/inventory-summary** - Mendapatkan ringkasan inventaris
- **GET /api/reports/low-stock** - Mendapatkan barang dengan stok rendah
- **GET /api/reports/category/:category_id/items** - Mendapatkan barang berdasarkan kategori
- **GET /api/reports/category-summary** - Mendapatkan ringkasan kategori
- **GET /api/reports/supplier-summary** - Mendapatkan ringkasan pemasok
- **GET /api/reports/system-summary** - Mendapatkan ringkasan sistem

## Proses Pengembangan

### 1. Perencanaan dan Penyiapan Proyek

1. Menganalisis skema basis data dari gambar yang disediakan
2. Memilih Express.js dengan PostgreSQL untuk backend
3. Menyiapkan struktur proyek
4. Membuat konfigurasi lingkungan

### 2. Implementasi Model Basis Data

1. Merancang model Sequelize untuk semua tabel
2. Mengimplementasikan asosiasi antar model
3. Menambahkan pengait (hooks) untuk pengacakan kata sandi dan cap waktu

### 3. Sistem Autentikasi

1. Mengimplementasikan pendaftaran dan login admin
2. Membuat middleware autentikasi berbasis JWT
3. Menyiapkan rute terproteksi

### 4. Implementasi Fungsi Utama

1. Membuat pengendali untuk barang, kategori, dan pemasok
2. Mengimplementasikan operasi CRUD
3. Menambahkan validasi untuk data masukan

### 5. Fungsi Pelaporan

1. Mengimplementasikan berbagai titik akhir laporan
2. Menggunakan Sequelize dan kueri SQL mentah untuk laporan kompleks
3. Mengoptimalkan kueri untuk kinerja

### 6. Pengujian dan Debugging

1. Menguji semua titik akhir menggunakan alat API
2. Men-debug dan memperbaiki masalah
3. Meningkatkan penanganan kesalahan

### 7. Kontainer

1. Membuat Dockerfile untuk aplikasi
2. Menyiapkan docker-compose.yml untuk arsitektur multi-kontainer
3. Mengkonfigurasi jaringan dan volume persisten untuk basis data

### 8. Dokumentasi

1. Membuat README yang komprehensif
2. Mendokumentasikan titik akhir API
3. Menambahkan petunjuk penyiapan

## Contoh Penggunaan API

### Login Admin

```bash
curl -X POST http://localhost:3000/api/admins/login \
  -H "Content-Type: application/json" \
  -d '{"username": "admin2", "password": "admin"}'
```

### Membuat Kategori

```bash
curl -X POST http://localhost:3000/api/categories \
  -H "Content-Type: application/json" \
  -H "Authorization:" \
  -d '{"name": "Elektronik", "description": "Perangkat elektronik dan aksesorisnya"}'
```

### Membuat Barang

```bash
curl -X POST http://localhost:3000/api/items \
  -H "Content-Type: application/json" \
  -H "Authorization:" \
  -d '{
    "name": "Laptop",
    "description": "Laptop bisnis dengan layar 15 inci",
    "price": 1200.00,
    "quantity": 10,
    "category_id": 1,
    "supplier_id": 1
  }'
```

### Mendapatkan Ringkasan Inventaris

```bash
curl -X GET http://localhost:3000/api/reports/inventory-summary \
  -H "Authorization:"
```

## Lisensi
By: Abdurrazzaq Ilham Aziz A11.2022.14301
