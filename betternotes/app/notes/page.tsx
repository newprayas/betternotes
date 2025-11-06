'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Filter, BookOpen, X } from 'lucide-react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import DynamicNotesSection from '@/components/notes/dynamic-notes-section';
import { Note, NoteFilters } from '@/types';
import { getNotes, getSubjectYearCombinations, getYearLabel, getYearColorScheme } from '@/lib/sanity/api';
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
  const [isFilterOpen, setIsFilterOpen] = useState(false);
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
    // Apply filters
    let result = [...notes];

    if (filters.academicYear) {
      result = result.filter(note => note.academicYear === filters.academicYear);
    }

    if (filters.subject) {
      result = result.filter(note => note.subject === filters.subject);
    }

    setFilteredNotes(result);
  }, [notes, filters]);

  const handleFilterChange = (filterType: keyof NoteFilters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value || undefined,
    }));
  };

  const clearFilters = () => {
    setFilters({});
  };

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

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

          {/* Filters */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              {/* Filter Toggle Button */}
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Filter className="w-5 h-5 mr-2" />
                Filters
                {activeFiltersCount > 0 && (
                  <span className="ml-2 px-2 py-1 bg-yellow-400 text-black text-xs font-semibold rounded-lg">
                    {activeFiltersCount}
                  </span>
                )}
              </button>
            </div>

            {/* Filters Panel */}
            {isFilterOpen && (
              <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-lg">Filter Notes</h3>
                  <button
                    onClick={clearFilters}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Clear All
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Academic Year Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Academic Year
                    </label>
                    <select
                      value={filters.academicYear || ''}
                      onChange={(e) => handleFilterChange('academicYear', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    >
                      <option value="">All Years</option>
                      {academicYears.map(year => (
                        <option key={year.value} value={year.value}>
                          {year.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Subject Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <select
                      value={filters.subject || ''}
                      onChange={(e) => handleFilterChange('subject', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                    >
                      <option value="">All Subjects</option>
                      {subjects.map(subject => (
                        <option key={subject.value} value={subject.value}>
                          {subject.label}
                        </option>
                      ))}
                    </select>
                  </div>

                </div>
              </div>
            )}

            {/* Active Filters Display */}
            {activeFiltersCount > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {filters.academicYear && (
                  <span className="inline-flex items-center px-3 py-1 rounded-lg text-sm bg-gray-100 text-gray-800">
                    Academic Year: {academicYears.find(y => y.value === filters.academicYear)?.label}
                    <button
                      onClick={() => handleFilterChange('academicYear', '')}
                      className="ml-2 text-gray-500 hover:text-gray-700"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {filters.subject && (
                  <span className="inline-flex items-center px-3 py-1 rounded-lg text-sm bg-gray-100 text-gray-800">
                    Subject: {subjects.find(s => s.value === filters.subject)?.label}
                    <button
                      onClick={() => handleFilterChange('subject', '')}
                      className="ml-2 text-gray-500 hover:text-gray-700"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
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
                    <div className={`${yearColors.bg} border-l-4 ${yearColors.border} p-4 rounded-lg mb-6 inline-block`}>
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