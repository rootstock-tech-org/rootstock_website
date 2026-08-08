'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * Image-based Rootie — renders the exact mascot cutout with a gentle
 * floating loop and subtle mouse-parallax so it still feels alive.
 * Artwork lives at: public/rootie.png
 */
export default function RootieImage() {
  const [failed, setFailed] = useState(false)

  // mouse parallax
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotX = useSpring(my, { stiffness: 60, damping: 18 })
  const rotY = useSpring(mx, { stiffness: 60, damping: 18 })
  const wrapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1
      const ny = (e.clientY / window.innerHeight) * 2 - 1
      mx.set(nx * 5)
      my.set(-ny * 5)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [mx, my])

  return (
    <div ref={wrapRef} className="relative w-full h-full flex items-center justify-center">
      {/* soft glow halo behind the mascot */}
      <div className="absolute w-[52%] aspect-square rounded-full bg-[#25532c]/10 blur-3xl" />

      <motion.div
        style={{ rotateX: rotX, rotateY: rotY, transformPerspective: 900 }}
        className="relative"
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        {!failed ? (
          <motion.div
            animate={{ rotateY: [-16, 16, -16] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/rootie.png"
              alt="Rootie — Rootstock Technology mascot"
              onError={() => setFailed(true)}
              className="w-[clamp(260px,30vw,440px)] h-auto select-none pointer-events-none drop-shadow-[0_28px_38px_rgba(20,50,20,0.22)]"
              draggable={false}
            />
          </motion.div>
        ) : (
          <div className="w-[clamp(260px,32vw,460px)] aspect-square flex items-center justify-center rounded-3xl border-2 border-dashed border-[#25532c]/40 text-center p-8">
            <p className="text-[#25532c] text-sm font-medium leading-relaxed">
              Add the mascot image at
              <br />
              <code className="text-xs bg-[#25532c]/10 px-2 py-1 rounded mt-2 inline-block">
                public/rootie.png
              </code>
            </p>
          </div>
        )}
      </motion.div>
    </div>
  )
}
