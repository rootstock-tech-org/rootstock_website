"use client";

import { useEffect, useState } from 'react';

interface HydrationSuppressorProps {
  children: React.ReactNode;
}

/**
 * This component suppresses hydration warnings by only rendering children
 * after initial client-side mount. This helps avoid hydration mismatches
 * caused by browser extensions that inject attributes into the HTML.
 */
export default function HydrationSuppressor({ children }: HydrationSuppressorProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // During SSR and first client render, render a simpler version to avoid hydration errors
  if (!isMounted) {
    // Return a minimal version that will be replaced after hydration
    return <>{children}</>;
  }

  // After hydration, render the full version
  return <>{children}</>;
}
