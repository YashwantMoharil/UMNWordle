import { useEffect, useState } from 'react';
import GameBoard from './components/GameBoard';
import Keyboard from './components/KeyBoard';
import ResultModal from './components/ResultModal';
import './styles/keyboard.css';
import './styles/ResultModal.css';
import './App.css';

const WORD_LENGTH = 6;
const MAX_GUESSES = 6;
const SOLUTION = 'KELLER';
const HINT = 'A famous UMN building named after a former president.';

type TileStatus = 'correct' | 'present' | 'absent' | 'empty';

function App() {
  const [board, setBoard] = useState<string[][]>(
    Array(MAX_GUESSES).fill(null).map(() => Array(WORD_LENGTH).fill(''))
  );
  const [statuses, setStatuses] = useState<TileStatus[][]>(
    Array(MAX_GUESSES).fill(null).map(() => Array(WORD_LENGTH).fill('empty'))
  );
  const [flipMap, setFlipMap] = useState<boolean[][]>(
    Array(MAX_GUESSES).fill(null).map(() => Array(WORD_LENGTH).fill(false))
  );
  const [keyStatuses, setKeyStatuses] = useState<Record<string, TileStatus>>({});
  const [currentRow, setCurrentRow] = useState(0);
  const [currentCol, setCurrentCol] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);
  const [hasPlayedToday, setHasPlayedToday] = useState(false);

  const [showHint] = useState(true);
  const [hintClicked, setHintClicked] = useState(false);

  useEffect(() => {
    const todayKey = new Date().toISOString().split('T')[0];
    const playedKey = localStorage.getItem('playedDate');
    if (playedKey === todayKey) {
      setHasPlayedToday(true);
      setGameOver(true);
    }
  }, []);

  const handleKey = (key: string) => {
    if (gameOver) return;

    if (key === 'Backspace') {
      if (currentCol > 0) {
        const newBoard = [...board];
        newBoard[currentRow][currentCol - 1] = '';
        setBoard(newBoard);
        setCurrentCol(currentCol - 1);
      }
    } else if (key === 'Enter') {
      if (currentCol === WORD_LENGTH) {
        const guess = board[currentRow].join('').toUpperCase();
        const updatedKeyStatus = { ...keyStatuses };
        const todayKey = new Date().toISOString().split('T')[0];

        if (guess === SOLUTION) {
          for (let i = 0; i < WORD_LENGTH; i++) {
            setTimeout(() => {
              const newStatuses = [...statuses];
              const newFlip = [...flipMap];
              newStatuses[currentRow][i] = 'correct';
              newFlip[currentRow][i] = true;
              updatedKeyStatus[guess[i]] = 'correct';
              setStatuses(newStatuses);
              setFlipMap(newFlip);
              setKeyStatuses({ ...updatedKeyStatus });
            }, i * 300);
          }
          setTimeout(() => {
            localStorage.setItem('playedDate', todayKey);
            setGameWon(true);
            setGameOver(true);
          }, WORD_LENGTH * 300 + 100);
          return;
        }

        for (let i = 0; i < WORD_LENGTH; i++) {
          setTimeout(() => {
            const newStatuses = [...statuses];
            const newFlip = [...flipMap];
            const char = guess[i];
            if (char === SOLUTION[i]) {
              newStatuses[currentRow][i] = 'correct';
              updatedKeyStatus[char] = 'correct';
            } else if (SOLUTION.includes(char)) {
              newStatuses[currentRow][i] = 'present';
              if (updatedKeyStatus[char] !== 'correct') updatedKeyStatus[char] = 'present';
            } else {
              newStatuses[currentRow][i] = 'absent';
              if (!updatedKeyStatus[char]) updatedKeyStatus[char] = 'absent';
            }
            newFlip[currentRow][i] = true;
            setStatuses(newStatuses);
            setFlipMap(newFlip);
            setKeyStatuses({ ...updatedKeyStatus });
          }, i * 300);
        }

        setTimeout(() => {
          if (currentRow + 1 >= MAX_GUESSES) {
            localStorage.setItem('playedDate', todayKey);
            setGameOver(true);
          }
          setCurrentRow(currentRow + 1);
          setCurrentCol(0);
        }, WORD_LENGTH * 300 + 100);
      }
    } else if (/^[a-zA-Z]$/.test(key)) {
      if (currentCol < WORD_LENGTH) {
        const newBoard = [...board];
        newBoard[currentRow][currentCol] = key.toUpperCase();
        setBoard(newBoard);
        setCurrentCol(currentCol + 1);
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => handleKey(e.key);
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [board, currentCol, currentRow, statuses, flipMap, gameOver]);

  return (
    <div className="App">
      <h1 className="umn-heading">
        UMN <span className="wordle-highlight">Wordle</span>
      </h1>

      {hasPlayedToday ? (
        <div style={{ textAlign: 'center', marginTop: '40px', fontSize: '22px' }}>
          You've already played today! Come back tomorrow.
        </div>
      ) : (
        <>
          <GameBoard board={board} statuses={statuses} flipMap={flipMap} />
          <Keyboard onKeyPress={handleKey} keyStatuses={keyStatuses} />

          {showHint && (
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              {currentRow < 3 ? (
                <div style={{ color: 'gray' }}>🔒 Hint available after 3 guesses!</div>
              ) : (
                <button
                  onClick={() => setHintClicked(true)}
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
                  {
                    hintClicked ? 'Hint Revealed!' : 'Reveal Hint'
                  }
                </button>
              )}
            </div>
          )}

          {hintClicked && (
            <div style={{ textAlign: 'center', marginTop: '10px', fontSize: '18px' }}>
              🔍 Hint: {HINT}
            </div>
          )}

          <ResultModal
            isOpen={gameOver}
            won={gameWon}
            solution={SOLUTION}
            onClose={() => window.location.reload()}
          />
        </>
      )}
    </div>
  );
}

export default App;
