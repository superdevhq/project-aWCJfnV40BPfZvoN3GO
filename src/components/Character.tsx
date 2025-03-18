
import { useState, useEffect } from 'react';

export interface CharacterType {
  id: string;
  type: 'dad' | 'child' | 'landlord' | 'neighbor';
  name: string;
  mood: 'happy' | 'neutral' | 'sad' | 'angry' | 'suspicious';
  sprite: string; // URL to the sprite image
}

interface CharacterProps {
  character: CharacterType;
  speaking?: boolean;
  animate?: boolean;
}

const Character = ({ character, speaking = false, animate = true }: CharacterProps) => {
  const [currentSprite, setCurrentSprite] = useState(character.sprite);
  
  // Update sprite when character mood changes
  useEffect(() => {
    setCurrentSprite(character.sprite);
  }, [character.sprite, character.mood]);

  return (
    <div className={`relative ${animate ? 'pixel-bounce' : ''}`}>
      <div className="w-24 h-32 md:w-32 md:h-48">
        <img 
          src={currentSprite} 
          alt={character.name}
          className="w-full h-full object-contain pixel-art"
        />
      </div>
      
      {speaking && (
        <div className="absolute -top-2 right-0 w-4 h-4 bg-game-accent rounded-full animate-pulse"></div>
      )}
      
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-center">
        <span className="px-2 py-1 rounded-md bg-game-panel text-xs font-medium">
          {character.name}
        </span>
      </div>
    </div>
  );
};

export default Character;
