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
  const { saveScrollPosition, restoreScrollPosition } = useScroll();

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

  // Save scroll position when leaving the page
  useEffect(() => {
    const handleScroll = () => {
      saveScrollPosition('notes-page', {
        x: window.scrollX,
        y: window.scrollY
      });
    };

    // Save scroll position before unmounting (when navigating away)
    const handleBeforeUnload = () => {
      saveScrollPosition('notes-page', {
        x: window.scrollX,
        y: window.scrollY
      });
    };

    // Save position when page is hidden (when navigating to another page)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        saveScrollPosition('notes-page', {
          x: window.scrollX,
          y: window.scrollY
        });
      }
    };

    // Add scroll event listener to save position continuously
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Save position when user is about to leave the page
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    // Save position when page is hidden (navigation)
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [saveScrollPosition]);

  // Restore scroll position after content is loaded
  useEffect(() => {
    if (!isLoading) {
      // Use multiple attempts to ensure scroll position is restored
      const restoreScroll = () => {
        const savedPosition = restoreScrollPosition('notes-page');
        if (savedPosition) {
          console.log('Restoring scroll position:', savedPosition);
          window.scrollTo(savedPosition.x, savedPosition.y);
          
          // Verify the scroll position was applied
          setTimeout(() => {
            if (window.scrollY !== savedPosition.y) {
              console.log('Scroll position not applied, trying again');
              window.scrollTo(savedPosition.x, savedPosition.y);
            }
          }, 50);
        }
      };

      // First attempt after a short delay
      const timeoutId1 = setTimeout(restoreScroll, 100);
      
      // Second attempt after a longer delay to ensure content is fully rendered
      const timeoutId2 = setTimeout(restoreScroll, 300);

      return () => {
        clearTimeout(timeoutId1);
        clearTimeout(timeoutId2);
      };
    }
  }, [isLoading, restoreScrollPosition]);

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
    setExpandedYears(prev => {
      const newSet = new Set(prev);
      if (newSet.has(year)) {
        newSet.delete(year);
      } else {
        newSet.add(year);
      }
      return newSet;
    });
  };

  const toggleSubjectExpansion = (subjectKey: string) => {
    setExpandedSubjects(prev => {
      const newSet = new Set(prev);
      if (newSet.has(subjectKey)) {
        newSet.delete(subjectKey);
      } else {
        newSet.add(subjectKey);
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
                          {note.price === null || note.price === undefined ? <p>❌ Missing price</p> : <p>✅ Price: ৳{note.price}</p>}
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