import {useEffect, useMemo, useRef, useState} from 'react';
import {CatalogExplorer} from './components/CatalogExplorer';
import {ContributeModal} from './components/ContributeModal';
import {FeaturedCuratorialSection} from './components/FeaturedCuratorialSection';
import {Footer} from './components/Footer';
import {Header} from './components/Header';
import {HeroSection} from './components/HeroSection';
import {ReaderModal} from './components/ReaderModal';
import {ReadingShelfDrawer} from './components/ReadingShelfDrawer';
import {INITIAL_CATALOG_ITEMS} from './data/catalogData';
import {
  CatalogItem,
  CollectionCategory,
  SortOption,
  VisitorNote,
} from './types/library';

const STORAGE_SAVED_KEY = 'pustaka_aksara_saved_ids_v1';
const STORAGE_NOTES_KEY = 'pustaka_aksara_notes_v1';
const STORAGE_CUSTOM_ITEMS_KEY = 'pustaka_aksara_custom_items_v1';

function readStoredJson<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export default function App() {
  const [customItems, setCustomItems] = useState<CatalogItem[]>(() =>
    readStoredJson<CatalogItem[]>(STORAGE_CUSTOM_ITEMS_KEY, [])
  );
  const [savedIds, setSavedIds] = useState<string[]>(() =>
    readStoredJson<string[]>(STORAGE_SAVED_KEY, ['skripsi-01', 'buku-01'])
  );
  const [notesById, setNotesById] = useState<Record<string, VisitorNote>>(() =>
    readStoredJson<Record<string, VisitorNote>>(STORAGE_NOTES_KEY, {})
  );
  const [readOffsets, setReadOffsets] = useState<Record<string, number>>({});

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CollectionCategory | 'all'>('all');
  const [selectedFaculty, setSelectedFaculty] = useState<string>('Semua Bidang');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('newest');

  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  const [shelfOpen, setShelfOpen] = useState(false);
  const [contributeOpen, setContributeOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const searchInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_SAVED_KEY, JSON.stringify(savedIds));
    } catch {
      // Ignore storage quota errors
    }
  }, [savedIds]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_NOTES_KEY, JSON.stringify(notesById));
    } catch {
      // Ignore storage quota errors
    }
  }, [notesById]);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_CUSTOM_ITEMS_KEY, JSON.stringify(customItems));
    } catch {
      // Ignore storage quota errors
    }
  }, [customItems]);

  useEffect(() => {
    const handleSlashShortcut = (e: KeyboardEvent) => {
      if (e.key !== '/' || e.metaKey || e.ctrlKey || e.altKey) return;
      const target = e.target as HTMLElement | null;
      const tag = target?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea' || tag === 'select' || target?.isContentEditable) {
        return;
      }
      e.preventDefault();
      searchInputRef.current?.focus();
    };
    window.addEventListener('keydown', handleSlashShortcut);
    return () => window.removeEventListener('keydown', handleSlashShortcut);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2600);
  };

  const allItems = useMemo(() => {
    return [...customItems, ...INITIAL_CATALOG_ITEMS].map((item) => ({
      ...item,
      readCount: item.readCount + (readOffsets[item.id] || 0),
    }));
  }, [customItems, readOffsets]);

  const counts = useMemo(() => {
    return {
      total: allItems.length,
      skripsi: allItems.filter((i) => i.category === 'skripsi').length,
      tugasAkhir: allItems.filter((i) => i.category === 'tugas-akhir').length,
      buku: allItems.filter((i) => i.category === 'buku').length,
    };
  }, [allItems]);

  const availableYears = useMemo(() => {
    const years = Array.from(new Set(allItems.map((i) => i.year)));
    return years.sort((a, b) => b - a);
  }, [allItems]);

  const filteredItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    const matched = allItems.filter((item) => {
      if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
      if (selectedFaculty !== 'Semua Bidang' && item.facultyOrGenre !== selectedFaculty) {
        return false;
      }
      if (selectedYear !== 'all' && String(item.year) !== selectedYear) return false;

      if (q.length > 0) {
        const haystack = [
          item.title,
          item.subtitle,
          item.author,
          item.affiliationOrPublisher,
          item.facultyOrGenre,
          item.accessionNumber,
          item.identifierValue,
          item.abstract,
          ...(item.advisors || []),
          ...item.keywords,
        ]
          .join(' ')
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }

      return true;
    });

    return matched.sort((a, b) => {
      if (sortBy === 'popular') return b.readCount - a.readCount;
      if (sortBy === 'title') return a.title.localeCompare(b.title, 'id');
      return b.year - a.year || b.readCount - a.readCount;
    });
  }, [allItems, searchQuery, selectedCategory, selectedFaculty, selectedYear, sortBy]);

  const activeItem = useMemo(
    () => allItems.find((item) => item.id === activeItemId) || null,
    [allItems, activeItemId]
  );

  const savedItems = useMemo(
    () => allItems.filter((item) => savedIds.includes(item.id)),
    [allItems, savedIds]
  );

  const handleOpenItem = (item: CatalogItem) => {
    setReadOffsets((prev) => ({
      ...prev,
      [item.id]: (prev[item.id] || 0) + 1,
    }));
    setActiveItemId(item.id);
  };

  const handleToggleSave = (id: string) => {
    setSavedIds((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        showToast('Koleksi dihapus dari Rak Bacaan.');
        return prev.filter((item) => item !== id);
      }
      showToast('Koleksi disimpan ke Rak Bacaan Anda.');
      return [id, ...prev];
    });
  };

  const handleSaveNote = (itemId: string, content: string) => {
    setNotesById((prev) => ({
      ...prev,
      [itemId]: {
        itemId,
        content,
        updatedAt: new Date().toISOString(),
      },
    }));
  };

  const handleJumpToCategory = (category: CollectionCategory | 'all') => {
    setSelectedCategory(category);
    document.getElementById('katalog')?.scrollIntoView({behavior: 'smooth', block: 'start'});
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedFaculty('Semua Bidang');
    setSelectedYear('all');
    setSortBy('newest');
  };

  const handleContributeItem = (newItem: CatalogItem) => {
    setCustomItems((prev) => [newItem, ...prev]);
    setSelectedCategory('all');
    setSelectedFaculty('Semua Bidang');
    setSelectedYear('all');
    setSearchQuery('');
    setActiveItemId(newItem.id);
    showToast(`"${newItem.title}" berhasil ditambahkan ke katalog terbuka.`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F3] text-stone-900">
      <Header
        savedCount={savedItems.length}
        onSelectCategory={setSelectedCategory}
        onOpenShelf={() => setShelfOpen(true)}
      />

      <main className="flex-1">
        <HeroSection
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          searchInputRef={searchInputRef}
          counts={counts}
          onJumpToCategory={handleJumpToCategory}
        />

        <FeaturedCuratorialSection
          items={allItems}
          savedIds={savedIds}
          onOpenItem={handleOpenItem}
          onToggleSave={handleToggleSave}
        />

        <CatalogExplorer
          items={filteredItems}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedFaculty={selectedFaculty}
          onFacultyChange={setSelectedFaculty}
          selectedYear={selectedYear}
          onYearChange={setSelectedYear}
          sortBy={sortBy}
          onSortChange={setSortBy}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          savedIds={savedIds}
          onOpenItem={handleOpenItem}
          onToggleSave={handleToggleSave}
          onOpenContribute={() => setContributeOpen(true)}
          onResetFilters={handleResetFilters}
          availableYears={availableYears}
        />
      </main>

      <Footer
        onSelectCategory={setSelectedCategory}
        onOpenShelf={() => setShelfOpen(true)}
        onOpenContribute={() => setContributeOpen(true)}
      />

      <ReaderModal
        item={activeItem}
        isSaved={activeItem ? savedIds.includes(activeItem.id) : false}
        noteValue={activeItem ? notesById[activeItem.id]?.content || '' : ''}
        onSaveNote={handleSaveNote}
        onToggleSave={handleToggleSave}
        onClose={() => setActiveItemId(null)}
      />

      <ReadingShelfDrawer
        open={shelfOpen}
        savedItems={savedItems}
        notesById={notesById}
        onOpenItem={handleOpenItem}
        onRemoveSaved={handleToggleSave}
        onClose={() => setShelfOpen(false)}
      />

      <ContributeModal
        open={contributeOpen}
        onClose={() => setContributeOpen(false)}
        onSubmitItem={handleContributeItem}
      />

      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-50 px-4 py-3 text-xs sm:text-sm font-medium bg-stone-900 text-[#FAF8F3] rounded-lg shadow-lg border border-stone-700"
        >
          {toastMessage}
        </div>
      )}
    </div>
  );
}
