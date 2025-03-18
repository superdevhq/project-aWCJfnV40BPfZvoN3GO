import { useState, useEffect } from 'react';
import Character, { CharacterType } from './Character';
import Pet, { PetType } from './Pet';
import DialogueBox from './DialogueBox';
import DecisionPanel, { Decision } from './DecisionPanel';
import GameHUD from './GameHUD';
import GameIntro from './GameIntro';

// Game data
const dadCharacter: CharacterType = {
  id: 'dad',
  type: 'dad',
  name: 'Frank',
  mood: 'neutral',
  sprite: 'https://i.imgur.com/JFHyqsE.png' // Placeholder image
};

const childCharacters: CharacterType[] = [
  {
    id: 'child1',
    type: 'child',
    name: 'Lily',
    mood: 'happy',
    sprite: 'https://i.imgur.com/8wEwwQa.png' // Placeholder image
  },
  {
    id: 'child2',
    type: 'child',
    name: 'Max',
    mood: 'happy',
    sprite: 'https://i.imgur.com/vGMaQ9K.png' // Placeholder image
  },
  {
    id: 'child3',
    type: 'child',
    name: 'Zoe',
    mood: 'happy',
    sprite: 'https://i.imgur.com/JYvKn8b.png' // Placeholder image
  }
];

const petTypes: PetType[] = [
  {
    id: 'cat1',
    type: 'cat',
    name: 'Whiskers',
    trait: 'Curious and mischievous',
    description: 'A sleek black cat with bright green eyes that seems to judge your every move.',
    difficulty: 3,
    childAttachment: 4,
    sprite: 'https://i.imgur.com/JwY3Ept.png' // Placeholder image
  },
  {
    id: 'dog1',
    type: 'dog',
    name: 'Buddy',
    trait: 'Loyal and energetic',
    description: 'A small brown puppy that barks at everything and chews on furniture.',
    difficulty: 4,
    childAttachment: 5,
    sprite: 'https://i.imgur.com/8XA9Pq6.png' // Placeholder image
  },
  {
    id: 'chick1',
    type: 'chick',
    name: 'Peep',
    trait: 'Tiny and adorable',
    description: 'A fluffy yellow chick that chirps constantly and leaves droppings everywhere.',
    difficulty: 2,
    childAttachment: 3,
    sprite: 'https://i.imgur.com/JHVnmhF.png' // Placeholder image
  },
  {
    id: 'spider1',
    type: 'spider',
    name: 'Webster',
    trait: 'Sneaky and resourceful',
    description: 'A large hairy spider that keeps escaping its container and appearing in unexpected places.',
    difficulty: 2,
    childAttachment: 2,
    sprite: 'https://i.imgur.com/KQtQKsJ.png' // Placeholder image
  },
  {
    id: 'snail1',
    type: 'snail',
    name: 'Slick',
    trait: 'Slow and slimy',
    description: 'A garden snail that leaves trails of slime on everything it touches.',
    difficulty: 1,
    childAttachment: 2,
    sprite: 'https://i.imgur.com/L8Lj0Hc.png' // Placeholder image
  }
];

// Dad's witty lines
const dadLines = [
  "I'm not saying I'm going to eat your pet, but I'm not NOT saying that either...",
  "Another pet? At this rate, we'll need to buy a zoo license!",
  "Your spider friend? Oh, he went on vacation... to a farm... very far away...",
  "Trust me, that chicken is much happier in the wild. Or in my stomach. I mean, in the wild!",
  "I'm allergic to everything with fur, scales, feathers, and existence in general.",
  "The landlord said no pets, but he didn't specify no pet-shaped meals!",
  "I promise your snail is living its best life now. The sauce was delicious—I mean, the sunset was beautiful!",
  "Your cat and I had a long talk about rent contributions. Turns out, he couldn't afford it."
];

