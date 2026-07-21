'use client';

import { useEffect, useRef } from 'react';

/**
 * A soft brand-tinted glow that follows the cursor — adds an immersive,
 * "alive" feel across the whole page. Pointer-events-none, desktop only,
 * and disabled for reduced-motion / touch.
 */
export default function CursorSpotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.matchMedia('(hover: none)').matches) return;

    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let cx = tx;
    let cy = ty;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    const loop = () => {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[5] hidden md:block -translate-x-1/2 -translate-y-1/2 will-change-transform"
      style={{
        width: 520,
        height: 520,
        background:
          'radial-gradient(circle, rgba(122,229,130,0.14) 0%, rgba(22,186,197,0.08) 35%, transparent 70%)',
        borderRadius: '9999px',
        mixBlendMode: 'multiply',
      }}
    />
  );
}
