'use client';

import { useState } from 'react';
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
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { useCart } from '@/lib/cart-context';
import { Note } from '@/types';

// Placeholder data for now
const placeholderNote: Note = {
  _id: '1',
  title: 'Anatomy Complete Notes',
  slug: 'anatomy-complete-notes',
  description: 'Comprehensive anatomy notes covering all topics with detailed diagrams. These notes have been carefully crafted to help MBBS students understand complex anatomical structures and relationships. Each topic is explained with clear illustrations and mnemonics to aid in memorization.',
  price: 299,
  originalPrice: 399,
  images: [
    {
      asset: {
        _ref: 'image-1',
        _type: 'reference'
      }
    },
    {
      asset: {
        _ref: 'image-2',
        _type: 'reference'
      }
    },
    {
      asset: {
        _ref: 'image-3',
        _type: 'reference'
      }
    }
  ],
  academicYear: 'first-year',
  subject: 'anatomy',
  examType: 'university',
  tags: ['anatomy', 'first-year', 'diagrams', 'comprehensive'],
  featured: true,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export default function NotePage() {
  const params = useParams();
  const slug = params.slug as string;
  
  // In a real app, we would fetch the note data based on the slug
  const [note] = useState<Note>(placeholderNote);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(note);
    setIsAddedToCart(true);
    setTimeout(() => setIsAddedToCart(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
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
    setCurrentImageIndex((prev) => (prev + 1) % note.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + note.images.length) % note.images.length);
  };

  const formatSubject = (subject: string) => {
    return subject.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const formatAcademicYear = (year: string) => {
    return year.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const formatExamType = (type: string) => {
    return type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

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
              <div className="relative bg-gray-100 rounded-lg overflow-hidden" style={{ aspectRatio: '3/4' }}>
                <TransformWrapper>
                  <TransformComponent>
                    <div className="w-full h-full flex items-center justify-center">
                      {/* Placeholder for image */}
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <BookOpen className="w-24 h-24 text-gray-400" />
                      </div>
                    </div>
                  </TransformComponent>
                </TransformWrapper>
                
                {/* Navigation Arrows */}
                {note.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 shadow-md hover:bg-opacity-100 transition-all"
                      aria-label="Previous image"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 shadow-md hover:bg-opacity-100 transition-all"
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
                  {note.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-all ${
                        index === currentImageIndex ? 'border-yellow-400' : 'border-gray-200'
                      }`}
                    >
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <BookOpen className="w-8 h-8 text-gray-400" />
                      </div>
                    </button>
                  ))}
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
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded">
                  {formatExamType(note.examType)}
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