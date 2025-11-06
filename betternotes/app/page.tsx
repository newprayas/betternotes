import Link from 'next/link';
import Image from 'next/image';
import { Star, BookOpen, Users, Award } from 'lucide-react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import ImageSlideshow from '@/components/ui/image-slideshow';

export default async function Home() {
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
              <div className="flex justify-center">
                <Link href="/notes" className="btn-primary text-lg px-6 py-3">
                  SEE ALL NOTES
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-12 md:py-16 bg-white">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center">
                <div className="mb-8">
                  <div className="w-48 h-64 mx-auto overflow-hidden mb-4 rounded-full">
                    <Image
                      src="/Asset/autho.jpeg"
                      alt="Prayas Raj Ojha"
                      width={192}
                      height={256}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-black mb-2">@Prayas Raj Ojha</h3>
                </div>
                
                <div className="mb-8">
                  <div className="space-y-2">
                    <p className="text-lg font-bold">Honours in Anatomy</p>
                    <p className="text-lg font-bold">Honours in Community Medicine</p>
                    <p className="text-lg font-bold">Honours in Microbiology</p>
                    <p className="text-lg font-bold">Honours in Pharmacology</p>
                    <p className="text-lg font-bold">Rank 1 in CMC - 2nd PROF</p>
                    <p className="text-lg font-bold">Rank 7 in CMC - FINAL PROF</p>
                  </div>
                </div>
                
                <div className="bg-gray-100 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-black mb-2">Chittagong Medical College</h4>
                </div>
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

        {/* Image Slideshow Section */}
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <ImageSlideshow />
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
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
