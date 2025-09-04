'use client';

import { useState } from 'react';
import { MessageCircle, Lightbulb, ArrowRight, Lock } from 'lucide-react';

interface Prompt {
  id: string;
  category: string;
  text: string;
  type: string;
}

interface PromptCardProps {
  prompt: Prompt;
  variant: 'static' | 'interactive';
  isPremium?: boolean;
}

export default function PromptCard({ prompt, variant, isPremium = false }: PromptCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const categoryColors: Record<string, string> = {
    'Gratitude': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    'Growth': 'bg-green-500/20 text-green-300 border-green-500/30',
    'Reflection': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    'Future': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    'Mindfulness': 'bg-teal-500/20 text-teal-300 border-teal-500/30',
  };

  const handleUsePrompt = () => {
    if (isPremium) {
      // Handle premium prompt purchase
      alert('Premium feature - implement payment flow');
      return;
    }
    // Emit event or callback to use this prompt
    console.log('Using prompt:', prompt.id);
  };

  return (
    <div className="glass-card p-6 transition-all duration-200 hover:bg-white/10">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-accent/20 rounded-lg">
            <Lightbulb className="w-4 h-4 text-purple-accent" />
          </div>
          <span 
            className={`px-3 py-1 rounded-full text-xs font-medium border ${
              categoryColors[prompt.category] || 'bg-gray-500/20 text-gray-300 border-gray-500/30'
            }`}
          >
            {prompt.category}
          </span>
        </div>
        
        {isPremium && (
          <div className="flex items-center gap-1 text-yellow-400 text-xs">
            <Lock className="w-3 h-3" />
            Premium
          </div>
        )}
      </div>

      {/* Prompt Text */}
      <p className="text-white mb-4 leading-relaxed">
        {prompt.text}
      </p>

      {/* Actions */}
      {variant === 'interactive' && (
        <div className="flex items-center justify-between">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-purple-200 text-sm hover:text-white transition-colors flex items-center gap-1"
          >
            <MessageCircle className="w-4 h-4" />
            View Tips
          </button>
          
          <button
            onClick={handleUsePrompt}
            className="bg-purple-accent hover:bg-purple-accent/80 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2"
          >
            Use Prompt
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Expanded Tips */}
      {isExpanded && variant === 'interactive' && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <h4 className="text-white text-sm font-medium mb-2">Reflection Tips:</h4>
          <ul className="text-purple-200 text-sm space-y-1">
            <li>• Take your time to think before writing</li>
            <li>• Be specific with examples</li>
            <li>• Focus on what you learned</li>
            <li>• Consider how this applies to your future</li>
          </ul>
        </div>
      )}
    </div>
  );
}
