
import { useState, useEffect } from 'react';

interface PlayerProps {
  x: number;
  y: number;
  width: number;
  height: number;
  velocityX: number;
  isJumping?: boolean;
}

const Player = ({ x, y, width, height, velocityX, isJumping = false }: PlayerProps) => {
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  
  // Update direction based on velocity
  useEffect(() => {
    if (velocityX < 0) {
      setDirection('left');
    } else if (velocityX > 0) {
      setDirection('right');
    }
  }, [velocityX]);
  
  return (
    <div 
      className={`absolute ${direction === 'left' ? 'scale-x-[-1]' : ''}`}
      style={{
        left: `${x}px`,
        top: `${y}px`,
        width: `${width}px`,
        height: `${height}px`,
        transform: `${direction === 'left' ? 'scaleX(-1)' : ''} ${isJumping ? 'translateY(-2px)' : ''}`,
        transformOrigin: 'center',
        transition: 'transform 0.1s ease'
      }}
    >
      <div className={`w-full h-full relative ${isJumping ? 'scale-y-[1.1] -translate-y-1' : ''}`}>
        {/* Character body */}
        <div className="absolute inset-0 bg-red-500 rounded-t-full overflow-hidden">
          {/* Face */}
          <div className="absolute top-1/4 left-1/4 w-1/2 h-1/4 bg-skin-200 rounded-full"></div>
          
          {/* Eyes */}
          <div className="absolute top-1/3 left-1/3 w-[15%] h-[15%] bg-white rounded-full">
            <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-black rounded-full"></div>
          </div>
          
          {/* Mustache */}
          <div className="absolute top-[45%] left-1/4 w-1/2 h-[10%] bg-black rounded-full"></div>
          
          {/* Hat */}
          <div className="absolute top-0 left-0 w-full h-1/4 bg-red-600"></div>
          <div className="absolute top-[20%] left-[10%] w-[80%] h-[5%] bg-red-600"></div>
        </div>
        
        {/* Overalls */}
        <div className="absolute bottom-0 left-[15%] w-[70%] h-1/2 bg-blue-500"></div>
        
        {/* Buttons */}
        <div className="absolute top-[60%] left-[40%] w-[10%] h-[10%] bg-yellow-300 rounded-full"></div>
        <div className="absolute top-[60%] left-[50%] w-[10%] h-[10%] bg-yellow-300 rounded-full"></div>
        
        {/* Legs - adjust based on jumping */}
        <div className={`absolute bottom-0 left-[20%] w-[20%] h-[15%] bg-blue-700 ${isJumping ? 'h-[10%]' : ''}`}></div>
        <div className={`absolute bottom-0 right-[20%] w-[20%] h-[15%] bg-blue-700 ${isJumping ? 'h-[10%]' : ''}`}></div>
      </div>
      
      {/* Jump effect */}
      {isJumping && (
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-4 opacity-50">
          <div className="w-full h-full bg-white rounded-full blur-sm"></div>
        </div>
      )}
    </div>
  );
};

export default Player;
