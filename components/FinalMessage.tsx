import React, { useState, useEffect, useRef } from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { CONTENT } from '../constants';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

// Custom Confetti Logic within component to ensure no external dependencies fail
const ConfettiCanvas: React.FC<{ trigger: number }> = ({ trigger }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (trigger === 0 || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: any[] = [];
    const colors = ['#f472b6', '#fb7185', '#fbcfe8', '#ffffff', '#ec4899'];

    for (let i = 0; i < 150; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2 + 100, // Start slightly below center
        r: Math.random() * 6 + 2,
        dx: Math.random() * 20 - 10,
        dy: Math.random() * -20 - 5, // Shoot upwards
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.floor(Math.random() * 10) - 10,
        tiltAngleInc: (Math.random() * 0.07) + 0.05,
        tiltAngle: 0
      });
    }

    let animationId: number;
    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      let remainingParticles = false;

      particles.forEach(p => {
        p.tiltAngle += p.tiltAngleInc;
        p.y += (Math.cos(p.tiltAngle) + 1 + p.r / 2) / 2;
        p.x += Math.sin(p.tiltAngle) * 2 + p.dx * 0.5;
        p.dy += 0.1; // gravity
        p.y += p.dy;

        if (p.y <= canvas.height) remainingParticles = true;

        ctx.beginPath();
        ctx.lineWidth = p.r;
        ctx.strokeStyle = p.color;
        ctx.moveTo(p.x + p.tilt + p.r, p.y);
        ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r);
        ctx.stroke();
      });

      if (remainingParticles && frame < 400) {
        animationId = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    render();

    return () => cancelAnimationFrame(animationId);
  }, [trigger]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 z-50 pointer-events-none"
    />
  );
};

export const FinalMessage: React.FC = () => {
  const { elementRef, isVisible } = useIntersectionObserver();
  const [isRevealed, setIsRevealed] = useState(false);
  const [confettiTrigger, setConfettiTrigger] = useState(0);

  const handleReveal = () => {
    setIsRevealed(true);
    setConfettiTrigger(prev => prev + 1);
  };

  return (
    <section id="message" className="py-32 bg-romantic-900 relative overflow-hidden flex flex-col items-center justify-center min-h-[80vh]">
      <ConfettiCanvas trigger={confettiTrigger} />
      
      {/* Decorative stars/particles */}
      <div className="absolute inset-0 opacity-20">
        {Array.from({ length: 50 }).map((_, i) => (
          <div 
            key={i} 
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div 
        ref={elementRef}
        className={`container mx-auto px-4 max-w-3xl relative z-10 transition-all duration-1000 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
        }`}
      >
        {!isRevealed ? (
          <div className="text-center">
            <h2 className="font-script text-5xl md:text-6xl text-romantic-100 mb-12">I have something to tell you...</h2>
            <button 
              onClick={handleReveal}
              className="group relative inline-flex items-center justify-center px-10 py-5 bg-romantic-500 text-white rounded-full font-sans font-medium text-lg tracking-widest overflow-hidden hover:scale-105 transition-transform duration-300 shadow-[0_0_40px_rgba(236,72,153,0.4)]"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <span className="relative flex items-center gap-3">
                <Sparkles className="w-5 h-5" />
                Open Message
              </span>
            </button>
          </div>
        ) : (
          <div className="bg-white/10 backdrop-blur-md border border-romantic-400/30 p-8 md:p-16 rounded-[2rem] text-center text-romantic-50 animate-fade-in-up">
            <Heart className="w-16 h-16 text-romantic-400 mx-auto mb-8 animate-heartbeat fill-romantic-400" />
            <h2 className="font-script text-5xl md:text-7xl mb-8 text-white drop-shadow-lg">
              {CONTENT.finalMessage.title}
            </h2>
            <p className="font-serif text-xl md:text-2xl leading-relaxed mb-12 font-light">
              {CONTENT.finalMessage.body}
            </p>
            <button 
              onClick={() => setConfettiTrigger(prev => prev + 1)}
              className="text-romantic-300 hover:text-white font-sans text-sm tracking-widest uppercase transition-colors border-b border-transparent hover:border-white pb-1"
            >
              {CONTENT.finalMessage.buttonText}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
