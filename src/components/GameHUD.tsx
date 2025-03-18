
interface GameHUDProps {
  score: number;
  lives: number;
}

const GameHUD = ({ score, lives }: GameHUDProps) => {
  return (
    <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
      <div className="bg-black/50 text-white px-4 py-2 rounded-lg">
        <span className="font-bold">Score: </span>
        <span>{score}</span>
      </div>
      
      <div className="bg-black/50 text-white px-4 py-2 rounded-lg flex items-center">
        <span className="font-bold mr-2">Lives: </span>
        <div className="flex">
          {Array.from({ length: lives }).map((_, index) => (
            <div 
              key={`life-${index}`}
              className="w-6 h-6 bg-red-500 rounded-full mx-1"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameHUD;
