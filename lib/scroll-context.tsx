'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { NoteFilters } from '@/types';

interface ScrollPosition {
  x: number;
  y: number;
}

interface NotesPageState {
  scrollY: number;
  expandedYears: string[];
  expandedSubjects: string[];
  expandedYear: string | null;
  filters: NoteFilters;
}

interface ScrollContextType {
  saveNotesPageState: (state: NotesPageState) => void;
  getNotesPageState: () => NotesPageState | null;
  clearNotesPageState: () => void;
  shouldPreserveScroll: (from: string, to: string) => boolean;
  recordNavigation: (from: string, to: string) => void;
  restoreScrollPosition: (scrollY: number) => void;
}

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

// Storage key for sessionStorage
const NOTES_STATE_KEY = 'notes-page-state';

// Debug logging utility
const debugLog = (message: string, data?: any) => {
  const timestamp = new Date().toISOString();
  console.log(`[SCROLL-CONTEXT ${timestamp}] ${message}`, data || '');
};

// Deep equality check for NotesPageState
const statesEqual = (state1: NotesPageState | null, state2: NotesPageState | null): boolean => {
  if (state1 === state2) return true;
  if (!state1 || !state2) return false;
  
  return (
    state1.scrollY === state2.scrollY &&
    state1.expandedYear === state2.expandedYear &&
    JSON.stringify(state1.expandedYears.sort()) === JSON.stringify(state2.expandedYears.sort()) &&
    JSON.stringify(state1.expandedSubjects.sort()) === JSON.stringify(state2.expandedSubjects.sort()) &&
    JSON.stringify(state1.filters) === JSON.stringify(state2.filters)
  );
};

