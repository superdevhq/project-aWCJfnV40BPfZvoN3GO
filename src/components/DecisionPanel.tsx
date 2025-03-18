
import { Button } from "@/components/ui/button";
import { PetType } from "./Pet";

export interface Decision {
  id: string;
  text: string;
  type: 'eat' | 'giveaway' | 'release';
  description: string;
  consequences: {
    happiness: number; // -5 to 5
    guilt: number; // -5 to 5
    suspicion: number; // -5 to 5
    health: number; // -5 to 5
  };
}

interface DecisionPanelProps {
  pet: PetType;
  decisions: Decision[];
  onDecisionMade: (decision: Decision) => void;
}

const DecisionPanel = ({ pet, decisions, onDecisionMade }: DecisionPanelProps) => {
  return (
    <div className="game-panel rounded-lg p-4 w-full max-w-3xl">
      <h3 className="text-xl font-bold text-game-accent mb-4">What will you do with {pet.name}?</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {decisions.map((decision) => (
          <div 
            key={decision.id} 
            className="game-panel rounded-md p-3 hover:border-game-accent transition-colors cursor-pointer"
            onClick={() => onDecisionMade(decision)}
          >
            <h4 className="font-bold text-game-text mb-2">{decision.text}</h4>
            <p className="text-sm text-game-text/80 mb-3">{decision.description}</p>
            
            <div className="text-xs grid grid-cols-2 gap-2">
              <div className={`${decision.consequences.happiness > 0 ? 'text-green-400' : 'text-red-400'}`}>
                Happiness: {decision.consequences.happiness > 0 ? '+' : ''}{decision.consequences.happiness}
              </div>
              <div className={`${decision.consequences.guilt > 0 ? 'text-red-400' : 'text-green-400'}`}>
                Guilt: {decision.consequences.guilt > 0 ? '+' : ''}{decision.consequences.guilt}
              </div>
              <div className={`${decision.consequences.suspicion > 0 ? 'text-red-400' : 'text-green-400'}`}>
                Suspicion: {decision.consequences.suspicion > 0 ? '+' : ''}{decision.consequences.suspicion}
              </div>
              <div className={`${decision.consequences.health > 0 ? 'text-green-400' : 'text-red-400'}`}>
                Health: {decision.consequences.health > 0 ? '+' : ''}{decision.consequences.health}
              </div>
            </div>
            
            <Button 
              className={`mt-3 w-full ${
                decision.type === 'eat' ? 'bg-red-600 hover:bg-red-700' : 
                decision.type === 'giveaway' ? 'bg-blue-600 hover:bg-blue-700' : 
                'bg-green-600 hover:bg-green-700'
              }`}
              onClick={() => onDecisionMade(decision)}
            >
              {decision.type === 'eat' ? 'Cook' : 
               decision.type === 'giveaway' ? 'Give Away' : 
               'Release'}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DecisionPanel;
