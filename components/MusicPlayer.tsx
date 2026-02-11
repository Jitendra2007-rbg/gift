import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { CONTENT } from '../constants';

interface MusicPlayerProps {
  autoPlayRequest: boolean;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ autoPlayRequest }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (autoPlayRequest && audioRef.current) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.error("Audio autoplay blocked or failed:", err);
          setHasError(true);
          setIsPlaying(false);
        });
    }
  }, [autoPlayRequest]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true);
          setHasError(false);
        })
        .catch(() => setHasError(true));
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Hidden audio element */}
      <audio 
        ref={audioRef} 
        src={CONTENT.musicUrl} 
        loop 
        preload="auto"
      />
      
      {/* Equalizer animation when playing */}
      {isPlaying && (
        <div className="flex items-end gap-[2px] h-4 mr-2">
          <div className="w-1 bg-romantic-400 animate-[pulse_1s_ease-in-out_infinite] h-full"></div>
          <div className="w-1 bg-romantic-400 animate-[pulse_1.2s_ease-in-out_infinite_0.2s] h-2/3"></div>
          <div className="w-1 bg-romantic-400 animate-[pulse_0.8s_ease-in-out_infinite_0.4s] h-4/5"></div>
        </div>
      )}

      <button 
        onClick={togglePlay}
        className={`p-4 rounded-full shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110 ${
          isPlaying 
            ? 'bg-romantic-500/80 text-white' 
            : 'bg-white/80 text-romantic-500 hover:bg-white'
        } ${hasError ? 'ring-2 ring-red-400' : ''}`}
        title={hasError ? "Could not play audio" : "Toggle Music"}
      >
        {isPlaying ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
      </button>
    </div>
  );
};
