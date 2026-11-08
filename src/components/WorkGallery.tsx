'use client';

import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import Image from 'next/image';
import type { Shot } from '@/data/work';

// Strips such as OCR output lines are far wider than tall; they read better across the full grid.
const isWide = (shot: Shot) => shot.width / shot.height > 3;

export default function WorkGallery({ shots, title, preloadFirst = false }: { shots: Shot[]; title: string; preloadFirst?: boolean }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState<number | null>(null);

  const open = (i: number) => { setIndex(i); dialog.current?.showModal(); };
  const close = () => dialog.current?.close();
  const step = useCallback((delta: number) => setIndex(i => i === null ? i : (i + delta + shots.length) % shots.length), [shots.length]);

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') step(1);
      if (event.key === 'ArrowLeft') step(-1);
    };
    const onClose = () => setIndex(null);
    el.addEventListener('keydown', onKey);
    el.addEventListener('close', onClose);
    return () => { el.removeEventListener('keydown', onKey); el.removeEventListener('close', onClose); };
  }, [step]);

  const current = index === null ? null : shots[index];
  return <>
    <ul className="work-gallery">
      {shots.map((shot, i) => <li key={shot.src} className={isWide(shot) ? 'is-wide' : undefined} data-reveal="up" style={{ '--reveal-i': i % 4 } as CSSProperties}>
        <button type="button" onClick={() => open(i)} aria-label={`Enlarge: ${shot.caption}`}>
          <span className="work-gallery-frame"><Image src={shot.src} alt={`${title}: ${shot.caption}`} width={shot.width} height={shot.height} sizes="(max-width: 680px) 100vw, (max-width: 1100px) 50vw, 640px" preload={preloadFirst && i === 0} /></span>
          <span className="work-gallery-caption"><span>{String(i + 1).padStart(2, '0')}</span>{shot.caption}</span>
        </button>
      </li>)}
    </ul>
    <dialog ref={dialog} className="work-lightbox" aria-label={`${title} screenshots`} onClick={event => { if (event.target === event.currentTarget) close(); }}>
      {current && index !== null && <figure>
        <Image src={current.src} alt={`${title}: ${current.caption}`} width={current.width} height={current.height} sizes="100vw" />
        <figcaption>
          <span>{String(index + 1).padStart(2, '0')} / {String(shots.length).padStart(2, '0')}</span>
          <p>{current.caption}</p>
          <div>
            {shots.length > 1 && <><button type="button" onClick={() => step(-1)} aria-label="Previous screenshot">←</button><button type="button" onClick={() => step(1)} aria-label="Next screenshot">→</button></>}
            <button type="button" onClick={close} aria-label="Close">Close</button>
          </div>
        </figcaption>
      </figure>}
    </dialog>
  </>;
}
