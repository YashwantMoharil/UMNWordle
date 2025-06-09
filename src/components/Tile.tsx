import '../styles/tile.css';

type TileProps = {
  letter: string;
  status: 'correct' | 'present' | 'absent' | 'empty';
  shouldFlip?: boolean;
};

export default function Tile({ letter, status, shouldFlip = false }: TileProps) {
  return (
    <div className={`tile ${shouldFlip ? 'flip' : ''}`}>
      <div className={`tile-inner ${status}`}>
        {letter}
      </div>
    </div>
  );
}
