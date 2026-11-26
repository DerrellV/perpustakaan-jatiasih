export type CollectionCategory = 'skripsi' | 'tugas-akhir' | 'buku';

export interface ChapterSection {
  id: string;
  label: string;
  title: string;
  paragraphs: string[];
}

export interface CatalogItem {
  id: string;
  accessionNumber: string;
  category: CollectionCategory;
  title: string;
  subtitle: string;
  author: string;
  affiliationOrPublisher: string;
  advisors?: string[];
  facultyOrGenre: string;
  year: number;
  pages: number;
  language: 'Indonesia' | 'Inggris' | 'Dwibahasa';
  identifierLabel: string;
  identifierValue: string;
  abstract: string;
  keywords: string[];
  coverImage?: string;
  coverTone: 'lapis' | 'forest' | 'slate' | 'stone';
  readCount: number;
  featured?: boolean;
  chapters: ChapterSection[];
}

export interface VisitorNote {
  itemId: string;
  content: string;
  updatedAt: string;
}

export type ReadingTheme = 'paper' | 'sepia' | 'night';
export type FontScale = 'sm' | 'md' | 'lg';
export type SortOption = 'newest' | 'popular' | 'title';
export type ViewMode = 'grid' | 'table';
