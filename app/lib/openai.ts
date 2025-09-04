import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  dangerouslyAllowBrowser: true,
});

export interface PromptGenerationOptions {
  category?: string;
  emotionState?: string;
  previousEntries?: string[];
  personalityType?: string;
}

export const aiService = {
  async generateCustomPrompt(options: PromptGenerationOptions): Promise<string> {
    const { category = 'reflection', emotionState, previousEntries, personalityType } = options;

    const systemPrompt = `You are a compassionate AI coach specializing in emotional resilience and personal growth. Generate thoughtful, actionable journaling prompts that help users build emotional resilience.

Guidelines:
- Keep prompts concise but meaningful (1-2 sentences max)
- Focus on growth, learning, and positive reframing
- Make prompts actionable and specific
- Encourage self-reflection without being overwhelming
- Adapt to the user's current emotional state when provided

Category: ${category}
Current emotion: ${emotionState || 'not specified'}
Previous themes: ${previousEntries?.join(', ') || 'none'}
Personality type: ${personalityType || 'not specified'}`;

    try {
      const completion = await openai.chat.completions.create({
        model: 'google/gemini-2.0-flash-001',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Generate a personalized resilience journaling prompt for the ${category} category.` }
        ],
        max_tokens: 150,
        temperature: 0.8,
      });

      return completion.choices[0]?.message?.content || 'What is one thing you learned about yourself today?';
    } catch (error) {
      console.error('Error generating prompt:', error);
      return 'What is one thing you learned about yourself today?';
    }
  },

  async analyzeJournalEntry(entry: string): Promise<{
    sentiment: 'positive' | 'neutral' | 'negative';
    themes: string[];
    resilienceFactors: string[];
    suggestion?: string;
  }> {
    const systemPrompt = `You are an AI wellness coach analyzing journal entries for emotional resilience patterns. Analyze the entry and provide insights in JSON format.

Return exactly this structure:
{
  "sentiment": "positive" | "neutral" | "negative",
  "themes": ["theme1", "theme2"],
  "resilienceFactors": ["factor1", "factor2"],
  "suggestion": "brief encouraging suggestion"
}`;

    try {
      const completion = await openai.chat.completions.create({
        model: 'google/gemini-2.0-flash-001',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Analyze this journal entry: "${entry}"` }
        ],
        max_tokens: 200,
        temperature: 0.3,
      });

      const response = completion.choices[0]?.message?.content;
      if (response) {
        return JSON.parse(response);
      }
    } catch (error) {
      console.error('Error analyzing entry:', error);
    }

    // Fallback response
    return {
      sentiment: 'neutral' as const,
      themes: ['reflection'],
      resilienceFactors: ['self-awareness'],
      suggestion: 'Great job taking time to reflect on your experiences!'
    };
  },

  async generateInsights(userId: string, recentEntries: string[]): Promise<string> {
    if (recentEntries.length === 0) {
      return "Keep journaling to unlock personalized insights about your resilience journey!";
    }

    const systemPrompt = `You are an AI wellness coach providing encouraging insights based on journaling patterns. Generate a brief, positive insight about the user's resilience journey based on their recent entries.

Keep it:
- Encouraging and supportive
- Focused on growth and patterns
- Under 100 words
- Specific to their content when possible`;

    try {
      const completion = await openai.chat.completions.create({
        model: 'google/gemini-2.0-flash-001',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Recent journal entries: ${recentEntries.join(' | ')}` }
        ],
        max_tokens: 120,
        temperature: 0.7,
      });

      return completion.choices[0]?.message?.content || 
        "Your commitment to self-reflection shows real strength. Keep building on this foundation!";
    } catch (error) {
      console.error('Error generating insights:', error);
      return "Your commitment to self-reflection shows real strength. Keep building on this foundation!";
    }
  }
};
