"use client";

import { useEffect, useRef } from "react";
import { useTransform, useMotionValueEvent, MotionValue } from "framer-motion";

const TOTAL_FRAMES = 702;

function getFramePath(index: number): string {
  const padded = index.toString().padStart(3, "0");
  return `/mascot/high_res/frame-${padded}.jpg`;
}

// ── Shared image cache (all instances share the same preloaded images) ──
let sharedImages: HTMLImageElement[] = [];
let loadStarted = false;
let readyCallbacks: (() => void)[] = [];

function preloadImages(onReady: () => void) {
  readyCallbacks.push(onReady);
  if (loadStarted) return;
  loadStarted = true;

  sharedImages = new Array(TOTAL_FRAMES);
  let count = 0;

  for (let i = 1; i <= TOTAL_FRAMES; i++) {
    const img = new Image();
    img.src = getFramePath(i);
    img.onload = () => {
      count++;
      if (count === 1 || count === TOTAL_FRAMES) {
        readyCallbacks.forEach((cb) => cb());
        if (count === TOTAL_FRAMES) readyCallbacks = [];
      }
    };
    sharedImages[i - 1] = img;
  }
}

// ── Cover-mode draw (crops to fill, keeps constant scale based on window) ──
function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  cw: number,
  ch: number
) {
  const iw = img.naturalWidth;
  const ih = img.naturalHeight;
  const imgRatio = iw / ih;

  // Use full window size to determine the scale factor, preventing zoom on width change
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const windowW = window.innerWidth * dpr;
  const windowH = window.innerHeight * dpr;
  const windowRatio = windowW / windowH;

  let scale: number;
  if (windowRatio > imgRatio) {
    scale = windowW / iw;
  } else {
    scale = windowH / ih;
  }

  const drawW = iw * scale;
  const drawH = ih * scale;
  
  // Center inside the current container
  const dx = (cw - drawW) / 2;
  const dy = (ch - drawH) / 2;

  ctx.drawImage(img, 0, 0, iw, ih, dx, dy, drawW, drawH);
}

interface MascotCanvasProps {
  progress: MotionValue<number>;
}

export default function MascotCanvas({ progress }: MascotCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  const frameIndex = useTransform(progress, [0, 1], [1, TOTAL_FRAMES]);

  // ── Resize canvas to match container ──
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.round(rect.width * dpr);
        canvas.height = Math.round(rect.height * dpr);

        // Redraw current frame at new resolution
        const idx = Math.min(Math.max(0, Math.floor(frameIndex.get()) - 1), TOTAL_FRAMES - 1);
        const img = sharedImages[idx];
        if (img?.complete && img.naturalWidth > 0) {
          const ctx = canvas.getContext("2d");
          if (ctx) drawCover(ctx, img, canvas.width, canvas.height);
        }
      }
    };

    const observer = new ResizeObserver(() => resize());
    observer.observe(container);
    resize();

    return () => observer.disconnect();
  }, [frameIndex]);

  // ── Preload images (shared) ──
  useEffect(() => {
    preloadImages(() => {
      // Draw the first frame as soon as it's available
      if (canvasRef.current && sharedImages[0]?.complete) {
        const ctx = canvasRef.current.getContext("2d");
        if (ctx) drawCover(ctx, sharedImages[0], canvasRef.current.width, canvasRef.current.height);
      }
    });
  }, []);

  // ── Sync canvas frame with scroll ──
  useMotionValueEvent(frameIndex, "change", (latest) => {
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const canvas = canvasRef.current;
      if (!canvas || sharedImages.length === 0) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const idx = Math.min(Math.max(0, Math.floor(latest) - 1), TOTAL_FRAMES - 1);
      const img = sharedImages[idx];

      if (img?.complete && img.naturalWidth > 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawCover(ctx, img, canvas.width, canvas.height);
      }
    });
  });

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full"
      style={{
        WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
        maskImage: "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)"
      }}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}
