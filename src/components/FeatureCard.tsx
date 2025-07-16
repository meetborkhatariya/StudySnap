import React from 'react';
import { DivideIcon as LucideIcon, ArrowRight } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  highlights: string[];
  onClick: () => void;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon: Icon, 
  title, 
  description, 
  highlights, 
  onClick 
}) => {
  return (
    <div 
      className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group border border-gray-100 hover:border-blue-200"
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-4 rounded-xl group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-8 h-8 text-blue-600" />
        </div>
        <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300" />
      </div>
      
      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
        {title}
      </h3>
      
      <p className="text-gray-600 mb-6 leading-relaxed">
        {description}
      </p>
      
      <div className="space-y-2">
        {highlights.map((highlight, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="w-2 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
            <span className="text-sm text-gray-600">{highlight}</span>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-100">
        <span className="text-blue-600 font-medium group-hover:text-purple-600 transition-colors duration-300">
          Try it now →
        </span>
      </div>
    </div>
  );
};

export default FeatureCard;