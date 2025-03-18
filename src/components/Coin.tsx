
import { useState, useEffect } from 'react';

interface CoinProps {
  x: number;
  y: number;
  width: number;
  height: number;
}

const Coin = ({ x, y, width, height }: CoinProps) => {
  const [rotation, setRotation] = useState(0);
  
  // Animate coin rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 10) % 360);
    }, 100);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div 
      className="absolute"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        width: `${width}px`,
        height: `${height}px`,
        transform: `rotateY(${rotation}deg)`,
        transformStyle: 'preserve-3d'
      }}
    >
      <div className="w-full h-full bg-yellow-400 rounded-full border-4 border-yellow-600 flex items-center justify-center animate-pulse">
        <div className="text-yellow-800 font-bold text-xs">$</div>
      </div>
    </div>
  );
};

export default Coin;
