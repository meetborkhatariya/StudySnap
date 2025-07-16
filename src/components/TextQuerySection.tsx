import React, { useState } from 'react';
import { ArrowLeft, Send, Globe, Sparkles, Copy, Download } from 'lucide-react';
import { studySnapAPI } from '../services/api';

interface TextQuerySectionProps {
  onBack: () => void;
}

const TextQuerySection: React.FC<TextQuerySectionProps> = ({ onBack }) => {
  const [query, setQuery] = useState('');
  const [language, setLanguage] = useState('en');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸' },
    { code: 'fr', name: 'French', flag: '🇫🇷' }
  ];

  const sampleQueries = [
    "Explain photosynthesis in simple terms",
    "What are Newton's laws of motion?",
    "How does the water cycle work?",
    "Explain the concept of gravity",
    "What is DNA and how does it work?"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    
    try {
      const result = await studySnapAPI.processTextQuery({
        query,
        language
      });
      
      if (result.success && result.data) {
        setResponse(result.data);
      } else {
        setResponse(`❌ Error: ${result.error || 'Failed to process query'}`);
      }
    } catch (error) {
      setResponse(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(response);
  };

  const downloadResponse = () => {
    const blob = new Blob([response], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'studysnap-response.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Section Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-white/20 p-3 rounded-xl">
                <Sparkles className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Text Query Processing</h1>
                <p className="text-blue-100 mt-2">Ask educational questions and get structured explanations</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* Query Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Your Question
                </label>
                <textarea
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ask any educational question..."
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none h-32 transition-all duration-300"
                  required
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    <Globe className="w-4 h-4 inline mr-2" />
                    Language
                  </label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  >
                    {languages.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.flag} {lang.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-end">
                  <button
                    type="submit"
                    disabled={isLoading || !query.trim()}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Ask AI
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>

            {/* Sample Queries */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Try these sample questions:</h3>
              <div className="flex flex-wrap gap-2">
                {sampleQueries.map((sample, index) => (
                  <button
                    key={index}
                    onClick={() => setQuery(sample)}
                    className="text-sm bg-gray-100 hover:bg-blue-100 text-gray-700 hover:text-blue-700 px-3 py-2 rounded-lg transition-all duration-300"
                  >
                    {sample}
                  </button>
                ))}
              </div>
            </div>

            {/* Response */}
            {response && (
              <div className="mt-8 border-t pt-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">AI Response</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={copyToClipboard}
                      className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-300"
                    >
                      <Copy className="w-4 h-4" />
                      Copy
                    </button>
                    <button
                      onClick={downloadResponse}
                      className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-300"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </div>
                </div>
                <div className="bg-gray-50 p-6 rounded-xl">
                  <pre className="whitespace-pre-wrap text-gray-800 leading-relaxed font-sans">
                    {response}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextQuerySection;