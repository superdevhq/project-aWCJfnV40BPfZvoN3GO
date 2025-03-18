
import { Progress } from "@/components/ui/progress";

interface GameHUDProps {
  day: number;
  happiness: number;
  guilt: number;
  suspicion: number;
  health: number;
  petsHandled: number;
}

const GameHUD = ({ day, happiness, guilt, suspicion, health, petsHandled }: GameHUDProps) => {
  return (
    <div className="game-panel rounded-lg p-4 w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-game-accent">Day {day}</h3>
        <div className="text-sm text-game-text">Pets Handled: {petsHandled}</div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm text-game-text">Happiness</span>
            <span className="text-sm text-game-text">{happiness}%</span>
          </div>
          <Progress value={happiness} className="h-2 bg-game-border">
            <div 
              className="h-full bg-green-500 transition-all duration-500"
              style={{ width: `${happiness}%` }}
            />
          </Progress>
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm text-game-text">Guilt</span>
            <span className="text-sm text-game-text">{guilt}%</span>
          </div>
          <Progress value={guilt} className="h-2 bg-game-border">
            <div 
              className="h-full bg-red-500 transition-all duration-500"
              style={{ width: `${guilt}%` }}
            />
          </Progress>
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm text-game-text">Suspicion</span>
            <span className="text-sm text-game-text">{suspicion}%</span>
          </div>
          <Progress value={suspicion} className="h-2 bg-game-border">
            <div 
              className="h-full bg-yellow-500 transition-all duration-500"
              style={{ width: `${suspicion}%` }}
            />
          </Progress>
        </div>
        
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-sm text-game-text">Health</span>
            <span className="text-sm text-game-text">{health}%</span>
          </div>
          <Progress value={health} className="h-2 bg-game-border">
            <div 
              className="h-full bg-blue-500 transition-all duration-500"
              style={{ width: `${health}%` }}
            />
          </Progress>
        </div>
      </div>
    </div>
  );
};

export default GameHUD;
