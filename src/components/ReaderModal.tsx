import {useEffect, useMemo, useRef, useState} from 'react';
import {
  Bookmark,
  Check,
  Copy,
  Download,
  Pause,
  Volume2,
  X,
} from 'lucide-react';
import {CatalogItem, FontScale, ReadingTheme} from '../types/library';
import {
  downloadSummaryFile,
  generateCitations,
  getCategoryDegreeHint,
} from '../utils/citations';
import {CoverGraphic} from './CoverGraphic';

interface ReaderModalProps {
  item: CatalogItem | null;
  isSaved: boolean;
  noteValue: string;
  onSaveNote: (itemId: string, content: string) => void;
  onToggleSave: (id: string) => void;
  onClose: () => void;
}

const THEME_STYLES: Record<
  ReadingTheme,
  {
    shell: string;
    header: string;
    card: string;
    border: string;
    textPrimary: string;
    textSecondary: string;
    textMuted: string;
    buttonIdle: string;
  }
> = {
  paper: {
    shell: 'bg-[#FAF8F3] text-stone-900',
    header: 'bg-[#FAF8F3]/95 border-stone-200',
    card: 'bg-white border-stone-200',
    border: 'border-stone-200',
    textPrimary: 'text-stone-900',
    textSecondary: 'text-stone-700',
    textMuted: 'text-stone-500',
    buttonIdle: 'border-stone-300 text-stone-700 hover:bg-stone-100',
  },
  sepia: {
    shell: 'bg-[#F3ECD9] text-[#2C2217]',
    header: 'bg-[#F3ECD9]/95 border-[#DFD5BC]',
    card: 'bg-[#F8F3E6] border-[#DFD5BC]',
    border: 'border-[#DFD5BC]',
    textPrimary: 'text-[#2C2217]',
    textSecondary: 'text-[#4A3B2A]',
    textMuted: 'text-[#6E5C47]',
    buttonIdle: 'border-[#D1C4A5] text-[#4A3B2A] hover:bg-[#EAE0C8]',
  },
  night: {
    shell: 'bg-[#17191C] text-stone-100',
    header: 'bg-[#17191C]/95 border-stone-800',
    card: 'bg-[#1F2227] border-stone-800',
    border: 'border-stone-800',
    textPrimary: 'text-stone-100',
    textSecondary: 'text-stone-300',
    textMuted: 'text-stone-400',
    buttonIdle: 'border-stone-700 text-stone-300 hover:bg-stone-800',
  },
};

const FONT_SIZE_CLASSES: Record<FontScale, string> = {
  sm: 'text-[15px] leading-[1.75]',
  md: 'text-[17px] leading-[1.82]',
  lg: 'text-[19px] leading-[1.85]',
};

