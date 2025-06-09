import Tile from './Tile';

type Props = {
  board: string[][];
  statuses: ('correct' | 'present' | 'absent' | 'empty')[][];
  flipMap: boolean[][];
};

export default function GameBoard({ board, statuses, flipMap }: Props) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '60px' }}>
      {board.map((row, i) => (
        <div key={i} style={{ display: 'flex' }}>
          {row.map((letter, j) => (
            <Tile key={j} letter={letter} status={statuses[i][j]} shouldFlip={flipMap[i][j]} />
          ))}
        </div>
      ))}
    </div>
  );
}
