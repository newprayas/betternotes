import Link from 'next/link';
import Image from 'next/image';
import { Star, BookOpen, Users, Award, Lightbulb, Brain, Target, Clock, RefreshCw, Rocket, FileText, CheckCircle } from 'lucide-react';
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
                  <div className="w-64 h-80 mx-auto overflow-hidden mb-4 rounded-full shadow-lg">
                    <Image
                      src="/autho.jpeg"
                      alt="Prayas Raj Ojha"
                      width={256}
                      height={320}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-black mb-2">@Prayas Raj Ojha</h3>
                </div>
                
                <div className="mb-8">
                  <div className="space-y-2">
                    <p className="text-lg font-bold">🎉 Honours in Anatomy </p>
                    <p className="text-lg font-bold">🎉 Honours in Community Medicine </p>
                    <p className="text-lg font-bold">🎉 Honours in Microbiology </p>
                    <p className="text-lg font-bold">🎉 Honours in Pharmacology </p>
                    <p className="text-lg font-bold">🥳 Rank 1 CMC - 2nd PROF </p>
                    <p className="text-lg font-bold">🥳 Rank 7 CMC - FINAL PROF </p>
                  </div>
                </div>
                
                <div className="bg-gray-100 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-black mb-2">Chittagong Medical College</h4>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Need Guidance Section */}
        <section className="py-12 md:py-16 bg-gradient-to-b from-blue-50 to-purple-50">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Need Guidance?</h2>
                <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">I Teach Medical students</h3>
                
                <div className="bg-white rounded-lg p-6 md:p-8 shadow-lg mb-8">
                  <div className="space-y-4 mb-6">
                    <p className="text-xl md:text-2xl font-bold text-gray-800">
                      ✨ Do you hate rote learning?
                    </p>
                    <p className="text-xl md:text-2xl font-bold text-red-500">
                      This is for you ❤️
                    </p>
                    <p className="text-xl md:text-2xl font-bold">
                      ✅ Tuitions avilable for medical students
                    </p>
                  </div>
                  
                
                  
                  <div className="text-left bg-yellow-50 rounded-lg p-6 mb-8">
                    <h4 className="text-lg font-bold text-black mb-4">Tips on</h4>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start">
                        <span className="text-black mr-2">🎯</span>
                        <span>How to study? To understand and do well in exams ✨</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-black mr-2">🎯</span>
                        <span>Which questions come during exams? To focus on what matters. ✨ </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-black mr-2">🎯</span>
                        <span>How to answer in exams? The best practices ✨ </span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-black mr-2">🎯</span>
                        <span>What to focus on for exams? What to skip? To study effiecntly ✨</span>
                      </li>
                        <li className="flex items-start">
                        <span className="text-black mr-2">🎯</span>
                        <span>What resources I use in my own studies? To make studing EASIER and enjoyable ✨</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-black mr-2">🥳</span>
                        <span>And MORE! 🎉 </span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="mb-8">
                    <a
                      href="https://t.me/prayas_ojha"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-yellow-400 text-black px-8 py-4 rounded-lg font-bold hover:bg-yellow-500 transition-colors inline-flex whitespace-nowrap text-lg"
                    >
                      CONTACT ME
                    </a>
                  </div>
                  
                  <div className="border-t pt-6">
                    <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-gray-700">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">Location:</span>
                        <span>Near Chawkbazar</span>
                      </div>
                
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="pt-0 pb-4 bg-white">
          <div className="container">
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-8 h-8 text-black" />
                </div>
                <div className="bg-yellow-100 rounded-full px-6 py-3 text-center">
                  <h3 className="text-lg font-semibold">EASY EXPLANATIONS</h3>
                  <p className="text-sm font-medium text-gray-700">Understand not memorize</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Target className="w-8 h-8 text-black" />
                </div>
                <div className="bg-yellow-100 rounded-full px-6 py-3 text-center">
                  <h3 className="text-lg font-semibold">EXAM FOCUSED</h3>
                  <p className="text-sm font-medium text-gray-700">Make best use of your time</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <RefreshCw className="w-8 h-8 text-black" />
                </div>
                <div className="bg-yellow-100 rounded-full px-6 py-3 text-center">
                  <h3 className="text-lg font-semibold">QUICK REVIEW</h3>
                  <p className="text-sm font-medium text-gray-700">Fastest way to cover syllabus</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <FileText className="w-8 h-8 text-black" />
                </div>
                <div className="bg-yellow-100 rounded-full px-6 py-3 text-center">
                  <h3 className="text-lg font-semibold">LECTURE NOTES</h3>
                  <p className="text-sm font-medium text-gray-700">Answers from trusted sources</p>
                </div>
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
            <Link href="/notes" className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-bold hover:bg-yellow-500 transition-colors inline-flex whitespace-nowrap">
              Browse Notes Now
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
