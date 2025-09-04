'use client';

import { useState, useEffect } from 'react';
import { ConnectWallet } from '@coinbase/onchainkit/wallet';
import { Identity, Name } from '@coinbase/onchainkit/identity';
import { useAccount } from 'wagmi';
import Dashboard from './components/Dashboard';
import JournalEntry from './components/JournalEntry';
import PromptCard from './components/PromptCard';
import ScoreDisplay from './components/ScoreDisplay';
import { Heart, BookOpen, TrendingUp, Users } from 'lucide-react';

export default function Home() {
  const { address, isConnected } = useAccount();
  const [currentView, setCurrentView] = useState<'dashboard' | 'journal' | 'prompts'>('dashboard');
  const [resilienceScore, setResilienceScore] = useState(0);

  // Floating icons for visual appeal
  const floatingIcons = [
    { icon: Heart, top: '10%', left: '10%', delay: '0s' },
    { icon: BookOpen, top: '20%', right: '15%', delay: '2s' },
    { icon: TrendingUp, bottom: '30%', left: '8%', delay: '4s' },
    { icon: Users, top: '60%', right: '10%', delay: '1s' },
  ];

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Floating Background Icons */}
      {floatingIcons.map((item, index) => (
        <div
          key={index}
          className="floating-icon"
          style={{
            top: item.top,
            left: item.left,
            right: item.right,
            bottom: item.bottom,
            animationDelay: item.delay,
          }}
        >
          <item.icon className="w-full h-full p-2 text-white/30" />
        </div>
      ))}

      <div className="container relative z-10">
        {/* Header */}
        <header className="flex justify-between items-center mb-12">
          <div className="text-left">
            <h1 className="text-display bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Resilience Loop
            </h1>
            <p className="text-purple-200/80 text-lg mt-2">
              Build lasting emotional resilience, one loop at a time
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            {isConnected && (
              <div className="glass-card px-4 py-2">
                <Identity
                  address={address}
                  className="text-white"
                >
                  <Name className="text-white text-sm" />
                </Identity>
              </div>
            )}
            <ConnectWallet />
          </div>
        </header>

        {/* Navigation */}
        <nav className="flex gap-2 mb-8 glass-card p-2 w-fit">
          <button
            onClick={() => setCurrentView('dashboard')}
            className={`px-6 py-2 rounded-md transition-all duration-200 ${
              currentView === 'dashboard'
                ? 'bg-purple-accent text-white'
                : 'text-purple-200 hover:bg-white/10'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setCurrentView('journal')}
            className={`px-6 py-2 rounded-md transition-all duration-200 ${
              currentView === 'journal'
                ? 'bg-purple-accent text-white'
                : 'text-purple-200 hover:bg-white/10'
            }`}
          >
            Journal
          </button>
          <button
            onClick={() => setCurrentView('prompts')}
            className={`px-6 py-2 rounded-md transition-all duration-200 ${
              currentView === 'prompts'
                ? 'bg-purple-accent text-white'
                : 'text-purple-200 hover:bg-white/10'
            }`}
          >
            Prompts
          </button>
        </nav>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card p-6 text-center">
              <ScoreDisplay score={resilienceScore} variant="current" />
            </div>
            
            <div className="glass-card p-6 text-center">
              <div className="text-2xl font-bold text-white mb-2">7</div>
              <div className="text-purple-200 text-sm">Day Streak</div>
            </div>
            
            <div className="glass-card p-6 text-center">
              <div className="text-2xl font-bold text-white mb-2">24</div>
              <div className="text-purple-200 text-sm">Total Entries</div>
            </div>
          </div>

          {/* Dynamic Content Based on View */}
          {currentView === 'dashboard' && (
            <Dashboard resilienceScore={resilienceScore} />
          )}
          
          {currentView === 'journal' && (
            <JournalEntry 
              onScoreUpdate={(newScore) => setResilienceScore(newScore)} 
            />
          )}
          
          {currentView === 'prompts' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <PromptCard 
                prompt={{
                  id: '1',
                  category: 'Gratitude',
                  text: 'What are three things you\'re grateful for today, and why do they matter to you?',
                  type: 'reflection'
                }}
                variant="static"
              />
              <PromptCard 
                prompt={{
                  id: '2',
                  category: 'Growth',
                  text: 'Describe a recent challenge you faced. What did you learn from it?',
                  type: 'growth'
                }}
                variant="interactive"
              />
              <PromptCard 
                prompt={{
                  id: '3',
                  category: 'Future',
                  text: 'What is one small step you can take tomorrow to improve your well-being?',
                  type: 'action'
                }}
                variant="static"
              />
            </div>
          )}
        </div>

        {/* Primary Action Button */}
        <div className="fixed bottom-8 right-8">
          <button 
            onClick={() => setCurrentView('journal')}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-full font-semibold shadow-glow transition-all duration-200 transform hover:scale-105"
          >
            Log My Resilience
          </button>
        </div>
      </div>
    </main>
  );
}
