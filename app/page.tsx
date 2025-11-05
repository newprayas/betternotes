import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star, BookOpen, Users, Award } from 'lucide-react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { getFeaturedNotes } from '@/lib/sanity/api';
import { Note } from '@/types';
import { urlFor } from '@/lib/sanity/client';

export default async function Home() {
  // We now fetch the data live from Sanity instead of using a placeholder!
  const featuredNotes: Note[] = await getFeaturedNotes();
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-yellow-50 to-white py-12 md:py-20">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl md:text-5xl font-bold text-black mb-4 md:mb-6">
                Premium Medical Notes for MBBS Students
              </h1>
              <p className="text-lg md:text-xl text-gray-700 mb-6 md:mb-8 max-w-2xl mx-auto">
                High-quality, handwritten notes created by a dedicated medical student to help you excel in your studies and exams.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/notes" className="btn-primary text-lg px-6 py-3">
                  Browse All Notes
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link href="#featured" className="btn-outline text-lg px-6 py-3">
                  View Featured
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 md:py-16 bg-white">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Comprehensive Coverage</h3>
                <p className="text-gray-600">
                  Complete notes covering all subjects and academic years for MBBS students.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Student Approved</h3>
                <p className="text-gray-600">
                  Trusted by hundreds of medical students across different universities.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Exam Focused</h3>
                <p className="text-gray-600">
                  Specially designed to help you score high in university and entrance exams.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Notes Section */}
        <section id="featured" className="py-12 md:py-16 bg-gray-50">
          <div className="container">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">Featured Notes</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Handpicked selection of our most popular and comprehensive notes
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {featuredNotes.map((note) => (
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
            
            <div className="text-center mt-8">
              <Link href="/notes" className="btn-outline">
                View All Notes
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-12 md:py-16 bg-white">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">About @Better Notes V2</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-24 h-24 text-gray-400" />
                  </div>
                </div>
                
                <div>
                  <p className="text-gray-700 mb-4">
                    Welcome to @Better Notes V2, your trusted source for high-quality medical notes. As a fellow medical student, I understand the challenges of MBBS studies and the importance of having reliable, comprehensive study materials.
                  </p>
                  <p className="text-gray-700 mb-4">
                    All notes are carefully crafted, handwritten, and designed to make complex medical concepts easier to understand. Each set of notes is updated regularly to reflect the latest curriculum and exam patterns.
                  </p>
                  <p className="text-gray-700">
                    Join hundreds of students who have already benefited from these notes and improved their academic performance. Your success is our motivation!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-16 bg-black text-white">
          <div className="container text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Excel in Your Medical Studies?</h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Get access to premium medical notes that will help you understand complex concepts and score high in your exams.
            </p>
            <Link href="/notes" className="btn-accent">
              Browse Notes Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
