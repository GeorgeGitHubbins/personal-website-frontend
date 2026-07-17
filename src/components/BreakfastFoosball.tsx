import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';

// Sound generator using Web Audio API (completely client-side, zero assets required)
class SoundEffects {
  private ctx: AudioContext | null = null;

  constructor() {
    // AudioContext will be initialized on first user interaction
  }

  private init() {
    if (!this.ctx) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  playHit() {
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.frequency.setValueAtTime(150, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 0.1);

      gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.1);
    } catch (e) {
      console.warn("Web Audio API not supported or blocked: ", e);
    }
  }

  playGoal() {
    try {
      this.init();
      if (!this.ctx) return;
      
      // Whistle sound
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(1200, this.ctx.currentTime + 0.15);
      osc.frequency.linearRampToValueAtTime(900, this.ctx.currentTime + 0.3);

      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.4);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.4);

      // Simple noise synth for crowd cheer
      const bufferSize = this.ctx.sampleRate * 1.0; // 1 second
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const noiseFilter = this.ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.value = 1000;
      noiseFilter.Q.value = 1.0;

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.9);

      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(this.ctx.destination);

      noise.start();
      noise.stop(this.ctx.currentTime + 1.0);
    } catch (e) {
      console.warn("Web Audio API not supported or blocked: ", e);
    }
  }

  playBounce() {
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.frequency.setValueAtTime(220, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.05);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch (e) {
      console.warn("Web Audio API not supported or blocked: ", e);
    }
  }
}

interface Player {
  relY: number;
  type: 'egg' | 'toast' | 'pancake' | 'waffle' | 'bacon' | 'sausage';
}

interface Rod {
  id: string;
  name: string;
  x: number;
  yOffset: number;
  players: Player[];
  team: 'left' | 'right';
  swingAngle: number; // 0 to 2*PI, handles rotation
  isSwinging: boolean;
  swingSpeed: number;
}

