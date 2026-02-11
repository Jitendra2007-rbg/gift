import React, { useState } from 'react';
import { HeroSection } from './components/HeroSection';
import { Navigation } from './components/Navigation';
import { GallerySection } from './components/GallerySection';
import { QuotesSection } from './components/QuotesSection';
import { FinalMessage } from './components/FinalMessage';
import { FloatingHearts } from './components/FloatingHearts';
import { CursorTrail } from './components/CursorTrail';
import { MusicPlayer } from './components/MusicPlayer';
import { LockScreen } from './components/LockScreen';

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [isLocked, setIsLocked] = useState(true);

  const handleEnter = () => {
    setHasEntered(true);
    // Scroll to top immediately when entering main site
    window.scrollTo(0, 0);
  };

  const handleUnlock = () => {
    setIsLocked(false);
    // Automatically enter main site when unlocked
    setTimeout(() => {
      setHasEntered(true);
      window.scrollTo(0, 0);
    }, 500); // Small delay for smooth transition
  };

  return (
    <div className="relative min-h-screen bg-romantic-50 font-sans overflow-x-hidden">
      {/* Lock Screen - Shows until Feb 14, 12am */}
      {isLocked && <LockScreen onUnlock={handleUnlock} />}
      
      {/* Global visual effects */}
      <FloatingHearts />
      {/* Only show custom cursor trail on desktop to avoid mobile touch issues */}
      <div className="hidden md:block">
        <CursorTrail />
      </div>

      {!hasEntered ? (
        // Landing Page
        <HeroSection onEnter={handleEnter} />
      ) : (
        // Main Site Content
        <div className="animate-fade-in-up">
          <Navigation />
          
          <main>
            <GallerySection />
            <QuotesSection />
            <FinalMessage />
          </main>
          
          <footer className="bg-romantic-900 py-6 text-center text-romantic-200/50 font-sans text-sm tracking-widest uppercase">
            <p>Made with Love</p>
          </footer>
        </div>
      )}

      {/* Persistent Music Player - Requests autoPlay once user interacts (enters) */}
      <MusicPlayer autoPlayRequest={hasEntered} />
    </div>
  );
}
