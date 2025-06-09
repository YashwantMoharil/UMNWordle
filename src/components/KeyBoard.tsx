import '../styles/KeyBoard.css';


type KeyProps = {
  value: string;
  onClick: (key: string) => void;
  status?: 'correct' | 'present' | 'absent' | 'empty';
};

function Key({ value, onClick, status = 'empty' }: KeyProps) {
  return (
    <button className={`key ${status}`} onClick={() => onClick(value)}>
      {value === 'Backspace' ? '⌫' : value}
    </button>
  );
}

type KeyboardProps = {
  onKeyPress: (key: string) => void;
  keyStatuses: Record<string, 'correct' | 'present' | 'absent' | 'empty'>;
};

export default function Keyboard({ onKeyPress, keyStatuses }: KeyboardProps) {
  const rows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Backspace']
  ];

  return (
    <div className="keyboard">
      {rows.map((row, i) => (
        <div className="keyboard-row" key={i}>
          {row.map((key) => (
            <Key
              key={key}
              value={key}
              onClick={onKeyPress}
              status={keyStatuses[key.toUpperCase()] || 'empty'}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
