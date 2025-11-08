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
        <section className="bg-gradient-to-b from-yellow-50 to-white py-4 md:py-8">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl md:text-5xl font-bold text-black mb-2 md:mb-4">
                Notes and Guidance for Medical Students
              </h1>
              <p className="text-lg md:text-xl text-gray-700 mb-3 md:mb-4 max-w-2xl mx-auto">
                An initiative to help students study better, develop concepts and become better doctors ❤️
              </p>
              <p className="text-lg md:text-xl font-bold text-gray-800 mb-3 md:mb-4 max-w-2xl mx-auto">
                #UnderstandNotMemorize
              </p>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-12 md:py-16 bg-white">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center">
                <div className="mb-8">
                  <div className="w-80 h-96 mx-auto overflow-hidden mb-4 rounded-full shadow-lg">
                    <Image
                      src="/autho.jpeg"
                      alt="Prayas Raj Ojha"
                      width={320}
                      height={384}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-black mb-2">@Prayas Raj Ojha</h3>
                </div>
                
                <div className="mb-6">
                  <div className="space-y-2">
                    <p className="text-lg font-bold">🎉 Honours in Anatomy </p>
                    <p className="text-lg font-bold">🎉 Honours in Community Medicine </p>
                    <p className="text-lg font-bold">🎉 Honours in Microbiology </p>
                    <p className="text-lg font-bold">🎉 Honours in Pharmacology </p>
                    <p className="text-lg font-bold">🥳 Rank 1 CMC - 2nd PROF </p>
                    <p className="text-lg font-bold">🥳 Rank 7 CMC - Final PROF </p>
                  </div>
                </div>
                
                <div className="bg-yellow-100 inline-block rounded-lg px-4 py-2">
                  <h4 className="text-lg font-semibold text-black">Chittagong Medical College</h4>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Need Guidance Section */}
        <section className="py-12 md:py-8 bg-gradient-to-b from-blue-50 to-purple-50 rounded-3xl mx-4 md:mx-8">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-black mb-4">Need Guidance?</h2>
                <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">I Teach Medical students</h3>
                
                <div className="bg-white rounded-3xl p-6 md:p-8 shadow-lg mb-4">
                  <div className="space-y-4 mb-6">
    
                    <p className="text-xl md:text-2xl font-bold text-red-500">
                      Understanding is Fun ❤️
                    </p>
                    <p className="text-xl md:text-2xl font-bold">
                      ✅ Tuitions avilable for medical students
                    </p>
                  </div>
                  
                
                  
                  <div className="bg-yellow-50 rounded-lg p-6 mb-8 text-center">
                    <h4 className="text-lg font-bold text-black mb-4">Tips on</h4>
                    <ul className="space-y-3 text-gray-700 text-center">
                      <li className="flex flex-col items-center justify-center">
                        <span className="mb-1">🎯 How to study?</span>
                        <span>In the most effective way ✨</span>
                      </li>
                      <li className="flex flex-col items-center justify-center">
                        <span className="mb-1">🎯 Which questions are important?</span>
                        <span>For each exam ✨</span>
                      </li>
                      <li className="flex flex-col items-center justify-center">
                        <span className="mb-1">🎯 How to answer in exams?</span>
                        <span>The best practices ✨</span>
                      </li>
                      <li className="flex flex-col items-center justify-center">
                        <span className="mb-1">🎯 What to focus on for exams?</span>
                        <span>To study effiecntly ✨</span>
                      </li>
                      <li className="flex flex-col items-center justify-center">
                        <span className="mb-1">🎯 What resources I use in my own studies?</span>
                        <span>To make studing easier ✨</span>
                      </li>
                      <li className="flex items-center justify-center">
                        <span>And MUCH MORE! 🎉</span>
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

        {/* Features Section - Hidden */}
        {/* <section className="pt-6 pb-6 bg-white">
          <div className="container">
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-8 h-8 text-black" />
                </div>
                <div className="bg-yellow-100 rounded-full px-6 py-3 text-center shadow-lg">
                  <h3 className="text-lg font-semibold">EASY EXPLANATIONS</h3>
                  <p className="text-sm font-medium text-gray-700">Understand not memorize</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Target className="w-8 h-8 text-black" />
                </div>
                <div className="bg-yellow-100 rounded-full px-6 py-3 text-center shadow-lg">
                  <h3 className="text-lg font-semibold">EXAM FOCUSED</h3>
                  <p className="text-sm font-medium text-gray-700">Make best use of your time</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <RefreshCw className="w-8 h-8 text-black" />
                </div>
                <div className="bg-yellow-100 rounded-full px-6 py-3 text-center shadow-lg">
                  <h3 className="text-lg font-semibold">QUICK REVIEW</h3>
                  <p className="text-sm font-medium text-gray-700">Fastest way to cover syllabus</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <FileText className="w-8 h-8 text-black" />
                </div>
                <div className="bg-yellow-100 rounded-full px-6 py-3 text-center shadow-lg">
                  <h3 className="text-lg font-semibold">LECTURE NOTES</h3>
                  <p className="text-sm font-medium text-gray-700">Answers from trusted sources</p>
                </div>
              </div>
            </div>
          </div>
        </section> */}

        {/* Image Slideshow Section */}
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="container">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-black mb-8">🎉 SAMPLES 🎉</h2>
              <ImageSlideshow />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-16 bg-black text-white">
          <div className="container text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">SUPERCHARGE YOUR STUDIES</h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Check out these notes I have made with many years of hardwork and passsion for my own exam preperation ❤️
              <br />
              <br />
              Hope it will help you understand complex concepts and score better in your exams ✨
            </p>
            <Link href="/notes" className="btn-gradient-border inline-flex whitespace-nowrap">
              SEE ALL NOTES
            </Link>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
