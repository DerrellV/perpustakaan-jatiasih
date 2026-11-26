import {useState} from 'react';
import {
  Bookmark,
  BookOpen,
  Check,
  LayoutGrid,
  List,
  Plus,
  Quote,
  RotateCcw,
  Search,
} from 'lucide-react';
import {FACULTIES_AND_GENRES} from '../data/catalogData';
import {
  CatalogItem,
  CollectionCategory,
  SortOption,
  ViewMode,
} from '../types/library';
import {generateCitations, getCategoryLabel} from '../utils/citations';
import {CoverGraphic} from './CoverGraphic';

interface CatalogExplorerProps {
  items: CatalogItem[];
  selectedCategory: CollectionCategory | 'all';
  onCategoryChange: (category: CollectionCategory | 'all') => void;
  selectedFaculty: string;
  onFacultyChange: (faculty: string) => void;
  selectedYear: string;
  onYearChange: (year: string) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  savedIds: string[];
  onOpenItem: (item: CatalogItem) => void;
  onToggleSave: (id: string) => void;
  onOpenContribute: () => void;
  onResetFilters: () => void;
  availableYears: number[];
}

export function CatalogExplorer({
  items,
  selectedCategory,
  onCategoryChange,
  selectedFaculty,
  onFacultyChange,
  selectedYear,
  onYearChange,
  sortBy,
  onSortChange,
  searchQuery,
  onSearchChange,
  savedIds,
  onOpenItem,
  onToggleSave,
  onOpenContribute,
  onResetFilters,
  availableYears,
}: CatalogExplorerProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleQuickCopyCitation = async (item: CatalogItem) => {
    const {apa} = generateCitations(item);
    try {
      await navigator.clipboard.writeText(apa);
      setCopiedId(item.id);
      setTimeout(() => {
        setCopiedId((prev) => (prev === item.id ? null : prev));
      }, 2000);
    } catch {
      onOpenItem(item);
    }
  };

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    selectedFaculty !== 'Semua Bidang' ||
    selectedYear !== 'all' ||
    searchQuery.trim().length > 0;

  return (
    <section id="katalog" className="py-12 lg:py-16 bg-[#FAF8F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-stone-200">
          <div>
            <p className="text-xs uppercase tracking-widest text-stone-500 font-medium">
              Katalog Induk Perpustakaan
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-stone-900 mt-1.5">
              Jelajahi Skripsi, Tugas Akhir &amp; Buku Bacaan
            </h2>
          </div>

          <button
            type="button"
            onClick={onOpenContribute}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-stone-900 bg-white border border-stone-300 hover:border-stone-400 hover:bg-stone-50 rounded-lg transition-colors whitespace-nowrap shrink-0 min-h-[42px]"
          >
            <Plus className="w-4 h-4 shrink-0" />
            <span>Ajukan Karya ke Katalog</span>
          </button>
        </div>

        <div className="mt-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div
            role="tablist"
            aria-label="Filter kategori koleksi"
            className="inline-flex flex-wrap items-center gap-1 p-1 bg-[#EBE6DC] rounded-lg w-full lg:w-auto"
          >
            {(
              [
                {key: 'all', label: 'Semua Koleksi'},
                {key: 'skripsi', label: 'Skripsi (S1)'},
                {key: 'tugas-akhir', label: 'Tugas Akhir (D3/D4)'},
                {key: 'buku', label: 'Buku Bacaan'},
              ] as const
            ).map((tab) => {
              const active = selectedCategory === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => onCategoryChange(tab.key)}
                  className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap shrink-0 min-h-[38px] ${
                    active
                      ? 'bg-white text-stone-900 shadow-xs'
                      : 'text-stone-700 hover:text-stone-900'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <div className="relative flex-1 sm:flex-initial min-w-[190px]">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                aria-label="Saring kata kunci di katalog"
                placeholder="Saring cepat..."
                className="w-full pl-9 pr-3 py-2 text-sm bg-white border border-stone-300 rounded-lg text-stone-900 placeholder:text-stone-400 focus:border-[#1E3A8A] focus:outline-none min-h-[40px]"
              />
            </div>

            <select
              aria-label="Pilih bidang ilmu atau genre"
              value={selectedFaculty}
              onChange={(e) => onFacultyChange(e.target.value)}
              className="px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg text-stone-800 focus:border-[#1E3A8A] focus:outline-none min-h-[40px]"
            >
              {FACULTIES_AND_GENRES.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>

            <select
              aria-label="Pilih tahun terbit"
              value={selectedYear}
              onChange={(e) => onYearChange(e.target.value)}
              className="px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg text-stone-800 tabular-nums focus:border-[#1E3A8A] focus:outline-none min-h-[40px]"
            >
              <option value="all">Semua Tahun</option>
              {availableYears.map((yr) => (
                <option key={yr} value={String(yr)}>
                  Tahun {yr}
                </option>
              ))}
            </select>

            <select
              aria-label="Urutkan hasil katalog"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg text-stone-800 focus:border-[#1E3A8A] focus:outline-none min-h-[40px]"
            >
              <option value="newest">Terbaru</option>
              <option value="popular">Paling Banyak Dibaca</option>
              <option value="title">Judul A–Z</option>
            </select>

            <div className="inline-flex items-center p-1 bg-[#EBE6DC] rounded-lg shrink-0">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                aria-label="Tampilan kartu"
                aria-pressed={viewMode === 'grid'}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('table')}
                aria-label="Tampilan daftar tabel"
                aria-pressed={viewMode === 'table'}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'table'
                    ? 'bg-white text-stone-900 shadow-xs'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-600">
          <p className="tabular-nums">
            Menampilkan <span className="font-semibold text-stone-900">{items.length}</span> koleksi
            terbuka
            {searchQuery.trim() ? ` untuk kata kunci "${searchQuery.trim()}"` : ''}
          </p>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={onResetFilters}
              className="inline-flex items-center gap-1.5 text-stone-700 hover:text-[#1E3A8A] font-medium whitespace-nowrap shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Atur Ulang Filter</span>
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="mt-8 bg-white border border-stone-200 rounded-xl p-10 text-center">
            <p className="font-serif text-xl font-semibold text-stone-900">
              Belum ada koleksi yang sesuai dengan pencarian Anda
            </p>
            <p className="text-sm text-stone-600 mt-2 max-w-md mx-auto">
              Coba gunakan kata kunci yang lebih umum, ubah pilihan bidang ilmu, atau atur ulang
              seluruh filter katalog.
            </p>
            <button
              type="button"
              onClick={onResetFilters}
              className="mt-5 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#FAF8F3] bg-[#1E3A8A] hover:bg-[#172D6B] rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Tampilkan Semua Koleksi</span>
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => {
              const isSaved = savedIds.includes(item.id);
              const isCopied = copiedId === item.id;
              return (
                <article
                  key={item.id}
                  className="bg-white border border-stone-200 rounded-xl p-5 flex flex-col justify-between group hover:border-stone-300 transition-colors"
                >
                  <div>
                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => onOpenItem(item)}
                        className="w-24 shrink-0 text-left focus-visible:outline-2"
                        aria-label={`Buka ${item.title}`}
                      >
                        <CoverGraphic
                          item={item}
                          className="w-full aspect-[3/4] rounded-lg border border-stone-200"
                        />
                      </button>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-xs text-stone-500">
                          <span className="font-semibold text-[#1E3A8A]">
                            {getCategoryLabel(item.category)}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span className="tabular-nums">{item.year}</span>
                          <span aria-hidden="true">·</span>
                          <span className="tabular-nums">{item.pages} hlm</span>
                        </div>

                        <h3 className="font-serif text-lg font-semibold text-stone-900 mt-1.5 leading-snug line-clamp-3">
                          <button
                            type="button"
                            onClick={() => onOpenItem(item)}
                            className="text-left hover:text-[#1E3A8A] transition-colors"
                          >
                            {item.title}
                          </button>
                        </h3>

                        <p className="text-xs text-stone-700 font-medium mt-2 truncate">
                          {item.author}
                        </p>
                        <p className="text-xs text-stone-500 truncate">{item.facultyOrGenre}</p>
                      </div>
                    </div>

                    <p className="mt-4 text-sm text-stone-600 leading-relaxed line-clamp-3">
                      {item.abstract}
                    </p>

                    <div className="mt-3 text-xs text-stone-500 flex items-center justify-between gap-2">
                      <span className="font-mono tabular-nums truncate">{item.accessionNumber}</span>
                      <span className="tabular-nums shrink-0">
                        {item.readCount.toLocaleString('id-ID')} kali dibaca
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 pt-4 border-t border-stone-200 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => onOpenItem(item)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-medium text-[#FAF8F3] bg-[#1E3A8A] hover:bg-[#172D6B] rounded-lg transition-colors whitespace-nowrap shrink-0 min-h-[38px]"
                    >
                      <BookOpen className="w-3.5 h-3.5 shrink-0" />
                      <span>Baca</span>
                    </button>

                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => handleQuickCopyCitation(item)}
                        title="Salin sitasi format APA"
                        className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-stone-700 hover:text-stone-900 hover:bg-stone-100 rounded-lg border border-stone-200 transition-colors whitespace-nowrap shrink-0 min-h-[38px]"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                            <span className="text-emerald-800">Tersalin</span>
                          </>
                        ) : (
                          <>
                            <Quote className="w-3.5 h-3.5 shrink-0" />
                            <span>Kutip</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => onToggleSave(item.id)}
                        aria-label={isSaved ? 'Hapus dari rak bacaan' : 'Simpan ke rak bacaan'}
                        className={`inline-flex items-center justify-center w-9 h-9 rounded-lg border transition-colors shrink-0 ${
                          isSaved
                            ? 'border-[#1E3A8A] text-[#1E3A8A] bg-[#1E3A8A]/5'
                            : 'border-stone-200 text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                        }`}
                      >
                        <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="mt-6 bg-white border border-stone-200 rounded-xl overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-stone-200 bg-stone-50/70 text-xs uppercase tracking-wider text-stone-500">
                  <th className="py-3.5 px-4 font-medium">No. Induk</th>
                  <th className="py-3.5 px-4 font-medium">Kategori</th>
                  <th className="py-3.5 px-4 font-medium">Judul &amp; Penulis</th>
                  <th className="py-3.5 px-4 font-medium">Bidang</th>
                  <th className="py-3.5 px-4 font-medium text-right">Tahun</th>
                  <th className="py-3.5 px-4 font-medium text-right">Halaman</th>
                  <th className="py-3.5 px-4 font-medium text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 text-sm">
                {items.map((item) => {
                  const isSaved = savedIds.includes(item.id);
                  return (
                    <tr key={item.id} className="hover:bg-stone-50/70 transition-colors">
                      <td className="py-3.5 px-4 font-mono text-xs text-stone-600 tabular-nums whitespace-nowrap">
                        {item.accessionNumber}
                      </td>
                      <td className="py-3.5 px-4 text-xs font-medium text-[#1E3A8A] whitespace-nowrap">
                        {getCategoryLabel(item.category)}
                      </td>
                      <td className="py-3.5 px-4 min-w-[260px]">
                        <button
                          type="button"
                          onClick={() => onOpenItem(item)}
                          className="font-serif font-semibold text-stone-900 hover:text-[#1E3A8A] text-left leading-snug"
                        >
                          {item.title}
                        </button>
                        <div className="text-xs text-stone-500 mt-0.5">
                          {item.author} · {item.affiliationOrPublisher}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-xs text-stone-600 whitespace-nowrap">
                        {item.facultyOrGenre}
                      </td>
                      <td className="py-3.5 px-4 text-xs text-stone-700 text-right tabular-nums whitespace-nowrap">
                        {item.year}
                      </td>
                      <td className="py-3.5 px-4 text-xs text-stone-700 text-right tabular-nums whitespace-nowrap">
                        {item.pages} hlm
                      </td>
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => onOpenItem(item)}
                            className="px-3 py-1.5 text-xs font-medium text-[#FAF8F3] bg-[#1E3A8A] hover:bg-[#172D6B] rounded-md transition-colors"
                          >
                            Baca
                          </button>
                          <button
                            type="button"
                            onClick={() => onToggleSave(item.id)}
                            className={`px-2.5 py-1.5 text-xs font-medium rounded-md border transition-colors ${
                              isSaved
                                ? 'border-[#1E3A8A] text-[#1E3A8A] bg-[#1E3A8A]/5'
                                : 'border-stone-300 text-stone-700 hover:bg-stone-100'
                            }`}
                          >
                            {isSaved ? 'Tersimpan' : 'Simpan'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
