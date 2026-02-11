import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isUnlocked: boolean;
}

interface LockScreenProps {
  onUnlock?: () => void;
}

export const LockScreen: React.FC<LockScreenProps> = ({ onUnlock }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isUnlocked: false,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      // Target: February 14, 2026 at 12:00 AM
      const targetDate = new Date(2026, 1, 14, 0, 0, 0).getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isUnlocked: true,
        });
        // Trigger unlock callback
        if (onUnlock) {
          onUnlock();
        }
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference / (1000 * 60 * 60)) % 24
        );
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({
          days,
          hours,
          minutes,
          seconds,
          isUnlocked: false,
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  if (timeLeft.isUnlocked) {
    return null; // Don't show lock screen if unlocked
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-gradient-to-br from-romantic-900 via-romantic-800 to-romantic-900 flex items-center justify-center overflow-hidden">
      {/* Animated background hearts */}
      <div className="absolute inset-0 opacity-10">
        {Array.from({ length: 20 }).map((_, i) => (
          <Heart
            key={i}
            className="absolute text-romantic-400 animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 40 + 20}px`,
              height: `${Math.random() * 40 + 20}px`,
              animationDelay: `${Math.random() * 2}s`,
            }}
            fill="currentColor"
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-2xl">
        {/* Decorative elements */}
        <div className="mb-8 flex justify-center gap-2">
          <Heart className="w-8 h-8 text-romantic-400 fill-romantic-400 animate-heartbeat" />
          <Heart className="w-6 h-6 text-romantic-300 fill-romantic-300 animate-heartbeat" style={{ animationDelay: '0.2s' }} />
          <Heart className="w-8 h-8 text-romantic-400 fill-romantic-400 animate-heartbeat" style={{ animationDelay: '0.4s' }} />
        </div>

        {/* Main message */}
        <h1 className="font-script text-6xl md:text-7xl text-white mb-6 drop-shadow-lg">
          Coming Soon
        </h1>

        <p className="font-script text-3xl md:text-4xl text-romantic-200 mb-12 leading-relaxed">
          A special message awaits you...
        </p>

        <p className="text-romantic-100 font-sans text-lg md:text-xl mb-16 leading-relaxed tracking-wide">
          This gift is locked with love and will be revealed on
          <span className="block text-romantic-300 font-semibold text-2xl mt-2">
            February 14, 2026 at Midnight
          </span>
        </p>

        {/* Countdown Timer */}
        <div className="bg-white/10 backdrop-blur-md border border-romantic-400/30 rounded-[2rem] p-12 mb-12">
          <p className="text-romantic-200 font-sans text-sm tracking-widest uppercase mb-8">
            Time Until Magic ✨
          </p>

          <div className="grid grid-cols-4 gap-6 md:gap-8">
            {/* Days */}
            <div className="flex flex-col items-center">
              <div className="bg-gradient-to-b from-romantic-400 to-romantic-500 rounded-lg p-6 md:p-8 w-full shadow-lg">
                <span className="text-3xl md:text-5xl font-bold text-white">
                  {String(timeLeft.days).padStart(2, '0')}
                </span>
              </div>
              <p className="text-romantic-300 font-sans text-xs md:text-sm mt-3 tracking-widest uppercase font-semibold">
                Days
              </p>
            </div>

            {/* Hours */}
            <div className="flex flex-col items-center">
              <div className="bg-gradient-to-b from-romantic-400 to-romantic-500 rounded-lg p-6 md:p-8 w-full shadow-lg">
                <span className="text-3xl md:text-5xl font-bold text-white">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
              </div>
              <p className="text-romantic-300 font-sans text-xs md:text-sm mt-3 tracking-widest uppercase font-semibold">
                Hours
              </p>
            </div>

            {/* Minutes */}
            <div className="flex flex-col items-center">
              <div className="bg-gradient-to-b from-romantic-400 to-romantic-500 rounded-lg p-6 md:p-8 w-full shadow-lg">
                <span className="text-3xl md:text-5xl font-bold text-white">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
              </div>
              <p className="text-romantic-300 font-sans text-xs md:text-sm mt-3 tracking-widest uppercase font-semibold">
                Minutes
              </p>
            </div>

            {/* Seconds */}
            <div className="flex flex-col items-center">
              <div className="bg-gradient-to-b from-romantic-400 to-romantic-500 rounded-lg p-6 md:p-8 w-full shadow-lg">
                <span className="text-3xl md:text-5xl font-bold text-white">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
              </div>
              <p className="text-romantic-300 font-sans text-xs md:text-sm mt-3 tracking-widest uppercase font-semibold">
                Seconds
              </p>
            </div>
          </div>
        </div>

        {/* Lovely messages */}
        <div className="space-y-6">
          <p className="text-romantic-200 font-script text-2xl italic">
            "A love story is about to unfold..."
          </p>
          <p className="text-romantic-300 font-sans text-sm tracking-wider">
            Every moment brings us closer to something special
          </p>
        </div>

        {/* Decorative bottom elements */}
        <div className="mt-16 flex justify-center gap-3">
          <div className="w-12 h-1 bg-gradient-to-r from-transparent via-romantic-400 to-transparent rounded-full"></div>
          <Heart className="w-5 h-5 text-romantic-400 fill-romantic-400" />
          <div className="w-12 h-1 bg-gradient-to-r from-transparent via-romantic-400 to-transparent rounded-full"></div>
        </div>
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 opacity-5">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};
