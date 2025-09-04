'use client';

import { TrendingUp, Target } from 'lucide-react';

interface ScoreDisplayProps {
  score: number;
  variant: 'current' | 'historical';
  previousScore?: number;
}

export default function ScoreDisplay({ 
  score, 
  variant, 
  previousScore 
}: ScoreDisplayProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Strong';
    if (score >= 60) return 'Growing';
    return 'Building';
  };

  const scoreDiff = previousScore ? score - previousScore : 0;

  if (variant === 'current') {
    return (
      <div className="text-center">
        <div className="flex items-center justify-center mb-2">
          <Target className="w-5 h-5 text-purple-accent mr-2" />
          <span className="text-purple-200 text-sm font-medium">Resilience Score</span>
        </div>
        
        <div className={`text-4xl font-bold ${getScoreColor(score)} mb-1`}>
          {score}
        </div>
        
        <div className="text-purple-200 text-sm">
          {getScoreLabel(score)}
        </div>

        {scoreDiff !== 0 && (
          <div className={`flex items-center justify-center mt-2 text-xs ${
            scoreDiff > 0 ? 'text-green-400' : 'text-red-400'
          }`}>
            <TrendingUp className={`w-3 h-3 mr-1 ${scoreDiff < 0 ? 'rotate-180' : ''}`} />
            {scoreDiff > 0 ? '+' : ''}{scoreDiff} from yesterday
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <div className={`text-2xl font-bold ${getScoreColor(score)}`}>
        {score}
      </div>
      <div>
        <div className="text-white font-medium">{getScoreLabel(score)}</div>
        <div className="text-purple-200 text-sm">Resilience Level</div>
      </div>
    </div>
  );
}
