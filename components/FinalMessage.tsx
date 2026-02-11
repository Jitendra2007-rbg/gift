import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

// Custom Confetti Logic
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
        y: canvas.height / 2 + 100,
        r: Math.random() * 6 + 2,
        dx: Math.random() * 20 - 10,
        dy: Math.random() * -20 - 5,
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
        p.dy += 0.1;
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

  return <canvas ref={canvasRef} className="fixed inset-0 z-50 pointer-events-none" />;
};

export const FinalMessage: React.FC = () => {
  const { elementRef, isVisible } = useIntersectionObserver();
  const [isRevealed, setIsRevealed] = useState(false);
  const [confettiTrigger, setConfettiTrigger] = useState(0);
  const [typedText, setTypedText] = useState("");
  const fullText = "I Love You Bhabitha";

  const handleReveal = () => {
    setIsRevealed(true);
    setConfettiTrigger(prev => prev + 1);
  };

  useEffect(() => {
    if (isRevealed) {
      let index = 0;
      const interval = setInterval(() => {
        setTypedText(fullText.slice(0, index + 1));
        index++;
        if (index === fullText.length) clearInterval(interval);
      }, 150); // Typing speed
      return () => clearInterval(interval);
    }
  }, [isRevealed]);

  return (
    <section id="message" className="py-32 bg-romantic-900 relative overflow-hidden flex flex-col items-center justify-center min-h-[80vh]">
      <ConfettiCanvas trigger={confettiTrigger} />

      {/* Decorative stars */}
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
        className={`container mx-auto px-4 max-w-3xl relative z-10 transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
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
          <div className="bg-white/10 backdrop-blur-md border border-romantic-400/30 p-8 md:p-16 rounded-[2rem] text-center text-romantic-50 animate-fade-in-up flex flex-col items-center">

            {/* Ring Animation */}
            <div className="relative w-32 h-32 mb-8 flex items-center justify-center">
              <div className="absolute inset-0 border-4 border-romantic-400 rounded-full animate-[spin-slow_4s_linear_infinite]"></div>
              <div className="absolute inset-2 border-4 border-romantic-200 rounded-full animate-[spin-slow_3s_linear_infinite_reverse]"></div>
              <Heart className="w-16 h-16 text-romantic-500 fill-romantic-500 animate-heartbeat" />
            </div>

            {/* Typing Text */}
            <h2 className="font-script text-5xl md:text-7xl mb-8 text-white drop-shadow-lg min-h-[1.2em]">
              {typedText}
              <span className="animate-pulse inline-block w-[3px] h-[0.8em] bg-romantic-400 ml-2 align-middle"></span>
            </h2>

            <button
              onClick={() => setConfettiTrigger(prev => prev + 1)}
              className="text-romantic-300 hover:text-white font-sans text-sm tracking-widest uppercase transition-colors border-b border-transparent hover:border-white pb-1 mt-8"
            >
              Replay the Magic
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
