'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  ShoppingCart,
  Star,
  Share2,
  Heart,
  Download,
  BookOpen,
  Calendar,
  Tag,
  Check
} from 'lucide-react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { useCart } from '@/lib/cart-context';
import { Note } from '@/types';
import { getNoteBySlug } from '@/lib/sanity/api';
import { urlFor } from '@/lib/sanity/client';

export default function NotePage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [note, setNote] = useState<Note | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const { addToCart } = useCart();

  // Fetch the note data based on the slug
  useEffect(() => {
    async function fetchNote() {
      try {
        const noteData = await getNoteBySlug(slug);
        console.log("Fetched note data:", noteData);
        console.log("Images array:", noteData?.images);
        if (noteData?.images && noteData.images.length > 0) {
          console.log("First image:", noteData.images[0]);
          console.log("Image URL:", urlFor(noteData.images[0]).url());
        }
        setNote(noteData);
      } catch (error) {
        console.error("Failed to fetch note:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchNote();
  }, [slug]);

  const handleAddToCart = () => {
    if (note) {
      addToCart(note);
      setIsAddedToCart(true);
      setTimeout(() => setIsAddedToCart(false), 2000);
    }
  };

  const handleShare = () => {
    if (note && navigator.share) {
      navigator.share({
        title: note.title,
        text: note.description,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleDownload = () => {
    // In a real app, this would trigger a download of the note
    alert('Download feature will be available after purchase');
  };

  const nextImage = () => {
    if (note && note.images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % note.images.length);
    }
  };

  const prevImage = () => {
    if (note && note.images.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + note.images.length) % note.images.length);
    }
  };

  const formatSubject = (subject: string) => {
    return subject.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const formatAcademicYear = (year: string) => {
    return year.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };


  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow bg-white flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
            <p className="text-gray-600">Loading note details...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!note) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow bg-white flex items-center justify-center">
          <div className="text-center">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-700 mb-2">Note Not Found</h1>
            <p className="text-gray-500 mb-4">The note you're looking for doesn't exist or has been removed.</p>
            <Link href="/notes" className="btn-primary">
              Browse All Notes
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow bg-white">
        <div className="container py-8">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Link href="/notes" className="flex items-center text-gray-600 hover:text-black transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Notes
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Gallery */}
            <div>
              {note.images && note.images.length > 0 ? (
                <div>
                  <div className="relative bg-gray-100 rounded-lg overflow-hidden" style={{ aspectRatio: '3/4' }}>
                    {note.images[currentImageIndex]?.asset ? (
                      <Image
                        src={urlFor(note.images[currentImageIndex]).width(800).url()}
                        alt={`${note.title} - Page ${currentImageIndex + 1}`}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority={currentImageIndex === 0}
                        onError={(e) => {
                          console.error("Image failed to load:", e);
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-center text-gray-500">
                        <div>
                          <BookOpen className="w-16 h-16 mx-auto mb-2" />
                          <p>Image not available</p>
                        </div>
                      </div>
                    )}
                    
                    {/* Navigation Arrows */}
                    {note.images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md hover:bg-white transition-all"
                          aria-label="Previous image"
                        >
                          <ArrowLeft className="w-5 h-5" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md hover:bg-white transition-all"
                          aria-label="Next image"
                        >
                          <ArrowLeft className="w-5 h-5 rotate-180" />
                        </button>
                      </>
                    )}
                  </div>
                  
                  {/* Thumbnail Gallery */}
                  {note.images.length > 1 && (
                    <div className="flex gap-2 mt-4 overflow-x-auto">
                      {note.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-all ${
                            index === currentImageIndex ? 'border-yellow-400' : 'border-gray-200'
                          }`}
                        >
                          <div className="relative w-full h-full">
                            {image?.asset ? (
                              <Image
                                src={urlFor(image).width(80).height(80).url()}
                                alt={`${note.title} - Page ${index + 1}`}
                                fill
                                className="object-cover"
                                sizes="80px"
                                onError={(e) => {
                                  console.error("Thumbnail failed to load:", e);
                                  console.error("Thumbnail URL:", urlFor(image).width(80).height(80).url());
                                }}
                              />
                            ) : (
                              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                <BookOpen className="w-6 h-6 text-gray-400" />
                              </div>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="relative bg-gray-100 rounded-lg overflow-hidden" style={{ aspectRatio: '3/4' }}>
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <BookOpen className="w-24 h-24 text-gray-400" />
                  </div>
                </div>
              )}
            </div>

            {/* Note Details */}
            <div>
              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-yellow-100 text-black text-sm font-semibold rounded">
                  {formatSubject(note.subject)}
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-semibold rounded">
                  {formatAcademicYear(note.academicYear)}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-2xl md:text-3xl font-bold text-black mb-4">{note.title}</h1>

              {/* Rating and Reviews */}
              <div className="flex items-center mb-6">
                <div className="flex text-yellow-400 mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <span className="text-gray-600 mr-2">4.8</span>
                <span className="text-gray-500">(124 reviews)</span>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Description</h2>
                <p className="text-gray-700 leading-relaxed">{note.description}</p>
              </div>

              {/* Tags */}
              {note.tags && note.tags.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-lg font-semibold mb-2">Tags</h2>
                  <div className="flex flex-wrap gap-2">
                    {note.tags.map((tag, index) => (
                      <span key={index} className="flex items-center px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                        <Tag className="w-3 h-3 mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Additional Info */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Additional Information</h2>
                <div className="space-y-2">
                  <div className="flex items-center text-gray-700">
                    <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                    Last updated: {new Date(note.updatedAt).toLocaleDateString()}
                  </div>
                  <div className="flex items-center text-gray-700">
                    <BookOpen className="w-4 h-4 mr-2 text-gray-500" />
                    Pages: 45 (estimated)
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Download className="w-4 h-4 mr-2 text-gray-500" />
                    Format: PDF
                  </div>
                </div>
              </div>

              {/* Price and Actions */}
              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    {note.originalPrice && (
                      <span className="text-gray-400 line-through text-lg mr-2">
                        ₹{note.originalPrice}
                      </span>
                    )}
                    <span className="text-3xl font-bold text-black">₹{note.price}</span>
                  </div>
                  {note.originalPrice && (
                    <span className="px-2 py-1 bg-red-100 text-red-700 text-sm font-semibold rounded">
                      {Math.round(((note.originalPrice - note.price) / note.originalPrice) * 100)}% OFF
                    </span>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleAddToCart}
                    disabled={isAddedToCart}
                    className={`flex-1 flex items-center justify-center px-6 py-3 rounded-md font-medium transition-colors ${
                      isAddedToCart
                        ? 'bg-green-500 text-white'
                        : 'bg-black text-white hover:bg-gray-800'
                    }`}
                  >
                    {isAddedToCart ? (
                      <>
                        <Check className="w-5 h-5 mr-2" />
                        Added to Cart
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-5 h-5 mr-2" />
                        Add to Cart
                      </>
                    )}
                  </button>
                  
                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className={`px-4 py-3 rounded-md border transition-colors ${
                      isLiked
                        ? 'bg-red-50 border-red-300 text-red-600'
                        : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                  </button>
                  
                  <button
                    onClick={handleShare}
                    className="px-4 py-3 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}