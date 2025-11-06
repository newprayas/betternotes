'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Filter, Star, BookOpen, X } from 'lucide-react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Note, NoteFilters } from '@/types';
import { getNotes, getAcademicYears, getSubjects } from '@/lib/sanity/api';
import { urlFor } from '@/lib/sanity/client';


const academicYears = [
  { value: 'first-year', label: 'First Year' },
  { value: 'second-year', label: 'Second Year' },
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
  const [notes, setNotes] = useState<Note[]>([]); // Start with an empty array
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]); // Start with an empty array
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<NoteFilters>({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add a loading state

  // Fetch data from Sanity when the component mounts
  useEffect(() => {
    async function fetchNotes() {
      try {
        const liveNotes = await getNotes();
        setNotes(liveNotes);
        setFilteredNotes(liveNotes);
      } catch (error) {
        console.error("Failed to fetch notes:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchNotes();
  }, []);

  useEffect(() => {
    // Apply filters and search
    let result = [...notes];

    if (searchTerm) {
      result = result.filter(
        note =>
          note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          note.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (filters.academicYear) {
      result = result.filter(note => note.academicYear === filters.academicYear);
    }

    if (filters.subject) {
      result = result.filter(note => note.subject === filters.subject);
    }


    setFilteredNotes(result);
  }, [notes, searchTerm, filters]);

  const handleFilterChange = (filterType: keyof NoteFilters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value || undefined,
    }));
  };

  const clearFilters = () => {
    setFilters({});
    setSearchTerm('');
  };

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

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

          {/* Search and Filters */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              {/* Search Bar */}
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search notes by title, subject, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                />
              </div>

              {/* Filter Toggle Button */}
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
              >
                <Filter className="w-5 h-5 mr-2" />
                Filters
                {activeFiltersCount > 0 && (
                  <span className="ml-2 px-2 py-1 bg-yellow-400 text-black text-xs font-semibold rounded-full">
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
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
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800">
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
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNotes.map((note) => (
                <div key={note._id} className="card p-6 hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-gray-200 rounded-lg mb-4 overflow-hidden relative">
                    {note.coverImage ? (
                      <Image
                        src={urlFor(note.coverImage).url()}
                        alt={note.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <BookOpen className="w-12 h-12 text-gray-400" />
                      </div>
                    )}
                  </div>
                  
                  <div className="mb-2">
                    <span className="inline-block px-2 py-1 bg-yellow-100 text-black text-xs font-semibold rounded mr-2">
                      {note.subject.replace('-', ' ')}
                    </span>
                    <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded">
                      {note.academicYear.replace('-', ' ')}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-2">{note.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{note.description}</p>
                  
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 ml-2">(4.8)</span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      {note.originalPrice && (
                        <span className="text-gray-400 line-through text-sm mr-2">
                          ₹{note.originalPrice}
                        </span>
                      )}
                      <span className="text-xl font-bold text-black">₹{note.price}</span>
                    </div>
                  </div>
                  
                  <Link href={`/notes/${note.slug}`} className="btn-primary w-full text-center">
                    View Details
                  </Link>
                </div>
              ))}
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