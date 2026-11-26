import {CatalogItem, CollectionCategory} from '../types/library';

export function getCategoryLabel(category: CollectionCategory): string {
  switch (category) {
    case 'skripsi':
      return 'Skripsi';
    case 'tugas-akhir':
      return 'Tugas Akhir';
    case 'buku':
      return 'Buku Bacaan';
  }
}

export function getCategoryDegreeHint(category: CollectionCategory): string {
  switch (category) {
    case 'skripsi':
      return 'Skripsi Sarjana (S1)';
    case 'tugas-akhir':
      return 'Tugas Akhir Vokasi (D3/D4)';
    case 'buku':
      return 'Buku Bacaan Umum & Referensi';
  }
}

function formatLastNameFirst(fullName: string): string {
  const parts = fullName.trim().split(/\s+/);
  if (parts.length <= 1) return fullName;
  const last = parts[parts.length - 1];
  const initials = parts
    .slice(0, -1)
    .map((p) => `${p.charAt(0).toUpperCase()}.`)
    .join(' ');
  return `${last}, ${initials}`;
}

export function generateCitations(item: CatalogItem): {
  apa: string;
  ieee: string;
  bibtex: string;
} {
  const apaAuthor = formatLastNameFirst(item.author);
  const typeNote =
    item.category === 'skripsi'
      ? `[Skripsi Sarjana, ${item.affiliationOrPublisher}]`
      : item.category === 'tugas-akhir'
        ? `[Tugas Akhir Diploma, ${item.affiliationOrPublisher}]`
        : item.affiliationOrPublisher;

  const apa =
    item.category === 'buku'
      ? `${apaAuthor} (${item.year}). ${item.title}: ${item.subtitle}. ${item.affiliationOrPublisher}.`
      : `${apaAuthor} (${item.year}). ${item.title}: ${item.subtitle} ${typeNote}. Repositori Pustaka Aksara.`;

  const ieeeType =
    item.category === 'skripsi'
      ? 'Skripsi Sarjana'
      : item.category === 'tugas-akhir'
        ? 'Tugas Akhir'
        : item.affiliationOrPublisher;

  const ieee =
    item.category === 'buku'
      ? `${item.author}, "${item.title}: ${item.subtitle}," ${item.affiliationOrPublisher}, ${item.year}.`
      : `${item.author}, "${item.title}," ${ieeeType}, ${item.affiliationOrPublisher}, ${item.year}.`;

  const bibKey = `${item.author.split(' ').pop()?.toLowerCase().replace(/[^a-z]/g, '') || 'penulis'}${item.year}`;
  const bibType = item.category === 'buku' ? 'book' : 'mastersthesis';
  const bibtex = `@${bibType}{${bibKey},
  author = {${item.author}},
  title = {${item.title}: ${item.subtitle}},
  year = {${item.year}},
  ${item.category === 'buku' ? 'publisher' : 'school'} = {${item.affiliationOrPublisher}},
  note = {Nomor Induk: ${item.accessionNumber}}
}`;

  return {apa, ieee, bibtex};
}

export function downloadSummaryFile(item: CatalogItem, note?: string): void {
  const citations = generateCitations(item);
  const lines: string[] = [
    `PUSTAKA AKSARA — LEMBAR RINGKASAN KOLEKSI`,
    `============================================================`,
    `Nomor Induk : ${item.accessionNumber}`,
    `Kategori    : ${getCategoryDegreeHint(item.category)}`,
    `Judul       : ${item.title}`,
    `Subjudul    : ${item.subtitle}`,
    `Penulis     : ${item.author}`,
    `Institusi   : ${item.affiliationOrPublisher}`,
  ];

  if (item.advisors && item.advisors.length > 0) {
    lines.push(`Pembimbing  : ${item.advisors.join('; ')}`);
  }

  lines.push(
    `Bidang      : ${item.facultyOrGenre}`,
    `Tahun       : ${item.year}`,
    `Tebal       : ${item.pages} halaman`,
    `Identitas   : ${item.identifierLabel} ${item.identifierValue}`,
    ``,
    `ABSTRAK / SINOPSIS`,
    `------------------------------------------------------------`,
    item.abstract,
    ``,
    `KATA KUNCI: ${item.keywords.join(', ')}`,
    ``,
    `FORMAT KUTIPAN`,
    `------------------------------------------------------------`,
    `[APA 7]`,
    citations.apa,
    ``,
    `[IEEE]`,
    citations.ieee,
    ``
  );

  if (note && note.trim().length > 0) {
    lines.push(
      `CATATAN PRIBADI PENGUNJUNG`,
      `------------------------------------------------------------`,
      note.trim(),
      ``
    );
  }

  lines.push(
    `PRATINJAU ISI`,
    `------------------------------------------------------------`
  );

  item.chapters.forEach((chapter) => {
    lines.push(`\n${chapter.label} — ${chapter.title}`);
    chapter.paragraphs.forEach((p) => {
      lines.push(`\n${p}`);
    });
  });

  const blob = new Blob([lines.join('\n')], {type: 'text/plain;charset=utf-8'});
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `${item.accessionNumber.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-ringkasan.txt`;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}
