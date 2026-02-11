import React, { useEffect } from 'react';

export const CursorTrail: React.FC = () => {
  useEffect(() => {
    // We use vanilla DOM manipulation here to avoid triggering React re-renders on every mouse move,
    // which would cause significant performance issues.
    let isMouseMoving = false;
    let timeout: number;

    const handleMouseMove = (e: MouseEvent) => {
      isMouseMoving = true;
      clearTimeout(timeout);
      
      const trail = document.createElement('div');
      trail.className = 'fixed w-3 h-3 rounded-full bg-romantic-400 blur-[2px] pointer-events-none z-50 mix-blend-screen transition-all duration-700 ease-out';
      
      // Initial state
      trail.style.left = `${e.clientX}px`;
      trail.style.top = `${e.clientY}px`;
      trail.style.opacity = '0.6';
      trail.style.transform = 'translate(-50%, -50%) scale(1)';

      document.body.appendChild(trail);

      // Force reflow
      void trail.offsetWidth;

      // Animate out
      trail.style.transform = `translate(-50%, -50%) scale(${2 + Math.random() * 2})`;
      trail.style.opacity = '0';

      // Cleanup
      setTimeout(() => {
        if (trail.parentNode) {
          trail.parentNode.removeChild(trail);
        }
      }, 700);

      timeout = window.setTimeout(() => {
        isMouseMoving = false;
      }, 100);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timeout);
    };
  }, []);

  return null;
};
