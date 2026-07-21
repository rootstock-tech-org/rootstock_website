'use client'

import { useEffect, useRef } from 'react'

export function useScrollProgress() {
  const progress = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY
      const total = document.documentElement.scrollHeight - window.innerHeight
      progress.current = total > 0 ? scrolled / total : 0
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return progress
}
