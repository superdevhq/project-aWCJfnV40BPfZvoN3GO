
interface EnemyProps {
  x: number;
  y: number;
  width: number;
  height: number;
}

const Enemy = ({ x, y, width, height }: EnemyProps) => {
  return (
    <div 
      className="absolute"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        width: `${width}px`,
        height: `${height}px`
      }}
    >
      {/* Enemy body */}
      <div className="w-full h-full relative">
        <div className="absolute inset-0 bg-green-700 rounded-t-lg overflow-hidden">
          {/* Shell */}
          <div className="absolute inset-[15%] bg-green-800 rounded-full">
            <div className="absolute inset-[20%] bg-green-600 rounded-full"></div>
          </div>
          
          {/* Eyes */}
          <div className="absolute top-[20%] left-[20%] w-[15%] h-[15%] bg-white rounded-full">
            <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-black rounded-full"></div>
          </div>
          <div className="absolute top-[20%] right-[20%] w-[15%] h-[15%] bg-white rounded-full">
            <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-black rounded-full"></div>
          </div>
          
          {/* Mouth */}
          <div className="absolute top-[40%] left-[35%] w-[30%] h-[10%] bg-red-600 rounded-full"></div>
        </div>
        
        {/* Feet */}
        <div className="absolute bottom-0 left-[10%] w-[30%] h-[20%] bg-yellow-700 rounded-b-full"></div>
        <div className="absolute bottom-0 right-[10%] w-[30%] h-[20%] bg-yellow-700 rounded-b-full"></div>
      </div>
    </div>
  );
};

export default Enemy;
