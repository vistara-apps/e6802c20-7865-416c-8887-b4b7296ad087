import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface User {
  userId: string;
  walletAddress?: string;
  resilienceScore: number;
  lastEngagementDate: string;
  emotionsLog: string[];
}

export interface JournalEntry {
  entryId: string;
  userId: string;
  promptId: string;
  userResponse: string;
  timestamp: string;
  emotionState?: string;
}

export interface Prompt {
  promptId: string;
  category: string;
  text: string;
  type: string;
}

// Database functions
export const dbFunctions = {
  // User functions
  async getUser(userId: string) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('userId', userId)
      .single();
    
    if (error) throw error;
    return data as User;
  },

  async createUser(userData: Partial<User>) {
    const { data, error } = await supabase
      .from('users')
      .insert(userData)
      .select()
      .single();
    
    if (error) throw error;
    return data as User;
  },

  async updateUser(userId: string, updates: Partial<User>) {
    const { data, error } = await supabase
      .from('users')
      .update(updates)
      .eq('userId', userId)
      .select()
      .single();
    
    if (error) throw error;
    return data as User;
  },

  // Journal entry functions
  async createJournalEntry(entryData: Partial<JournalEntry>) {
    const { data, error } = await supabase
      .from('journal_entries')
      .insert(entryData)
      .select()
      .single();
    
    if (error) throw error;
    return data as JournalEntry;
  },

  async getUserJournalEntries(userId: string, limit = 10) {
    const { data, error } = await supabase
      .from('journal_entries')
      .select('*')
      .eq('userId', userId)
      .order('timestamp', { ascending: false })
      .limit(limit);
    
    if (error) throw error;
    return data as JournalEntry[];
  },

  // Prompt functions
  async getPrompts(category?: string) {
    let query = supabase.from('prompts').select('*');
    
    if (category) {
      query = query.eq('category', category);
    }
    
    const { data, error } = await query;
    
    if (error) throw error;
    return data as Prompt[];
  },

  async getPrompt(promptId: string) {
    const { data, error } = await supabase
      .from('prompts')
      .select('*')
      .eq('promptId', promptId)
      .single();
    
    if (error) throw error;
    return data as Prompt;
  }
};
