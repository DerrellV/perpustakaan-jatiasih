import {useEffect} from 'react';
import {BookOpen, Download, Trash2, X} from 'lucide-react';
import {CatalogItem, VisitorNote} from '../types/library';
import {downloadSummaryFile, getCategoryLabel} from '../utils/citations';
import {CoverGraphic} from './CoverGraphic';

interface ReadingShelfDrawerProps {
  open: boolean;
  savedItems: CatalogItem[];
  notesById: Record<string, VisitorNote>;
  onOpenItem: (item: CatalogItem) => void;
  onRemoveSaved: (id: string) => void;
  onClose: () => void;
}

export function ReadingShelfDrawer({
  open,
  savedItems,
  notesById,
  onOpenItem,
  onRemoveSaved,
  onClose,
}: ReadingShelfDrawerProps) {
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="fixed inset-0 bg-stone-950/40 backdrop-blur-[1px]"
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Rak Bacaan Pengunjung"
        className="relative z-10 w-full max-w-md bg-[#FAF8F3] border-l border-stone-200 h-full flex flex-col shadow-xl"
      >
        <div className="px-6 py-5 border-b border-stone-200 flex items-center justify-between gap-4 bg-white">
          <div>
            <p className="text-xs uppercase tracking-widest text-stone-500">
              Daftar Simpan Pengunjung
            </p>
            <h2 className="font-serif text-xl font-semibold text-stone-900 mt-0.5 tabular-nums">
              Rak Bacaan ({savedItems.length})
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup rak bacaan"
            className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-stone-300 text-stone-700 hover:bg-stone-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {savedItems.length === 0 ? (
            <div className="bg-white border border-stone-200 rounded-xl p-8 text-center">
              <p className="font-serif text-lg font-semibold text-stone-900">
                Rak bacaan Anda masih kosong
              </p>
              <p className="text-sm text-stone-600 mt-2 leading-relaxed">
                Tekan tombol simpan pada skripsi, tugas akhir, atau buku bacaan mana pun untuk
                mengumpulkannya di sini tanpa perlu mendaftar akun.
              </p>
            </div>
          ) : (
            savedItems.map((item) => {
              const note = notesById[item.id]?.content;
              return (
                <article
                  key={item.id}
                  className="bg-white border border-stone-200 rounded-xl p-4 flex gap-4"
                >
                  <div className="w-16 shrink-0">
                    <CoverGraphic
                      item={item}
                      className="w-full aspect-[3/4] rounded-md border border-stone-200"
                    />
                  </div>
                  <div className="min-w-0 flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-[11px] text-stone-500">
                        <span className="font-medium text-[#1E3A8A]">
                          {getCategoryLabel(item.category)}
                        </span>{' '}
                        · <span className="tabular-nums">{item.year}</span>
                      </p>
                      <h3 className="font-serif text-base font-semibold text-stone-900 mt-1 leading-snug line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-xs text-stone-600 mt-1 truncate">{item.author}</p>
                      {note && note.trim().length > 0 && (
                        <p className="text-xs text-stone-500 italic mt-1.5 line-clamp-1">
                          Catatan: {note}
                        </p>
                      )}
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onOpenItem(item);
                        }}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1E3A8A] hover:underline underline-offset-4 py-1"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Lanjutkan Baca</span>
                      </button>

                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => downloadSummaryFile(item, note)}
                          aria-label={`Unduh ringkasan ${item.title}`}
                          className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onRemoveSaved(item.id)}
                          aria-label={`Hapus ${item.title} dari rak`}
                          className="p-2 text-stone-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })
          )}
        </div>
      </aside>
    </div>
  );
}
