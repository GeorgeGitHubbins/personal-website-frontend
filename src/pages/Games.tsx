import React, { useState, useEffect, useRef } from 'react';

const WhackAMole: React.FC = () => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [activeHole, setActiveHole] = useState<number | null>(null);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'ended'>('idle');
  const timerRef = useRef<number | null>(null);
  const moleRef = useRef<number | null>(null);

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setGameState('playing');
  };

  useEffect(() => {
    if (gameState === 'playing') {
      timerRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setGameState('ended');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      moleRef.current = window.setInterval(() => {
        setActiveHole(Math.floor(Math.random() * 9));
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      if (moleRef.current) clearInterval(moleRef.current);
      setActiveHole(null);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (moleRef.current) clearInterval(moleRef.current);
    };
  }, [gameState]);

  const handleWhack = (index: number) => {
    if (index === activeHole && gameState === 'playing') {
      setScore(score + 1);
      setActiveHole(null);
    }
  };

  return (
    <div className="section game-section" style={{ textAlign: 'center' }}>
      <h2>Whack-a-Mole!</h2>
      {gameState === 'idle' && (
        <button onClick={startGame} className="cta-button" style={{ border: 'none', cursor: 'pointer' }}>
          Start Game
        </button>
      )}
      {gameState === 'playing' && (
        <>
          <div style={{ fontSize: '24px', marginBottom: '10px' }}>Score: {score}</div>
          <div style={{ fontSize: '18px', marginBottom: '10px' }}>Time: {timeLeft}s</div>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(3, 1fr)', 
            gap: '10px', 
            maxWidth: '300px', 
            margin: '0 auto' 
          }}>
            {Array.from({ length: 9 }).map((_, i) => (
              <div 
                key={i}
                onClick={() => handleWhack(i)}
                style={{ 
                  width: '80px', 
                  height: '80px', 
                  backgroundColor: activeHole === i ? '#8B4513' : '#654321', 
                  borderRadius: '50%',
                  cursor: 'pointer',
                  transition: 'background-color 0.1s'
                }}
              />
            ))}
          </div>
        </>
      )}
      {gameState === 'ended' && (
        <>
          <h3>Game Over!</h3>
          <p>Your final score: {score}</p>
          <button onClick={startGame} className="cta-button" style={{ border: 'none', cursor: 'pointer' }}>
            Try Again
          </button>
        </>
      )}
    </div>
  );
};

export default WhackAMole;
