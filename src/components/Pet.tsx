
import { useState, useEffect } from 'react';

export interface PetType {
  id: string;
  type: 'cat' | 'dog' | 'chick' | 'spider' | 'snail';
  name: string;
  trait: string;
  description: string;
  difficulty: number; // 1-5, how hard to deal with
  childAttachment: number; // 1-5, how attached the child is
  sprite: string; // URL to the sprite image
}

interface PetProps {
  pet: PetType;
  isActive?: boolean;
  onClick?: () => void;
}

const petAnimations = {
  cat: "pixel-bounce",
  dog: "pixel-bounce",
  chick: "",
  spider: "",
  snail: ""
};

const Pet = ({ pet, isActive = false, onClick }: PetProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [animationClass, setAnimationClass] = useState("");
  
  useEffect(() => {
    // Set animation based on pet type
    setAnimationClass(petAnimations[pet.type] || "");
  }, [pet.type]);

  return (
    <div 
      className={`relative cursor-pointer transition-all duration-300 ${isActive ? 'scale-110' : ''}`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`w-16 h-16 md:w-24 md:h-24 ${animationClass}`}>
        <img 
          src={pet.sprite} 
          alt={pet.name}
          className="w-full h-full object-contain pixel-art"
        />
      </div>
      
      {isHovered && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-48 p-2 game-panel rounded-md text-xs z-10">
          <p className="font-bold text-game-accent">{pet.name} - {pet.type}</p>
          <p className="text-game-text">{pet.trait}</p>
          <div className="mt-1 flex justify-between">
            <span>Difficulty: {"★".repeat(pet.difficulty)}</span>
            <span>Attachment: {"❤️".repeat(pet.childAttachment)}</span>
          </div>
        </div>
      )}
      
      {isActive && (
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-game-accent rounded-full"></div>
      )}
    </div>
  );
};

export default Pet;
