import { useState, useEffect, useRef } from 'react';
import Player from './Player';
import Platform from './Platform';
import Enemy from './Enemy';
import Coin from './Coin';
import GameHUD from './GameHUD';
import { useKeyPress } from '../hooks/useKeyPress';

// Game constants
const GRAVITY = 0.6;
const JUMP_FORCE = -15;
const MOVEMENT_SPEED = 5;
const JUMP_SOUND_URL = 'https://assets.mixkit.co/sfx/preview/mixkit-player-jumping-in-a-video-game-2043.mp3';

// Game types
export interface GameObject {
  x: number;
  y: number;
  width: number;
  height: number;
  velocityX?: number;
  velocityY?: number;
}

export interface GameState {
  player: GameObject;
  platforms: GameObject[];
  enemies: GameObject[];
  coins: GameObject[];
  score: number;
  lives: number;
  gameOver: boolean;
  levelComplete: boolean;
}

const initialGameState: GameState = {
  player: {
    x: 50,
    y: 300,
    width: 32,
    height: 48,
    velocityX: 0,
    velocityY: 0
  },
  platforms: [
    { x: 0, y: 400, width: 800, height: 40 },
    { x: 200, y: 300, width: 100, height: 20 },
    { x: 400, y: 250, width: 100, height: 20 },
    { x: 600, y: 200, width: 100, height: 20 },
    { x: 300, y: 150, width: 100, height: 20 }
  ],
  enemies: [
    { x: 300, y: 368, width: 32, height: 32, velocityX: -2 },
    { x: 500, y: 218, width: 32, height: 32, velocityX: -2 }
  ],
  coins: [
    { x: 250, y: 250, width: 20, height: 20 },
    { x: 450, y: 200, width: 20, height: 20 },
    { x: 650, y: 150, width: 20, height: 20 },
    { x: 350, y: 100, width: 20, height: 20 }
  ],
  score: 0,
  lives: 3,
  gameOver: false,
  levelComplete: false
};