// Decision templates
const decisionTemplates: Record<string, Decision[]> = {
  cat: [
    {
      id: 'eat-cat',
      text: 'Cook a "Special" Stew',
      type: 'eat',
      description: 'Turn the cat into a hearty stew. The kids will never know...',
      consequences: {
        happiness: -3,
        guilt: 4,
        suspicion: 3,
        health: 2
      }
    },
    {
      id: 'giveaway-cat',
      text: 'Give to Mrs. Johnson',
      type: 'giveaway',
      description: 'Your elderly neighbor has been looking for company.',
      consequences: {
        happiness: -1,
        guilt: 1,
        suspicion: 1,
        health: 0
      }
    },
    {
      id: 'release-cat',
      text: 'Release in the Park',
      type: 'release',
      description: 'Let it join the local stray cat colony.',
      consequences: {
        happiness: -2,
        guilt: 2,
        suspicion: 0,
        health: 0
      }
    }
  ],
  dog: [
    {
      id: 'eat-dog',
      text: 'Make "Mystery Meat" Tacos',
      type: 'eat',
      description: 'The kids love taco night! They will never suspect a thing...',
      consequences: {
        happiness: -4,
        guilt: 5,
        suspicion: 4,
        health: 1
      }
    },
    {
      id: 'giveaway-dog',
      text: 'Give to the Fire Station',
      type: 'giveaway',
      description: 'The local firefighters might appreciate a mascot.',
      consequences: {
        happiness: -2,
        guilt: 1,
        suspicion: 1,
        health: 0
      }
    },
    {
      id: 'release-dog',
      text: 'Release at the Dog Park',
      type: 'release',
      description: 'It can find a new family among the dog lovers there.',
      consequences: {
        happiness: -2,
        guilt: 3,
        suspicion: 1,
        health: 0
      }
    }
  ],
  chick: [
    {
      id: 'eat-chick',
      text: 'Prepare "Tiny Nuggets"',
      type: 'eat',
      description: 'Just a small snack. The kids will think it flew away.',
      consequences: {
        happiness: -1,
        guilt: 2,
        suspicion: 1,
        health: 1
      }
    },
    {
      id: 'giveaway-chick',
      text: 'Give to Local Farm',
      type: 'giveaway',
      description: 'It can grow up with other chickens.',
      consequences: {
        happiness: -1,
        guilt: 0,
        suspicion: 0,
        health: 0
      }
    },
    {
      id: 'release-chick',
      text: 'Release in the Backyard',
      type: 'release',
      description: 'It might survive on its own... maybe?',
      consequences: {
        happiness: -1,
        guilt: 3,
        suspicion: 0,
        health: 0
      }
    }
  ],
  spider: [
    {
      id: 'eat-spider',
      text: 'Make "Crunchy" Cookies',
      type: 'eat',
      description: 'Extra protein in the chocolate chip cookies!',
      consequences: {
        happiness: 0,
        guilt: 1,
        suspicion: 2,
        health: -1
      }
    },
    {
      id: 'giveaway-spider',
      text: 'Give to Science Teacher',
      type: 'giveaway',
      description: 'The school\'s science lab could use it for education.',
      consequences: {
        happiness: 0,
        guilt: 0,
        suspicion: 0,
        health: 0
      }
    },
    {
      id: 'release-spider',
      text: 'Release in the Garden',
      type: 'release',
      description: 'It can eat pests and be useful out there.',
      consequences: {
        happiness: 0,
        guilt: 0,
        suspicion: 0,
        health: 0
      }
    }
  ],
  snail: [
    {
      id: 'eat-snail',
      text: 'Prepare "Escargot"',
      type: 'eat',
      description: 'A fancy French delicacy! The kids won\'t recognize it.',
      consequences: {
        happiness: 0,
        guilt: 1,
        suspicion: 1,
        health: 0
      }
    },
    {
      id: 'giveaway-snail',
      text: 'Give to Pet Store',
      type: 'giveaway',
      description: 'The local pet store might take it for their display.',
      consequences: {
        happiness: 0,
        guilt: 0,
        suspicion: 0,
        health: 0
      }
    },
    {
      id: 'release-snail',
      text: 'Release in the Garden',
      type: 'release',
      description: 'It can join its snail friends among the plants.',
      consequences: {
        happiness: 0,
        guilt: 0,
        suspicion: 0,
        health: 0
      }
    }
  ]
};

// Game states
type GameState = 'intro' | 'dialogue' | 'decision' | 'outcome' | 'nextDay';

