# Resilience Loop

A Base MiniApp that helps users build emotional resilience through daily journaling and gamified tracking, integrated with Farcaster for social engagement.

## Features

- **Daily Resilience Journaling**: Curated prompts designed to foster reflection and emotional resilience
- **Gamified Resilience Score**: Points-based system that quantifies daily engagement
- **Personalized Progress Dashboard**: Visual tracking of resilience trends over time
- **Farcaster Integration**: Share progress and connect with the community
- **AI-Powered Prompts**: Dynamic, personalized journaling prompts
- **Micro-transactions**: Premium features via USDC on Base

## Getting Started

1. **Clone and Install**:
   ```bash
   npm install
   ```

2. **Environment Setup**:
   - Copy `.env.local.example` to `.env.local`
   - Add your API keys:
     - OnchainKit API key from Coinbase Developer Platform
     - Supabase URL and anon key
     - OpenAI API key for AI features
     - Neynar API key for Farcaster integration

3. **Run Development Server**:
   ```bash
   npm run dev
   ```

4. **Open the App**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Database Setup (Supabase)

Create these tables in your Supabase instance:

```sql
-- Users table
CREATE TABLE users (
  userId TEXT PRIMARY KEY,
  walletAddress TEXT,
  resilienceScore INTEGER DEFAULT 0,
  lastEngagementDate TEXT,
  emotionsLog TEXT[] DEFAULT ARRAY[]::TEXT[]
);

-- Journal entries table
CREATE TABLE journal_entries (
  entryId TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
  userId TEXT REFERENCES users(userId),
  promptId TEXT,
  userResponse TEXT NOT NULL,
  timestamp TEXT DEFAULT NOW(),
  emotionState TEXT
);

-- Prompts table
CREATE TABLE prompts (
  promptId TEXT PRIMARY KEY,
  category TEXT NOT NULL,
  text TEXT NOT NULL,
  type TEXT NOT NULL
);

-- Insert sample prompts
INSERT INTO prompts (promptId, category, text, type) VALUES
  ('1', 'Gratitude', 'What are three things you are grateful for today, and why do they matter to you?', 'reflection'),
  ('2', 'Growth', 'Describe a recent challenge you faced. What did you learn from it?', 'growth'),
  ('3', 'Future', 'What is one small step you can take tomorrow to improve your well-being?', 'action'),
  ('4', 'Mindfulness', 'Take a moment to notice your current emotional state. What do you observe without judgment?', 'awareness'),
  ('5', 'Strength', 'Recall a time when you overcame a difficult situation. What strengths did you discover in yourself?', 'reflection');
```

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with custom design system
- **Blockchain**: Base network integration via OnchainKit
- **Wallet**: Wagmi + OnchainKit for wallet connections
- **Database**: Supabase for off-chain data
- **AI**: OpenAI API for dynamic prompts and insights
- **Social**: Farcaster integration via Neynar API
- **Charts**: Recharts for data visualization

## Architecture

- `/app` - Next.js app directory structure
- `/app/components` - Reusable UI components
- `/app/lib` - Utility functions and API integrations
- `/app/api` - API routes for frames and OG images

## Frame Integration

The app includes Farcaster Frame support with:
- OG image generation at `/api/og`
- Frame actions at `/api/frame`
- Meta tags for frame discovery

## Deployment

Deploy to Vercel, Railway, or any Next.js-compatible platform:

1. Connect your repository
2. Add environment variables
3. Deploy

Make sure to update `NEXT_PUBLIC_URL` to your production domain.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details.
