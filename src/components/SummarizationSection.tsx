import React, { useState } from 'react';
import { ArrowLeft, FileText, Globe, Copy, Download, Upload } from 'lucide-react';
import { studySnapAPI } from '../services/api';

interface SummarizationSectionProps {
  onBack: () => void;
}

const SummarizationSection: React.FC<SummarizationSectionProps> = ({ onBack }) => {
  const [content, setContent] = useState('');
  const [language, setLanguage] = useState('en');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
    { code: 'es', name: 'Spanish', flag: '🇪🇸' },
    { code: 'fr', name: 'French', flag: '🇫🇷' }
  ];

  const sampleContent = `Photosynthesis is a complex biological process that occurs in plants, algae, and some bacteria. During this process, these organisms convert light energy, usually from the sun, into chemical energy stored in glucose molecules. The process takes place primarily in the chloroplasts of plant cells, specifically in structures called thylakoids.

The overall equation for photosynthesis is: 6CO2 + 6H2O + light energy → C6H12O6 + 6O2. This means that six molecules of carbon dioxide and six molecules of water, in the presence of light energy, produce one molecule of glucose and six molecules of oxygen.

Photosynthesis occurs in two main stages: the light-dependent reactions (also called the photo reactions) and the light-independent reactions (also called the Calvin cycle). The light-dependent reactions occur in the thylakoid membranes and involve the absorption of light by chlorophyll and other pigments. This energy is used to split water molecules, releasing oxygen as a byproduct and generating ATP and NADPH.

The Calvin cycle takes place in the stroma of the chloroplasts and uses the ATP and NADPH produced in the light reactions to convert carbon dioxide into glucose through a series of enzyme-catalyzed reactions. This process is crucial for life on Earth as it produces the oxygen we breathe and forms the base of most food chains.`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsLoading(true);
    
    try {
      const result = await studySnapAPI.summarizeContent({
        content,
        language
      });
      
      if (result.success && result.data) {
        setSummary(result.data);
      } else {
        setSummary(`❌ Error: ${result.error || 'Failed to summarize content'}`);
      }
    } catch (error) {
      setSummary(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(summary);
  };

  const downloadSummary = () => {
    const blob = new Blob([summary], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'studysnap-summary.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const loadSampleContent = () => {
    setContent(sampleContent);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8">
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
          <div className="bg-gradient-to-r from-green-600 to-blue-600 p-8 text-white">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-white/20 p-3 rounded-xl">
                <FileText className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Content Summarization</h1>
                <p className="text-green-100 mt-2">Transform long content into structured summaries</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* Content Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Content to Summarize
                  </label>
                  <button
                    type="button"
                    onClick={loadSampleContent}
                    className="text-sm text-blue-600 hover:text-blue-700 transition-colors duration-300"
                  >
                    Load Sample Content
                  </button>
                </div>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Paste your educational content here..."
                  className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none h-48 transition-all duration-300"
                  required
                />
                <div className="text-sm text-gray-500 mt-2">
                  {content.length} characters
                </div>
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
                    disabled={isLoading || !content.trim()}
                    className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Summarizing...
                      </>
                    ) : (
                      <>
                        <FileText className="w-4 h-4" />
                        Summarize
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>

            {/* Tips */}
            <div className="mt-8 bg-blue-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-blue-900 mb-3">💡 Tips for Better Summaries</h3>
              <ul className="space-y-2 text-blue-800">
                <li>• Provide clear, well-structured content for best results</li>
                <li>• Educational content works best (textbooks, articles, research papers)</li>
                <li>• Break very long content into smaller chunks if needed</li>
                <li>• Include context and background information when relevant</li>
              </ul>
            </div>

            {/* Summary */}
            {summary && (
              <div className="mt-8 border-t pt-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Generated Summary</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={copyToClipboard}
                      className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-300"
                    >
                      <Copy className="w-4 h-4" />
                      Copy
                    </button>
                    <button
                      onClick={downloadSummary}
                      className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-300"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </div>
                </div>
                <div className="bg-gray-50 p-6 rounded-xl">
                  <pre className="whitespace-pre-wrap text-gray-800 leading-relaxed font-sans">
                    {summary}
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

export default SummarizationSection;