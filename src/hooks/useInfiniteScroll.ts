"use client";

import { useState, useEffect, useCallback, RefObject } from "react";

interface UseInfiniteScrollOptions {
  /** Distance from the bottom of the container to trigger the next load (in pixels) */
  threshold?: number;
  /** Initial loading state */
  initialLoading?: boolean;
}

/**
 * A hook that detects when a user scrolls near the bottom of a container
 * and triggers a callback function. Designed to avoid hydration issues by
 * only attaching scroll listeners after component mount.
 */
export function useInfiniteScroll(
  ref: RefObject<HTMLElement>,
  callback: () => void,
  options: UseInfiniteScrollOptions = {}
) {
  const { threshold = 300, initialLoading = false } = options;
  
  // States
  const [isLoading, setIsLoading] = useState(initialLoading);
  const [isMounted, setIsMounted] = useState(false);

  // Mark as mounted after hydration is complete
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Check if we need to load more content
  const checkScroll = useCallback(() => {
    if (!ref.current || isLoading) return;
    
    const { scrollTop, clientHeight, scrollHeight } = ref.current;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < threshold;
    
    if (isNearBottom) {
      setIsLoading(true);
      callback();
    }
  }, [ref, callback, threshold, isLoading]);

  // Set up scroll listener (client-side only)
  useEffect(() => {
    // Skip if not mounted (avoid hydration issues)
    if (!isMounted) return;
    
    const scrollContainer = ref.current;
    if (!scrollContainer) return;
    
    scrollContainer.addEventListener("scroll", checkScroll);
    
    // Initial check in case content doesn't fill the container
    checkScroll();
    
    return () => {
      scrollContainer.removeEventListener("scroll", checkScroll);
    };
  }, [ref, checkScroll, isMounted]);

  // Function to reset loading state when content is loaded
  const setLoaded = useCallback(() => {
    setIsLoading(false);
  }, []);

  return {
    isLoading,
    setLoaded,
  };
}

export default useInfiniteScroll;
