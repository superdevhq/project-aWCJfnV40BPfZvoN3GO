
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface GameIntroProps {
  onStart: () => void;
}

const GameIntro = ({ onStart }: GameIntroProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  
  const storyPages = [
    {
      title: "Dad's Pet Dilemma",
      content: "Meet Frank, a loving but allergic father of three enthusiastic children who live in a small apartment with strict 'no pets' policy.",
      image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?q=80&w=3086&auto=format&fit=crop&ixlib=rb-4.0.3"
    },
    {
      title: "The Problem",
      content: "Your kids keep bringing home stray animals they find - cats, dogs, chicks, spiders, and more. You can't keep them due to your allergies, the landlord's rules, and limited space.",
      image: "https://images.unsplash.com/photo-1548767797-d8c844163c4c?q=80&w=3171&auto=format&fit=crop&ixlib=rb-4.0.3"
    },
    {
      title: "Your Mission",
      content: "You must secretly deal with these pets without breaking your children's hearts. You have three options: cook them as food, give them away, or release them into the wild.",
      image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=3143&auto=format&fit=crop&ixlib=rb-4.0.3"
    },
    {
      title: "The Challenge",
      content: "Each decision has consequences. Your choices affect your family's happiness, your health, and your reputation in the neighborhood. Can you maintain the balance?",
      image: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=3024&auto=format&fit=crop&ixlib=rb-4.0.3"
    }
  ];
  
  const currentStory = storyPages[currentPage];
  
  const handleNext = () => {
    if (currentPage < storyPages.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      onStart();
    }
  };
  
  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/80 z-50 p-4">
      <Card className="w-full max-w-2xl game-panel pixel-fade">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-pixel text-game-accent">{currentStory.title}</CardTitle>
          <CardDescription className="text-lg text-game-text">
            {currentPage + 1} of {storyPages.length}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative h-48 md:h-64 overflow-hidden rounded-md">
            <img 
              src={currentStory.image} 
              alt={currentStory.title}
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-lg text-game-text">{currentStory.content}</p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button 
            onClick={handlePrevious} 
            disabled={currentPage === 0}
            variant="outline"
            className="game-button-secondary"
          >
            Previous
          </Button>
          <Button 
            onClick={handleNext} 
            className="game-button"
          >
            {currentPage === storyPages.length - 1 ? "Start Game" : "Next"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default GameIntro;
