
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";

interface DialogueBoxProps {
  text: string;
  speaker?: string;
  onComplete?: () => void;
  typewriterEffect?: boolean;
  typeSpeed?: number;
}

const DialogueBox = ({ 
  text, 
  speaker, 
  onComplete, 
  typewriterEffect = true,
  typeSpeed = 30
}: DialogueBoxProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    // Reset when text changes
    setDisplayedText('');
    setCurrentIndex(0);
    setIsComplete(false);
  }, [text]);
  
  useEffect(() => {
    if (!typewriterEffect) {
      setDisplayedText(text);
      setIsComplete(true);
      return;
    }
    
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, typeSpeed);
      
      return () => clearTimeout(timer);
    } else {
      setIsComplete(true);
    }
  }, [currentIndex, text, typewriterEffect, typeSpeed]);
  
  const handleClick = () => {
    if (!isComplete) {
      // Skip to the end if clicked before animation completes
      setDisplayedText(text);
      setIsComplete(true);
    } else if (onComplete) {
      onComplete();
    }
  };

  return (
    <div 
      className="game-panel rounded-lg p-4 w-full max-w-3xl cursor-pointer"
      onClick={handleClick}
    >
      {speaker && (
        <div className="mb-2 font-bold text-game-accent">{speaker}:</div>
      )}
      <div className="min-h-[4rem]">
        <p className="text-game-text">{displayedText}</p>
      </div>
      {isComplete && (
        <div className="flex justify-end mt-2">
          <Button 
            size="sm" 
            className="game-button text-xs"
            onClick={onComplete}
          >
            Continue
          </Button>
        </div>
      )}
    </div>
  );
};

export default DialogueBox;
