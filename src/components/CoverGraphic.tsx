import {useState} from 'react';
import {BookOpen} from 'lucide-react';
import {CatalogItem} from '../types/library';
import {getCategoryLabel} from '../utils/citations';

interface CoverGraphicProps {
  item: CatalogItem;
  className?: string;
}

const TONE_CLASSES: Record<
  CatalogItem['coverTone'],
  {bg: string; text: string; muted: string; line: string}
> = {
  lapis: {
    bg: 'bg-[#1B3154]',
    text: 'text-[#F7F4EC]',
    muted: 'text-[#C4D0E3]',
    line: 'border-[#334E7A]',
  },
  forest: {
    bg: 'bg-[#1D3B2C]',
    text: 'text-[#F7F4EC]',
    muted: 'text-[#C3D8CC]',
    line: 'border-[#335A46]',
  },
  slate: {
    bg: 'bg-[#26323D]',
    text: 'text-[#F7F4EC]',
    muted: 'text-[#CBD5DF]',
    line: 'border-[#3E4E5D]',
  },
  stone: {
    bg: 'bg-[#EDE7DC]',
    text: 'text-[#1C1917]',
    muted: 'text-[#57534E]',
    line: 'border-[#D6CEC0]',
  },
};

export function CoverGraphic({item, className = ''}: CoverGraphicProps) {
  const [imageError, setImageError] = useState(false);
  const tone = TONE_CLASSES[item.coverTone] || TONE_CLASSES.lapis;

  if (item.coverImage && !imageError) {
    return (
      <div className={`relative overflow-hidden bg-stone-100 ${className}`}>
        <img
          src={item.coverImage}
          alt={`Sampul ${item.title}`}
          referrerPolicy="no-referrer"
          onError={() => setImageError(true)}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        />
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden p-4 flex flex-col justify-between select-none ${tone.bg} ${tone.text} ${className}`}
      aria-hidden="true"
    >
      <div className={`border ${tone.line} h-full w-full p-3.5 flex flex-col justify-between`}>
        <div className="flex items-center justify-between gap-2">
          <span className={`font-mono text-[10px] tracking-wider tabular-nums ${tone.muted}`}>
            {item.accessionNumber}
          </span>
          <BookOpen className={`w-3.5 h-3.5 shrink-0 ${tone.muted}`} />
        </div>

        <div className="my-auto py-2">
          <p className={`text-[10px] uppercase tracking-widest mb-1.5 ${tone.muted}`}>
            {getCategoryLabel(item.category)}
          </p>
          <p className="font-serif text-sm leading-snug font-semibold line-clamp-4">
            {item.title}
          </p>
        </div>

        <div className={`pt-2 border-t ${tone.line} flex items-center justify-between gap-2`}>
          <span className={`text-[11px] truncate ${tone.muted}`}>{item.author}</span>
          <span className={`font-mono text-[10px] tabular-nums shrink-0 ${tone.muted}`}>
            {item.year}
          </span>
        </div>
      </div>
    </div>
  );
}