export function ScrollProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [notesPageState, setNotesPageState] = useState<NotesPageState | null>(() => {
    // Initialize from sessionStorage on client side
    if (typeof window !== 'undefined') {
      try {
        const stored = sessionStorage.getItem(NOTES_STATE_KEY);
        debugLog('Initializing from sessionStorage', { stored: !!stored });
        return stored ? JSON.parse(stored) : null;
      } catch (error) {
        debugLog('Error loading notes page state from sessionStorage', error);
        return null;
      }
    }
    return null;
  });

  // Prevent infinite loop by tracking last saved state
  const lastSavedStateRef = useRef<NotesPageState | null>(null);
  
  // Restoration lock to prevent multiple simultaneous restorations
  const isRestoringRef = useRef(false);
  const restorationTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Save to sessionStorage whenever notesPageState changes, but prevent redundant saves
  useEffect(() => {
    if (typeof window !== 'undefined' && !statesEqual(notesPageState, lastSavedStateRef.current)) {
      try {
        sessionStorage.setItem(NOTES_STATE_KEY, JSON.stringify(notesPageState));
        lastSavedStateRef.current = notesPageState;
        debugLog('Saved notes page state to sessionStorage', {
          scrollY: notesPageState?.scrollY,
          expandedYears: notesPageState?.expandedYears,
          expandedSubjects: notesPageState?.expandedSubjects,
          expandedYear: notesPageState?.expandedYear,
          hasFilters: Object.keys(notesPageState?.filters || {}).length > 0,
          stateChanged: true
        });
      } catch (error) {
        debugLog('Error saving notes page state to sessionStorage', error);
      }
    } else {
      debugLog('Skipping save - state unchanged', {
        scrollY: notesPageState?.scrollY,
        stateChanged: false
      });
    }
  }, [notesPageState]);

  const saveNotesPageState = (state: NotesPageState) => {
    debugLog('Saving notes page state', {
      scrollY: state.scrollY,
      expandedYears: state.expandedYears,
      expandedSubjects: state.expandedSubjects,
      expandedYearsCount: state.expandedYears.length,
      expandedSubjectsCount: state.expandedSubjects.length,
      expandedYear: state.expandedYear,
      hasFilters: Object.keys(state.filters).length > 0,
      filters: state.filters
    });
    setNotesPageState(state);
  };

  const getNotesPageState = (): NotesPageState | null => {
    debugLog('Getting notes page state', { hasState: !!notesPageState });
    return notesPageState;
  };

  const clearNotesPageState = () => {
    debugLog('Clearing notes page state');
    setNotesPageState(null);
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(NOTES_STATE_KEY);
    }
  };

  // Instant scroll restoration (no animation)
  const restoreScrollPosition = (scrollY: number) => {
    // Prevent multiple simultaneous restorations
    if (isRestoringRef.current) {
      debugLog('🚫 Scroll restoration already in progress, skipping', {
        targetScrollY: scrollY,
        currentScrollY: window.scrollY
      });
      return;
    }
    
    // Set restoration lock
    isRestoringRef.current = true;
    
    debugLog('⚡ Starting instant scroll position restoration', {
      targetScrollY: scrollY,
      currentScrollY: window.scrollY,
      timestamp: new Date().toISOString(),
      pathname: pathname
    });
    
    // Check if we're at the correct page before restoring
    if (pathname !== '/notes') {
      debugLog('⚠️ Not on notes page, skipping scroll restoration', { pathname });
      isRestoringRef.current = false;
      return;
    }
    
    // Clear any existing restoration timeout
    if (restorationTimeoutRef.current) {
      clearTimeout(restorationTimeoutRef.current);
    }
    
    // Instant scroll to position (no animation)
    window.scrollTo({
      top: scrollY,
      left: 0,
      behavior: 'auto' // Instant scroll, no animation
    });
    
    debugLog('⚡ Instant scroll completed', { targetScrollY: scrollY });
    
    // Verify position immediately (no need to wait for animation)
    const currentScrollY = window.scrollY;
    const difference = Math.abs(currentScrollY - scrollY);
    
    // Check if we're close enough to the target position (within 10px tolerance)
    if (difference <= 10) {
      debugLog('✅ Instant scroll restoration successful', {
        finalScrollY: currentScrollY,
        targetY: scrollY,
        difference: difference
      });
    } else {
      debugLog('⚠️ Instant scroll not precise, applying correction', {
        finalScrollY: currentScrollY,
        targetY: scrollY,
        difference: difference
      });
      
      // Apply instant correction if needed
      window.scrollTo({
        top: scrollY,
        left: 0,
        behavior: 'auto'
      });
      
      // Final verification after correction
      setTimeout(() => {
        const finalY = window.scrollY;
        const finalDifference = Math.abs(finalY - scrollY);
        
        if (finalDifference <= 10) {
          debugLog('✅ Scroll correction successful', {
            finalScrollY: finalY,
            targetY: scrollY,
            difference: finalDifference
          });
        } else {
          debugLog('❌ Scroll restoration failed after correction', {
            finalScrollY: finalY,
            targetY: scrollY,
            difference: finalDifference
          });
        }
      }, 50); // Very short delay for instant correction
    }
    
    // Release restoration lock immediately
    isRestoringRef.current = false;
    restorationTimeoutRef.current = null;
  };

  // Determine if scroll should be preserved based on navigation pattern
  const shouldPreserveScroll = (from: string, to: string): boolean => {
    // Only preserve scroll when going back from view details to notes page
    const isFromViewDetails = from.startsWith('/notes/') && from !== '/notes';
    const isToNotesPage = to === '/notes';
    
    const result = isFromViewDetails && isToNotesPage;
    debugLog('shouldPreserveScroll check', {
      from,
      to,
      isFromViewDetails,
      isToNotesPage,
      result,
      currentPath: pathname
    });
    
    return result;
  };

  // Record navigation for tracking
  const recordNavigation = (from: string, to: string) => {
    debugLog('Navigation recorded', { from, to, currentPath: pathname });
  };

  return (
    <ScrollContext.Provider value={{
      saveNotesPageState,
      getNotesPageState,
      clearNotesPageState,
      shouldPreserveScroll,
      recordNavigation,
      restoreScrollPosition
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