'use client';

import Link from 'next/link';
import { X } from 'lucide-react';
import { Note } from '@/types';
import { useCart } from '@/lib/cart-context';
import { getSubjectLabel } from '@/lib/sanity/api';

interface DynamicNotesSectionProps {
  notes: Note[];
  academicYear: string;
  subject: string;
}

export default function DynamicNotesSection({ notes, academicYear, subject }: DynamicNotesSectionProps) {
  const { addToCart, removeFromCart, cart } = useCart();
  const subjectLabel = getSubjectLabel(subject);

  // Filter notes for this specific year and subject
  const filteredNotes = notes.filter(note => 
    note.academicYear === academicYear && note.subject === subject
  );

  if (filteredNotes.length === 0) return null;

  return (
    <div id={`${academicYear}-${subject}`} className="mb-8 scroll-mt-24">
      <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border-l-4 border-yellow-400 p-3 rounded-lg mb-4 inline-block">
        <h3 className="text-lg font-bold text-gray-800">{subjectLabel}</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotes.map((note) => (
          <div key={note._id} className="card p-6 hover:shadow-xl transition-shadow">
            <div className="mb-3">
              <h3 className="text-xl font-bold">{note.title}</h3>
            </div>
            
            <div className="flex items-center gap-3 mb-4">
              {note.pageNumber ? (
                <div className="bg-green-100 border border-green-300 px-4 py-2 rounded-lg">
                  <span className="text-sm font-semibold text-black">
                    Page: {note.pageNumber}
                  </span>
                </div>
              ) : (
                <div className="bg-green-100 border border-green-300 px-4 py-2 rounded-lg">
                  <span className="text-sm font-semibold text-black">
                    Page: N/A
                  </span>
                </div>
              )}
              <div className="bg-green-100 border border-green-300 px-4 py-2 rounded-lg">
                <div className="flex items-center">
                  {note.originalPrice && (
                    <span className="text-gray-400 line-through text-sm mr-1">
                      ৳{note.originalPrice}
                    </span>
                  )}
                  <span className="text-sm font-semibold text-black">Price: ৳{note.price}</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Link href={`/notes/${note.slug}`} className="bg-yellow-400 text-black px-3 py-1.5 rounded-lg font-bold text-center hover:bg-yellow-500 transition-colors text-sm">
                View Details
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
    </div>
  );
}