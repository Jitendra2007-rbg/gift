import React from 'react';
import { Heart } from 'lucide-react';
import { CONTENT } from '../constants';
import { useTypingEffect } from '../hooks/useTypingEffect';
import { ThreeDScene } from './ThreeDScene';

interface HeroSectionProps {
  onEnter: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onEnter }) => {
  const { displayedText: title } = useTypingEffect(CONTENT.hero.title, 100, 500);
  
  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-romantic-50 via-white to-romantic-100">
      {/* 3D Background */}
      <ThreeDScene />

      {/* Content Overlay */}
      <div className="z-10 flex flex-col items-center text-center px-4 max-w-4xl mx-auto">
        
        {/* Decorative top element */}
        <div className="mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s', opacity: 0 }}>
          <Heart className="w-12 h-12 text-romantic-500 animate-heartbeat fill-romantic-500 opacity-80" />
        </div>

        {/* Animated Headline */}
        <h1 className="font-script text-6xl md:text-8xl lg:text-9xl text-romantic-900 mb-6 drop-shadow-sm min-h-[1.2em]">
          {title}
          <span className="animate-pulse inline-block w-[3px] h-[1em] bg-romantic-400 ml-2 align-middle"></span>
        </h1>

        {/* Subtitle fading in after typing finishes roughly */}
        <p className="font-sans text-lg md:text-xl text-gray-600 mb-12 max-w-2xl font-light tracking-wide animate-fade-in-up" 
           style={{ animationDelay: '2.5s', opacity: 0 }}>
          {CONTENT.hero.subtitle}
        </p>

        {/* Enter Button */}
        <button
          onClick={onEnter}
          className="group relative px-8 py-4 bg-white/40 backdrop-blur-md border border-romantic-200 rounded-full text-romantic-600 font-sans font-medium text-lg tracking-wider hover:bg-white/60 hover:text-romantic-700 hover:scale-105 hover:border-romantic-300 transition-all duration-300 animate-fade-in-up animate-pulse-glow"
          style={{ animationDelay: '3s', opacity: 0 }}
        >
          <span className="flex items-center gap-2">
            {CONTENT.hero.buttonText}
            <Heart className="w-5 h-5 group-hover:fill-romantic-400 transition-all duration-300" />
          </span>
        </button>
      </div>
    </div>
  );
};
