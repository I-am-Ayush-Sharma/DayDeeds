export type Mood =
  | "happy"
  | "calm"
  | "focused"
  | "sad"
  | "energetic";

export interface CalendarEntry {
  id: string;
  date: string;
  title: string;
  preview: string;
  content: string;
  mood: Mood;
  moodScore: number;
  energyScore: number;
  words: number;
  image?: string;
}

export interface CalendarDay {
  date: Date;
  currentMonth: boolean;
  entry?: CalendarEntry;
}