'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Filter, BookOpen, X } from 'lucide-react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import DynamicNotesSection from '@/components/notes/dynamic-notes-section';
import { Note, NoteFilters } from '@/types';
import { getNotes, getSubjectYearCombinations, getYearLabel, getYearColorScheme, getSubjectLabel } from '@/lib/sanity/api';
import { urlFor } from '@/lib/sanity/client';
import { useCart } from '@/lib/cart-context';

const academicYears = [
  { value: 'third-year', label: 'Third Year' },
  { value: 'fourth-year', label: 'Fourth Year' },
  { value: 'fifth-year', label: 'Fifth Year' },
];

const subjects = [
  { value: 'anatomy', label: 'Anatomy' },
  { value: 'physiology', label: 'Physiology' },
  { value: 'biochemistry', label: 'Biochemistry' },
  { value: 'pathology', label: 'Pathology' },
  { value: 'pharmacology', label: 'Pharmacology' },
  { value: 'microbiology', label: 'Microbiology' },
  { value: 'forensic-medicine', label: 'Forensic Medicine' },
  { value: 'community-medicine', label: 'Community Medicine' },
  { value: 'ent', label: 'ENT' },
  { value: 'ophthalmology', label: 'Ophthalmology' },
  { value: 'medicine', label: 'Medicine' },
  { value: 'surgery', label: 'Surgery' },
  { value: 'obgyn', label: 'Obstetrics & Gynecology' },
  { value: 'pediatrics', label: 'Pediatrics' },
];

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const [subjectYearCombinations, setSubjectYearCombinations] = useState<{academicYear: string, subject: string}[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<NoteFilters>({});
  const [expandedYear, setExpandedYear] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart, removeFromCart, cart } = useCart();

  // Fetch data from Sanity when the component mounts
  useEffect(() => {
    async function fetchData() {
      try {
        const [liveNotes, combinations] = await Promise.all([
          getNotes(),
          getSubjectYearCombinations()
        ]);
        setNotes(liveNotes);
        setFilteredNotes(liveNotes);
        setSubjectYearCombinations(combinations);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    // Don't apply filters - show all notes always
    // Filters are only used for navigation/highlighting
    setFilteredNotes(notes);
  }, [notes]);

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

  const handleSubjectClick = (academicYear: string, subject: string) => {
    setFilters({ academicYear, subject });
    const element = document.getElementById(`${academicYear}-${subject}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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
            <div className="space-y-12">
              {/* Dynamic Year Sections */}
              {Object.entries(groupedByYear).map(([year, subjects]) => {
                const yearColors = getYearColorScheme(year);
                const yearLabel = getYearLabel(year);
                
                return (
                  <div key={year}>
                    <div className="bg-white border-4 border-black p-4 rounded-lg mb-6 inline-block">
                      <h2 className="text-2xl font-bold text-black">{yearLabel}</h2>
                    </div>
                    
                    {/* Dynamic Subject Sections */}
                    {subjects.map(subject => (
                      <DynamicNotesSection
                        key={`${year}-${subject}`}
                        notes={filteredNotes}
                        academicYear={year}
                        subject={subject}
                      />
                    ))}
                  </div>
                );
              })}
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