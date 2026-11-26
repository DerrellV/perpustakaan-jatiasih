import {CollectionCategory} from '../types/library';

interface FooterProps {
  onSelectCategory: (category: CollectionCategory | 'all') => void;
  onOpenShelf: () => void;
  onOpenContribute: () => void;
}

export function Footer({onSelectCategory, onOpenShelf, onOpenContribute}: FooterProps) {
  const jumpTo = (category: CollectionCategory | 'all') => {
    onSelectCategory(category);
    document.getElementById('katalog')?.scrollIntoView({behavior: 'smooth', block: 'start'});
  };

  return (
    <footer className="border-t border-stone-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-5">
            <p className="font-serif text-xl font-semibold text-stone-900">Pustaka Aksara</p>
            <p className="text-sm text-stone-600 mt-3 leading-relaxed max-w-sm">
              Perpustakaan digital terbuka dan repositori karya ilmiah yang menghimpun skripsi,
              tugas akhir vokasi, dan buku bacaan untuk diakses siapa saja secara setara.
            </p>
            <p className="text-xs text-stone-500 mt-4">
              Pintasan cepat: Tekan tombol <kbd className="font-mono px-1.5 py-0.5 bg-stone-100 border border-stone-300 rounded">/</kbd> di papan ketik untuk langsung mencari koleksi.
            </p>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-xs uppercase tracking-widest font-semibold text-stone-500 mb-3">
              Kategori Koleksi
            </h3>
            <ul className="space-y-2 text-sm text-stone-700">
              <li>
                <button
                  type="button"
                  onClick={() => jumpTo('all')}
                  className="hover:text-[#1E3A8A] hover:underline underline-offset-4"
                >
                  Semua Koleksi
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => jumpTo('skripsi')}
                  className="hover:text-[#1E3A8A] hover:underline underline-offset-4"
                >
                  Skripsi Sarjana (S1)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => jumpTo('tugas-akhir')}
                  className="hover:text-[#1E3A8A] hover:underline underline-offset-4"
                >
                  Tugas Akhir Vokasi (D3/D4)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => jumpTo('buku')}
                  className="hover:text-[#1E3A8A] hover:underline underline-offset-4"
                >
                  Buku Bacaan Umum
                </button>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h3 className="text-xs uppercase tracking-widest font-semibold text-stone-500 mb-3">
              Layanan Pengunjung
            </h3>
            <ul className="space-y-2 text-sm text-stone-700">
              <li>
                <button
                  type="button"
                  onClick={onOpenShelf}
                  className="hover:text-[#1E3A8A] hover:underline underline-offset-4"
                >
                  Buka Rak Bacaan Saya
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenContribute}
                  className="hover:text-[#1E3A8A] hover:underline underline-offset-4"
                >
                  Ajukan Karya ke Repositori
                </button>
              </li>
              <li className="text-stone-500 text-xs pt-2 leading-relaxed">
                Seluruh koleksi mendukung pengaturan ukuran huruf, tema kertas/sepia/malam,
                pembacaan suara, catatan pribadi, serta sitasi otomatis APA, IEEE, dan BibTeX.
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-stone-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs text-stone-500">
          <p>© 2026 Pustaka Aksara. Terbuka untuk seluruh pengunjung.</p>
          <p>Akses Katalog Publik · Tanpa Biaya · Tanpa Batas Masuk</p>
        </div>
      </div>
    </footer>
  );
}
