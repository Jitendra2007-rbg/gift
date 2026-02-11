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
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="font-script text-5xl md:text-6xl text-romantic-900 mb-4">Our Memories</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-romantic-300 to-transparent mx-auto"></div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {CONTENT.photos.map((photo, index) => (
            <div 
              key={photo.id}
              className="group relative aspect-square overflow-hidden rounded-2xl cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500"
              onClick={() => openLightbox(index)}
            >
              <img 
                src={photo.url} 
                alt={photo.caption} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-romantic-900/80 via-romantic-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center p-6">
                <p className="text-white font-sans text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  {photo.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImageIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm" onClick={closeLightbox}>
          {/* Controls */}
          <button className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors" onClick={closeLightbox}>
            <X className="w-8 h-8" />
          </button>
          
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-6">
            <button className="text-white/70 hover:text-white" onClick={(e) => { e.stopPropagation(); setIsPlaying(!isPlaying); }}>
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </button>
            <span className="text-white/50 font-sans text-sm tracking-widest">
              {selectedImageIndex + 1} / {CONTENT.photos.length}
            </span>
          </div>

          <button className="absolute left-4 md:left-12 text-white/50 hover:text-white transition-colors" onClick={prevImage}>
            <ChevronLeft className="w-12 h-12" />
          </button>
          
          <button className="absolute right-4 md:right-12 text-white/50 hover:text-white transition-colors" onClick={nextImage}>
            <ChevronRight className="w-12 h-12" />
          </button>

          {/* Main Image */}
          <div className="relative max-w-5xl w-full px-12 md:px-24 flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <img 
              src={CONTENT.photos[selectedImageIndex].url} 
              alt={CONTENT.photos[selectedImageIndex].caption}
              className="max-h-[75vh] object-contain rounded-md shadow-2xl"
            />
            <p className="text-white/90 font-serif text-xl mt-6 text-center italic">
              {CONTENT.photos[selectedImageIndex].caption}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
