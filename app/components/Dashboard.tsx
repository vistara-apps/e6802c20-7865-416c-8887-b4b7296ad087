'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { TrendingUp, Calendar, Heart, Share2 } from 'lucide-react';
import SocialShareButton from './SocialShareButton';

interface DashboardProps {
  resilienceScore: number;
}

const mockData = [
  { date: 'Mon', score: 65, mood: 'Positive' },
  { date: 'Tue', score: 72, mood: 'Motivated' },
  { date: 'Wed', score: 68, mood: 'Calm' },
  { date: 'Thu', score: 85, mood: 'Energized' },
  { date: 'Fri', score: 78, mood: 'Content' },
  { date: 'Sat', score: 92, mood: 'Joyful' },
  { date: 'Sun', score: 88, mood: 'Peaceful' },
];

export default function Dashboard({ resilienceScore }: DashboardProps) {
  return (
    <div className="space-y-8">
      {/* Resilience Score Chart */}
      <div className="glass-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-purple-accent" />
            Resilience Score Trend
          </h2>
          <div className="text-sm text-purple-200">
            Last 7 days • Average: 78
          </div>
        </div>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockData}>
              <defs>
                <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#9333ea" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#9333ea" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis 
                dataKey="date" 
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
              />
              <Area
                type="monotone"
                dataKey="score"
                stroke="#9333ea"
                strokeWidth={3}
                fill="url(#scoreGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Journal Entries */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-purple-accent" />
            Recent Entries
          </h3>
          <div className="space-y-4">
            {mockData.slice(-3).reverse().map((entry, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div>
                  <div className="text-white font-medium">{entry.date}</div>
                  <div className="text-purple-200 text-sm">{entry.mood}</div>
                </div>
                <div className="text-right">
                  <div className="text-white font-semibold">{entry.score}</div>
                  <div className="text-purple-200 text-xs">Score</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Social Activity */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Heart className="w-5 h-5 text-purple-accent" />
            Community
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-white font-medium">Farcaster Integration</div>
                <div className="text-purple-200 text-sm">Share your progress</div>
              </div>
              <SocialShareButton 
                type="shareScore" 
                data={{ score: resilienceScore }} 
              />
            </div>
            
            <div className="bg-white/5 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full"></div>
                <span className="text-white text-sm font-medium">You</span>
              </div>
              <p className="text-purple-200 text-sm">
                "Just hit a 7-day streak! Feeling more resilient every day 💪 #ResilienceLoop"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
