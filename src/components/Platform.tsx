
interface PlatformProps {
  x: number;
  y: number;
  width: number;
  height: number;
}

const Platform = ({ x, y, width, height }: PlatformProps) => {
  return (
    <div 
      className="absolute bg-green-800"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        width: `${width}px`,
        height: `${height}px`
      }}
    >
      {/* Platform top */}
      <div className="absolute top-0 left-0 w-full h-1/4 bg-green-600"></div>
      
      {/* Brick pattern */}
      <div className="w-full h-full flex flex-wrap">
        {Array.from({ length: Math.floor(width / 20) * Math.floor(height / 10) }).map((_, index) => (
          <div 
            key={`brick-${index}`}
            className="w-[20px] h-[10px] border-[1px] border-green-900"
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Platform;
