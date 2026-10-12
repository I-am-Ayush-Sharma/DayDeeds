export type JournalMood = "Great" | "Good" | "Okay" | "Low" | "Bad";

export interface JournalEntry {
  id: string;
  title: string;
  content: string;
  contentHtml: string;
  date: string;
  time: string;
  tags: string[];
  mood: JournalMood;
  energy: number;
  words: number;
  isDraft: boolean;
  isFavorite: boolean;
  createdAt?: string;
}

export interface JournalEntryInput {
  content: string;
  contentHtml: string;
  date: string;
  time: string;
  tags: string[];
  mood: JournalMood;
  energy: number;
  isDraft: boolean;
}

export type GetClerkToken = () => Promise<string | null>;
