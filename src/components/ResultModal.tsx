import '../styles/ResultModal.css';

type ResultModalProps = {
  isOpen: boolean;
  won: boolean;
  solution: string;
  onClose: () => void;
};

export default function ResultModal({ isOpen, won, solution, onClose }: ResultModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>{won ? '🎉 You Guessed It!' : '❌ Game Over'}</h2>
        {!won && <p>The correct word was: <strong>{solution}</strong></p>}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