const GameContainer = () => {
  const [gameState, setGameState] = useState<GameState>('intro');
  const [showIntro, setShowIntro] = useState(true);
  const [day, setDay] = useState(1);
  const [happiness, setHappiness] = useState(80);
  const [guilt, setGuilt] = useState(10);
  const [suspicion, setSuspicion] = useState(5);
  const [health, setHealth] = useState(90);
  const [petsHandled, setPetsHandled] = useState(0);
  
  const [currentPet, setCurrentPet] = useState<PetType | null>(null);
  const [currentChild, setCurrentChild] = useState<CharacterType | null>(null);
  const [currentDialogue, setCurrentDialogue] = useState('');
  const [currentSpeaker, setCurrentSpeaker] = useState('');
  const [availableDecisions, setAvailableDecisions] = useState<Decision[]>([]);
  
  // Start the game
  const startGame = () => {
    setShowIntro(false);
    startNewDay();
  };
  
  // Start a new day in the game
  const startNewDay = () => {
    setDay(prev => prev + 1);
    setGameState('dialogue');
    
    // Randomly select a child and pet
    const randomChild = childCharacters[Math.floor(Math.random() * childCharacters.length)];
    const randomPet = petTypes[Math.floor(Math.random() * petTypes.length)];
    
    setCurrentChild(randomChild);
    setCurrentPet(randomPet);
    
    // Set initial dialogue
    setCurrentSpeaker(randomChild.name);
    setCurrentDialogue(`Dad! Look what I found! This is ${randomPet.name} the ${randomPet.type}. Can we keep it? Please, please, please!`);
  };
  
  // Handle dialogue completion
  const handleDialogueComplete = () => {
    if (currentSpeaker === currentChild?.name) {
      // Child finished speaking, now dad responds
      setCurrentSpeaker(dadCharacter.name);
      setCurrentDialogue(getRandomDadLine());
    } else {
      // Dad finished speaking, show decision panel
      setGameState('decision');
      
      // Set available decisions based on pet type
      if (currentPet) {
        setAvailableDecisions(decisionTemplates[currentPet.type]);
      }
    }
  };
  
  // Handle decision made
  const handleDecisionMade = (decision: Decision) => {
    setGameState('outcome');
    
    // Apply consequences
    setHappiness(prev => Math.max(0, Math.min(100, prev + decision.consequences.happiness)));
    setGuilt(prev => Math.max(0, Math.min(100, prev + decision.consequences.guilt)));
    setSuspicion(prev => Math.max(0, Math.min(100, prev + decision.consequences.suspicion)));
    setHealth(prev => Math.max(0, Math.min(100, prev + decision.consequences.health)));
    
    // Increment pets handled counter
    setPetsHandled(prev => prev + 1);
    
    // Set outcome dialogue
    setCurrentSpeaker(dadCharacter.name);
    
    let outcomeText = '';
    switch (decision.type) {
      case 'eat':
        outcomeText = `I'll take care of ${currentPet?.name}. Don't worry about it. *Later that evening, you serve a mysterious new dish for dinner*`;
        break;
      case 'giveaway':
        outcomeText = `I found a nice new home for ${currentPet?.name}. They'll be much happier there, I promise.`;
        break;
      case 'release':
        outcomeText = `I think ${currentPet?.name} would be happier in their natural habitat. I'll make sure they find a good spot.`;
        break;
    }
    
    setCurrentDialogue(outcomeText);
  };
  
  // Handle outcome completion
  const handleOutcomeComplete = () => {
    setGameState('nextDay');
    setCurrentSpeaker(currentChild?.name || '');
    setCurrentDialogue(`*sniff* I'll miss ${currentPet?.name}. Maybe I'll find another pet tomorrow!`);
  };
  
  // Handle next day
  const handleNextDay = () => {
    // Check for game over conditions
    if (happiness <= 0 || guilt >= 100 || suspicion >= 100 || health <= 0) {
      // Game over logic would go here
      alert("Game Over!");
      // Reset game
      setShowIntro(true);
      setDay(1);
      setHappiness(80);
      setGuilt(10);
      setSuspicion(5);
      setHealth(90);
      setPetsHandled(0);
    } else {
      startNewDay();
    }
  };
  
  // Get a random dad line
  const getRandomDadLine = () => {
    return dadLines[Math.floor(Math.random() * dadLines.length)];
  };

  return (
    <div className="game-container min-h-screen flex flex-col p-4">
      {showIntro ? (
        <GameIntro onStart={startGame} />
      ) : (
        <>
          {/* Game HUD */}
          <GameHUD 
            day={day}
            happiness={happiness}
            guilt={guilt}
            suspicion={suspicion}
            health={health}
            petsHandled={petsHandled}
          />
          
          {/* Game Scene */}
          <div className="flex-1 flex flex-col items-center justify-center my-8">
            <div className="flex justify-center items-end gap-8 mb-8">
              {currentChild && (
                <Character 
                  character={currentChild} 
                  speaking={currentSpeaker === currentChild.name}
                />
              )}
              
              {currentPet && gameState !== 'outcome' && gameState !== 'nextDay' && (
                <Pet pet={currentPet} isActive={true} />
              )}
              
              <Character 
                character={dadCharacter} 
                speaking={currentSpeaker === dadCharacter.name}
              />
            </div>
            
            {/* Dialogue or Decision Panel */}
            {(gameState === 'dialogue' || gameState === 'outcome' || gameState === 'nextDay') && (
              <DialogueBox 
                text={currentDialogue}
                speaker={currentSpeaker}
                onComplete={
                  gameState === 'dialogue' 
                    ? handleDialogueComplete 
                    : gameState === 'outcome'
                    ? handleOutcomeComplete
                    : handleNextDay
                }
              />
            )}
            
            {gameState === 'decision' && currentPet && (
              <DecisionPanel 
                pet={currentPet}
                decisions={availableDecisions}
                onDecisionMade={handleDecisionMade}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default GameContainer;