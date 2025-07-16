import React, { useState, useRef } from 'react';
import { ArrowLeft, Image, Globe, Copy, Download, Upload, Camera } from 'lucide-react';
import { studySnapAPI } from '../services/api';

interface ImageOCRSectionProps {
  onBack: () => void;
}

const ImageOCRSection: React.FC<ImageOCRSectionProps> = ({ onBack }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [language, setLanguage] = useState('en');
  const [extractedText, setExtractedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' }
  ];

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    setIsLoading(true);
    
    try {
      const result = await studySnapAPI.extractTextFromImage({
        image: selectedFile,
        language
      });
      
      if (result.success && result.data) {
        setExtractedText(result.data);
      } else {
        setExtractedText(`❌ Error: ${result.error || 'Failed to extract text from image'}`);
      }
    } catch (error) {
      setExtractedText(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(extractedText);
  };

  const downloadText = () => {
    const blob = new Blob([extractedText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'extracted-text.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-8">
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
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-8 text-white">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-white/20 p-3 rounded-xl">
                <Camera className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">Image-to-Text (OCR)</h1>
                <p className="text-purple-100 mt-2">Extract text from images and documents</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* Upload Section */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Upload Image
                </label>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                
                <div
                  onClick={triggerFileInput}
                  className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-purple-500 hover:bg-purple-50 transition-all duration-300"
                >
                  {previewUrl ? (
                    <div className="space-y-4">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="max-h-64 mx-auto rounded-lg shadow-md"
                      />
                      <p className="text-sm text-gray-600">
                        {selectedFile?.name} ({(selectedFile?.size || 0 / 1024 / 1024).toFixed(2)} MB)
                      </p>
                      <p className="text-sm text-purple-600">Click to change image</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                      <div>
                        <p className="text-lg font-medium text-gray-700">
                          Click to upload an image
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Supports JPG, PNG, GIF, and other image formats
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex items-end">
                  <button
                    type="submit"
                    disabled={isLoading || !selectedFile}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Extracting...
                      </>
                    ) : (
                      <>
                        <Image className="w-4 h-4" />
                        Extract Text
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>

            {/* Features */}
            <div className="mt-8 bg-purple-50 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-purple-900 mb-3">🔍 OCR Features</h3>
              <div className="mb-4 p-3 bg-blue-100 rounded-lg">
                <p className="text-blue-800 text-sm">
                  <strong>Note:</strong> OCR (Image-to-Text) currently supports English language only for optimal accuracy.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-purple-800">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                    <span>Handwritten text recognition</span>
                  </div>
                  <div className="flex items-center gap-2 text-purple-800">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                    <span>Printed document processing</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-purple-800">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                    <span>English language support</span>
                  </div>
                  <div className="flex items-center gap-2 text-purple-800">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                    <span>High accuracy text extraction</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Extracted Text */}
            {extractedText && (
              <div className="mt-8 border-t pt-8">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Extracted Text</h3>
                  <div className="flex gap-2">
                    <button
                      onClick={copyToClipboard}
                      className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors duration-300"
                    >
                      <Copy className="w-4 h-4" />
                      Copy
                    </button>
                    <button
                      onClick={downloadText}
                      className="flex items-center gap-2 text-gray-600 hover:text-purple-600 transition-colors duration-300"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </div>
                </div>
                <div className="bg-gray-50 p-6 rounded-xl">
                  <pre className="whitespace-pre-wrap text-gray-800 leading-relaxed font-sans">
                    {extractedText}
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

export default ImageOCRSection;