export interface GameStats {
  gamesPlayed: number;
  gamesWon: number;
  currentStreak: number;
  maxStreak: number;
  guessDistribution: {
    [key: number]: number; // number of guesses -> count
  };
  lastPlayed: string; // ISO date string
}

export interface GameHistory {
  date: string;
  word: string;
  attempts: number;
  won: boolean;
  guesses: string[];
}

export const DEFAULT_STATS: GameStats = {
  gamesPlayed: 0,
  gamesWon: 0,
  currentStreak: 0,
  maxStreak: 0,
  guessDistribution: {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0
  },
  lastPlayed: ''
}; 