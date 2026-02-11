import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { CONTENT } from '../constants';
import { Photo } from '../types';

export const GallerySection: React.FC = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Auto slideshow effect
  React.useEffect(() => {
    let interval: number;
    if (isPlaying && selectedImageIndex !== null) {
      interval = window.setInterval(() => {
        setSelectedImageIndex((prev) =>
          prev === null ? null : (prev + 1) % CONTENT.photos.length
        );
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, selectedImageIndex]);

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
    setIsPlaying(false);
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
    setIsPlaying(false);
  };

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % CONTENT.photos.length);
    }
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex - 1 + CONTENT.photos.length) % CONTENT.photos.length);
    }
  };

  return (
    <section id="gallery" className="py-24 bg-white relative">
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-script text-5xl md:text-6xl text-romantic-900 mb-4">Our Memories</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-romantic-300 to-transparent mx-auto"></div>
        </div>

        {/* Gallery Grid - Hanging Style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 px-4">
          {CONTENT.photos.map((photo, index) => (
            <div
              key={photo.id}
              className={`group relative aspect-[3/4] bg-white p-4 pb-12 shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:scale-105 hover:z-10 ${index % 2 === 0 ? 'rotate-2 hover:rotate-0' : '-rotate-2 hover:rotate-0'
                }`}
              style={{
                marginTop: index % 3 === 1 ? '2rem' : '0',
              }}
              onClick={() => openLightbox(index)}
            >
              {/* String/Pin Visual */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-1 h-8 bg-gray-300 z-[-1]"></div>
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-romantic-400 shadow-sm z-10"></div>

              {/* Photo Frame */}
              <div className="w-full h-full overflow-hidden relative">
                <img
                  src={photo.url}
                  alt={photo.caption}
                  className="w-full h-full object-cover filter sepia-[0.1] contrast-[0.9] group-hover:sepia-0 group-hover:contrast-100 transition-all duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300"></div>
              </div>

              {/* Caption on Polaroid Bottom */}
              <div className="absolute bottom-2 left-0 w-full text-center px-2">
                <p className="font-script text-xl text-gray-600 opacity-80 group-hover:opacity-100 transition-opacity">
                  {photo.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImageIndex !== null && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4" 
          onClick={closeLightbox}
          style={{ display: 'flex' }}
        >
          {/* Controls */}
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-[60]" 
            onClick={(e) => {
              e.stopPropagation();
              closeLightbox();
            }}
          >
            <X className="w-8 h-8" />
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-6 z-[60]">
            <button className="text-white/70 hover:text-white" onClick={(e) => { e.stopPropagation(); setIsPlaying(!isPlaying); }}>
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </button>
            <span className="text-white/50 font-sans text-sm tracking-widest">
              {selectedImageIndex + 1} / {CONTENT.photos.length}
            </span>
          </div>

          <button 
            className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-[60]" 
            onClick={prevImage}
          >
            <ChevronLeft className="w-12 h-12" />
          </button>

          <button 
            className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-[60]" 
            onClick={nextImage}
          >
            <ChevronRight className="w-12 h-12" />
          </button>

          {/* Main Image */}
          <div 
            className="relative w-full h-full flex flex-col items-center justify-center" 
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={CONTENT.photos[selectedImageIndex].url}
              alt={CONTENT.photos[selectedImageIndex].caption}
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
              loading="eager"
            />
            <p className="text-white/90 font-serif text-lg mt-6 text-center italic px-4">
              {CONTENT.photos[selectedImageIndex].caption}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
