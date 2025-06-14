import { useEffect, useState } from 'react';
import { GameStats, DEFAULT_STATS } from '../types/game';
import '../styles/Stats.css';

interface StatsProps {
  isOpen: boolean;
  onClose: () => void;
  currentAttempts: number;
  won: boolean;
}

const Stats = ({ isOpen, onClose, currentAttempts, won }: StatsProps) => {
  const [stats, setStats] = useState<GameStats>(DEFAULT_STATS);

  useEffect(() => {
    const savedStats = localStorage.getItem('wordleStats');
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      const newStats = { ...stats };
      newStats.gamesPlayed += 1;
      
      if (won) {
        newStats.gamesWon += 1;
        newStats.currentStreak += 1;
        newStats.maxStreak = Math.max(newStats.maxStreak, newStats.currentStreak);
        // Add 1 to currentAttempts since it's 0-based in the game but 1-based in stats
        newStats.guessDistribution[currentAttempts + 1] += 1;
      } else {
        newStats.currentStreak = 0;
      }
      
      newStats.lastPlayed = new Date().toISOString();
      setStats(newStats);
      localStorage.setItem('wordleStats', JSON.stringify(newStats));
    }
  }, [isOpen, won, currentAttempts]);

  if (!isOpen) return null;

  const winPercentage = stats.gamesPlayed > 0 
    ? Math.round((stats.gamesWon / stats.gamesPlayed) * 100) 
    : 0;

  // Calculate the maximum count for bar scaling
  const maxCount = Math.max(...Object.values(stats.guessDistribution));
  const totalWins = Object.values(stats.guessDistribution).reduce((sum, count) => sum + count, 0);

  return (
    <div className="stats-modal">
      <div className="stats-content">
        <h2>Statistics</h2>
        <div className="stats-grid">
          <div className="stat-box">
            <div className="stat-value">{stats.gamesPlayed}</div>
            <div className="stat-label">Played</div>
          </div>
          <div className="stat-box">
            <div className="stat-value">{winPercentage}</div>
            <div className="stat-label">Win %</div>
          </div>
          <div className="stat-box">
            <div className="stat-value">{stats.currentStreak}</div>
            <div className="stat-label">Current Streak</div>
          </div>
          <div className="stat-box">
            <div className="stat-value">{stats.maxStreak}</div>
            <div className="stat-label">Max Streak</div>
          </div>
        </div>

        <h3>Guess Distribution</h3>
        <div className="distribution">
          {Object.entries(stats.guessDistribution).map(([guesses, count]) => {
            const percentage = totalWins > 0 ? (count / totalWins) * 100 : 0;
            return (
              <div key={guesses} className="distribution-row">
                <div className="guess-number">{guesses}</div>
                <div className="guess-bar">
                  <div 
                    className="guess-bar-fill"
                    style={{ 
                      width: `${percentage}%`,
                      backgroundColor: won && currentAttempts + 1 === parseInt(guesses) ? '#538d4e' : '#818384'
                    }}
                  />
                </div>
                <div className="guess-count">{count}</div>
              </div>
            );
          })}
        </div>

        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Stats; 