const BreakfastFoosball: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const soundEffects = useMemo(() => new SoundEffects(), []);

  // Game state
  const [scoreLeft, setScoreLeft] = useState(0);
  const [scoreRight, setScoreRight] = useState(0);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'goal' | 'gameover'>('idle');
  const [winner, setWinner] = useState<'left' | 'right' | null>(null);
  const [aiMode, setAiMode] = useState<boolean>(true);

  // Constants
  const fieldWidth = 800;
  const fieldHeight = 500;
  const goalHeight = 160;
  const ballRadius = 14;

  // Ball physical properties
  const ballRef = useRef({
    x: fieldWidth / 2,
    y: fieldHeight / 2,
    vx: 4,
    vy: 2,
  });

  // Rod configuration
  const rodsRef = useRef<Rod[]>([
    {
      id: 'rod-1',
      name: 'Toast Goalie',
      x: 90,
      yOffset: fieldHeight / 2,
      team: 'left',
      swingAngle: 0,
      isSwinging: false,
      swingSpeed: 0,
      players: [{ relY: 0, type: 'toast' }]
    },
    {
      id: 'rod-2',
      name: 'Egg Attackers',
      x: 280,
      yOffset: fieldHeight / 2,
      team: 'left',
      swingAngle: 0,
      isSwinging: false,
      swingSpeed: 0,
      players: [
        { relY: -110, type: 'egg' },
        { relY: 0, type: 'egg' },
        { relY: 110, type: 'egg' }
      ]
    },
    {
      id: 'rod-3',
      name: 'Pancake Defenders',
      x: 520,
      yOffset: fieldHeight / 2,
      team: 'right',
      swingAngle: 0,
      isSwinging: false,
      swingSpeed: 0,
      players: [
        { relY: -110, type: 'pancake' },
        { relY: 0, type: 'pancake' },
        { relY: 110, type: 'pancake' }
      ]
    },
    {
      id: 'rod-4',
      name: 'Waffle Goalie',
      x: 710,
      yOffset: fieldHeight / 2,
      team: 'right',
      swingAngle: 0,
      isSwinging: false,
      swingSpeed: 0,
      players: [{ relY: 0, type: 'waffle' }]
    }
  ]);

  // Drag tracking
  const activeDragRef = useRef<{ rodId: string; startY: number; startYOffset: number } | null>(null);

  // Trigger swing
  const swingRod = useCallback((rodId: string) => {
    const rod = rodsRef.current.find(r => r.id === rodId);
    if (rod && !rod.isSwinging) {
      rod.isSwinging = true;
      rod.swingAngle = 0;
      rod.swingSpeed = 0.25; // Speed of rotation
      soundEffects.playHit();
    }
  }, [soundEffects]);

  // Reset ball to center
  const resetBall = (scoringTeam: 'left' | 'right') => {
    ballRef.current = {
      x: fieldWidth / 2,
      y: fieldHeight / 2,
      vx: scoringTeam === 'left' ? -3.5 : 3.5,
      vy: (Math.random() - 0.5) * 4,
    };
  };

  const startGame = () => {
    setScoreLeft(0);
    setScoreRight(0);
    setGameState('playing');
    setWinner(null);
    resetBall('left');
  };

  // Keyboard controls listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState !== 'playing') return;
      
      const speed = 18;
      const rods = rodsRef.current;

      // Toast Goalie controls: W/S to move, Space or D to swing
      if (e.key.toLowerCase() === 'w') {
        const r = rods.find(x => x.id === 'rod-1');
        if (r) r.yOffset = Math.max(50, Math.min(fieldHeight - 50, r.yOffset - speed));
      }
      if (e.key.toLowerCase() === 's') {
        const r = rods.find(x => x.id === 'rod-1');
        if (r) r.yOffset = Math.max(50, Math.min(fieldHeight - 50, r.yOffset + speed));
      }
      if (e.key.toLowerCase() === 'd' || e.key === ' ') {
        swingRod('rod-1');
      }

      // Egg Attackers controls: ArrowUp/ArrowDown to move, Enter or RightArrow to swing
      if (e.key === 'ArrowUp') {
        const r = rods.find(x => x.id === 'rod-2');
        if (r) r.yOffset = Math.max(120, Math.min(fieldHeight - 120, r.yOffset - speed));
      }
      if (e.key === 'ArrowDown') {
        const r = rods.find(x => x.id === 'rod-2');
        if (r) r.yOffset = Math.max(120, Math.min(fieldHeight - 120, r.yOffset + speed));
      }
      if (e.key === 'ArrowRight' || e.key === 'Control') {
        swingRod('rod-2');
      }

      // Multiplayer mode keyboard mapping (if AI is disabled)
      if (!aiMode) {
        // Player 2 Goalie: O/L to move, K to swing
        if (e.key.toLowerCase() === 'o') {
          const r = rods.find(x => x.id === 'rod-4');
          if (r) r.yOffset = Math.max(50, Math.min(fieldHeight - 50, r.yOffset - speed));
        }
        if (e.key.toLowerCase() === 'l') {
          const r = rods.find(x => x.id === 'rod-4');
          if (r) r.yOffset = Math.max(50, Math.min(fieldHeight - 50, r.yOffset + speed));
        }
        if (e.key.toLowerCase() === 'k') {
          swingRod('rod-4');
        }
        // Player 2 Attackers: I/K to move, J to swing
        if (e.key.toLowerCase() === 'u') {
          const r = rods.find(x => x.id === 'rod-3');
          if (r) r.yOffset = Math.max(120, Math.min(fieldHeight - 120, r.yOffset - speed));
        }
        if (e.key.toLowerCase() === 'j') {
          const r = rods.find(x => x.id === 'rod-3');
          if (r) r.yOffset = Math.max(120, Math.min(fieldHeight - 120, r.yOffset + speed));
        }
        if (e.key.toLowerCase() === 'h') {
          swingRod('rod-3');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [gameState, aiMode, swingRod]);

  // Main game logic loop and rendering
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    // Draw functions for breakfast food shapes
    const drawToast = (ctx: CanvasRenderingContext2D, cx: number, cy: number, scaleX: number) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(scaleX, 1.0);
      
      // Crust
      ctx.fillStyle = '#8e44ad'; // Custom purple theme crust
      ctx.fillStyle = '#6e3c1a'; // Warm brown crust
      ctx.beginPath();
      ctx.roundRect(-24, -24, 48, 48, 8);
      ctx.fill();

      // Inside Bread
      ctx.fillStyle = '#f5e0cf';
      ctx.beginPath();
      ctx.roundRect(-20, -20, 40, 40, 6);
      ctx.fill();

      // Butter
      ctx.fillStyle = '#f1c40f';
      ctx.fillRect(-6, -6, 12, 12);
      
      // Face
      ctx.fillStyle = '#333';
      ctx.beginPath();
      ctx.arc(-8, -4, 2, 0, Math.PI * 2);
      ctx.arc(8, -4, 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(0, 2, 5, 0, Math.PI);
      ctx.stroke();

      ctx.restore();
    };

    const drawEgg = (ctx: CanvasRenderingContext2D, cx: number, cy: number, scaleX: number) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(scaleX, 1.0);

      // Egg White
      ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
      ctx.strokeStyle = '#ddd';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.ellipse(0, 0, 26, 22, Math.PI / 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Yolk
      ctx.fillStyle = '#f39c12';
      ctx.beginPath();
      ctx.arc(4, -2, 11, 0, Math.PI * 2);
      ctx.fill();

      // Yolk gloss
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.beginPath();
      ctx.arc(1, -5, 3, 0, Math.PI * 2);
      ctx.fill();

      // Face on Yolk
      ctx.fillStyle = '#333';
      ctx.beginPath();
      ctx.arc(1, -2, 1.5, 0, Math.PI * 2);
      ctx.arc(7, -2, 1.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const drawPancake = (ctx: CanvasRenderingContext2D, cx: number, cy: number, scaleX: number) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(scaleX, 1.0);

      // Pancake stack
      ctx.fillStyle = '#d35400'; // Darker crust underneath
      ctx.beginPath();
      ctx.ellipse(0, 3, 24, 20, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#e67e22'; // Golden brown top pancake
      ctx.beginPath();
      ctx.ellipse(0, -1, 24, 20, 0, 0, Math.PI * 2);
      ctx.fill();

      // Butter
      ctx.fillStyle = '#f1c40f';
      ctx.fillRect(-5, -6, 10, 8);

      // Syrup drip
      ctx.fillStyle = 'rgba(120, 40, 0, 0.6)';
      ctx.beginPath();
      ctx.ellipse(5, 5, 8, 4, 0, 0, Math.PI * 2);
      ctx.fill();

      // Face
      ctx.fillStyle = '#333';
      ctx.beginPath();
      ctx.arc(-6, -2, 1.5, 0, Math.PI * 2);
      ctx.arc(6, -2, 1.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(0, 2, 4, 0, Math.PI);
      ctx.stroke();

      ctx.restore();
    };

    const drawWaffle = (ctx: CanvasRenderingContext2D, cx: number, cy: number, scaleX: number) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.scale(scaleX, 1.0);

      // Waffle base
      ctx.fillStyle = '#f39c12';
      ctx.beginPath();
      ctx.roundRect(-22, -22, 44, 44, 6);
      ctx.fill();

      // Waffle grid lines
      ctx.strokeStyle = '#d35400';
      ctx.lineWidth = 2;
      ctx.strokeRect(-16, -16, 32, 32);
      ctx.beginPath();
      ctx.moveTo(-6, -16); ctx.lineTo(-6, 16);
      ctx.moveTo(6, -16); ctx.lineTo(6, 16);
      ctx.moveTo(-16, -6); ctx.lineTo(16, -6);
      ctx.moveTo(-16, 6); ctx.lineTo(16, 6);
      ctx.stroke();

      // Butter
      ctx.fillStyle = '#f1c40f';
      ctx.fillRect(-6, -6, 12, 12);

      // Face
      ctx.fillStyle = '#333';
      ctx.beginPath();
      ctx.arc(-8, 10, 2, 0, Math.PI * 2);
      ctx.arc(8, 10, 2, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const updateAndRender = () => {
      const ball = ballRef.current;
      const rods = rodsRef.current;

      // 1. PHYSICAL UPDATES (only when playing)
      if (gameState === 'playing') {
        // AI logic
        if (aiMode) {
          rods.forEach(rod => {
            if (rod.team === 'right') {
              // AI tracking speed
              const speed = 3.5;
              const targetY = ball.y;
              
              // Move rod to intercept ball y-coordinate
              const dy = targetY - rod.yOffset;
              if (Math.abs(dy) > 10) {
                const step = Math.sign(dy) * speed;
                rod.yOffset += step;
              }

              // Constrain rod positions
              const limit = rod.players.length === 1 ? 50 : 120;
              rod.yOffset = Math.max(limit, Math.min(fieldHeight - limit, rod.yOffset));

              // Automatically swing AI rod if ball is close and moving towards it
              const distToRodX = ball.x - rod.x;
              const isBallNear = Math.abs(distToRodX) < 45;
              const isClosing = (rod.x === 520 && ball.vx > 0) || (rod.x === 710 && ball.vx > 0);
              
              if (isBallNear && isClosing && Math.random() < 0.25) {
                // Determine if any player on the rod is close in Y-axis
                const hasPlayerInReach = rod.players.some(p => {
                  const py = rod.yOffset + p.relY;
                  return Math.abs(ball.y - py) < 35;
                });
                if (hasPlayerInReach) {
                  swingRod(rod.id);
                }
              }
            }
          });
        }

        // Update swings/rotations
        rods.forEach(rod => {
          if (rod.isSwinging) {
            rod.swingAngle += rod.swingSpeed;
            if (rod.swingAngle >= Math.PI * 2) {
              rod.swingAngle = 0;
              rod.isSwinging = false;
            }
          }
        });

        // Update ball physics
        ball.x += ball.vx;
        ball.y += ball.vy;

        // Friction/damping (keeps ball under control)
        ball.vx *= 0.999;
        ball.vy *= 0.999;

        // Wall collisions (top and bottom)
        if (ball.y - ballRadius < 0) {
          ball.y = ballRadius;
          ball.vy = -ball.vy;
          soundEffects.playBounce();
        } else if (ball.y + ballRadius > fieldHeight) {
          ball.y = fieldHeight - ballRadius;
          ball.vy = -ball.vy;
          soundEffects.playBounce();
        }

        // Goal Check
        const inGoalYRange = ball.y > (fieldHeight - goalHeight) / 2 && ball.y < (fieldHeight + goalHeight) / 2;
        if (inGoalYRange) {
          if (ball.x < 10) {
            // Right scores!
            soundEffects.playGoal();
            setScoreRight(prev => {
              const next = prev + 1;
              if (next >= 5) {
                setGameState('gameover');
                setWinner('right');
              } else {
                setGameState('goal');
                setTimeout(() => {
                  setGameState('playing');
                  resetBall('right');
                }, 2000);
              }
              return next;
            });
          } else if (ball.x > fieldWidth - 10) {
            // Left scores!
            soundEffects.playGoal();
            setScoreLeft(prev => {
              const next = prev + 1;
              if (next >= 5) {
                setGameState('gameover');
                setWinner('left');
              } else {
                setGameState('goal');
                setTimeout(() => {
                  setGameState('playing');
                  resetBall('left');
                }, 2000);
              }
              return next;
            });
          }
        } else {
          // Normal goal wall bounce (outside goal width)
          if (ball.x - ballRadius < 15) {
            ball.x = 15 + ballRadius;
            ball.vx = -ball.vx;
            soundEffects.playBounce();
          } else if (ball.x + ballRadius > fieldWidth - 15) {
            ball.x = fieldWidth - 15 - ballRadius;
            ball.vx = -ball.vx;
            soundEffects.playBounce();
          }
        }

        // Collisions with players
        rods.forEach(rod => {
          const isLeft = rod.team === 'left';
          // const swingScale = Math.cos(rod.swingAngle); // Shrinks width to simulate 3D spin
          const isKicking = rod.isSwinging && Math.sin(rod.swingAngle) > 0.1;

          rod.players.forEach(p => {
            const px = rod.x;
            const py = rod.yOffset + p.relY;

            // Player hitbox width/height (approximate based on food size)
            // const pWidth = 24 * Math.abs(swingScale);
            // const pHeight = 22;

            // Simple distance check
            const dx = ball.x - px;
            const dy = ball.y - py;
            const distSq = dx * dx + dy * dy;
            
            // Interaction threshold
            const collisionRadius = ballRadius + 22;
            if (distSq < collisionRadius * collisionRadius) {
              const dist = Math.sqrt(distSq);
              
              if (isKicking) {
                // Kicking/Twisting launches ball with massive momentum!
                const force = isLeft ? 14 : -14;
                ball.vx = force + (Math.random() - 0.5) * 3;
                ball.vy = (dy / dist) * 8 + (Math.random() - 0.5) * 3;
                soundEffects.playHit();
                
                // Reposition ball slightly ahead to avoid double collisions
                ball.x = px + (isLeft ? 30 : -30);
              } else {
                // Classic bounce
                const normalX = dx / dist;
                const normalY = dy / dist;

                // Push ball out of overlap
                ball.x = px + normalX * collisionRadius;
                ball.y = py + normalY * collisionRadius;

                // Reflected velocity vector
                const dot = ball.vx * normalX + ball.vy * normalY;
                ball.vx = (ball.vx - 2 * dot * normalX) * 0.9;
                ball.vy = (ball.vy - 2 * dot * normalY) * 0.9;
                
                // Ensure a minimum horizontal push to prevent stuck balls
                if (Math.abs(ball.vx) < 1.5) {
                  ball.vx = isLeft ? 2.0 : -2.0;
                }

                soundEffects.playBounce();
              }
            }
          });
        });
      }

      // 2. RENDERING FIELD
      ctx.clearRect(0, 0, fieldWidth, fieldHeight);

      // Pitch Grass
      ctx.fillStyle = '#27ae60';
      ctx.fillRect(0, 0, fieldWidth, fieldHeight);

      // White Pitch lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 4;
      ctx.strokeRect(15, 15, fieldWidth - 30, fieldHeight - 30);

      // Center Line and circle
      ctx.beginPath();
      ctx.moveTo(fieldWidth / 2, 15);
      ctx.lineTo(fieldWidth / 2, fieldHeight - 15);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(fieldWidth / 2, fieldHeight / 2, 70, 0, Math.PI * 2);
      ctx.stroke();

      // Left Penalty Area
      ctx.strokeRect(15, (fieldHeight - 240) / 2, 90, 240);
      // Right Penalty Area
      ctx.strokeRect(fieldWidth - 105, (fieldHeight - 240) / 2, 90, 240);

      // Left and Right Goals
      ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 5;
      
      // Goalposts outlines
      ctx.strokeRect(-10, (fieldHeight - goalHeight) / 2, 25, goalHeight);
      ctx.strokeRect(fieldWidth - 15, (fieldHeight - goalHeight) / 2, 25, goalHeight);

      // Draw metallic rods running vertically
      rods.forEach(rod => {
        ctx.strokeStyle = '#bdc3c7';
        ctx.lineWidth = 8;
        
        ctx.shadowColor = 'rgba(0,0,0,0.3)';
        ctx.shadowBlur = 4;
        ctx.shadowOffsetY = 2;

        ctx.beginPath();
        ctx.moveTo(rod.x, 15);
        ctx.lineTo(rod.x, fieldHeight - 15);
        ctx.stroke();

        ctx.shadowBlur = 0;
        ctx.shadowOffsetY = 0;

        // Draw players on the rods
        rod.players.forEach(p => {
          const py = rod.yOffset + p.relY;
          const scaleX = Math.cos(rod.swingAngle); // scale horizontally to represent rotation
          
          if (p.type === 'toast') {
            drawToast(ctx, rod.x, py, scaleX);
          } else if (p.type === 'egg') {
            drawEgg(ctx, rod.x, py, scaleX);
          } else if (p.type === 'pancake') {
            drawPancake(ctx, rod.x, py, scaleX);
          } else if (p.type === 'waffle') {
            drawWaffle(ctx, rod.x, py, scaleX);
          }
        });
      });

      // Draw Ball (styled like a little butter block or orange juice sphere)
      ctx.save();
      ctx.shadowColor = 'rgba(0,0,0,0.3)';
      ctx.shadowBlur = 6;
      ctx.shadowOffsetY = 3;
      
      ctx.fillStyle = '#fff'; // White soccer ball with orange segments (like a fresh breakfast orange!)
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ballRadius, 0, Math.PI * 2);
      ctx.fill();
      
      // Orange segment markings
      ctx.strokeStyle = '#e67e22';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ballRadius - 4, 0, Math.PI * 2);
      ctx.stroke();

      for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 4) {
        ctx.beginPath();
        ctx.moveTo(ball.x, ball.y);
        ctx.lineTo(
          ball.x + Math.cos(angle) * ballRadius,
          ball.y + Math.sin(angle) * ballRadius
        );
        ctx.stroke();
      }

      ctx.restore();

      // Goal text animation
      if (gameState === 'goal') {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
        ctx.fillRect(0, 0, fieldWidth, fieldHeight);

        ctx.fillStyle = '#f1c40f';
        ctx.font = 'bold 54px Outfit, Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.shadowColor = '#d35400';
        ctx.shadowBlur = 10;
        ctx.fillText('GOAL!!! 🥞🍳', fieldWidth / 2, fieldHeight / 2);
      }

      animId = requestAnimationFrame(updateAndRender);
    };

    updateAndRender();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [gameState, aiMode, swingRod, soundEffects]);

  // Touch and mouse drags on canvas
  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (gameState !== 'playing') return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;

    // Detect if clicking near any Left Team rod (User rods)
    const rods = rodsRef.current;
    const userRods = rods.filter(r => r.team === 'left');

    let clickedRod: Rod | null = null;
    userRods.forEach(rod => {
      // Allow a 40px bounding box margin around the rod X
      if (Math.abs(x - rod.x) < 40) {
        clickedRod = rod;
      }
    });

    if (clickedRod) {
      activeDragRef.current = {
        rodId: (clickedRod as Rod).id,
        startY: e.clientY,
        startYOffset: (clickedRod as Rod).yOffset,
      };
      
      // Auto swing on quick tap/click
      swingRod((clickedRod as Rod).id);
    }
  };

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const drag = activeDragRef.current;
    if (!drag) return;

    const dy = e.clientY - drag.startY;
    const rod = rodsRef.current.find(r => r.id === drag.rodId);
    
    if (rod) {
      rod.yOffset = drag.startYOffset + dy;
      // Constraint depending on players
      const limit = rod.players.length === 1 ? 50 : 120;
      rod.yOffset = Math.max(limit, Math.min(fieldHeight - limit, rod.yOffset));
    }
  };

  const handleCanvasMouseUp = () => {
    activeDragRef.current = null;
  };

  return (
    <div className="foosball-playground" ref={containerRef} style={{ width: '100%' }}>
      <div className="foosball-controls-panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '15px' }}>
        <div>
          <h3>🍳 Breakfast Table Foosball</h3>
          <p style={{ margin: 0, opacity: 0.8 }}>Twist the rods to hit the ball and score in the goal!</p>
        </div>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <button 
            className="btn" 
            onClick={() => setAiMode(!aiMode)}
            style={{ 
              background: aiMode ? 'var(--primary-color)' : 'transparent',
              border: '1px solid var(--primary-color)',
              color: aiMode ? '#fff' : 'var(--text-color)',
              padding: '6px 12px',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            {aiMode ? 'AI Opponent: ON' : 'AI Opponent: OFF (Local 2P)'}
          </button>
          
          <button 
            className="btn" 
            onClick={startGame}
            style={{ 
              background: 'linear-gradient(135deg, #e67e22, #f39c12)',
              border: 'none',
              color: '#fff',
              padding: '6px 16px',
              borderRadius: '6px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            Reset Game
          </button>
        </div>
      </div>

      {/* Scoreboard */}
      <div className="scoreboard-container" style={{
        background: 'rgba(25, 25, 25, 0.9)',
        border: '2px solid #e67e22',
        borderRadius: '12px 12px 0 0',
        padding: '15px 25px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
        position: 'relative'
      }}>
        <div className="team-score" style={{ textAlign: 'left' }}>
          <span style={{ fontSize: '0.9rem', color: '#bdc3c7', textTransform: 'uppercase', letterSpacing: '1px' }}>Team Breakfast Plate</span>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#e67e22', fontFamily: 'Outfit, sans-serif' }}>
            🍞🍳 {scoreLeft}
          </div>
        </div>

        <div style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 'bold', border: '1px solid rgba(255,255,255,0.2)', padding: '4px 12px', borderRadius: '4px', background: 'rgba(0,0,0,0.3)' }}>
          VS
        </div>

        <div className="team-score" style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '0.9rem', color: '#bdc3c7', textTransform: 'uppercase', letterSpacing: '1px' }}>Team Bakery</span>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#f1c40f', fontFamily: 'Outfit, sans-serif' }}>
            {scoreRight} 🥞🧇
          </div>
        </div>
      </div>

      {/* Canvas Field Wrapper */}
      <div className="canvas-wrapper" style={{
        background: '#1e272c',
        border: '3px solid #e67e22',
        borderTop: 'none',
        borderRadius: '0 0 12px 12px',
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
        cursor: 'grab'
      }}>
        {gameState === 'idle' && (
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0, 0, 0, 0.75)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 10,
            color: '#fff',
            padding: '20px'
          }}>
            <h2 style={{ color: '#f1c40f', marginBottom: '15px' }}>Let's Play Breakfast Foosball!</h2>
            <p style={{ maxWidth: '400px', textAlign: 'center', opacity: 0.8, fontSize: '0.95rem', lineHeight: '1.5', marginBottom: '20px' }}>
              Control your rods by **clicking and dragging them up or down** to block. **Click/tap** a rod or press keys to **twist and kick** the ball!
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px', width: '100%', maxWidth: '400px', textAlign: 'left', fontSize: '0.85rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.08)', padding: '10px', borderRadius: '6px' }}>
                <strong style={{ color: '#e67e22' }}>Goalie (Toast):</strong><br/>
                Keyboard: <code>W</code> / <code>S</code> to slide, <code>Space</code> to Twist.<br/>
                Or: Drag with mouse.
              </div>
              <div style={{ background: 'rgba(255,255,255,0.08)', padding: '10px', borderRadius: '6px' }}>
                <strong style={{ color: '#e67e22' }}>Attackers (Eggs):</strong><br/>
                Keyboard: <code>Up</code> / <code>Down</code> to slide, <code>Right Arrow</code> to Twist.<br/>
                Or: Drag with mouse.
              </div>
            </div>
            <button className="btn" onClick={startGame} style={{
              background: 'linear-gradient(135deg, #e67e22, #f39c12)',
              border: 'none',
              color: '#fff',
              fontSize: '1.1rem',
              padding: '12px 30px',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 4px 10px rgba(230, 126, 34, 0.4)'
            }}>
              Start Match! ⚽
            </button>
          </div>
        )}

        {gameState === 'gameover' && (
          <div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0, 0, 0, 0.85)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 10,
            color: '#fff'
          }}>
            <h2 style={{ color: winner === 'left' ? '#e67e22' : '#f1c40f', marginBottom: '15px', fontSize: '2.5rem' }}>
              {winner === 'left' ? '🏆 Team Breakfast Plate Wins!' : '🏆 Team Bakery Wins!'}
            </h2>
            <p style={{ marginBottom: '25px', opacity: 0.8 }}>Score: {scoreLeft} - {scoreRight}</p>
            <button className="btn" onClick={startGame} style={{
              background: 'linear-gradient(135deg, #e67e22, #f39c12)',
              border: 'none',
              color: '#fff',
              fontSize: '1.1rem',
              padding: '12px 30px',
              borderRadius: '8px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>
              Play Again ⚽
            </button>
          </div>
        )}

        <canvas
          ref={canvasRef}
          width={fieldWidth}
          height={fieldHeight}
          onMouseDown={handleCanvasMouseDown}
          onMouseMove={handleCanvasMouseMove}
          onMouseUp={handleCanvasMouseUp}
          onMouseLeave={handleCanvasMouseUp}
          style={{ display: 'block', width: '100%', height: 'auto' }}
        />
      </div>

      {/* On-screen controls for mobile/mouse users */}
      {gameState === 'playing' && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '15px' }}>
          <button 
            className="btn"
            onClick={() => swingRod('rod-1')}
            style={{ 
              background: '#34495e',
              border: '1px solid #7f8c8d',
              color: '#fff',
              padding: '8px 16px',
              borderRadius: '6px',
              fontSize: '0.85rem',
              cursor: 'pointer'
            }}
          >
            Twist Goalie (Toast) 🍞
          </button>
          <button 
            className="btn"
            onClick={() => swingRod('rod-2')}
            style={{ 
              background: '#34495e',
              border: '1px solid #7f8c8d',
              color: '#fff',
              padding: '8px 16px',
              borderRadius: '6px',
              fontSize: '0.85rem',
              cursor: 'pointer'
            }}
          >
            Twist Attackers (Egg) 🍳
          </button>
          {!aiMode && (
            <>
              <button 
                className="btn"
                onClick={() => swingRod('rod-3')}
                style={{ 
                  background: '#2c3e50',
                  border: '1px solid #7f8c8d',
                  color: '#fff',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                Twist P2 Attackers (Pancake) 🥞
              </button>
              <button 
                className="btn"
                onClick={() => swingRod('rod-4')}
                style={{ 
                  background: '#2c3e50',
                  border: '1px solid #7f8c8d',
                  color: '#fff',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                Twist P2 Goalie (Waffle) 🧇
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default BreakfastFoosball;
