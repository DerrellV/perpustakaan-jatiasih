import {CatalogItem} from '../types/library';

export const INITIAL_CATALOG_ITEMS: CatalogItem[] = [
  {
    id: 'skripsi-01',
    accessionNumber: 'SKR.2025.0142',
    category: 'skripsi',
    title: 'Arsitektur Pencarian Semantik untuk Repositori Karya Ilmiah Berbahasa Indonesia',
    subtitle: 'Evaluasi Model Embedding Dwibahasa pada Dokumen Skripsi dan Jurnal Terbuka',
    author: 'Nadia Kusuma Wardhani',
    affiliationOrPublisher: 'Fakultas Ilmu Komputer, Universitas Nusantara',
    advisors: ['Dr. Hendra Wijaya, M.Kom.', 'Siti Rahmawati, M.Sc.'],
    facultyOrGenre: 'Ilmu Komputer & Informatika',
    year: 2025,
    pages: 124,
    language: 'Indonesia',
    identifierLabel: 'NIM',
    identifierValue: '2106710482',
    abstract:
      'Penelitian ini merancang mesin pencari semantik yang mampu memahami sinonim istilah akademik berbahasa Indonesia maupun padanan teknis berbahasa Inggris pada ribuan abstrak skripsi. Pengujian terhadap 4.200 korpus dokumen menunjukkan peningkatan relevansi temu kembali sebesar 31,4% dibandingkan pencocokan kata kunci konvensional.',
    keywords: ['Temu Kembali Informasi', 'Pencarian Semantik', 'Repositori Terbuka', 'NLP Indonesia'],
    coverImage: '/src/assets/images/thesis_archival_binding_1795677493199.jpg',
    coverTone: 'lapis',
    readCount: 1428,
    featured: true,
    chapters: [
      {
        id: 'bab-1',
        label: '01 / PENDAHULUAN',
        title: 'Latar Belakang Keterbukaan Pengetahuan Kampus',
        paragraphs: [
          'Sebagian besar perpustakaan perguruan tinggi di Indonesia menyimpan puluhan ribu naskah skripsi yang kaya akan studi kasus lokal, namun sering kali sulit ditemukan oleh peneliti maupun masyarakat umum karena keterbatasan indeks kata kunci kaku.',
          'Pengunjung perpustakaan non-akademik kerap menggunakan bahasa sehari-hari saat mencari referensi—misalnya mengetikkan "penanggulangan banjir kota" alih-alih "mitigasi hidrologi perkotaan". Kesenjangan kosakata ini membuat khazanah riset mahasiswa kurang termanfaatkan secara luas.',
          'Skripsi ini mengeksplorasi bagaimana representasi vektor kalimat berdimensi ringkas dapat dijalankan dengan biaya komputasi rendah untuk melayani pencarian terbuka yang inklusif bagi siapa saja.'
        ]
      },
      {
        id: 'bab-2',
        label: '02 / METODOLOGI',
        title: 'Korpus Uji dan Perancangan Evaluasi',
        paragraphs: [
          'Korpus penelitian dihimpun dari 4.200 judul dan abstrak lintas enam rumpun ilmu yang telah dipublikasikan secara terbuka antara tahun 2019 hingga 2024. Setiap dokumen dibersihkan dari header administratif sebelum diindeks.',
          'Evaluasi dilakukan dengan melibatkan 36 partisipan yang terdiri atas mahasiswa tingkat akhir, pustakawan, dan pengunjung umum. Setiap partisipan menguji 15 skenario pencarian nyata untuk menilai kejelasan hasil teratas (nDCG@10).'
        ]
      },
      {
        id: 'bab-3',
        label: '03 / TEMUAN UTAMA',
        title: 'Dampak Pencarian Hibrida bagi Pengunjung Umum',
        paragraphs: [
          'Kombinasi indeks leksikal BM25 dan kemiripan semantik menghasilkan keseimbangan terbaik: istilah khusus seperti nama algoritma tetap presisi, sementara kueri deskriptif dari pembaca awam tetap menemukan karya yang tepat.',
          'Temuan ini merekomendasikan penerapan antarmuka katalog perpustakaan yang menyertakan ringkasan bahasa lugas dan tautan lintas topik agar pengetahuan kampus benar-benar menjadi milik publik.'
        ]
      }
    ]
  },
  {
    id: 'buku-01',
    accessionNumber: 'BKU.2024.0891',
    category: 'buku',
    title: 'Geometri Ruang Teduh: Membaca Ulang Arsitektur Tropis Nusantara',
    subtitle: 'Kajian Proporsi Teritisan, Ventilasi Silang, dan Material Lokal dalam Bangunan Publik',
    author: 'Ir. Bagus Prakoso, IAI',
    affiliationOrPublisher: 'Penerbit Lentera Ruang',
    facultyOrGenre: 'Arsitektur & Desain',
    year: 2024,
    pages: 268,
    language: 'Indonesia',
    identifierLabel: 'ISBN',
    identifierValue: '978-623-418-092-3',
    abstract:
      'Sebuah monograf visual dan naratif yang menelusuri kebijaksanaan iklim dalam arsitektur bangunan publik di Indonesia—mulai dari pendopo tradisional, balai desa, hingga perpustakaan kota kontemporer yang hemat energi tanpa bergantung penuh pada pendingin mekanis.',
    keywords: ['Arsitektur Tropis', 'Ruang Publik', 'Ventilasi Alami', 'Material Lokal'],
    coverImage: '/src/assets/images/book_cover_architecture_1795677491641.jpg',
    coverTone: 'lapis',
    readCount: 1984,
    featured: true,
    chapters: [
      {
        id: 'bab-1',
        label: 'BAGIAN I',
        title: 'Naungan sebagai Hakikat Kenyamanan Tropis',
        paragraphs: [
          'Di wilayah khatulistiwa, bangunan tidak pernah sekadar dinding yang memisahkan ruang dalam dan luar. Ia adalah payung besar yang menyaring silau matahari siang sekaligus mengundang angin sore melintas tanpa halangan.',
          'Saat kita memasuki ruang baca perpustakaan daerah yang dirancang dengan teritisan lebar dan halaman dalam berpepohonan, suhu ruang terasa turun beberapa derajat bahkan sebelum menyentuh tombol pendingin.'
        ]
      },
      {
        id: 'bab-2',
        label: 'BAGIAN II',
        title: 'Pelajaran dari Proporsi Kayu dan Batu Kapur',
        paragraphs: [
          'Material lokal seperti batu kapur berpori dan kayu keras reklamasi menyimpan memori termal yang jauh lebih bersahabat dibandingkan selubung kaca penuh yang memantulkan panas ke trotoar sekitar.',
          'Bab ini menyajikan 18 gambar terukur ruang publik di Yogyakarta, Bandung, dan Makassar sebagai panduan praktis bagi mahasiswa arsitektur maupun perancang kota.'
        ]
      }
    ]
  },
  {
    id: 'ta-01',
    accessionNumber: 'TA.2025.0319',
    category: 'tugas-akhir',
    title: 'Sistem Navigasi Audio dan Kontras Tinggi untuk Kios Katalog Perpustakaan Inklusif',
    subtitle: 'Prototipe Antarmuka Aksesibel bagi Pengunjung Lanjut Usia dan Disabilitas Netra',
    author: 'Raka Pratama Putra',
    affiliationOrPublisher: 'Politeknik Rekayasa Terapan Surabaya',
    advisors: ['Dewi Anggraini, S.ST., M.T.'],
    facultyOrGenre: 'Teknologi Informasi & Aksesibilitas',
    year: 2025,
    pages: 86,
    language: 'Indonesia',
    identifierLabel: 'NIM',
    identifierValue: '4322010074',
    abstract:
      'Tugas akhir program Diploma IV ini membangun prototipe antarmuka kios katalog perpustakaan umum yang memenuhi standar WCAG 2.2 AA, dilengkapi pembaca layar berbahasa Indonesia, navigasi papan ketik penuh, serta tombol sentuh berukuran ergonomis untuk pengunjung lanjut usia.',
    keywords: ['Aksesibilitas Web', 'WCAG', 'Desain Inklusif', 'Kios Perpustakaan'],
    coverTone: 'forest',
    readCount: 1105,
    featured: true,
    chapters: [
      {
        id: 'bab-1',
        label: '01 / URGENSI PROYEK',
        title: 'Menghapus Hambatan Fisik dan Digital di Ruang Baca Publik',
        paragraphs: [
          'Observasi di tiga perpustakaan daerah menunjukkan bahwa 42% pengunjung berusia di atas 55 tahun mengurungkan niat memakai komputer katalog karena ukuran huruf terlalu kecil dan alur pencarian bertingkat yang membingungkan.',
          'Proyek tugas akhir ini merancang ulang alur pencarian katalog menjadi satu bidang pencarian tunggal dengan kontras tinggi, umpan balik suara opsional, serta pengelompokan koleksi yang langsung dipahami oleh pengunjung pertama kali.'
        ]
      },
      {
        id: 'bab-2',
        label: '02 / IMPLEMENTASI',
        title: 'Arsitektur Sintesis Suara dan Uji Ketergunaan',
        paragraphs: [
          'Komponen pembaca teks dibangun menggunakan Web Speech API yang dikalibrasi untuk pelafalan singkatan akademik Indonesia seperti "hlm.", "Vol.", dan nomor panggil klasifikasi Dewey.',
          'Pengujian lapangan bersama 18 responden menghasilkan skor System Usability Scale (SUS) sebesar 87,5 dan pemangkasan waktu pencarian buku rata-rata dari 3 menit 15 detik menjadi 48 detik.'
        ]
      }
    ]
  },
  {
    id: 'buku-02',
    accessionNumber: 'BKU.2023.0412',
    category: 'buku',
    title: 'Ladang yang Menghimpun: Catatan Ekologi dan Ingatan Desa',
    subtitle: 'Kumpulan Esai Liris tentang Hutan Rakyat, Benih Lokal, dan Musim Tanam',
    author: 'Larasati Mahardika',
    affiliationOrPublisher: 'Pustaka Bumi Nusantara',
    facultyOrGenre: 'Sastra & Humaniora',
    year: 2023,
    pages: 194,
    language: 'Indonesia',
    identifierLabel: 'ISBN',
    identifierValue: '978-602-889-241-0',
    abstract:
      'Buku bacaan nonfiksi sastra yang merangkai kisah penjaga benih padi lokal di lereng Pegunungan Menoreh hingga nelayan pesisir yang menanam kembali sabuk mangrove sebagai benteng hidup kampung mereka.',
    keywords: ['Esai Lingkungan', 'Sastra Indonesia', 'Ekologi Budaya', 'Kearifan Lokal'],
    coverImage: '/src/assets/images/book_cover_literature_1795677492194.jpg',
    coverTone: 'forest',
    readCount: 1650,
    chapters: [
      {
        id: 'bab-1',
        label: 'ESAI PEMBUKA',
        title: 'Lumbung di Balik Kabut Pagi',
        paragraphs: [
          'Di beranda rumah kayu itu, puluhan ikat padi berbulu keemasan digantung rapi di bawah kasau bambu. Setiap ikatnya memiliki nama, kisah musim, dan ingatan tentang tangan siapa yang pertama kali menanamnya.',
          'Membaca benih adalah membaca sejarah kesabaran: bagaimana masyarakat desa menjaga keberagaman pangan bukan lewat dokumen paten, melainkan lewat pertukaran ramah di pertemuan panen.'
        ]
      },
      {
        id: 'bab-2',
        label: 'ESAI KEDUA',
        title: 'Peta Ingatan di Sepanjang Muara',
        paragraphs: [
          'Ketika pohon bakau kembali berakar di lumpur pasang surut, kepiting dan burung air pulang lebih cepat daripada perkiraan peta satelit mana pun.',
          'Esai ini mengajak pembaca kota untuk memandang ruang hidup desa sebagai perpustakaan terbuka yang terus menulis ulang bab-bab ketahanannya.'
        ]
      }
    ]
  },
  {
    id: 'buku-03',
    accessionNumber: 'BKU.2025.0044',
    category: 'buku',
    title: 'Kode Fraktal Alam: Mengurai Keteraturan di Balik Pola Kompleks',
    subtitle: 'Pengantar Sains Populer tentang Geometri Alam, Jaringan, dan Sistem Adaptif',
    author: 'Dr. Aris Setiawan & Maya Lestari',
    affiliationOrPublisher: 'Balai Pustaka Sains Terbuka',
    facultyOrGenre: 'Sains & Lingkungan',
    year: 2025,
    pages: 312,
    language: 'Indonesia',
    identifierLabel: 'ISBN',
    identifierValue: '978-623-501-118-9',
    abstract:
      'Mengapa percabangan pembuluh darah manusia, alur sungai di delta Kalimantan, dan struktur kristal salju mengikuti prinsip matematis yang serupa? Buku ini menjelaskan ilmu kompleksitas dengan bahasa jernih dan ilustrasi konseptual bagi pembaca umum.',
    keywords: ['Sains Populer', 'Matematika Alam', 'Sistem Kompleks', 'Fraktal'],
    coverImage: '/src/assets/images/book_cover_science_1795677492919.jpg',
    coverTone: 'slate',
    readCount: 1320,
    chapters: [
      {
        id: 'bab-1',
        label: 'BAB I',
        title: 'Ketika Garis Lurus Tak Lagi Cukup',
        paragraphs: [
          'Geometri klasik mengajarkan kita mengukur kubus, bola, dan kerucut yang serba mulus. Namun dunia nyata justru penuh lekuk kasar: garis pantai kepulauan, retakan tanah liat saat kemarau, hingga awan kumulus di langit senja.',
          'Dengan memahami dimensi fraktal, para ilmuwan modern mampu memodelkan persebaran serbuk sari, pola lalu lintas kota, dan efisiensi jaringan distribusi energi.'
        ]
      },
      {
        id: 'bab-2',
        label: 'BAB II',
        title: 'Keseimbangan Dinamis dalam Ekosistem',
        paragraphs: [
          'Sistem yang tangguh bukanlah sistem yang kaku dan tanpa gangguan, melainkan sistem yang memiliki jalur cadangan terdistribusi.',
          'Bab ini menguraikan contoh nyata pemulihan terumbu karang dan hutan kota sebagai ilustrasi langsung prinsip adaptasi biologis.'
        ]
      }
    ]
  },
  {
    id: 'skripsi-02',
    accessionNumber: 'SKR.2024.0884',
    category: 'skripsi',
    title: 'Ketahanan Arus Kas dan Digitalisasi Pembukuan pada UMKM Kuliner Tradisional',
    subtitle: 'Studi Empiris 140 Pelaku Usaha Mikro di Koridor Pasar Rakyat Jawa Tengah',
    author: 'Dimas Aditya Nugroho',
    affiliationOrPublisher: 'Fakultas Ekonomika dan Bisnis, Universitas Diponegoro',
    advisors: ['Prof. Dr. Budi Santoso, M.Si.'],
    facultyOrGenre: 'Ekonomi & Bisnis',
    year: 2024,
    pages: 138,
    language: 'Indonesia',
    identifierLabel: 'NIM',
    identifierValue: '1203012014',
    abstract:
      'Skripsi ini menganalisis faktor-faktor yang memengaruhi adopsi pencatatan keuangan digital sederhana oleh pelaku UMKM kuliner pasar tradisional, serta dampaknya terhadap pemisahan aset pribadi dan kemampuan mengakses pembiayaan mikro formal.',
    keywords: ['UMKM', 'Literasi Keuangan', 'Pembukuan Digital', 'Ekonomi Rakyat'],
    coverTone: 'stone',
    readCount: 892,
    chapters: [
      {
        id: 'bab-1',
        label: '01 / PENDAHULUAN',
        title: 'Tantangan Pencatatan Usaha di Tengah Kesibukan Harian',
        paragraphs: [
          'Banyak usaha kuliner warisan keluarga memiliki omzet harian yang stabil dan pelanggan setia, tetapi kesulitan mengajukan kredit pengembangan usaha karena tidak memiliki catatan laba rugi bulanan yang terdokumentasi.',
          'Penelitian ini menelusuri kesesuaian antarmuka aplikasi kasir sederhana yang tidak memaksa pemilik warung menghafal istilah akuntansi rumit.'
        ]
      },
      {
        id: 'bab-2',
        label: '02 / HASIL & ANALISIS',
        title: 'Pendampingan Sebaya sebagai Kunci Keberlanjutan',
        paragraphs: [
          'Dari 140 responden, pelaku usaha yang didampingi oleh komunitas pedagang pasar menunjukkan tingkat keberlanjutan pembukuan selama enam bulan sebesar 78%, jauh melampaui kelompok yang hanya menerima modul cetak mandiri.'
        ]
      }
    ]
  },
  {
    id: 'ta-02',
    accessionNumber: 'TA.2024.0512',
    category: 'tugas-akhir',
    title: 'Perancangan Identitas Visual dan Papan Penunjuk Arah Taman Baca Masyarakat Kota',
    subtitle: 'Pendekatan Tipografi Jelas dan Piktogram Budaya Lokal untuk Pengunjung Lintas Usia',
    author: 'Clara Putri Wijaya',
    affiliationOrPublisher: 'Institut Seni dan Desain Vokasi Bandung',
    advisors: ['Rama Yudhistira, S.Sn., M.Ds.'],
    facultyOrGenre: 'Arsitektur & Desain',
    year: 2024,
    pages: 94,
    language: 'Indonesia',
    identifierLabel: 'NIM',
    identifierValue: '17521039',
    abstract:
      'Karya tugas akhir ini merumuskan sistem penunjuk arah (wayfinding) dan tata letak rak untuk Taman Baca Masyarakat agar anak-anak, remaja, dan lansia dapat menemukan sudut baca serta koleksi buku tanpa kebingungan visual.',
    keywords: ['Wayfinding', 'Desain Komunikasi Visual', 'Taman Baca', 'Tipografi Ruang'],
    coverTone: 'lapis',
    readCount: 745,
    chapters: [
      {
        id: 'bab-1',
        label: '01 / KONSEP DESAIN',
        title: 'Keterbacaan Ruang di Perpustakaan Komunitas',
        paragraphs: [
          'Sebuah taman baca yang ramah dimulai dari ambang pintu: pengunjung perlu langsung melihat posisi meja layanan, rak koleksi anak, rak buku umum, dan sudut baca tenang tanpa harus terus-menerus bertanya kepada petugas.',
          'Sistem piktogram dikembangkan dari bentuk lipatan kertas dan siluet atap joglo yang sederhana, dicetak pada papan kayu berlapis cat doff anti-silau.'
        ]
      }
    ]
  },
  {
    id: 'skripsi-03',
    accessionNumber: 'SKR.2025.0209',
    category: 'skripsi',
    title: 'Pengaruh Kebiasaan Membaca Cetak Mendalam terhadap Pemahaman Teks Kritis Mahasiswa',
    subtitle: 'Eksperimen Komparatif antara Pembacaan Linear dan Pemindaian Layar Cepat',
    author: 'Zahra Aulia Rahman',
    affiliationOrPublisher: 'Fakultas Psikologi, Universitas Padjadjaran',
    advisors: ['Dr. Ratna Sari Dewi, M.Psi., Psikolog'],
    facultyOrGenre: 'Sastra & Humaniora',
    year: 2025,
    pages: 112,
    language: 'Indonesia',
    identifierLabel: 'NIM',
    identifierValue: '1901102100',
    abstract:
      'Skripsi ini membandingkan tingkat retensi argumen kompleks pada 96 mahasiswa ketika membaca esai ilmiah sepanjang 3.500 kata dalam mode baca tenang bebas distraksi versus tampilan umpan multi-tautan.',
    keywords: ['Psikologi Kognitif', 'Membaca Mendalam', 'Literasi Kritis', 'Fokus Membaca'],
    coverTone: 'forest',
    readCount: 1034,
    chapters: [
      {
        id: 'bab-1',
        label: '01 / KAJIAN TEORI',
        title: 'Ekonomi Perhatian dan Kedalaman Pemahaman',
        paragraphs: [
          'Kebiasaan memindai informasi secara cepat melalui gawai sering kali terbawa saat mahasiswa menghadapi naskah akademik yang menuntut perenungan bertahap.',
          'Hasil eksperimen menunjukkan bahwa ruang baca digital yang meniru ketenangan halaman buku—lebar kolom terukur, bebas notifikasi melayang, dan spasi baris lega—mampu menyamai skor pemahaman membaca cetak hingga 94%.'
        ]
      }
    ]
  },
  {
    id: 'ta-03',
    accessionNumber: 'TA.2025.0188',
    category: 'tugas-akhir',
    title: 'Sistem Monitoring Kualitas Udara dan Kelembapan Ruang Arsip Naskah Kuno Berbasis IoT',
    subtitle: 'Implementasi Sensor Hemat Daya dan Peringatan Dini Jamur pada Rak Koleksi Langka',
    author: 'Fajar Maulana Hakim',
    affiliationOrPublisher: 'Politeknik Elektronika Negeri Semarang',
    advisors: ['Ir. Teguh Prasetyo, M.T.'],
    facultyOrGenre: 'Teknologi Informasi & Aksesibilitas',
    year: 2025,
    pages: 78,
    language: 'Indonesia',
    identifierLabel: 'NIM',
    identifierValue: '3312201055',
    abstract:
      'Tugas akhir ini merancang simpul sensor nirkabel berdaya rendah untuk memantau suhu (18–22°C) dan kelembapan relatif (45–55%) di ruang penyimpanan manuskrip dan skripsi cetak langka agar terhindar dari pelapukan kertas.',
    keywords: ['Pelestarian Arsip', 'Sensor Lingkungan', 'IoT Perpustakaan', 'Konservasi Kertas'],
    coverTone: 'slate',
    readCount: 618,
    chapters: [
      {
        id: 'bab-1',
        label: '01 / RINGKASAN REKAYASA',
        title: 'Menjaga Umur Kertas di Iklim Lembap Tropis',
        paragraphs: [
          'Kelembapan udara di atas 65% mempercepat pertumbuhan spora jamur pada jilid kain dan kertas HVS lawas. Sistem pemantauan otomatis membantu pustakawan menstabilkan ruang arsip sebelum kerusakan terjadi.'
        ]
      }
    ]
  },
  {
    id: 'skripsi-04',
    accessionNumber: 'SKR.2023.0951',
    category: 'skripsi',
    title: 'Optimalisasi Rute Drainase Biopori dan Sumur Resapan di Kawasan Permukiman Padat',
    subtitle: 'Simulasi Hidrologi Perkotaan untuk Mitigasi Genangan Musiman di Wilayah Cekungan',
    author: 'Muhammad Iqbal Firdaus',
    affiliationOrPublisher: 'Fakultas Teknik Sipil dan Lingkungan, Institut Teknologi Mandiri',
    advisors: ['Dr. Eng. Agus Purnomo, S.T., M.T.'],
    facultyOrGenre: 'Sains & Lingkungan',
    year: 2023,
    pages: 146,
    language: 'Indonesia',
    identifierLabel: 'NIM',
    identifierValue: '15019063',
    abstract:
      'Penelitian ini memodelkan efektivitas jaringan lubang resapan biopori komunal dan taman hujan skala rukun warga dalam menurunkan puncak limpasan air hujan pada kawasan permukiman berkerapatan tinggi.',
    keywords: ['Hidrologi Kota', 'Sumur Resapan', 'Infrastruktur Hijau', 'Mitigasi Banjir'],
    coverTone: 'forest',
    readCount: 780,
    chapters: [
      {
        id: 'bab-1',
        label: '01 / ABSTRAK EKSEKUTIF',
        title: 'Infrastruktur Mikro Berbasis Partisipasi Warga',
        paragraphs: [
          'Peningkatan tutupan perkerasan di kota-kota besar menurunkan laju infiltrasi alami secara drastis. Pendekatan titik resapan terdesentralisasi di tiap gang terbukti memangkas genangan permukaan hingga 38% pada curah hujan intensitas sedang.'
        ]
      }
    ]
  },
  {
    id: 'ta-04',
    accessionNumber: 'TA.2024.0603',
    category: 'tugas-akhir',
    title: 'Pengembangan Aplikasi Katalog Digital Koperasi Buku Bekas dan Peminjaman Komunitas',
    subtitle: 'Integrasi Pemindaian ISBN Otomatis dan Jadwal Sirkulasi Antar-Anggota',
    author: 'Salsabila Khairunnisa',
    affiliationOrPublisher: 'Sekolah Vokasi Ilmu Informasi, Universitas Gadjah Mada',
    advisors: ['Haryo Baskoro, S.I.P., M.A.'],
    facultyOrGenre: 'Ilmu Komputer & Informatika',
    year: 2024,
    pages: 92,
    language: 'Indonesia',
    identifierLabel: 'NIM',
    identifierValue: '21/478210/SV/19340',
    abstract:
      'Tugas akhir ini menghadirkan perangkat lunak pencatatan sirkulasi ringan untuk komunitas baca dan perpustakaan kelurahan, sehingga pengelola relawan dapat mendata buku masuk hanya dengan memindai kode batang ISBN.',
    keywords: ['Otomasi Perpustakaan', 'Sirkulasi Buku', 'Perpustakaan Desa', 'ISBN'],
    coverTone: 'stone',
    readCount: 834,
    chapters: [
      {
        id: 'bab-1',
        label: '01 / LATAR BELAKANG',
        title: 'Memberdayakan Pengelola Taman Baca Relawan',
        paragraphs: [
          'Banyak perpustakaan komunitas berdiri atas swadaya warga, tetapi kesulitan menjaga data peminjaman tetap rapi karena pencatatan masih dilakukan di buku tulis terpisah. Antarmuka katalog yang sederhana memangkas waktu pendataan buku baru hingga 70%.'
        ]
      }
    ]
  },
  {
    id: 'buku-04',
    accessionNumber: 'BKU.2024.0725',
    category: 'buku',
    title: 'Senarai Literasi Terbuka: Panduan Menulis dan Membaca Kritis untuk Semua',
    subtitle: 'Dari Merangkum Gagasan Utama hingga Menyusun Referensi Ilmiah yang Jujur',
    author: 'Prof. Dr. Ratih Pramesti',
    affiliationOrPublisher: 'Yayasan Aksara Merdeka',
    facultyOrGenre: 'Ekonomi & Bisnis',
    year: 2024,
    pages: 216,
    language: 'Indonesia',
    identifierLabel: 'ISBN',
    identifierValue: '978-623-712-004-8',
    abstract:
      'Buku pegangan praktis bagi pelajar, mahasiswa penyusun skripsi, serta pembaca umum untuk membedah argumen bacaan, memverifikasi sumber rujukan, dan menulis ringkasan yang bernas serta bebas plagiarisme.',
    keywords: ['Penulisan Ilmiah', 'Etika Sitasi', 'Berpikir Kritis', 'Panduan Skripsi'],
    coverTone: 'lapis',
    readCount: 1742,
    chapters: [
      {
        id: 'bab-1',
        label: 'BAB I',
        title: 'Membaca sebagai Percakapan Lintas Generasi',
        paragraphs: [
          'Setiap kali kita mengutip gagasan seorang peneliti atau penulis buku, kita sesungguhnya sedang melanjutkan percakapan panjang mengenai cara memahami dunia.',
          'Bab ini memandu pembaca langkah demi langkah dalam memilah sumber primer, menyusun catatan bacaan pribadi, dan menuliskan daftar pustaka dengan rapi sesuai kaidah APA maupun IEEE.'
        ]
      },
      {
        id: 'bab-2',
        label: 'BAB II',
        title: 'Menyusun Pertanyaan Penelitian yang Jernih',
        paragraphs: [
          'Kesulitan terbesar mahasiswa tingkat akhir jarang terletak pada jumlah halaman, melainkan pada pertanyaan awal yang terlalu kabur. Buku ini menawarkan tiga kerangka perumusan masalah yang langsung dapat dipraktikkan.'
        ]
      }
    ]
  }
];

export const FACULTIES_AND_GENRES = [
  'Semua Bidang',
  'Ilmu Komputer & Informatika',
  'Teknologi Informasi & Aksesibilitas',
  'Arsitektur & Desain',
  'Ekonomi & Bisnis',
  'Sastra & Humaniora',
  'Sains & Lingkungan'
] as const;
