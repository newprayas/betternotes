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
    <div className="mb-8">
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-500 p-3 rounded-lg mb-4 inline-block">
        <h3 className="text-xl font-semibold text-black">{subjectLabel}</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotes.map((note) => (
          <div key={note._id} className="card p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-bold mb-3">{note.title}</h3>
            
            <div className="flex items-center justify-between mb-4">
              <div>
                {note.originalPrice && (
                  <span className="text-gray-400 line-through text-sm mr-2">
                    ৳{note.originalPrice}
                  </span>
                )}
                <span className="text-xl font-bold text-black">৳{note.price}</span>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Link href={`/notes/${note.slug}`} className="bg-black text-white px-4 py-2 rounded-lg font-bold text-center hover:bg-gray-800 transition-colors">
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
                className={`px-4 py-2 font-bold rounded-lg transition-colors ${
                  cart.items.some(item => item.note._id === note._id)
                    ? 'bg-red-600 text-white hover:bg-red-700'
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