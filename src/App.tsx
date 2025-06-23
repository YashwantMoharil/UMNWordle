import { useEffect, useState, lazy, Suspense } from 'react';
import GameBoard from './components/GameBoard';
import Keyboard from './components/KeyBoard';
import LoadingSpinner from './components/LoadingSpinner';
import './styles/KeyBoard.css';
import './styles/ResultModal.css';
import './App.css';

// Lazy load the modals
const ResultModal = lazy(() => import('./components/ResultModal'));
const Stats = lazy(() => import('./components/Stats'));

const WORD_LENGTH = 6;
const MAX_GUESSES = 6;
const SOLUTION = 'KELLER';
const HINT = 'A famous UMN building named after a former president.';

type TileStatus = 'correct' | 'present' | 'absent' | 'empty';

interface GameState {
  board: string[][];
  statuses: TileStatus[][];
  flipMap: boolean[][];
  keyStatuses: Record<string, TileStatus>;
  currentRow: number;
  currentCol: number;
  gameOver: boolean;
  gameWon: boolean;
  hasPlayedToday: boolean;
  hintClicked: boolean;
}

function App() {
  // Initialize state from localStorage or defaults
  const [gameState, setGameState] = useState<GameState>(() => {
    const savedState = localStorage.getItem('gameState');
    if (savedState) {
      const parsed = JSON.parse(savedState);
      // Only restore if it's from today
      const todayKey = new Date().toISOString().split('T')[0];
      if (parsed.date === todayKey) {
        return parsed.state;
      }
    }
    return {
      board: Array(MAX_GUESSES).fill(null).map(() => Array(WORD_LENGTH).fill('')),
      statuses: Array(MAX_GUESSES).fill(null).map(() => Array(WORD_LENGTH).fill('empty')),
      flipMap: Array(MAX_GUESSES).fill(null).map(() => Array(WORD_LENGTH).fill(false)),
      keyStatuses: {},
      currentRow: 0,
      currentCol: 0,
      gameOver: false,
      gameWon: false,
      hasPlayedToday: false,
      hintClicked: false
    };
  });

  const [showStats, setShowStats] = useState(false);
  const [showHint] = useState(true);

  // Save game state to localStorage whenever it changes
  useEffect(() => {
    const todayKey = new Date().toISOString().split('T')[0];
    localStorage.setItem('gameState', JSON.stringify({
      date: todayKey,
      state: gameState
    }));
  }, [gameState]);

  // Check if already played today
  useEffect(() => {
    const todayKey = new Date().toISOString().split('T')[0];
    const playedKey = localStorage.getItem('playedDate');
    if (playedKey === todayKey) {
      setGameState(prev => ({ ...prev, hasPlayedToday: true, gameOver: true }));
    }
  }, []);

  const handleKey = (key: string) => {
    if (gameState.gameOver) return;

    if (key === 'Backspace') {
      if (gameState.currentCol > 0) {
        const newBoard = [...gameState.board];
        newBoard[gameState.currentRow][gameState.currentCol - 1] = '';
        setGameState(prev => ({
          ...prev,
          board: newBoard,
          currentCol: prev.currentCol - 1
        }));
      }
    } else if (key === 'Enter') {
      if (gameState.currentCol === WORD_LENGTH) {
        const guess = gameState.board[gameState.currentRow].join('').toUpperCase();
        const updatedKeyStatus = { ...gameState.keyStatuses };
        const todayKey = new Date().toISOString().split('T')[0];

        if (guess === SOLUTION) {
          for (let i = 0; i < WORD_LENGTH; i++) {
            setTimeout(() => {
              const newStatuses = [...gameState.statuses];
              const newFlip = [...gameState.flipMap];
              newStatuses[gameState.currentRow][i] = 'correct';
              newFlip[gameState.currentRow][i] = true;
              updatedKeyStatus[guess[i]] = 'correct';
              setGameState(prev => ({
                ...prev,
                statuses: newStatuses,
                flipMap: newFlip,
                keyStatuses: { ...updatedKeyStatus }
              }));
            }, i * 300);
          }
          setTimeout(() => {
            localStorage.setItem('playedDate', todayKey);
            setGameState(prev => ({
              ...prev,
              gameWon: true,
              gameOver: true
            }));
            setShowStats(true);
          }, WORD_LENGTH * 300 + 100);
          return;
        }

        for (let i = 0; i < WORD_LENGTH; i++) {
          setTimeout(() => {
            const newStatuses = [...gameState.statuses];
            const newFlip = [...gameState.flipMap];
            const char = guess[i];
            if (char === SOLUTION[i]) {
              newStatuses[gameState.currentRow][i] = 'correct';
              updatedKeyStatus[char] = 'correct';
            } else if (SOLUTION.includes(char)) {
              newStatuses[gameState.currentRow][i] = 'present';
              if (updatedKeyStatus[char] !== 'correct') updatedKeyStatus[char] = 'present';
            } else {
              newStatuses[gameState.currentRow][i] = 'absent';
              if (!updatedKeyStatus[char]) updatedKeyStatus[char] = 'absent';
            }
            newFlip[gameState.currentRow][i] = true;
            setGameState(prev => ({
              ...prev,
              statuses: newStatuses,
              flipMap: newFlip,
              keyStatuses: { ...updatedKeyStatus }
            }));
          }, i * 300);
        }

        setTimeout(() => {
          if (gameState.currentRow + 1 >= MAX_GUESSES) {
            localStorage.setItem('playedDate', todayKey);
            setGameState(prev => ({
              ...prev,
              gameOver: true
            }));
            setShowStats(true);
            return;
          }
          setGameState(prev => ({
            ...prev,
            currentRow: prev.currentRow + 1,
            currentCol: 0
          }));
        }, WORD_LENGTH * 300 + 100);
      }
    } else if (/^[a-zA-Z]$/.test(key)) {
      if (gameState.currentCol < WORD_LENGTH) {
        const newBoard = [...gameState.board];
        newBoard[gameState.currentRow][gameState.currentCol] = key.toUpperCase();
        setGameState(prev => ({
          ...prev,
          board: newBoard,
          currentCol: prev.currentCol + 1
        }));
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => handleKey(e.key);
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [gameState]);

  return (
    <div className="App">
      <h1 className="umn-heading">
        UMN <span className="wordle-highlight">Wordle</span>
      </h1>

      {gameState.hasPlayedToday ? (
        <div style={{ textAlign: 'center', marginTop: '40px', fontSize: '22px' }}>
          You've already played today! Come back tomorrow.
        </div>
      ) : (
        <>
          <GameBoard
            board={gameState.board}
            statuses={gameState.statuses}
            flipMap={gameState.flipMap}
          />
          <Keyboard
            onKeyPress={handleKey}
            keyStatuses={gameState.keyStatuses}
          />

          {showHint && (
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              {gameState.currentRow < 3 ? (
                <div style={{ color: 'gray' }}>🔒 Hint available after 3 guesses!</div>
              ) : (
                <button
                  onClick={() => setGameState(prev => ({ ...prev, hintClicked: true }))}
                  style={{
                    backgroundColor: '#FFCC33',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    border: 'none',
                    fontSize: '16px'
                  }}
                >
                  {gameState.hintClicked ? 'Hint Revealed!' : 'Reveal Hint'}
                </button>
              )}
            </div>
          )}

          {gameState.hintClicked && (
            <div style={{ textAlign: 'center', marginTop: '10px', fontSize: '18px' }}>
              🔍 Hint: {HINT}
            </div>
          )}

          <Suspense fallback={<LoadingSpinner />}>
            <ResultModal
              isOpen={gameState.gameOver}
              won={gameState.gameWon}
              solution={SOLUTION}
              onClose={() => window.location.reload()}
            />
          </Suspense>

          <Suspense fallback={<LoadingSpinner />}>
            <Stats
              isOpen={showStats}
              onClose={() => setShowStats(false)}
              currentAttempts={gameState.currentRow}
              won={gameState.gameWon}
            />
          </Suspense>
        </>
      )}
    </div>
  );
}

export default App;