const GameContainer = () => {
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [isJumping, setIsJumping] = useState(false);
  const [jumpSound, setJumpSound] = useState<HTMLAudioElement | null>(null);
  const gameLoopRef = useRef<number | null>(null);
  
  // Key press hooks
  const leftPressed = useKeyPress('ArrowLeft');
  const rightPressed = useKeyPress('ArrowRight');
  const jumpPressed = useKeyPress('ArrowUp');
  const spacePressed = useKeyPress(' ');
  const restartPressed = useKeyPress('r');
  
  // Reset game
  const resetGame = () => {
    setGameState(initialGameState);
    setIsJumping(false);
  };
  
  // Check collisions between two objects
  const checkCollision = (obj1: GameObject, obj2: GameObject) => {
    return (
      obj1.x < obj2.x + obj2.width &&
      obj1.x + obj1.width > obj2.x &&
      obj1.y < obj2.y + obj2.height &&
      obj1.y + obj1.height > obj2.y
    );
  };
  
  // Check if player is on a platform
  const checkGrounded = (player: GameObject, platforms: GameObject[]) => {
    for (const platform of platforms) {
      if (
        player.x + player.width > platform.x &&
        player.x < platform.x + platform.width &&
        player.y + player.height >= platform.y &&
        player.y + player.height <= platform.y + 10 &&
        player.velocityY >= 0
      ) {
        return true;
      }
    }
    return false;
  };
  
  // Game loop
  useEffect(() => {
    const gameLoop = () => {
      if (gameState.gameOver || gameState.levelComplete) {
        return;
      }
      
      setGameState(prevState => {
        // Create a copy of the player
        const player = { ...prevState.player };
        
        // Handle horizontal movement
        if (leftPressed) {
          player.velocityX = -MOVEMENT_SPEED;
        } else if (rightPressed) {
          player.velocityX = MOVEMENT_SPEED;
        } else {
          player.velocityX = player.velocityX * 0.8;
          if (Math.abs(player.velocityX) < 0.1) player.velocityX = 0;
        }
        
        // Handle jumping - allow both up arrow and space
        const shouldJump = (jumpPressed || spacePressed);
        const grounded = checkGrounded(player, prevState.platforms);
        if (shouldJump && grounded && !isJumping) {
          player.velocityY = JUMP_FORCE;
          setIsJumping(true);
          
          // Play jump sound
          if (jumpSound) {
            jumpSound.currentTime = 0;
            jumpSound.play().catch(e => console.log("Error playing sound:", e));
          }
        }
        
        // Apply gravity
        if (!grounded) {
          player.velocityY += GRAVITY;
          
          // Cap falling speed
          if (player.velocityY > 15) player.velocityY = 15;
        } else {
          player.velocityY = 0;
          setIsJumping(false);
        }
        
        // Update player position
        player.x += player.velocityX;
        player.y += player.velocityY;
        
        // Keep player within bounds
        if (player.x < 0) player.x = 0;
        if (player.x + player.width > 800) player.x = 800 - player.width;
        
        // Update enemies
        const enemies = prevState.enemies.map(enemy => {
          const updatedEnemy = { ...enemy };
          
          // Move enemy
          updatedEnemy.x += updatedEnemy.velocityX || 0;
          
          // Reverse direction if hitting edge of platform
          const platformBelow = prevState.platforms.find(platform => 
            updatedEnemy.x + updatedEnemy.width > platform.x &&
            updatedEnemy.x < platform.x + platform.width &&
            updatedEnemy.y + updatedEnemy.height === platform.y
          );
          
          if (platformBelow) {
            if (
              updatedEnemy.x <= platformBelow.x || 
              updatedEnemy.x + updatedEnemy.width >= platformBelow.x + platformBelow.width
            ) {
              updatedEnemy.velocityX = -(updatedEnemy.velocityX || 0);
            }
          }
          
          return updatedEnemy;
        });
        
        // Check for coin collisions
        let score = prevState.coins.some(coin => {
          const collision = checkCollision(player, coin);
          if (collision) {
            score += 10;
          }
          return !collision;
        }) ? prevState.score + 10 : prevState.score;
        
        // Check for enemy collisions
        let lives = prevState.lives;
        let gameOver = prevState.gameOver;
        
        for (const enemy of enemies) {
          if (checkCollision(player, enemy)) {
            // Check if player is jumping on enemy
            if (
              player.velocityY > 0 &&
              player.y + player.height < enemy.y + enemy.height / 2
            ) {
              // Remove enemy (would be handled differently in a full game)
              enemy.y = 1000; // Move off screen
            } else {
              lives -= 1;
              if (lives <= 0) {
                gameOver = true;
              } else {
                // Reset player position after hit
                player.x = 50;
                player.y = 300;
                player.velocityX = 0;
                player.velocityY = 0;
              }
            }
          }
        }
        
        // Check for level complete
        const levelComplete = coins.length === 0;
        
        return {
          ...prevState,
          player,
          enemies,
          coins,
          score,
          lives,
          gameOver,
          levelComplete
        };
      });
    };
    
    // Start game loop
    gameLoopRef.current = requestAnimationFrame(function loop() {
      gameLoop();
      gameLoopRef.current = requestAnimationFrame(loop);
    });
    
    // Cleanup
    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [leftPressed, rightPressed, jumpPressed, spacePressed, isJumping, jumpSound]);
  
  // Handle restart
  useEffect(() => {
    if (restartPressed && (gameState.gameOver || gameState.levelComplete)) {
      resetGame();
    }
  }, [restartPressed, gameState.gameOver, gameState.levelComplete]);
  
  // Visual jump indicator
  const jumpIndicator = isJumping ? "Jumping!" : (checkGrounded(gameState.player, gameState.platforms) ? "Ready" : "Falling");
  
  return (
    <div className="game-container relative w-full max-w-4xl mx-auto h-[500px] bg-blue-200 overflow-hidden border-4 border-blue-800 rounded-lg">
      {/* Game elements */}
      <div className="game-world relative w-full h-full">
        {/* Player */}
        <Player 
          x={gameState.player.x} 
          y={gameState.player.y} 
          width={gameState.player.width} 
          height={gameState.player.height}
          velocityX={gameState.player.velocityX || 0}
          isJumping={isJumping}
        />
        
        {/* Platforms */}
        {gameState.platforms.map((platform, index) => (
          <Platform 
            key={`platform-${index}`}
            x={platform.x}
            y={platform.y}
            width={platform.width}
            height={platform.height}
          />
        ))}
        
        {/* Enemies */}
        {gameState.enemies.map((enemy, index) => (
          <Enemy 
            key={`enemy-${index}`}
            x={enemy.x}
            y={enemy.y}
            width={enemy.width}
            height={enemy.height}
          />
        ))}
        
        {/* Coins */}
        {gameState.coins.map((coin, index) => (
          <Coin 
            key={`coin-${index}`}
            x={coin.x}
            y={coin.y}
            width={coin.width}
            height={coin.height}
          />
        ))}
        
        {/* Game HUD */}
        <GameHUD 
          score={gameState.score}
          lives={gameState.lives}
          jumpState={jumpIndicator}
        />
        
        {/* Game over screen */}
        {gameState.gameOver && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70">
            <div className="text-center p-8 bg-white rounded-lg">
              <h2 className="text-2xl font-bold text-red-600 mb-4">Game Over!</h2>
              <p className="mb-4">Your score: {gameState.score}</p>
              <button 
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={resetGame}
              >
                Play Again
              </button>
            </div>
          </div>
        )}
        
        {/* Level complete screen */}
        {gameState.levelComplete && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70">
            <div className="text-center p-8 bg-white rounded-lg">
              <h2 className="text-2xl font-bold text-green-600 mb-4">Level Complete!</h2>
              <p className="mb-4">Your score: {gameState.score}</p>
              <button 
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={resetGame}
              >
                Play Again
              </button>
            </div>
          </div>
        )}
        
        {/* Jump controls help */}
        <div className="absolute bottom-4 right-4 bg-black/50 text-white p-2 rounded text-sm">
          Press <span className="font-bold">Up Arrow</span> or <span className="font-bold">Space</span> to jump
        </div>
      </div>
    </div>
  );
};

export default GameContainer;