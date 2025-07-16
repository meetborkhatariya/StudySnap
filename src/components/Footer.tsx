import React from 'react';
import { Brain, Github, Mail, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">StudySnap AI</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Your intelligent educational companion powered by Google Gemini AI.
            </p>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Features</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="hover:text-white transition-colors duration-300 cursor-pointer">Text Query Processing</li>
              <li className="hover:text-white transition-colors duration-300 cursor-pointer">Content Summarization</li>
              <li className="hover:text-white transition-colors duration-300 cursor-pointer">Image-to-Text OCR</li>
              <li className="hover:text-white transition-colors duration-300 cursor-pointer">Multi-language Support</li>
            </ul>
          </div>

          {/* Use Cases */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Use Cases</h3>
            <ul className="space-y-2 text-gray-400">
              <li className="hover:text-white transition-colors duration-300 cursor-pointer">Student Homework Help</li>
              <li className="hover:text-white transition-colors duration-300 cursor-pointer">Research Assistance</li>
              <li className="hover:text-white transition-colors duration-300 cursor-pointer">Document Processing</li>
              <li className="hover:text-white transition-colors duration-300 cursor-pointer">Study Material Creation</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="space-y-3">
              <a
                href="mailto:contact@studysnap.ai"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300"
              >
                <Mail className="w-4 h-4" />
                Contact Us
              </a>
              <a
                href="https://github.com/studysnap-ai"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm">
            © 2024 StudySnap AI. All rights reserved.
          </div>
          <div className="flex items-center gap-2 text-gray-400 text-sm mt-4 md:mt-0">
            Made with <Heart className="w-4 h-4 text-red-500" /> for educational purposes
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;