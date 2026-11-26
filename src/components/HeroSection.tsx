import {useState, RefObject} from 'react';
import {ArrowRight, Search, X} from 'lucide-react';
import {CollectionCategory} from '../types/library';

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  searchInputRef: RefObject<HTMLInputElement | null>;
  counts: {
    total: number;
    skripsi: number;
    tugasAkhir: number;
    buku: number;
  };
  onJumpToCategory: (category: CollectionCategory | 'all') => void;
}

export function HeroSection({
  searchQuery,
  onSearchChange,
  searchInputRef,
  counts,
  onJumpToCategory,
}: HeroSectionProps) {
  const [heroImageError, setHeroImageError] = useState(false);

  const handleSubmitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const el = document.getElementById('katalog');
    if (el) {
      el.scrollIntoView({behavior: 'smooth', block: 'start'});
    }
  };

  return (
    <section id="beranda" className="border-b border-stone-200 bg-[#FAF8F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12 lg:pt-14 lg:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <p className="text-xs uppercase tracking-widest text-stone-500 font-medium mb-4">
                Repositori Akademik &amp; Perpustakaan Terbuka
              </p>

              <h1
                className="font-serif font-semibold text-stone-900 tracking-tight leading-[1.12] max-w-2xl"
                style={{fontSize: 'clamp(2.25rem, 4vw, 3.5rem)', textWrap: 'balance'}}
              >
                Ruang Baca Terbuka untuk Skripsi, Tugas Akhir, dan Buku.
              </h1>

              <p className="mt-5 text-base sm:text-lg text-stone-600 leading-relaxed max-w-xl">
                Dirancang agar mudah digunakan oleh semua pengunjung—mahasiswa, peneliti, pelajar,
                maupun masyarakat umum. Cari referensi, baca dengan nyaman, dengarkan lewat audio,
                dan salin sitasi secara langsung tanpa perlu masuk akun.
              </p>

              <form onSubmit={handleSubmitSearch} className="mt-7 max-w-xl">
                <label htmlFor="hero-search" className="sr-only">
                  Cari judul, penulis, dosen pembimbing, atau topik koleksi
                </label>
                <div className="relative flex items-center bg-white border border-stone-300 rounded-xl shadow-xs focus-within:border-[#1E3A8A] focus-within:ring-2 focus-within:ring-[#1E3A8A]/15 transition-all">
                  <Search className="w-5 h-5 text-stone-400 ml-4 shrink-0" />
                  <input
                    ref={searchInputRef}
                    id="hero-search"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Cari judul, penulis, pembimbing, atau topik..."
                    className="w-full px-3.5 py-3.5 text-sm sm:text-base text-stone-900 placeholder:text-stone-400 bg-transparent focus:outline-none"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => onSearchChange('')}
                      aria-label="Hapus kata pencarian"
                      className="p-2 text-stone-400 hover:text-stone-700 mr-1 rounded-lg"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    type="submit"
                    className="mr-1.5 px-4 py-2.5 text-sm font-medium text-[#FAF8F3] bg-[#1E3A8A] hover:bg-[#172D6B] rounded-lg transition-colors whitespace-nowrap shrink-0 inline-flex items-center gap-1.5"
                  >
                    <span>Telusuri</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-stone-500">
                  <span>Topik populer:</span>
                  {['Arsitektur Tropis', 'Pencarian Semantik', 'UMKM', 'Aksesibilitas'].map(
                    (topic) => (
                      <button
                        key={topic}
                        type="button"
                        onClick={() => {
                          onSearchChange(topic);
                          document
                            .getElementById('katalog')
                            ?.scrollIntoView({behavior: 'smooth', block: 'start'});
                        }}
                        className="text-stone-700 hover:text-[#1E3A8A] underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
                      >
                        {topic}
                      </button>
                    )
                  )}
                </div>
              </form>
            </div>

            <div className="mt-8 pt-5 border-t border-stone-200 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-stone-600">
              <span>Akses Daring: 24 Jam Terbuka</span>
              <span aria-hidden="true" className="text-stone-300">
                ·
              </span>
              <span>Tanpa Wajib Daftar</span>
              <span aria-hidden="true" className="text-stone-300">
                ·
              </span>
              <span>Mendukung Audio Suara &amp; Sitasi Instan</span>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col">
            <figure className="flex-1 flex flex-col">
              <div className="relative flex-1 min-h-[260px] lg:min-h-[380px] rounded-xl overflow-hidden border border-stone-200 bg-stone-100">
                {!heroImageError ? (
                  <img
                    src="/src/assets/images/hero_library_reading_hall_1795677491343.jpg"
                    alt="Suasana ruang baca utama perpustakaan dengan rak kayu dan pencahayaan alami"
                    referrerPolicy="no-referrer"
                    onError={() => setHeroImageError(true)}
                    className="w-full h-full lg:h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-stone-200/70 text-stone-600 text-center">
                    <p className="font-serif text-xl text-stone-800">Ruang Baca Pustaka Aksara</p>
                    <p className="text-sm mt-2 max-w-xs">
                      Koleksi terbuka skripsi, tugas akhir, dan buku bacaan untuk semua pengunjung.
                    </p>
                  </div>
                )}
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-stone-950/60 via-stone-950/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-3.5 left-4 right-4 text-xs text-stone-100 flex items-center justify-between gap-2">
                  <span className="font-medium">Koleksi Terbuka Lintas Disiplin</span>
                  <span className="font-mono tabular-nums opacity-90">EDISI 2026</span>
                </div>
              </div>
              <figcaption className="mt-2.5 text-xs font-serif italic text-stone-500">
                Fig. 1 — Ruang baca terbuka yang menghimpun naskah akademik dan buku bacaan umum.
              </figcaption>
            </figure>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 border border-stone-200 rounded-xl bg-white divide-y lg:divide-y-0 lg:divide-x divide-stone-200 overflow-hidden">
          <button
            type="button"
            onClick={() => onJumpToCategory('all')}
            className="p-5 text-left hover:bg-stone-50 transition-colors flex flex-col justify-between gap-1"
          >
            <span className="text-xs text-stone-500 uppercase tracking-wider">Seluruh Katalog</span>
            <span className="font-serif text-2xl sm:text-3xl font-semibold text-stone-900 tabular-nums">
              {counts.total} Koleksi
            </span>
            <span className="text-xs text-[#1E3A8A] font-medium">Lihat semua arsip</span>
          </button>

          <button
            type="button"
            onClick={() => onJumpToCategory('skripsi')}
            className="p-5 text-left hover:bg-stone-50 transition-colors flex flex-col justify-between gap-1 border-l border-stone-200 lg:border-l-0"
          >
            <span className="text-xs text-stone-500 uppercase tracking-wider">Skripsi Sarjana</span>
            <span className="font-serif text-2xl sm:text-3xl font-semibold text-stone-900 tabular-nums">
              {counts.skripsi} Naskah
            </span>
            <span className="text-xs text-stone-600">Penelitian S1 teruji</span>
          </button>

          <button
            type="button"
            onClick={() => onJumpToCategory('tugas-akhir')}
            className="p-5 text-left hover:bg-stone-50 transition-colors flex flex-col justify-between gap-1"
          >
            <span className="text-xs text-stone-500 uppercase tracking-wider">Tugas Akhir</span>
            <span className="font-serif text-2xl sm:text-3xl font-semibold text-stone-900 tabular-nums">
              {counts.tugasAkhir} Karya
            </span>
            <span className="text-xs text-stone-600">Rancang bangun D3 &amp; D4</span>
          </button>

          <button
            type="button"
            onClick={() => onJumpToCategory('buku')}
            className="p-5 text-left hover:bg-stone-50 transition-colors flex flex-col justify-between gap-1 border-l border-stone-200 lg:border-l-0"
          >
            <span className="text-xs text-stone-500 uppercase tracking-wider">Buku Bacaan</span>
            <span className="font-serif text-2xl sm:text-3xl font-semibold text-stone-900 tabular-nums">
              {counts.buku} Judul
            </span>
            <span className="text-xs text-stone-600">Sains, sastra &amp; panduan</span>
          </button>
        </div>
      </div>
    </section>
  );
}
