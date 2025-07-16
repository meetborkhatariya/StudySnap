import React, { useState } from 'react';
import { Brain, MessageSquare, FileText, Image, Sparkles, Globe, Upload, Send, Copy, Download } from 'lucide-react';
import Header from './components/Header';
import FeatureCard from './components/FeatureCard';
import TextQuerySection from './components/TextQuerySection';
import SummarizationSection from './components/SummarizationSection';
import ImageOCRSection from './components/ImageOCRSection';
import Footer from './components/Footer';

type ActiveSection = 'home' | 'text-query' | 'summarization' | 'image-ocr';

function App() {
  const [activeSection, setActiveSection] = useState<ActiveSection>('home');

  const features = [
    {
      icon: MessageSquare,
      title: "Text Query Processing",
      description: "Ask educational questions and get structured, student-friendly explanations with step-by-step breakdowns.",
      highlights: ["Multi-language support", "Step-by-step explanations", "Practical examples", "Follow-up questions"]
    },
    {
      icon: FileText,
      title: "Content Summarization",
      description: "Transform long educational content into organized summaries with key points and study tips.",
      highlights: ["Key points extraction", "Study tips", "Practical applications", "Structured format"]
    },
    {
      icon: Image,
      title: "Image-to-Text (OCR)",
      description: "Extract text from images, handwritten notes, and scanned documents with high accuracy.",
      highlights: ["Handwritten text support", "Multi-language OCR", "Clean text output", "Document processing"]
    }
  ];

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'text-query':
        return <TextQuerySection onBack={() => setActiveSection('home')} />;
      case 'summarization':
        return <SummarizationSection onBack={() => setActiveSection('home')} />;
      case 'image-ocr':
        return <ImageOCRSection onBack={() => setActiveSection('home')} />;
      default:
        return (
          <div className="space-y-16">
            {/* Hero Section */}
            <section className="text-center py-20 px-4">
              <div className="max-w-4xl mx-auto">
                <div className="flex justify-center mb-8">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-xl opacity-30 animate-pulse"></div>
                    <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-full">
                      <Brain className="w-16 h-16 text-white" />
                    </div>
                  </div>
                </div>
                <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">
                  StudySnap AI
                </h1>
                <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
                  Your intelligent educational companion powered by Google Gemini
                </p>
                <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
                  Transform your learning experience with AI-powered text processing, content summarization, and image-to-text extraction
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <button
                    onClick={() => setActiveSection('text-query')}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 flex items-center gap-2"
                  >
                    <Sparkles className="w-5 h-5" />
                    Try Text Query
                  </button>
                  <button
                    onClick={() => setActiveSection('summarization')}
                    className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:border-blue-500 hover:text-blue-600 transition-all duration-300"
                  >
                    Explore Features
                  </button>
                </div>
              </div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-4 bg-gray-50">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">Powerful AI Features</h2>
                  <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Discover how StudySnap AI can enhance your learning and research capabilities
                  </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                  {features.map((feature, index) => (
                    <FeatureCard
                      key={index}
                      {...feature}
                      onClick={() => {
                        if (index === 0) setActiveSection('text-query');
                        if (index === 1) setActiveSection('summarization');
                        if (index === 2) setActiveSection('image-ocr');
                      }}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* Language Support Section */}
            <section className="py-20 px-4">
              <div className="max-w-4xl mx-auto text-center">
                <div className="flex justify-center mb-8">
                  <div className="bg-gradient-to-r from-green-500 to-blue-500 p-4 rounded-full">
                    <Globe className="w-12 h-12 text-white" />
                  </div>
                </div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Multi-Language Support</h2>
                <p className="text-xl text-gray-600 mb-12">
                  StudySnap AI supports multiple languages to help learners worldwide
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                    { code: 'EN', name: 'English', flag: '🇺🇸' },
                    { code: 'HI', name: 'Hindi', flag: '🇮🇳' },
                    { code: 'ES', name: 'Spanish', flag: '🇪🇸' },
                    { code: 'FR', name: 'French', flag: '🇫🇷' }
                  ].map((lang) => (
                    <div key={lang.code} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                      <div className="text-4xl mb-3">{lang.flag}</div>
                      <div className="font-semibold text-gray-900">{lang.name}</div>
                      <div className="text-sm text-gray-500">{lang.code}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                  <h2 className="text-4xl font-bold mb-4">Trusted by Learners Worldwide</h2>
                  <p className="text-xl opacity-90">
                    Experience the power of AI-enhanced education
                  </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8 text-center">
                  <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl">
                    <div className="text-4xl font-bold mb-2">2-5s</div>
                    <div className="text-lg opacity-90">Text Processing</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl">
                    <div className="text-4xl font-bold mb-2">3-8s</div>
                    <div className="text-lg opacity-90">Content Summarization</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl">
                    <div className="text-4xl font-bold mb-2">1-3s</div>
                    <div className="text-lg opacity-90">Image OCR</div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header 
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      <main>
        {renderActiveSection()}
      </main>
      <Footer />
    </div>
  );
}

export default App;