export function ReaderModal({
  item,
  isSaved,
  noteValue,
  onSaveNote,
  onToggleSave,
  onClose,
}: ReaderModalProps) {
  const [theme, setTheme] = useState<ReadingTheme>('paper');
  const [fontScale, setFontScale] = useState<FontScale>('md');
  const [activeChapterIdx, setActiveChapterIdx] = useState(0);
  const [citationFormat, setCitationFormat] = useState<'apa' | 'ieee' | 'bibtex'>('apa');
  const [copiedCitation, setCopiedCitation] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setSpeechSupported(typeof window !== 'undefined' && 'speechSynthesis' in window);
  }, []);

  useEffect(() => {
    setActiveChapterIdx(0);
    setScrollProgress(0);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  }, [item?.id]);

  useEffect(() => {
    if (!item) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [item, onClose]);

  const citations = useMemo(() => (item ? generateCitations(item) : null), [item]);

  if (!item || !citations) return null;

  const activeChapter = item.chapters[activeChapterIdx] || item.chapters[0];
  const s = THEME_STYLES[theme];

  const handleToggleSpeech = () => {
    if (!speechSupported) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const textToRead = [
      item.title,
      activeChapter ? `${activeChapter.title}. ${activeChapter.paragraphs.join(' ')}` : item.abstract,
    ].join('. ');

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = 'id-ID';
    utterance.rate = 0.96;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handleCopyCitation = async () => {
    const text = citations[citationFormat];
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCitation(true);
      setTimeout(() => setCopiedCitation(false), 2000);
    } catch {
      setCopiedCitation(false);
    }
  };

  const handleScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const maxScroll = el.scrollHeight - el.clientHeight;
    if (maxScroll <= 0) {
      setScrollProgress(100);
      return;
    }
    setScrollProgress(Math.min(100, Math.round((el.scrollTop / maxScroll) * 100)));
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="reader-modal-title"
      className={`fixed inset-0 z-50 flex flex-col ${s.shell} transition-colors duration-150`}
    >
      <div className={`sticky top-0 z-10 border-b ${s.header} backdrop-blur-sm`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="min-w-0 flex items-center gap-3">
            <span className={`font-mono text-xs tabular-nums hidden sm:inline ${s.textMuted}`}>
              {item.accessionNumber}
            </span>
            <span aria-hidden="true" className={`hidden sm:inline ${s.textMuted}`}>
              ·
            </span>
            <p className={`text-sm font-medium truncate ${s.textPrimary}`}>{item.title}</p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div
              className={`hidden md:inline-flex items-center p-0.5 rounded-lg border ${s.border}`}
              aria-label="Pilih ukuran huruf"
            >
              {(
                [
                  {key: 'sm', label: 'A-'},
                  {key: 'md', label: 'A'},
                  {key: 'lg', label: 'A+'},
                ] as const
              ).map((size) => (
                <button
                  key={size.key}
                  type="button"
                  onClick={() => setFontScale(size.key)}
                  aria-label={`Ukuran teks ${size.key}`}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                    fontScale === size.key
                      ? 'bg-[#1E3A8A] text-white'
                      : `${s.textSecondary} hover:opacity-80`
                  }`}
                >
                  {size.label}
                </button>
              ))}
            </div>

            <div
              className={`hidden sm:inline-flex items-center p-0.5 rounded-lg border ${s.border}`}
              aria-label="Pilih tema ruang baca"
            >
              {(
                [
                  {key: 'paper', label: 'Kertas'},
                  {key: 'sepia', label: 'Sepia'},
                  {key: 'night', label: 'Malam'},
                ] as const
              ).map((t) => (
                <button
                  key={t.key}
                  type="button"
                  onClick={() => setTheme(t.key)}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                    theme === t.key
                      ? 'bg-[#1E3A8A] text-white'
                      : `${s.textSecondary} hover:opacity-80`
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {speechSupported && (
              <button
                type="button"
                onClick={handleToggleSpeech}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 min-h-[36px] ${
                  isSpeaking
                    ? 'bg-[#1E3A8A] text-white border-[#1E3A8A]'
                    : s.buttonIdle
                }`}
              >
                {isSpeaking ? (
                  <>
                    <Pause className="w-3.5 h-3.5 shrink-0" />
                    <span>Hentikan Suara</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5 shrink-0" />
                    <span>Dengarkan</span>
                  </>
                )}
              </button>
            )}

            <button
              type="button"
              onClick={() => onToggleSave(item.id)}
              aria-label={isSaved ? 'Hapus dari rak bacaan' : 'Simpan ke rak bacaan'}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 min-h-[36px] ${
                isSaved ? 'bg-[#1E3A8A] text-white border-[#1E3A8A]' : s.buttonIdle
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 shrink-0 ${isSaved ? 'fill-current' : ''}`} />
              <span className="hidden sm:inline">{isSaved ? 'Tersimpan' : 'Simpan'}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup ruang baca"
              className={`inline-flex items-center justify-center w-9 h-9 rounded-lg border transition-colors shrink-0 ${s.buttonIdle}`}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="h-0.5 w-full bg-stone-200/40">
          <div
            className="h-full bg-[#1E3A8A] transition-[width] duration-150"
            style={{width: `${scrollProgress}%`}}
          />
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="sm:hidden mb-5 flex flex-wrap items-center justify-between gap-2">
            <div className={`inline-flex items-center p-0.5 rounded-lg border ${s.border}`}>
              {(['paper', 'sepia', 'night'] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTheme(t)}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md ${
                    theme === t ? 'bg-[#1E3A8A] text-white' : s.textSecondary
                  }`}
                >
                  {t === 'paper' ? 'Kertas' : t === 'sepia' ? 'Sepia' : 'Malam'}
                </button>
              ))}
            </div>
            <div className={`inline-flex items-center p-0.5 rounded-lg border ${s.border}`}>
              {(['sm', 'md', 'lg'] as const).map((sz) => (
                <button
                  key={sz}
                  type="button"
                  onClick={() => setFontScale(sz)}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md ${
                    fontScale === sz ? 'bg-[#1E3A8A] text-white' : s.textSecondary
                  }`}
                >
                  {sz === 'sm' ? 'A-' : sz === 'md' ? 'A' : 'A+'}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <main className="lg:col-span-8">
              <div className={`pb-8 border-b ${s.border}`}>
                <p className={`text-xs uppercase tracking-widest ${s.textMuted}`}>
                  {getCategoryDegreeHint(item.category)} · {item.facultyOrGenre} · {item.year}
                </p>

                <h1
                  id="reader-modal-title"
                  className={`font-serif text-3xl sm:text-4xl font-semibold mt-3 leading-tight ${s.textPrimary}`}
                  style={{textWrap: 'balance'}}
                >
                  {item.title}
                </h1>

                <p className={`mt-3 text-base sm:text-lg ${s.textSecondary}`}>{item.subtitle}</p>

                <div className={`mt-5 text-sm ${s.textMuted} flex flex-wrap gap-x-4 gap-y-1`}>
                  <span>
                    Penulis: <strong className={s.textPrimary}>{item.author}</strong>
                  </span>
                  <span>·</span>
                  <span>{item.affiliationOrPublisher}</span>
                  {item.advisors && item.advisors.length > 0 && (
                    <>
                      <span>·</span>
                      <span>Pembimbing: {item.advisors.join(', ')}</span>
                    </>
                  )}
                </div>
              </div>

              <section className={`py-6 border-b ${s.border}`}>
                <h2 className={`text-xs uppercase tracking-widest font-semibold ${s.textMuted}`}>
                  Abstrak &amp; Ringkasan
                </h2>
                <p className={`mt-3 max-w-prose ${FONT_SIZE_CLASSES[fontScale]} ${s.textSecondary}`}>
                  {item.abstract}
                </p>
                <p className={`mt-3 text-xs ${s.textMuted}`}>
                  Kata kunci: {item.keywords.join(' · ')}
                </p>
              </section>

              <nav
                aria-label="Navigasi bab bacaan"
                className={`py-4 border-b ${s.border} flex flex-wrap items-center gap-2`}
              >
                {item.chapters.map((chapter, idx) => {
                  const isActive = idx === activeChapterIdx;
                  return (
                    <button
                      key={chapter.id}
                      type="button"
                      onClick={() => {
                        if (isSpeaking && speechSupported) {
                          window.speechSynthesis.cancel();
                          setIsSpeaking(false);
                        }
                        setActiveChapterIdx(idx);
                      }}
                      className={`px-3.5 py-2 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 min-h-[38px] ${
                        isActive
                          ? 'bg-[#1E3A8A] text-white border-[#1E3A8A]'
                          : s.buttonIdle
                      }`}
                    >
                      {chapter.label}
                    </button>
                  );
                })}
              </nav>

              {activeChapter && (
                <article className="pt-8 pb-12 max-w-prose">
                  <p className={`text-xs font-mono tracking-wider ${s.textMuted}`}>
                    {activeChapter.label}
                  </p>
                  <h2 className={`font-serif text-2xl sm:text-3xl font-semibold mt-2 ${s.textPrimary}`}>
                    {activeChapter.title}
                  </h2>

                  <div className="mt-6 space-y-5">
                    {activeChapter.paragraphs.map((paragraph, pIdx) => (
                      <p
                        key={pIdx}
                        className={`${FONT_SIZE_CLASSES[fontScale]} ${s.textSecondary} ${
                          pIdx === 0
                            ? 'first-letter:text-5xl first-letter:font-serif first-letter:font-semibold first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-none'
                            : ''
                        }`}
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {item.chapters.length > 1 && (
                    <div className={`mt-10 pt-6 border-t ${s.border} flex items-center justify-between gap-4`}>
                      <button
                        type="button"
                        disabled={activeChapterIdx === 0}
                        onClick={() => setActiveChapterIdx((prev) => Math.max(0, prev - 1))}
                        className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg border transition-colors disabled:opacity-40 ${s.buttonIdle}`}
                      >
                        Bagian Sebelumnya
                      </button>
                      <span className={`text-xs tabular-nums ${s.textMuted}`}>
                        Bagian {activeChapterIdx + 1} dari {item.chapters.length}
                      </span>
                      <button
                        type="button"
                        disabled={activeChapterIdx >= item.chapters.length - 1}
                        onClick={() =>
                          setActiveChapterIdx((prev) =>
                            Math.min(item.chapters.length - 1, prev + 1)
                          )
                        }
                        className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-lg border transition-colors disabled:opacity-40 ${s.buttonIdle}`}
                      >
                        Bagian Berikutnya
                      </button>
                    </div>
                  )}
                </article>
              )}
            </main>

            <aside className="lg:col-span-4 space-y-6">
              <div className={`border rounded-xl p-5 ${s.card}`}>
                <div className="flex items-start gap-4 pb-4 border-b border-stone-200/30">
                  <div className="w-20 shrink-0">
                    <CoverGraphic
                      item={item}
                      className="w-full aspect-[3/4] rounded-md border border-stone-300/40"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className={`text-xs uppercase tracking-wider ${s.textMuted}`}>
                      Kartu Katalog
                    </p>
                    <p className={`font-mono text-sm font-medium mt-1 tabular-nums ${s.textPrimary}`}>
                      {item.accessionNumber}
                    </p>
                    <p className={`text-xs mt-1 ${s.textMuted}`}>Akses Terbuka Publik</p>
                  </div>
                </div>

                <dl className={`divide-y ${s.border} text-xs mt-2`}>
                  <div className="py-2.5 flex justify-between gap-4">
                    <dt className={s.textMuted}>Jenis Koleksi</dt>
                    <dd className={`font-medium text-right ${s.textPrimary}`}>
                      {getCategoryDegreeHint(item.category)}
                    </dd>
                  </div>
                  <div className="py-2.5 flex justify-between gap-4">
                    <dt className={s.textMuted}>Tahun &amp; Bahasa</dt>
                    <dd className={`font-medium text-right tabular-nums ${s.textPrimary}`}>
                      {item.year} · {item.language}
                    </dd>
                  </div>
                  <div className="py-2.5 flex justify-between gap-4">
                    <dt className={s.textMuted}>Tebal Naskah</dt>
                    <dd className={`font-medium text-right tabular-nums ${s.textPrimary}`}>
                      {item.pages} halaman
                    </dd>
                  </div>
                  <div className="py-2.5 flex justify-between gap-4">
                    <dt className={s.textMuted}>{item.identifierLabel}</dt>
                    <dd className={`font-mono text-right tabular-nums ${s.textPrimary}`}>
                      {item.identifierValue}
                    </dd>
                  </div>
                </dl>

                <button
                  type="button"
                  onClick={() => downloadSummaryFile(item, noteValue)}
                  className="mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-medium text-white bg-[#1E3A8A] hover:bg-[#172D6B] rounded-lg transition-colors min-h-[40px]"
                >
                  <Download className="w-4 h-4 shrink-0" />
                  <span>Unduh Lembar Ringkasan (.txt)</span>
                </button>
              </div>

              <div className={`border rounded-xl p-5 ${s.card}`}>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <h3 className={`text-xs uppercase tracking-widest font-semibold ${s.textMuted}`}>
                    Salin Sitasi Akademik
                  </h3>
                  <div className={`inline-flex p-0.5 rounded-md border ${s.border}`}>
                    {(['apa', 'ieee', 'bibtex'] as const).map((fmt) => (
                      <button
                        key={fmt}
                        type="button"
                        onClick={() => setCitationFormat(fmt)}
                        className={`px-2 py-1 text-[11px] font-medium uppercase rounded ${
                          citationFormat === fmt ? 'bg-[#1E3A8A] text-white' : s.textMuted
                        }`}
                      >
                        {fmt}
                      </button>
                    ))}
                  </div>
                </div>

                <pre
                  className={`text-xs whitespace-pre-wrap break-words font-mono p-3 rounded-lg border ${s.border} ${s.textSecondary}`}
                >
                  {citations[citationFormat]}
                </pre>

                <button
                  type="button"
                  onClick={handleCopyCitation}
                  className={`mt-3 w-full inline-flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium rounded-lg border transition-colors min-h-[38px] ${s.buttonIdle}`}
                >
                  {copiedCitation ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Kutipan Berhasil Disalin</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Salin Format {citationFormat.toUpperCase()}</span>
                    </>
                  )}
                </button>
              </div>

              <div className={`border rounded-xl p-5 ${s.card}`}>
                <label
                  htmlFor="visitor-reading-note"
                  className={`block text-xs uppercase tracking-widest font-semibold ${s.textMuted}`}
                >
                  Catatan Pribadi Pengunjung
                </label>
                <p className={`text-xs mt-1 ${s.textMuted}`}>
                  Tersimpan otomatis di peramban Anda dan ikut terunduh pada lembar ringkasan.
                </p>
                <textarea
                  id="visitor-reading-note"
                  rows={4}
                  value={noteValue}
                  onChange={(e) => onSaveNote(item.id, e.target.value)}
                  placeholder="Tulis kutipan penting, ide skripsi, atau pengingat halaman..."
                  className={`mt-3 w-full rounded-lg border p-3 text-sm bg-transparent focus:border-[#1E3A8A] focus:outline-none ${s.border} ${s.textPrimary}`}
                />
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
