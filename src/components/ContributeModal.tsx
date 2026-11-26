import {useEffect, useState} from 'react';
import {X} from 'lucide-react';
import {FACULTIES_AND_GENRES} from '../data/catalogData';
import {CatalogItem, CollectionCategory} from '../types/library';

interface ContributeModalProps {
  open: boolean;
  onClose: () => void;
  onSubmitItem: (item: CatalogItem) => void;
}

export function ContributeModal({open, onClose, onSubmitItem}: ContributeModalProps) {
  const [category, setCategory] = useState<CollectionCategory>('skripsi');
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [author, setAuthor] = useState('');
  const [affiliation, setAffiliation] = useState('');
  const [advisor, setAdvisor] = useState('');
  const [facultyOrGenre, setFacultyOrGenre] = useState<string>(FACULTIES_AND_GENRES[1]);
  const [year, setYear] = useState('2026');
  const [pages, setPages] = useState('110');
  const [identifierValue, setIdentifierValue] = useState('');
  const [abstract, setAbstract] = useState('');
  const [chapterBody, setChapterBody] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !author.trim() || !affiliation.trim() || !abstract.trim()) {
      setErrorMessage('Mohon lengkapi judul, penulis, institusi/penerbit, dan abstrak.');
      return;
    }

    const prefix = category === 'skripsi' ? 'SKR' : category === 'tugas-akhir' ? 'TA' : 'BKU';
    const randomCode = String(Math.floor(1000 + Math.random() * 8999));
    const parsedYear = Math.min(2030, Math.max(1980, Number(year) || 2026));
    const parsedPages = Math.min(1500, Math.max(12, Number(pages) || 100));

    const paragraphs = chapterBody
      .split(/\n+/)
      .map((line) => line.trim())
      .filter(Boolean);

    const newItem: CatalogItem = {
      id: `custom-${Date.now()}`,
      accessionNumber: `${prefix}.${parsedYear}.${randomCode}`,
      category,
      title: title.trim(),
      subtitle: subtitle.trim() || 'Karya Sumbangan Pengunjung Repositori Terbuka',
      author: author.trim(),
      affiliationOrPublisher: affiliation.trim(),
      advisors: advisor.trim() ? [advisor.trim()] : undefined,
      facultyOrGenre,
      year: parsedYear,
      pages: parsedPages,
      language: 'Indonesia',
      identifierLabel: category === 'buku' ? 'ISBN' : 'NIM',
      identifierValue: identifierValue.trim() || randomCode,
      abstract: abstract.trim(),
      keywords: [facultyOrGenre, category === 'buku' ? 'Buku Bacaan' : 'Karya Ilmiah'],
      coverTone: category === 'skripsi' ? 'lapis' : category === 'tugas-akhir' ? 'forest' : 'slate',
      readCount: 1,
      chapters: [
        {
          id: 'bab-1',
          label: '01 / NASKAH PEMBUKA',
          title: 'Ringkasan Isi dan Gagasan Utama',
          paragraphs:
            paragraphs.length > 0
              ? paragraphs
              : [
                  abstract.trim(),
                  'Dokumen ini ditambahkan ke katalog terbuka Pustaka Aksara oleh pengunjung sehingga dapat langsung dibaca, dikutip, dan disimpan ke rak bacaan pribadi.',
                ],
        },
      ],
    };

    onSubmitItem(newItem);
    setTitle('');
    setSubtitle('');
    setAuthor('');
    setAffiliation('');
    setAdvisor('');
    setIdentifierValue('');
    setAbstract('');
    setChapterBody('');
    setErrorMessage('');
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="contribute-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      <div
        className="fixed inset-0 bg-stone-950/45 backdrop-blur-[1px]"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-2xl bg-[#FAF8F3] border border-stone-200 rounded-xl shadow-xl max-h-[90vh] flex flex-col overflow-hidden">
        <div className="px-6 py-4 bg-white border-b border-stone-200 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-stone-500">
              Partisipasi Terbuka
            </p>
            <h2
              id="contribute-modal-title"
              className="font-serif text-xl font-semibold text-stone-900"
            >
              Ajukan Skripsi, Tugas Akhir, atau Buku
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup formulir pengajuan"
            className="inline-flex items-center justify-center w-10 h-10 rounded-lg border border-stone-300 text-stone-700 hover:bg-stone-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
          {errorMessage && (
            <div className="p-3 text-sm text-red-900 bg-red-50 border border-red-200 rounded-lg">
              {errorMessage}
            </div>
          )}

          <div>
            <span className="block text-xs font-medium text-stone-700 mb-1.5">
              Jenis Koleksi
            </span>
            <div className="grid grid-cols-3 gap-2">
              {(
                [
                  {key: 'skripsi', label: 'Skripsi (S1)'},
                  {key: 'tugas-akhir', label: 'Tugas Akhir'},
                  {key: 'buku', label: 'Buku Bacaan'},
                ] as const
              ).map((opt) => (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => setCategory(opt.key)}
                  className={`py-2.5 px-3 text-xs sm:text-sm font-medium rounded-lg border transition-colors ${
                    category === opt.key
                      ? 'bg-[#1E3A8A] text-white border-[#1E3A8A]'
                      : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label htmlFor="contrib-title" className="block text-xs font-medium text-stone-700 mb-1">
                Judul Lengkap *
              </label>
              <input
                id="contrib-title"
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Contoh: Analisis Kualitas Air Sungai Berbasis Sensor Terpadu"
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-stone-300 rounded-lg text-stone-900 focus:border-[#1E3A8A] focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="contrib-subtitle" className="block text-xs font-medium text-stone-700 mb-1">
                Subjudul
              </label>
              <input
                id="contrib-subtitle"
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="Studi kasus, lokasi, atau keterangan edisi"
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-stone-300 rounded-lg text-stone-900 focus:border-[#1E3A8A] focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="contrib-author" className="block text-xs font-medium text-stone-700 mb-1">
                Nama Penulis *
              </label>
              <input
                id="contrib-author"
                type="text"
                required
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Nama lengkap penulis"
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-stone-300 rounded-lg text-stone-900 focus:border-[#1E3A8A] focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="contrib-aff" className="block text-xs font-medium text-stone-700 mb-1">
                {category === 'buku' ? 'Nama Penerbit *' : 'Universitas / Politeknik *'}
              </label>
              <input
                id="contrib-aff"
                type="text"
                required
                value={affiliation}
                onChange={(e) => setAffiliation(e.target.value)}
                placeholder={category === 'buku' ? 'Contoh: Pustaka Merdeka' : 'Contoh: Fakultas Teknik, Universitas ...'}
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-stone-300 rounded-lg text-stone-900 focus:border-[#1E3A8A] focus:outline-none"
              />
            </div>

            {category !== 'buku' && (
              <div>
                <label htmlFor="contrib-adv" className="block text-xs font-medium text-stone-700 mb-1">
                  Dosen Pembimbing
                </label>
                <input
                  id="contrib-adv"
                  type="text"
                  value={advisor}
                  onChange={(e) => setAdvisor(e.target.value)}
                  placeholder="Nama & gelar pembimbing"
                  className="w-full px-3.5 py-2.5 text-sm bg-white border border-stone-300 rounded-lg text-stone-900 focus:border-[#1E3A8A] focus:outline-none"
                />
              </div>
            )}

            <div>
              <label htmlFor="contrib-faculty" className="block text-xs font-medium text-stone-700 mb-1">
                Bidang Ilmu / Genre
              </label>
              <select
                id="contrib-faculty"
                value={facultyOrGenre}
                onChange={(e) => setFacultyOrGenre(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-stone-300 rounded-lg text-stone-900 focus:border-[#1E3A8A] focus:outline-none"
              >
                {FACULTIES_AND_GENRES.filter((f) => f !== 'Semua Bidang').map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-3 gap-3 sm:col-span-2">
              <div>
                <label htmlFor="contrib-year" className="block text-xs font-medium text-stone-700 mb-1">
                  Tahun
                </label>
                <input
                  id="contrib-year"
                  type="number"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg text-stone-900 tabular-nums focus:border-[#1E3A8A] focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="contrib-pages" className="block text-xs font-medium text-stone-700 mb-1">
                  Halaman
                </label>
                <input
                  id="contrib-pages"
                  type="number"
                  value={pages}
                  onChange={(e) => setPages(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg text-stone-900 tabular-nums focus:border-[#1E3A8A] focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="contrib-id" className="block text-xs font-medium text-stone-700 mb-1">
                  {category === 'buku' ? 'ISBN' : 'NIM'}
                </label>
                <input
                  id="contrib-id"
                  type="text"
                  value={identifierValue}
                  onChange={(e) => setIdentifierValue(e.target.value)}
                  placeholder="Opsional"
                  className="w-full px-3 py-2 text-sm bg-white border border-stone-300 rounded-lg text-stone-900 font-mono focus:border-[#1E3A8A] focus:outline-none"
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="contrib-abstract" className="block text-xs font-medium text-stone-700 mb-1">
                Abstrak / Sinopsis *
              </label>
              <textarea
                id="contrib-abstract"
                rows={3}
                required
                value={abstract}
                onChange={(e) => setAbstract(e.target.value)}
                placeholder="Ringkasan tujuan, metode, atau isi utama bacaan..."
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-stone-300 rounded-lg text-stone-900 focus:border-[#1E3A8A] focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="contrib-body" className="block text-xs font-medium text-stone-700 mb-1">
                Cuplikan Isi / Bab Pembuka (Opsional)
              </label>
              <textarea
                id="contrib-body"
                rows={3}
                value={chapterBody}
                onChange={(e) => setChapterBody(e.target.value)}
                placeholder="Tempelkan paragraf pembuka agar pengunjung dapat langsung membacanya di ruang baca..."
                className="w-full px-3.5 py-2.5 text-sm bg-white border border-stone-300 rounded-lg text-stone-900 focus:border-[#1E3A8A] focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-stone-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-stone-700 border border-stone-300 rounded-lg hover:bg-stone-100 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-medium text-white bg-[#1E3A8A] hover:bg-[#172D6B] rounded-lg transition-colors"
            >
              Tambahkan ke Katalog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
