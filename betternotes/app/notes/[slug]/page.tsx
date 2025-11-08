'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowLeft,
  ShoppingCart,
  Download,
  BookOpen,
  Calendar,
  Tag,
  X
} from 'lucide-react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { useCart } from '@/lib/cart-context';
import { useScroll } from '@/lib/scroll-context';
import { Note } from '@/types';
import { getNoteBySlug, getSubjectName } from '@/lib/sanity/api';
import { urlFor } from '@/lib/sanity/client';

export default function NotePage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [note, setNote] = useState<Note | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const { addToCart, removeFromCart, cart } = useCart();

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

  // Always start at top for view details page
  useEffect(() => {
    console.log('[DETAIL-PAGE] Forcing scroll to top', {
      slug,
      initialScrollY: window.scrollY,
      timestamp: new Date().toISOString()
    });
    
    // Force scroll to top immediately
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    
    console.log('[DETAIL-PAGE] Immediate scroll to top applied', {
      afterScrollY: window.scrollY
    });
    
    // Double-check after a short delay to ensure it's at top
    const timeoutId1 = setTimeout(() => {
      if (window.scrollY !== 0) {
        console.log('[DETAIL-PAGE] Scroll not at 0 after 100ms, forcing again', {
          currentScrollY: window.scrollY
        });
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      } else {
        console.log('[DETAIL-PAGE] Scroll successfully at 0 after 100ms');
      }
    }, 100);
    
    // Final check after a longer delay
    const timeoutId2 = setTimeout(() => {
      if (window.scrollY !== 0) {
        console.log('[DETAIL-PAGE] Final scroll correction needed', {
          currentScrollY: window.scrollY
        });
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      } else {
        console.log('[DETAIL-PAGE] Scroll position confirmed at 0');
      }
    }, 300);
    
    return () => {
      clearTimeout(timeoutId1);
      clearTimeout(timeoutId2);
    };
  }, [slug]);

  // Save current path before unmounting
  useEffect(() => {
    // Set the current path as previous path when the detail page loads
    const currentPath = `/notes/${slug}`;
    console.log('[DETAIL-PAGE] Setting previous path for navigation tracking', {
      currentPath,
      timestamp: new Date().toISOString()
    });
    sessionStorage.setItem('previous-path', currentPath);
    
    return () => {
      console.log('[DETAIL-PAGE] Unmounting, previous path already set', {
        currentPath,
        timestamp: new Date().toISOString()
      });
    };
  }, [slug]);

  const handleAddToCart = () => {
    if (note) {
      const isInCart = cart.items.some(item => item.note._id === note._id);
      if (isInCart) {
        removeFromCart(note._id);
      } else {
        addToCart(note);
      }
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
    if (note && note.images && note.images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % (note.images?.length || 1));
    }
  };

  const prevImage = () => {
    if (note && note.images && note.images.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + (note.images?.length || 1)) % (note.images?.length || 1));
    }
  };

  const formatSubject = (subject: any) => {
    if (!subject) return 'Subject not available';
    return getSubjectName(subject);
  };

  const formatAcademicYear = (year: string | undefined) => {
    if (!year) return 'Academic year not available';
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
            <Link
              href="/notes"
              className="flex items-center text-gray-600 hover:text-black transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Notes
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Gallery */}
            <div>
              {note.images && note.images.length > 0 ? (
                <div>
                  <div className="relative bg-gray-100 rounded-lg overflow-hidden" style={{ aspectRatio: '3/4', maxWidth: '400px', margin: '0 auto' }}>
                    {note.images[currentImageIndex]?.asset ? (
                      <Image
                        src={urlFor(note.images[currentImageIndex]).width(800).url()}
                        alt={`${note.title || 'Note'} - Page ${currentImageIndex + 1}`}
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
                    {note.images && note.images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/90 text-white rounded-lg p-3 shadow-lg hover:bg-black transition-all hover:scale-105"
                          aria-label="Previous image"
                        >
                          <ArrowLeft className="w-6 h-6" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/90 text-white rounded-lg p-3 shadow-lg hover:bg-black transition-all hover:scale-105"
                          aria-label="Next image"
                        >
                          <ArrowLeft className="w-6 h-6 rotate-180" />
                        </button>
                      </>
                    )}
                  </div>
                  
                  {/* Thumbnail Gallery */}
                  {note.images && note.images.length > 1 && (
                    <div className="flex gap-2 mt-4 overflow-x-auto justify-center">
                      {note.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                            index === currentImageIndex ? 'border-yellow-400' : 'border-gray-200'
                          }`}
                        >
                          <div className="relative w-full h-full">
                            {image?.asset ? (
                              <Image
                                src={urlFor(image).width(64).height(64).url()}
                                alt={`${note.title} - Page ${index + 1}`}
                                fill
                                className="object-cover"
                                sizes="64px"
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
                <div className="relative bg-gray-100 rounded-lg overflow-hidden" style={{ aspectRatio: '3/4', maxWidth: '400px', margin: '0 auto' }}>
                  <div className="w-full h-full bg-gray-200 flex flex-col items-center justify-center text-center p-4">
                    <BookOpen className="w-24 h-24 text-gray-400 mb-4" />
                    <p className="text-gray-500 font-semibold">No preview available</p>
                    <p className="text-gray-400 text-sm mt-2">Images for this note will be available after purchase</p>
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
              <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">{note.title}</h1>


              {/* Description */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Description</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {note.description ? note.description : 'No description available for this note.'}
                </p>
              </div>

              {/* Pages Info - Smaller Display */}
              {note.pageNumber && (
                <div className="mb-2">
                  <div className="bg-green-100 border border-green-300 px-3 py-1 rounded-lg inline-block">
                    <span className="text-sm font-medium text-black">
                      Pages: {note.pageNumber} +
                    </span>
                  </div>
                </div>
              )}

              {/* Price Info - Smaller styling */}
              <div className="mb-6">
                <div className="bg-green-100 border border-green-300 px-3 py-1 rounded-lg inline-block">
                  <div className="flex items-center">
                    {note.originalPrice && (
                      <span className="text-gray-400 line-through text-sm mr-2">
                        {note.originalPrice} tk
                      </span>
                    )}
                    <span className="text-sm font-medium text-black">Price: {note.price || 0} tk</span>
                    {note.originalPrice && note.price && (
                      <span className="ml-2 px-2 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded">
                        {Math.round(((note.originalPrice - note.price) / note.originalPrice) * 100)}% OFF
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mb-6">

                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleAddToCart}
                    className={`flex items-center px-4 py-2 rounded-lg font-bold transition-colors inline-flex whitespace-nowrap text-base self-start ${
                      cart.items.some(item => item.note._id === note._id)
                        ? 'bg-red-100 text-red-700 hover:bg-red-200 border border-red-300'
                        : 'bg-yellow-400 text-black hover:bg-yellow-500'
                    }`}
                  >
                    {cart.items.some(item => item.note._id === note._id) ? (
                      <>
                        <X className="w-4 h-4 mr-2" />
                        Remove
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </>
                    )}
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