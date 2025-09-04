'use client';

import { Share2, Heart, Trophy } from 'lucide-react';

interface SocialShareButtonProps {
  type: 'shareScore' | 'shareMilestone';
  data: {
    score?: number;
    milestone?: string;
  };
}

export default function SocialShareButton({ type, data }: SocialShareButtonProps) {
  const handleShare = async () => {
    let shareText = '';
    
    if (type === 'shareScore' && data.score) {
      shareText = `Just hit a resilience score of ${data.score}! 💪 Building emotional strength one day at a time with @ResilienceLoop #ResilienceLoop #EmotionalWellness`;
    } else if (type === 'shareMilestone' && data.milestone) {
      shareText = `🎉 Milestone achieved: ${data.milestone}! Grateful for this journey of emotional growth. #ResilienceLoop #PersonalGrowth`;
    }

    // In a real implementation, this would integrate with Farcaster API
    // For now, we'll copy to clipboard and show a notification
    try {
      await navigator.clipboard.writeText(shareText);
      alert('Share text copied to clipboard! Paste it in your Farcaster client.');
    } catch (err) {
      console.error('Failed to copy text:', err);
      alert('Share text: ' + shareText);
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'shareScore':
        return Heart;
      case 'shareMilestone':
        return Trophy;
      default:
        return Share2;
    }
  };

  const Icon = getIcon();

  return (
    <button
      onClick={handleShare}
      className="bg-purple-accent/20 hover:bg-purple-accent/30 text-purple-accent border border-purple-accent/30 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2"
    >
      <Icon className="w-4 h-4" />
      Share
    </button>
  );
}
