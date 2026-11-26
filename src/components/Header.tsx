import {useState} from 'react';
import {Bookmark, Menu, X} from 'lucide-react';
import {CollectionCategory} from '../types/library';

interface HeaderProps {
  savedCount: number;
  onSelectCategory: (category: CollectionCategory | 'all') => void;
  onOpenShelf: () => void;
}

export function Header({savedCount, onSelectCategory, onOpenShelf}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (category: CollectionCategory | 'all', targetId: string) => {
    setMobileMenuOpen(false);
    if (category === 'all' && targetId === 'beranda') {
      window.scrollTo({top: 0, behavior: 'smooth'});
      return;
    }
    onSelectCategory(category);
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({behavior: 'smooth', block: 'start'});
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F3]/95 backdrop-blur-sm border-b border-stone-200/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        <a
          href="#beranda"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('all', 'beranda');
          }}
          className="font-serif text-xl font-semibold tracking-tight text-stone-900 whitespace-nowrap shrink-0"
        >
          Pustaka Aksara
        </a>

        <nav
          aria-label="Navigasi utama"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600"
        >
          <a
            href="#beranda"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('all', 'beranda');
            }}
            className="hover:text-stone-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Beranda
          </a>
          <a
            href="#katalog"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('skripsi', 'katalog');
            }}
            className="hover:text-stone-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Skripsi
          </a>
          <a
            href="#katalog"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('tugas-akhir', 'katalog');
            }}
            className="hover:text-stone-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Tugas Akhir
          </a>
          <a
            href="#katalog"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('buku', 'katalog');
            }}
            className="hover:text-stone-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 py-1"
          >
            Buku Bacaan
          </a>
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenShelf}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#FAF8F3] bg-[#1E3A8A] hover:bg-[#172D6B] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 min-h-[40px]"
          >
            <Bookmark className="w-4 h-4 shrink-0" />
            <span className="tabular-nums">
              {savedCount > 0 ? `Rak Bacaan (${savedCount})` : 'Rak Bacaan'}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
            aria-expanded={mobileMenuOpen}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-stone-300 text-stone-700 hover:bg-stone-100 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav
          aria-label="Navigasi seluler"
          className="md:hidden border-t border-stone-200 bg-[#FAF8F3] px-4 py-3 flex flex-col gap-1"
        >
          <button
            type="button"
            onClick={() => handleNavClick('all', 'beranda')}
            className="text-left px-3 py-2.5 text-sm font-medium text-stone-800 hover:bg-stone-200/60 rounded-lg min-h-[44px]"
          >
            Beranda
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('skripsi', 'katalog')}
            className="text-left px-3 py-2.5 text-sm font-medium text-stone-800 hover:bg-stone-200/60 rounded-lg min-h-[44px]"
          >
            Koleksi Skripsi (S1)
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('tugas-akhir', 'katalog')}
            className="text-left px-3 py-2.5 text-sm font-medium text-stone-800 hover:bg-stone-200/60 rounded-lg min-h-[44px]"
          >
            Tugas Akhir Vokasi (D3/D4)
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('buku', 'katalog')}
            className="text-left px-3 py-2.5 text-sm font-medium text-stone-800 hover:bg-stone-200/60 rounded-lg min-h-[44px]"
          >
            Buku Bacaan Umum
          </button>
        </nav>
      )}
    </header>
  );
}
