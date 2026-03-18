<h1 align="center">🏝️ Karimunjawa Travel Admin Dashboard</h1>

<p align="center">
  Sebuah prototipe antarmuka Dashboard Admin modern, responsif, dan elegan untuk pengelolaan bisnis perjalanan (khususnya destinasi Karimunjawa). Dibangun dengan fokus utama pada kapabilitas responsif (Mobile, Tablet, Desktop) serta pengalaman pengguna (UX) yang sangat mulus.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Vue.js-3.5-4FC08D?style=for-the-badge&logo=vuedotjs&logoColor=white" alt="Vue 3" />
  <img src="https://img.shields.io/badge/Vite-5.0-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Shadcn_Vue-000000?style=for-the-badge&logo=shadcnui&logoColor=white" alt="Shadcn Vue" />
</p>

<hr />

## ✨ Fitur Utama (Key Features)

- **📱 Responsivitas Sempurna (Fully Responsive)**: Tampilan secara mulus beradaptasi mulai dari layar Desktop (Grid penuh), Tablet (*Auto-collapse Sidebar* & penyesuaian teks), hingga layar *Mobile* sekecil 320px (Menu *Off-canvas Hamburgers* dengan *overlay* gelap).
- **📊 Visualisasi Data Interaktif**: Terintegrasi penuh dengan `ApexCharts` untuk area Revenue dan Booking bar-charts.
- **🎨 Glassmorphism & SVG Patterns**: Estetika modern tingkat lanjut dengan SVG blobs transparan pada berbagai kartu rangkuman dan elemen aksi cepat *(Quick Actions)*.
- **⚡ Super Cepat**: Menggunakan bundler **Vite** yang menjamin pengalaman perancangan dengan *Hot Module Replacement* (HMR) setara instan.
- **📁 Data Abstrak Tersentral**: Semua data pratinjau grafik ditarik rapi dari `/src/data/dashboard.json` yang memudahkan transisi integrasi menuju API Backend kelak.

---

## 💻 Tech Stack

- **Framework**: [Vue 3](https://vuejs.org/) (Composition API / `<script setup>`)
- **Bundler / Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Shadcn-Vue](https://www.shadcn-vue.com/) & [Radix Vue](https://www.radix-vue.com/)
- **Icons**: [Lucide Vue Next](https://lucide.dev/)
- **Charts**: [Vue3 ApexCharts](https://apexcharts.com/docs/vue-charts/)
- **Routing**: `vue-router`

---

## 📂 Struktur Direktori (*Code Architecture*)

```text
Dashboard-karimunjawa-travel/
├── src/
│   ├── assets/           # Pola SVG dekoratif (welcome-pattern.svg, card-pattern.svg)
│   ├── components/       
│   │   ├── dashboard/    # Widget utama dashboard (RevenueOverview, RecentViews, dll.)
│   │   ├── layout/       # Tata letak pembungkus dasar (Header, Sidebar, Footer)
│   │   └── ui/           # Komponen UI Dasar Shadcn (Button, Card, Avatar, Input)
│   ├── data/             # File Mock JSON (dashboard.json)
│   ├── layouts/          # Struktur kerangka aplikasi (AppLayout.vue)
│   ├── pages/            # Halaman tingkat rute (Dashboard, Login, Bookings)
│   ├── router/           # Konfigurasi Vue Router & penjagaan rute (Routes config)
│   └── lib/              # Skrip pendukung, modul Typescript, & utilitas (utils.ts)
├── public/               # Aset statis publik (favicon, dsj)
├── index.html            # Entri utama dasar
├── package.json          # Manajemen dependency NodeJS
└── vite.config.ts        # Konfigurasi Vite & module alias (@/)
```

---

## 🚀 Panduan Memulai (*Quick Start*)

### Prasyarat
Pastikan mesin Anda telah terpasang **[Node.js](https://nodejs.org/)** versi `18+` karena integrasi Vite membutuhkan runtime Node terbaru.

### 1. Instalasi Node Modules
Lakukan kloning dari Repositori ini dan instal semua depensi yang dibutuhkan menggunakan NPM:
```bash
npm install
```

### 2. Jalankan Mode *Development*
Sistem *Hot Module Replacement* Vite akan langsung menjalankan proyek.
```bash
npm run dev
```
> Bukalah URL di browser (biasanya `http://localhost:5173`). Setiap kali Anda mengubah file kode `.vue`, hasilnya akan dikompilasi ulang dan muncul di layar seketika!

### 3. Kompilasi Produksi (Production Build)
Untuk mempersiapkan peluncuran aplikasi (*Deployment*) dengan performa yang maksimal, terhindar dari peringatan ekstensi pihak ketiga, serta lulus audit performa **Lighthouse 90+**:
```bash
# Melakukan proses Type-check & Build kode Vue menjadi aset optimal
npm run build

# Menjalankan server lokal pratinjau performa akhir produksi
npm run preview
```

---

## 👨‍💻 Kontribusi

Proyek ini dibangun menggunakan disiplin penulisan *Mobile-First*. Apabila ingin melakukan iterasi modifikasi terhadap antarmuka (UI):
1. **Utamakan `flex-wrap`, `shrink-0` dan `min-w-0`** saat menggabungkan elemen `flex` agar tidak hancur (*squishing/overflow*) sewaktu dibuka di HP.
2. Saat bekerja dengan SVG patterns, disarankan menggunakan tag `<img>` dengan kelas yang bertugas meletakkan posisi secara *absolut* seperti halnya pada komponen `RevenueOverview.vue`, dan bukan sebagai `background-image` CSS *(untuk kompatibilitas Vite path resolution)*.
3. Seluruh *Margin* tata-letak responsif dari `Sidebar` berada di dalam `<main>` komponen sentral `/src/layouts/AppLayout.vue`.

> **Note:** Pengaturan Sidebar telah ditingkatkan untuk menggunakan sifat otomatis menciut (*Auto-collapse -> w-20*) secara cerdas ketika sistem mendeteksi akses layar beralih ke dimensi perangkat Tablet (`md / <1024px`) dan hilang (`-translate-x-full`) di HP.
