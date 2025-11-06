'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';

interface ScrollPosition {
  x: number;
  y: number;
}

interface ScrollContextType {
  saveScrollPosition: (key: string, position: ScrollPosition) => void;
  restoreScrollPosition: (key: string) => ScrollPosition | null;
  clearScrollPosition: (key: string) => void;
}

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

// Storage key for sessionStorage
const SCROLL_POSITIONS_KEY = 'scroll-positions';

export function ScrollProvider({ children }: { children: React.ReactNode }) {
  const [scrollPositions, setScrollPositions] = useState<Record<string, ScrollPosition>>(() => {
    // Initialize from sessionStorage on client side
    if (typeof window !== 'undefined') {
      try {
        const stored = sessionStorage.getItem(SCROLL_POSITIONS_KEY);
        return stored ? JSON.parse(stored) : {};
      } catch (error) {
        console.error('Error loading scroll positions from sessionStorage:', error);
        return {};
      }
    }
    return {};
  });

  // Save to sessionStorage whenever scrollPositions changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        sessionStorage.setItem(SCROLL_POSITIONS_KEY, JSON.stringify(scrollPositions));
      } catch (error) {
        console.error('Error saving scroll positions to sessionStorage:', error);
      }
    }
  }, [scrollPositions]);

  const saveScrollPosition = (key: string, position: ScrollPosition) => {
    setScrollPositions(prev => ({
      ...prev,
      [key]: position
    }));
  };

  const restoreScrollPosition = (key: string): ScrollPosition | null => {
    return scrollPositions[key] || null;
  };

  const clearScrollPosition = (key: string) => {
    setScrollPositions(prev => {
      const newPositions = { ...prev };
      delete newPositions[key];
      return newPositions;
    });
  };

  return (
    <ScrollContext.Provider value={{
      saveScrollPosition,
      restoreScrollPosition,
      clearScrollPosition
    }}>
      {children}
    </ScrollContext.Provider>
  );
}

export function useScroll() {
  const context = useContext(ScrollContext);
  if (context === undefined) {
    throw new Error('useScroll must be used within a ScrollProvider');
  }
  return context;
}