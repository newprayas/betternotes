'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Filter, BookOpen, X } from 'lucide-react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import DynamicNotesSection from '@/components/notes/dynamic-notes-section';
import { Note, NoteFilters, Subject } from '@/types';
import { getNotes, getSubjectYearCombinations, getYearLabel, getYearColorScheme, getSubjectLabel, getSubjects, hasAllEssentialFields, getIncompleteNotes, getCompleteNotes } from '@/lib/sanity/api';
import { urlFor } from '@/lib/sanity/client';
import { useCart } from '@/lib/cart-context';
import { useScroll } from '@/lib/scroll-context';

const academicYears = [
  { value: 'third-year', label: 'Third Year' },
  { value: 'fourth-year', label: 'Fourth Year' },
  { value: 'fifth-year', label: 'Fifth Year' },
];

// We'll fetch subjects dynamically from Sanity

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const [completeNotes, setCompleteNotes] = useState<Note[]>([]);
  const [incompleteNotes, setIncompleteNotes] = useState<Note[]>([]);
  const [subjectYearCombinations, setSubjectYearCombinations] = useState<{academicYear: string, subject: string}[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<NoteFilters>({});
  const [expandedYear, setExpandedYear] = useState<string | null>(null);
  const [expandedYears, setExpandedYears] = useState<Set<string>>(new Set());
  const [expandedSubjects, setExpandedSubjects] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart, removeFromCart, cart } = useCart();
  const { saveNotesPageState, getNotesPageState, clearNotesPageState, shouldPreserveScroll, restoreScrollPosition } = useScroll();
  const [hasRestored, setHasRestored] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  const [restorationLock, setRestorationLock] = useState(false);

  // Fetch data from Sanity when the component mounts
  useEffect(() => {
    async function fetchData() {
      try {
        const [liveNotes, combinations, subjectsData] = await Promise.all([
          getNotes(),
          getSubjectYearCombinations(),
          getSubjects()
        ]);
        setNotes(liveNotes);
        setFilteredNotes(liveNotes);
        
        // Separate complete and incomplete notes
        const complete = getCompleteNotes(liveNotes);
        const incomplete = getIncompleteNotes(liveNotes);
        setCompleteNotes(complete);
        setIncompleteNotes(incomplete);
        
        setSubjectYearCombinations(combinations);
        setSubjects(subjectsData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  // Save expanded states when they change - moved outside useEffect to fix scoping
  const saveExpandedStates = () => {
    // Block all saves during restoration to prevent corruption
    if (hasRestored || isRestoring || restorationLock) {
      console.log('[NOTES-PAGE] Skipping expanded states save during restoration', {
        hasRestored,
        isRestoring,
        restorationLock
      });
      return;
    }
    
    console.log('[NOTES-PAGE] Saving expanded states', {
      expandedYears: Array.from(expandedYears),
      expandedSubjects: Array.from(expandedSubjects),
      expandedYear
    });
    
    const currentScrollY = window.scrollY;
    
    // Convert Sets to arrays for saving
    const expandedYearsArray = Array.from(expandedYears);
    const expandedSubjectsArray = Array.from(expandedSubjects);
    
    const currentState = {
      scrollY: currentScrollY,
      expandedYears: expandedYearsArray,
      expandedSubjects: expandedSubjectsArray,
      expandedYear,
      filters
    };
    
    console.log('[NOTES-PAGE] Saving expanded states with scroll', {
      scrollY: currentState.scrollY,
      expandedYears: currentState.expandedYears,
      expandedSubjects: currentState.expandedSubjects,
      expandedYearsCount: currentState.expandedYears.length,
      expandedSubjectsCount: currentState.expandedSubjects.length,
      expandedYear: currentState.expandedYear,
      hasFilters: Object.keys(currentState.filters).length > 0,
      isRestoring,
      restorationLock
    });
    
    saveNotesPageState(currentState);
  };

  // Save state when leaving the page
  useEffect(() => {
    // Track last saved state to prevent redundant saves
    let lastSavedScrollY = -1;
    let scrollTimeout: NodeJS.Timeout;
    
    const saveCurrentScrollState = (forceSave: boolean = false) => {
      // Don't save during restoration to prevent rapid saves
      if (isRestoring || restorationLock) {
        console.log('[NOTES-PAGE] Skipping save during restoration', {
          isRestoring,
          restorationLock
        });
        return;
      }
      
      const currentScrollY = window.scrollY;
      
      // Convert Sets to arrays for saving
      const expandedYearsArray = Array.from(expandedYears);
      const expandedSubjectsArray = Array.from(expandedSubjects);
      
      // Only save if scroll position has changed significantly (more than 10px) or force save
      if (forceSave || Math.abs(currentScrollY - lastSavedScrollY) > 10) {
        const currentState = {
          scrollY: currentScrollY,
          expandedYears: expandedYearsArray,
          expandedSubjects: expandedSubjectsArray,
          expandedYear,
          filters
        };
        
        console.log('[NOTES-PAGE] Auto-saving scroll state', {
          scrollY: currentState.scrollY,
          expandedYears: currentState.expandedYears,
          expandedSubjects: currentState.expandedSubjects,
          expandedYearsCount: currentState.expandedYears.length,
          expandedSubjectsCount: currentState.expandedSubjects.length,
          expandedYear: currentState.expandedYear,
          hasFilters: Object.keys(currentState.filters).length > 0,
          scrollDelta: Math.abs(currentScrollY - lastSavedScrollY),
          forceSave,
          isRestoring
        });
        
        saveNotesPageState(currentState);
        lastSavedScrollY = currentScrollY;
      }
    };

    // Save position when page is hidden (when navigating to another page)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        console.log('[NOTES-PAGE] Page hidden, saving state immediately');
        lastSavedScrollY = -1; // Force save on visibility change
        saveCurrentScrollState();
        // Set the current path as previous path for when we return
        sessionStorage.setItem('previous-path', '/notes');
      }
    };

    // Save state before page unload
    const handleBeforeUnload = () => {
      console.log('[NOTES-PAGE] Page unloading, saving state');
      lastSavedScrollY = -1; // Force save on unload
      saveCurrentScrollState();
      sessionStorage.setItem('previous-path', '/notes');
    };

    // Save state on scroll (throttled) - only if not currently restoring
    const handleScroll = () => {
      if (!hasRestored) {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(saveCurrentScrollState, 300); // Increased debounce time
      }
    };

    // Save state when clicking on navigation links
    const handleLinkClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const link = target.closest('a[href*="/notes/"]');
      if (link) {
        console.log('[NOTES-PAGE] Navigation link clicked, saving state');
        lastSavedScrollY = -1; // Force save on navigation
        saveCurrentScrollState();
        sessionStorage.setItem('previous-path', '/notes');
      }
    };

    // Add all event listeners
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('click', handleLinkClick);

    // Initial save when component mounts
    setTimeout(() => {
      lastSavedScrollY = -1; // Force initial save
      saveCurrentScrollState();
    }, 100);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleLinkClick);
      clearTimeout(scrollTimeout);
    };
  }, [saveNotesPageState, expandedYears, expandedSubjects, expandedYear, filters, hasRestored]);

  // Save scroll state when expanded states change
  useEffect(() => {
    if (hasRestored) return;
    
    const timer = setTimeout(() => {
      saveExpandedStates();
    }, 100);
    
    return () => clearTimeout(timer);
  }, [expandedYears, expandedSubjects, expandedYear, hasRestored]);

  // Check if we should restore state when component mounts
  useEffect(() => {
    if (!isLoading && !hasRestored && !restorationLock) {
      // Get the previous path from sessionStorage
      const storedPreviousPath = sessionStorage.getItem('previous-path');
      
      console.log('[NOTES-PAGE] Checking restoration conditions', {
        previousPath: storedPreviousPath,
        currentScrollY: window.scrollY,
        isLoading,
        hasRestored,
        restorationLock
      });
      
      // Only restore state if we're coming from view details page
      if (storedPreviousPath && shouldPreserveScroll(storedPreviousPath, '/notes')) {
        console.log('[NOTES-PAGE] Coming from view details, attempting to restore page state');
        
        const savedState = getNotesPageState();
        if (savedState) {
          console.log('[NOTES-PAGE] Found saved state, restoring', {
            savedScrollY: savedState.scrollY,
            expandedYearsCount: savedState.expandedYears.length,
            expandedSubjectsCount: savedState.expandedSubjects.length,
            expandedYear: savedState.expandedYear,
            hasFilters: Object.keys(savedState.filters).length > 0
          });
          
          // Set restoration lock to prevent multiple simultaneous restorations
          setRestorationLock(true);
          setIsRestoring(true);
          
          // Restore expanded states first
          console.log('[NOTES-PAGE] 🔧 Restoring expanded states', {
            expandedYears: savedState.expandedYears,
            expandedSubjects: savedState.expandedSubjects,
            expandedYear: savedState.expandedYear
          });
          
          // Restore expanded states in a single batch to prevent corruption
          const restoredExpandedYears = new Set(savedState.expandedYears);
          const restoredExpandedSubjects = new Set(savedState.expandedSubjects);
          
          setExpandedYears(restoredExpandedYears);
          setExpandedSubjects(restoredExpandedSubjects);
          setExpandedYear(savedState.expandedYear);
          setFilters(savedState.filters);
          
          // Wait for DOM to update after state changes, then restore scroll
          setTimeout(() => {
            console.log('[NOTES-PAGE] 🚀 Starting enhanced scroll restoration after state update', {
              targetScrollY: savedState.scrollY,
              currentScrollY: window.scrollY,
              expandedYearsCount: restoredExpandedYears.size,
              expandedSubjectsCount: restoredExpandedSubjects.size,
              timestamp: new Date().toISOString()
            });
            
            // Verify expanded states were restored correctly
            console.log('[NOTES-PAGE] 🔍 Verifying restored states', {
              expandedYears: Array.from(restoredExpandedYears),
              expandedSubjects: Array.from(restoredExpandedSubjects),
              expandedYear: savedState.expandedYear
            });
            
            restoreScrollPosition(savedState.scrollY);
            
            // Mark as restored to prevent further restoration attempts
            setHasRestored(true);
            
            // Clear restoration flags after a longer delay to ensure scroll restoration completes
            setTimeout(() => {
              setIsRestoring(false);
              setRestorationLock(false);
              console.log('[NOTES-PAGE] ✅ Restoration completed, re-enabling saves', {
                finalScrollY: window.scrollY,
                targetScrollY: savedState.scrollY,
                difference: Math.abs(window.scrollY - savedState.scrollY)
              });
            }, 1500); // Increased delay to ensure all restoration operations complete
          }, 500); // Increased delay to allow content to fully render after state changes
          
        } else {
          console.log('[NOTES-PAGE] No saved state found, resetting to top');
          window.scrollTo(0, 0);
          setHasRestored(true);
        }
      } else {
        // Reset to top for all other navigation scenarios
        console.log('[NOTES-PAGE] Not from view details - resetting to top', {
          previousPath: storedPreviousPath,
          shouldPreserve: storedPreviousPath ? shouldPreserveScroll(storedPreviousPath, '/notes') : false
        });
        window.scrollTo(0, 0);
        clearNotesPageState();
        setHasRestored(true);
      }
    }
  }, [isLoading, hasRestored, restorationLock, getNotesPageState, clearNotesPageState, shouldPreserveScroll, restoreScrollPosition]);

  // Save current path before unmounting
  useEffect(() => {
    return () => {
      // This will be called when navigating away from notes page
      // The actual path setting is handled in the visibility change handler
    };
  }, []);

  useEffect(() => {
    // Don't apply filters - show all notes always
    // Filters are only used for navigation/highlighting
    setFilteredNotes(completeNotes);
  }, [completeNotes]);

  const handleFilterChange = (filterType: keyof NoteFilters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value || undefined,
    }));
  };

  const clearFilters = () => {
    setFilters({});
    setExpandedYear(null);
  };

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  const handleYearClick = (year: string) => {
    if (expandedYear === year) {
      setExpandedYear(null);
    } else {
      setExpandedYear(year);
    }
  };

  const toggleYearExpansion = (year: string) => {
    console.log('[NOTES-PAGE] Toggling year expansion', { year, currentlyExpanded: expandedYears.has(year) });
    setExpandedYears(prev => {
      const newSet = new Set(prev);
      if (newSet.has(year)) {
        newSet.delete(year);
        console.log('[NOTES-PAGE] Collapsed year', { year });
      } else {
        newSet.add(year);
        console.log('[NOTES-PAGE] Expanded year', { year });
      }
      return newSet;
    });
  };

  const toggleSubjectExpansion = (subjectKey: string) => {
    console.log('[NOTES-PAGE] Toggling subject expansion', { subjectKey, currentlyExpanded: expandedSubjects.has(subjectKey) });
    setExpandedSubjects(prev => {
      const newSet = new Set(prev);
      if (newSet.has(subjectKey)) {
        newSet.delete(subjectKey);
        console.log('[NOTES-PAGE] Collapsed subject', { subjectKey });
      } else {
        newSet.add(subjectKey);
        console.log('[NOTES-PAGE] Expanded subject', { subjectKey });
      }
      return newSet;
    });
  };

  const handleSubjectClick = (academicYear: string, subject: string) => {
    setFilters({ academicYear, subject });
    
    // Auto-expand the year header if it's not already expanded
    if (!expandedYears.has(academicYear)) {
      setExpandedYears(prev => {
        const newSet = new Set(prev);
        newSet.add(academicYear);
        return newSet;
      });
    }
    
    // Auto-expand the subject header
    const subjectKey = `${academicYear}-${subject}`;
    if (!expandedSubjects.has(subjectKey)) {
      setExpandedSubjects(prev => {
        const newSet = new Set(prev);
        newSet.add(subjectKey);
        return newSet;
      });
    }
    
    // Scroll to the subject section after a short delay to allow for expansion
    setTimeout(() => {
      const element = document.getElementById(`${academicYear}-${subject}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  // Group combinations by academic year
  const groupedByYear = subjectYearCombinations.reduce((acc, combination) => {
    if (!acc[combination.academicYear]) {
      acc[combination.academicYear] = [];
    }
    acc[combination.academicYear].push(combination.subject);
    return acc;
  }, {} as Record<string, string[]>);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-gray-50">
        <div className="container py-8">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-bold text-black mb-2">All Notes</h1>
            <p className="text-gray-600">Browse our comprehensive collection of medical notes</p>
          </div>

          {/* Year Pills Filter */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-3 mb-6">
              {academicYears.slice().reverse().map(year => (
                <button
                  key={year.value}
                  onClick={() => handleYearClick(year.value)}
                  className={`px-6 py-3 font-bold rounded-full transition-colors ${
                    expandedYear === year.value
                      ? 'bg-red-700 text-white border-2 border-white shadow-[0_0_0_2px_white,0_0_0_4px_red]'
                      : 'bg-white text-red-700 border-2 border-red-700 hover:bg-red-50'
                  }`}
                >
                  {year.label}
                </button>
              ))}
            </div>
            
            {/* Red divider line between subject and year filters */}
            {expandedYear && (
              <div className="w-1/3 h-1 bg-red-600 mb-6 rounded-full"></div>
            )}
            
            {/* Subject Pills - Show when year is expanded */}
            {expandedYear && groupedByYear[expandedYear] && (
              <div className="flex flex-wrap gap-2 mb-6">
                {groupedByYear[expandedYear].map(subject => (
                  <button
                    key={`${expandedYear}-${subject}`}
                    onClick={() => handleSubjectClick(expandedYear, subject)}
                    className={`px-4 py-2 font-semibold rounded-full transition-colors ${
                      filters.subject === subject && filters.academicYear === expandedYear
                        ? 'bg-red-700 text-white border-2 border-white shadow-[0_0_0_2px_white,0_0_0_4px_red]'
                        : 'bg-white text-red-700 border-2 border-red-700 hover:bg-red-50'
                    }`}
                  >
                    {getSubjectLabel(subject)}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-600">
              Showing {filteredNotes.length} {filteredNotes.length === 1 ? 'note' : 'notes'}
            </p>
          </div>

          {/* Notes Grid */}
          {isLoading ? (
            <div className="text-center py-12">Loading notes...</div>
          ) : filteredNotes.length > 0 ? (
            <div className="space-y-6">
              {/* Dynamic Year Sections */}
              {Object.entries(groupedByYear).map(([year, subjects]) => {
                const yearColors = getYearColorScheme(year);
                const yearLabel = getYearLabel(year);
                
                return (
                  <div key={year}>
                    <button
                      onClick={() => toggleYearExpansion(year)}
                      className="flex items-center justify-between bg-white text-black px-6 py-3 rounded-full mb-6 transition-all w-full max-w-fit hover:bg-gray-50 border-4 border-red-600"
                    >
                      <h2 className="text-2xl font-bold text-black">{yearLabel}</h2>
                      <svg
                        className={`w-8 h-8 transition-transform ml-2 ${expandedYears.has(year) ? 'rotate-90' : ''}`}
                        fill="none"
                        stroke="red"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                    
                    {/* Dynamic Subject Sections - Only show if year is expanded */}
                    {expandedYears.has(year) && subjects.map(subject => {
                      const subjectKey = `${year}-${subject}`;
                      return (
                        <DynamicNotesSection
                          key={subjectKey}
                          notes={filteredNotes}
                          academicYear={year}
                          subject={subject}
                          isExpanded={expandedSubjects.has(subjectKey)}
                          onToggleExpansion={() => toggleSubjectExpansion(subjectKey)}
                        />
                      );
                    })}
                  </div>
                );
              })}
              
              {/* NULL Section for Incomplete Notes */}
              {incompleteNotes.length > 0 && (
                <div className="mt-16">
                  <div className="bg-red-50 border-4 border-red-500 p-4 rounded-lg mb-6 inline-block">
                    <h2 className="text-2xl font-bold text-red-700">NULL</h2>
                  </div>
                  <p className="text-gray-600 mb-4">Notes missing essential information</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {incompleteNotes.map((note) => (
                      <div key={note._id} className="bg-white border-2 border-red-300 rounded-lg p-4 shadow-sm">
                        <h3 className="font-semibold text-black mb-2">
                          {note.title || 'Untitled Note'}
                        </h3>
                        <div className="text-sm text-gray-600 space-y-1">
                          {!note.title && <p>❌ Missing title</p>}
                          {!note.slug && <p>❌ Missing slug</p>}
                          {note.price === null || note.price === undefined ? <p>❌ Missing price</p> : <p>✅ Price: {note.price} tk</p>}
                          {!note.academicYear && <p>❌ Missing academic year</p>}
                          {!note.subject && <p>❌ Missing subject</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No notes found</h3>
              <p className="text-gray-500 mb-4">
                Try adjusting your search or filters to find what you're looking for.
              </p>
              <button
                onClick={clearFilters}
                className="btn-outline-light"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}