'use client';

import { useState } from 'react';
import { Edit3, Send, Sparkles } from 'lucide-react';
import PromptCard from './PromptCard';
import ResilienceInput from './ResilienceInput';

interface JournalEntryProps {
  onScoreUpdate: (newScore: number) => void;
}

const todaysPrompt = {
  id: 'daily-1',
  category: 'Reflection',
  text: 'Think about a moment today when you handled a situation differently than you might have in the past. What growth does this represent?',
  type: 'growth' as const
};

export default function JournalEntry({ onScoreUpdate }: JournalEntryProps) {
  const [entry, setEntry] = useState('');
  const [emotionState, setEmotionState] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!entry.trim()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Calculate new resilience score based on entry length and emotion
    const baseScore = Math.min(entry.length * 0.1, 20);
    const emotionBonus = emotionState ? 10 : 0;
    const newScore = Math.round(Math.random() * 20 + baseScore + emotionBonus + 50);
    
    onScoreUpdate(newScore);
    setIsSubmitting(false);
    
    // Reset form
    setEntry('');
    setEmotionState('');
    
    // Show success message
    alert('Journal entry saved! Your resilience score has been updated.');
  };

  const emotions = [
    { value: 'grateful', label: '😊 Grateful', color: 'bg-yellow-500' },
    { value: 'motivated', label: '💪 Motivated', color: 'bg-green-500' },
    { value: 'calm', label: '😌 Calm', color: 'bg-blue-500' },
    { value: 'excited', label: '🎉 Excited', color: 'bg-purple-500' },
    { value: 'thoughtful', label: '🤔 Thoughtful', color: 'bg-indigo-500' },
    { value: 'peaceful', label: '🕊️ Peaceful', color: 'bg-teal-500' },
  ];

  return (
    <div className="space-y-8">
      {/* Today's Prompt */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-purple-accent" />
          Today's Prompt
        </h2>
        <PromptCard prompt={todaysPrompt} variant="interactive" />
      </div>

      {/* Journal Entry Form */}
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Edit3 className="w-5 h-5 text-purple-accent" />
          Your Reflection
        </h3>
        
        <div className="space-y-6">
          <ResilienceInput
            value={entry}
            onChange={setEntry}
            variant="textArea"
            placeholder="Share your thoughts, insights, or experiences from today..."
          />
          
          {/* Emotion Selector */}
          <div>
            <label className="text-purple-200 text-sm font-medium mb-3 block">
              How are you feeling right now? (Optional)
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {emotions.map((emotion) => (
                <button
                  key={emotion.value}
                  onClick={() => setEmotionState(emotion.value)}
                  className={`p-3 rounded-lg border transition-all duration-200 text-left ${
                    emotionState === emotion.value
                      ? 'border-purple-accent bg-purple-accent/20'
                      : 'border-white/10 bg-white/5 hover:bg-white/10'
                  }`}
                >
                  <div className="text-white text-sm font-medium">
                    {emotion.label}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={!entry.trim() || isSubmitting}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Saving...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Save Entry & Update Score
              </>
            )}
          </button>
        </div>
      </div>

      {/* Writing Tips */}
      <div className="glass-card p-6">
        <h4 className="text-white font-medium mb-3">💡 Writing Tips</h4>
        <ul className="text-purple-200 text-sm space-y-2">
          <li>• Be honest with yourself - there's no judgment here</li>
          <li>• Focus on growth and learning from challenges</li>
          <li>• Include specific examples when possible</li>
          <li>• Consider how you can apply these insights tomorrow</li>
        </ul>
      </div>
    </div>
  );
}
