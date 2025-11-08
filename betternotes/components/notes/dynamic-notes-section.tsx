'use client';

import Link from 'next/link';
import { X } from 'lucide-react';
import { Note } from '@/types';
import { useCart } from '@/lib/cart-context';
import { useScroll } from '@/lib/scroll-context';
import { getSubjectLabel, getSubjectValue } from '@/lib/sanity/api';

interface DynamicNotesSectionProps {
  notes: Note[];
  academicYear: string;
  subject: string;
  isExpanded?: boolean;
  onToggleExpansion?: () => void;
}

export default function DynamicNotesSection({ notes, academicYear, subject, isExpanded = true, onToggleExpansion }: DynamicNotesSectionProps) {
  const { addToCart, removeFromCart, cart } = useCart();
  const { saveNotesPageState } = useScroll();
  const subjectLabel = getSubjectLabel(subject);

  // Filter notes for this specific year and subject
  const filteredNotes = notes.filter(note =>
    note.academicYear === academicYear && getSubjectValue(note.subject) === subject
  );

  if (filteredNotes.length === 0) return null;

  return (
    <div id={`${academicYear}-${subject}`} className="mb-8 scroll-mt-24">
      <button
        onClick={onToggleExpansion}
        className="flex items-center justify-between bg-red-600 text-white px-6 py-3 rounded-full mb-4 transition-all w-full max-w-fit hover:bg-red-700"
      >
        <h3 className="text-lg font-bold">{subjectLabel}</h3>
        <svg
          className={`w-6 h-6 transition-transform ml-2 ${isExpanded ? 'rotate-90' : ''}`}
          fill="none"
          stroke="white"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M9 5l7 7-7 7" />
        </svg>
      </button>
      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotes.map((note) => (
          <div key={note._id} className="card p-6 hover:shadow-xl transition-shadow">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
              <h3 className="text-xl font-bold">{note.title || 'Untitled Note'}</h3>
              <div className="flex items-center gap-2 sm:gap-3 text-sm">
                {note.pageNumber && (
                  <div className="bg-green-50 px-2 py-1 font-semibold text-black whitespace-nowrap">
                    {note.pageNumber} pages
                  </div>
                )}
                <div className="bg-green-50 px-2 py-1 font-semibold text-black whitespace-nowrap">
                  {note.originalPrice && (
                    <span className="text-gray-500 line-through mr-1">
                      {note.originalPrice} tk
                    </span>
                  )}
                  {note.price || 0} tk
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Link
                href={`/notes/${note.slug}`}
                className="bg-white border-2 border-red-600 text-black px-3 py-1.5 rounded-lg font-bold text-center hover:bg-red-50 transition-colors text-sm"
                onClick={() => {
                  // Save current scroll position when clicking "See Sample"
                  // This will be handled by the parent component
                }}
              >
                See Sample
              </Link>
              <button
                onClick={() => {
                  const isInCart = cart.items.some(item => item.note._id === note._id);
                  if (isInCart) {
                    removeFromCart(note._id);
                  } else {
                    addToCart(note);
                  }
                }}
                className={`px-3 py-1.5 font-bold rounded-lg transition-colors text-sm ${
                  cart.items.some(item => item.note._id === note._id)
                    ? 'bg-red-100 text-red-700 hover:bg-red-200 border border-red-300'
                    : 'bg-yellow-400 text-black hover:bg-yellow-500'
                }`}
              >
                {cart.items.some(item => item.note._id === note._id) ? (
                  <>
                    <X className="w-4 h-4 inline mr-1" />
                    Remove
                  </>
                ) : 'Add to Cart'}
              </button>
            </div>
          </div>
        ))}
        </div>
      )}
    </div>
  );
}