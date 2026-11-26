import {Bookmark, BookOpen} from 'lucide-react';
import {CatalogItem} from '../types/library';
import {getCategoryLabel} from '../utils/citations';
import {CoverGraphic} from './CoverGraphic';

interface FeaturedCuratorialSectionProps {
  items: CatalogItem[];
  savedIds: string[];
  onOpenItem: (item: CatalogItem) => void;
  onToggleSave: (id: string) => void;
}

export function FeaturedCuratorialSection({
  items,
  savedIds,
  onOpenItem,
  onToggleSave,
}: FeaturedCuratorialSectionProps) {
  const featured = items.filter((item) => item.featured).slice(0, 3);
  if (featured.length === 0) return null;

  const [leadItem, ...secondaryItems] = featured;
  const leadSaved = savedIds.includes(leadItem.id);

  return (
    <section className="py-12 lg:py-16 border-b border-stone-200 bg-[#FAF8F3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs uppercase tracking-widest text-stone-500 font-medium">
              Pilihan Kuratorial Bulan Ini
            </p>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-stone-900 mt-1.5">
              Sorotan Koleksi Lintas Kategori
            </h2>
          </div>
          <p className="text-sm text-stone-600 max-w-md">
            Kurasi naskah skripsi, karya tugas akhir vokasi, dan buku bacaan populer yang paling
            sering dirujuk pengunjung.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          <article className="lg:col-span-7 bg-white border border-stone-200 rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row gap-6 group">
            <div className="w-full sm:w-48 md:w-52 shrink-0">
              <CoverGraphic
                item={leadItem}
                className="w-full aspect-[3/4] rounded-lg border border-stone-200"
              />
            </div>

            <div className="flex flex-col justify-between flex-1 min-w-0">
              <div>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-stone-500">
                  <span className="font-mono tabular-nums text-stone-600">
                    {leadItem.accessionNumber}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="font-medium text-[#1E3A8A]">
                    {getCategoryLabel(leadItem.category)}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="tabular-nums">{leadItem.year}</span>
                  <span aria-hidden="true">·</span>
                  <span className="tabular-nums">{leadItem.pages} hlm</span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-semibold text-stone-900 mt-3 leading-snug">
                  <button
                    type="button"
                    onClick={() => onOpenItem(leadItem)}
                    className="text-left hover:text-[#1E3A8A] transition-colors"
                  >
                    {leadItem.title}
                  </button>
                </h3>

                <p className="text-sm text-stone-600 mt-2">
                  Oleh <span className="font-medium text-stone-800">{leadItem.author}</span>
                  {leadItem.affiliationOrPublisher ? ` — ${leadItem.affiliationOrPublisher}` : ''}
                </p>

                <p className="text-sm text-stone-600 leading-relaxed mt-4 line-clamp-4">
                  {leadItem.abstract}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-200 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => onOpenItem(leadItem)}
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#FAF8F3] bg-[#1E3A8A] hover:bg-[#172D6B] rounded-lg transition-colors whitespace-nowrap shrink-0 min-h-[40px]"
                >
                  <BookOpen className="w-4 h-4 shrink-0" />
                  <span>Baca Naskah</span>
                </button>
                <button
                  type="button"
                  onClick={() => onToggleSave(leadItem.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 min-h-[40px] ${
                    leadSaved
                      ? 'border-[#1E3A8A] text-[#1E3A8A] bg-[#1E3A8A]/5'
                      : 'border-stone-300 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <Bookmark className={`w-4 h-4 shrink-0 ${leadSaved ? 'fill-current' : ''}`} />
                  <span>{leadSaved ? 'Tersimpan di Rak' : 'Simpan ke Rak'}</span>
                </button>
              </div>
            </div>
          </article>

          <div className="lg:col-span-5 flex flex-col gap-6">
            {secondaryItems.map((item) => {
              const isSaved = savedIds.includes(item.id);
              return (
                <article
                  key={item.id}
                  className="flex-1 bg-white border border-stone-200 rounded-xl p-5 sm:p-6 flex gap-4 sm:gap-5 group"
                >
                  <div className="w-24 sm:w-28 shrink-0">
                    <CoverGraphic
                      item={item}
                      className="w-full aspect-[3/4] rounded-lg border border-stone-200"
                    />
                  </div>
                  <div className="flex flex-col justify-between flex-1 min-w-0">
                    <div>
                      <div className="flex flex-wrap items-center gap-x-2 text-xs text-stone-500">
                        <span className="font-medium text-[#1E3A8A]">
                          {getCategoryLabel(item.category)}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{item.facultyOrGenre}</span>
                        <span aria-hidden="true">·</span>
                        <span className="tabular-nums">{item.year}</span>
                      </div>
                      <h3 className="font-serif text-lg font-semibold text-stone-900 mt-1.5 leading-snug line-clamp-2">
                        <button
                          type="button"
                          onClick={() => onOpenItem(item)}
                          className="text-left hover:text-[#1E3A8A] transition-colors"
                        >
                          {item.title}
                        </button>
                      </h3>
                      <p className="text-xs text-stone-600 mt-1.5 truncate">
                        {item.author} · {item.affiliationOrPublisher}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => onOpenItem(item)}
                        className="text-xs font-semibold text-[#1E3A8A] hover:underline underline-offset-4 whitespace-nowrap shrink-0 py-1.5"
                      >
                        Baca Selengkapnya
                      </button>
                      <span aria-hidden="true" className="text-stone-300">
                        ·
                      </span>
                      <button
                        type="button"
                        onClick={() => onToggleSave(item.id)}
                        className="text-xs font-medium text-stone-600 hover:text-stone-900 whitespace-nowrap shrink-0 py-1.5"
                      >
                        {isSaved ? 'Tersimpan' : 'Simpan'}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
